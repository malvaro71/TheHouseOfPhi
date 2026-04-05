// geometryPage.ts
// ===============================
// ES Module for Geometry Page
// ===============================

// Import core modules
import { CartesianPlane } from '../core/CartesianPlane.ts';
import { ensureSharedMarkerDefs } from '../core/SVGDrawing.ts';
import * as math from 'mathjs';
import type { Point2D } from '../core/types.ts';

/**
 * Sets up interactivity for example about parametric equation of a line,
 * Given the basepoint A and the director vector v.
 */
function setupExampleA1_2_1Interactivity() {
    // Declare MathJax to avoid TypeScript errors for the global variable loaded externally
    declare const MathJax: any;

    // Get input fields where the user enters values
    const inputPx = document.getElementById('input-exaA1_2_1Px') as HTMLInputElement;
    const inputPy = document.getElementById('input-exaA1_2_1Py') as HTMLInputElement;
    
    // Get svg element
    const svg = document.getElementById('svgA1_2_1');
    
    // Validate existence of critical elements to avoid null pointer errors
    if (!inputPx || !inputPy || !svg) return;
    // Avoid duplicate listeners
    if (svg.hasAttribute('data-math-initialized')) return;

    const update = () => {
        // Read current values from inputs
        const Px = parseFloat(inputPx.value) || 0;
        const Py = parseFloat(inputPy.value) || 0;

        // Define point coordinates based on input values
        const Pcoordinates: Point2D = [Px, Py];

        // Redraw SVG
        drawsvgA1_2_1(Pcoordinates);

        // Request MathJax to process the new labels inside the SVG
        if (typeof MathJax !== 'undefined' && MathJax.typesetPromise) {
            MathJax.typesetPromise([svg]).catch((err: any) => console.error(err));
        }
    };

    inputPx.addEventListener('input', update);
    inputPy.addEventListener('input', update);

    // Mark as initialized and perform initial sync
    svg.setAttribute('data-math-initialized', 'true');
    update();
}

/**
 * Draws a point, of given coordinates, and its possition vector in a plane.
 * 
 * This function handles the visual representation (SVG).
 * It can operate in initial mode (reading data from HTML) or update mode (receiving new vectors).
 */
function drawsvgA1_2_1(pointCoordinates?: Point2D) {
    // Attempt to get the SVG element by its ID
    const svg = document.getElementById('svgA1_2_1');
    if (!(svg instanceof SVGElement)) return;

    let pointCoord: Point2D;

    // If vectors are passed as arguments, it means the user has moved the controls
    // We check for undefined to allow [0,0] coordinates
    if (pointCoordinates !== undefined) {
        svg.innerHTML = ''; // Clear previous drawing
        pointCoord = pointCoordinates;
    } else {
        // If no arguments, read initial values stored in SVG 'data-' attributes
        if (svg.hasAttribute('data-drawn')) return;
        const pointCoordStr = svg.getAttribute('data-point-coordinates');
        if (!pointCoordStr) return;
        try {
            pointCoord = JSON.parse(pointCoordStr) as Point2D;
        } catch (e) {
            console.error("Error parsing initial vectors for exampleA1_2_1", e);
            return;
        }
    }

    // Set up the Cartesian plane, adjusting boundaries so vectors remain visible
    // The input value has been limited to a defined range
    const plane = new CartesianPlane(svg, -11, 11, -11, 11);
    plane.drawAxes("Y", "X", "O"); // Draw X and Y axes and mark origin

    // Draw labels for each of the four quadrants (I, II, III, IV)
    plane.drawMath([10, 10], "\\text{I}", { color: "brown", scale: 1.5 });
    plane.drawMath([-10, 10], "\\text{II}", { color: "brown", scale: 1.5 });
    plane.drawMath([-10, -10], "\\text{III}", { color: "brown", scale: 1.5 });
    plane.drawMath([9, -10], "\\text{IV}", { color: "brown", scale: 1.5 });

    // Draw the target point P using the dynamic coordinates
    plane.drawPoint(pointCoord, "green");

    // Add a mathematical label for the point P(x, y)
    plane.drawMath([pointCoord[0] + 0.5, pointCoord[1]], `\\text{P}(${pointCoord[0]}, ${pointCoord[1]})`, { color: "green", scale: 1.3, dx: 0, dy: -5 });

    // Draw the vector position r from origin to point P
    plane.drawVectorB([0, 0], pointCoord, "\\vec r", { strokeColor: "green" }, { color: "green", scale: 1.3 });

    // Draw projections (dashed lines) to the axes
    plane.drawSegment([pointCoord[0], 0], pointCoord, { strokeColor: "green", strokeDasharray: "5,5", strokeWidth: 1 });
    plane.drawSegment([0, pointCoord[1]], pointCoord, { strokeColor: "green", strokeDasharray: "5,5", strokeWidth: 1 });

    // Label the x and y values on the axes
    plane.drawMath([pointCoord[0], 0], `${pointCoord[0]}`, { color: "green", scale: 1.3, dx: -10, dy: 15 });
    plane.drawMath([0, pointCoord[1]], `${pointCoord[1]}`, { color: "green", scale: 1.3, dx: -25, dy: -5 });

    svg.setAttribute('data-drawn', 'true'); // Mark SVG as drawn to avoid redundancy
}

