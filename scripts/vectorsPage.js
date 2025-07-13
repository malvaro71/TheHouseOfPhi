
// Importaciones
import { createMarkerArrow,
    textWithSubscript,
    renderMathExpression
} from './SVGDrawing.js';

// Import the CartesianPlane class
import CartesianPlane from './CartesianPlane.js';

// Import the EuclideanSpace class
import EuclideanSpace from './EuclideanSpace.js';

// Import the math library 
// import * as math from 'mathjs'; lo dejamos en paso hasta que integremos mathjs en el proyecto.
// Cuando lo integremos, recordar añadir node_modules/ al archivo .gitignore en la raíz del proyecto.


// svg1_1. A vector is represented by a directed line segment from its initial point A to its terminal point B.
{
    // Get the SVG element from the DOM
    const svg1_1 = document.getElementById("svg1_1");

    //Create arrow markers
    const brownMarker = createMarkerArrow("Brownarrow", "brown");
    const blueMarker = createMarkerArrow("Bluearrow", "blue");
    const greenMarker = createMarkerArrow("Greenarrow", "green");

    // Add the marker to the SVG
    svg1_1.appendChild(brownMarker);
    svg1_1.appendChild(blueMarker); 
    svg1_1.appendChild(greenMarker);

    // Set attributes
    svg1_1.setAttribute("viewBox", "0 0 180 220"); 
    svg1_1.setAttribute("width", "180"); 
    svg1_1.setAttribute("height", "220");

    // set a cartesian plane
    const myPlane1_1 = new CartesianPlane(svg1_1, -3, 25, 0, 25);

    // Define two points A and B
    const pointA = [0, 0];
    const pointB = [20, 20];

    // Draws a vector from point A to point B
    myPlane1_1.drawVector(pointA, pointB, "", {}, {});
    
    //Draw labels for points A and B
    myPlane1_1.drawLabel(pointA, "A", {fill: "brown", fontSize: 20});
    myPlane1_1.drawLabel(pointB, "B", {fill: "brown", fontSize: 20, corner: "lefttop"});
}

// svg1_2. Vector addition. Graphical method
{
    // Get the SVG element from the DOM
    const svg1_2 = document.getElementById("svg1_2");

    // Set attributes
    svg1_2.setAttribute("viewBox", "0 0 230 240"); 
    svg1_2.setAttribute("width", "230"); 
    svg1_2.setAttribute("height", "240");

    //Create arrow markers
    //const brownMarker = createMarkerArrow("Brownarrow", "brown");
    //const blueMarker = createMarkerArrow("Bluearrow", "blue");
    //const greenMarker = createMarkerArrow("Greenarrow", "green");

    // Add the marker to the SVG
    //svg1_2.appendChild(brownMarker); 
    //svg1_2.appendChild(blueMarker); 
    //svg1_2.appendChild(greenMarker); 

    // set a cartesian plane
    const myPlane1_2 = new CartesianPlane(svg1_2, 0, 23, 0, 24);

    // define two vectors and calculate its vector addition
    const pointA = [0, 0];
    const vectorA = [4, 12];
    const vectorB = [15, 6];
    const vectorAPlusB = math.add(vectorA, vectorB);

    // draw vectos a, b and a+b
    myPlane1_2.drawVector(pointA, vectorA, "a", {strokeColor: "green"}, {fontSize: 22, fill: "green"});
    
    myPlane1_2.drawVector(vectorA, vectorB, "b", {strokeColor: "blue"}, {fontSize: 22, fill: "blue"});
    
    myPlane1_2.drawVector(pointA, vectorAPlusB, "a+b", {strokeColor: "brown"}, {fontSize: 22, corner: "lefttop"});
    
    myPlane1_2.drawVector(pointA, vectorB, "b", {strokeColor: "blue"}, {fontSize: 22, fill: "blue"});

    myPlane1_2.drawVector(vectorB, vectorA, "a", { strokeColor: "green"}, {fontSize: 22, fill: "green"});
}
    
