// Importaciones
import { ensureSharedMarkerDefs
} from './SVGDrawing.js';

// Import the CartesianPlane class
import CartesianPlane from './CartesianPlane.js';

// Ensure shared marker definitions are present once for the whole document
ensureSharedMarkerDefs();
// Markers are provided globally via the hidden shared <defs>; no need to
// append them into any additional SVG.

// svgA1_1_1. Cartesian plane and cartesian coordinates of a point.
{
    // Get the SVG element from the DOM
    var svgA1_1_1 = document.getElementById("svgA1_1_1");

    // set a cartesian plane
    const myPlaneA1_1_1 = new CartesianPlane(svgA1_1_1, -3, 15, -3, 15);

    // Draw triangle segments
    //myPlaneA1_1_1.drawPoint([5, 8], "green");
    //myPlaneA1_1_1.drawLabel([6, 8], "P(x\u2081, y\u2081)", {fill: "green", fontSize: 20, corner: "leftbottom"});
    myPlaneA1_1_1.drawSegment([0, 0],  [6, 12], {strokeColor: "brown", strokeWidth: 1});
    myPlaneA1_1_1.drawSegment([6, 12], [14, 4], {strokeColor: "brown", strokeWidth: 1});
    myPlaneA1_1_1.drawSegment([14, 4], [0, 0], {strokeColor: "brown", strokeWidth: 1});
    // Draw triangle vertices
    myPlaneA1_1_1.drawLabel([0, 0],   "A", {fill: "brown", fontSize: 20, corner: "righttop"});
    myPlaneA1_1_1.drawLabel([6, 12],  "B", {fill: "brown", fontSize: 20, corner: "leftbottom"});
    myPlaneA1_1_1.drawLabel([14, 4], "C", {fill: "brown", fontSize: 20, corner: "lefttop"});
    // Calculate midpoints for side labels
    const midAB = [(0 + 6) / 2, (0 + 12) / 2];
    const midBC = [(6 + 14) / 2, (12 + 4) / 2];
    const midCA = [(14 + 0) / 2, (4 + 0) / 2];
    // Draw side labels
    myPlaneA1_1_1.drawLabel(midAB, "c", {fill: "blue", fontSize: 20, corner: "rightbottom"});
    myPlaneA1_1_1.drawLabel(midBC, "a", {fill: "blue", fontSize: 20, corner: "leftbottom"});
    myPlaneA1_1_1.drawLabel(midCA, "b", {fill: "blue", fontSize: 20, corner: "leftbottom"});
    // Draw angle arcs and labels
    myPlaneA1_1_1.drawArc([0, 0], midCA, midAB, 2, {strokeColor: "red", strokeWidth: 1});
    myPlaneA1_1_1.drawLabel([1.6, 2.7], "\u03B1", {fill: "green", fontSize: 20, corner: "lefttop"});
    myPlaneA1_1_1.drawArc([6, 12], math.multiply(-1, midAB), math.subtract(midBC, [6, 12]), 2, {strokeColor: "red", strokeWidth: 1});
    myPlaneA1_1_1.drawLabel([6.8, 10], "\u03B2", {fill: "green", fontSize: 20, corner: "righttop"});
    myPlaneA1_1_1.drawArc([14, 4], math.subtract(midBC, [14, 4]), math.multiply(-1, midCA), 2, {strokeColor: "red", strokeWidth: 1});
    myPlaneA1_1_1.drawLabel([11.9, 4.5], "\u03B3", {fill: "green", fontSize: 20, corner: "rightbottom"});
}

// svgA1_X. Cartesian plane and cartesian coordinates of a point.
{
    // Get the SVG element from the DOM
    var svgA1_X = document.getElementById("svgA1_X");

    // set a cartesian plane
    const myPlaneA1_X = new CartesianPlane(svgA1_X, -10, 11, -10, 10);
    myPlaneA1_X.drawAxes("y-axis", "x-axis", "O");
    
    // Draw a point, its label and two segments
    myPlaneA1_X.drawPoint([5, 8], "green");
    myPlaneA1_X.drawLabel([6, 8], "P(x\u2081, y\u2081)", {fill: "green", fontSize: 20, corner: "leftbottom"});
    myPlaneA1_X.drawSegment([5, 0], [5, 8], {strokeColor: "green", strokeDasharray: "5,5", strokeWidth: 1});
    myPlaneA1_X.drawSegment([0, 8], [5, 8], {strokeColor: "green", strokeDasharray: "5,5", strokeWidth: 1});
}