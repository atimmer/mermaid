/**
 * Regenerate the theme screenshots in the theming guide using the local build.
 * Run `pnpm build:esbuild`, `pnpm exec playwright install chromium`, then
 * `pnpm exec tsx scripts/theme-previews.mts` from the repository root.
 */
import { mkdir, readFile } from 'node:fs/promises';
import { chromium } from 'playwright';
import type { Mermaid } from '../packages/mermaid/src/mermaid.js';

const themes = [
  'redux-color',
  'redux-dark-color',
  'redux',
  'redux-dark',
  'default',
  'neutral',
  'dark',
  'forest',
  'neo',
  'neo-dark',
  'base',
] as const;
const diagram = `flowchart LR
  subgraph review [Review]
    A[Write a draft] --> B{Ready?}
  end
  subgraph next [Next step]
    C[Publish]
    D[Revise]
  end
  B -->|Yes| C
  B -->|No| D`;
const output = 'packages/mermaid/src/docs/config/img/theme-previews';
const fontRoot = 'packages/mermaid/src/docs/node_modules';
// cspell:ignore wght
const fonts = [
  [
    'Recursive Variable',
    `${fontRoot}/@fontsource-variable/recursive/files/recursive-latin-wght-normal.woff2`,
  ],
  ['Open Sans', `${fontRoot}/@fontsource/open-sans/files/open-sans-latin-400-normal.woff2`],
];
const fontCss = (
  await Promise.all(
    fonts.map(async ([family, path]) => {
      const data = (await readFile(path)).toString('base64');
      return `@font-face { font-family: '${family}'; src: url(data:font/woff2;base64,${data}) format('woff2'); font-weight: 100 900; }`;
    })
  )
).join('\n');

await mkdir(output, { recursive: true });
const browser = await chromium.launch();
try {
  const page = await browser.newPage({
    viewport: { width: 720, height: 360 },
    deviceScaleFactor: 2,
  });
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  for (const theme of themes) {
    const darkMode = theme.includes('dark');
    const look = theme.startsWith('redux') || theme.startsWith('neo') ? 'neo' : 'classic';
    await page.setContent(`<style>${fontCss}
      body { margin: 0; background: ${darkMode ? '#333333' : '#ffffff'}; }
      #diagram { width: 720px; height: 360px; display: flex; align-items: center; justify-content: center; }
      #diagram svg { max-width: 672px !important; max-height: 312px; }
    </style><div id="diagram"></div>`);
    await page.addScriptTag({ path: 'packages/mermaid/dist/mermaid.js' });
    await page.evaluate(
      async ({ theme, look, darkMode, diagram }) => {
        await document.fonts.load('16px "Recursive Variable"');
        await document.fonts.load('16px "Open Sans"');
        const mermaid = (window as unknown as { mermaid: Mermaid }).mermaid;
        mermaid.initialize({ startOnLoad: false, theme, look, darkMode });
        const { svg } = await mermaid.render('theme-preview', diagram);
        document.querySelector('#diagram')!.innerHTML = svg;
        await document.fonts.ready;
        if (document.querySelectorAll('.node').length !== 4) {
          throw new Error(`Expected four nodes for ${theme}`);
        }
      },
      { theme, look, darkMode, diagram }
    );
    await page.locator('#diagram').screenshot({ path: `${output}/${theme}.png` });
  }
  if (errors.length) {
    throw new Error(errors.join('\n'));
  }
} finally {
  await browser.close();
}