/**
 * Sets up interactivity for Example A1_2_2.
 * Listens for changes in numerical inputs and updates calculations, formulas, and the graph.
 */
function setupExempleA1_2_2Interactivity() {
    // Declare MathJax to avoid TypeScript errors for the global variable loaded externally
    declare const MathJax: any;

    // Get svg element
    const svg = document.getElementById('svgA1_2_2');

    // Get input fields where the user enters values
    const inputPx = document.getElementById('input-exaA1_2_2Px') as HTMLInputElement;
    const inputPy = document.getElementById('input-exaA1_2_2Py') as HTMLInputElement;
    const inputM = document.getElementById('input-exaA1_2_2m') as HTMLInputElement;

    // Elements where text results and formulas will be written
    const lineEquationFormula = document.getElementById('exaA1_2_2line-equation-formula');
    
    // Validate existence of critical elements to avoid null pointer errors
    if (!inputPx || !inputPy || !inputM || !lineEquationFormula) return;
    // Check for initialization flag to prevent multiple event listeners on the same inputs
    if (lineEquationFormula.hasAttribute('data-math-initialized')) return;

    // This function executes every time the user changes a value in the inputs
    const update = () => {
       // Read current values from inputs
        const Px = parseFloat(inputPx.value) || 0;
        const Py = parseFloat(inputPy.value) || 0;
        const m = parseFloat(inputM.value) || 0;


        // Define vectors based on input values
        const Point: Point2D = [Px, Py];
        

        // Generate LaTeX code for dynamic formulas, injecting calculated values
        if (lineEquationFormula) {
            lineEquationFormula.innerHTML = `$$ y - (${Point[1]}) = ${m}(x - (${Point[0]})) $$`;
        }

        // Request MathJax to process the new injected LaTeX code for proper rendering
        if (typeof MathJax !== 'undefined' && MathJax.typesetPromise) {
            MathJax.typesetPromise([lineEquationFormula]).catch((err: any) => console.error(err));
        }

        // Finally, redraw the graph with the new vectors
        drawExampleA1_2_2(Point, m);

        // Request MathJax to process the new labels inside the SVG
        if (typeof MathJax !== 'undefined' && MathJax.typesetPromise) {
            MathJax.typesetPromise([svg]).catch((err: any) => console.error(err));
        }
    };

    // Listen for the 'input' event for instant updates as the user types
    inputPx.addEventListener('input', update);
    inputPy.addEventListener('input', update);
    inputM.addEventListener('input', update);

    // Mark the container as initialized and run 'update' once to sync the initial view
    lineEquationFormula.setAttribute('data-math-initialized', 'true');
    update();
}

