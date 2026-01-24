## General Flow of the Application

The overall logic of the project follows a clear, layered structure:

**HTML → Forms → Pages → Core → SVG**

- Each **HTML page** loads one *form module* and one *page controller*.
- The **form module** listens to user interactions (inputs, buttons, selectors) and forwards the relevant data to the page controller.
- The **page controller** processes the data, performs calculations, and prepares the graphical output.
- The controller relies on the **core modules** (`CartesianPlane`, `EuclideanSpace`, `SVGDrawing`) to handle geometry, coordinate transformations, and SVG rendering.
- The **core layer** uses low‑level drawing utilities to produce the final SVG elements displayed on the page.

This structure keeps responsibilities separated, ensures modularity, and makes the project easy to extend with new topics or pages.

# Dependency Diagram (Simplified)

HTML Pages
│
├── index.html
│   ├── src/pages/indexPage.js
│   └── src/forms/indexForm.js
│
├── vectors_en.html
│   ├── src/pages/vectorsPage.js
│   └── src/forms/vectorsForm.js
│
├── vectors_es.html
│   ├── src/pages/vectorsPage.js
│   └── src/forms/vectorsForm.js
│
├── geometry_en.html
│   └── src/pages/geometryPage.js
│
├── geometry_es.html
│   └── src/pages/geometryPage.js
│
├── kinematics_en.html
│   └── src/pages/kinematicsPage.js
│
└── kinematics_es.html
    └── src/pages/kinematicsPage.js

# Dependency Diagram (Detailed)

## HTML → Forms & Pages

index.html
│
├── indexPage.js
└── indexForm.js

vectors_en.html / vectors_es.html
│
├── vectorsPage.js
└── vectorsForm.js

geometry_en.html / geometry_es.html
│
└── geometryPage.js

kinematics_en.html / kinematics_es.html
│
└── kinematicsPage.js


## Pages → Core

indexPage.js
    (currently no imports from core)

geometryPage.js
    └── imports:
        - CartesianPlane.js

vectorsPage.js
    └── imports:
        - CartesianPlane.js
        - EuclideanSpace.js

kinematicsPage.js
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


## Forms → Pages

indexForm.js
    └── interacts with:
        - indexPage.js

vectorsForm.js
    └── interacts with:
        - vectorsPage.js

geometryForm.js (future)
    └── will interact with:
        - geometryPage.js

kinematicsForm.js (future)
    └── will interact with:
        - kinematicsPage.js