// svg1_3. Cartesian plane and cartesian coordinates of a point.
{
    // Get the SVG element from the DOM
    var svg1_3 = document.getElementById("svg1_3");

    // Set attributes
    svg1_3.setAttribute("viewBox", "0 0 400 400"); 
    svg1_3.setAttribute("width", "400"); 
    svg1_3.setAttribute("height", "400");

    // set a cartesian plane
    const myPlane1_3 = new CartesianPlane(svg1_3, -20, 20, -20, 20);
    myPlane1_3.drawAxes("y-axis", "x-axis", "O");
    
    // Draw a point, its label and two segments
    myPlane1_3.drawPoint([5, 10], "green");
    myPlane1_3.drawLabel([6, 10], "P(x\u2081, y\u2081)", {fill: "green", fontSize: 20, corner: "leftbottom"});
    myPlane1_3.drawSegment([5, 0], [5, 10], {strokeColor: "green", strokeDasharray: "5,5", strokeWidth: 1});
    myPlane1_3.drawSegment([0, 10], [5, 10], {strokeColor: "green", strokeDasharray: "5,5", strokeWidth: 1});
}

// svg1.5 point P, with coordinates (x1, y1, z1)
{
    // Get the SVG element from the DOM
    var svg1_5 = document.getElementById("svg1_5");

    // Set attributes
    svg1_5.setAttribute("viewBox", "0 0 400 400"); 
    svg1_5.setAttribute("width", "400"); 
    svg1_5.setAttribute("height", "400");

    // set a euclidean space
    const mySpace1_5 = new EuclideanSpace(svg1_5, [0, 0, 0], 10);
    mySpace1_5.drawAxes();

    // Draw a point
    mySpace1_5.drawPoint([6, 9, 15], "green");
    
    // Draw dashed lines to ilustrate the point coordinates on each axis x, y and z.
    mySpace1_5.drawSegment([6, 0, 0], [6, 9, 0], {strokeColor: "green", strokeDasharray: "5,5"});
    mySpace1_5.drawSegment([6, 9, 0], [6, 9, 15], {strokeColor: "green", strokeDasharray: "5,5"});
    mySpace1_5.drawSegment([0, 9, 0], [6, 9, 0], {strokeColor: "green", strokeDasharray: "5,5"});
    mySpace1_5.drawSegment([0, 9, 0], [0, 9, 15], {strokeColor: "green", strokeDasharray: "5,5"});
    mySpace1_5.drawSegment([0, 9, 15], [6, 9, 15], {strokeColor: "green", strokeDasharray: "5,5"});
    mySpace1_5.drawSegment([0, 0, 15], [0, 9, 15], {strokeColor: "green", strokeDasharray: "5,5"});
    mySpace1_5.drawSegment([0, 0, 15], [6, 0, 15], {strokeColor: "green", strokeDasharray: "5,5"});
    mySpace1_5.drawSegment([6, 0, 15], [6, 9, 15], {strokeColor: "green", strokeDasharray: "5,5"});
    mySpace1_5.drawSegment([6, 0, 0], [6, 0, 15], {strokeColor: "green", strokeDasharray: "5,5"});

    // Labels x1, y1, z1 and P(x1, y1, z1)
    mySpace1_5.drawLabel([6, -0.1, 0], "x\u2081", {fill: "green", fontSize: 20});
    mySpace1_5.drawLabel([0, 9.1, 0.1], "y\u2081", {fill: "green", fontSize: 20, corner: "leftbottom"});
    mySpace1_5.drawLabel([0, -0.1, 15], "z\u2081", {fill: "green", fontSize: 20});
    mySpace1_5.drawLabel([6, 10, 16], "P(x\u2081, y\u2081, z\u2081)", {fill: "green", corner: "lefttop"});
}
    
