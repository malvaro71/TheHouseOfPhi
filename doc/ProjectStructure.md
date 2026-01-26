# 📁 Project Structure — The House of Phi

This document describes the internal organization of the codebase inside the `src/` directory after migrating the project to **npm + Vite**.  
The structure is designed to be clean, scalable, and aligned with the dependency graph of the application.

---

## 🧱 Overview


```
TheHouseOfPhi/
|   ├── .gitignore
|   ├── eslint.config.mjs
│   ├── index.html
|   ├── package-lock.json
|   ├── package.json
|   ├── README.md
|   ├── vite.config.js
|
├── .github
│    └── copilot-instructions.md
|
├── .vscode
|    └── settings.json
|
├── doc
|   ├── ModuleReference.md
|   ├── ProjectDependencies.md
|   └── ProjectStructure.md
|
├── node_modules
|       ...
|
├── public/          ← secondary HTML's
│   ├── 404.html
|   ├── geometry_es.html        <-- Access: /geometry_es.html
│   ├── geometry.html
│   ├── kinematics_es.html
│   ├── kinematics.html
│   ├── vectors_es.html
|   ├── vectors.html
|   ├── forms/
|   │   ├── indexForm.js        <-- Access: /forms/indexForm.js
|   │   ├── vectorsForm.js
|   │   ├── geometryForm.js      (future)
|   │   └── kinematicsForm.js    (future)
|   ├── images
|   |   ├── CuriousMonkey.jpg   <-- Access: /images/CuriousMonkey.jpg
|   |   └── ...
|   |
|   ├── pages/
|   │   ├── indexPage.js        <-- Access: /pages/indexPage.js
|   │   ├── geometryPage.js
|   │   ├── vectorsPage.js
|   │   └── kinematicsPage.js
|   │
|   └── styles
|       └── styles.css          <-- Access: /styles/styles.css
└── src/
   │
   ├── core/
   │   ├── SVGDrawing.js
   │   ├── CartesianPlane.js
   │   └── EuclideanSpace.js
   │
   ├── utils/
   │   └── (empty for now)
   │
   └── main.js   (optional)       


/
├─ public/
│   ├─ images/
│   ├─ svg/
│   └─ cualquier archivo estático
│
├─ src/
│   ├─ pages/
│   │   ├─ index.astro
│   │   ├─ geometry.astro
│   │   ├─ geometry_es.astro
│   │   └─ … resto de páginas
│   │
│   ├─ scripts/
│   │   ├─ geometryPage.js
│   │   ├─ vectorsPage.js
│   │   ├─ kinematicsPage.js
│   │   └─ utils.js
│   │
│   ├─ styles/
│   │   └─ styles.css
│   │
│   ├─ components/
│   │   └─ (si quieres modularizar)
│   │
│   └─ assets/
│       └─ imágenes internas si las necesitas
│
├─ astro.config.mjs
├─ package.json
└─ tsconfig.json

```


---

## 🧩 Folder Descriptions

### **core/**
Fundamental, reusable modules.  
They do not depend on page controllers or form handlers.

- **SVGDrawing.js**  
  Low‑level SVG drawing utilities: segments, circles, text, markers, etc.

- **CartesianPlane.js**  
  Class for representing a 2D Cartesian plane inside an SVG, including scaling, coordinate transforms, and geometric helpers.

- **EuclideanSpace.js**  
  Class for representing a 3D (or pseudo‑3D) space inside an SVG, useful for spatial geometry and vector visualization.

---

### **pages/**
Page controllers for each HTML page.  
They orchestrate logic, import modules from `core/`, and use math.js when needed.

- **indexPage.js**  
  Controller for the home page. Handles general initialization and future homepage logic.

- **geometryPage.js**  
- **vectorsPage.js**  
- **kinematicsPage.js**

Each controller prepares the plane, draws elements, and solves example problems displayed on the corresponding HTML page.

---

### **forms/**
Modules that connect HTML inputs with the logic in the page controllers.  
They handle DOM events, validate user input, and trigger updates in the corresponding page controller.

- **indexForm.js**  
  Handles the language selector on the homepage.

- **vectorsForm.js**  
  Connects coordinate inputs with vector drawing and magnitude/direction calculations.

- **geometryForm.js** *(future)*  
- **kinematicsForm.js** *(future)*

---

### **utils/**
Optional folder for helper functions that do not belong in `core/`, `pages/`, or `forms/`.

Useful for:

- generic validation  
- converters  
- math helpers  
- formatting utilities  

Currently empty.

---

### **main.js** *(optional)*
General entry point used during the migration phase.  
Useful for:

- testing modules  
- verifying imports  
- debugging Vite integration  

It may be removed or repurposed later.

---

## 🎯 Goals of This Structure

- Maintain a clear separation between graphical logic, mathematical logic, and page logic  
- Make the project scalable as new topics or pages are added  
- Keep the codebase modular, predictable, and easy to maintain  
- Facilitate collaboration between human developers and AI assistants
