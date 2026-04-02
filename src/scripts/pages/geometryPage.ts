// geometryPage.ts
// ===============================
// ES Module for Geometry Page
// ===============================

// Import core modules
import { CartesianPlane } from '../core/CartesianPlane.ts';
import { ensureSharedMarkerDefs } from '../core/SVGDrawing.ts';
import * as math from 'mathjs';
import type { Point2D } from '../core/types.ts';

// Export a dictionary of drawing functions keyed by SVG ID
export const geometryDrawings = {
    // ======================================================
    // svgA1_1 — Cartesian coordinates of a point and quadrants
    // ======================================================
    "svgA1_1": (svg: SVGElement) => {
        // Initialize the 2D Cartesian plane with grid boundaries
        const plane = new CartesianPlane(svg, -10, 11, -10, 10);

        // Draw coordinate axes with labels for Y, X and the Origin (O)
        plane.drawAxes("Y", "X", "O");

        // Draw labels for each of the four quadrants (I, II, III, IV)
        plane.drawMath([7, 7], "\\text{I}", { color: "brown", scale: 1.5 });
        plane.drawMath([-7, 7], "\\text{II}", { color: "brown", scale: 1.5 });
        plane.drawMath([-7, -7], "\\text{III}", { color: "brown", scale: 1.5 });
        plane.drawMath([7, -7], "\\text{IV}", { color: "brown", scale: 1.5 });

        // Draw the target point P at coordinates (5, 8) in green
        plane.drawPoint([5, 8], "green");
        // Add a mathematical label for the point P(x, y)
        plane.drawMath([6, 8], "\\text{P}(x, y)", { color: "green", scale: 1.3, dx: 0, dy: -5 });
        // Draw the vector position r (5,8)
        plane.drawVectorB([0, 0], [5, 8], "\\vec r", { strokeColor: "green" }, { scale: 1.3, dx: 0, dy: 0 });
        // Label the x1 value on the horizontal axis
        plane.drawMath([5, 0], "x", { color: "green", scale: 1.3, dx: -10, dy: 5 });
        // Label the y1 value on the vertical axis
        plane.drawMath([0, 8], "y", { color: "green", scale: 1.3, dx: -25, dy: -5 });
        // Draw a vertical dashed line connecting the x-axis to the point
        plane.drawSegment([5, 0], [5, 8], { strokeColor: "green", strokeDasharray: "5,5", strokeWidth: 1 });
        // Draw a horizontal dashed line connecting the y-axis to the point
        plane.drawSegment([0, 8], [5, 8], { strokeColor: "green", strokeDasharray: "5,5", strokeWidth: 1 });
    }/*,
    
    // ======================================================
    // svgA1_2 — Line given by \(\vec r(t)=\vec r_0+t\vec v\), showing \(\vec v\) as an increment per unit of \(t\).
    // ======================================================
    "svgA1_2": (svg: SVGElement) => {
        // Initialize the 2D Cartesian plane with grid boundaries
        const plane = new CartesianPlane(svg, -10, 11, -10, 10);

        // Draw coordinate axes with labels for Y, X and the Origin (O)
        plane.drawAxes("Y", "X", "O");

       

        // Draw the target point P at coordinates (5, 8) in green
        plane.drawPoint([5, 8], "green");
        // Add a mathematical label for the point P(x, y)
        plane.drawMath([6, 8], "\\text{P}(x, y)", { color: "green", scale: 1.3, dx: 0, dy: -5 });
        // Draw the vector position r (5,8)
        plane.drawVectorB([0, 0], [5, 8], "\\vec r", { strokeColor: "green" }, { scale: 1.3, dx: 0, dy: 0 });
        // Label the x1 value on the horizontal axis
        plane.drawMath([5, 0], "x", { color: "green", scale: 1.3, dx: -10, dy: 5 });
        // Label the y1 value on the vertical axis
        plane.drawMath([0, 8], "y", { color: "green", scale: 1.3, dx: -25, dy: -5 });
        // Draw a vertical dashed line connecting the x-axis to the point
        plane.drawSegment([5, 0], [5, 8], { strokeColor: "green", strokeDasharray: "5,5", strokeWidth: 1 });
        // Draw a horizontal dashed line connecting the y-axis to the point
        plane.drawSegment([0, 8], [5, 8], { strokeColor: "green", strokeDasharray: "5,5", strokeWidth: 1 });
    },
    
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

        // Draw labels for each of the four quadrants (I, II, III, IV)
        plane.drawMath([7, 7], "\\text{I}", { color: "brown", scale: 1.5 });
        plane.drawMath([-7, 7], "\\text{II}", { color: "brown", scale: 1.5 });
        plane.drawMath([-7, -7], "\\text{III}", { color: "brown", scale: 1.5 });
        plane.drawMath([7, -7], "\\text{IV}", { color: "brown", scale: 1.5 });

        plane.drawPoint([5, 8], "green");
        plane.drawMath([6, 8], "\\text{P}(x_1, y_1)", { color: "green", scale: 1.3, dx: 0, dy: -5 });
        plane.drawMath([5, 0], "x_1", { color: "green", scale: 1.3, dx: -10, dy: 5 });
        plane.drawMath([0, 8], "y_1", { color: "green", scale: 1.3, dx: -25, dy: -5 });
        plane.drawSegment([5, 0], [5, 8], { strokeColor: "green", strokeDasharray: "5,5", strokeWidth: 1 });
        plane.drawSegment([0, 8], [5, 8], { strokeColor: "green", strokeDasharray: "5,5", strokeWidth: 1 });  
    }
        */
};

