
// form id="coordToMagDir" Calculate vector magnitude and direction from given coordinates and show it in a canvas.
{
	const canvas = document.getElementById("myCanvas");
	const ctx = canvas.getContext("2d");

	var p0 = { x: canvas.height / 2, y: canvas.height / 2 };
	var p2 = { x: 0, y: 0 };
	//set min and max input values
	document.getElementById("xCoordinate").min = -canvas.height / 2;
	document.getElementById("yCoordinate").min = -canvas.height / 2;
	document.getElementById("xCoordinate").max = canvas.height / 2;
	document.getElementById("yCoordinate").max = canvas.height / 2;
	//Call the function when some value is entered
	document.getElementById("xCoordinate").oninput = function () { updateMagnitudeAndDirection() };
	document.getElementById("yCoordinate").oninput = function () { updateMagnitudeAndDirection() };

	function openForm() {
		document.getElementById("coordToMagDir").style.display = "block";
	}
	
	function closeForm() {
		document.getElementById("coordToMagDir").style.display = "none";
	}

	function updateMagnitudeAndDirection() {
		const inpObj1 = document.getElementById("xCoordinate");
		const inpObj2 = document.getElementById("yCoordinate");
		p2.x = parseFloat(inpObj1.value) + canvas.height / 2;
		p2.y = -parseFloat(inpObj2.value) + canvas.height / 2;
		let mod = Math.sqrt((p2.x - p0.x) ** 2 + (p2.y - p0.y) ** 2);
		let thetaRad = Math.atan2(-p2.y + p0.y, p2.x - p0.x);
		let thetaDeg = thetaRad * 180 / Math.PI;
	
		if (!inpObj1.checkValidity()) {
			alert(inpObj1.validationMessage);
		} else {
			if (!inpObj2.checkValidity()) {
				alert(inpObj2.validationMessage);
			} else {
				//shows magnitude with two decimals
				document.getElementById("magnitude").innerHTML =
					Math.round((mod + Number.EPSILON) * 100) / 100;
				//shows direction with two decimals	
				document.getElementById("direction").innerHTML =
					Math.round((thetaDeg + Number.EPSILON) * 100) / 100;
				//draw the vector	
				drawSegmentWithArrowhead(p0, p2, 5);
			}
		}
	}

	function drawSegmentWithArrowhead(pa, pb, headLength) {
		// calc the angle of the line
		var dx = pb.x - pa.x;
		var dy = pb.y - pa.y;
		var angle = Math.atan2(dy, dx);
		//Define the style to use as "red", when drawing in the canvas context
		ctx.strokeStyle = "green";
		//Clean previous arrow
		ctx.clearRect(0, 0, canvas.height, canvas.height);
		//draw x and y axis
		ctx.beginPath();
		ctx.lineWidth = 0.3;
		ctx.moveTo(0, canvas.height / 2);
		ctx.lineTo(canvas.height, canvas.height / 2);
		ctx.moveTo(canvas.height / 2, 0);
		ctx.lineTo(canvas.height / 2, canvas.height);
		ctx.strokeStyle = "green";
		ctx.stroke();
		//Name the X and Y asis
		ctx.font = "10px Arial";
		ctx.fillStyle = "brown";
		ctx.fillText("X", canvas.height - 10, canvas.height / 2 - 4);
		ctx.fillText("Y", canvas.height / 2 - 10, 10);
		// draw the line from pa to pb
		ctx.beginPath();
		ctx.lineWidth = 2;
		ctx.moveTo(pa.x, pa.y);
		ctx.lineTo(pb.x, pb.y);
		// draw partial arrowhead at 220 degrees
		ctx.moveTo(pb.x, pb.y);
		ctx.lineTo(pb.x + headLength * Math.cos(angle + 220 * Math.PI / 180),
			pb.y + headLength * Math.sin(angle + 220 * Math.PI / 180));
		// draw partial arrowhead at 140 degrees
		ctx.moveTo(pb.x, pb.y);
		ctx.lineTo(pb.x + headLength * Math.cos(angle + 140 * Math.PI / 180),
			pb.y + headLength * Math.sin(angle + 140 * Math.PI / 180));
		// stroke the line and arrowhead
		ctx.strokeStyle = "green";
		ctx.stroke();
	}
}

