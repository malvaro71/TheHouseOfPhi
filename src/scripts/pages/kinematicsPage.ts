// kinematicsPage.ts
// ======================================================
// Module for Kinematics Page
// ======================================================

import { CartesianPlane } from '../core/CartesianPlane.ts';
import { EuclideanSpace } from '../core/EuclideanSpace.ts';
import * as math from 'mathjs';
import type { Point2D, Point3D } from '../core/types.ts';

export const kinematicsDrawings = {
// ==============================================================================
// svg2_1 — Point P(x(t), y(t), z(t)) and its path
// ==============================================================================
    "svg2_2_1": (svg: SVGElement) => {
        // Configure SVG
        svg.setAttribute("viewBox", "0 0 400 400");
        svg.setAttribute("width", "400");
        svg.setAttribute("height", "400");

        // Create Euclidean space
        const space = new EuclideanSpace(svg, [0, 0, 0], 10);
        space.drawAxes();

        // Coordinates of point P and its projections
        const P: Point3D = [6, 9, 15];
        const x: Point3D = [6, 0, 0];
        const y: Point3D = [0, 9, 0];
        const z: Point3D = [0, 0, 15];

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
        const Points: Point3D[] = [
            [-1, -1, 8],
            [6, 9, 15],
            [5, 28, 18],
            [20, 25, 12]
        ];

        space.drawSmoothPath(Points, "green");
    }
};