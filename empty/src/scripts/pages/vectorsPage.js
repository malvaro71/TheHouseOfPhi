
// vectorsPage.js
// ======================================================
// ES Module for Vectors Page
// ======================================================

// Import core modules
import {
    ensureSharedMarkerDefs,
    textWithSubscript,
    renderMathExpression,
    writeValue
} from '../core/SVGDrawing.js';

import { CartesianPlane } from '../core/CartesianPlane.js';
import { EuclideanSpace } from '../core/EuclideanSpace.js';
import * as math from 'mathjs';

// Initialize shared SVG markers once
ensureSharedMarkerDefs();

// ======================================================
// svg1_1 — A vector represented by a directed segment AB
// ======================================================
const svg1_1 = document.getElementById("svg1_1");
if (svg1_1) {

    const plane = new CartesianPlane(svg1_1, -3, 23, 0, 10);

    const pointA = [0, 0];
    const pointB = [20, 10];

    // Vector = B - A
    const vectorAB = math.subtract(pointB, pointA);

    plane.drawVector(pointA, vectorAB);

    plane.drawLabel(pointA, "A", { fill: "brown", fontSize: 20 });
    plane.drawLabel(pointB, "B", { fill: "brown", fontSize: 20, corner: "lefttop" });
}

// ======================================================
// svg1_2 — Vector addition (graphical method)
// ======================================================
const svg1_2 = document.getElementById("svg1_2");
if (svg1_2) {

    const plane = new CartesianPlane(svg1_2, 0, 19, 0, 18);

    const pointA = [0, 0];
    const vectorA = [4, 12];
    const vectorB = [15, 6];
    const vectorAPlusB = math.add(vectorA, vectorB);

    plane.drawVector(pointA, vectorA, "a",
        { strokeColor: "green" },
        { fontSize: 22, fill: "green" }
    );

    plane.drawVector(vectorA, vectorB, "b",
        { strokeColor: "blue" },
        { fontSize: 22, fill: "blue" }
    );

    plane.drawVector(pointA, vectorAPlusB, "a+b",
        { strokeColor: "brown" },
        { fontSize: 22, corner: "lefttop" }
    );

    plane.drawVector(pointA, vectorB, "b",
        { strokeColor: "blue" },
        { fontSize: 22, fill: "blue" }
    );

    plane.drawVector(vectorB, vectorA, "a",
        { strokeColor: "green" },
        { fontSize: 22, fill: "green" }
    );
}

// ======================================================
// svg1_3 — Cartesian coordinates of a point
// ======================================================
const svg1_3 = document.getElementById("svg1_3");
if (svg1_3) {

    const plane = new CartesianPlane(svg1_3, -10, 11, -10, 10);
    plane.drawAxes("y-axis", "x-axis", "O");

    plane.drawPoint([5, 8], "green");
    plane.drawLabel([6, 8], "P(x₁, y₁)", { fill: "green", fontSize: 20, corner: "leftbottom" });

    plane.drawSegment([5, 0], [5, 8], { strokeColor: "green", strokeDasharray: "5,5", strokeWidth: 1 });
    plane.drawSegment([0, 8], [5, 8], { strokeColor: "green", strokeDasharray: "5,5", strokeWidth: 1 });
}

// ======================================================
// svg1_5 — Point P(x1, y1, z1) in Euclidean space
// ======================================================
const svg1_5 = document.getElementById("svg1_5");
if (svg1_5) {

    svg1_5.setAttribute("viewBox", "0 0 400 400");
    svg1_5.setAttribute("width", "400");
    svg1_5.setAttribute("height", "400");

    const space = new EuclideanSpace(svg1_5, [0, 0, 0], 10);
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

    space.drawLabel([6, -0.1, 0], "x₁", { fill: "green", fontSize: 20 });
    space.drawLabel([0, 9.1, 0.1], "y₁", { fill: "green", fontSize: 20, corner: "leftbottom" });
    space.drawLabel([0, -0.1, 15], "z₁", { fill: "green", fontSize: 20 });
    space.drawLabel([6, 10, 16], "P(x₁, y₁, z₁)", { fill: "green", corner: "lefttop" });
}