/**
 * Draws example for parametric equation of a line.
 * 
 * @param vRiver - River velocity vector.
 * @param vBoat - Resulting boat velocity vector.
 * @param vPropelled - Propulsion velocity vector.
 */
function drawSVGA1_2(vRiver?: Point2D, vBoat?: Point2D, vPropelled?: Point2D) {
    const svg = document.getElementById('svgA1_2');
    if (!(svg instanceof SVGElement)) return;

    let e1_vRiver: Point2D, e1_vBoat: Point2D, e1_vPropelled: Point2D;

    if (vRiver && vBoat && vPropelled) {
        // Update mode
        svg.innerHTML = '';
        e1_vRiver = vRiver;
        e1_vBoat = vBoat;
        e1_vPropelled = vPropelled;
    } else {
        // Initial draw mode
        if (svg.hasAttribute('data-drawn')) return;
        const vRiverStr = svg.getAttribute('data-v-river');
        const vBoatStr = svg.getAttribute('data-v-boat');
        const vPropelledStr = svg.getAttribute('data-v-propelled');
        if (!vRiverStr || !vBoatStr || !vPropelledStr) return;
        try {
            e1_vRiver = JSON.parse(vRiverStr) as Point2D;
            e1_vBoat = JSON.parse(vBoatStr) as Point2D;
            e1_vPropelled = JSON.parse(vPropelledStr) as Point2D;
        } catch (e) {
            console.error("Error parsing initial vectors for exercise 1", e);
            return;
        }
    }

    const plane = new CartesianPlane(svg, e1_vPropelled[0] - 5, e1_vRiver[0] + 5, -5, e1_vBoat[1] + 5);
    plane.drawAxes("y", "x", "O");

    const initialPoint: Point2D = [0, 0];

    plane.drawVectorB(initialPoint, e1_vRiver, "\\vec{v}_r", { strokeColor: "cornflowerBlue" }, { scale: 1.2, dy: 4 });
    plane.drawVectorB(initialPoint, e1_vPropelled, "\\vec{v}_p", { strokeColor: "sienna" }, { scale: 1.3, dx: 4, dy: -4 });
    
    const negVRiver = math.multiply(-1, e1_vRiver) as Point2D;
    plane.drawSegment(e1_vPropelled, negVRiver, { strokeColor: "green", strokeDasharray: "5,5" });
    plane.drawVectorB(initialPoint, negVRiver, "\\vec{v}_{px}", { strokeColor: "green" }, { scale: 1.2, color: "green", dx: -46, dy: 4 });
    
    plane.drawSegment(e1_vPropelled, e1_vBoat, { strokeColor: "green", strokeDasharray: "5,5" });
    plane.drawVectorB(initialPoint, e1_vBoat, "\\vec{v}_b", { strokeColor: "green" }, { scale: 1.3, color: "green", dx: 5, dy: -4 });
    plane.drawAngle(initialPoint, e1_vRiver, e1_vPropelled, 3, "\\phi", { strokeColor: "orange" }, { color: "orange", scale: 1.2, dx: 0, dy: -8 });

    svg.setAttribute('data-drawn', 'true');
}

/**
 * Sets up interactivity for example about parametric equation of a line,
 * Given the basepoint A and the director vector v.
 */
function setupExample1Interactivity() {
    const inputAx = document.getElementById('input-svgA1_2_Ax') as HTMLInputElement;
    const inputAy = document.getElementById('input-svgA1_2_Ay') as HTMLInputElement;
    const inputvx = document.getElementById('input-svgA1_2_vx') as HTMLInputElement;
    const inputvy = document.getElementById('input-svgA1_2_vy') as HTMLInputElement;

    // Output elements
    const outputAx = document.getElementById('output-svgA1_2_Ax');
    const outputAy = document.getElementById('output-svgA1_2_Ay');
    const outputvx = document.getElementById('output-svgA1_2_vx');
    const outputvy = document.getElementById('output-svgA1_2_vy');

    if (!inputAx || !inputAy || !inputvx || !inputvy) return;

    const update = () => {
        const Ax = parseFloat(inputAx.value) || 0;
        const Ay = parseFloat(inputAy.value) || 0;
        const vx = parseFloat(inputvx.value) || 0;
        const vy = parseFloat(inputvy.value) || 0;

        // Update text outputs
        if (outputAx) outputAx.textContent = Ax.toFixed(0);
        if (outputAy) outputAy.textContent = Ay.toFixed(0);
        if (outputvx) outputvx.textContent = vx.toFixed(0);
        if (outputvy) outputvy.textContent = vy.toFixed(0);

        // Redraw SVG
        drawSVGA1_2(Ax, Ay, vx);
    };

    inputAx.addEventListener('input', update);
    inputAy.addEventListener('input', update);
    inputvx.addEventListener('input', update);
    inputvy.addEventListener('input', update);
}

function runAllDrawings() {
    ensureSharedMarkerDefs();
    drawSVGA1_2();
    setupExample1Interactivity();
    //drawExercise2();
    //drawExercise3();
    //setupExercise4Interactivity();
    //setupExercise5Interactivity();
    //setupExercise7Interactivity();
    //drawExercise6();
    //drawExercise8();
}

if (typeof document !== 'undefined') {
    runAllDrawings();
    document.addEventListener('DOMContentLoaded', runAllDrawings);
    document.addEventListener('astro:after-swap', runAllDrawings);
}