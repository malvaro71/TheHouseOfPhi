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
	//Positions the rightmost character (before rotate) at the specified baselin point.
	textElement.setAttribute("text-anchor", "end"); 
	//Aligns the bottommost edge of the last text box with the specified baseline point.
	textElement.setAttribute("dominant-baseline", "text-after-edge");

	textElement.setAttribute("font-size", fontSize);
	textElement.setAttribute("stroke", stroke);
	textElement.setAttribute("fill", fill);
  
	// Append the text element to the group
	groupElement.appendChild(textElement);
  
	// Append the group element to the SVG
	svgElement.appendChild(groupElement);
}

class CartesianPlane {
    constructor(svgElement, xMin, xMax, yMin, yMax) {

        // Define the svg element where the cartesian plane will be represented
		this.svgElement = svgElement;

		// Validate minimum and maximum values
		if (xMin > xMax) {
			throw new Error("Invalid plane dimensions: xMin cannot be greater than xMax.");
		}
		if (yMin > yMax) {
			throw new Error("Invalid plane dimensions: xMin cannot be greater than xMax.");
		}

		// Define the cartesian plane coordinates range to be displayed in the svg element.
		this.xMin = xMin;
  		this.yMin = yMin;
  		this.xMax = xMax;
  		this.yMax = yMax;

		// Get the width and height of the SVG element as strings
		const svgWidth = this.svgElement.getAttribute("width");
		const svgHeight = this.svgElement.getAttribute("height");

		// Convert strings to numbers
		this.svgWidthNum = parseFloat(svgWidth);
		this.svgHeightNum = parseFloat(svgHeight);
	  
		// Set the position of the origin of coordinates.
		this.OriginX = this.svgWidthNum * (-xMin / (xMax - xMin));
		this.OriginY = this.svgHeightNum * (-yMin / (yMax - yMin));
	  
		// Set the scale; that is, the number of pixels that correspond to a unit of length in the plane.
		this.planeScaleX = this.svgWidthNum / (xMax - xMin);
		this.planeScaleY = this.svgHeightNum / (yMax - yMin);
    }
	
	// Draw x and y axes in cartesian plane.
    drawAxes(yAxisText, xAxisText, originText) {
       
		// y-axis
			this.drawVector([0, this.yMin], [0, this.yMax], "brown", 2, "y-axis");
			writeVerticalText(this.svgElement, yAxisText, this.OriginX - 5, 0, 20, "brown", "brown");
			//this.drawLabel([0-0.6, this.yMax], "y", 20, "brown", "brown", "normal", "rigthtop", "y-axis");

		// x-axis
			this.drawVector([this.xMin, 0], [this.xMax, 0], "brown", 2, "x-axis");
			//this.drawLabel([this.xMax, 0], "x", 20, "brown", "brown", "normal", "rigthtop", "x-axis");
			
			// Create a new text element
			const xAxisTextElement = document.createElementNS("http://www.w3.org/2000/svg", "text");	
			// Set the text content
			xAxisTextElement.textContent = xAxisText; 
			// Set attributes for positioning (specify baseline point).
			xAxisTextElement.setAttribute("x", this.svgHeightNum);
			xAxisTextElement.setAttribute("y", this.OriginY + 5);
			//Positions the rightmost character at the specified baseline point.
			xAxisTextElement.setAttribute("text-anchor", "end");
			//Aligns the topmost edge of the first text box with the specified baseline point.
			xAxisTextElement.setAttribute("dominant-baseline", "text-before-edge"); 
			// Set attributes for styling.
			xAxisTextElement.setAttribute("font-size", 20);
			xAxisTextElement.setAttribute("stroke", "brown");
			xAxisTextElement.setAttribute("fill", "brown");
			xAxisTextElement.setAttribute("font-weight", "normal");
			// Add the text element to the SVG.
			this.svgElement.appendChild(xAxisTextElement);

		// Origin.
			this.drawLabel([0-0.2, 0], originText, 20, "brown", "brown", "normal", "rigthtop", "origin");
    }

	// Transform cartesian plane coordinates in svg element coordinates
    transformCoordinates(coordinates) {
        // Check if coordinates is an array of length 2.
		if (!Array.isArray(coordinates) || coordinates.length !== 2) {
			throw new Error("Invalid coordinates: Expecting an array with x and y values.");
		}
		
		// Destructure the coordinates array.
		const [x, y] = coordinates;
		
		// Transform the x and y values
		const transformedX = this.OriginX + x * this.planeScaleX;
		const transformedY = this.OriginY - y * this.planeScaleY;
		
		// Return a new array with transformed coordinates
		return [transformedX, transformedY];
    }

