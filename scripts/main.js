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
			drawLineWithArrowhead(p0, p2, 5);
		}
	}
}

function drawLineWithArrowhead(pa, pb, headLength) {
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

// Function to create a marker element with given ID and fill color
function createMarker(id, fillColor) {
	var marker = document.createElementNS("http://www.w3.org/2000/svg", "marker");
	marker.setAttribute("id", id);
	marker.setAttribute("viewBox", "0 0 10 10");
	marker.setAttribute("refX", 10);
	marker.setAttribute("refY", 5);
	marker.setAttribute("markerWidth", 6);
	marker.setAttribute("markerHeight", 6);
	marker.setAttribute("orient", "auto-start-reverse");
  
	var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
	path.setAttribute("d", "M 0 0 L 10 5 L 0 10 z");
	path.setAttribute("stroke", fillColor);
	path.setAttribute("fill", fillColor);
  
	marker.appendChild(path);
	return marker;
}

//Function for drawing vectors in an SVG element using an existing marker created earlier
function drawVector(svgElement, x1, y1, x2, y2, strokeColor, strokeWidth, id) {
	// Create the line element with styling
	var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
	line.setAttribute("id", id);
	line.setAttribute("x1", x1);
	line.setAttribute("y1", y1);
	line.setAttribute("x2", x2);
	line.setAttribute("y2", y2);
	line.setAttribute("stroke", strokeColor);
	line.setAttribute("stroke-width", strokeWidth);
	switch(strokeColor) {
		case "brown":
			line.setAttribute("marker-end", "url(#Brownarrow)");
		  break;
		case "blue":
			line.setAttribute("marker-end", "url(#Bluearrow)");
		  break;
		case "green":
			line.setAttribute("marker-end", "url(#Greenarrow)");
		  break;
	  }
	// Append the vector element to the SVG
	svgElement.appendChild(line);
}

//Function to write text in an SVG element
function writeText(svgElement, text, x, y, fontSize, stroke, fill, fontWeight, id) {
	// Create a new text element
	var textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
	
	// Set the text content
	textElement.textContent = text; 

	// Set attributes for id, positioning and styling
	textElement.setAttribute("id", id);
	textElement.setAttribute("x", x);
	textElement.setAttribute("y", y);
	textElement.setAttribute("font-size", fontSize);
	textElement.setAttribute("stroke", stroke);
	textElement.setAttribute("fill", fill);
	textElement.setAttribute("font-weight", fontWeight);

	// Add the text element to the SVG
	svgElement.appendChild(textElement);
}

function writeVerticalText(svgElement, text, x, y, fontSize, stroke, fill) {
	// Create a group element for transformation
	var groupElement = document.createElementNS("http://www.w3.org/2000/svg", "g");
	groupElement.setAttribute("transform", "translate(" + x + "," + y + ")");
  
	// Create the text element
	var textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
	textElement.textContent = text;
  
	// Set attributes for styling and rotation
	textElement.setAttribute("transform", "rotate(-90)");
	textElement.setAttribute("text-anchor", "end"); //Positions the rightmost character (before rotate) at the specified baselin point.
	textElement.setAttribute("dominant-baseline", "text-after-edge"); //Aligns the bottommost edge of the last text box with the specified baseline point.
	textElement.setAttribute("font-size", fontSize);
	textElement.setAttribute("stroke", stroke);
	textElement.setAttribute("fill", fill);
  
	// Append the text element to the group
	groupElement.appendChild(textElement);
  
	// Append the group element to the SVG
	svgElement.appendChild(groupElement);
}

// Function for setting up a cartesian plane in an SVG element
function setUpCartesianPlane(svgElement, x0, y0, scale, yAxisText, xAxisText){

	// Get the width and height of the SVG element as strings
	var svgWidth = svgElement.getAttribute("width");
	var svgHeight = svgElement.getAttribute("height");

	// Convert strings to numbers
	svgWidth = parseFloat(svgWidth);
	svgHeight = parseFloat(svgHeight);

	// Set the position of the origin of coordinates. In this case at midle of the SVG element.
	var xOrigin = svgWidth*x0;
	var yOrigin = svgHeight*y0;

	// Set the scale; that is, the number of pixels that correspond to a unit of lenght in the plane.
	var planeScale = scale; 

	// y-axis
		drawVector(svgElement, xOrigin, svgWidth, xOrigin, 0, "brown", 2, "y-axis");
		writeVerticalText(svgElement, yAxisText, xOrigin, 0, 20, "brown", "brown");

	// x-axis
		drawVector(svgElement, 0, yOrigin, svgWidth, yOrigin, "brown", 2, "x-axis");
		// Create a new text element
		var textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");	
		// Set the text content
		textElement.textContent = xAxisText; 
		// Set attributes for positioning and styling
		//specify baseline point.
		textElement.setAttribute("x", svgWidth);
		textElement.setAttribute("y", yOrigin);
		//Positions the rightmost character at the specified baseline point.
		textElement.setAttribute("text-anchor", "end");
		//Aligns the topmost edge of the first text box with the specified baseline point.
		textElement.setAttribute("dominant-baseline", "text-before-edge"); 
		textElement.setAttribute("font-size", 20);
		textElement.setAttribute("stroke", "brown");
		textElement.setAttribute("fill", "brown");
		textElement.setAttribute("font-weight", "normal");
		// Add the text element to the SVG
		svgElement.appendChild(textElement);

	// Origin
		// Create a new text element
		var textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");	
		// Set the text content
		textElement.textContent = "O"; 
		// Set attributes for positioning and styling
		//specify baseline point.
		textElement.setAttribute("x", xOrigin);
		textElement.setAttribute("y", yOrigin);
		//Positions the rightmost character at the specified baselin point.
		textElement.setAttribute("text-anchor", "end");
		//Aligns the topmost edge of the first text box with the specified baseline point.
		textElement.setAttribute("dominant-baseline", "text-before-edge"); 
		textElement.setAttribute("font-size", 20);
		textElement.setAttribute("stroke", "brown");
		textElement.setAttribute("fill", "brown");
		textElement.setAttribute("font-weight", "normal");
		// Add the text element to the SVG
		svgElement.appendChild(textElement);

		// Return an array with planeScale, xOrigin and yOrigin
	return [planeScale, xOrigin, yOrigin];
}

function transformCoordinatesInCartesianPlane(coordinates, planeParameters) {
	// Check if coordinates is an array of length 2
	if (!Array.isArray(coordinates) || coordinates.length !== 2) {
	  throw new Error("Invalid coordinates: Expecting an array with x and y values.");
	}

	// Check if planeParameters is an array of length 3
	if (!Array.isArray(planeParameters) || planeParameters.length !== 3) {
		throw new Error("Invalid coordinates: Expecting an array with x0, y0 and scale values.");
	}
  
	// Destructure the coordinates array
	const [x, y] = coordinates;
	const[scale, xOffset, yOffset] = planeParameters;
  
	// Transform the x and y values
	const transformedX = xOffset + x * scale;
	const transformedY = yOffset - y * scale;
  
	// Return a new array with transformed coordinates
	return [transformedX, transformedY];
}

//Function for drawing lines in a cartesian plane already defined by an origin (x0, y0) and a scale, inside an SVG element.
function drawLineInCartesianPlane(svgElement, coordinates1, coordinates2, planeParameters, strokeColor, strokeWidth, strokeDasharray, id) {
	if (![coordinates1, coordinates2].every(arr => Array.isArray(arr) && arr.length === 2)) {
		throw new Error("Invalid coordinates: Expecting arrays with x and y values.");
	}

	// Check if planeParameters is an array of length 3
	if (!Array.isArray(planeParameters) || planeParameters.length !== 3) {
		throw new Error("Invalid coordinates: Expecting an array with x0, y0 and scale values.");
	}

	// Transform points coordinates to draw it in the SVG element and destructure the coordinates array
	const transformedCoordinates1 = transformCoordinatesInCartesianPlane(coordinates1, planeParameters);
	const [xPosition1, yPosition1] = transformedCoordinates1;
	const transformedCoordinates2 = transformCoordinatesInCartesianPlane(coordinates2, planeParameters);
	const [xPosition2, yPosition2] = transformedCoordinates2;

	// Create the line element with styling
	var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
	line.setAttribute("id", id);
	line.setAttribute("x1", xPosition1);
	line.setAttribute("y1", yPosition1);
	line.setAttribute("x2", xPosition2);
	line.setAttribute("y2", yPosition2);
	line.setAttribute("stroke", strokeColor);
	line.setAttribute("stroke-width", strokeWidth);
	line.setAttribute("stroke-dasharray", strokeDasharray);
	
	// Append the line element to the SVG
	svgElement.appendChild(line);
}

//Function for drawing points in a cartesian plane already defined by an origin (x0, y0) and a scale, inside an SVG element.
function drawPointInCartesianPlane(svgElement, coordinates, planeParameters, color) {
	// Check if coordinates is an array of length 2
	if (!Array.isArray(coordinates) || coordinates.length !== 2) {
		throw new Error("Invalid coordinates: Expecting an array with x and y values.");
	}

	// Check if planeParameters is an array of length 3
	if (!Array.isArray(planeParameters) || planeParameters.length !== 3) {
		throw new Error("Invalid coordinates: Expecting an array with x0, y0 and scale values.");
	}

	// Transform point coordinates to draw it in the SVG element and destructure the coordinates array
	const transformedCoordinates = transformCoordinatesInCartesianPlane(coordinates, planeParameters);
	const [xPosition, yPosition] = transformedCoordinates;

	// Create a new circle element
	var circleElement = document.createElementNS("http://www.w3.org/2000/svg", "circle");

	// Set attributes for the circle
	circleElement.setAttribute("cx", xPosition);
	circleElement.setAttribute("cy", yPosition);
	circleElement.setAttribute("r", 3);
	circleElement.setAttribute("stroke", color);
	circleElement.setAttribute("fill", color);

	// Append the circle element to the SVG
	svgElement.appendChild(circleElement);
}

/*
function convert3DTo2D(x1, y1, z1) {
	
	//This program Convert from 3D coordinates to 2D oblique projection coordinates for and svg drawing. 
	//Reference: https://en.wikipedia.org/wiki/Oblique_projection
	//3D z-coordinate is parallel to svg Canva y-coordinate but has opposite orientation.
   	//3D y-coordinate is parallel to svg Canva x-coordinate and have same orientation. 
   	//3D x-axis is skewed 45 degrees and is oriented toward the svg Canva.
	

	// SVG viewport size
	const svgWidth = 400;
	const svgHeight = 400;
  
	// Conversion factors based on oblique angle
	const skewedAngle = Math.PI * 45 / 180;
	const cosAngle = Math.cos(skewedAngle);
	const sinAngle = Math.sin(skewedAngle);
  
	// SVG canvas origin coordinates (0, 0, 0) (considering flipped z-axis)
	const Ox = svgWidth * sinAngle / 2;
	const Oy = svgHeight * (1 - cosAngle) / 2;
  
	// Calculate 2D coordinates
	const x2 = Ox + y1 - x1 * cosAngle;
	const y2 = Oy - z1 + x1 * cosAngle;
  
	return { x: x2, y: y2 };
  }
*/

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


// Define global markers
var brownMarker = createMarker("Brownarrow", "brown");
var blueMarker = createMarker("Bluearrow", "blue");
var greenMarker = createMarker("Greenarrow", "green");

// svg1_1. A vector is represented by a directed line segment from its initial point A to its terminal point B.
	// Get the SVG element from the DOM
	var svg1_1 = document.getElementById("svg1_1");

	// Add the marker to the SVG
	svg1_1.appendChild(brownMarker); 

	// Draws a vector using existing marker already created and added to this SVG:
	drawVector(svg1_1, 24, 210, 150, 5, "brown", 2, "Vector1");

	//Draws a text
	writeText(svg1_1, "A", 0, 205, 25, "brown", "brown", "bold", "PointA");
	writeText(svg1_1, "B", 160, 25, 25, "brown", "brown", "bold", "PointB");

// svg1_2. Vector addition. Graphical method
	// Get the SVG element from the DOM
	var svg1_2 = document.getElementById("svg1_2");

	// Add the marker to the SVG
	svg1_2.appendChild(brownMarker); 
	svg1_2.appendChild(blueMarker); 
	svg1_2.appendChild(greenMarker); 

	// Vector a
	drawVector(svg1_2, 80, 230, 20, 120, "brown", 2, "vectorA");
	writeText(svg1_2, "a", 30, 180, 25, "brown", "brown", "bold", "labelA1");

	// Vector b
	drawVector(svg1_2, 20, 120, 160, 10, "blue", 2, "vectorB");
	writeText(svg1_2, "b", 70, 65, 25, "blue", "blue", "bold", "labelB1");

	// Vector a+b
	drawVector(svg1_2, 80, 230, 160, 10, "green", 2, "vectorA+B");
	writeText(svg1_2, "a+b", 130, 129, 25, "green", "green", "bold", "labelA+B");

	// Vector b at the other side of the paralelogram
	drawVector(svg1_2, 80, 230, 220, 120, "blue", 2, "vectorB2");
	writeText(svg1_2, "b", 170, 180, 25, "blue", "blue", "bold", "labelB2");

	// Vector a at the other side of the paralelogram
	drawVector(svg1_2, 220, 120, 160, 10, "brown", 2, "vectorA2");
	writeText(svg1_2, "a", 195, 65, 25, "brown", "brown", "bold", "labelA2");

// svg1_3. Cartesian plane and cartesian coordinates of a point.
	// Get the SVG element from the DOM
	var svg1_3 = document.getElementById("svg1_3");

	/*
	// Get the width and height of the SVG element as strings
	var svgWidth = svg1_3.getAttribute("width");
	var svgHeight = svg1_3.getAttribute("height");

	// Convert strings to numbers
	svgWidth = parseFloat(svgWidth);
	svgHeight = parseFloat(svgHeight);

	// Set the position of the origin of coordinates. In this case at midle of the SVG element.
	var xOrigin = svgWidth/2;
	var yOrigin = svgHeight/2;

	// Set the scale; that is, the number of pixels that correspond to a unit of lenght in the plane.
	var planeScale = 10 
	
	// y-axis
		drawVector(svg1_3, xOrigin, svgWidth, xOrigin, 0, "brown", 2, "y-axis");
		writeVerticalText(svg1_3, "y-axis", xOrigin, 0, 20, "brown", "brown");

	// x-axis
		drawVector(svg1_3, 0, yOrigin, svgWidth, yOrigin, "brown", 2, "x-axis");
		// Create a new text element
		var textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");	
		// Set the text content
		textElement.textContent = "x-axis"; 
		// Set attributes for positioning and styling
		//specify baseline point.
		textElement.setAttribute("x", svgWidth);
		textElement.setAttribute("y", yOrigin);
		//Positions the rightmost character at the specified baselin point.
		textElement.setAttribute("text-anchor", "end");
		//Aligns the topmost edge of the first text box with the specified baseline point.
		textElement.setAttribute("dominant-baseline", "text-before-edge"); 
		textElement.setAttribute("font-size", 20);
		textElement.setAttribute("stroke", "brown");
		textElement.setAttribute("fill", "brown");
		textElement.setAttribute("font-weight", "normal");
		// Add the text element to the SVG
		svg1_3.appendChild(textElement);

	// Origin
		// Create a new text element
		var textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");	
		// Set the text content
		textElement.textContent = "O"; 
		// Set attributes for positioning and styling
		//specify baseline point.
		textElement.setAttribute("x", xOrigin);
		textElement.setAttribute("y", yOrigin);
		//Positions the rightmost character at the specified baselin point.
		textElement.setAttribute("text-anchor", "end");
		//Aligns the topmost edge of the first text box with the specified baseline point.
		textElement.setAttribute("dominant-baseline", "text-before-edge"); 
		textElement.setAttribute("font-size", 20);
		textElement.setAttribute("stroke", "brown");
		textElement.setAttribute("fill", "brown");
		textElement.setAttribute("font-weight", "normal");
		// Add the text element to the SVG
		svg1_3.appendChild(textElement);
	*/
	
	const CartesianPlaneParameters = setUpCartesianPlane(svg1_3, 0.5, 0.5, 10, "y-axis", "x-axis");
	
	// Point (5, 10)
		//drawPointInCartesianPlane(svg1_3, [5, 10], planeScale, xOrigin, yOrigin, "green");
		drawPointInCartesianPlane(svg1_3, [5, 10], CartesianPlaneParameters, "green");

	// Dashed lines to mark Point coordinates in x-asis and y-asis
  		//drawLineInCartesianPlane(svg1_3, [5, 0], [5, 10], planeScale, xOrigin, yOrigin, "green", 1, "5,5", "DashedLine1");
		//drawLineInCartesianPlane(svg1_3, [0, 10], [5, 10], planeScale, xOrigin, yOrigin, "green", 1, "5,5", "DashedLine1");
		drawLineInCartesianPlane(svg1_3, [5, 0], [5, 10], CartesianPlaneParameters, "green", 1, "5,5", "DashedLine1");
		drawLineInCartesianPlane(svg1_3, [0, 10], [5, 10], CartesianPlaneParameters, "green", 1, "5,5", "DashedLine1");