/**
 * Draws a line, given one of its points and its slope.
 * 
 * This function handles the visual representation (SVG).
 * It can operate in initial mode (reading data from HTML) or update mode (receiving new vectors).
 */
function drawExampleA1_2_2(pointCoordinates?: Point2D, slope?: number) {
    // Attempt to get the SVG element by its ID
    const svg = document.getElementById('svgA1_2_2');
    if (!(svg instanceof SVGElement)) return;

    let pointCoord: Point2D, m: number;

    // If vectors are passed as arguments, it means the user has moved the controls
    // IMPORTANT: Check for undefined specifically because slope can be 0 (which is falsy)
    if (pointCoordinates !== undefined && slope !== undefined) {
        svg.innerHTML = ''; // Clear previous drawing
        pointCoord = pointCoordinates;
        m = slope;
    } else {
        // If no arguments, read initial values stored in SVG 'data-' attributes
        if (svg.hasAttribute('data-drawn')) return;
        const pointCoordStr = svg.getAttribute('data-point-coordinates');
        const slopeStr = svg.getAttribute('data-slope');
        if (!pointCoordStr || !slopeStr) return;
        try {
            pointCoord = JSON.parse(pointCoordStr) as Point2D;
            m = parseFloat(slopeStr);
        } catch (e) {
            console.error("Error parsing initial vectors for exampleA1_2_2", e);
            return;
        }
    }

    // Set up the Cartesian plane, adjusting boundaries so vectors remain visible
    // The input value has been limited to a defined range
    const plane = new CartesianPlane(svg, -11, 11, -11, 11);
    plane.drawAxes("Y", "X", "O"); // Draw X and Y axes and mark origin


    // Draw the target point P using the dynamic coordinates
    plane.drawPoint(pointCoord, "green");

    // Add a m athematical label for the point P(x, y)
    plane.drawMath([pointCoord[0] + 0.5, pointCoord[1]], `\\text{P}(${pointCoord[0]}, ${pointCoord[1]})`, { color: "green", scale: 1.3, dx: 0, dy: -5 });

    // Calculate points of the line
    const Point1 = [-11, pointCoord[1] + m * (-11 - pointCoord[0])];
    const Point2 = [11, pointCoord[1] + m * (11 - pointCoord[0])];

    // Draw the line
    plane.drawSegment(Point1, Point2, { strokeColor: "green", strokeWidth: 1 });

    svg.setAttribute('data-drawn', 'true'); // Mark SVG as drawn to avoid redundancy
}

/**
 * Sets up interactivity for Example A1_2_3 (Parametric equation of a line).
 * Listens for changes in the lambda parameter and updates the graph.
 */
function setupExampleA1_2_3Interactivity() {
    declare const MathJax: any;

    const inputLambda = document.getElementById('input-exaA1_2_3lambda') as HTMLInputElement;
    const svg = document.getElementById('svgA1_2_3');

    // Validate existence of critical elements to avoid null pointer errors
    if (!inputLambda || !svg) return;
    // Check for initialization flag to prevent multiple event listeners on the same inputs
    if (svg.hasAttribute('data-math-initialized')) return;

    // This function executes every time the user changes a value in the inputs
    const update = () => {
        // Read current values from inputs
        const lambda = parseFloat(inputLambda.value) || 0;

        // Redraw the graph with the new values
        drawsvgA1_2_3(lambda);

        // Request MathJax to process labels inside the SVG
        if (typeof MathJax !== 'undefined' && MathJax.typesetPromise) {
            MathJax.typesetPromise([svg]).catch((err: any) => console.error(err));
        }
    };

    inputLambda.addEventListener('input', update);
    svg.setAttribute('data-math-initialized', 'true');
    update();
}

/**
 * Draws the parametric line example.
 * Shows the base point A, director vector v, and the resulting point P(lambda).
 */
