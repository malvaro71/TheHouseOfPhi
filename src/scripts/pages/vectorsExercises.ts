import { CartesianPlane } from '../core/CartesianPlane.ts';
import { EuclideanSpace } from '../core/EuclideanSpace.ts';
import { ensureSharedMarkerDefs } from '../core/SVGDrawing.ts';
import * as math from 'mathjs';
import type { Point2D, Point3D } from '../core/types.ts';

function drawExercise1() {
    const svg = document.getElementById('svge_1');
    if (!(svg instanceof SVGElement) || svg.hasAttribute('data-drawn')) return;

    const vRiverStr = svg.getAttribute('data-v-river');
    const vBoatStr = svg.getAttribute('data-v-boat');
    const vPropelledStr = svg.getAttribute('data-v-propelled');

    if (!vRiverStr || !vBoatStr || !vPropelledStr) return;

    const e1_vRiver = JSON.parse(vRiverStr) as Point2D;
    const e1_vBoat = JSON.parse(vBoatStr) as Point2D;
    const e1_vPropelled = JSON.parse(vPropelledStr) as Point2D;

    const plane = new CartesianPlane(svg, -23, 23, -6, 40, 9);
    plane.drawAxes("y", "x", "O");

    const initialPoint: Point2D = [0, 0];

    plane.drawVectorB(initialPoint, e1_vRiver, "\\vec{V}_r", { strokeColor: "cornflowerBlue" }, { scale: 1, dy: 4 });
    plane.drawVectorB(initialPoint, e1_vPropelled, "\\vec{V}_p", { strokeColor: "cornflowerBlue" }, { scale: 1.3, dx: 4, dy: -4 });
    
    const negVRiver = math.multiply(-1, e1_vRiver) as Point2D;
    plane.drawSegment(e1_vPropelled, negVRiver, { strokeColor: "green", strokeDasharray: "5,5" });
    plane.drawVectorB(initialPoint, negVRiver, "\\vec{V}_x = -\\vec{V}_{rx}", { strokeColor: "green" }, { scale: 1, color: "green", dx: -46, dy: 4 });
    
    plane.drawSegment(e1_vPropelled, e1_vBoat, { strokeColor: "green", strokeDasharray: "5,5" });
    plane.drawVectorB(initialPoint, e1_vBoat, "\\vec{V}_b = \\vec{V}_{py}", { strokeColor: "green" }, { scale: 1.3, color: "green", dx: 5, dy: -4 });
    plane.drawAngle(initialPoint, e1_vRiver, e1_vPropelled, 3, "\\phi", { strokeColor: "orange" }, { color: "orange", scale: 1.2, dx: 0, dy: -8 });

    svg.setAttribute('data-drawn', 'true');
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

function runAllDrawings() {
    ensureSharedMarkerDefs();
    drawExercise1();
    drawExercise2();
    drawExercise3();
    drawExercise6();
    drawExercise8();
}

if (typeof document !== 'undefined') {
    runAllDrawings();
    document.addEventListener('DOMContentLoaded', runAllDrawings);
    document.addEventListener('astro:after-swap', runAllDrawings);
}