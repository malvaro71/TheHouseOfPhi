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
    }
};