// ======================================================
// svg1_6 — Projection of W onto V
// ======================================================
const svg1_6 = document.getElementById("svg1_6");
if (svg1_6) {

    const plane = new CartesianPlane(svg1_6, 0, 21, 0, 14);

    const origin = [2, 2];
    const vectorW = [14, 12];
    const vectorV = [19, 0];

    // Unit vector of V
    const unitV = math.multiply(1 / math.norm(vectorV), vectorV);

    // Projection of W onto V
    const projW_on_V = math.multiply(math.dot(vectorW, unitV), unitV);

    // Draw vectors
    plane.drawVector(origin, vectorW, "w",
        { strokeColor: "green" },
        { fontSize: 22, fill: "green" }
    );

    plane.drawVector(origin, vectorV);
    plane.drawLabel([19, 2], "v", { fontSize: 18 });

    plane.drawVector(origin, projW_on_V, "",
        { strokeColor: "green", strokeDasharray: "5,5" }
    );

    plane.drawLabel([14, 2], "Projᵥw",
        { fontSize: 18, fill: "green" }
    );

    // Angle between v and w
    plane.drawArc(origin, vectorV, vectorW, 4);
    plane.drawLabel([7, 3], "θ", { fontSize: 16, fill: "blue" });

    // Dashed segment from W to its projection
    plane.drawSegment(
        math.add(origin, vectorW),
        math.add(origin, projW_on_V),
        { strokeColor: "green", strokeDasharray: "5,5" }
    );
}

// ======================================================
// svg1_8 — Moment of a sliding vector v about point P
// ======================================================
const svg1_8 = document.getElementById("svg1_8");
if (svg1_8) {

    svg1_8.setAttribute("viewBox", "0 0 400 400");
    svg1_8.setAttribute("width", "400");
    svg1_8.setAttribute("height", "410");

    const space = new EuclideanSpace(svg1_8, [0, 0, 0], 10);
    space.drawAxes();

    const pointP = [16, 9, 2];
    const vectorR = [0, 6, 2];
    const vectorV = [-5, -1, 0];

    space.drawPoint(pointP, "green");
    space.drawVector(pointP, vectorR, "r", { strokeColor: "blue" });

    const initialPoint = math.add(pointP, vectorR);
    space.drawVector(initialPoint, vectorV, "v", { strokeColor: "blue" });

    // Moment m = r × v
    const vectorM = math.cross(vectorR, vectorV);
    space.drawVector(pointP, vectorM, "m",
        { strokeColor: "green" },
        { corner: "righttop" }
    );
}

// ======================================================
// svg1_9 — Moment of v about a line l
// ======================================================
const svg1_9 = document.getElementById("svg1_9");
if (svg1_9) {

    svg1_9.setAttribute("viewBox", "0 0 400 400");
    svg1_9.setAttribute("width", "400");
    svg1_9.setAttribute("height", "410");

    const space = new EuclideanSpace(svg1_9, [0, 0, 0], 10);
    space.drawAxes();

    const pointP = [16, 9, 2];
    const vectorR = [0, 6, 2];
    const vectorV = [-5, -1, 0];

    const unitL = [0, 0, 1]; // line parallel to z-axis
    const lineL1 = [16, 9, -2];
    const lineL2 = [16, 9, 40];

    space.drawPoint(pointP, "green");
    space.drawVector(pointP, vectorR, "r", { strokeColor: "blue" });

    const initialPoint = math.add(pointP, vectorR);
    space.drawVector(initialPoint, vectorV, "v", { strokeColor: "blue" });

    // Moment m = r × v
    const vectorM = math.cross(vectorR, vectorV);
    space.drawVector(pointP, vectorM, "M",
        { strokeColor: "green" },
        { corner: "righttop" }
    );

    // Draw line l
    space.drawSegment(lineL1, lineL2, { strokeColor: "blue" });

    // Projection of M onto l
    const projM_on_L = math.multiply(math.dot(vectorM, unitL), unitL);

    space.drawVector(pointP, projM_on_L, "Mₗ",
        { strokeColor: "green", strokeDasharray: "5,5" },
        { corner: "leftbottom" }
    );

    // Dashed segment illustrating projection
    const dashed1 = math.add(pointP, vectorM);
    const dashed2 = math.add(pointP, projM_on_L);

    space.drawSegment(dashed1, dashed2,
        { strokeColor: "green", strokeDasharray: "5,5" }
    );
}

