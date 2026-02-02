import { ensureSharedMarkerDefs, drawSegment, drawCircle, textWithSubscript, writeText, writeMath } from '../core/SVGDrawing.ts';
import { CartesianPlane } from '../core/CartesianPlane.ts';

export const testDrawings = {
    // ======================================================
    // svg_test_ts — Prueba de concepto TypeScript
    // ======================================================
    "svg_test_ts": (svg: SVGElement) => {
        console.log("Dibujando desde TypeScript...");
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", "20");
        text.setAttribute("y", "50");
        text.textContent = "¡Hola desde TypeScript!";
        text.setAttribute("fill", "navy");
        text.setAttribute("font-size", "24");
        svg.appendChild(text);
    },
    // ======================================================
    // svg_test_segment — Prueba de drawSegment desde TS
    // ======================================================
    "svg_test_segment": (svg: SVGElement) => {
        ensureSharedMarkerDefs();
        // Draw a segment with arrow
        drawSegment(svg, 50, 100, 250, 100, "blue", 4, "none", true);
        // Draw a segment without arrow, dashed
        drawSegment(svg, 50, 150, 250, 150, "green", 2, "5,5", false);
    },
    // ======================================================
    // svg_test_circle_text — Prueba de drawCircle y textWithSubscript
    // ======================================================
    "svg_test_circle_text": (svg: SVGElement) => {
        drawCircle(svg, 100, 100, "red", 5);
        drawCircle(svg, 200, 100, "orange", 10);

        const label = textWithSubscript("P", "1");
        label.setAttribute("x", "110");
        label.setAttribute("y", "105");
        label.setAttribute("font-size", "24");
        svg.appendChild(label);
    },
    // ======================================================
    // svg_test_text — Prueba de writeText y writeVerticalText
    // ======================================================
    "svg_test_text": (svg: SVGElement) => {
        // Center point for reference
        drawCircle(svg, 200, 200, "gray", 2);

        // Test corners
        writeText(svg, "RightBottom", 200, 200, 20, "none", "black", "normal", "rightbottom");
        writeText(svg, "RightTop", 200, 200, 20, "none", "red", "normal", "righttop");
        writeText(svg, "LeftBottom", 200, 200, 20, "none", "blue", "normal", "leftbottom");
        writeText(svg, "LeftTop", 200, 200, 20, "none", "green", "normal", "lefttop");

        // Vertical text
        writeMath(svg, "\\text{Vertical Text}", 50, 300, 1.2, "purple", 0, 0, -90);
    },
    // ======================================================
    // svg_test_math — Prueba de writeMath
    // ======================================================
    "svg_test_math": (svg: SVGElement) => {
        drawCircle(svg, 150, 50, "lightgray", 2);
        writeMath(svg, "E = mc^2", 150, 50, 2, "blue");

        drawCircle(svg, 150, 150, "lightgray", 2);
        writeMath(svg, "\\int_0^\\infty x^2 dx", 150, 150, 1.5, "red", 20, 20);

        drawCircle(svg, 300, 100, "lightgray", 2);
        writeMath(svg, "\\text{Vertical}", 300, 100, 1.2, "purple", 0, 0, -90);
    },
    // ======================================================
    // svg_test_plane — Prueba de CartesianPlane.ts
    // ======================================================
    "svg_test_plane": (svg: SVGElement) => {
        // Instanciamos el plano cartesiano desde TypeScript
        const plane = new CartesianPlane(svg, -10, 10, -5, 5, 20);
        plane.drawAxes("Y", "X", "O");
    },
    // ======================================================
    // svg_test_plane_drawings — Prueba de métodos de dibujo en CartesianPlane.ts
    // ======================================================
    "svg_test_plane_drawings": (svg: SVGElement) => {
        const plane = new CartesianPlane(svg, -5, 5, -5, 5, 40);
        plane.drawAxes("Y", "X", "O");

        plane.drawPoint([-3, 4], "red");
        plane.drawSegment([1, 1], [4, -3], { strokeColor: "blue", strokeDasharray: "5,5" });
        plane.drawCircunference([0, 0], 2, { strokeColor: "purple", strokeWidth: 3 });
    },
    // ======================================================
    // svg_test_plane_arc_path — Prueba de drawArc y drawPath en CartesianPlane.ts
    // ======================================================
    "svg_test_plane_arc_path": (svg: SVGElement) => {
        const plane = new CartesianPlane(svg, -5, 5, -5, 5, 40);
        plane.drawAxes("Y", "X", "O");

        // Arc
        const vertex: [number, number] = [0, 0];
        const v1: [number, number] = [4, 0];
        const v2: [number, number] = [3, 3];
        plane.drawVector(vertex, v1, "v1");
        plane.drawVector(vertex, v2, "v2");
        plane.drawArc(vertex, v1, v2, 2, { strokeColor: "orange", strokeWidth: 3 });

        // Path (Sine wave approximation)
        const points: [number, number][] = [];
        for (let x = -4; x <= 4; x += 0.1) {
            points.push([x, Math.sin(x) * 3]);
        }
        plane.drawPath(points, "magenta");
    },
    // ======================================================
    // svg_test_plane_vectors — Prueba de drawVector y drawVectorB en CartesianPlane.ts
    // ======================================================
    "svg_test_plane_vectors": (svg: SVGElement) => {
        const plane = new CartesianPlane(svg, -5, 5, -5, 5, 40);
        plane.drawAxes("Y", "X", "O");

        // Vector with text label
        plane.drawVector([0, 0], [3, 2], "v", { strokeColor: "blue" }, { fontSize: 20 });

        // Vector with LaTeX label
        plane.drawVectorB([0, 0], [-2, 3], "\\vec{w}", { strokeColor: "green" }, { scale: 1.5, dx: -10, dy: -10 });
        
        // Vector addition visual
        const v1: [number, number] = [2, -1];
        const v2: [number, number] = [1, -2];
        plane.drawVector([0, -1], v1, "a", { strokeColor: "red" });
        plane.drawVector([2, -2], v2, "b", { strokeColor: "orange" });
    },
    // ======================================================
    // svg_test_plane_angles — Prueba de drawAngle y drawRightAngle
    // ======================================================
    "svg_test_plane_angles": (svg: SVGElement) => {
        const plane = new CartesianPlane(svg, -5, 5, -5, 5, 40);
        plane.drawAxes("Y", "X", "O");

        const origin: [number, number] = [0, 0];
        const v1: [number, number] = [3, 0];
        const v2: [number, number] = [0, 3];
        
        // Right angle
        plane.drawVector(origin, v1, "x");
        plane.drawVector(origin, v2, "y");
        plane.drawRightAngle(origin, v1, v2, 0.5, { strokeColor: "magenta" });

        // General angle
        const v3: [number, number] = [-3, 2];
        plane.drawVector(origin, v3, "v");
        plane.drawAngle(origin, v2, v3, 1.5, "α", { strokeColor: "brown" }, { color: "brown", scale: 1.5, dx: -8, dy: -5 });
    }
};