// svg1_1. A vector is represented by a directed line segment from its initial point A to its terminal point B.
{
	// Get the SVG element from the DOM
	var svg1_1 = document.getElementById("svg1_1");

	// Set attributes
	svg1_1.setAttribute("viewBox", "0 0 180 220"); 
	svg1_1.setAttribute("width", "180"); 
	svg1_1.setAttribute("height", "220");

	// Add the marker to the SVG
	svg1_1.appendChild(brownMarker); 

	// Draws a vector using existing marker already created and added to this SVG:
	drawSegment(svg1_1, 24, 210, 150, 5, "brown", 2, "none", true);

	//Draws a text
	writeText(svg1_1, "A", 0, 205, 25, "brown", "brown", "bold", "leftbottom");
	writeText(svg1_1, "B", 160, 5, 25, "brown", "brown", "bold", "lefttop");
}

// svg1_2. Vector addition. Graphical method
{
	// Get the SVG element from the DOM
	var svg1_2 = document.getElementById("svg1_2");

	// Set attributes
	svg1_2.setAttribute("viewBox", "0 0 230 240"); 
	svg1_2.setAttribute("width", "230"); 
	svg1_2.setAttribute("height", "240");

	// Add the marker to the SVG
	svg1_2.appendChild(brownMarker); 
	svg1_2.appendChild(blueMarker); 
	svg1_2.appendChild(greenMarker); 

	// set a cartesian plane
	const myPlane1_2 = new CartesianPlane(svg1_2, 0, 23, 0, 24);

	// define two vectors and calculate its vector addition
	const pointA = [0, 0];
	const vectorA = [4, 12];
	const vectorB = [15, 6];
	const vectorAPlusB = add(vectorA, vectorB)

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
	const unitV = multiply(1/(norm(vectorV)), vectorV);
	const ProjectWonV = multiply(dot(vectorW, unitV), unitV);

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
	myPlane1_6.drawSegment(add(origin, vectorW), add(origin, ProjectWonV), {strokeColor: "green", strokeDasharray: "5,5"});
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
	let initialPoint = add(pointP,vectorR);
	mySpace1_8.drawVector(initialPoint, vectorV, "v", {strokeColor: "blue"}, {});
	
	// Calculate Moment of v about point p, being r the position vector of v from point p. m = rxv.
	const vectorM = cross(vectorR, vectorV);
	mySpace1_8.drawVector(pointP, vectorM, "m", {strokeColor: "green"}, {corner: "righttop"});
}

// svg1_9: Moment of a sliding vector v about a line l, m = proyl(rxv).
{
	// Get the SVG element from the DOM
	var svg1_9 = document.getElementById("svg1_9");

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
	let initialPoint = add(pointP,vectorR);
	mySpace1_9.drawVector(initialPoint, vectorV, "v", {strokeColor: "blue"}, {});
	
	// Calculate Moment of v about point p, being r the position vector of v from point p. m = rxv.
	const vectorM = cross(vectorR, vectorV);
	// Draw vector m.
	mySpace1_9.drawVector(pointP, vectorM, "M", {strokeColor: "green"}, {corner: "righttop"});
	// Drawy line l
	mySpace1_9.drawSegment(linel1, linel2, {strokeColor: "blue"});
	// Calculate proyection of m on l.
	const ProjectMonG = multiply(dot(vectorM, unitl), unitl);
	// Draw  proyection of m on l.
	mySpace1_9.drawVector(pointP, ProjectMonG, "M\u2097", {strokeColor: "green", strokeDasharray: "5,5"}, {corner: "leftbottom"});
	// Draw dashed line to ilustra the proyection of m on l.
	const dashed1 = add(pointP, vectorM);
	const dashed2 = add( pointP, ProjectMonG);
	mySpace1_9.drawSegment(dashed1, dashed2, {strokeColor: "green", strokeDasharray: "5,5"});
}

