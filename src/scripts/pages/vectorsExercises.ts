import { CartesianPlane } from '../core/CartesianPlane.ts';
import { EuclideanSpace } from '../core/EuclideanSpace.ts';
import { ensureSharedMarkerDefs } from '../core/SVGDrawing.ts';
import * as math from 'mathjs';
import type { Point2D, Point3D } from '../core/types.ts';

/**
 * Draws the chart for Exercise 1: A boat crossing a river.
 * 
 * This function handles the visual representation (SVG).
 * It can operate in initial mode (reading data from HTML) or update mode (receiving new vectors).
 */
function drawExercise1(vRiver?: Point2D, vBoat?: Point2D, vPropelled?: Point2D) {
    // Attempt to get the SVG element by its ID
    const svg = document.getElementById('svg1e_1');
    if (!(svg instanceof SVGElement)) return;

    // Variables to charge values from exercise1 in MDX
    let e1_vRiver: Point2D, e1_vBoat: Point2D, e1_vPropelled: Point2D;

    // If vectors are passed as arguments, it means the user has moved the controls
    if (vRiver && vBoat && vPropelled) {
        svg.innerHTML = ''; // Clear previous drawing
        e1_vRiver = vRiver;
        e1_vBoat = vBoat;
        e1_vPropelled = vPropelled;
    } else {
        // If no arguments, read initial values stored in SVG 'data-' attributes
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

    // Set up the Cartesian plane, adjusting boundaries so vectors remain visible
    const plane = new CartesianPlane(svg, e1_vPropelled[0] - 5, e1_vRiver[0] + 5, -5, e1_vBoat[1] + 5);
    plane.drawAxes("y", "x", "O"); // Draw X and Y axes

    const initialPoint: Point2D = [0, 0];

    // Draw the river velocity vector (blue)
    plane.drawVectorB(initialPoint, e1_vRiver, "\\vec{v}_r", { strokeColor: "cornflowerBlue" }, { scale: 1.2, dy: 4 });
    
    // Draw the propulsion vector (direction where the boat points, sienna)
    plane.drawVectorB(initialPoint, e1_vPropelled, "\\vec{v}_p", { strokeColor: "sienna" }, { scale: 1.3, dx: 4, dy: -4 });
    
    // Draw components to help visualize the vector addition
    const negVRiver = math.multiply(-1, e1_vRiver) as Point2D;
    plane.drawSegment(e1_vPropelled, negVRiver, { strokeColor: "green", strokeDasharray: "5,5" });
    plane.drawVectorB(initialPoint, negVRiver, "\\vec{v}_{px}", { strokeColor: "green" }, { scale: 1.2, color: "green", dx: -46, dy: 4 });
    
    // Draw the resulting boat velocity vector (perpendicular to the shore, green)
    plane.drawSegment(e1_vPropelled, e1_vBoat, { strokeColor: "green", strokeDasharray: "5,5" });
    plane.drawVectorB(initialPoint, e1_vBoat, "\\vec{v}_b", { strokeColor: "green" }, { scale: 1.3, color: "green", dx: 5, dy: -4 });
    
    // Draw the arc representing angle phi between the river and propulsion
    plane.drawAngle(initialPoint, e1_vRiver, e1_vPropelled, 3, "\\phi", { strokeColor: "orange" }, { color: "orange", scale: 1.2, dx: 0, dy: -8 });

    svg.setAttribute('data-drawn', 'true'); // Mark SVG as drawn to avoid redundancy
}

/**
 * Sets up interactivity for Exercise 1.
 * Listens for changes in numerical inputs and updates calculations, formulas, and the graph.
 */
function setupExercise1Interactivity() {
    // Declare MathJax to avoid TypeScript errors for the global variable loaded externally
    declare const MathJax: any;

    // Get input fields where the user enters values
    const inputRiverX = document.getElementById('input-e1-vriver-x') as HTMLInputElement;
    const inputBoatY = document.getElementById('input-e1-vboat-y') as HTMLInputElement;

    // Elements where text results and formulas will be written
    const outputVBoat = document.getElementById('output-e1-vboat');
    const outputVRiver = document.getElementById('output-e1-vriver');

    const vpFormula = document.getElementById('e1-vp-formula');
    const magFormula = document.getElementById('e1-magnitude-formula');
    const phiFormula = document.getElementById('e1-phi-formula');

    const outputNormVPropelled2 = document.getElementById('output-e1-norm-vpropelled-2');
    const outputPhi2 = document.getElementById('output-e1-phi-2');

    // Validate existence of critical elements to avoid null pointer errors
    if (!inputRiverX || !inputBoatY || !vpFormula) return;
    // Check for initialization flag to prevent multiple event listeners on the same inputs
    if (vpFormula.hasAttribute('data-math-initialized')) return;

    // This function executes every time the user changes a value in the inputs
    const update = () => {
        // Read current values from inputs
        const riverX = parseFloat(inputRiverX.value) || 0;
        const boatY = parseFloat(inputBoatY.value) || 0;

        // Define vectors based on input values
        const vRiver: Point2D = [riverX, 0];
        const vBoat: Point2D = [0, boatY];
        
        // Physics calculations using mathjs library
        const vPropelled = math.subtract(vBoat, vRiver) as Point2D;
        const normVPropelled = math.norm(vPropelled) as number;
        const normVRiver = math.norm(vRiver) as number;
        const dotProduct = math.dot(vRiver, vPropelled) as number;
        // Angle calculation using dot product
        const phi = math.acos(dotProduct / (normVRiver * normVPropelled)) * 180 / math.pi;

        // Update simple text labels (vector coordinates)
        if (outputVBoat) outputVBoat.textContent = `${vBoat.join(', ')}`;
        if (outputVRiver) outputVRiver.textContent = `${vRiver.join(', ')}`;

        // Generate LaTeX code for dynamic formulas, injecting calculated values
        if (vpFormula) {
            vpFormula.innerHTML = `$$ \\vec v_p = (${vBoat[0]}, ${vBoat[1]}) - (${vRiver[0]}, ${vRiver[1]}) = (${vPropelled[0]}, ${vPropelled[1]}) \\text{ Km/h} $$`;
        }
        if (magFormula) {
            // Pythagorean theorem step-by-step
            magFormula.innerHTML = `$$ \\|\\vec v_p\\| = \\sqrt{(${vPropelled[0]})^2 + ${vPropelled[1]}^2} = \\sqrt{${(vPropelled[0]**2 + vPropelled[1]**2).toFixed(1)}} \\approx ${normVPropelled.toFixed(1)} \\text{ Km/h} $$`;
        }
        if (phiFormula) {
            // Angle calculation step-by-step via arccosine
            phiFormula.innerHTML = `$$ \\displaystyle \\phi = \\arccos \\left( \\frac{${dotProduct}}{${normVPropelled.toFixed(1)} \\cdot ${normVRiver.toFixed(1)}} \\right) \\approx ${phi.toFixed(1)}^\\circ $$`;
        }

        // Update final results in the conclusion text
        if (outputNormVPropelled2) outputNormVPropelled2.textContent = normVPropelled.toFixed(1);
        if (outputPhi2) outputPhi2.textContent = phi.toFixed(1);

        // Request MathJax to process the new injected LaTeX code for proper rendering
        if (typeof MathJax !== 'undefined' && MathJax.typesetPromise) {
            MathJax.typesetPromise([vpFormula, magFormula, phiFormula]).catch((err: any) => console.error(err));
        }

        // Finally, redraw the graph with the new vectors
        drawExercise1(vRiver, vBoat, vPropelled);
    };

    // Listen for the 'input' event for instant updates as the user types
    inputRiverX.addEventListener('input', update);
    inputBoatY.addEventListener('input', update);

    // Mark the container as initialized and run 'update' once to sync the initial view
    vpFormula.setAttribute('data-math-initialized', 'true');
    update();
}

/**
 * Draws Exercise 2: Graphical addition of multiple vectors.
 */
function drawExercise2() {
    const svg = document.getElementById('svg1e_2');
    if (!(svg instanceof SVGElement) || svg.hasAttribute('data-drawn')) return;

    const vecAStr = svg.getAttribute('data-vec-a');
    const vecBStr = svg.getAttribute('data-vec-b');
    const vecCStr = svg.getAttribute('data-vec-c');
    const vecDStr = svg.getAttribute('data-vec-d');

    if (!vecAStr || !vecBStr || !vecCStr || !vecDStr) return;

    const vecA = JSON.parse(vecAStr) as Point2D;
    const vecB = JSON.parse(vecBStr) as Point2D;
    const vecC = JSON.parse(vecCStr) as Point2D;
    const vecD = JSON.parse(vecDStr) as Point2D;

    const xMin = -1, xMax = 10, yMin = -3, yMax = 5;
    const plane = new CartesianPlane(svg, xMin, xMax, yMin, yMax, 34);
    plane.drawAxes("y", "x", "O");

    for (let x = xMin; x <= xMax; x++) {
        plane.drawSegment([x, yMin], [x, yMax], { strokeColor: "green", strokeDasharray: "5,5", strokeWidth: 1 });
    }
    for (let y = yMin; y <= yMax; y++) {
        plane.drawSegment([xMin, y], [xMax, y], { strokeColor: "green", strokeDasharray: "5,5", strokeWidth: 1 });
    }

    let currentPoint: Point2D = [0, 0];
    const vectors = [vecA, vecB, vecC, vecD];
    const names = ["\\vec{a}", "\\vec{b}", "\\vec{c}", "\\vec{d}"];

    for (let i = 0; i < vectors.length; i++) {
        plane.drawVectorB(currentPoint, vectors[i], names[i]);
        currentPoint = math.add(currentPoint, vectors[i]) as Point2D;
    }

    svg.setAttribute('data-drawn', 'true');
}

/**
 * Draws Exercise 3: Sailboat components.
 */
function drawExercise3() {
    const svg = document.getElementById('svg1e_3');
    if (!(svg instanceof SVGElement) || svg.hasAttribute('data-drawn')) return;

    const vecVStr = svg.getAttribute('data-vec-v');
    const angleStr = svg.getAttribute('data-angle');

    if (!vecVStr || !angleStr) return;

    const vecV = JSON.parse(vecVStr) as Point2D;
    const angleDeg = parseFloat(angleStr);
    const angleRad = angleDeg * Math.PI / 180;

    const xMin = -5, xMax = 5, yMin = -1, yMax = 5;
    const plane = new CartesianPlane(svg, xMin, xMax, yMin, yMax, 48);
    plane.drawAxes("N", "E", "O");

    const origin: Point2D = [0, 0];
    const NNEextreme: Point2D = [ xMax * Math.cos(angleRad), yMax * Math.sin(angleRad) ];

    plane.drawVectorB(origin, NNEextreme, "NNE", {}, { scale: 1.2, dx: 50, dy: -99 });
    plane.drawVectorB(origin, vecV, "\\vec{V}", { strokeColor: "darkKhaki" }, { scale: 1.2, dx: 0, dy: 0 });
    plane.drawSegment([vecV[0], 0], vecV, { strokeColor: "green", strokeDasharray: "5, 5" });
    plane.drawSegment([0, vecV[1]], vecV, { strokeColor: "green", strokeDasharray: "5, 5" });
    plane.drawVectorB(origin, [vecV[0], 0], "\\vec{V}_x", { strokeColor: "green" }, { scale: 1.2, color: "green", dx: -10, dy: 0 });
    plane.drawVectorB(origin, [0, vecV[1]], "\\vec{V}_y", { strokeColor: "green" }, { scale: 1.2, color: "green", dx: 0, dy: -10 });
    plane.drawAngle(origin, [vecV[0], 0], vecV, 0.5, `\\theta = ${angleDeg}^\\circ`, { strokeColor: "cornflowerBlue" }, { color: "cornflowerBlue", scale: 1.2, dx: -5, dy: -15 });

    svg.setAttribute('data-drawn', 'true');
}

/**
 * Draws Exercise 6: Plane speed projection.
 */
function drawExercise6() {
    // Attempt to get the SVG element by its ID
    const svg = document.getElementById('svg1e_6');
    if (!(svg instanceof SVGElement) || svg.hasAttribute('data-drawn')) return;
    
    // Declare strings from attributes defined in VectorCanvas component
    const speedStr = svg.getAttribute('data-speed');
    const angleStr = svg.getAttribute('data-angle');

    if (!speedStr || !angleStr) return;

    // Define de variables to be used and parse the strings into them
    let planeSpeed: number, angleNERad: number;
    try {
        planeSpeed = JSON.parse(speedStr) as number;
        angleNERad = JSON.parse(angleStr) as number;
    } catch (e) {
        console.error("Error parsing initial points for exercise 6", e);
        return;
    }

    const V: Point2D = [ planeSpeed * Math.cos(angleNERad), planeSpeed * Math.sin(angleNERad) ];
    const projEV = math.multiply( planeSpeed * Math.cos(angleNERad), [1, 0] ) as Point2D;

    const plane = new CartesianPlane(svg, -700, 700, -100, 700, 0.3);
    plane.drawAxes("", "E", "O");
    plane.drawMath([-15, 700], "N", { scale: 1.2 });

    const origin: Point2D = [0, 0];
    const NE: Point2D = [ 700 * Math.cos(angleNERad), 700 * Math.sin(angleNERad) ];

    plane.drawVectorB(origin, NE, "NE", { strokeColor: "blue"}, { scale: 1.2, color: "blue", dy: -45});
    plane.drawVectorB(origin, V, "V", { strokeColor: "green" }, { scale: 1.2, color: "green" });
    plane.drawVectorB(origin, projEV, "\\text{proj}_E V", { strokeColor: "green" }, { color: "green", scale: 1.2, dy: 10 });
    plane.drawSegment(projEV, V, { strokeColor: "blue", strokeDasharray: "5, 5" });
    plane.drawAngle(origin, projEV, V, 100, "\\theta = 45^\\circ", { strokeColor: "blue" }, { color: "blue", scale: 1 });

    svg.setAttribute('data-drawn', 'true');
}

/**
 * Draws Exercise 8: Triangle area via cross product.
 */
function drawExercise8() {
    // Attempt to get the SVG element by its ID
    const svg = document.getElementById('svg1e_8');
    if (!(svg instanceof SVGElement) || svg.hasAttribute('data-drawn')) return;

    // Declare strings from attributes defined in VectorCanvas component
    const aStr = svg.getAttribute('data-vec-a');
    const bStr = svg.getAttribute('data-vec-b');
    const cStr = svg.getAttribute('data-vec-c');
    if (!aStr || !bStr || !cStr) return;

    // Parse the strings to Point3D
    let A: Point3D, B: Point3D, C: Point3D;
    try {
        A = JSON.parse(aStr) as Point3D;
        B = JSON.parse(bStr) as Point3D;
        C = JSON.parse(cStr) as Point3D;
    } catch (e) {
        console.error("Error parsing initial points for exercise 8", e);
        return;
    }

    // Calculate AB, AC and B+AC vectors
    const AB = math.subtract(B, A) as Point3D;
    const AC = math.subtract(C, A) as Point3D;
    const BplusAC = math.add(B, AC) as Point3D;

    const space = new EuclideanSpace(svg, [0, 0, 0], 30);
    space.drawAxes();

    space.drawPoint(A, "green");
    space.drawLabel(A, "A", { corner: "righttop" });
    space.drawPoint(B, "green");
    space.drawLabel(B, "B", { corner: "righttop" });
    space.drawPoint(C, "green");
    space.drawLabel(C, "C", { corner: "leftbottom" });

    space.drawVector(A, AB, "AB", { strokeColor: "green" }, { corner: "righttop" });
    space.drawVector(A, AC, "AC", { strokeColor: "green" }, { corner: "leftbottom" });
    space.drawSegment(B, C, { strokeColor: "green" });

    space.drawSegment(B, BplusAC, { strokeColor: "blue", strokeDasharray: "5,5" });
    space.drawSegment(C, BplusAC, { strokeColor: "blue", strokeDasharray: "5,5" });

    svg.setAttribute('data-drawn', 'true');
}

/**
 * Sets up interactivity for Exercise 4: Speed components.
 */
function setupExercise4Interactivity() {
    // Declare MathJax to avoid TypeScript errors for the global variable loaded externally
    declare const MathJax: any;

    // Get input fields where the user enters values
    const inputSpeed = document.getElementById('input-e4-speed') as HTMLInputElement;
    const inputAngle = document.getElementById('input-e4-angle') as HTMLInputElement;

    // Elements where text results and formulas will be written
    const vxFormula = document.getElementById('e4-vx-formula');
    const vyFormula = document.getElementById('e4-vy-formula');
    const vectorFormula = document.getElementById('e4-vector-formula');

    // Validate existence
    if (!inputSpeed || !inputAngle || !vxFormula || !vyFormula || !vectorFormula ) return;
    // Avoid duplicate listeners
    if (vxFormula.hasAttribute('data-math-initialized')) return;

    // This function executes every time the user changes a value in the inputs
    const update = () => {
        // Read current values from inputs
        const speed = parseFloat(inputSpeed.value) || 0;
        const angleDeg = parseFloat(inputAngle.value) || 0;
        const angleRad = angleDeg * Math.PI / 180;
        
        // Calculate components
        const vx = speed * Math.cos(angleRad);
        const vy = speed * Math.sin(angleRad);

        // Update dynamic LaTeX formulas using template literals
        if (vxFormula) {
            vxFormula.innerHTML = `$$ \\vec v_x = \\|\\vec v\\| \\cos \\theta \\hat\\imath = ${speed} \\cos(${angleDeg}^\\circ) \\hat\\imath \\approx ${vx.toFixed(1)} \\hat\\imath \\text{ m/s} $$`; // Corrected LaTeX for hat{i}
        }
        if (vyFormula) {
            vyFormula.innerHTML = `$$ \\vec v_y = \\|\\vec v\\| \\sin \\theta \\hat\\jmath = ${speed} \\sin(${angleDeg}^\\circ) \\hat\\jmath \\approx ${vy.toFixed(1)} \\hat\\jmath \\text{ m/s} $$`; // Corrected LaTeX for hat{j}
        }
        if (vectorFormula) {
            vectorFormula.innerHTML = `$$ \\vec v = ${vx.toFixed(1)} \\hat\\imath + ${vy.toFixed(1)} \\hat\\jmath \\text{ m/s} $$`; // Corrected LaTeX for hat{i} and hat{j}
        }

        // Re-render MathJax for the containers
        if (typeof MathJax !== 'undefined' && MathJax.typesetPromise) {
            MathJax.typesetPromise([vxFormula, vyFormula, vectorFormula]).catch((err: any) => console.error(err));
        }
    };

    inputSpeed.addEventListener('input', update);
    inputAngle.addEventListener('input', update);

    // Initial sync and mark as initialized
    vxFormula.setAttribute('data-math-initialized', 'true');
    update();
}

/**
 * Sets up interactivity for Exercise 5: Dot product.
 */
function setupExercise5Interactivity() {
    declare const MathJax: any;
    // Inputs
    const inputs = {
        vx: document.getElementById('input-e5-vx') as HTMLInputElement,
        vy: document.getElementById('input-e5-vy') as HTMLInputElement,
        vz: document.getElementById('input-e5-vz') as HTMLInputElement,
        wx: document.getElementById('input-e5-wx') as HTMLInputElement,
        wy: document.getElementById('input-e5-wy') as HTMLInputElement,
        wz: document.getElementById('input-e5-wz') as HTMLInputElement,
    };

    const formulaDot = document.getElementById('e5-dot-formula');
    const formulaNormV = document.getElementById('e5-normv-formula');
    const formulaNormW = document.getElementById('e5-normw-formula');
    const formulaAngle = document.getElementById('e5-angle-formula');

    // Validate existence of critical elements
    if (Object.values(inputs).some(el => !el) || !formulaDot) return;
    if (formulaDot.hasAttribute('data-math-initialized')) return;

    const update = () => {
        const v: Point3D = [
            parseFloat(inputs.vx.value) || 0,
            parseFloat(inputs.vy.value) || 0,
            parseFloat(inputs.vz.value) || 0
        ];
        const w: Point3D = [
            parseFloat(inputs.wx.value) || 0,
            parseFloat(inputs.wy.value) || 0,
            parseFloat(inputs.wz.value) || 0
        ];

        const dotProduct = math.dot(v, w) as number;
        const normV = math.norm(v) as number;
        const normW = math.norm(w) as number;
        const normV_sq = normV * normV;
        const normW_sq = normW * normW;
        
        let cosTheta = 0;
        let thetaDeg = 0;
        if (normV > 0 && normW > 0) {
            cosTheta = dotProduct / (normV * normW);
            cosTheta = Math.max(-1, Math.min(1, cosTheta)); // Clamp to avoid float errors
            thetaDeg = math.acos(cosTheta) * 180 / Math.PI;
        }

        // Update dynamic LaTeX formulas using template literals
        if (formulaDot) {
            formulaDot.innerHTML = `$$ \\vec v \\cdot \\vec w = (${v[0]})(${w[0]}) + (${v[1]})(${w[1]}) + (${v[2]})(${w[2]}) = ${dotProduct} $$`; // Corrected LaTeX for dot product
        }
        if (formulaNormV) {
            formulaNormV.innerHTML = `$$ \\|\\vec v\\| = \\sqrt{${v[0]}^2 + (${v[1]})^2 + ${v[2]}^2} = \\sqrt{${normV_sq.toFixed(0)}} \\approx ${normV.toFixed(2)} $$`; // Corrected LaTeX for norm V
        }
        if (formulaNormW) {
            formulaNormW.innerHTML = `$$ \\|\\vec w\\| = \\sqrt{(${w[0]})^2 + ${w[1]}^2 + ${w[2]}^2} = \\sqrt{${normW_sq.toFixed(0)}} \\approx ${normW.toFixed(2)} $$`; // Corrected LaTeX for norm W
        }
        if (formulaAngle) {
            formulaAngle.innerHTML = `$$ \\theta = \\arccos \\left( \\frac{${dotProduct}}{${normV.toFixed(2)} \\cdot ${normW.toFixed(2)}} \\right) \\approx \\arccos(${cosTheta.toFixed(4)}) \\approx ${thetaDeg.toFixed(2)}^\\circ $$`; // Corrected LaTeX for angle
        }

        // Re-render MathJax
        if (typeof MathJax !== 'undefined' && MathJax.typesetPromise) {
            MathJax.typesetPromise([formulaDot, formulaNormV, formulaNormW, formulaAngle]).catch((err: any) => console.error(err));
        }
    };

    Object.values(inputs).forEach(input => input.addEventListener('input', update));

    // Initial sync and mark as initialized
    formulaDot.setAttribute('data-math-initialized', 'true');
    update();
}

/**
 * Sets up interactivity for Exercise 7: Linear velocity from angular velocity.
 */
function setupExercise7Interactivity() {
    // Declare MathJax globally for TypeScript
    declare const MathJax: any;

    // Inputs
    const inputs = {
        wx: document.getElementById('input-e7-wx') as HTMLInputElement,
        wy: document.getElementById('input-e7-wy') as HTMLInputElement,
        wz: document.getElementById('input-e7-wz') as HTMLInputElement,
        rx: document.getElementById('input-e7-rx') as HTMLInputElement,
        ry: document.getElementById('input-e7-ry') as HTMLInputElement,
        rz: document.getElementById('input-e7-rz') as HTMLInputElement,
    };

    // Determinant containers
    const det1Container = document.getElementById('e7-determinant-1');
    const det2Container = document.getElementById('e7-determinant-2');
    const resultContainer = document.getElementById('e7-result-formula');

    // Validate existence of critical elements
    if (Object.values(inputs).some(el => !el) || !det1Container || !det2Container || !resultContainer) {
        return;
    }
    if (det1Container.hasAttribute('data-math-initialized')) return;


    const update = () => {
        const w: Point3D = [ parseFloat(inputs.wx.value) || 0, parseFloat(inputs.wy.value) || 0, parseFloat(inputs.wz.value) || 0 ];
        const r: Point3D = [ parseFloat(inputs.rx.value) || 0, parseFloat(inputs.ry.value) || 0, parseFloat(inputs.rz.value) || 0 ];

        const v = math.cross(w, r) as Point3D;

        // Regenerate LaTeX for determinants and final result
        const latex1 = `$$ \\vec v = \\vec w \\times \\vec r = \\begin{vmatrix} \\mathbf{i} & \\mathbf{j} & \\mathbf{k} \\\\ ${w[0]} & ${w[1]} & ${w[2]} \\\\ ${r[0]} & ${r[1]} & ${r[2]} \\end{vmatrix} $$`; // Corrected LaTeX for hat{i}, hat{j}, hat{k}
        const latex2 = `$$ \\vec v = \\begin{vmatrix} ${w[1]} & ${w[2]} \\\\ ${r[1]} & ${r[2]} \\end{vmatrix} \\hat\\imath - \\begin{vmatrix} ${w[0]} & ${w[2]} \\\\ ${r[0]} & ${r[2]} \\end{vmatrix} \\hat\\jmath + \\begin{vmatrix} ${w[0]} & ${w[1]} \\\\ ${r[0]} & ${r[1]} \\end{vmatrix}\\hat k = ((${w[1]*r[2]}) - (${w[2]*r[1]}))\\hat\\imath - ((${w[0]*r[2]}) - (${w[2]*r[0]}))\\hat\\jmath + ((${w[0]*r[1]}) - (${w[1]*r[0]}))\\hat k = ${v[0]}\\hat\\imath + ${v[1]}\\hat\\jmath + ${v[2]}\\hat k $$`; // Corrected LaTeX for hat{i}, hat{j}, hat{k}
        const latexResult = `$$ \\vec v = (${v[0]})\\hat\\imath + (${v[1]})\\hat\\jmath + (${v[2]})\\hat k \\text{ m/s} $$`; // Corrected LaTeX for hat{i}, hat{j}, hat{k}

        // Update container content and re-render with MathJax
        det1Container.innerHTML = latex1;
        det2Container.innerHTML = latex2;
        resultContainer.innerHTML = latexResult;

        if (typeof MathJax !== 'undefined' && MathJax.typesetPromise) {
            MathJax.typesetPromise([det1Container, det2Container, resultContainer]).catch((err: any) => console.error('MathJax typesetting error:', err));
        }
    };

    Object.values(inputs).forEach(input => input.addEventListener('input', update));

    // Initial sync and mark as initialized
    det1Container.setAttribute('data-math-initialized', 'true');
    update();
}

function runAllDrawings() {
    ensureSharedMarkerDefs();
    drawExercise1();
    setupExercise1Interactivity();
    drawExercise2();
    drawExercise3();
    setupExercise4Interactivity();
    setupExercise5Interactivity();
    setupExercise7Interactivity();
    drawExercise6();
    drawExercise8();
}

if (typeof document !== 'undefined') {
    runAllDrawings();
    document.addEventListener('DOMContentLoaded', runAllDrawings);
    document.addEventListener('astro:after-swap', runAllDrawings);
}