// svg1.6: Projection of `vecW` onto `vecv`
{
	// Get the SVG element from the DOM
	var svg1_6 = document.getElementById("svg1_6");

	// Set attributes
	svg1_6.setAttribute("viewBox", "0 0 300 210"); 
	svg1_6.setAttribute("width", "300"); 
	svg1_6.setAttribute("height", "210");

	// set a cartesian plane
	const myPlane1_6 = new CartesianPlane(svg1_6, 0, 30, 0, 21);

	// set some coordinates
	const origin = [2, 2];
	const vectorW = [14, 12];
	const vectorV = [19, 0];
	
	// Calculate vector proyection
	const unitV = math.multiply(1/(math.norm(vectorV)), vectorV);
	const ProjectWonV = math.multiply(math.dot(vectorW, unitV), unitV);

	// draw vectors
	myPlane1_6.drawVector(origin, vectorW, "w", {strokeColor: "green"}, {fontSize: 22, fill: "green"});
	myPlane1_6.drawVector(origin, vectorV);
	myPlane1_6.drawLabel([19, 2], "v", {fontSize: 18});
	myPlane1_6.drawVector(origin, ProjectWonV,"", {strokeColor: "green", strokeDasharray: "5,5"});
	myPlane1_6.drawLabel([14, 2], "Proj\u1D65w", {fontSize: 18, fill: "green"});
	

	// Draw angle
	myPlane1_6.drawArc(origin, vectorV, vectorW, 4);
	myPlane1_6.drawLabel([7, 3], "θ", {fontSize: 16, fill: "blue"}); // theta

	// Draw segment
	myPlane1_6.drawSegment(math.add(origin, vectorW), math.add(origin, ProjectWonV), {strokeColor: "green", strokeDasharray: "5,5"});
}

// svg1_8: Moment of a sliding vector v about point P, m = rxv.
{
	// Get the SVG element from the DOM
	var svg1_8 = document.getElementById("svg1_8");

	// Set attributes 
	svg1_8.setAttribute("viewBox", "0 0 400 400"); 
	svg1_8.setAttribute("width", "400"); 
	svg1_8.setAttribute("height", "410");

	// set a euclidean space
	const mySpace1_8 = new EuclideanSpace(svg1_8, [0, 0, 0], 10);
	mySpace1_8.drawAxes();

	// set drawing elements coordinates
	const pointP = [16, 9, 2];
	const vectorR = [0, 6, 2];
	const vectorV = [-5, -1, 0];
	
	// Draw a point P, vector r, vector v
	mySpace1_8.drawPoint(pointP, "green");
	mySpace1_8.drawVector(pointP, vectorR, "r", {strokeColor: "blue"}, {});
	let initialPoint = math.add(pointP,vectorR);
	mySpace1_8.drawVector(initialPoint, vectorV, "v", {strokeColor: "blue"}, {});
	
	// Calculate Moment of v about point p, being r the position vector of v from point p. m = rxv.
	const vectorM = math.cross(vectorR, vectorV);
	mySpace1_8.drawVector(pointP, vectorM, "m", {strokeColor: "green"}, {corner: "righttop"});
}

// svg1_9: Moment of a sliding vector v about a line l, m = proyl(rxv).
{
	// Get the SVG element from the DOM
	const svg1_9 = document.getElementById("svg1_9");

	// Set attributes 
	svg1_9.setAttribute("viewBox", "0 0 400 400"); 
	svg1_9.setAttribute("width", "400"); 
	svg1_9.setAttribute("height", "410");

	// set a euclidean space
	const mySpace1_9 = new EuclideanSpace(svg1_9, [0, 0, 0], 10);
	mySpace1_9.drawAxes();

	// set drawing elements coordinates
	const pointP = [16, 9, 2];
	const vectorR = [0, 6, 2];
	const vectorV = [-5, -1, 0];
	const unitl = [0, 0, 1]; // Line l is parallel to z-axis
	const linel1 = [16, 9, -2]; // points to draw a segment representing line l
	const linel2 = [16, 9, 40];

	// Draw a point P, vector r, vector v
	mySpace1_9.drawPoint(pointP, "green");
	mySpace1_9.drawVector(pointP, vectorR, "r", {strokeColor: "blue"}, {});
	let initialPoint = math.add(pointP,vectorR);
	mySpace1_9.drawVector(initialPoint, vectorV, "v", {strokeColor: "blue"}, {});
	
	// Calculate Moment of v about point p, being r the position vector of v from point p. m = rxv.
	const vectorM = math.cross(vectorR, vectorV);
	// Draw vector m.
	mySpace1_9.drawVector(pointP, vectorM, "M", {strokeColor: "green"}, {corner: "righttop"});
	// Drawy line l
	mySpace1_9.drawSegment(linel1, linel2, {strokeColor: "blue"});
	// Calculate proyection of m on l.
	const ProjectMonG = math.multiply(math.dot(vectorM, unitl), unitl);
	// Draw  proyection of m on l.
	mySpace1_9.drawVector(pointP, ProjectMonG, "M\u2097", {strokeColor: "green", strokeDasharray: "5,5"}, {corner: "leftbottom"});
	// Draw dashed line to ilustra the proyection of m on l.
	const dashed1 = math.add(pointP, vectorM);
	const dashed2 = math.add( pointP, ProjectMonG);
	mySpace1_9.drawSegment(dashed1, dashed2, {strokeColor: "green", strokeDasharray: "5,5"});
}