function drawsvgA1_2_3(lambdaValue?: number) {
    // Attempt to get the SVG element by its ID
    const svg = document.getElementById('svgA1_2_3');
    if (!(svg instanceof SVGElement)) return;

    // Variable to charge lambda value from A1_2_3 in MDX
    let L: number;
    let A: Point2D, v: Point2D;

    // Attributes are automatically lowercased in the DOM (data-A becomes data-a)
    const pointCoordStr = svg.getAttribute('data-a');
    const vectorCoordStr = svg.getAttribute('data-v');
    
    if (!pointCoordStr || !vectorCoordStr) return;

    try {
        A = JSON.parse(pointCoordStr) as Point2D;
        v = JSON.parse(vectorCoordStr) as Point2D;

        if (lambdaValue !== undefined) {
            // Update mode: Clear and use the provided lambda
            svg.innerHTML = ''; 
            L = lambdaValue;
        } else {
            // Initial mode: Read lambda from attribute if not already drawn
            if (svg.hasAttribute('data-drawn')) return;
            L = parseFloat(svg.getAttribute('data-lambda') || '0');
        }
    } catch (e) {
        console.error("Error parsing vectors for example A1_2_3", e);
        return;
    }

    const plane = new CartesianPlane(svg, -11, 11, -11, 11);
    plane.drawAxes("Y", "X", "O");

    // Draw the full line as a reference (using two far points)
    const pFar1: Point2D = [A[0] + -10 * v[0], A[1] + -10 * v[1]];
    const pFar2: Point2D = [A[0] + 10 * v[0], A[1] + 10 * v[1]];
    plane.drawSegment(pFar1, pFar2, { strokeColor: "gray", strokeWidth: 1, strokeDasharray: "2,2" });

    // Draw base point A
    plane.drawPoint(A, "brown");
    plane.drawMath([A[0], A[1]], "A", { color: "brown", dy: -20, dx: -15, scale: 1.3 });

    // Draw director vector v starting from A
    plane.drawVectorB(A, v, "\\vec v", { strokeColor: "blue" }, { color: "blue", dx: -10, dy: -23, scale: 1.5 });

    // Calculate current point P = A + L*v
    const P = math.add(A, math.multiply(L, v)) as Point2D;

    // Draw the resulting point P and its label
    plane.drawPoint(P, "green");
    plane.drawMath([P[0], P[1]], `P(\\lambda = ${L.toFixed(1)})`, { color: "green", dy: -15, dx: 10 });

    // Draw the position vector r from origin to P
    plane.drawVectorB([0, 0], P, "\\vec r", { strokeColor: "green" }, { color: "green", scale: 1.3 });

    svg.setAttribute('data-drawn', 'true');
}

// Export a dictionary of drawing functions keyed by SVG ID
export const geometryDrawings = {
    // ---------------------------------------------------------
    // A1_3_1 — Triangle with angles and side labels
    // ---------------------------------------------------------
    "svgA1_3_1": (svg: SVGElement) => {
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
    // A1_3_2 — Right triangle with hypotenuse, opposite, adjacent
    // ---------------------------------------------------------
    "svgA1_3_2": (svg: SVGElement) => {
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
    // A1_4_1 — Circle: radius, diameter
    // ---------------------------------------------------------
    "svgA1_4_1": (svg: SVGElement) => {
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
    }/*,

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
    }*/
        
};

/**
 * Draws example for parametric equation of a line.
 * 
 * @param vRiver - River velocity vector.
 * @param vBoat - Resulting boat velocity vector.
 * @param vPropelled - Propulsion velocity vector.
 */
/*function drawSVGA1_2(vRiver?: Point2D, vBoat?: Point2D, vPropelled?: Point2D) {
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
}*/

function runAllDrawings() {
    ensureSharedMarkerDefs();
    drawsvgA1_2_1();
    setupExampleA1_2_1Interactivity();
    drawExampleA1_2_2();
    setupExempleA1_2_2Interactivity();
    drawsvgA1_2_3();
    setupExampleA1_2_3Interactivity();
}

if (typeof document !== 'undefined') {
    runAllDrawings();
    document.addEventListener('DOMContentLoaded', runAllDrawings);
    document.addEventListener('astro:after-swap', runAllDrawings);
}