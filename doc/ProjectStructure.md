# 📁 Project Structure — The House of Phi

This document describes the internal organization of the codebase inside the `src/` directory after migrating the project to **Astro + MDX**.  
The structure is designed to be clean, scalable, and aligned with the dependency graph of the application.

---

## 🧱 Overview

```text
TheHouseOfPhi-1/
├── .gitignore
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── doc/
│   ├── Backlog.md
│   ├── InternationalizationArchitecture.md
│   ├── MDXAuthoringGuide.md
│   ├── DrawingEngineReference.md
│   ├── ProjectDependencies.md
│   └── ProjectStructure.md
├── public/
│   ├── favicon.svg
│   └── images/
│       └── ...
└── src/
    ├── components/
    │   └── VectorCanvas.astro   <-- Reusable SVG container
    ├── layouts/
    │   └── BaseLayout.astro     <-- Global HTML shell
    ├── pages/
    │   ├── index.astro          <-- Root redirector
    │   ├── en/
    │   │   ├── geometry.mdx
    │   │   └── index.mdx
    │   └── es/
    │       ├── geometry.mdx
    │       └── index.mdx
    ├── plugins/
    │   └── rehype-vector-canvas.mjs <-- Custom Rehype plugin
    ├── scripts/
    │   ├── core/                <-- Reusable math/drawing logic
    │   │   ├── CartesianPlane.js
    │   │   ├── EuclideanSpace.js
    │   │   └── SVGDrawing.js
    │   └── pages/               <-- Page-specific drawing logic
    │       ├── geometryPage.js
    │       └── vectorsPage.js
    ├── styles/
    │   └── styles.css
    └── rehype-figure.d.ts       <-- Type declaration

```


---

## 🧩 Folder Descriptions

### **src/scripts/core/**
Fundamental, reusable modules.  
They do not depend on page controllers or form handlers.

- **SVGDrawing.js**  
  Low‑level SVG drawing utilities: segments, circles, text, markers, etc.

- **CartesianPlane.js**  
  Class for representing a 2D Cartesian plane inside an SVG, including scaling, coordinate transforms, and geometric helpers.

- **EuclideanSpace.js**  
  Class for representing a 3D (or pseudo‑3D) space inside an SVG, useful for spatial geometry and vector visualization.

---

### **src/pages/**
Astro file-system routing.

- **index.astro**: Handles automatic language redirection.
- **[lang]/*.mdx**: Content pages written in Markdown + JSX. They import components like `VectorCanvas` to render graphics.

---

### **src/scripts/pages/**
Drawing logic and controllers for specific pages.
Instead of running automatically, these modules export dictionaries of functions (e.g., `geometryDrawings`) that are invoked by the `VectorCanvas` component when the MDX page loads.

- **geometryPage.js**
- **vectorsPage.js**
- **kinematicsPage.js**

---

### **src/components/**
Reusable Astro components.

- **VectorCanvas.astro**: A wrapper for SVG elements. It handles the lifecycle of the scripts, ensuring graphics are drawn correctly upon page load or navigation.

---

## 🎯 Goals of This Structure

- Maintain a clear separation between graphical logic, mathematical logic, and page logic  
- Make the project scalable as new topics or pages are added  
- Keep the codebase modular, predictable, and easy to maintain  
- Facilitate collaboration between human developers and AI assistants
