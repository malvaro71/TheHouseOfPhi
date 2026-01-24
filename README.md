# 🏛️ The House of Phi  
An educational physics and mathematics website built with **HTML**, **SVG**, and **modular JavaScript (ES Modules)**.

The project provides interactive visualizations, worked examples, and geometric constructions designed to help pre‑university students understand vectors, kinematics, geometry, and other foundational physics concepts.

---

## 🎯 Purpose

The House of Phi aims to:

- Offer clear, interactive explanations of physics and mathematics topics  
- Provide SVG‑based geometric drawings generated entirely with JavaScript  
- Demonstrate how to represent mathematical expressions on the web  
- Serve as a modular, well‑structured codebase for future expansion  

The site is bilingual (**English / Spanish**) and includes a simple language‑selection system.

---

## 🧱 Project Structure

The source code follows a clean, modular architecture:

```
src/
│
├── core/
│   ├── SVGDrawing.js
│   ├── CartesianPlane.js
│   └── EuclideanSpace.js
│
├── pages/
│   ├── indexPage.js
│   ├── geometryPage.js
│   ├── vectorsPage.js
│   └── kinematicsPage.js
│
├── forms/
│   ├── indexForm.js
│   ├── vectorsForm.js
│   ├── geometryForm.js      (future)
│   └── kinematicsForm.js    (future)
│
├── utils/
│   └── (empty for now)
│
└── main.js   (optional)

```

### Folder roles

- **core/** — Low‑level drawing and geometric logic (SVG, planes, coordinate transforms).  
- **pages/** — Controllers for each HTML page.  
- **forms/** — DOM interaction and user input handling.  
- **utils/** — Generic helpers (currently empty).  
- **main.js** — Optional entry point for testing during development.

---

## 🚀 Development Setup

This project uses **npm** and **Vite** for development.

### Install dependencies

```bash
npm install

### Start development server

```bash
npm run dev

### Build for production

```bash
npm run build

## 🌐 Pages Included

- **Home** — Language selection and introduction  
- **Vectors** — Vector components, magnitudes, and SVG visualizations  
- **Kinematics** — Motion diagrams and coordinate systems  
- **Geometry** — Basic geometric constructions and coordinate geometry  

Each page has its own controller and (when needed) form handler.

---

## 🖼️ Technologies Used

- **HTML5**  
- **CSS3**  
- **SVG** for all drawings  
- **JavaScript ES Modules**  
- **math.js** for mathematical operations  
- **Vite** for bundling and development  

---

## 📚 Documentation

Additional documentation is available in the `doc/` folder:

- **ProjectStructure.md**  
- **ModuleReference.md**  
- **DependenciesDiagram.odg**  

---

## 👤 Author

Created by **M.A. Álvaro**  
Source code available at:  
https://github.com/malvaro71/TheHouseOfPhi

---

## 📜 License

This project is open‑source.  
You may reuse the code for educational purposes.


