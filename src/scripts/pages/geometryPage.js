// geometryPage.js
// ===============================
// ES Module for Geometry Page
// ===============================

// Import core modules
import { CartesianPlane } from '/src/scripts/core/CartesianPlane.js';
import * as math from 'mathjs';

// Export a dictionary of drawing functions keyed by SVG ID
export const geometryDrawings = {
    // ---------------------------------------------------------
    // A1_1_1 — Triangle with angles and side labels
    // ---------------------------------------------------------
    "svgA1_1_1": (svg) => {
        const plane = new CartesianPlane(svg, -3, 15, -3, 15);

        // Triangle segments
        plane.drawSegment([0, 0], [6, 12], { strokeColor: "brown", strokeWidth: 1 });
        plane.drawSegment([6, 12], [14, 4], { strokeColor: "brown", strokeWidth: 1 });
        plane.drawSegment([14, 4], [0, 0], { strokeColor: "brown", strokeWidth: 1 });

        // Vertices
        plane.drawLabel([0, 0], "A", { fill: "brown", fontSize: 20, corner: "righttop" });
        plane.drawLabel([6, 12], "B", { fill: "brown", fontSize: 20, corner: "leftbottom" });
        plane.drawLabel([14, 4], "C", { fill: "brown", fontSize: 20, corner: "lefttop" });

        // Midpoints
        const midAB = [3, 6];
        const midBC = [10, 8];
        const midCA = [7, 2];

        // Side labels
        plane.drawLabel(midAB, "c", { fill: "brown", fontSize: 20 });
        plane.drawLabel(midBC, "a", { fill: "brown", fontSize: 20 });
        plane.drawLabel(midCA, "b", { fill: "brown", fontSize: 20 });

        // Angle arcs
        plane.drawArc([0, 0], midCA, midAB, 2, { strokeColor: "green", strokeWidth: 1 });
        plane.drawLabel([1.6, 2.7], "α", { fill: "green", fontSize: 20 });

        plane.drawArc([6, 12], math.multiply(-1, midAB), math.subtract(midBC, [6, 12]), 2, { strokeColor: "green", strokeWidth: 1 });
        plane.drawLabel([6.8, 10], "β", { fill: "green", fontSize: 20 });

        plane.drawArc([14, 4], math.subtract(midBC, [14, 4]), math.multiply(-1, midCA), 2, { strokeColor: "green", strokeWidth: 1 });
        plane.drawLabel([11.9, 4.5], "γ", { fill: "green", fontSize: 20 });
    },

    // ---------------------------------------------------------
    // A1_2_1 — Right triangle with hypotenuse, opposite, adjacent
    // ---------------------------------------------------------
    "svgA1_2_1": (svg) => {
        const plane = new CartesianPlane(svg, -3, 15, -3, 11);

        plane.drawSegment([0, 0], [12, 11], { strokeColor: "brown", strokeWidth: 1 });
        plane.drawSegment([12, 11], [12, 0], { strokeColor: "brown", strokeWidth: 1 });
        plane.drawSegment([12, 0], [0, 0], { strokeColor: "brown", strokeWidth: 1 });

        const midAB = [6, 5.5];
        const midBC = [12, 5.5];
        const midCA = [6, 0];

        plane.drawLabel(midAB, "Hyp", { fill: "brown", fontSize: 20 });
        plane.drawLabel(midBC, "Opp", { fill: "brown", fontSize: 20 });
        plane.drawLabel(midCA, "Adj", { fill: "brown", fontSize: 20 });

        plane.drawArc([0, 0], midCA, midAB, 2, { strokeColor: "green", strokeWidth: 1 });
        plane.drawLabel([2, 1.7], "θ", { fill: "green", fontSize: 20 });
    },

    // ---------------------------------------------------------
    // A1_3_1 — Circle: radius, diameter
    // ---------------------------------------------------------
    "svgA1_3_1": (svg) => {
        const plane = new CartesianPlane(svg, -10, 10, -10, 10);

        const center = [5, 5];
        const radius = 4;

        plane.drawCircunference(center, radius);
        plane.drawLabel(center, "C", { fill: "brown", fontSize: 20 });

        const pointC = math.add(center, [radius, 0]);

        plane.drawSegment(center, pointC, { strokeColor: "brown", strokeWidth: 1 });

        const midpoint = [
            (center[0] + pointC[0]) / 2,
            (center[1] + pointC[1]) / 2
        ];
        plane.drawLabel(midpoint, "r", { fill: "brown", fontSize: 20 });

        plane.drawSegment([5, 9], [5, 1], { strokeColor: "blue", strokeWidth: 1 });
        plane.drawLabel([5, 7], "d", { fill: "blue", fontSize: 20 });
    },

    // ---------------------------------------------------------
    // A1_X — Point and projections
    // ---------------------------------------------------------
    "svgA1_X": (svg) => {
        const plane = new CartesianPlane(svg, -10, 11, -10, 10);

        plane.drawAxes("y-axis", "x-axis", "O");

        plane.drawPoint([5, 8], "green");
        plane.drawLabel([6, 8], "P(x₁, y₁)", { fill: "green", fontSize: 20 });

        plane.drawSegment([5, 0], [5, 8], { strokeColor: "green", strokeDasharray: "5,5", strokeWidth: 1 });
        plane.drawSegment([0, 8], [5, 8], { strokeColor: "green", strokeDasharray: "5,5", strokeWidth: 1 });
    }
};
