# 📘 Drawing Engine Reference
### (SVGDrawing.js · CartesianPlane.js · EuclideanSpace.js)

This document serves as the technical API reference for the drawing engine of the *House of Phi* project.
It covers the three core modules used to generate geometric visualizations programmatically.

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

---

## 3.2. Drawing Methods

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

---

## 4.2. Drawing Methods

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