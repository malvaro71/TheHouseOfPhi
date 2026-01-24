# TheHouseOfPhi - AI Coding Agent Instructions

## Project Overview
Educational physics website with bilingual support (English/Spanish) for pre-university physics concepts. Renders 2D/3D mathematical visualizations using SVG and JavaScript, with emphasis on vectors, kinematics, and geometry.

**Tech Stack:** Vanilla JS (ES6 modules), SVG, HTML5, mathjs (dependency), ESLint

## Architecture & Core Components

### Module Structure
- **SVGDrawing.js** - Foundational utility module: marker creation, text rendering, math expression display, geometric primitives (circles, segments, arrows)
- **CartesianPlane.js** - 2D coordinate system manager; coordinates transformation from math space to SVG pixels, axis/grid drawing, vector/point rendering
- **EuclideanSpace.js** - 3D coordinate system using isometric projection (45° skew angle); uses static `Math.cos(45°)` and `Math.sin(45°)` for transformations
- **vectorsPage.js**, **geometryPage.js**, **KinematicsPage.js** - Page-specific logic; instantiate plane objects in blocks scoped by SVG element ID; use mathjs for calculations

### Key Patterns
1. **Coordinate System Transformation** - Physical coordinates [x,y] or [x,y,z] → SVG pixel coordinates; managed by class constructors
2. **Scoped Rendering Blocks** - Each visualization wrapped in `{...}` block (see vectorsPage.js lines 25-98); prevents variable pollution, groups related logic
3. **Bilingual Implementation** - HTML elements marked with `class="lang lang-{en|es}"` and `lang` attribute; controlled by SelectLanguageIndex.js via localStorage
4. **Options Objects** - Most drawing methods accept style options: `{strokeColor, strokeWidth, fill, fontSize, corner, strokeDasharray}`
5. **Mathematical Operations** - Use `math.add()`, `math.multiply()` from mathjs for vector operations; commented reminders to add to .gitignore when integrated

## Developer Workflows

### Setup
```bash
npm install              # Install mathjs + ESLint
npm run lint (when configured)  # ESLint via eslint.config.mjs
```

### Adding New Visualizations
1. Create SVG element in HTML with unique ID (e.g., `id="svg2_3"`)
2. In corresponding page script, wrap rendering logic in scoped block: `{ const svg = document.getElementById("svg2_3"); ... }`
3. Instantiate CartesianPlane or EuclideanSpace with SVG, coordinate bounds, scale
4. Call drawing methods: `drawVector()`, `drawPoint()`, `drawLabel()`, `drawAxes()`
5. Import required utilities from SVGDrawing.js

### Common Tasks
- **3D Coordinate System** - Use EuclideanSpace; origin calculated as: `OriginX/Y = svgDim * sin/cos(45°) ± scale*coordinate`
- **Vector Visualization** - `plane.drawVector(startPoint, vector/endPoint, label, strokeOptions, labelOptions)`
- **Language Variants** - Mirror HTML/CSS structure with `lang-en` and `lang-es` classes; store preference in localStorage
- **Styling** - See [styles/styles.css](../styles/styles.css) for layout; inline SVG attributes via options objects

## Project Conventions

### Naming & File Organization
- Page files: `{vectors,kinematics,geometry}_{en,es}.html` and corresponding scripts
- Utility functions in SVGDrawing.js are exported; class files use ES6 module imports
- SVG element IDs: descriptive (e.g., `svg1_1`, `svg1_2` for section 1 examples)

### Comments
- JSDoc style for functions/classes: `@param`, `@returns`, `@throws`
- Inline Spanish comments when documenting design decisions (project origin language)
- Future integration notes (e.g., mathjs, node_modules gitignore)

### Validation Patterns
- 3D coordinates validated with `validateCoordinates3D()`: must be array of 3 finite numbers
- Math plane bounds checked: `if (xMin > xMax) throw Error()`
- Shared marker defs initialized once: `ensureSharedMarkerDefs()` (idempotent, checks for existing element)

## External Integrations & Dependencies

- **mathjs v14.5.3** - Vector/matrix operations; currently commented out in imports, will be integrated into math expressions
- **ESLint 9.30.1** - Configured in eslint.config.mjs; browser globals + math/MathJax reserved as readonly globals
- **MathJax** - Expected for rendering LaTeX; reserved as global in eslint.config.mjs (not yet integrated)

## Important Design Notes
- SVG coordinate system (0,0 at top-left, y increases downward) requires transformation functions for mathematical rendering
- 45° isometric angle is hardcoded constant in EuclideanSpace—changing requires updating both cos/sin values
- Shared marker defs (arrows) appended once to document body; all SVGs reference via `marker-end` attribute with `url(#Brownarrow)` etc.
- No build step; runs directly as modules in browser (type="module" script tags)