	//Draw a line in the cartesian plane
    drawLine(coordinates1, coordinates2, strokeColor, strokeWidth, strokeDasharray, id) {
		
		// Check if coordinates1 and coordinates2 are arrays of length 2.
		if (![coordinates1, coordinates2].every(arr => Array.isArray(arr) && arr.length === 2)) {
			throw new Error("Invalid coordinates: Expecting arrays with x and y values.");
		}
	
		// Transform points coordinates to draw it in the SVG element and destructure the coordinates array
		const [xPosition1, yPosition1] = this.transformCoordinates(coordinates1);
		const [xPosition2, yPosition2] = this.transformCoordinates(coordinates2);
	
		// Create the line element with styling
		const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		line.setAttribute("id", id);
		line.setAttribute("x1", xPosition1);
		line.setAttribute("y1", yPosition1);
		line.setAttribute("x2", xPosition2);
		line.setAttribute("y2", yPosition2);
		line.setAttribute("stroke", strokeColor);
		line.setAttribute("stroke-width", strokeWidth);
		line.setAttribute("stroke-dasharray", strokeDasharray);
		
		// Append the line element to the SVG
		this.svgElement.appendChild(line);
    }

	//Draw a point in the cartesian plane
    drawPoint(coordinates, color, id) {
    
		// Check if coordinates is an array of length 2.
		if (!Array.isArray(coordinates) || coordinates.length !== 2) {
			throw new Error("Invalid coordinates: Expecting an array with x and y values.");
		}

		// Transform point coordinates to draw it in the SVG element and destructure the coordinates array.
		const [xPosition, yPosition] = this.transformCoordinates(coordinates);

		// Create a new circle element.
		const circleElement = document.createElementNS("http://www.w3.org/2000/svg", "circle");

		// Set attributes for the circle.
		circleElement.setAttribute("id", id);
		circleElement.setAttribute("cx", xPosition);
		circleElement.setAttribute("cy", yPosition);
		circleElement.setAttribute("r", 3);
		circleElement.setAttribute("stroke", color);
		circleElement.setAttribute("fill", color);

		// Append the circle element to the SVG.
		this.svgElement.appendChild(circleElement);
    }

	// Draw a vector in the cartesian plane using an existing marker created earlier (only for brown, blue or green colors)
	drawVector(coordinates1, coordinates2, strokeColor, strokeWidth, id) {
		
		// Check if coordinates1 and coordinates2 are arrays of length 2.
		if (![coordinates1, coordinates2].every(arr => Array.isArray(arr) && arr.length === 2)) {
			throw new Error("Invalid coordinates: Expecting arrays with x and y values.");
		}

		// Transform points coordinates to draw it in the SVG element and destructure the coordinates array
		const [xPosition1, yPosition1] = this.transformCoordinates(coordinates1);
		const [xPosition2, yPosition2] = this.transformCoordinates(coordinates2);
		
		// Create the line element with styling and add the marker of colors brown, blue or green.
		const vector = document.createElementNS("http://www.w3.org/2000/svg", "line");
		vector.setAttribute("id", id);
		vector.setAttribute("x1", xPosition1);
		vector.setAttribute("y1", yPosition1);
		vector.setAttribute("x2", xPosition2);
		vector.setAttribute("y2", yPosition2);
		vector.setAttribute("stroke", strokeColor);
		vector.setAttribute("stroke-width", strokeWidth);
		switch(strokeColor) {
			case "brown":
				vector.setAttribute("marker-end", "url(#Brownarrow)");
			break;
			case "blue":
				vector.setAttribute("marker-end", "url(#Bluearrow)");
			break;
			case "green":
				vector.setAttribute("marker-end", "url(#Greenarrow)");
			break;
		}
		// Append the vector element to the SVG
		this.svgElement.appendChild(vector);
	}
	
	// Draw the label of an element giving coordinates of a baseline point, a text, styling options and wich corner of text is aligned with the baseline point.
	drawLabel(baselinePoint, text, fontSize, stroke, fill, fontWeight, corner, id) {
		
		// Check if coordinates is an array of length 2.
		if (!Array.isArray(baselinePoint) || baselinePoint.length !== 2) {
			throw new Error("Invalid coordinates: Expecting an array with x and y values.");
		}

		// Transform point coordinates to draw it in the SVG element and destructure the coordinates array.
		const [xPosition, yPosition] = this.transformCoordinates(baselinePoint);
		
		// Create a new text element.
		const textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");

		// Set the text content.
		textElement.textContent = text;

		// Handles different corner values to position the text element.
		switch(corner) {
			case "rigthtop":
				// Positions the rightmost character at the specified baseline point.
				textElement.setAttribute("text-anchor", "end");
				// Aligns the topmost edge of the first text box with the specified baseline point.
				textElement.setAttribute("dominant-baseline", "text-before-edge");
			break;
			case "rigthbottom":
				// Positions the rightmost character at the specified baseline point.
				textElement.setAttribute("text-anchor", "end");
				// Aligns the bottommost edge of the last text box with the specified baseline point.
				textElement.setAttribute("dominant-baseline", "text-after-edge");
			break;
			case "lefttop":
				// Positions the leftmost character at the specified x-coordinate.
				textElement.setAttribute("text-anchor", "start");
				// Aligns the topmost edge of the first text box with the specified baseline point.
				textElement.setAttribute("dominant-baseline", "text-before-edge");
			break;
			case "leftbottom":
				// Positions the leftmost character at the specified x-coordinate.
				textElement.setAttribute("text-anchor", "start");
				// Aligns the bottommost edge of the last text box with the specified baseline point.
				textElement.setAttribute("dominant-baseline", "text-after-edge");
			break;
			default:
				throw new Error("Invalid value for corner input: Expecting ´rigthtop´, ´rigthbottom´, ´lefttop´ or ´leftbottom´.");
			break;
		} 

		// Set attributes for id, positioning and styling
		textElement.setAttribute("id", id);
		textElement.setAttribute("x", xPosition);
		textElement.setAttribute("y", yPosition);
		
		// Set attributes for id styling
		textElement.setAttribute("font-size", fontSize);
		textElement.setAttribute("stroke", stroke);
		textElement.setAttribute("fill", fill);
		textElement.setAttribute("font-weight", fontWeight);

		// Add the text element to the SVG
		this.svgElement.appendChild(textElement);
	}
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

