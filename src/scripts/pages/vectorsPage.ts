// vectorsPage.ts
// ======================================================
// ES Module for Vectors Page
// ======================================================

// Import core modules
import {
    textWithSubscript,
    renderMathExpression,
    writeValue
} from '../core/SVGDrawing.ts';

import { CartesianPlane } from '../core/CartesianPlane.ts';
import { EuclideanSpace } from '../core/EuclideanSpace.ts';
import * as math from 'mathjs';
import type { Point2D, Point3D } from '../core/types.ts';

export const vectorsDrawings = {
    // ======================================================
    // svg1_1 — A vector represented by a directed segment AB
    // ======================================================
    "svg1_1": (svg: SVGElement) => {
        const plane = new CartesianPlane(svg, -3, 23, 0, 10);

        const pointA: Point2D = [0, 0];
        const pointB: Point2D = [20, 10];

        // Vector = B - A
        const vectorAB = math.subtract(pointB, pointA) as Point2D;

        plane.drawVectorB(pointA, vectorAB, "\\overrightarrow{AB}", {}, { dx: -18, dy: -33 });

        plane.drawMath(pointA, "\\text{A}", { color: "brown", scale: 1.3, dx: -20, dy: -15 });
        plane.drawMath(pointB, "\\text{B}", { color: "brown", scale: 1.3, dx: 1, dy: 0 });
    },

    // ======================================================
    // svg1_2 — Vector addition (graphical method)
    // ======================================================
    "svg1_2": (svg: SVGElement) => {
        const plane = new CartesianPlane(svg, 0, 19, 0, 18);

        const pointA: Point2D = [0, 0];
        const vectorA: Point2D = [4, 12];
        const vectorB: Point2D = [15, 6];
        const vectorAPlusB = math.add(vectorA, vectorB) as Point2D;

        plane.drawVectorB(pointA, vectorA, "\\vec{a}",
            { strokeColor: "green" },
            { scale: 1.2, color: "green", dx: -14, dy: -24 }
        );

        plane.drawVectorB(vectorA, vectorB, "\\vec{b}",
            { strokeColor: "blue" },
            { scale: 1.2, color: "blue", dx: -14, dy: -22 }
        );

        plane.drawVectorB(pointA, vectorAPlusB, "\\overrightarrow{a + b}",
            { strokeColor: "brown" },
            { scale: 1.2, color: "brown", dx: -50, dy: -30 }
        );

        plane.drawVectorB(pointA, vectorB, "\\vec{b}",
            { strokeColor: "blue" },
            { scale: 1.2, color: "blue", dx: -14, dy: -22 }
        );

        plane.drawVectorB(vectorB, vectorA, "\\vec{a}",
            { strokeColor: "green" },
            { scale: 1.2, color: "green", dx: -14, dy: -14 }
        );
    },

    // ======================================================
    // svg1_3 — Cartesian coordinates of a point
    // ======================================================
    "svg1_3": (svg: SVGElement) => {
        const plane = new CartesianPlane(svg, -10, 11, -10, 10);

        plane.drawAxes("y", "x", "O");

        plane.drawPoint([5, 8], "green");
        plane.drawMath([6, 8], "\\text{P}(x_1, y_1)", { color: "green", scale: 1.3, dx: 0, dy: -5 });
        plane.drawMath([5, 0], "x_1", { color: "green", scale: 1.3, dx: -10, dy: 5 });
        plane.drawMath([0, 8], "y_1", { color: "green", scale: 1.3, dx: -25, dy: -5 });
        plane.drawSegment([5, 0], [5, 8], { strokeColor: "green", strokeDasharray: "5,5", strokeWidth: 1 });
        plane.drawSegment([0, 8], [5, 8], { strokeColor: "green", strokeDasharray: "5,5", strokeWidth: 1 });
    },

    // ======================================================
    // svg1_5 — Point P(x1, y1, z1) in Euclidean space
    // ======================================================
    "svg1_5": (svg: SVGElement) => {
        svg.setAttribute("viewBox", "0 0 400 400");
        svg.setAttribute("width", "400");
        svg.setAttribute("height", "400");

        const space = new EuclideanSpace(svg, [0, 0, 0], 10);
        space.drawAxes();

        space.drawPoint([6, 9, 15], "green");

        space.drawSegment([6, 0, 0], [6, 9, 0], { strokeColor: "green", strokeDasharray: "5,5" });
        space.drawSegment([6, 9, 0], [6, 9, 15], { strokeColor: "green", strokeDasharray: "5,5" });
        space.drawSegment([0, 9, 0], [6, 9, 0], { strokeColor: "green", strokeDasharray: "5,5" });
        space.drawSegment([0, 9, 0], [0, 9, 15], { strokeColor: "green", strokeDasharray: "5,5" });
        space.drawSegment([0, 9, 15], [6, 9, 15], { strokeColor: "green", strokeDasharray: "5,5" });
        space.drawSegment([0, 0, 15], [0, 9, 15], { strokeColor: "green", strokeDasharray: "5,5" });
        space.drawSegment([0, 0, 15], [6, 0, 15], { strokeColor: "green", strokeDasharray: "5,5" });
        space.drawSegment([6, 0, 15], [6, 9, 15], { strokeColor: "green", strokeDasharray: "5,5" });
        space.drawSegment([6, 0, 0], [6, 0, 15], { strokeColor: "green", strokeDasharray: "5,5" });

        space.drawMath([6, -0.1, 0], "x_1", { color: "green", scale: 1.2 });
        space.drawMath([0, 9.1, 0.1], "y_1", { color: "green", scale: 1.2 });
        space.drawMath([0, -0.1, 15], "z_1", { color: "green", scale: 1.2 });
        space.drawMath([6, 10, 16], "P(x_1, y_1, z_1)", { color: "green", scale: 1.2 });
    },

    // ======================================================
    // svg1_6 — Projection of W onto V
    // ======================================================
    "svg1_6": (svg: SVGElement) => {
        const plane = new CartesianPlane(svg, 0, 21, 0, 14);

        const origin: Point2D = [2, 2];
        const vectorW: Point2D = [14, 12];
        const vectorV: Point2D = [19, 0];

        // Unit vector of V
        const normV = math.norm(vectorV) as number;
        const unitV = math.multiply(1 / normV, vectorV) as Point2D;

        // Projection of W onto V
        const dotProd = math.dot(vectorW, unitV);
        const projW_on_V = math.multiply(dotProd, unitV) as Point2D;

        // Draw vectors
        plane.drawVectorB(origin, vectorW, "\\vec{w}", { strokeColor: "green" }, { color: "green", scale: 1.5, dx: -10, dy: -30 });

        plane.drawVectorB(origin, vectorV, "\\vec{v}", { strokeColor: "brown" }, { color: "brown", scale: 1.6, dx: 100, dy: -29 });

        plane.drawVectorB(origin, projW_on_V, "\\overrightarrow{Proj_v w}",
            { strokeColor: "green", strokeDasharray: "5,5" },
            { color: "green", scale: 1.2, dx: -10, dy: -38 }
        );

        // Angle between v and w
        plane.drawAngle(origin, vectorV, vectorW, 4, "\\theta", { strokeColor: "CornflowerBlue" }, { color: "CornflowerBlue", scale: 1.3, dx: -12, dy: -5 });
        //plane.drawArc(origin, vectorV, vectorW, 4);
        //plane.drawMath([7, 3], "\\theta", { color: "blue", scale: 1.3, dx: -12, dy: -20 });

        // Dashed segment from W to its projection
        plane.drawSegment(
            math.add(origin, vectorW) as Point2D,
            math.add(origin, projW_on_V) as Point2D,
            { strokeColor: "green", strokeDasharray: "5,5" }
        );
    },

    // ======================================================
    // svg1_7 — Cross product area (Parallelogram)
    // ======================================================
    "svg1_7": (svg: SVGElement) => {
        const plane = new CartesianPlane(svg, -1, 12, -1, 5, 40);

        const origin: Point2D = [0, 0];
        const vectorW: Point2D = [6, 0];
        const vectorV: Point2D = [4, 3];
        const sumVW = math.add(vectorV, vectorW) as Point2D;

        // Vectors
        plane.drawVectorB(origin, vectorV, "\\vec{v}", { strokeColor: "blue" }, { color: "blue", scale: 1.3, dx: -10, dy: -25 });
        plane.drawVectorB(origin, vectorW, "\\vec{w}", { strokeColor: "brown" }, { color: "brown", scale: 1.3, dx: -10, dy: -25 });

        // Parallelogram sides (dashed)
        plane.drawSegment(vectorV, sumVW, { strokeColor: "brown", strokeDasharray: "5,5", strokeWidth: 2 });
        plane.drawSegment(vectorW, sumVW, { strokeColor: "blue", strokeDasharray: "5,5", strokeWidth: 2 });

        // Height (h = |v|sin(theta))
        // Projection of V onto X-axis is (4,0). Height is from (4,0) to (4,3).
        const projV_on_X: Point2D = [4, 0];
        plane.drawSegment(projV_on_X, vectorV, { strokeColor: "green", strokeDasharray: "5,5", strokeWidth: 2 });

        // Label for height
        plane.drawMath([4.2, 1.5], "||\\vec{v}||\\cdot\\sin(\\theta)", { color: "green", scale: 1.1, dx: -3, dy: -8 });

        // Angle theta
        plane.drawArc(origin, vectorW, vectorV, 1.5, { strokeColor: "green" });
        const angleLabelPos: Point2D = [
            1.8 * math.cos(math.atan2(3, 4) / 2),
            1.8 * math.sin(math.atan2(3, 4) / 2)
        ];
        plane.drawMath(angleLabelPos, "\\theta", { color: "green", scale: 1.2, dx: -10, dy: -10 });
    },

    // ======================================================
    // svg1_8 — Moment of a sliding vector v about point P
    // ======================================================
    "svg1_8": (svg: SVGElement) => {
        svg.setAttribute("viewBox", "0 0 400 400");
        svg.setAttribute("width", "400");
        svg.setAttribute("height", "410");

        const space = new EuclideanSpace(svg, [0, 0, 0], 10);
        space.drawAxes();

        const pointP: Point3D = [16, 9, 2];
        const vectorR: Point3D = [0, 6, 2];
        const vectorV: Point3D = [-5, -1, 0];

        space.drawPoint(pointP, "green");
        space.drawVector(pointP, vectorR, "r", { strokeColor: "blue" });

        const initialPoint = math.add(pointP, vectorR) as Point3D;
        space.drawVector(initialPoint, vectorV, "v", { strokeColor: "blue" });

        // Moment m = r × v
        const vectorM = math.cross(vectorR, vectorV) as Point3D;
        space.drawVector(pointP, vectorM, "m",
            { strokeColor: "green" },
            { corner: "righttop" }
        );
    },

    // ======================================================
    // svg1_9 — Moment of v about a line l
    // ======================================================
    "svg1_9": (svg: SVGElement) => {
        svg.setAttribute("viewBox", "0 0 400 400");
        svg.setAttribute("width", "400");
        svg.setAttribute("height", "410");

        const space = new EuclideanSpace(svg, [0, 0, 0], 10);
        space.drawAxes();

        const pointP: Point3D = [16, 9, 2];
        const vectorR: Point3D = [0, 6, 2];
        const vectorV: Point3D = [-5, -1, 0];

        const unitL: Point3D = [0, 0, 1]; // line parallel to z-axis
        const lineL1: Point3D = [16, 9, -2];
        const lineL2: Point3D = [16, 9, 40];

        space.drawPoint(pointP, "green");
        space.drawVector(pointP, vectorR, "r", { strokeColor: "blue" });

        const initialPoint = math.add(pointP, vectorR) as Point3D;
        space.drawVector(initialPoint, vectorV, "v", { strokeColor: "blue" });

        // Moment m = r × v
        const vectorM = math.cross(vectorR, vectorV) as Point3D;
        space.drawVector(pointP, vectorM, "M",
            { strokeColor: "green" },
            { corner: "righttop" }
        );

        // Draw line l
        space.drawSegment(lineL1, lineL2, { strokeColor: "blue" });

        // Projection of M onto l
        const dotProd = math.dot(vectorM, unitL);
        const projM_on_L = math.multiply(dotProd, unitL) as Point3D;

        space.drawVector(pointP, projM_on_L, "M_l",
            { strokeColor: "green", strokeDasharray: "5,5" },
            { corner: "leftbottom" }
        );

        // Dashed segment illustrating projection
        const dashed1 = math.add(pointP, vectorM) as Point3D;
        const dashed2 = math.add(pointP, projM_on_L) as Point3D;

        space.drawSegment(dashed1, dashed2,
            { strokeColor: "green", strokeDasharray: "5,5" }
        );
    },

    // ======================================================
    // Exercise e_1
    // ======================================================
    "svge_1": (svg: SVGElement) => {

        // Exercise data
        const vRiver: Point2D = [9, 0];
        const vBoat: Point2D = [0, 36];

        // vPropelled = vBoat – vRiver
        const vPropelled = math.subtract(vBoat, vRiver) as Point2D;
        const normvPropelled = math.norm(vPropelled) as number;

        // Angle φ between vRiver and vPropelled
        const phi = (math.acos(
            (math.dot(vRiver, vPropelled) as number) /
            ((math.norm(vRiver) as number) * normvPropelled)
        ) as number) * 180 / math.pi;

        const plane = new CartesianPlane(svg, -23, 23, -6, 40, 9);
        plane.drawAxes("y", "x", "O");

        // Labels
        plane.drawMath([7, 39], "\\text{Data:}", { scale: 1.2, dx: 0, dy: 8 });
        plane.drawMath([7, 36], "\\vec{V}_r = \\langle 9, 0 \\rangle \\text{ Km/h}", {});
        plane.drawMath([7, 33], "\\vec{V}_b = \\langle 0, 36 \\rangle \\text{ Km/h}", {});

        const initialPoint: Point2D = [0, 0];

        // Vr
        plane.drawVectorB(initialPoint, vRiver, "\\vec{V}_r", { strokeColor: "cornflowerBlue" }, { scale: 1, dy: 4 });

        // Vp
        plane.drawVectorB(initialPoint, vPropelled, "\\vec{V}_p", { strokeColor: "cornflowerBlue" }, { scale: 1.3, dx: 4, dy: -4 });

        // Components
        plane.drawSegment(vPropelled, math.multiply(-1, vRiver) as Point2D,
            { strokeColor: "green", strokeDasharray: "5,5" }
        );

        plane.drawVectorB(initialPoint, math.multiply(-1, vRiver) as Point2D, "\\vec{V}_x = -\\vec{V}_{rx}",
            { strokeColor: "green" },
            { scale: 1, color: "green", dx: -46, dy: 4 }
        );

        plane.drawSegment(vPropelled, vBoat,
            { strokeColor: "green", strokeDasharray: "5,5" }
        );

        plane.drawVectorB(initialPoint, vBoat, "\\vec{V}_b = \\vec{V}_{py}",
            { strokeColor: "green" },
            { scale: 1.3, color: "green", dx: 5, dy: -4 }
        );

        // Angle
        plane.drawAngle(initialPoint, vRiver, vPropelled, 3, "\\phi", { strokeColor: "orange" }, { color: "orange", scale: 1.2, dx: 0, dy: -8 });
        //plane.drawArc(initialPoint, vRiver, vPropelled, 3);
        //plane.drawMath([3, 3], "\\phi", { color: "blue", scale: 1.2, dx: 0, dy: 0 });

        // Solutions
        plane.drawMath([7, 30], "\\text{Solution:}", { scale: 1.1, dx: 0, dy: 8 });
        plane.drawMath([7, 27], `\\phi = ${phi.toFixed(1)}^\\circ`, { scale: 1.1, dx: 0, dy: 0 });
        plane.drawMath([7, 24], `||\\vec{V}_p|| = ${normvPropelled.toFixed(1)} \\text{ Km/h}`, { scale: 1.1, dx: 0, dy: 0 });
    },
    
    // ======================================================
    // Exercise e_2 — Graphical sum of vectors a, b, c, d
    // ======================================================
    "svge_2": (svg: SVGElement) => {
        const vectorA: Point2D = [2, 3];
        const vectorB: Point2D = [4, -2];
        const vectorC: Point2D = [3, -2];
        const vectorD: Point2D = [-9, 1];

        const xMin = -1, xMax = 10, yMin = -3, yMax = 5;

        const plane = new CartesianPlane(svg, xMin, xMax, yMin, yMax, 34);
        plane.drawAxes("y", "x", "O");

        // Grid
        for (let x = xMin; x <= xMax; x++) {
            plane.drawSegment([x, yMin], [x, yMax],
                { strokeColor: "green", strokeDasharray: "5,5", strokeWidth: 1 }
            );
        }

        for (let y = yMin; y <= yMax; y++) {
            plane.drawSegment([xMin, y], [xMax, y],
                { strokeColor: "green", strokeDasharray: "5,5", strokeWidth: 1 }
            );
        }

        // Draw vectors sequentially
        let initialPoint: Point2D = [0, 0];
        const vectors = [vectorA, vectorB, vectorC, vectorD];
        const names = ["\\vec{a}", "\\vec{b}", "\\vec{c}", "\\vec{d}"];

        for (let i = 0; i < vectors.length; i++) {
            plane.drawVectorB(initialPoint, vectors[i], names[i]);
            initialPoint = math.add(initialPoint, vectors[i]) as Point2D;
        }
    },

    // ======================================================
    // Exercise e_3 — NNE direction, velocity components
    // ======================================================
    "svge_3": (svg: SVGElement) => {
        const sailboatSpeed = 4; // km/h

        // NNE = 3π/8 = 67.5º
        const angleRad = 67.5 * math.pi / 180;

        const sailboatSpeedX = sailboatSpeed * Math.cos(angleRad);
        const sailboatSpeedY = sailboatSpeed * Math.sin(angleRad);
        const sailboatVelocity: Point2D = [sailboatSpeedX, sailboatSpeedY];

        const xMin = -5, xMax = 5, yMin = -1, yMax = 5;

        const plane = new CartesianPlane(svg, xMin, xMax, yMin, yMax, 48);
        plane.drawAxes("N", "E", "O");

        const origin: Point2D = [0, 0];

        // Extremo de la dirección NNE
        const NNEextreme: Point2D = [
            xMax * Math.cos(angleRad),
            yMax * Math.sin(angleRad)
        ];

        plane.drawVectorB(origin, NNEextreme, "NNE", {},{ scale: 1.2, dx: 50, dy: -99 });

        // Velocidad del barco
        plane.drawVectorB(origin, sailboatVelocity, "\\vec{V}",
             { strokeColor: "darkKhaki" }, { scale: 1.2, dx: 0, dy: 0 }
        );

        // Líneas auxiliares
        plane.drawSegment([sailboatSpeedX, 0], [sailboatSpeedX, sailboatSpeedY],
            { strokeColor: "green", strokeDasharray: "5, 5" }
        );

        plane.drawSegment([0, sailboatSpeedY], [sailboatSpeedX, sailboatSpeedY],
            { strokeColor: "green", strokeDasharray: "5, 5" }
        );

        // Componentes
        plane.drawVectorB(origin, [sailboatSpeedX, 0], "\\vec{V}_x",
            { strokeColor: "green" },
            { scale: 1.2, color: "green", dx: -10, dy: 0 }
        );

        plane.drawVectorB(origin, [0, sailboatSpeedY], "\\vec{V}_y",
            { strokeColor: "green" },
            { scale: 1.2, color: "green", dx: 0, dy: -10 }
        );

        // Ángulo entre Vx y V
        const halfAngle = angleRad / 2;
        plane.drawAngle(origin, [sailboatSpeedX, 0], sailboatVelocity, 0.5, "\\theta = 67.5^\\circ", 
            { strokeColor: "cornflowerBlue" },
            { color: "cornflowerBlue", scale: 1.2, dx: -5, dy: -15 }
        );
        
    },

    // ======================================================
    // Exercise e_6 — Projection of NE velocity onto East
    // ======================================================
    "svge_6": (svg: SVGElement) => {
        const planeSpeed = 600; // km/h
        const angleNEDeg = 45; // degrees
        const angleNERad = angleNEDeg * math.pi / 180; // radians


        // Velocity vector V
        const V: Point2D = [
            planeSpeed * Math.cos(angleNERad),
            planeSpeed * Math.sin(angleNERad)
        ];

        // Projection onto East direction (unit vector [1, 0])
        const projEV = math.multiply(
            planeSpeed * Math.cos(angleNERad),
            [1, 0]
        ) as Point2D;

        const xMin = -700, xMax = 700, yMin = -100, yMax = 700;

        const plane = new CartesianPlane(svg, xMin, xMax, yMin, yMax, 0.3);
        plane.drawAxes("", "E", "O");
        plane.drawMath([-15, yMax], "N", { scale: 1.2 });

        const origin: Point2D = [0, 0];

        // NE direction arrow
        const NE: Point2D = [
            xMax * Math.cos(angleNERad),
            yMax * Math.sin(angleNERad)
        ];

        plane.drawVectorB(origin, NE);
        plane.drawMath(NE, "NE", { scale: 1.2, color: "blue", dx: 0, dy: 0 });

        // Velocity vector V
        plane.drawVectorB(origin, V, "V", { strokeColor: "green" }, { scale: 1.2, color: "green", dx: 0, dy: 0 });

        // Projection vector
        // Using LaTeX for subscript
        plane.drawVectorB(origin, projEV, "\\text{proj}_E V",
            { strokeColor: "green" },
            { color: "green", scale: 1.2, dx: 0, dy: 20 }
        );

        // Dashed line from projection to V
        plane.drawSegment(projEV, V,
            { strokeColor: "blue", strokeDasharray: "5, 5" }
        );

        // Angle between projEV and V
        const angleLabelPos: Point2D = [
            120 * Math.cos(33.75 * math.pi / 180),
            120 * Math.sin(33.75 * math.pi / 180)
        ];

        plane.drawArc(origin, projEV, V, 100);
        plane.drawMath(angleLabelPos, "\\theta = 45^\\circ",
            { color: "blue", scale: 1, dx: 0, dy: 0 }
        );
    },

    // ======================================================
    // Exercise 2_8 — Area of triangle ABC in 3D
    // ======================================================
    "svg2_8": (svg: SVGElement) => {
        // 1. Datos del ejercicio
        const A: Point3D = [3, 4, 1];     // m
        const B: Point3D = [1, -2, 2];    // m
        const C: Point3D = [-2, 1, 4];    // m

        // 2. Cálculo de los vectores AB y AC
        const AB = math.subtract(B, A) as Point3D;
        const AC = math.subtract(C, A) as Point3D;

        // 3. Área del triángulo
        // area = |AB × AC| / 2
        const crossProd = math.cross(AB, AC) as Point3D;
        const area = (math.norm(crossProd) as number) / 2;

        // 5. Preparar el SVG
        svg.setAttribute("viewBox", "0 0 400 400");
        svg.setAttribute("width", "400");
        svg.setAttribute("height", "410");

        // Espacio euclídeo 3D con escala 30 px por unidad
        const space = new EuclideanSpace(svg, [0, 0, 0], 30);
        space.drawAxes();

        // 6. Elementos auxiliares para dibujar el paralelogramo
        const BplusAC = math.add(B, AC) as Point3D;

        // 7. Dibujar puntos y etiquetas
        space.drawPoint(A, "green");
        space.drawLabel(A, "A", { corner: "righttop" });

        space.drawPoint(B, "green");
        space.drawLabel(B, "B", { corner: "righttop" });

        space.drawPoint(C, "green");
        space.drawLabel(C, "C", { corner: "leftbottom" });

        // 8. Dibujar los lados del triángulo
        space.drawVector(A, AB, "AB",
            { strokeColor: "green" },
            { corner: "righttop" }
        );

        space.drawVector(A, AC, "AC",
            { strokeColor: "green" },
            { corner: "leftbottom" }
        );

        space.drawSegment(B, C, { strokeColor: "green" });

        // 9. Dibujar el paralelogramo generado por AB y AC
        space.drawSegment(B, BplusAC,
            { strokeColor: "blue", strokeDasharray: "5,5" }
        );

        space.drawSegment(C, BplusAC,
            { strokeColor: "blue", strokeDasharray: "5,5" }
        );
    }
};