/**
 * Writes a value to an element's innerHTML.
 *
 * If the value is an array, joins its elements with commas and spaces.
 * Otherwise, sets the innerHTML to the value directly.
 *
 * @param {string} elementId - The ID of the element to update.
 * @param {Array|string|number} value - The value to write to the element.
 */
function writeValue(elementId, value) {
    const element = document.getElementById(elementId);
    if (Array.isArray(value)) {
    element.innerHTML = value.join(", "); // Join elements for arrays
    } else {
    element.innerHTML = value; // Set single value directly
    }
};

// Exercise 2_1
{
    // Exercise enunciate
    /*A boatman is rowing on the boat, wanting to always stay perpendicular to the river bank and crossing with an average speed of 36 km / h. The river water flows with a speed of 9 km / h. How fast should the boat be propelled? In what direction?*/

    // Exercise data. 
    const vRiver = [9, 0]; // Water velocity; parallel to river bank; so parallel to x-axis.
    const vBoat = [0, 36]; // Speed of 36 km/h perpendicular to river bank; so parallel to y-axis.

    // Boat velocity, vBoat, is the composition of water velocity, vRiver, and the Velocity with which the boat is propelled by the boatman, vPropelled => vBoat = vRiver + vPropelled. So,vPropelled = vBoat - vRiver. 
    const vPropelled = math.subtract(vBoat, vRiver); 

    //Calculate the solutions
    const normvPropelled = math.norm(vPropelled); // How fast should the boat be propelled?
    // From the dot product, see [1.13] 
    const phi = math.acos(math.dot(vRiver, vPropelled)/(math.norm(vRiver)*normvPropelled))*180/math.PI;

    
    //Write exercise values in HTML elements
    writeValue("2_1avgSpeed", vBoat[1]);
    writeValue("2_1riverSpeed", vRiver[0]);
    writeValue("2_1vBoat", vBoat);
    writeValue("2_1vRiver", vRiver);
    writeValue("2_1vBoat1", vBoat);
    writeValue("2_1vRiver1", vRiver);
    writeValue("2_1vPropelled", vPropelled);
    writeValue("2_1normvPropelled", normvPropelled.toFixed(1));
    writeValue("2_1phi1", phi.toFixed(1));
    writeValue("2_1normvPropelled1", normvPropelled.toFixed(1));
    writeValue("2_1phi2", phi.toFixed(1));


    // Get the SVG element from the DOM
    const svg2_1 = document.getElementById("svg2_1");

    // Set attributes
    svg2_1.setAttribute("viewBox", "0 0 400 400"); 
    svg2_1.setAttribute("width", "400"); 
    svg2_1.setAttribute("height", "400");

    // set a cartesian plane where the river bank is parallel to x-axis.
    const myPlane2_1 = new CartesianPlane(svg2_1, -23, 23, -6, 40);
    myPlane2_1.drawAxes("y-axis", "x-axis", "O");

    // Write exercise data
    myPlane2_1.drawLabel([7, 39], "Data:", {corner: "lefttop", fontSize: 15});
    myPlane2_1.drawLabel([7, 36], "Vr = <9, 0> Km/h", {corner: "lefttop", fontSize: 15});
    myPlane2_1.drawLabel([7, 33], "Vb = <0, 36> Km/h", {corner: "lefttop", fontSize: 15});


    // Set a common initial point for the vectors at the origin of coordinates 
    const initialPoint = [0, 0];

    // Draw Vr
    const Vr = textWithSubscript("V", "r");
    myPlane2_1.drawVector(initialPoint, vRiver, Vr, {strokeColor: "green"}, {corner: "righttop"});

    // Draw Vp
    const Vp = textWithSubscript("V", "p");
    myPlane2_1.drawVector(initialPoint, vPropelled, Vp, {strokeColor: "blue"}, {corner: "righttop"});

    // Draw V components
    myPlane2_1.drawSegment(vPropelled, math.multiply(-1, vRiver), {strokeColor: "green", strokeDasharray: "5,5"});
    myPlane2_1.drawVector(initialPoint, math.multiply(-1, vRiver), "Vx = -Vrx", {strokeColor: "green"}, {corner: "righttop"});
    myPlane2_1.drawSegment(vPropelled, vBoat, {strokeColor: "green", strokeDasharray: "5,5"});
    myPlane2_1.drawVector(initialPoint, vBoat, "Vy = Vby", {strokeColor: "green"}, {corner: "lefttop"});
    myPlane2_1.drawArc(initialPoint, vRiver, vPropelled, 3);
    myPlane2_1.drawLabel([3,3], "φ", {fill: "blue", corner: "leftbottom"}); // phi

    // Write the solutions
    myPlane2_1.drawLabel([7, 30], "Solution:", {corner: "lefttop", fontSize: 15});
    myPlane2_1.drawLabel([7, 27], "φ = " + phi.toFixed(1).toString() + "º", {corner: "lefttop", fontSize: 15});
    myPlane2_1.drawLabel([7, 24], "|Vp| = " + normvPropelled.toFixed(1).toString() + " Km/h", {corner: "lefttop", fontSize: 15});
}

