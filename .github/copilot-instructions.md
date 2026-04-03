# TheHouseOfPhi - AI Coding Agent Instructions

## Project Overview
Educational physics website with bilingual support (English/Spanish) for pre-university physics concepts. Renders 2D/3D mathematical visualizations using SVG with LaTeX mathematical expressions, with emphasis on vectors, kinematics, and geometry.

**Tech Stack:** Astro 5.18.0 + TypeScript, SVG, HTML5/MDX, mathjs 15.1.0, remark-math + rehype-katex for LaTeX rendering

## Architecture & Core Components

### Module Structure (TypeScript in `/src/scripts/`)
- **core/SVGDrawing.ts** - Foundational utility module: marker creation, text rendering, LaTeX math expression display via MathJax, geometric primitives (circles, segments, arrows). All functions work with SVGElement.
- **core/CartesianPlane.ts** - 2D coordinate system manager; coordinates transformation from math space to SVG pixels, axis/grid drawing, vector/point rendering. Includes `drawVectorB()`, `drawPoint()`, `drawSegment()`, `drawMath()` methods.
- **core/EuclideanSpace.ts** - 3D coordinate system using isometric projection (45° skew angle); uses static `Math.cos(45°)` and `Math.sin(45°)` for transformations
- **core/types.ts** - TypeScript type definitions: `Point2D`, `Point3D`, `LineAttributes`, `TextAttributes`, `MathAttributes` interfaces
- **pages/vectorsPage.ts**, **pages/geometryPage.ts**, **pages/testPage.ts** - Named exports of drawing functions grouped in objects (e.g., `vectorsDrawings`, `geometryDrawings`); each function takes `svg: SVGElement` parameter

### Component Structure (Astro in `/src/components/`) (e.g., `CartesianPlane` with `desiredScale` parameter)
2. **Drawing Function Pattern** - Each visualization exported as a function with signature `(svg: SVGElement) => void` in pages/ modules; grouped in named exports like `vectorsDrawings = { "svg1_1": drawFunc, "svg1_2": drawFunc, ... }`
3. **Bilingual Implementation** - Pages rendered as .astro files in `/src/pages/{en,es}/` folders; language selection handled at file level, not DOM manipulation
4. **Type-Safe Attributes** - Drawing methods accept typed attribute objects: `LineAttributes`, `TextAttributes`, `MathAttributes` interfaces with optional properties and defaults
5. **Mathematical Operations** - Use `math.add()`, `math.subtract()`, `math.multiply()` from mathjs (v15.1.0) for vector operations with type casting: `as Point2D`
6. **MathJax Integration** - LaTeX expressions rendered via declared global `MathJax` (loaded by MathJax.astro); use `drawMath()` method with `\\text{}` and standard LaTeX syntax
7. **Rendering Lifecycle** - VectorCanvas initializes all drawings on mount via `initDrawings()` function; awaits `MathJax.startup.promise` for LaTeX rendering; error handling with try-catch and console logging
### Key Patterns
1. **Coordinate System Transformation** - Physical coordinates [x,y] or [x,y,z] → SVG pixel coordinates; managed by class constructors
2. **Scoped Rendering Blocks** - Each visualization wrapped in `{...}` block (see vectorsPage.js lines 25-98); prevents variable pollution, groups related logic
3. **Bilingual Implementation** - HTML elements marked with `class="lang lang-{en|es}"` and `lang` attribute; controlled by SelectLanguageIndex.js via localStorage
4. **Options Objects** - Most drawing methods accept style options: `{strokeColor, strokeWidth, fill, fontSize, corner, strokeDasharray}`
5. **Mathematical Operations** - Use `math.add()`, `math.multiply()` from mathjs for vector operations; commented reminders to add to .gitignore when integrated

## Developer Workflows

### SetupAstro, mathjs, LaTeX dependencies
npm run dev              # Start Astro dev server (localhost:3000 by default)
npm run build            # Build static site
npm run preview          # Preview production build
```

### Adding New Visualizations
1. **Create function in page module** - In `src/scripts/pages/{vectorsPage|geometryPage|testPage}.ts`, add:
   ```typescript
   "svgX_Y": (svg: SVGElement) => {
       const plane = new CartesianPlane(svg, xMin, xMax, yMin, yMax, scale);
       // drawing logic here
   }from center of SVG with isometric scaling. Call `space.drawAxes()`, then `space.drawPoint()`, `space.drawSegment()`, etc.
