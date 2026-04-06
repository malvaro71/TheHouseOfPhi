// ==============================================================================
// KinematicsPage.js — ES Module for kinematics_es.html and kinematics_en.html
// ==============================================================================

// Imports
import {
    ensureSharedMarkerDefs,
    generateFunctionPoints
} from '../core/SVGDrawing.js';

import { CartesianPlane } from '../core/CartesianPlane.js';
import { EuclideanSpace } from '../core/EuclideanSpace.js';
import * as math from 'mathjs';

// Ensure shared marker definitions are present in the document
ensureSharedMarkerDefs();


// ==============================================================================
// svg1.1 — Point P(x(t), y(t), z(t)) and its path
// ==============================================================================
function renderKinematics1_1() {

    const svg = document.getElementById("svg1_1");
    if (!svg) return;

    // Configure SVG
    svg.setAttribute("viewBox", "0 0 400 400");
    svg.setAttribute("width", "400");
    svg.setAttribute("height", "400");

    // Create Euclidean space
    const space = new EuclideanSpace(svg, [0, 0, 0], 10);
    space.drawAxes();

    // Coordinates of point P and its projections
    const P = [6, 9, 15];
    const x = [6, 0, 0];
    const y = [0, 9, 0];
    const z = [0, 0, 15];

    // Draw point P
    space.drawPoint(P, "green");

    // Dashed projection lines
    space.drawSegment(x, [6, 9, 0], { strokeColor: "green", strokeDasharray: "5,5" });
    space.drawSegment([6, 9, 0], P, { strokeColor: "green", strokeDasharray: "5,5" });
    space.drawSegment(y, [6, 9, 0], { strokeColor: "green", strokeDasharray: "5,5" });

    // Labels
    space.drawLabel([6, -0.1, 0], "x", { fill: "green", fontSize: 20 });
    space.drawLabel([0, 9.1, 0.1], "y", { fill: "green", fontSize: 20, corner: "leftbottom" });
    space.drawLabel([0, -0.1, 15], "z", { fill: "green", fontSize: 20 });
    space.drawLabel([6, 10, 16], "P(x(t), y(t), z(t))", { fill: "green", corner: "lefttop" });

    // Draw vectors r(t), xi, yj, zk
    space.drawVector([0, 0, 0], P, "r(t)", { strokeColor: "blue" });
    space.drawVector([0, 0, 0], x, "x", { strokeColor: "blue" });
    space.drawVector([0, 0, 0], y, "y", { strokeColor: "blue" });
    space.drawVector([0, 0, 0], z, "z", { strokeColor: "blue" });

    // Path of motion
    const Points = [
        [-1, -1, 8],
        [6, 9, 15],
        [5, 28, 18],
        [20, 25, 12]
    ];

    space.drawPath(Points, [0, 1, 9], "green");
}

renderKinematics1_1();


// ==============================================================================
// svg1.2 — Trajectory r(t) and displacement vector Δr
// ==============================================================================
function renderKinematics1_2() {

    const svg = document.getElementById("svg1_2");
    if (!svg) return;

    // Configure SVG
    svg.setAttribute("viewBox", "0 0 400 400");
    svg.setAttribute("width", "400");
    svg.setAttribute("height", "400");

    // Create Euclidean space
    const space = new EuclideanSpace(svg, [0, 0, 0], 10);
    space.drawAxes();

    // Parametric trajectory r(t)
    function r(t) {
        const x = 4 - t / 10;
        const y = t * 2;
        const z = 20 - (t * t) / 5;
        return [x, y, z];
    }

    // Generate points along the trajectory
    const numberOfPoints = 20;
    const t0 = 0;
    const tf = 10;
    const step = (tf - t0) / (numberOfPoints - 1);

    const points = [];
    for (let i = 0; i < numberOfPoints; i++) {
        const t = t0 + i * step;
        points.push(r(t));
    }

    // Displacement vector Δr = r(6) - r(1)
    const deltar = math.subtract(r(6), r(1));

    // Draw r(1), r(6), and Δr
    space.drawVector([0, 0, 0], r(1), "r1", { strokeColor: "blue" });
    space.drawVector([0, 0, 0], r(6), "r2", { strokeColor: "blue" });
    space.drawVector(r(1), deltar, "r2 - r1", { strokeColor: "green" }, { corner: "righttop" });

    // Draw the trajectory
    space.drawPath(points, "green");
}

