## General Flow of the Application

The overall logic of the project follows a clear, layered structure:

**MDX Page → Rehype Plugin → VectorCanvas Component → Page Script → Core → SVG**

- Each **MDX page** (e.g., `geometry.mdx`) contains content and references to dynamic graphics using the `vector:` protocol in standard image syntax.
- The **Rehype Plugin** (`rehype-vector-canvas`) transforms these image tags into `VectorCanvas` components during the build process.
- The **VectorCanvas** component acts as a container. The drawing logic is handled by a **Page Script** (e.g., `geometryPage.ts` or `vectorsExercises.ts`).
- The **Page Script** can either export a dictionary of drawing functions (invoked by the component) or run automatically to populate the SVGs.
- The controller relies on the **core modules** (`CartesianPlane`, `EuclideanSpace`, `SVGDrawing`) to handle geometry, coordinate transformations, and SVG rendering.
- The **core layer** uses low‑level drawing utilities to produce the final SVG elements displayed on the page.

This structure keeps responsibilities separated, ensures modularity, and makes the project easy to extend with new topics or pages.

## Rendering Lifecycle

The project employs a hybrid rendering strategy involving both build-time generation and client-side hydration:

1.  **Build Time (Astro/Server):**
    *   MDX content is compiled to HTML.
    *   Standard LaTeX expressions (`$...$`) are rendered to static HTML/MathML using **KaTeX** (via `rehype-katex`).
    *   `vector:` image tags are transformed into `<VectorCanvas>` components (via `rehype-vector-canvas`).

2.  **Client Time (Browser):**
    *   **MathJax** loads (via `MathJax.astro`) and processes any dynamic LaTeX strings (e.g., inside `drawMath` calls in SVGs or dynamic exercises).
    *   **VectorCanvas** components wait for the DOM to be ready.
    *   Page-specific scripts (e.g., `vectorsExercises.ts`) execute, calculating geometry and manipulating the DOM to inject SVG elements (lines, circles, text) into the containers.
    *   **MathJax** is awaited before measuring or rendering text labels inside SVGs to ensure correct dimensions.

# Dependency Diagram (Simplified)

MDX Pages (src/pages/[lang]/)
│
├── index.mdx
├── geometry.mdx
│   └── uses `vector:` protocol
│       └── transformed by `rehype-vector-canvas`
│           └── imports <VectorCanvas />
│               └── imports src/scripts/pages/geometryPage.ts        
└── vectors.mdx
    ├── uses `vector:` protocol
    │   └── transformed by `rehype-vector-canvas`
    │       └── imports <VectorCanvas />
    │           └── imports src/scripts/pages/vectorsPage.ts│
    ├── imports <VectorsExercisesScript />
    │   └── imports src/scripts/pages/vectorsExercises.ts
    └── imports <VectorConverter />
        └── imports src/scripts/components/VectorConverterLogic.ts

# Dependency Diagram (Detailed)

## MDX → Components

src/pages/es/geometry.mdx
    └── processed by: src/plugins/rehype-vector-canvas.mjs
        └── generates: src/components/VectorCanvas.astro

src/pages/es/vectors.mdx
    └── uses: src/components/VectorConverter.astro
    └── uses: src/components/VectorsExercisesScript.astro

## Components → Scripts

VectorCanvas.astro
    └── imports: src/scripts/pages/geometryPage.ts
    └── executes: geometryDrawingsid

VectorConverter.astro
    └── imports: src/scripts/components/VectorConverterLogic.ts

VectorsExercisesScript.astro
    └── imports: src/scripts/pages/vectorsExercises.ts

## Scripts → Core

geometryPage.ts
    └── imports:
        - CartesianPlane.ts
        - SVGDrawing.ts

vectorsExercises.ts
    └── imports:
        - CartesianPlane.ts
        - EuclideanSpace.ts
        - SVGDrawing.ts
        - types.ts

## Core → Internal Logic

SVGDrawing.ts
    (stand‑alone, no imports)

CartesianPlane.ts
    └── imports:
        - SVGDrawing.ts
        - types.ts

EuclideanSpace.ts
    └── imports:
        - SVGDrawing.ts
        - types.ts

## Global Runtime Dependencies

- **MathJax**: Loaded globally via `MathJax.astro`. Required by `SVGDrawing.ts` for `drawMath` and `renderMathExpression`.
- **Shared SVG Markers**: Initialized by `SVGDrawing.ts` (`ensureSharedMarkerDefs`) into the document body. Used by `drawSegment` and `drawVector` to render arrowheads.