// svg2_1: showing coordinate-plane, Vr as the water velocity and V as the velocity with which the boat is propelled
{
	// Get the SVG element from the DOM
	var svg2_1 = document.getElementById("svg2_1");

	// Set attributes
	svg2_1.setAttribute("viewBox", "0 0 400 400"); 
	svg2_1.setAttribute("width", "400"); 
	svg2_1.setAttribute("height", "400");

	// set a cartesian plane wher the river bank is parallel to x-axis.
	const myPlane2_1 = new CartesianPlane(svg2_1, -23, 23, -6, 40);
	myPlane2_1.drawAxes("y-axis", "x-axis", "O");

	// Exercise data. 
	const vRiver = [9, 0]; // Water velocity; parallel to river bank; so parallel to x-axis.
	const vBoat = [0, 36]; // Speed of 36 km/h perpendicular to river bank; so parallel to y-axis.
	
	// Write exercise data
	myPlane2_1.drawLabel([7, 39], "Data:", {corner: "lefttop", fontSize: 15});
	myPlane2_1.drawLabel([7, 36], "Vr = <9, 0> Km/h", {corner: "lefttop", fontSize: 15});
	myPlane2_1.drawLabel([7, 33], "Vb = <0, 36> Km/h", {corner: "lefttop", fontSize: 15});
	// Boat velocity, vBoat, is the composition of water velocity, vRiver, and the Velocity with which the boat is propelled, vPropelled: vBoat = vRiver + vPropelled. So vPropelled = vBoat - vRiver. 
	const vPropelled = add(multiply(-1, vRiver), vBoat); // Velocity with which the boat is propelled.

	// Draw vectors
	const initialPoint = [0, 0]; // Vectors are drawn at the origin.
	
	// Create the text element
	const text = document.createElementNS("http://www.w3.org/2000/svg", "text");

	// Create the text node for 'V'
	const textNode = document.createTextNode("V");
	text.appendChild(textNode);

	// Create a separate tspan element for the subscript 'r'
	const subscriptSpan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
	const subscriptNode = document.createTextNode("r");
	subscriptSpan.appendChild(subscriptNode);

	// Apply the 'baseline-shift' attribute to the subscript tspan
	subscriptSpan.setAttribute("baseline-shift", "-0.3em");

	// Add the subscript tspan to the main text element
	text.appendChild(subscriptSpan);
	
	//writeText(svg2_1, text, 50, 50, 20, "brown", "brown");

	myPlane2_1.drawVector(initialPoint, vRiver, text, {strokeColor: "green"}, {corner: "righttop"});
	myPlane2_1.drawVector(initialPoint, vPropelled, "V", {strokeColor: "blue"}, {corner: "righttop"});
	myPlane2_1.drawSegment(vPropelled, multiply(-1, vRiver), {strokeColor: "green", strokeDasharray: "5,5"});
	myPlane2_1.drawVector(initialPoint, multiply(-1, vRiver), "Vx = -Vrx", {strokeColor: "green"}, {corner: "righttop"});
	myPlane2_1.drawSegment(vPropelled, vBoat, {strokeColor: "green", strokeDasharray: "5,5"});
	myPlane2_1.drawVector(initialPoint, vBoat, "Vy = Vby", {strokeColor: "green"}, {corner: "lefttop"});
	myPlane2_1.drawArc(initialPoint, vRiver, vPropelled, 3);
	myPlane2_1.drawLabel([3,3], "φ", {fill: "blue", corner: "leftbottom"}); // phi
	
	//Calculate and write solutions
	const normvPropelled = norm(vPropelled); // How fast should the boat be propelled?
	const phi = angleBetweenVectorsCCW(vRiver, vPropelled)*180/Math.PI; //In what direction?
	myPlane2_1.drawLabel([7, 30], "Solution:", {corner: "lefttop", fontSize: 15});
	myPlane2_1.drawLabel([7, 27], "φ = " + phi.toFixed(1).toString() + "º", {corner: "lefttop", fontSize: 15});
	myPlane2_1.drawLabel([7, 24], "|V| = " + normvPropelled.toFixed(1).toString() + " Km/h", {corner: "lefttop", fontSize: 15});
}

// svg2_2: sum of vectors a, b, c and d using the graphical method
{
	// Get the SVG element from the DOM
	var svg2_2 = document.getElementById("svg2_2");

	// Set attributes
	svg2_2.setAttribute("viewBox", "0 0 440 320"); 
	svg2_2.setAttribute("width", "440"); 
	svg2_2.setAttribute("height", "320");

	// set a cartesian plane wher the river bank is parallel to x-axis.
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

	// Exercise data
	const vectorA = [2, 3];
	const vectorB = [4, -2];
	const vectorC = [3, -2];
	const vectorD = [-9, 1];

	// Draw vectors
	let initialPoint = [0, 0];
	const vectorList = [vectorA, vectorB, vectorC, vectorD];
	const vectorNames = ["a", "b", "c", "d"];
	for(let v = 0; v < vectorList.length; v++){
		myPlane2_2.drawVector(initialPoint, vectorList[v], vectorNames[v], {}, {});
		initialPoint = add(initialPoint, vectorList[v]);
	}
} 