// ======================================================
// Exercise e_1
// ======================================================
function renderExerciseE1() {

    // Exercise data
    const vRiver = [9, 0];
    const vBoat = [0, 36];

    // vPropelled = vBoat – vRiver
    const vPropelled = math.subtract(vBoat, vRiver);
    const normvPropelled = math.norm(vPropelled);

    // Angle φ between vRiver and vPropelled
    const phi = math.acos(
        math.dot(vRiver, vPropelled) /
        (math.norm(vRiver) * normvPropelled)
    ) * 180 / math.pi;

    // Write values in HTML
    writeValue("e_1avgSpeed", vBoat[1]);
    writeValue("e_1riverSpeed", vRiver[0]);
    writeValue("e_1vBoat", vBoat);
    writeValue("e_1vRiver", vRiver);
    writeValue("e_1vBoat1", vBoat);
    writeValue("e_1vRiver1", vRiver);
    writeValue("e_1vPropelled", vPropelled);
    writeValue("e_1normvPropelled", normvPropelled.toFixed(1));
    writeValue("e_1phi1", phi.toFixed(1));
    writeValue("e_1normvPropelled1", normvPropelled.toFixed(1));
    writeValue("e_1phi2", phi.toFixed(1));

    // SVG
    const svg = document.getElementById("svge_1");
    if (!svg) return;

    const plane = new CartesianPlane(svg, -23, 23, -6, 40, 9);
    plane.drawAxes("y-axis", "x-axis", "O");

    // Labels
    plane.drawLabel([7, 39], "Data:", { corner: "lefttop", fontSize: 15 });
    plane.drawLabel([7, 36], "Vr = <9, 0> Km/h", { corner: "lefttop", fontSize: 15 });
    plane.drawLabel([7, 33], "Vb = <0, 36> Km/h", { corner: "lefttop", fontSize: 15 });

    const initialPoint = [0, 0];

    // Vr
    plane.drawVector(initialPoint, vRiver, textWithSubscript("V", "r"),
        { strokeColor: "green" },
        { corner: "righttop" }
    );

    // Vp
    plane.drawVector(initialPoint, vPropelled, textWithSubscript("V", "p"),
        { strokeColor: "blue" },
        { corner: "righttop" }
    );

    // Components
    plane.drawSegment(vPropelled, math.multiply(-1, vRiver),
        { strokeColor: "green", strokeDasharray: "5,5" }
    );

    plane.drawVector(initialPoint, math.multiply(-1, vRiver), "Vx = -Vrx",
        { strokeColor: "green" },
        { corner: "righttop" }
    );

    plane.drawSegment(vPropelled, vBoat,
        { strokeColor: "green", strokeDasharray: "5,5" }
    );

    plane.drawVector(initialPoint, vBoat, "Vy = Vby",
        { strokeColor: "green" },
        { corner: "lefttop" }
    );

    // Angle
    plane.drawArc(initialPoint, vRiver, vPropelled, 3);
    plane.drawLabel([3, 3], "φ", { fill: "blue", corner: "leftbottom" });

    // Solutions
    plane.drawLabel([7, 30], "Solution:", { corner: "lefttop", fontSize: 15 });
    plane.drawLabel([7, 27], `φ = ${phi.toFixed(1)}º`, { corner: "lefttop", fontSize: 15 });
    plane.drawLabel([7, 24], `|Vp| = ${normvPropelled.toFixed(1)} Km/h`, { corner: "lefttop", fontSize: 15 });
}

renderExerciseE1();


// ======================================================
// Exercise e_2 — Graphical sum of vectors a, b, c, d
// ======================================================
function renderExerciseE2() {

    const vectorA = [2, 3];
    const vectorB = [4, -2];
    const vectorC = [3, -2];
    const vectorD = [-9, 1];

    const svg = document.getElementById("svge_2");
    if (!svg) return;

    const xMin = -1, xMax = 10, yMin = -3, yMax = 5;

    const plane = new CartesianPlane(svg, xMin, xMax, yMin, yMax, 34);
    plane.drawAxes("y-axis", "x-axis", "O");

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
    let initialPoint = [0, 0];
    const vectors = [vectorA, vectorB, vectorC, vectorD];
    const names = ["a", "b", "c", "d"];

    for (let i = 0; i < vectors.length; i++) {
        plane.drawVector(initialPoint, vectors[i], names[i]);
        initialPoint = math.add(initialPoint, vectors[i]);
    }
}