renderKinematics1_2();


// ==============================================================================
// svg1.3 — 2D trajectory, displacement vector and velocity vectors
// ==============================================================================
function renderKinematics1_3() {

    const svg = document.getElementById("svg1_3");
    if (!svg) return;

    // Create Cartesian plane
    const plane = new CartesianPlane(svg, 0, 8, 0, 5, 30);

    // Function defining the trajectory: y = 5 - x²/15
    function f(x) {
        return 5 - (x * x) / 15;
    }

    // Derivative: dy/dx = -2x/15
    function df(x) {
        return -2 * x / 15;
    }

    // Generate points along the curve
    const points = generateFunctionPoints(f, 1, 8, 20);

    // Key positions and velocities
    const r1 = [3, f(3)];
    const r2 = [7, f(7)];
    const v1 = [1, df(3)];
    const v2 = [1, df(7)];
    const deltar = math.subtract(r2, r1);

    // Draw vectors r1, r2, Δr, v1, v2
    plane.drawVector([0, 0], r1, "r₁", { strokeColor: "blue" });
    plane.drawVector([0, 0], r2, "r₂", { strokeColor: "blue" });
    plane.drawVector(r1, deltar, "Δr", { strokeColor: "green" }, { corner: "righttop" });
    plane.drawVector(r1, v1, "v₁", { strokeColor: "brown" });
    plane.drawVector(r2, v2, "v₂", { strokeColor: "brown" }, { corner: "righttop" });

    // Draw trajectory
    plane.drawPath(points, "green");
}

renderKinematics1_3();


// ==============================================================================
// svg1.4 — Velocity change in a time interval
// ==============================================================================
function renderKinematics1_4() {

    const svg = document.getElementById("svg1_4");
    if (!svg) return;

    const xMin = 0, xMax = 10, yMin = 2, yMax = 9.1;
    const plane = new CartesianPlane(svg, xMin, xMax, yMin, yMax, 40);

    // Function defining the trajectory: y = 5 + x - x²/15
    function f(x) {
        return 5 + x - (x * x) / 15;
    }

    // Derivative: dy/dx = 1 - 2x/15
    function df(x) {
        return 1 - 2 * x / 15;
    }

    // Generate points along the curve
    const points = generateFunctionPoints(f, 1, 8, 20);
    plane.drawPath(points, "green");

    // Reference center for drawing r1 and r2
    const center = [4.4, 2.5];

    const r1 = [3, f(3)];
    const r2 = [6, f(6)];
    const v1 = [1, df(3)];
    const v2 = [2, 2 * df(6)];

    // Draw r1 and r2 from the center
    plane.drawVector(center, math.subtract(r1, center), "r₁", { strokeColor: "blue" }, { corner: "righttop" });
    plane.drawVector(center, math.subtract(r2, center), "r₂", { strokeColor: "blue" });

    // Draw velocities
    plane.drawVector(r1, v1, "v₁", { strokeColor: "brown" });
    plane.drawVector(r1, v2, "v₂", { strokeColor: "brown" }, { corner: "righttop" });
    plane.drawVector(r2, v2, "v₂", { strokeColor: "brown" }, { corner: "righttop" });

    // Velocity variation Δv
    const deltav = math.subtract(v2, v1);
    plane.drawVector(math.add(r1, v1), deltav, "Δv", { strokeColor: "green" }, { corner: "leftbottom" });
}

renderKinematics1_4();