// Exercise 2_2: sum of vectors a, b, c and d using the graphical method
{
    // Exercise data
	const vectorA = [2, 3];
	const vectorB = [4, -2];
	const vectorC = [3, -2];
	const vectorD = [-9, 1];

	// Get the SVG element from the DOM
	var svg2_2 = document.getElementById("svg2_2");

	// Set attributes
	svg2_2.setAttribute("viewBox", "0 0 440 320"); 
	svg2_2.setAttribute("width", "440"); 
	svg2_2.setAttribute("height", "320");

	// set a cartesian plane to represent the vectors.
	const xMin = -1;
	const xMax = 10;
	const yMin = -3;
	const yMax = 5;
	const myPlane2_2 = new CartesianPlane(svg2_2, xMin, xMax, yMin, yMax);
	myPlane2_2.drawAxes("y-axis", "x-axis", "O");

	// Draw horizontal and vertical lines to better show plane coordinates
    for (let x = xMin; x <= xMax; x++) {
        myPlane2_2.drawSegment([x, yMin], [x, yMax], {strokeColor: "green", strokeDasharray: "5,5", strokeWidth: 1});
    }
	for (let y = yMin; y <= yMax; y++) {
        myPlane2_2.drawSegment([xMin, y], [xMax, y], {strokeColor: "green", strokeDasharray: "5,5", strokeWidth: 1});
    }

	// Draw vectors
	let initialPoint = [0, 0];
	const vectorList = [vectorA, vectorB, vectorC, vectorD];
	const vectorNames = ["a", "b", "c", "d"];
	for(let v = 0; v < vectorList.length; v++){
		myPlane2_2.drawVector(initialPoint, vectorList[v], vectorNames[v], {}, {});
		initialPoint = math.add(initialPoint, vectorList[v]);
	}
} 