renderExerciseE2();

// ======================================================
// Exercise e_3 — NNE direction, velocity components
// ======================================================
function renderExerciseE3() {

    const sailboatSpeed = 4; // km/h

    // NNE = 3π/8 = 67.5º
    const NNE = math.unit(67.5, 'deg');

    const sailboatSpeedX = sailboatSpeed * math.cos(NNE);
    const sailboatSpeedY = sailboatSpeed * math.sin(NNE);
    const sailboatVelocity = [sailboatSpeedX, sailboatSpeedY];

    writeValue("e_3sailboatSpeed", sailboatSpeed);
    writeValue("e_3Vx", sailboatSpeedX.toFixed(2));
    writeValue("e_3Vy", sailboatSpeedY.toFixed(2));

    const svg = document.getElementById("svge_3");
    if (!svg) return;

    const xMin = -5, xMax = 5, yMin = -1, yMax = 5;

    const plane = new CartesianPlane(svg, xMin, xMax, yMin, yMax, 48);
    plane.drawAxes("", "E", "O");
    plane.drawLabel([-0.3, yMax], "N", { corner: "righttop" });

    const origin = [0, 0];

    // Extremo de la dirección NNE
    const NNEextreme = [
        xMax * math.cos(NNE),
        yMax * math.sin(NNE)
    ];

    plane.drawVector(origin, NNEextreme);
    plane.drawLabel(NNEextreme, "NNE", { corner: "lefttop" });

    // Velocidad del barco
    plane.drawVector(origin, sailboatVelocity, "V", { strokeColor: "green" });

    // Líneas auxiliares
    plane.drawSegment([sailboatSpeedX, 0], [sailboatSpeedX, sailboatSpeedY],
        { strokeColor: "blue", strokeDasharray: "5, 5" }
    );

    plane.drawSegment([0, sailboatSpeedY], [sailboatSpeedX, sailboatSpeedY],
        { strokeColor: "blue", strokeDasharray: "5, 5" }
    );

    // Componentes
    plane.drawVector(origin, [sailboatSpeedX, 0], textWithSubscript("V", "x"),
        { strokeColor: "green" },
        { corner: "lefttop" }
    );

    plane.drawVector(origin, [0, sailboatSpeedY], textWithSubscript("V", "y"),
        { strokeColor: "green" },
        { corner: "rightbottom" }
    );

    // Ángulo entre Vx y V
    const halfAngle = math.unit(67.5 / 2, 'deg');
    plane.drawArc(origin, [sailboatSpeedX, 0], sailboatVelocity, 0.5);

    plane.drawLabel(
        [
            0.5 * math.cos(halfAngle),
            0.5 * math.sin(halfAngle)
        ],
        "θ = 67.5º",
        { stroke: "blue", corner: "leftbottom", fontSize: 16, fontWeight: "lighter" }
    );
}

renderExerciseE3();

// ======================================================
// Exercise e_4 — Components of velocity at 30º
// ======================================================
function renderExerciseE4() {

    const speed = 120; // m/s
    const orientation = math.unit(30, 'deg');

    const Vx = speed * math.cos(orientation);
    const Vy = speed * math.sin(orientation);

    writeValue("e_4Speed1", speed);
    writeValue("e_4orientation1", 30);
    writeValue("e_4Speed2", speed);
    writeValue("e_4orientation2", 30);
    writeValue("e_4Vx1", Vx.toFixed(1));
    writeValue("e_4Vy1", Vy.toFixed(1));
    writeValue("e_4Vx2", Vx.toFixed(1));
    writeValue("e_4Vy2", Vy.toFixed(1));
}

renderExerciseE4();

