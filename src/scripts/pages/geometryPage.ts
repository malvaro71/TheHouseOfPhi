// geometryPage.ts
// ===============================
// ES Module for Geometry Page
// ===============================

// Import core modules
import { CartesianPlane } from '../core/CartesianPlane.ts';
import * as math from 'mathjs';
import type { Point2D } from '../core/types.ts';

// Export a dictionary of drawing functions keyed by SVG ID
export const geometryDrawings = {
    // ---------------------------------------------------------
    // A1_1_1 — Triangle with angles and side labels
    // ---------------------------------------------------------
    "svgA1_1_1": (svg: SVGElement) => {
        const plane = new CartesianPlane(svg, -3, 15, -3, 15);

        // Triangle segments
        plane.drawSegment([0, 0], [6, 12], { strokeColor: "brown", strokeWidth: 1 });
        plane.drawSegment([6, 12], [14, 4], { strokeColor: "brown", strokeWidth: 1 });
        plane.drawSegment([14, 4], [0, 0], { strokeColor: "brown", strokeWidth: 1 });

        // Vertices
        plane.drawMath([0, 0], "\\text{A}", { color: "brown", scale: 1.3, dx: -16, dy: -3 });
        plane.drawMath([6, 12], "\\text{B}", { color: "brown", scale: 1.3, dx: 1, dy: -16 });
        plane.drawMath([14, 4], "\\text{C}", { color: "brown", scale: 1.3, dx: 1, dy: -1 });

        // Midpoints
        const midAB: Point2D = [3, 6];
        const midBC: Point2D = [10, 8];
        const midCA: Point2D = [7, 2];

        // Side labels
        plane.drawMath(midAB, "\\text{c}", { color: "brown", scale: 1.3, dx: -16, dy: -3 });
        plane.drawMath(midBC, "\\text{a}", { color: "brown", scale: 1.3, dx: 1, dy: -1 });
        plane.drawMath(midCA, "\\text{b}", { color: "brown", scale: 1.3, dx: 1, dy: -1 });

        // Angle arcs
        plane.drawArc([0, 0], midCA, midAB, 2, { strokeColor: "green", strokeWidth: 1 });
        plane.drawMath([1.6, 2.7], "\\alpha", { color: "green", scale: 1.3, dx: 1, dy: 5 });

        plane.drawArc([6, 12], math.multiply(-1, midAB) as Point2D, math.subtract(midBC, [6, 12]) as Point2D, 2, { strokeColor: "green", strokeWidth: 1 });
        plane.drawMath([6.8, 10], "\\beta", { color: "green", scale: 1.3, dx: -12, dy: 6 });

        plane.drawArc([14, 4], math.subtract(midBC, [14, 4]) as Point2D, math.multiply(-1, midCA) as Point2D, 2, { strokeColor: "green", strokeWidth: 1 });
        plane.drawMath([11.9, 4.5], "\\gamma", { color: "green", scale: 1.3, dx: -15, dy: -5 });
    },

    // ---------------------------------------------------------
    // A1_2_1 — Right triangle with hypotenuse, opposite, adjacent
    // ---------------------------------------------------------
    "svgA1_2_1": (svg: SVGElement) => {
        const plane = new CartesianPlane(svg, -3, 15, -3, 11);

        plane.drawSegment([0, 0], [12, 11], { strokeColor: "brown", strokeWidth: 1 });
        plane.drawSegment([12, 11], [12, 0], { strokeColor: "brown", strokeWidth: 1 });
        plane.drawSegment([12, 0], [0, 0], { strokeColor: "brown", strokeWidth: 1 });

        const midAB: Point2D = [6, 5.5];
        const midBC: Point2D = [12, 5.5];
        const midCA: Point2D = [6, 0];

        plane.drawMath(midAB, "\\text{Hyp}", { color: "brown", scale: 1.3, dx: 3, dy: 0 });
        plane.drawMath(midBC, "\\text{Opp}", { color: "brown", scale: 1.3, dx: 3, dy: 0 });
        plane.drawMath(midCA, "\\text{Adj}", { color: "brown", scale: 1.3, dx: 0, dy: 3 });

        plane.drawArc([0, 0], midCA, midAB, 2, { strokeColor: "green", strokeWidth: 1 });
        plane.drawMath([2, 1.7], "\\theta", { color: "green", scale: 1.3, dx: 0, dy: 0 });
    },

    // ---------------------------------------------------------
    // A1_3_1 — Circle: radius, diameter
    // ---------------------------------------------------------
    "svgA1_3_1": (svg: SVGElement) => {
        const plane = new CartesianPlane(svg, -10, 10, -10, 10);

        const center: Point2D = [0, 0];
        const radius = 9;

        plane.drawCircunference(center, radius);
        plane.drawPoint(center, "green");
        plane.drawMath(center, "\\text{C}", { color: "green", scale: 1.3, dx: -22, dy: -9 });

        const pointC = math.add(center, [radius, 0]) as Point2D;

        plane.drawSegment(center, pointC, { strokeColor: "brown", strokeWidth: 1 });

        const midpoint: Point2D = [
            (center[0] + pointC[0]) / 2,
            (center[1] + pointC[1]) / 2
        ];
        plane.drawMath(midpoint, "r", { color: "brown", scale: 1.3, dx: 0, dy: -15 });

        plane.drawSegment([center[0], center[1] - radius], [center[0], center[1] + radius], { strokeColor: "blue", strokeWidth: 1 });
        plane.drawMath([center[0], 4], "d", { color: "blue", scale: 1.3, dx: 5, dy: 0 });
    },

    // ---------------------------------------------------------
    // A1_X — Point and projections
    // ---------------------------------------------------------
    "svgA1_X": (svg: SVGElement) => {
        const plane = new CartesianPlane(svg, -10, 11, -10, 10);

        plane.drawAxes("y", "x", "O");

        plane.drawPoint([5, 8], "green");
        plane.drawMath([6, 8], "\\text{P}(x_1, y_1)", { color: "green", scale: 1.3, dx: 0, dy: -5 });
        plane.drawMath([5, 0], "x_1", { color: "green", scale: 1.3, dx: -10, dy: 5 });
        plane.drawMath([0, 8], "y_1", { color: "green", scale: 1.3, dx: -25, dy: -5 });
        plane.drawSegment([5, 0], [5, 8], { strokeColor: "green", strokeDasharray: "5,5", strokeWidth: 1 });
        plane.drawSegment([0, 8], [5, 8], { strokeColor: "green", strokeDasharray: "5,5", strokeWidth: 1 });  
    }
};