	// Vector 'a'
	drawVector(svg1_2, 80, 230, 20, 120, "brown", 2, "vectorA");
	writeText(svg1_2, "a", 30, 180, 25, "brown", "brown", "bold", "labelA1");

	// Vector 'b'
	drawVector(svg1_2, 20, 120, 160, 10, "blue", 2, "vectorB");
	writeText(svg1_2, "b", 70, 65, 25, "blue", "blue", "bold", "labelB1");

	// Vector 'a+b'
	drawVector(svg1_2, 80, 230, 160, 10, "green", 2, "vectorA+B");
	writeText(svg1_2, "a+b", 130, 129, 25, "green", "green", "bold", "labelA+B");

	// Vector 'b' at the other side of the paralelogram
	drawVector(svg1_2, 80, 230, 220, 120, "blue", 2, "vectorB2");
	writeText(svg1_2, "b", 170, 180, 25, "blue", "blue", "bold", "labelB2");

	// Vector 'a' at the other side of the paralelogram
	drawVector(svg1_2, 220, 120, 160, 10, "brown", 2, "vectorA2");
	writeText(svg1_2, "a", 195, 65, 25, "brown", "brown", "bold", "labelA2");

// svg1_3. Cartesian plane and cartesian coordinates of a point.
	// Get the SVG element from the DOM
	var svg1_3 = document.getElementById("svg1_3");

	// Example usage:
	const myPlane = new CartesianPlane(svg1_3, -20, 20, -20, 20);
	myPlane.drawAxes("y-axis", "x-axis", "O");
	myPlane.drawPoint([5, 10], "green", "PointP");
  	myPlane.drawLine([5, 0], [5, 10], "green", 1, "5,5", "DashedLine1");
	myPlane.drawLine([0, 10], [5, 10], "green", 1, "5,5", "DashedLine2");
  	
	// Write point coordinates
	const textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");

	// Set attributes for the text element
	textElement.setAttribute("x", 260);
	textElement.setAttribute("y", 100);
	textElement.setAttribute("font-size", "20");
	textElement.setAttribute("stroke", "green");
	textElement.setAttribute("fill", "green");
	textElement.setAttribute("stroke-width", "0.6");
	textElement.textContent = "P (x";

	// Create child elements for styled text sections
	const x1Element = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
	const commaElement = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
	const y1Element = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
	const closingParenElement = document.createElementNS("http://www.w3.org/2000/svg", "tspan");

	// Set attributes for child elements
	x1Element.setAttribute("dx", "-1");
	x1Element.setAttribute("dy", "6");
	x1Element.setAttribute("font-size", "12");
	x1Element.setAttribute("stroke-width", "0.3");
	x1Element.textContent = "1";
	commaElement.setAttribute("dx", "-1");
	commaElement.setAttribute("dy", "-6");
	commaElement.setAttribute("font-size", "20");
	commaElement.setAttribute("stroke-width", "0.6");
	commaElement.textContent = ", y";
	y1Element.setAttribute("dx", "-1");
	y1Element.setAttribute("dy", "6");
	y1Element.setAttribute("font-size", "12");
	y1Element.setAttribute("stroke-width", "0.3");
	y1Element.textContent = "1";
	closingParenElement.setAttribute("dx", "-1");
	closingParenElement.setAttribute("dy", "-6");
	closingParenElement.setAttribute("font-size", "20");
	closingParenElement.setAttribute("stroke-width", "0.6");
	closingParenElement.textContent = ")";

	// Append child elements to the text element
	textElement.appendChild(x1Element);
	textElement.appendChild(commaElement);
	textElement.appendChild(y1Element);
	textElement.appendChild(closingParenElement);

	// Append the text element to the SVG
	svg1_3.appendChild(textElement);	