// ======================================================
// Exercise e_5 — Scalar product and angle
// ======================================================
function renderExerciseE5() {

    const v = [5, -3, 2];
    const w = [-2, 1, 3];

    const scalarProduct = math.dot(v, w);

    const cosAng = scalarProduct / (math.norm(v) * math.norm(w));
    const angleRad = math.acos(cosAng);
    const angleDeg = angleRad * 180 / math.pi;

    writeValue("e_5escProd1", scalarProduct);
    writeValue("e_5angle1", angleDeg.toFixed(2));
}

renderExerciseE5();

// ======================================================
// Exercise e_6 — Projection of NE velocity onto East
// ======================================================
function renderExerciseE6() {

    const planeSpeed = 600; // km/h
    const angleNE = math.unit(45, 'deg'); // NE direction
    const angleNEDeg = 45;

    // Velocity vector V
    const V = [
        planeSpeed * math.cos(angleNE),
        planeSpeed * math.sin(angleNE)
    ];

    // Projection onto East direction (unit vector [1, 0])
    const projEV = math.multiply(
        planeSpeed * math.cos(angleNE),
        [1, 0]
    );

    const normProjEV = math.norm(projEV);

    // Write values in HTML
    writeValue("e_6speed1", planeSpeed);
    writeValue("e_6angle1", angleNEDeg);
    writeValue("e_6speed2", planeSpeed);
    writeValue("e_6angle2", angleNEDeg);
    writeValue("e_6projection", normProjEV.toFixed(0));

    // SVG
    const svg = document.getElementById("svge_6");
    if (!svg) return;

    const xMin = -700, xMax = 700, yMin = -100, yMax = 700;

    const plane = new CartesianPlane(svg, xMin, xMax, yMin, yMax, 0.3);
    plane.drawAxes("", "E", "O");
    plane.drawLabel([-15, yMax], "N", { corner: "righttop" });

    const origin = [0, 0];

    // NE direction arrow
    const NE = [
        xMax * math.cos(angleNE),
        yMax * math.sin(angleNE)
    ];

    plane.drawVector(origin, NE);
    plane.drawLabel(NE, "NE", { corner: "lefttop" });

    // Velocity vector V
    plane.drawVector(origin, V, "V", { strokeColor: "green" }, { corner: "lefttop" });

    // Projection vector
    const projEVText = textWithSubscript("proj", "E");
    projEVText.appendChild(document.createTextNode("V"));

    plane.drawVector(origin, projEV, projEVText,
        { strokeColor: "green" },
        { corner: "lefttop" }
    );

    // Dashed line from projection to V
    plane.drawSegment(projEV, V,
        { strokeColor: "blue", strokeDasharray: "5, 5" }
    );

    // Angle between projEV and V
    const angleLabelPos = [
        120 * math.cos(math.unit(33.75, 'deg')),
        120 * math.sin(math.unit(33.75, 'deg'))
    ];

    plane.drawArc(origin, projEV, V, 100);
    plane.drawLabel(angleLabelPos, "θ = 45º",
        { stroke: "blue", corner: "lefttop", fontSize: 16, fontWeight: "lighter" }
    );
}

renderExerciseE6();


// ======================================================
// Exercise e_7 — Linear velocity v = w × r
// ======================================================
function renderExerciseE7() {

    // Angular velocity vector (rad/s)
    // Represents the rotation of the rigid body.
    const w = [1, 1, 1];

    // Position vector of point P relative to the rotation axis (meters)
    // This determines how far the point is from the axis and in which direction.
    const r = [2, -2, 1];

    // Get the HTML elements where the symbolic expression and the result will appear.
    // divExpr: shows the symbolic cross product "cross(w, r)"
    // divResult: shows the evaluated numerical result
    const divExpr = document.getElementById("e_7_1");
    const divResult = document.getElementById("e_7_2");

    // If either element is missing, stop the function to avoid errors.
    if (!divExpr || !divResult) return;

    // Build a string representing the cross product expression.
    // JSON.stringify ensures the vectors appear as "[1,1,1]" instead of "1,1,1".
    // This string is what math.js will render and later evaluate.
    const expr = `cross(${JSON.stringify(w)}, ${JSON.stringify(r)})`;

    // Render the symbolic expression in the HTML element.
    // This shows the student the *formula* before computing the result.
    renderMathExpression(divExpr, expr);

    // Evaluate the expression numerically using math.js.
    // math.evaluate("cross([1,1,1],[2,-2,1])") returns the resulting vector.
    const result = math.evaluate(expr);

    // Display the result as plain text.
    // math.format ensures the vector is shown cleanly, e.g. "[4, 1, -4]"
    divResult.textContent = math.format(result);
}

