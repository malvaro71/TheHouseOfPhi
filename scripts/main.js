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

/*
// Define Point class, that can handle both 2D (Cartesian plane) and 3D (Euclidean space) points by accepting arrays of length 2 or 3, respectively.
class Point {
	constructor(orthogonalParam) {
		if (!Array.isArray(orthogonalParam) || (orthogonalParam.length !== 2 && orthogonalParam.length !== 3)) {
			throw new Error("Invalid coordinates: Expecting an array with length 2 (2D) or 3 (3D).");
		}
		this.orthogonalCoord = orthogonalParam;
	}
}*/

//Define Vector class to use standard-position vectors; with where only 


/*
// Define Point class, that can handle both 2D (Cartesian plane) and 3D (Euclidean space) points by accepting arrays of length 2 or 3, respectively. Point coordinates can be provided for an orthogonal coordinates system or for a polar-spherical coordinates system. But, only one of the two set of components can be given (orthogonal parameter or spherical parameter) when a new point object is created.
class Point {
	constructor({ orthogonalParam, sphericalParam = null } = {}) {
	
		// Check if only one property is provided
		const numParameters = (orthogonalParam ? 1 : 0) + (sphericalParam ? 1 : 0);
		if (numParameters == 1) {
			if (orthogonalParam) {
				if (Array.isArray(orthogonalParam)) {
					switch (orthogonalParam.length) {
						case 2:
							this.orthogonalCoord = orthogonalParam;
							const [x2D, y2D] = this.orthogonalCoord;
							// Initialize sphericalCoord property as an empty array
							this.sphericalCoord = []; 
							// Calculate radial coordinate (distance from origin)
							this.sphericalCoord[0] = Math.sqrt(Math.pow(x2D, 2) + Math.pow(y2D, 2));
						
							// Calculate theta coordinate (counter-clockwise angle from x-axis in xy-plane). 
							this.sphericalCoord[1] = Math.atan2(y2D, x2D) + (Math.PI * (y2D < 0 ? 2 : 0));   // To ensure that theta is between 0 and 2PI.
						break;
						case 3:
							this.orthogonalCoord = orthogonalParam;
							const [x3D, y3D, z3D] = this.orthogonalCoord;
							// Initialize sphericalCoord property as an empty array
							this.sphericalCoord = [];
							// Calculate radial coordinate (distance from origin)
							this.sphericalCoord[0] = Math.sqrt(Math.pow(x3D, 2) + Math.pow(y3D, 2) + Math.pow(z3D, 2));
						
							// Calculate theta coordinate (counter-clockwise angle from x-axis in xy-plane). 
							this.sphericalCoord[1] = Math.atan2(y3D, x3D) + (Math.PI * (y3D < 0 ? 2 : 0));   // To ensure that theta is between 0 and 2PI.
							
							// Calculate phi coordinate (from the positive z-axis, between 0 an PI)
							this.sphericalCoord[2] = Math.acos(z3D / this.sphericalCoord[0]); // phi is between 0 and PI.	
						break;
						default:
							throw new Error("Invalid coordinates: Expecting an array with length 2 (2D) or 3 (3D).");
					}
				} else {
					throw new Error("Invalid coordinates: Expecting an array.");
				}	
			} else {
				if (Array.isArray(sphericalParam)){
					switch(sphericalParam.length){
						case 2:
							this.sphericalCoord = sphericalParam;
							const [r2D, theta2D] = this.sphericalCoord;  
							// Initialize orthogonalCoord property as an empty array
							this.orthogonalCoord = [];
							// Calculate x
							this.orthogonalCoord[0] =  r2D * Math.cos(theta2D);
							// Calculate y
							this.orthogonalCoord[1] =  r2D * Math.sin(theta2D);
						break;
						case 3:
							this.sphericalCoord = sphericalParam;
							const [r3D, theta3D, phi3D] = this.sphericalCoord;
							// Initialize orthogonalCoord property as an empty array
							this.orthogonalCoord = [];
							// Calculate x
							this.orthogonalCoord[0] =  r3D * Math.cos(theta3D) * Math.sin(phi3D);
							// Calculate y
							this.orthogonalCoord[1] =  r3D * Math.sin(theta3D) * Math.sin(phi3D);
							// Calculate z coordinate.
							this.orthogonalCoord[2] = r3D * Math.cos(phi3D); // phi is between 0 and PI.
						break;
						default:
							throw new Error("Invalid coordinates: Expecting an array with length 2 (2D) or 3 (3D).");
					}
				} else {
					throw new Error("Invalid coordinates: Expecting an array.");
				}
			}	
		} else {
			throw new Error("Invalid input: Provide either Ortogonal coordinates or Polar-spherical coordinates; not both or none.");
		}
	}
}*/

