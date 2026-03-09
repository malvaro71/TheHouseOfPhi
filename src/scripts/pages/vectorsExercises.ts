import { CartesianPlane } from '../core/CartesianPlane.ts';
import { EuclideanSpace } from '../core/EuclideanSpace.ts';
import { ensureSharedMarkerDefs } from '../core/SVGDrawing.ts';
import * as math from 'mathjs';
import type { Point2D, Point3D } from '../core/types.ts';

function drawExercise1(vRiver?: Point2D, vBoat?: Point2D, vPropelled?: Point2D) {
    const svg = document.getElementById('svge_1');
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

function setupExercise1Interactivity() {
    const inputRiverX = document.getElementById('input-e1-vriver-x') as HTMLInputElement;
    const inputBoatY = document.getElementById('input-e1-vboat-y') as HTMLInputElement;

    // Output elements
    const outputVBoat = document.getElementById('output-e1-vboat');
    const outputVRiver = document.getElementById('output-e1-vriver');
    const outputVBoat2 = document.getElementById('output-e1-vboat-2');
    const outputVRiver2 = document.getElementById('output-e1-vriver-2');
    const outputVPropelled = document.getElementById('output-e1-vpropelled');
    const outputNormVPropelled = document.getElementById('output-e1-norm-vpropelled');
    const outputPhi = document.getElementById('output-e1-phi');
    const outputNormVPropelled2 = document.getElementById('output-e1-norm-vpropelled-2');
    const outputPhi2 = document.getElementById('output-e1-phi-2');

    if (!inputRiverX || !inputBoatY) return;

    const update = () => {
        const riverX = parseFloat(inputRiverX.value) || 0;
        const boatY = parseFloat(inputBoatY.value) || 0;

        const vRiver: Point2D = [riverX, 0];
        const vBoat: Point2D = [0, boatY];
        const vPropelled = math.subtract(vBoat, vRiver) as Point2D;
        const normVPropelled = math.norm(vPropelled) as number;
        const phi = math.acos(math.dot(vRiver, vPropelled) / (math.norm(vRiver) * normVPropelled)) * 180 / math.pi;

        // Update text outputs
        if (outputVBoat) outputVBoat.textContent = `${vBoat.join(', ')}`;
        if (outputVRiver) outputVRiver.textContent = `${vRiver.join(', ')}`;
        if (outputVBoat2) outputVBoat2.textContent = `(${vBoat.join(', ')})`;
        if (outputVRiver2) outputVRiver2.textContent = `(${vRiver.join(', ')})`;
        if (outputVPropelled) outputVPropelled.textContent = `(${vPropelled.join(', ')})`;
        if (outputNormVPropelled) outputNormVPropelled.textContent = normVPropelled.toFixed(1);
        if (outputPhi) outputPhi.textContent = phi.toFixed(1);
        if (outputNormVPropelled2) outputNormVPropelled2.textContent = normVPropelled.toFixed(1);
        if (outputPhi2) outputPhi2.textContent = phi.toFixed(1);

        // Redraw SVG
        drawExercise1(vRiver, vBoat, vPropelled);
    };

    inputRiverX.addEventListener('input', update);
    inputBoatY.addEventListener('input', update);
}

function drawExercise2() {
    const svg = document.getElementById('svge_2');
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

function drawExercise3() {
    const svg = document.getElementById('svge_3');
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

function drawExercise6() {
    const svg = document.getElementById('svge_6');
    if (!(svg instanceof SVGElement) || svg.hasAttribute('data-drawn')) return;
    
    const planeSpeed = 600;
    const angleNERad = 45 * Math.PI / 180;

    const V: Point2D = [ planeSpeed * Math.cos(angleNERad), planeSpeed * Math.sin(angleNERad) ];
    const projEV = math.multiply( planeSpeed * Math.cos(angleNERad), [1, 0] ) as Point2D;

    const plane = new CartesianPlane(svg, -700, 700, -100, 700, 0.3);
    plane.drawAxes("", "E", "O");
    plane.drawMath([-15, 700], "N", { scale: 1.2 });

    const origin: Point2D = [0, 0];
    const NE: Point2D = [ 700 * Math.cos(angleNERad), 700 * Math.sin(angleNERad) ];

    plane.drawVectorB(origin, NE, "NE", { strokeColor: "blue" }, { scale: 1.2, color: "blue" });
    plane.drawVectorB(origin, V, "V", { strokeColor: "green" }, { scale: 1.2, color: "green" });
    plane.drawVectorB(origin, projEV, "\\text{proj}_E V", { strokeColor: "green" }, { color: "green", scale: 1.2, dy: 20 });
    plane.drawSegment(projEV, V, { strokeColor: "blue", strokeDasharray: "5, 5" });
    plane.drawAngle(origin, projEV, V, 100, "\\theta = 45^\\circ", { strokeColor: "blue" }, { color: "blue", scale: 1 });

    svg.setAttribute('data-drawn', 'true');
}

function drawExercise8() {
    const svg = document.getElementById('svg2_8');
    if (!(svg instanceof SVGElement) || svg.hasAttribute('data-drawn')) return;
    
    const A: Point3D = [3, 4, 1], B: Point3D = [1, -2, 2], C: Point3D = [-2, 1, 4];
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

function setupExercise4Interactivity() {
    const inputSpeed = document.getElementById('input-e4-speed') as HTMLInputElement;
    const inputAngle = document.getElementById('input-e4-angle') as HTMLInputElement;

    if (!inputSpeed || !inputAngle) return;

    const update = () => {
        const speed = parseFloat(inputSpeed.value) || 0;
        const angleDeg = parseFloat(inputAngle.value) || 0;
        const angleRad = angleDeg * Math.PI / 180;

        const vx = speed * Math.cos(angleRad);
        const vy = speed * Math.sin(angleRad);

        const setContent = (id: string, val: string) => {
            const el = document.getElementById(id);
            if (el) el.textContent = val;
        };

        setContent('output-e4-speed', speed.toString());
        setContent('output-e4-angle', angleDeg.toString());
        
        setContent('output-e4-speed-2', speed.toString());
        setContent('output-e4-angle-2', angleDeg.toString());
        setContent('output-e4-vx', vx.toFixed(1));

        setContent('output-e4-speed-3', speed.toString());
        setContent('output-e4-angle-3', angleDeg.toString());
        setContent('output-e4-vy', vy.toFixed(1));

        setContent('output-e4-vx-2', vx.toFixed(1));
        setContent('output-e4-vy-2', vy.toFixed(1));
    };

    inputSpeed.addEventListener('input', update);
    inputAngle.addEventListener('input', update);
}

function setupExercise5Interactivity() {
    // Inputs
    const inputs = {
        vx: document.getElementById('input-e5-vx') as HTMLInputElement,
        vy: document.getElementById('input-e5-vy') as HTMLInputElement,
        vz: document.getElementById('input-e5-vz') as HTMLInputElement,
        wx: document.getElementById('input-e5-wx') as HTMLInputElement,
        wy: document.getElementById('input-e5-wy') as HTMLInputElement,
        wz: document.getElementById('input-e5-wz') as HTMLInputElement,
    };

    if (Object.values(inputs).some(el => !el)) return;

    const setContent = (id: string, val: string) => {
        const el = document.getElementById(id);
        if (el) el.textContent = val;
    };

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

        // Update spans for dot product calculation
        setContent('output-e5-vx-1', v[0].toString()); setContent('output-e5-wx-1', w[0].toString());
        setContent('output-e5-vy-1', v[1].toString()); setContent('output-e5-wy-1', w[1].toString());
        setContent('output-e5-vz-1', v[2].toString()); setContent('output-e5-wz-1', w[2].toString());
        setContent('output-e5-dotproduct', dotProduct.toString());

        // Update spans for norm calculations
        setContent('output-e5-vx-2', v[0].toString());
        setContent('output-e5-vy-2', v[1].toString());
        setContent('output-e5-vz-2', v[2].toString());
        setContent('output-e5-normv-sq', normV_sq.toFixed(0));
        setContent('output-e5-normv', normV.toFixed(2));

        setContent('output-e5-wx-2', w[0].toString());
        setContent('output-e5-wy-2', w[1].toString());
        setContent('output-e5-wz-2', w[2].toString());
        setContent('output-e5-normw-sq', normW_sq.toFixed(0));
        setContent('output-e5-normw', normW.toFixed(2));

        // Update spans for angle calculation
        setContent('output-e5-dotproduct-2', dotProduct.toString());
        setContent('output-e5-normv-2', normV.toFixed(2));
        setContent('output-e5-normw-2', normW.toFixed(2));
        setContent('output-e5-costheta', cosTheta.toFixed(4));
        setContent('output-e5-theta', thetaDeg.toFixed(2));
    };

    Object.values(inputs).forEach(input => input.addEventListener('input', update));
}

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

    // Final result spans
    const outputVx = document.getElementById('output-e7-vx');
    const outputVy = document.getElementById('output-e7-vy');
    const outputVz = document.getElementById('output-e7-vz');

    if (Object.values(inputs).some(el => !el) || !det1Container || !det2Container || !outputVx || !outputVy || !outputVz) {
        return;
    }

    const update = () => {
        const w: Point3D = [ parseFloat(inputs.wx.value) || 0, parseFloat(inputs.wy.value) || 0, parseFloat(inputs.wz.value) || 0 ];
        const r: Point3D = [ parseFloat(inputs.rx.value) || 0, parseFloat(inputs.ry.value) || 0, parseFloat(inputs.rz.value) || 0 ];

        const v = math.cross(w, r) as Point3D;

        // Update final result spans
        outputVx.textContent = v[0].toString();
        outputVy.textContent = v[1].toString();
        outputVz.textContent = v[2].toString();

        // Regenerate LaTeX for determinants
        const latex1 = `$$ \\vec v = \\vec w \\times \\vec r = \\begin{vmatrix} \\mathbf{i} & \\mathbf{j} & \\mathbf{k} \\\\ ${w[0]} & ${w[1]} & ${w[2]} \\\\ ${r[0]} & ${r[1]} & ${r[2]} \\end{vmatrix} $$`;
        const latex2 = `$$ \\vec v = \\begin{vmatrix} ${w[1]} & ${w[2]} \\\\ ${r[1]} & ${r[2]} \\end{vmatrix} \\hat\\imath - \\begin{vmatrix} ${w[0]} & ${w[2]} \\\\ ${r[0]} & ${r[2]} \\end{vmatrix} \\hat\\jmath + \\begin{vmatrix} ${w[0]} & ${w[1]} \\\\ ${r[0]} & ${r[1]} \\end{vmatrix}\\hat k = ((${w[1]*r[2]}) - (${w[2]*r[1]}))\\hat\\imath - ((${w[0]*r[2]}) - (${w[2]*r[0]}))\\hat\\jmath + ((${w[0]*r[1]}) - (${w[1]*r[0]}))\\hat k = ${v[0]}\\hat\\imath + ${v[1]}\\hat\\jmath + ${v[2]}\\hat k $$`;

        // Update container content and re-render with MathJax
        det1Container.innerHTML = latex1;
        det2Container.innerHTML = latex2;
        
        if (typeof MathJax !== 'undefined' && MathJax.typesetPromise) {
            // This tells MathJax to re-scan the containers for new math content and render it.
            MathJax.typesetPromise([det1Container, det2Container]).catch((err: any) => console.error('MathJax typesetting error:', err));
        }
    };

    Object.values(inputs).forEach(input => input.addEventListener('input', update));
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