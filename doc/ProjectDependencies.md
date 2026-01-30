## General Flow of the Application

The overall logic of the project follows a clear, layered structure:

**MDX Page → VectorCanvas Component → Page Script → Core → SVG**

- Each **MDX page** (e.g., `geometry.mdx`) contains content and `VectorCanvas` components.
- The **VectorCanvas** component imports a specific *Page Script* (e.g., `geometryPage.js`).
- The **Page Script** exports a dictionary of drawing functions. It does not run automatically.
- The controller relies on the **core modules** (`CartesianPlane`, `EuclideanSpace`, `SVGDrawing`) to handle geometry, coordinate transformations, and SVG rendering.
- The **core layer** uses low‑level drawing utilities to produce the final SVG elements displayed on the page.

This structure keeps responsibilities separated, ensures modularity, and makes the project easy to extend with new topics or pages.

# Dependency Diagram (Simplified)

MDX Pages (src/pages/[lang]/)
│
├── index.mdx
│
├── geometry.mdx
│   └── imports <VectorCanvas />
│       └── imports src/scripts/pages/geometryPage.js
│
└── kinematics.mdx
    └── imports <VectorCanvas />
        └── imports src/scripts/pages/kinematicsPage.js

# Dependency Diagram (Detailed)

## MDX → Components

src/pages/es/geometry.mdx
    └── uses: src/components/VectorCanvas.astro

## Components → Scripts

VectorCanvas.astro
    └── imports: src/scripts/pages/geometryPage.js
    └── executes: geometryDrawingsid

## Scripts → Core

geometryPage.js
    └── imports:
        - CartesianPlane.js
        - SVGDrawing.js

vectorsPage.js / kinematicsPage.js
    └── imports:
        - CartesianPlane.js
        - EuclideanSpace.js

## Core → Internal Logic

SVGDrawing.js
    (stand‑alone, no imports)

CartesianPlane.js
    └── imports:
        - SVGDrawing.js

EuclideanSpace.js
    └── imports:
        - SVGDrawing.js
