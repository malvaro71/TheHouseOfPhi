# MDX Content Authoring Guide

This document establishes the standards for creating and editing content pages (`.mdx`) in **TheHouseOfPhi**.

## 1. File Structure

Every content page must start with the **Frontmatter** block (the section between `---`).

```mdx
---
layout: ../../layouts/BaseLayout.astro
title: Page Title - The House of Phi
lang: en
---
import VectorCanvas from '../../components/VectorCanvas.astro';
import * as math from 'mathjs';

<!-- Content begins here -->
```

## 2. Content Organization

### 2.1. HTML vs. Markdown
Although MDX supports HTML tags (`<article>`, `<section>`), we prefer **standard Markdown** for the body content to maintain readability and portability.

| Element | Preferred Syntax | HTML Equivalent (Avoid if possible) |
| :--- | :--- | :--- |
| **Headers** | `# Title`, `## Subtitle` | `<h1>`, `<h2>` |
| **Paragraphs** | Just text separated by empty lines | `<p>` |
| **Lists** | `- Item` or `1. Item` | `<ul>`, `<ol>` |
| **Emphasis** | `**bold**`, `*italic*` | `<strong>`, `<em>` |

### 2.2. Semantic Wrappers
You may use HTML tags when you need specific styling hooks (CSS classes) or semantic grouping that Markdown cannot provide.

*   **`<article>`**: It is recommended to wrap the main content if the Layout does not already do so.
*   **`<div>` or `<section>`**: Use sparingly, mainly for layout control (e.g., columns).

### 2.3. Header Numbering

Headers must be numbered manually according to the following hierarchy:

*   **Level 1 (`#`):** Used only once per file as the document title. This header is **not** numbered.
*   **Level 2 (`##`):** Numbered sequentially starting from 1 (e.g., `1. Section`, `2. Section`).
*   **Level 3 (`###`):** Displays the parent Level 2 number, followed by a dot, and then a sequential number starting from 1. The counter resets when the Level 2 section changes (e.g., `1.1. Subsection`, `1.2. Subsection`).

**Usage Example:**

```md
# Main Page Title

## 1. Introduction
...

### 1.1. Context
...

## 2. Methodology
```
### 2.4. Standard Chapter Structure