// Returns the addition of two arrays
function addArrays(array1, array2) {
	const sumArray = [];
  
	array1.forEach((element, index) => {
	  sumArray.push(element + array2[index]); // Access array2 from the function argument
	});
  
	return sumArray; // Return the resulting array
  }

// Define class CartesianPlane, to manage the graphical representation of a Cartesian Plane in an SVG element.
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
		this.OriginY = this.svgHeightNum *(1- (-yMin / (yMax - yMin)));
	  
		// Set the scale; that is, the number of pixels that correspond to a unit of length in the plane.
		this.planeScaleX = this.svgWidthNum / (xMax - xMin);
		this.planeScaleY = this.svgHeightNum / (yMax - yMin);
    }
	
	// Draw x and y axes in cartesian plane.
    drawAxes(yAxisText, xAxisText, originText) {
       
		// y-axis
			const planeHeight = this.yMax - this.yMin;
			this.drawVector([0, this.yMin], [0, planeHeight]);
			writeVerticalText(this.svgElement, yAxisText, this.OriginX - 5, 0, 20, "brown", "brown");
			//this.drawLabel([0-0.6, this.yMax], "y", 20, "brown", "brown", "normal", "rigthtop", "y-axis");

		// x-axis
			const planeWidht = this.xMax - this.xMin;
			this.drawVector([this.xMin, 0], [planeWidht, 0]);
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
			this.drawLabel([0-0.2, 0], "O", {
				corner: "rigthtop",
				fontSize: 22,
				fill: "brown" 
			});
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

	//Draw a segment in the cartesian plane
    drawSegment(coordinates1, coordinates2, strokeColor, strokeWidth, strokeDasharray, id) {
		
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
	/*
	//Draw a point in the cartesian plane
    drawPoint(point, color, id) {
		
		// Check if point is an instance of the Point class
		if (!(point instanceof Point)) {
			throw new Error("Invalid input: Expecting a Point object.");
		  }
		
		// Access coordinates from the valid Point object
		const coordinates = point.orthogonalCoord;
		
		// Transform point coordinates to draw it in the SVG element (no need to destructure)
		const transformedCoordinates = this.transformCoordinates(coordinates);

		// Create a new circle element.
		const circleElement = document.createElementNS("http://www.w3.org/2000/svg", "circle");

		// Set attributes for the circle.
		circleElement.setAttribute("id", id);
		circleElement.setAttribute("cx", transformedCoordinates[0]);
		circleElement.setAttribute("cy", transformedCoordinates[1]);
		circleElement.setAttribute("r", 3);
		circleElement.setAttribute("stroke", color);
		circleElement.setAttribute("fill", color);

		// Append the circle element to the SVG.
		this.svgElement.appendChild(circleElement);
    }*/

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
	drawVector(initialPoint, vectorComponents, {
		label = "", // Default label text
		corner = "rigthbottom", // Default corner text placement
		fontSize = 12, // Default font size
		stroke = "none", // Default stroke color (no stroke)
		fill = "brown",  // Default text fill color
		fontWeight = "normal", // Default font weight
		strokeColor = "brown", 
		strokeWidth = 2
	} = {}) {
		
		// Check if coordinates1 and coordinates2 are arrays of length 2.
		if (![initialPoint, vectorComponents].every(arr => Array.isArray(arr) && arr.length === 2)) {
			throw new Error("Invalid coordinates: Expecting arrays with x and y values.");
		}

		//Calculate vector endpoint using initial point and vector components.
		const endPoint = addArrays(initialPoint, vectorComponents);

		// Transform points coordinates to draw it in the SVG element and destructure the coordinates array
		const [initialXTransformed, initialYTransformed] = this.transformCoordinates(initialPoint);
		const [endXTransformed, endYTransformed] = this.transformCoordinates(endPoint);
		
		// Create the line element with styling and add the marker of colors brown, blue or green.
		const vector = document.createElementNS("http://www.w3.org/2000/svg", "line");
		//vector.setAttribute("id", id);
		vector.setAttribute("x1", initialXTransformed);
		vector.setAttribute("y1", initialYTransformed);
		vector.setAttribute("x2", endXTransformed);
		vector.setAttribute("y2", endYTransformed);
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
			default:
				throw new Error("Invalid value for vector color: Expecting ´brown´, ´blue´ or ´green´.");
		}
		// Append the vector element to the SVG
		this.svgElement.appendChild(vector);
		
		// Draw label if defined
		if (label != "") {
			const half = vectorComponents.map(element => element / 2);
			const position = addArrays(initialPoint, half);
			this.drawLabel(position, label, {
				corner: corner,
				fontSize: fontSize,
				stroke: stroke,
				fill: fill,
				fontWeight: fontWeight
			});
		}
	}
	
	// Draw the label of an element giving coordinates of a baseline point, the label text, 
	// the corner parameter: "rigthtop", "rigthbottom", "lefttop" or "leftbottom"
	// and define some default style attributes.
	drawLabel(baselinePoint, textContent, {
		corner = "rigthbottom", // Default corner text placement
		fontSize = 12, // Default font size
		stroke = "none", // Default stroke color (no stroke)
		fill = "brown",  // Default text fill color
		fontWeight = "normal" // Default font weight
	  } = {}) {
		
		// Check if coordinates is an array of length 2.
		if (!Array.isArray(baselinePoint) || baselinePoint.length !== 2) {
			throw new Error("Invalid coordinates: Expecting an array with x and y values.");
		}

		// Transform point coordinates to draw it in the SVG element and destructure the coordinates array.
		const [xPosition, yPosition] = this.transformCoordinates(baselinePoint);
		
		// Create a new text element.
		const textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");

		// Set the text content.
		textElement.textContent = textContent;

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
		} 

		// Set attributes for positioning
		//textElement.setAttribute("id", id);
		textElement.setAttribute("x", xPosition);
		textElement.setAttribute("y", yPosition);
		
		// Set attributes for styling
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

	// set a cartesian plane
	const myPlane1_2 = new CartesianPlane(svg1_2, 0, 23, 0, 24);

	// define two vectors and calculate its vector addition
	const pointA = [0, 0];
	const vectorA = [4, 12];
	const vectorB = [15, 6];
	const vectorAPlusB = addArrays(vectorA, vectorB)

	// draw vectors representing a vector adition 
	myPlane1_2.drawVector(pointA, vectorA, {
		label: "a",
		strokeColor: "green",
		corner: "rigthbottom",
		fontSize: 22,
		fill: "green"
	});
	
	myPlane1_2.drawVector(vectorA, vectorB, {
		label: "b",
		strokeColor: "blue",
		corner: "rigthbottom",
		fontSize: 22,
		fill: "blue"
	});
	
	myPlane1_2.drawVector(pointA, vectorAPlusB, {
		label: "a+b",
		corner: "lefttop",
		fontSize: 22
	});
	
	myPlane1_2.drawVector(pointA, vectorB, {
		label: "b",
		strokeColor: "blue",
		corner: "rigthbottom",
		fontSize: 22,
		fill: "blue"
	});

	myPlane1_2.drawVector(vectorB, vectorA, {
		label: "a",
		strokeColor: "green",
		corner: "rigthbottom",
		fontSize: 22,
		fill: "green"
	});

// svg1_3. Cartesian plane and cartesian coordinates of a point.
	// Get the SVG element from the DOM
	var svg1_3 = document.getElementById("svg1_3");

	// set a cartesian plane
	const myPlane1_3 = new CartesianPlane(svg1_3, -20, 20, -20, 20);
	myPlane1_3.drawAxes("y-axis", "x-axis", "O");
	//const PointP = new Point({orthogonalParam: [5, 10] });
	//const PointP = new Point([5, 10]);
	var PointP = [5, 10];
	myPlane1_3.drawPoint(PointP, "green", "PointP");
  	myPlane1_3.drawSegment([5, 0], [5, 10], "green", 1, "5,5", "DashedLine1");
	myPlane1_3.drawSegment([0, 10], [5, 10], "green", 1, "5,5", "DashedLine2");
	//myPlane1_3.drawVector([5, 10], [5, 10], "green", 1,"v");
  	
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