// Exercise 2_3:  NNE direction, velocity V and its components Vx and Vy
{
	// Exercise enunciate
    /*A sailboat is moving with a speed of 4 km/h in the NNE (north-northeast) direction. What are the components of the speed of the ship in the North direction and in the East direction? */
    
    // Exercise data
    const sailboatSpeed = 4; //Km/h
    const NNE = Math.PI*3/8 //radians

    // Calculate sailboat velocity components 
	const sailboatSpeedX = sailboatSpeed*Math.cos(NNE);
	const sailboatSpeedY = sailboatSpeed*Math.sin(NNE);
	const sailboatVelocity = [sailboatSpeedX, sailboatSpeedY];

    //Write exercise values in HTML elements
    writeValue("2_3sailboatSpeed", sailboatSpeed);
    writeValue("2_3Vx", sailboatSpeedX.toFixed(2));
    writeValue("2_3Vy", sailboatSpeedY.toFixed(2));

    /* Draw a representation of the exercise */
    // Get the SVG element from the DOM
	var svg2_3 = document.getElementById("svg2_3");

	// Set attributes
	svg2_3.setAttribute("viewBox", "0 0 400 400"); 
	svg2_3.setAttribute("width", "400"); 
	svg2_3.setAttribute("height", "400");

	// set a cartesian plane
	const xMin = -5;
	const xMax = 5;
	const yMin = -5;
	const yMax = 5;
	const myPlane2_3 = new CartesianPlane(svg2_3, xMin, xMax, yMin, yMax);
	myPlane2_3.drawAxes("", "E", "O");
	myPlane2_3.drawLabel([-0.3, yMax], "N", {corner: "righttop"});
	
	// Draw NE and NNE arrows
	const origin = [0, 0];
	const NNEextreme = [xMax*Math.cos(NNE), yMax*Math.sin(NNE)];
	myPlane2_3.drawVector(origin, NNEextreme);
	myPlane2_3.drawLabel(NNEextreme, "NNE", {corner: "lefttop"});

	
    // Draw sailboat velocity
	myPlane2_3.drawVector(origin, sailboatVelocity, "V", {strokeColor: "green"});
	
	//Draw dashed lines
	myPlane2_3.drawSegment([sailboatSpeedX, 0], [sailboatSpeedX, sailboatSpeedY], {strokeColor: "blue", strokeDasharray: "5, 5"});
	myPlane2_3.drawSegment([0, sailboatSpeedY], [sailboatSpeedX, sailboatSpeedY], {strokeColor: "blue", strokeDasharray: "5, 5"});

	// Draw Vx vector
	const Vx = textWithSubscript("V", "x");
	myPlane2_3.drawVector(origin, [sailboatSpeedX, 0], Vx, {strokeColor: "green"}, {corner: "lefttop"});

	// Draw Vy vector
	const Vy = textWithSubscript("V", "y");
	myPlane2_3.drawVector(origin, [0, sailboatSpeedY], Vy, {strokeColor: "green"}, {corner: "rightbottom"});

	// Draw angle between Vx and V
	myPlane2_3.drawArc(origin, [sailboatSpeedX, 0], sailboatVelocity, 0.5);
	myPlane2_3.drawLabel([0.5*Math.cos(Math.PI*3/16), 0.5*Math.sin(Math.PI*3/16)], "θ=67.5º", {stroke: "blue", corner: "leftbottom", fontSize: 16, fontWeight: "lighter"});
}

// Exercise 2_4
{
    // Exercise enunciate
    /*An object moves in such a way that its speed at a certain instant is 120 m/s and forms an angle of 30º with the horizontal. Find the horizontal and vertical components of the velocity. Express the velocity vector as a function of its components.*/

    // Exercise data
    const speed = 120; //m/s
    const orientationDeg = 30 //degrees
    const orientationRad = Math.PI*orientationDeg/180 //radians

    // Calculate velocity components 
	const Vx = speed*Math.cos(orientationRad); // Horizontal component
	const Vy = speed*Math.sin(orientationRad); // Vertical component

    //Write exercise values in HTML elements
    writeValue("2_4Speed1", speed);
    writeValue("2_4orientation1", orientationDeg);
    writeValue("2_4Speed2", speed);
    writeValue("2_4orientation2", orientationDeg);
    writeValue("2_4Vx1", Vx.toFixed(1));
    writeValue("2_4Vy1", Vy.toFixed(1));
    writeValue("2_4Vx2", Vx.toFixed(1));
    writeValue("2_4Vy2", Vy.toFixed(1));
}

