# Theme Configuration

Dynamic and integrated theme configuration was introduced in Mermaid version 8.7.0.

Themes can now be customized at the site-wide level, or on individual Mermaid diagrams. For site-wide theme customization, the `initialize` call is used. For diagram specific customization, frontmatter config is used.

## Available Themes

1.  [**redux-color**](#preview-redux-color) - The default theme for the diagram types listed under [Per-diagram defaults](#per-diagram-defaults). It pairs the `redux` geometry and typography with a categorical colour palette, so entities, actors, branches, classes, subgraph containers and chart series each get their own colour.

2.  [**redux-dark-color**](#preview-redux-dark-color) - The dark counterpart of `redux-color`.

3.  [**redux**](#preview-redux) - The same geometry and typography as `redux-color`, but monochrome. Use this when you want the colour to carry meaning you assign yourself rather than being cycled per item.

4.  [**redux-dark**](#preview-redux-dark) - The dark counterpart of `redux`.

5.  [**default**](#preview-default) - The long-standing Mermaid look, and still the default for every diagram type not listed under [Per-diagram defaults](#per-diagram-defaults).

6.  [**neutral**](#preview-neutral) - This theme is great for black-and-white documents that will be printed.

7.  [**dark**](#preview-dark) - This theme goes well with dark-colored elements or dark-mode. To use the dark theme (which changes the theme of the schema itself) with dark-mode (which sets the background), set `darkMode` to `true` in your config.

8.  [**forest**](#preview-forest) - This theme contains shades of green.

9.  [**neo**](#preview-neo) - A flatter, softer look, intended to be paired with `look: neo`.

10. [**neo-dark**](#preview-neo-dark) - The dark counterpart of `neo`.

11. [**base**](#preview-base) - This is the only theme that can be modified. Use this theme as the base for customizations.

## Theme previews

Compare flowchart, sequence, class, and state diagrams in every theme below.
Each example uses the same source across themes. Each screenshot keeps its own
background, so light and dark themes can be compared in either site appearance.

The Redux and Neo previews use `look: neo`; the other previews use `look: classic`.
The look controls shapes and styling independently of the theme. Set both values
explicitly to reproduce a preview rather than relying on per-diagram defaults.
Dark previews also set `darkMode: true` and use a `#333333` page background; light
previews use a white page background. Set the background on the element containing
your diagram when embedding it.

The flowchart previews use this source, without custom node or edge styles. The
two subgraphs show how the Redux color themes assign different colors to containers:

```text
---
config:
  theme: redux-color
  look: neo
---
flowchart LR
  subgraph review [Review]
    A[Write a draft] --> B{Ready?}
  end
  subgraph next [Next step]
    C[Publish]
    D[Revise]
  end
  B -->|Yes| C
  B -->|No| D
```

The additional examples show actors, messages and notes in sequence diagrams,
attributes and relationships in class diagrams, and composite states and
transitions in state diagrams. Expand **More diagram types** under a theme to
compare these elements.

<details>
<summary>Source for the additional examples</summary>

**Sequence diagram**

```text
sequenceDiagram
  actor Reader
  participant Website
  participant Database
  Reader->>Website: Open article
  activate Website
  Website->>Database: Load article
  Database-->>Website: Article found
  Note over Website: Format content
  Website-->>Reader: Show article
  deactivate Website
```

**Class diagram**

```text
classDiagram
  direction LR
  class Author {
    +String name
    +write()
  }
  class Article {
    +String title
    +publish()
  }
  class Comment {
    +String text
    +approve()
  }
  Author "1" --> "*" Article : writes
  Article "1" *-- "*" Comment : contains
```

**State diagram**

```text
stateDiagram-v2
  direction LR
  [*] --> Editing
  state Editing {
    Draft --> Review: Submit
    Review --> Draft: Revise
  }
  Editing --> Published: Approve
  Published --> [*]
```

</details>

### redux-color {#preview-redux-color}

`theme: redux-color`, `look: neo`

![Flowchart in the redux-color theme: Write a draft leads to Ready?; Yes leads to Publish, and No leads to Revise.](./img/theme-previews/redux-color.png)

<details>
<summary>More diagram types</summary>

**Sequence diagram**

![Sequence diagram in the redux-color theme: A reader opens an article; the website loads it from a database and returns formatted content.](./img/theme-previews/redux-color-sequence.png)

**Class diagram**

![Class diagram in the redux-color theme: An Author writes Articles, and each Article contains Comments, with attributes and methods.](./img/theme-previews/redux-color-class.png)

**State diagram**

![State diagram in the redux-color theme: Draft and Review are nested in Editing, followed by Published and the final state.](./img/theme-previews/redux-color-state.png)

</details>

### redux-dark-color {#preview-redux-dark-color}

`theme: redux-dark-color`, `look: neo`, `darkMode: true`

![Flowchart in the redux-dark-color theme: Write a draft leads to Ready?; Yes leads to Publish, and No leads to Revise.](./img/theme-previews/redux-dark-color.png)

<details>
<summary>More diagram types</summary>

**Sequence diagram**

![Sequence diagram in the redux-dark-color theme: A reader opens an article; the website loads it from a database and returns formatted content.](./img/theme-previews/redux-dark-color-sequence.png)

**Class diagram**

![Class diagram in the redux-dark-color theme: An Author writes Articles, and each Article contains Comments, with attributes and methods.](./img/theme-previews/redux-dark-color-class.png)

**State diagram**

![State diagram in the redux-dark-color theme: Draft and Review are nested in Editing, followed by Published and the final state.](./img/theme-previews/redux-dark-color-state.png)

</details>

### redux {#preview-redux}

`theme: redux`, `look: neo`

![Flowchart in the redux theme: Write a draft leads to Ready?; Yes leads to Publish, and No leads to Revise.](./img/theme-previews/redux.png)

<details>
<summary>More diagram types</summary>

**Sequence diagram**

![Sequence diagram in the redux theme: A reader opens an article; the website loads it from a database and returns formatted content.](./img/theme-previews/redux-sequence.png)

**Class diagram**

![Class diagram in the redux theme: An Author writes Articles, and each Article contains Comments, with attributes and methods.](./img/theme-previews/redux-class.png)

**State diagram**

![State diagram in the redux theme: Draft and Review are nested in Editing, followed by Published and the final state.](./img/theme-previews/redux-state.png)

</details>

### redux-dark {#preview-redux-dark}

`theme: redux-dark`, `look: neo`, `darkMode: true`

![Flowchart in the redux-dark theme: Write a draft leads to Ready?; Yes leads to Publish, and No leads to Revise.](./img/theme-previews/redux-dark.png)

<details>
<summary>More diagram types</summary>

**Sequence diagram**

![Sequence diagram in the redux-dark theme: A reader opens an article; the website loads it from a database and returns formatted content.](./img/theme-previews/redux-dark-sequence.png)

**Class diagram**

![Class diagram in the redux-dark theme: An Author writes Articles, and each Article contains Comments, with attributes and methods.](./img/theme-previews/redux-dark-class.png)

**State diagram**

![State diagram in the redux-dark theme: Draft and Review are nested in Editing, followed by Published and the final state.](./img/theme-previews/redux-dark-state.png)

</details>

### default {#preview-default}

`theme: default`, `look: classic`

![Flowchart in the default theme: Write a draft leads to Ready?; Yes leads to Publish, and No leads to Revise.](./img/theme-previews/default.png)

<details>
<summary>More diagram types</summary>

**Sequence diagram**

![Sequence diagram in the default theme: A reader opens an article; the website loads it from a database and returns formatted content.](./img/theme-previews/default-sequence.png)

**Class diagram**

![Class diagram in the default theme: An Author writes Articles, and each Article contains Comments, with attributes and methods.](./img/theme-previews/default-class.png)

**State diagram**

![State diagram in the default theme: Draft and Review are nested in Editing, followed by Published and the final state.](./img/theme-previews/default-state.png)

</details>

### neutral {#preview-neutral}

`theme: neutral`, `look: classic`

![Flowchart in the neutral theme: Write a draft leads to Ready?; Yes leads to Publish, and No leads to Revise.](./img/theme-previews/neutral.png)

<details>
<summary>More diagram types</summary>

**Sequence diagram**

![Sequence diagram in the neutral theme: A reader opens an article; the website loads it from a database and returns formatted content.](./img/theme-previews/neutral-sequence.png)

**Class diagram**

![Class diagram in the neutral theme: An Author writes Articles, and each Article contains Comments, with attributes and methods.](./img/theme-previews/neutral-class.png)

**State diagram**

![State diagram in the neutral theme: Draft and Review are nested in Editing, followed by Published and the final state.](./img/theme-previews/neutral-state.png)

</details>

### dark {#preview-dark}

`theme: dark`, `look: classic`, `darkMode: true`

![Flowchart in the dark theme: Write a draft leads to Ready?; Yes leads to Publish, and No leads to Revise.](./img/theme-previews/dark.png)

<details>
<summary>More diagram types</summary>

**Sequence diagram**

![Sequence diagram in the dark theme: A reader opens an article; the website loads it from a database and returns formatted content.](./img/theme-previews/dark-sequence.png)

**Class diagram**

![Class diagram in the dark theme: An Author writes Articles, and each Article contains Comments, with attributes and methods.](./img/theme-previews/dark-class.png)

**State diagram**

![State diagram in the dark theme: Draft and Review are nested in Editing, followed by Published and the final state.](./img/theme-previews/dark-state.png)

</details>

### forest {#preview-forest}

`theme: forest`, `look: classic`

![Flowchart in the forest theme: Write a draft leads to Ready?; Yes leads to Publish, and No leads to Revise.](./img/theme-previews/forest.png)

<details>
<summary>More diagram types</summary>

**Sequence diagram**

![Sequence diagram in the forest theme: A reader opens an article; the website loads it from a database and returns formatted content.](./img/theme-previews/forest-sequence.png)

**Class diagram**

![Class diagram in the forest theme: An Author writes Articles, and each Article contains Comments, with attributes and methods.](./img/theme-previews/forest-class.png)

**State diagram**

![State diagram in the forest theme: Draft and Review are nested in Editing, followed by Published and the final state.](./img/theme-previews/forest-state.png)

</details>

### neo {#preview-neo}

`theme: neo`, `look: neo`

![Flowchart in the neo theme: Write a draft leads to Ready?; Yes leads to Publish, and No leads to Revise.](./img/theme-previews/neo.png)

<details>
<summary>More diagram types</summary>

**Sequence diagram**

![Sequence diagram in the neo theme: A reader opens an article; the website loads it from a database and returns formatted content.](./img/theme-previews/neo-sequence.png)

**Class diagram**

![Class diagram in the neo theme: An Author writes Articles, and each Article contains Comments, with attributes and methods.](./img/theme-previews/neo-class.png)

**State diagram**

![State diagram in the neo theme: Draft and Review are nested in Editing, followed by Published and the final state.](./img/theme-previews/neo-state.png)

</details>

### neo-dark {#preview-neo-dark}

`theme: neo-dark`, `look: neo`, `darkMode: true`

![Flowchart in the neo-dark theme: Write a draft leads to Ready?; Yes leads to Publish, and No leads to Revise.](./img/theme-previews/neo-dark.png)

<details>
<summary>More diagram types</summary>

**Sequence diagram**

![Sequence diagram in the neo-dark theme: A reader opens an article; the website loads it from a database and returns formatted content.](./img/theme-previews/neo-dark-sequence.png)

**Class diagram**

![Class diagram in the neo-dark theme: An Author writes Articles, and each Article contains Comments, with attributes and methods.](./img/theme-previews/neo-dark-class.png)

**State diagram**

![State diagram in the neo-dark theme: Draft and Review are nested in Editing, followed by Published and the final state.](./img/theme-previews/neo-dark-state.png)

</details>

### base {#preview-base}

`theme: base`, `look: classic`

![Flowchart in the base theme: Write a draft leads to Ready?; Yes leads to Publish, and No leads to Revise.](./img/theme-previews/base.png)

<details>
<summary>More diagram types</summary>

**Sequence diagram**

![Sequence diagram in the base theme: A reader opens an article; the website loads it from a database and returns formatted content.](./img/theme-previews/base-sequence.png)

**Class diagram**

![Class diagram in the base theme: An Author writes Articles, and each Article contains Comments, with attributes and methods.](./img/theme-previews/base-class.png)

**State diagram**

![State diagram in the base theme: Draft and Review are nested in Editing, followed by Published and the final state.](./img/theme-previews/base-state.png)

</details>

<!-- Regenerate these screenshots with `pnpm build:esbuild`,
     `pnpm exec playwright install chromium`, and
     `pnpm exec tsx scripts/theme-previews.mts` from the repository root. -->

## Per-diagram defaults

Not every diagram type defaults to the same theme and look. Since v12.0.0
these do, to the `redux-color` theme and the `neo` look. The name on the left is the **config key** — what you write to
scope a setting to that diagram, which is not always the keyword the diagram starts with:

| Config key    | Diagram              |
| ------------- | -------------------- |
| `agentflow`   | `agentflow-beta`     |
| `flowchart`   | `flowchart`          |
| `swimlane`    | `swimlane-beta`      |
| `class`       | `classDiagram`       |
| `er`          | `erDiagram`          |
| `requirement` | `requirementDiagram` |
| `sequence`    | `sequenceDiagram`    |
| `state`       | `stateDiagram`       |
| `usecase`     | `usecase-beta`       |
| `venn`        | `venn-beta`          |

Every other diagram type defaults to the `default` theme and the `classic` look.

`layout` works the same way. Only `swimlane` overrides it, to `swimlane`; everything else
uses the global default, `dagre`.

These are only defaults, and the most specific thing you say wins. Highest priority first:

1.  The diagram's own frontmatter or `%%{init}%%` directive.
2.  What you passed to `mermaid.initialize()`.
3.  The diagram type's default, above.
4.  The global default (`theme: default`, `look: classic`, `layout: dagre`).

A layout that is not registered in the running build falls back to `dagre`, with a warning
in the console. `elk` ships as a separate package you register yourself, and `cose-bilkent`
is only bundled into builds that include the large features, so naming either as a default
does not require every build to carry it.

Within each of the first two you can also scope a value to one diagram type, and the
scoped value wins over the global one you set alongside it. `theme`, `look` and `layout`
can all be set this way:

```javascript
mermaid.initialize({
  look: 'classic', // everything is classic...
  flowchart: { look: 'handDrawn' }, // ...except flowcharts
  er: { theme: 'neutral' },
});
```

The same works in frontmatter, for one diagram:

```yaml
---
config:
  flowchart:
    look: handDrawn
---
```

### Going back to the previous appearance

The nine types above changed appearance when these became their defaults. To draw one the
way Mermaid drew it before, name the previous theme and look in its front matter:

```yaml
---
config:
  theme: default
  look: classic
---
```

For every diagram on a page, pass the same two keys to `mermaid.initialize()`:

```javascript
mermaid.initialize({ theme: 'default', look: 'classic' });
```

## Site-wide Theme

To customize themes site-wide, call the `initialize` method on the `mermaid`.

Example of `initialize` call setting `theme` to `base`:

```javascript
mermaid.initialize({
  securityLevel: 'loose',
  theme: 'base',
});
```

## Diagram-specific Themes

To customize the theme of an individual diagram, use frontmatter config.

Example of frontmatter config setting the `theme` to `forest`:

```mermaid-example
---
config:
  theme: 'forest'
---
  graph TD
    a --> b
```

> **Reminder**: the only theme that can be customized is the `base` theme. The following section covers how to use `themeVariables` for customizations.

## Customizing Themes with `themeVariables`

To make a custom theme, modify `themeVariables` via frontmatter config.

You will need to use the [base](#available-themes) theme as it is the only modifiable theme.

| Parameter      | Description                        | Type   | Properties                                                                          |
| -------------- | ---------------------------------- | ------ | ----------------------------------------------------------------------------------- |
| themeVariables | Modifiable with frontmatter config | Object | `primaryColor`, `primaryTextColor`, `lineColor` ([see full list](#theme-variables)) |

Example of modifying `themeVariables` using frontmatter config:

```mermaid-example
---
config:
  theme: 'base'
  themeVariables:
    primaryColor: '#BB2528'
    primaryTextColor: '#fff'
    primaryBorderColor: '#7C0000'
    lineColor: '#F8B229'
    secondaryColor: '#006100'
    tertiaryColor: '#fff'
---
        graph TD
          A[Christmas] -->|Get money| B(Go shopping)
          B --> C{Let me think}
          B --> G[/Another/]
          C ==>|One| D[Laptop]
          C -->|Two| E[iPhone]
          C -->|Three| F[fa:fa-car Car]
          subgraph section
            C
            D
            E
            F
            G
          end
```

## Color and Color Calculation

To ensure diagram readability, the default value of certain variables is calculated or derived from other variables. For example, `primaryBorderColor` is derived from the `primaryColor` variable. So if the `primaryColor` variable is customized, Mermaid will adjust `primaryBorderColor` automatically. Adjustments can mean a color inversion, a hue change, a darkening/lightening by 10%, etc.

The theming engine will only recognize hex colors and not color names. So, the value `#ff0000` will work, but `red` will not.

## Theme Variables

| Variable             | Default value                      | Description                                                                                                                      |
| -------------------- | ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| darkMode             | false                              | Affects how derived colors are calculated. Set value to `true` for dark mode.                                                    |
| background           | #f4f4f4                            | Used to calculate color for items that should either be background colored or contrasting to the background                      |
| fontFamily           | trebuchet ms, verdana, arial       | Font family for diagram text                                                                                                     |
| fontSize             | 16px                               | Font size in pixels                                                                                                              |
| primaryColor         | #fff4dd                            | Color to be used as background in nodes, other colors will be derived from this                                                  |
| primaryTextColor     | calculated from darkMode #ddd/#333 | Color to be used as text color in nodes using `primaryColor`                                                                     |
| secondaryColor       | calculated from primaryColor       |                                                                                                                                  |
| primaryBorderColor   | calculated from primaryColor       | Color to be used as border in nodes using `primaryColor`                                                                         |
| secondaryBorderColor | calculated from secondaryColor     | Color to be used as border in nodes using `secondaryColor`                                                                       |
| secondaryTextColor   | calculated from secondaryColor     | Color to be used as text color in nodes using `secondaryColor`                                                                   |
| tertiaryColor        | calculated from primaryColor       |                                                                                                                                  |
| tertiaryBorderColor  | calculated from tertiaryColor      | Color to be used as border in nodes using `tertiaryColor`                                                                        |
| tertiaryTextColor    | calculated from tertiaryColor      | Color to be used as text color in nodes using `tertiaryColor`                                                                    |
| noteBkgColor         | #fff5ad                            | Color used as background in notes                                                                                                |
| noteTextColor        | #333                               | Text color in note rectangles                                                                                                    |
| noteBorderColor      | calculated from noteBkgColor       | Border color in note rectangles                                                                                                  |
| lineColor            | calculated from background         |                                                                                                                                  |
| textColor            | calculated from primaryTextColor   | Text in diagram over the background for instance text on labels and on signals in sequence diagram or the title in Gantt diagram |
| mainBkg              | calculated from primaryColor       | Background in flowchart objects like rects/circles, class diagram classes, sequence diagram etc                                  |
| errorBkgColor        | tertiaryColor                      | Color for syntax error message                                                                                                   |
| errorTextColor       | tertiaryTextColor                  | Color for syntax error message                                                                                                   |

## Flowchart Variables

| Variable            | Default value                  | Description                 |
| ------------------- | ------------------------------ | --------------------------- |
| nodeBorder          | primaryBorderColor             | Node Border Color           |
| clusterBkg          | tertiaryColor                  | Background in subgraphs     |
| clusterBorder       | tertiaryBorderColor            | Cluster Border Color        |
| defaultLinkColor    | lineColor                      | Link Color                  |
| titleColor          | tertiaryTextColor              | Title Color                 |
| edgeLabelBackground | calculated from secondaryColor |                             |
| nodeTextColor       | primaryTextColor               | Color for text inside Nodes |

## Sequence Diagram Variables

| Variable              | Default value                  | Description                 |
| --------------------- | ------------------------------ | --------------------------- |
| actorBkg              | mainBkg                        | Actor Background Color      |
| actorBorder           | primaryBorderColor             | Actor Border Color          |
| actorTextColor        | primaryTextColor               | Actor Text Color            |
| actorLineColor        | actorBorder                    | Actor Line Color            |
| signalColor           | textColor                      | Signal Color                |
| signalTextColor       | textColor                      | Signal Text Color           |
| labelBoxBkgColor      | actorBkg                       | Label Box Background Color  |
| labelBoxBorderColor   | actorBorder                    | Label Box Border Color      |
| labelTextColor        | actorTextColor                 | Label Text Color            |
| loopTextColor         | actorTextColor                 | Loop Text Color             |
| activationBorderColor | calculated from secondaryColor | Activation Border Color     |
| activationBkgColor    | secondaryColor                 | Activation Background Color |
| sequenceNumberColor   | calculated from lineColor      | Sequence Number Color       |

## Pie Diagram Variables

| Variable            | Default value                  | Description                                |
| ------------------- | ------------------------------ | ------------------------------------------ |
| pie1                | primaryColor                   | Fill for 1st section in pie diagram        |
| pie2                | secondaryColor                 | Fill for 2nd section in pie diagram        |
| pie3                | calculated from tertiary       | Fill for 3rd section in pie diagram        |
| pie4                | calculated from primaryColor   | Fill for 4th section in pie diagram        |
| pie5                | calculated from secondaryColor | Fill for 5th section in pie diagram        |
| pie6                | calculated from tertiaryColor  | Fill for 6th section in pie diagram        |
| pie7                | calculated from primaryColor   | Fill for 7th section in pie diagram        |
| pie8                | calculated from primaryColor   | Fill for 8th section in pie diagram        |
| pie9                | calculated from primaryColor   | Fill for 9th section in pie diagram        |
| pie10               | calculated from primaryColor   | Fill for 10th section in pie diagram       |
| pie11               | calculated from primaryColor   | Fill for 11th section in pie diagram       |
| pie12               | calculated from primaryColor   | Fill for 12th section in pie diagram       |
| pieTitleTextSize    | 25px                           | Title text size                            |
| pieTitleTextColor   | taskTextDarkColor              | Title text color                           |
| pieSectionTextSize  | 17px                           | Text size of individual section labels     |
| pieSectionTextColor | textColor                      | Text color of individual section labels    |
| pieLegendTextSize   | 17px                           | Text size of labels in diagram legend      |
| pieLegendTextColor  | taskTextDarkColor              | Text color of labels in diagram legend     |
| pieStrokeColor      | black                          | Border color of individual pie sections    |
| pieStrokeWidth      | 2px                            | Border width of individual pie sections    |
| pieOuterStrokeWidth | 2px                            | Border width of pie diagram's outer circle |
| pieOuterStrokeColor | black                          | Border color of pie diagram's outer circle |
| pieOpacity          | 0.7                            | Opacity of individual pie sections         |

## State Colors

| Variable      | Default value    | Description                                  |
| ------------- | ---------------- | -------------------------------------------- |
| labelColor    | primaryTextColor |                                              |
| altBackground | tertiaryColor    | Used for background in deep composite states |

## Class Colors

| Variable  | Default value | Description                     |
| --------- | ------------- | ------------------------------- |
| classText | textColor     | Color of Text in class diagrams |

## User Journey Colors

| Variable  | Default value                  | Description                             |
| --------- | ------------------------------ | --------------------------------------- |
| fillType0 | primaryColor                   | Fill for 1st section in journey diagram |
| fillType1 | secondaryColor                 | Fill for 2nd section in journey diagram |
| fillType2 | calculated from primaryColor   | Fill for 3rd section in journey diagram |
| fillType3 | calculated from secondaryColor | Fill for 4th section in journey diagram |
| fillType4 | calculated from primaryColor   | Fill for 5th section in journey diagram |
| fillType5 | calculated from secondaryColor | Fill for 6th section in journey diagram |
| fillType6 | calculated from primaryColor   | Fill for 7th section in journey diagram |
| fillType7 | calculated from secondaryColor | Fill for 8th section in journey diagram |
