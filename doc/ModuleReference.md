# 📘 Drawing Engine Reference — Training Guide for AI Agents  
### (SVGDrawing.js · CartesianPlane.js · EuclideanSpace.js)

This document teaches an AI agent how to correctly use the drawing engine of the *House of Phi* project.  
It covers the three core modules:

- **SVGDrawing.js** — low‑level SVG primitives  
- **CartesianPlane.js** — 2D coordinate plane engine  
- **EuclideanSpace.js** — 3D Euclidean space with isometric projection  

The goal is to give the agent a precise operational model of how to draw geometric objects in 2D and 3D using SVG.

---

# 🧱 1. Architecture Overview

The drawing system is structured in three layers:

| Layer | File | Purpose |
|------|------|---------|
| **Low-level primitives** | `SVGDrawing.js` | Creates SVG elements: segments, circles, text, markers |
| **2D engine** | `CartesianPlane.js` | Draws points, vectors, arcs, paths in a Cartesian plane |
| **3D engine** | `EuclideanSpace.js` | Draws points, vectors, paths in 3D (projected to 2D) |

Higher layers depend on lower layers, never the opposite.

---

# 🧩 2. SVGDrawing.js — Low-Level SVG Primitives

This module provides the fundamental drawing operations used by all higher-level classes.

## 2.1. `validateObject(obj)`
Ensures the argument is a valid object.  
Used to validate style dictionaries.

## 2.2. `writeText(svg, text, x, y, fontSize, stroke, fill, fontWeight, corner)`
Writes a text label at a given SVG coordinate.

- `corner` controls alignment:  
  `"righttop"`, `"rightbottom"`, `"lefttop"`, `"leftbottom"`

## 2.3. `writeVerticalText(svg, text, x, y, fontSize, stroke, fill)`
Writes vertical text (used for y-axis labels).

## 2.4. `drawCircle(svg, cx, cy, color, radius)`
Draws a point or circular marker.

## 2.5. `drawSegment(svg, x1, y1, x2, y2, strokeColor, strokeWidth, dash, showArrow)`
Draws a line segment with optional arrowhead.

Requires that `ensureSharedMarkerDefs()` has been called once.

## 2.6. `ensureSharedMarkerDefs()`
Creates global SVG `<defs>` with arrow markers.  
Must be executed **once per document**, before drawing vectors.

---

# 🧭 3. CartesianPlane.js — 2D Drawing Engine

This class represents a 2D Cartesian plane embedded in an SVG element.

## 3.1. Constructor
```js
new CartesianPlane(svgElement, xMin, xMax, yMin, yMax, scale)
```

- Reads the SVG width/height automatically  
- Computes scaling factors  
- Computes the SVG coordinates of the origin  

The agent **must not** set SVG width/height manually.

---

## 3.2. Coordinate Transform  
### `transformCoordinates()`  
This method converts Cartesian coordinates into SVG coordinates.

**The agent must NOT call this method directly.**  
All drawing methods call it internally.

---

## 3.3. Drawing Methods

### `drawPoint([x, y], color)`
Draws a point.

### `drawSegment([x1, y1], [x2, y2], attributes)`
Draws a line segment.

### `drawCircunference(center, radius, attributes)`
Draws a circle scaled to the plane.

### `drawArc(vertex, initialSide, terminalSide, radius, attributes)`
Draws an angle arc using SVG path commands.  
Uses `math.js` for vector normalization.

### `drawVector(initialPoint, vectorComponents, textContent, lineAttributes, textAttributes)`
Draws a vector with optional label.

### `drawPath(points, color)`
Draws a polyline through a list of points.

### `drawLabel(point, text, attributes)`
Writes a label at a given Cartesian coordinate.

### `drawAxes(yAxisText, xAxisText, originText)`
Draws the x- and y-axes with arrowheads and labels.

---

# 🌐 4. EuclideanSpace.js — 3D Drawing Engine (Isometric Projection)

This class represents a 3D Euclidean space projected into 2D SVG coordinates.

## 4.1. Constructor
```js
new EuclideanSpace(svgElement, centerPoint3D, scale)
```

- Reads SVG width/height automatically  
- Computes the projected origin using a 45° skew  
- No manual coordinate transforms required  

---

## 4.2. Coordinate Transform  
### `transformCoordinates()`  
Projects 3D coordinates into 2D.

**The agent must NOT call this method directly.**  
All drawing methods call it internally.

---

## 4.3. Drawing Methods

### `drawPoint([x, y, z], color)`
Draws a 3D point.

### `drawSegment(pointA, pointB, attributes)`
Draws a 3D segment.

### `drawVector(initialPoint, vectorComponents, textContent, lineAttributes, textAttributes)`
Draws a 3D vector with optional label.  
Uses `math.add()` to compute the endpoint.

### `drawPath(points3D, color)`
Draws a polyline through 3D points.

### `drawLabel(point3D, text, attributes)`
Writes a label at a projected 3D coordinate.

### `drawAxes()`
Draws the x-, y-, and z-axes with labels.

---

# 🧠 5. How an AI Agent Should Use These Modules

## 5.1. The "VectorCanvas" Pattern
In the Astro/MDX architecture, we do not manipulate the DOM directly in the global scope. Instead, we define drawing functions in a script file and map them to IDs.

### Step 1: Define the drawing logic (e.g., `src/scripts/pages/myPage.js`)
Export a dictionary named `geometryDrawings` (or similar) where keys are SVG IDs and values are functions that accept the SVG element.

```js
import { CartesianPlane } from '/src/scripts/core/CartesianPlane.js';

export const geometryDrawings = {
    "mySvgId": (svg) => {
        const plane = new CartesianPlane(svg, -5, 5, -5, 5);
        plane.drawVector([0,0], [3,2], "v");
        plane.drawAxes("y", "x", "O");
    },
    "anotherSvgId": (svg) => {
        // ... another drawing
    }
};
```

## 5.3. Use the engines without manual transforms

### For 2D:
```js
const plane = new CartesianPlane(svg, -5, 5, -5, 5, 40);
plane.drawVector([0,0], [3,2], "v");
plane.drawPoint([2,1], "red");
plane.drawAxes("y", "x", "O");
```

### For 3D:
```js
const space = new EuclideanSpace(svg, [0,0,0], 40);
space.drawVector([0,0,0], [2,1,3], "u");
space.drawPoint([1,1,1], "blue");
space.drawAxes();
```

## 5.4. The agent must NOT:
- call `transformCoordinates()`  
- compute SVG coordinates manually  
- set SVG width/height dynamically  
- bypass validation methods  

The classes handle all coordinate conversions internally.

---

# 🏁 6. Summary

This training document equips an AI agent with:

- a complete understanding of the drawing primitives  
- the 2D Cartesian drawing engine  
- the 3D Euclidean projection engine  
- the correct initialization sequence  
- the correct usage patterns  
- the expected parameter formats  
- the relationships between modules  

With this knowledge, the agent can safely and correctly generate SVG-based geometric visualizations using the House of Phi drawing engine.