// Exercise 2_5
{
    // Exercise enunciate
    /* Find the scalar product of the vectors v = (5, - 3, 2) and w = (-2, 1, 3), and the angle they form. */

    // Exercise data
	const v = [5, -3, 2];
	const w = [-2, 1, 3];

    // Calculate scalar product
    const scalarProduct = math.dot(v, w);

    // Calculate angle
    const cosAng = scalarProduct / (math.norm(v) * math.norm(w));
    const angleRad = math.acos(cosAng);
    const angleDeg = angleRad * 180 / math.PI;

    //Write exercise values in HTML elements
    writeValue("2_5escProd1", scalarProduct);
    writeValue("2_5angle1", angleDeg.toFixed(2));
}

// Execise 2_6: showing angle between E and NE and `proj_Evecv`
{
	// Exercise enunciate
    /* An airplane is moving with a speed of 600 km/h in the NE direction. Find the projection of its velocity onto the east direction.*/
    
    // Exercise data
	const planeSpeed = 600; //Km/h.
	const angleNERad = Math.PI/4; // Radians. 45º=PI/4 radians.
    const angleNEDeg = angleNERad * 180 / math.PI;

	// Calculate airplane velocity, V
	const V = [planeSpeed*Math.cos(angleNERad), planeSpeed*Math.sin(angleNERad)];

	// Calculate `proj_Evecv`
	const projEV =  math.multiply(planeSpeed*Math.cos(angleNERad), [1, 0]);

    // Calculate |proj_Evecv|
    const normProjEV = math.norm(projEV);

    //Write exercise values in HTML elements
    writeValue("2_6speed1", planeSpeed);
    writeValue("2_6angle1", angleNEDeg.toFixed(0));
    writeValue("2_6speed2", planeSpeed);
    writeValue("2_6angle2", angleNEDeg.toFixed(0));
    writeValue("2_6projection", normProjEV.toFixed(0));

	// Get the SVG element from the DOM
	var svg2_6 = document.getElementById("svg2_6");

	// Set attributes
	svg2_6.setAttribute("viewBox", "0 0 400 400"); 
	svg2_6.setAttribute("width", "400"); 
	svg2_6.setAttribute("height", "400");

	// set a cartesian plane
	const xMin = -700;
	const xMax = 700;
	const yMin = -700;
	const yMax = 700;
	const myPlane2_6 = new CartesianPlane(svg2_6, xMin, xMax, yMin, yMax);
	myPlane2_6.drawAxes("", "E", "O");
	myPlane2_6.drawLabel([-15, yMax], "N", {corner: "righttop"});
	
	// Draw NE arrow
	const origin = [0, 0];
	const NE = [xMax*Math.cos(angleNERad), yMax*Math.sin(angleNERad)];
	myPlane2_6.drawVector(origin, NE);
	myPlane2_6.drawLabel(NE, "NE", {corner: "lefttop"});

	// Draw V vector
	myPlane2_6.drawVector(origin, V, "V", {strokeColor: "green"}, {corner: "lefttop"});

	// Draw `proj_Evecv`
	const projEVText = textWithSubscript("proj", "E");
	const textNode = document.createTextNode("V");
    projEVText.appendChild(textNode);
	myPlane2_6.drawVector(origin, projEV, projEVText, {strokeColor: "green"}, {corner: "lefttop"});

	//Draw dashed line
	myPlane2_6.drawSegment(projEV, V, {strokeColor: "blue", strokeDasharray: "5, 5"});

	// Draw angle
	myPlane2_6.drawArc(origin, projEV, V, 100);
	myPlane2_6.drawLabel([120*Math.cos(Math.PI*3/16), 120*Math.sin(Math.PI*3/16)], "θ=45º", {stroke: "blue", corner: "lefttop", fontSize: 16, fontWeight: "lighter"});
}

