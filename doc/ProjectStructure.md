# 📁 Project Structure — The House of Phi

This document describes the internal organization of the codebase inside the `src/` directory after migrating the project to **Astro + MDX**.  
The structure is designed to be clean, scalable, and aligned with the dependency graph of the application.

---

## 🧱 Overview

```text
TheHouseOfPhi-1/
├── .gitignore                   <-- Files to ignore for Git
├── astro.config.mjs             <-- Main Astro configuration (integrations, plugins)
├── package.json                 <-- Project dependencies and scripts
├── package-lock.json            <-- Exact dependency versions
├── tsconfig.json                <-- TypeScript configuration
├── .astro/
├── .github/
│   └── copilot-instructions.md
├── .vscode/
│   ├── extensions.json
│   ├── launch.json
│   └── settings.json
├── doc/
│   ├── Backlog.md
│   ├── DrawingEngineReference.md
│   ├── InternationalizationArchitecture.md
│   ├── MDXAuthoringGuide.md
│   ├── ProjectDependencies.md
│   └── ProjectStructure.md
├── node_modules/
├── public/
│   ├── favicon.svg
│   └── images/
│       └── ...
└── src/
    ├── assets/
    │   └── ...
    ├── components/
    │   ├── MathJax.astro               <-- Client-side math rendering (MathJax)
    │   ├── TestPageScript.astro        <-- Script loader for TestPage
    │   ├── VectorCanvas.astro          <-- Reusable container for dynamic SVGs
    │   ├── VectorConverter.astro       <-- Interactive vector calculator component
    │   └── VectorsExercisesScript.astro <-- Script loader for vector exercises
    ├── layouts/
    │   └── BaseLayout.astro     <-- Global HTML shell
    ├── pages/
    │   ├── index.astro          <-- Root redirector
    │   ├── en/
    │   │   ├── geometry.mdx
    │   │   ├── index.mdx
    │   │   ├── kinematics.mdx
    │   │   └── vectors.mdx
    │   └── es/
    │       ├── geometry.mdx
    │       ├── index.mdx
    │       ├── kinematics.mdx
    │       └── vectors.mdx 
    ├── plugins/
    │   └── rehype-vector-canvas.mjs <-- Custom Rehype plugin (img[src="vector:"] -> <VectorCanvas/>)
    ├── scripts/
    │   ├── components/          <-- Logic for interactive UI components
    │   │   └── VectorConverterLogic.ts
    │   ├── core/                <-- Reusable math/drawing logic
    │   │   ├── CartesianPlane.ts
    │   │   ├── EuclideanSpace.ts
    │   │   ├── SVGDrawing.ts
    │   │   └── types.ts
    │   └── pages/               <-- Page-specific drawing logic
    │       ├── geometryPage.ts      <-- Drawings for geometry.mdx
    │       ├── testPage.ts
    │       └── vectorsExercises.ts  <-- Drawings & interactivity for vectors.mdx
    ├── styles/
    │   └── styles.css
    └── rehype-figure.d.ts       <-- Type declaration for rehype-figure plugin

```


---

## 🧩 Folder Descriptions

### Root Files Configuration

- **`astro.config.mjs`**:
  - **Integrations**: Loads MDX, Math (Remark/Rehype), and custom plugins like `rehype-vector-canvas`.
  - **Base Path Strategy**: Handles the difference between GitHub Pages (subdirectory) and Localhost (root).
    - In **Production** (build): Sets `base: '/TheHouseOfPhi-1'` so assets load correctly from the repository subfolder.
    - In **Development** (local): Sets `base: '/'` so URLs work naturally at `localhost:4321/`.

### **src/components/**
Reusable Astro components (.astro) used within the MDX pages.

- **VectorCanvas.astro**: A key component that acts as a container for SVG graphics. It receives an id and uses it to invoke the corresponding drawing function from a page script.

- **VectorConverter.astro**: An interactive UI component (an "island") for vector calculations.

- *Script.astro: Loader components that simply contain a <script> tag to import and execute the necessary TypeScript for a page (e.g., VectorsExercisesScript.astro).

---

### **src/pages/**
Contains all the content of the site, organized by language (en/, es/). Each page is an .mdx file that combines Markdown with Astro components. The root index.astro handles language redirection.

---

### **src/plugins/**
Custom plugins that extend the build process. 
- rehype-vector-canvas.mjs: A crucial plugin that intercepts Markdown image syntax like !... and transforms it into a <VectorCanvas id="my-id" /> component call. This is the magic that connects the MDX content to the drawing engine.

### src/scripts/ 
This directory contains all the client-side TypeScript logic.

### **src/scripts/components/**
Contains the logic for interactive components. For example, VectorConverterLogic.ts would handle the events and calculations for the VectorConverter.astro component.

- **VectorConverterLogic.js**

---

### **src/scripts/core/**
Fundamental, reusable modules.  
They do not depend on page controllers or form handlers.

- **SVGDrawing.ts**: Low-level utilities for creating SVG elements (lines, circles, text) and MathJax integration for SVG labels.
- **CartesianPlane.ts**: Class for representing a 2D Cartesian plane inside an SVG, handling scaling and coordinate transforms.
- **EuclideanSpace.ts**: Class for representing a 3D space inside an SVG using isometric projection (45° skew).
- **types.ts**: Shared TypeScript type definitions (e.g., `Point2D`, `Point3D`, `LineAttributes`).

---

### **src/scripts/pages/**
Contains the specific logic for each content page. For example, vectorsExercises.ts includes all the drawing and interactivity functions for the exercises in vectors.mdx. These scripts are loaded by the *Script.astro components.

---

## 🎯 Goals of This Structure

- Maintain a clear separation between graphical logic, mathematical logic, and page logic  
- Make the project scalable as new topics or pages are added  
- Keep the codebase modular, predictable, and easy to maintain  
- Facilitate collaboration between human developers and AI assistants