// ==============================================================================
// svg1.5 — Uniform rectilinear motion in 3D
// ==============================================================================
function renderKinematics1_5() {

    const svg = document.getElementById("svg1_5");
    if (!svg) return;

    svg.setAttribute("viewBox", "0 0 400 400");
    svg.setAttribute("width", "400");
    svg.setAttribute("height", "400");

    const space = new EuclideanSpace(svg, [0, 0, 0], 10);
    space.drawAxes();

    // Parametric motion: r(t) = r0 + v t
    function r(t) {
        const r0 = [-5, -5, 10];
        const v = [2, 5, -0.3];
        return math.add(r0, math.multiply(v, t));
    }

    // Generate points along the trajectory
    const numberOfPoints = 10;
    const t0 = 0, tf = 7;
    const step = (tf - t0) / (numberOfPoints - 1);

    const points = [];
    for (let i = 0; i < numberOfPoints; i++) {
        points.push(r(t0 + i * step));
    }

    // Displacement Δr = r(5) - r(3)
    const deltar = math.subtract(r(5), r(3));

    // Draw r(t₀), velocity vector, r(t₁), r(t₂), and Δr
    space.drawVector([0, 0, 0], r(0), "r(t₀)", { strokeColor: "blue" }, { corner: "righttop" });
    space.drawVector(r(0), [2, 5, -0.3], "v", { strokeColor: "blue" });

    space.drawVector([0, 0, 0], r(3), "r(t₁)", { strokeColor: "blue" });
    space.drawVector([0, 0, 0], r(5), "r(t₂)", { strokeColor: "blue" });

    space.drawVector(r(3), deltar, "Δr", { strokeColor: "green" }, { corner: "leftbottom" });

    // Draw trajectory
    space.drawPath(points, "green");
}

renderKinematics1_5();

// ==============================================================================
// svg1.6 — Rectilinear motion: using the direction of motion as reference
// ==============================================================================
function renderKinematics1_6() {

    const svg = document.getElementById("svg1_6");
    if (!svg) return;

    const xMin = -2, xMax = 20, yMin = -2, yMax = 4;

    const plane = new CartesianPlane(svg, xMin, xMax, yMin, yMax);

    // Draw the reference axis (direction of motion)
    plane.drawVector([0, 0], [20, 0], "", { strokeColor: "brown" });

    // Points x(t₀), x(t₁), x(t₂)
    plane.drawPoint([0, 0], "green");
    plane.drawLabel([0, 0], "x(t₀)", { fill: "green", fontSize: 20, corner: "lefttop" });

    plane.drawPoint([5, 0], "green");
    plane.drawLabel([5, 0], "x(t₁)", { fill: "green", fontSize: 20, corner: "righttop" });

    plane.drawPoint([15, 0], "green");
    plane.drawLabel([15, 0], "x(t₂)", { fill: "green", fontSize: 20, corner: "lefttop" });

    // Δx = Δs
    plane.drawLabel([8, 0], "Δx = Δs", { fill: "green", fontSize: 20, corner: "leftbottom" });

    // Segment between x(t₁) and x(t₂)
    plane.drawSegment([5, 0], [15, 0], { strokeColor: "green", strokeWidth: 2 });
}

renderKinematics1_6();


// ==============================================================================
// svg1.7 — Graph of x = f(t) for uniform rectilinear motion
// ==============================================================================
function renderKinematics1_7() {

    const svg = document.getElementById("svg1_7");
    if (!svg) return;

    const xMin = -6, xMax = 40, yMin = -5, yMax = 40;
    const plane = new CartesianPlane(svg, xMin, xMax, yMin, yMax, 8);

    plane.drawAxes("", "t", "O");
    plane.drawLabel([-2, 37], "x", { corner: "leftbottom", fontSize: 25 });

    // Motion parameters
    const x0 = 10;
    const speed = 0.5;

    // Uniform motion: x(t) = x0 + v t
    function f(t) {
        return x0 + speed * t;
    }

    // Generate points
    const numberOfPoints = 10;
    const tMin = 0, tMax = 37;
    const step = (tMax - tMin) / (numberOfPoints - 1);

    const points = [];
    for (let i = 0; i < numberOfPoints; i++) {
        const t = tMin + i * step;
        points.push([t, f(t)]);
    }

    // Draw trajectory
    plane.drawPath(points, "green");

    // Mark x₀
    plane.drawLabel([-3, 12], "x₀", { fill: "green", corner: "lefttop", fontSize: 25 });

    // Horizontal line at x₀
    plane.drawSegment([0, x0], [37, x0], { strokeColor: "green", strokeDasharray: "5,5" });

    // Angle α between horizontal and tangent
    plane.drawArc([0, x0], [10, 0], [10, f(10) - x0], 5);
    plane.drawLabel([6, x0 + 0.5], "α", { fill: "blue", corner: "leftbottom", fontSize: 25 });

    // Mark a point on the trajectory
    const t1 = 20;
    const x1 = f(t1);

    plane.drawPoint([t1, x1], "blue");

    // Dashed projections
    plane.drawSegment([20, 0], [20, x1], { strokeColor: "blue", strokeDasharray: "5,5" });
    plane.drawSegment([0, x1], [20, x1], { strokeColor: "blue", strokeDasharray: "5,5" });

    plane.drawLabel([0, x1], "x(t₁)", { fill: "blue", corner: "rightbottom", fontSize: 25 });
    plane.drawLabel([20, 0], "t₁", { fill: "blue", corner: "lefttop", fontSize: 25 });
}