Every chapter (MDX file) must begin with an Introduction section (## 1. Introduction). This section serves three purposes:
*   **Motivation:** Provide a general overview and motivate the reader about the content.
*   **Navigation:** List the main blocks or sections of the chapter.
*   **Planning:** If the chapter is a work in progress, list the planned sections to outline the structure.

**Format:**
The introduction must contain a subsection (e.g., `### 1.1. Bloques fundamentales del capítulo`) with a list of the chapter's main sections. Each item in the list must include:
- A link to the section's anchor.
- A brief, one-line description of the section's content.

If a section does not exist yet, the link should still point to its planned anchor name.

**Example:**
```md 
## 1. Introduction
Physics and geometry are inseparable... [Motivational text] 
### 1.1. Bloques fundamentales del capítulo
This resource is organized into the following blocks: 
- **[Triangle Geometry](#2-triangle-geometry):** Basic properties and fundamental theorems. 
- **[Trigonometric Ratios](#3-trigonometric-ratios):** Definitions and applications. 
```

## 3. Mathematical Expressions

We use **KaTeX** for fast, client-side math rendering. The styles are globally included in `BaseLayout.astro`, ensuring consistent rendering across all pages.

### 3.1. Syntax

#### Inline Math
Use single dollar signs (`$`) to include math within a sentence.

**Source:**
```md
The velocity vector is defined as $\vec{v} = \frac{d\vec{r}}{dt}$.
```

**Rendered:**
The velocity vector is defined as $\vec{v} = \frac{d\vec{r}}{dt}$.

#### Block Math (Display Mode)
Use double dollar signs (`$$`) to display equations on their own line, centered. **Important:** Place the `$$` delimiters on separate lines from the equation content to ensure proper rendering and support for numbering tags.

**Source:**
```mdx
    $$
    \int_{a}^{b} f(x) dx = F(b) - F(a)
    $$
``` 

**Rendered:**
$$
\int_{a}^{b} f(x) dx = F(b) - F(a)
$$

### 3.2. Numbered Equations
Use `\eqtag{}` inside the LaTeX block. The system automatically adds brackets `[]` around the number.

```mdx
$$
    a^2 + b^2 = c^2 \eqtag{5.1}
$$
``` 
### 3.3. Dynamic Block Math

Standard block math (`$$...$$`) is rendered on the server during build time. To create interactive formulas that update when a user changes an input, we use **client-side re-rendering** with MathJax.

#### The Pattern

**1. MDX (Initial Static State):**
Place the formula inside an HTML `div` with a unique `id`. Write the initial LaTeX normally using `$$...$$`. This ensures the formula is visible immediately on page load (via server-side KaTeX).

```mdx
<div id="dynamic-sqrt-example" class="centered">
  $$\sqrt{3^2 + 4^2} = 5.00$$
</div>
```

**2. TypeScript (Runtime Dynamic Update):**
In your `.ts` file, update the `innerHTML` of the container. 

> **Crucial:** You must use **backticks (template literals)** in TypeScript to allow variable interpolation (`${val}`) and escape backslashes (`\\`).

```typescript
// Inputs and container for the formula
const inputDynA = document.getElementById('input-dyn-a') as HTMLInputElement;
const inputDynB = document.getElementById('input-dyn-b') as HTMLInputElement;
const container = document.getElementById('dynamic-sqrt-example');

const update = () => {
    // Declare MathJax to avoid TypeScript errors for the global variable loaded externally
    declare const MathJax: any;

    const valA = 3;
    const valB = 4;
    const result = 5;

    // 1. Build the new LaTeX string using backticks
    const newLatex = `$$ \\sqrt{${valA}^2 + ${valB}^2} = ${result} $$`;

    // 2. Inject the string into the DOM
    container.innerHTML = newLatex;

    // 3. Request MathJax to re-render the container
    if (typeof MathJax !== 'undefined' && MathJax.typesetPromise) {
        MathJax.typesetPromise([container]);
    }
};
```

#### Summary Table

| Environment | Requirement | Syntax Example |
| :--- | :--- | :--- |
| **MDX File** | Standard LaTeX | `$$\sqrt{x}$$` |
| **TS File** | Template Literal | `` `$$ \\sqrt{${x}} $$` `` |
| **TS File** | Escape Backslashes | Use `\\sqrt`, `\\vec`, `\\frac` |

#### Prerequisites
The MDX page must include the `MathJax` component:
```mdx
import MathJax from '../../components/MathJax.astro';
<MathJax />
```

#### Best Practices
- **Avoid small spans:** Instead of updating 10 small `<span>` elements inside a paragraph, update one single `<div>` containing the entire formula.
- **Unique IDs:** Always prefix IDs with the exercise number (e.g., `e4-result-formula`).
- **Initial Sync:** Call the `update()` function once during initialization to ensure the UI matches the input values.


## 4. Graphics and Figures

We use standard Markdown syntax for both static and dynamic images. The build process automatically converts them into `<figure>` elements with captions.

**Caption & Numbering:**
The text inside the square brackets `[]` (alt text) is used as the figure caption. It must follow the numbering format `X.Y`, where:
*   **X**: The number of the current Level 2 section (`##`).
*   **Y**: A sequential number starting at 1, which resets for each new Level 2 section.

### 4.1. Static Images
For standard image files (SVG, PNG, JPG), simply use the relative path to the file in the `public/` directory.

**Syntax:**
```md
![Figure X.Y: Caption text](/path/to/source)
```

### 4.2. Dynamic Graphics (VectorCanvas)
For geometric constructions generated by code (using `CartesianPlane` or `EuclideanSpace`), use standard Markdown image syntax with the `vector:` protocol.

#### 1. Define the Logic (JavaScript)
Create a function in the corresponding page script (e.g., `src/scripts/pages/geometryPage.ts`) inside the exported dictionary.

```js
import { CartesianPlane } from '/src/scripts/core/CartesianPlane.js';

export const geometryDrawings = {
    "mySvgId": (svg) => {
        // 2D Example
        const plane = new CartesianPlane(svg, -5, 5, -5, 5);
        plane.drawVector([0,0], [3,2], "v");
        plane.drawAxes("y", "x", "O");
    },
    "anotherSvgId": (svg) => {
        // 3D Example (EuclideanSpace)
        // ...
    }
};
```

**Best Practices for Scripts:**
*   **Do not** manipulate the DOM directly (e.g., `document.createElement`). Use the provided classes.
*   **Do not** call `transformCoordinates()` manually. The engines handle this.
*   **Do not** set SVG width/height manually. The `VectorCanvas` component handles sizing.
*   **English Comments:** All code comments within script files or MDX script blocks must be written in English.

**Math in Graphics:**
You can render LaTeX expressions inside the SVG using `drawMath`.
*   **Requirement:** The MDX page must load the MathJax script.
    ```mdx
    import MathJax from '../../components/MathJax.astro';
    <MathJax />
    ```

#### 2. Insert the Graphic (MDX)
Use the `vector:` protocol followed by the ID defined in your page script.

```md
![Figure X.Y: Description of the graphic](vector:mySvgId)
```

Where:
*   **X**: The number of the current Level 2 section (`##`).
*   **Y**: A sequential number starting at 1, which resets for each new Level 2 section.

## 5. Computed Values and Solved Exercises

For exercises where values are calculated and displayed dynamically, we use a strategy that mixes JavaScript logic with MDX content. This ensures accuracy and consistency.

### 5.1. Defining Logic (MDX)
Place your calculation logic inside the MDX file, before the specific exercise. Use `export const` to ensure variables are accessible in the template.

```js
import * as math from 'mathjs';

// Define constants and calculations
export const vRiver = [9, 0];
export const vBoat = [0, 36];
export const vResult = math.add(vRiver, vBoat);
```

**Step 2: Usage in Content**
You can use curly braces `{}` to output the value.

```md
Given a circle with radius {radius} m, the area is:

$ A = \pi r^2 =$ {area.toFixed(2)} $\text{ m}^2 $
```
**Important:** Variable interpolation {} does not work directly inside standard block math ($$...$$) because it is rendered on the server. For dynamic formulas, see the section on Dynamic Block Math.

### 5.2. Contextual Linking in Solutions
When writing the solution for an exercise, explicitly reference the theoretical concepts explained earlier in the document that are being applied. Use internal links to the corresponding sections (anchors) to reinforce learning.

**Example:**
```md
On the other hand, the speed of the boat $\vec v_b$ can be expressed as a [sum of vectors](#3-sum-of-vectors-graphical-method):
```

## 6. Navigation

While global navigation should be handled by the Layout, local navigation (Table of Contents) or breadcrumbs can be added manually or via components.

```html
<nav>
    [Home](/) > [Geometry](./geometry)
</nav>
```

## 7. Cross-Referencing

To maintain clarity and navigability, it's important to reference other parts of the document correctly.

### 7.1. Referencing Sections (Native)

Headings in MDX automatically generate `id` attributes based on their text (converted to kebab-case). You can link to them using standard Markdown links.

**Source:**
```md
As seen in [File Structure](#1-file-structure), the frontmatter is required.
```

### 7.2. Referencing Equations

We do not use hyperlinks for equations. Instead, we use visual numbering and manual text references.

**1. Numbering Convention**
The content of `\tag{}` must follow the format `X.Y`, where:
*   **X**: The number of the current Level 2 section (`##`).
*   **Y**: A sequential number starting at 1, which resets for each new Level 2 section.

**2. Definition**
Use `\tag{}` inside the LaTeX block.

```md
$$
\vec{p} = m \cdot \vec{v} \tag{2.1}
$$
```

**3. Reference**
Simply write the number, between brackets `[]`, in the text.

```md
Substituting the velocity value into equation [2.1], we obtain...
```
## 8. Scripting in MDX

### 8.1. The "Paragraph" Problem 
MDX treats content inside HTML tags (like <script>) as Markdown content. If you indent your JavaScript code or leave empty lines, MDX may wrap it in <p> tags, causing syntax errors (e.g., Uncaught SyntaxError: Unexpected token '<'). 

### 8.2. Inline Scripts (Simple Logic)
If you must write inline JavaScript, use the is:inline attribute and wrap the code in a template literal inside curly braces {...}. This prevents MDX from processing the content. 

```mdx 
<script is:inline>
{`
    console.log("Hello from inline script");
    localStorage.setItem("key", "value");
`}
</script>
```

### 8.3. External Scripts (Recommended)
For complex logic, imports, or TypeScript support, always extract the code to an external file.
The best practice is to create a dedicated **script loader component**. This provides better encapsulation and clarity.

1.  **Create the script** in `src/scripts/pages/` (e.g., `my-page-script.ts`).
2.  **Create a loader component** in `src/components/` (e.g., `MyPageScript.astro`):
    ```astro
    ---
    ---
    <script src="../scripts/pages/my-page-script.ts"></script>
    ```
3.  **Use the component in MDX**:
    ```mdx
    import MyPageScript from '../../components/MyPageScript.astro';

    <MyPageScript />
    ```

This pattern ensures that Astro's build process correctly handles, bundles, and optimizes the TypeScript file.

**Alternative (Legacy):** For very simple cases, you can import a script directly, but the component approach is preferred.
```mdx
<script> import "../../scripts/pages/my_complex_logic.ts"; </script>
```