- **Vector Visualization** - `plane.drawVectorB(startPoint, vector, labelTeX, lineAttributes, mathAttributes)` for vectors; supports colored strokes and LaTeX labels
- **Language Variants** - Create separate .astro files in `/src/pages/en/` and `/src/pages/es/` directories (e.g., `vectors.astro` in language folder); corresponding page functions must be exported in `pages/{vectorsPage|geometryPage}.ts`
- **Styling** - Edit [src/styles/styles.css](../src/styles/styles.css) for page layout; SVG styling via `LineAttributes` and `TextAttributes` interfaces (strokeColor, strokeWidth, fill, fontSize, fontWeight, etc.)
2. **Add SVG element to .astro page** - In `src/pages/{vectors|geometry}.astro` or corresponding language variant, add:
   ```html
   <figure>
       <svg id="svgX_Y"></svg>
       <figcaption>Your caption here</figcaption>
   </figure>
   ```Language-specific `.astro` files in `/src/pages/{en,es}/` (e.g., `en/vectors.mdx`, `es/vectors.mdx`)
- Utility module exports: All functions in `SVGDrawing.ts` are named exports; class files export ES6 classes
- SVG element IDs: Descriptive pattern `svgSECTION_NUMBER` (e.g., `svg1_1`, `svg1_2` for section 1 examples)
- Drawing function exports: Grouped objects with section number prefix (e.g., `vectorsDrawings = { "svg1_1": ..., "svg1_2": ... }`)

### Comments
- TypeScript JSDoc style for functions/classes/interfaces: `@param`, `@returns`, `@throws`
- **Mandatory English:** All inline comments explaining coordinate transforms, isometric projections, and design decisions must be written in English.
- Section markers with equals signs (see vectorsPage.ts for example pattern)

### Validation Patterns
- SVG element existence checked in VectorCanvas: `if (svg instanceof SVGElement && typeof drawFunc === 'function')`
- Math plane bounds validation in CartesianPlane constructor: `if (xMin > xMax) throw new Error(...)`
- Shared marker defs initialized once: `ensureSharedMarkerDefs()` (idempotent, checks for existing element by ID)
- MathJax readiness: `await MathJax.startup.promise` before rendering LaTeX
- Drawing idempotency: `data-drawn` attribute prevents re-execution on page transitions scale*coordinate`
- **Astro 5.18.0** - Static site generator and component framework; handles routing, MDX compilation, and dev/build pipelines
- **mathjs 15.1.0** - Vector/matrix operations via `math.add()`, `math.subtract()`, `math.multiply()` etc.; fully integrated with TypeScript type casting
- **remark-math 6.0.0** - Markdown/MDX plugin that parses LaTeX delimited by `$...$` and `$$...$$`
- **rehype-katex 7.0.1** - Converts parsed math to HTML via KaTeX (fast LaTeX renderer); integrated in Astro's MDX pipeline
- **rehype-figure 1.0.1** - Converts `<figure>` blocks with captions in MDX
- **SVG Coordinate Transform** - SVG (0,0 at top-left, y increases downward) vs. Mathematical (origin at center, y increases upward): CartesianPlane handles this via `OriginX/Y` and scale factor
- **Isometric Projection** - EuclideanSpace uses fixed 45° angle (`Math.cos(45°) ≈ 0.707`, `Math.sin(45°) ≈ 0.707`); changing angle requires updating both constants throughout the class
- **Marker Definitions** - Arrow markers (Brownarrow, Bluearrow, Greenarrow, etc.) initialized once in hidden SVG via `ensureSharedMarkerDefs()`; all visible SVGs reference via `marker-end` attribute
- **Type Safety** - Full TypeScript compilation; types in `core/types.ts` ensure coordinate tuples and attribute interfaces match across modules
- **Rendering Pipeline** - Astro builds static .html pages at build time; VectorCanvas scripts run client-side post-render, allowing dynamic drawing based on SVG IDs
- **LaTeX Rendering Phases** - (1) Astro build: MDX math converted to HTML via KaTeX; (2) Client-side: MathJax awaited before drawing SVG labels; (3) VectorCanvas initializes drawing functions after DOM ready
- **Language Support** - Implemented via separate page files (not DOM manipulation); no shared SelectLanguageIndex.js needed; each language has its own route
### Naming & File Organization
- Page files: `{vectors,kinematics,geometry}_{en,es}.html` and corresponding scripts
- Utility functions in SVGDrawing.js are exported; class files use ES6 module imports
- SVG element IDs: descriptive (e.g., `svg1_1`, `svg1_2` for section 1 examples)

### Comments
- JSDoc style for functions/classes: `@param`, `@returns`, `@throws`
- **English-only comments:** All documentation and inline comments must be in English to comply with project standards.
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