renderKinematics1_7();


// ==============================================================================
// svg1.8 — Graph of x = f(t) for uniformly accelerated motion
// ==============================================================================
function renderKinematics1_8() {

    const svg = document.getElementById("svg1_8");
    if (!svg) return;

    const xMin = -10, xMax = 100, yMin = -10, yMax = 100;
    const plane = new CartesianPlane(svg, xMin, xMax, yMin, yMax, 3.5);

    plane.drawAxes("", "t", "O");
    plane.drawLabel([-1, 90], "x", { corner: "rightbottom", fontSize: 20 });

    // Motion parameters
    const x0 = 10;
    const v0 = 0.1;
    const a = 0.016;

    // Accelerated motion: x(t) = x0 + v0 t + ½ a t²
    function f(t) {
        return x0 + v0 * t + 0.5 * a * t * t;
    }

    // Generate points
    const numberOfPoints = 30;
    const tMin = 0, tMax = 80;
    const step = (tMax - tMin) / (numberOfPoints - 1);

    const points = [];
    for (let i = 0; i < numberOfPoints; i++) {
        const t = tMin + i * step;
        points.push([t, f(t)]);
    }

    // Draw trajectory
    plane.drawPath(points, "green");

    // Mark x₀
    plane.drawLabel([0, x0], "x₀", { fill: "green", corner: "rightbottom", fontSize: 20 });

    // Horizontal line at x₀
    plane.drawSegment([tMin, x0], [tMax, x0], { strokeColor: "green", strokeDasharray: "5,5" });

    // Velocity function v(t) = v0 + a t
    function df(t) {
        return v0 + a * t;
    }

    // Point of interest
    const t1 = 37;
    const x1 = f(t1);
    const v1 = df(t1);

    plane.drawPoint([t1, x1], "blue");

    // Tangent line at t₁
    plane.drawSegment([t1, x1], [t1 + 45, x1 + 45 * v1], { strokeColor: "blue", strokeDasharray: "5,5" });

    // Horizontal reference
    plane.drawSegment([t1, x1], [t1 + 45, x1], { strokeColor: "blue", strokeDasharray: "5,5" });

    // Angle α between tangent and horizontal
    plane.drawArc([t1, x1], [25, 0], [25, 25 * v1], 6);
    plane.drawLabel([t1 + 7, x1], "α", { fill: "blue", corner: "leftbottom", fontSize: 25 });

    // Projections to axes
    plane.drawSegment([t1, x1], [t1, 0], { strokeColor: "blue", strokeDasharray: "5,5" });
    plane.drawSegment([t1, x1], [0, x1], { strokeColor: "blue", strokeDasharray: "5,5" });

    plane.drawLabel([0, x1], "x₁", { fill: "blue", corner: "rightbottom", fontSize: 20 });
    plane.drawLabel([t1, 0], "t₁", { fill: "blue", corner: "righttop", fontSize: 20 });
}

renderKinematics1_8();