// Execise 2_7
{
    // Exercise enunciate
    /* A rigid body rotates with an angular velocity w given by the vector (1, 1, 1) rad/s. Calculate the linear velocity v with which a point P of the body moves, whose position vector is (2, -2, 1) m., knowing that v = w x r */

    // Exercise data
    const w = [1, 1, 1] // rad/s.
    const r = [2, -2, 1] // m.

    // Calculate the cross product
    //const v = math.cross(w, r);

    //Write exercise values in HTML elements
    //writeValue("2_7v", v);

    // Get the HTML element where the expression will be rendered
    const div271 = document.getElementById("2_7_1");
    // Get the HTML element where the result will be displayed
	const div272 = document.getElementById("2_7_2");

    // The expression is the cross product of vectors w and r
    // Using JSON.stringify to ensure the vectors are properly formatted
    // This will create a string representation of the cross product expression
    const expr = `cross(${JSON.stringify(w)}, ${JSON.stringify(r)})`;

    // Render the expression using Math.js in the HTML element
	renderMathExpression(div271, expr);

	// Evaluate and display the result
	const result = math.evaluate(expr);
	div272.textContent = math.format(result); // Use textContent for plain text output
}

// Exercise 2_8
{
    // Exercise enunciate
    /* Calculate the area of a triangle /_\ABC, where the Cartesian coordinates of the vertices are, A = (3,4,1) m., B = (1,-2,2) m. and C = (-2,1,4) m.*/

    // Exercise data
    const A = [3, 4, 1] // m.
    const B = [1, -2, 2] // m.
    const C = [-2, 1, 4] // m.

    // Calculate vectors AB and AC
    const AB = math.subtract(B, A);
	const AC = math.subtract(C, A);
    const area = math.norm(math.cross(AB, AC))/2; // m^2.

    //Write exercise values in HTML elements
    writeValue("2_8A", A);
    writeValue("2_8B", B);
    writeValue("2_8C", C);
    writeValue("2_8AB", AB);
    writeValue("2_8AC", AC);
    writeValue("2_8area", area.toFixed(2));

    // Get the SVG element from the DOM
	const svg2_8 = document.getElementById("svg2_8");

	// Set attributes 
	svg2_8.setAttribute("viewBox", "0 0 400 400"); 
	svg2_8.setAttribute("width", "400"); 
	svg2_8.setAttribute("height", "410");

	// set a euclidean space
	const mySpace2_8 = new EuclideanSpace(svg2_8, [0, 0, 0], 30);
	mySpace2_8.drawAxes();

	// set other drawing elements coordinates
    const BplusAC = math.add(B, AC);

	// Draw points A, B and C and label them
	mySpace2_8.drawPoint(A, "green");
    mySpace2_8.drawLabel(A, "A", {corner: "righttop"});
    mySpace2_8.drawPoint(B, "green");
    mySpace2_8.drawLabel(B, "B", {corner: "righttop"});
    mySpace2_8.drawPoint(C, "green");
    mySpace2_8.drawLabel(C, "C", {corner: "leftbottom"});

    // Draw vectors AB and AC, and segment BC
	mySpace2_8.drawVector(A, AB, "AB", {strokeColor: "green"}, {corner: "righttop"});
    mySpace2_8.drawVector(A, AC, "AC", {strokeColor: "green"}, {corner: "leftbottom"});
    mySpace2_8.drawSegment(B, C, {strokeColor: "green"});

    // Draw te other two sides of the paralelogram that vectors AB and AC span
    mySpace2_8.drawSegment(B, BplusAC, {strokeColor: "blue", strokeDasharray: "5,5"});
    mySpace2_8.drawSegment(C, BplusAC, {strokeColor: "blue", strokeDasharray: "5,5"});
}