// Wait for MathJax to finish loading and initializing.
// MathJax.startup.promise resolves ONLY when MathJax is fully ready.
// This prevents errors like "MathJax.tex2svgPromise is not a function".
MathJax.startup.promise.then(() => {

    // Once MathJax is ready, call your page-specific rendering logic.
    // For example, rendering Exercise E7.
    renderExerciseE7();

});

// ======================================================
// Exercise 2_8 — Area of triangle ABC in 3D
// ======================================================
function renderExercise2_8() {

    // --------------------------------------------------
    // 1. Datos del ejercicio
    // --------------------------------------------------
    // Coordenadas de los vértices del triángulo en 3D
    const A = [3, 4, 1];     // m
    const B = [1, -2, 2];    // m
    const C = [-2, 1, 4];    // m

    // --------------------------------------------------
    // 2. Cálculo de los vectores AB y AC
    // --------------------------------------------------
    // AB = B - A
    const AB = math.subtract(B, A);

    // AC = C - A
    const AC = math.subtract(C, A);

    // --------------------------------------------------
    // 3. Área del triángulo
    // --------------------------------------------------
    // El área de un triángulo en 3D es:
    //     area = |AB × AC| / 2
    //
    // El producto vectorial AB × AC da el vector normal al plano,
    // y su norma es el doble del área del triángulo.
    const area = math.norm(math.cross(AB, AC)) / 2;

    // --------------------------------------------------
    // 4. Mostrar valores en HTML
    // --------------------------------------------------
    writeValue("2_8A", A);
    writeValue("2_8B", B);
    writeValue("2_8C", C);
    writeValue("2_8AB", AB);
    writeValue("2_8AC", AC);
    writeValue("2_8area", area.toFixed(2));

    // --------------------------------------------------
    // 5. Preparar el SVG
    // --------------------------------------------------
    const svg = document.getElementById("svg2_8");
    if (!svg) return;

    svg.setAttribute("viewBox", "0 0 400 400");
    svg.setAttribute("width", "400");
    svg.setAttribute("height", "410");

    // Espacio euclídeo 3D con escala 30 px por unidad
    const space = new EuclideanSpace(svg, [0, 0, 0], 30);
    space.drawAxes();

    // --------------------------------------------------
    // 6. Elementos auxiliares para dibujar el paralelogramo
    // --------------------------------------------------
    // Punto B + AC: vértice opuesto del paralelogramo generado por AB y AC
    const BplusAC = math.add(B, AC);

    // --------------------------------------------------
    // 7. Dibujar puntos y etiquetas
    // --------------------------------------------------
    space.drawPoint(A, "green");
    space.drawLabel(A, "A", { corner: "righttop" });

    space.drawPoint(B, "green");
    space.drawLabel(B, "B", { corner: "righttop" });

    space.drawPoint(C, "green");
    space.drawLabel(C, "C", { corner: "leftbottom" });

    // --------------------------------------------------
    // 8. Dibujar los lados del triángulo
    // --------------------------------------------------
    space.drawVector(A, AB, "AB",
        { strokeColor: "green" },
        { corner: "righttop" }
    );

    space.drawVector(A, AC, "AC",
        { strokeColor: "green" },
        { corner: "leftbottom" }
    );

    space.drawSegment(B, C, { strokeColor: "green" });

    // --------------------------------------------------
    // 9. Dibujar el paralelogramo generado por AB y AC
    // --------------------------------------------------
    // Esto ayuda a visualizar por qué |AB × AC| es el área del paralelogramo
    space.drawSegment(B, BplusAC,
        { strokeColor: "blue", strokeDasharray: "5,5" }
    );

    space.drawSegment(C, BplusAC,
        { strokeColor: "blue", strokeDasharray: "5,5" }
    );
}

renderExercise2_8();
