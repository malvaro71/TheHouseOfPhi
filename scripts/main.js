

/**
 * Creates an SVG marker element with a given ID and fill color.
 *
 * This function creates a marker element that can be used to add arrowheads to lines in an SVG.
 * The marker has a triangular shape with the specified fill color.
 *
 * @param {string} id - The unique identifier for the marker element.
 * @param {string} fillColor - The color to fill the marker (e.g., "brown", "blue").
 *
 * @returns {SVGMarkerElement} The newly created SVG marker element.
 */
function createMarkerArrow(id, fillColor) {
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

// Define global markers
var brownMarker = createMarkerArrow("Brownarrow", "brown");
var blueMarker = createMarkerArrow("Bluearrow", "blue");
var greenMarker = createMarkerArrow("Greenarrow", "green");

/**
 * Draws a line segment in an SVG element with specified styling.
 *
 * This function creates an SVG line element and sets its attributes based on the provided parameters.
 * It also allows for adding an arrowhead to the end of the line based on the `showArrow` flag and stroke color.
 *
 * @param {SVGElement} svgElement - The SVG element where the line segment will be appended.
 * @param {number} x1 - The x-coordinate of the starting point.
 * @param {number} y1 - The y-coordinate of the starting point.
 * @param {number} x2 - The x-coordinate of the ending point.
 * @param {number} y2 - The y-coordinate of the ending point.
 * @param {string} strokeColor - The color of the line stroke (e.g., "brown", "blue").
 * @param {number} strokeWidth - The width of the line stroke.
 * @param {string} strokeDasharray - The dash pattern of the line stroke (e.g., "none", "5, 3").
 * @param {boolean} showArrow - A flag indicating whether to add an arrowhead to the end of the line.
 *
 * @returns {void} - This function does not return a value, it modifies the SVG element.
 */
function drawSegment(svgElement, x1, y1, x2, y2, strokeColor, strokeWidth, strokeDasharray, showArrow) {
	// Create the line element with styling
	const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
	line.setAttribute("x1", x1);
	line.setAttribute("y1", y1);
	line.setAttribute("x2", x2);
	line.setAttribute("y2", y2);
	line.setAttribute("stroke", strokeColor);
	line.setAttribute("stroke-width", strokeWidth);
	line.setAttribute("stroke-dasharray", strokeDasharray);
	if(showArrow){
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
	}
	// Append the line element to the SVG
	svgElement.appendChild(line);
}

/**
 * Draws a circle element in an SVG element with specified center coordinates, color, and radius.
 *
 * @param {SVGElement} svgElement - The SVG element where the circle will be drawn.
 * @param {number} centreX - The x-coordinate of the circle's center.
 * @param {number} centreY - The y-coordinate of the circle's center.
 * @param {string} color - The color of the circle's stroke and fill.
 * @param {number} radius - The radius of the circle.
 */
function drawCircle(svgElement, centreX, centreY, color, radius) {
	// Create a new circle element.
	const circleElement = document.createElementNS("http://www.w3.org/2000/svg", "circle");

	// Set attributes for the circle.
	//circleElement.setAttribute("id", id);
	circleElement.setAttribute("cx", centreX);
	circleElement.setAttribute("cy", centreY);
	circleElement.setAttribute("r", radius);
	circleElement.setAttribute("stroke", color);
	circleElement.setAttribute("fill", color);

	// Append the circle element to the SVG.
	svgElement.appendChild(circleElement);
}

/**
 * Writes text within an SVG element with specified content, positioning, and styling.
 *
 * @param {SVGElement} svgElement - The SVG element where the text will be written.
 * @param {string} text - The content of the text element.
 * @param {number} x - The x-coordinate of the text element's anchor point.
 * @param {number} y - The y-coordinate of the text element's anchor point.
 * @param {number} fontSize - The font size of the text in pixels.
 * @param {string} stroke - The color of the text stroke (outline).
 * @param {string} fill - The color for filling the text.
 * @param {string} fontWeight - The font weight (e.g., "normal", "bold").
 * @param {string} corner (optional) - The corner of the text element to be positioned at the specified coordinates.
 *                                      - Can be "righttop", "rightbottom", "lefttop", or "leftbottom". Defaults to "rightbottom".
 *
 * @throws {Error} If an invalid value is provided for the `corner` parameter.
 */
function writeText(svgElement, text, x, y, fontSize, stroke, fill, fontWeight, corner = "rightbottom") {
	// Create a new text element
	var textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
	
	// Set the text content
	textElement.textContent = text; 

	// Set attributes for id, positioning and styling
	textElement.setAttribute("x", x);
	textElement.setAttribute("y", y);
	textElement.setAttribute("font-size", fontSize);
	textElement.setAttribute("stroke", stroke);
	textElement.setAttribute("fill", fill);
	textElement.setAttribute("font-weight", fontWeight);

	// Handles different corner values to position the text element.
	switch(corner) {
		case "righttop":
			// Positions the rightmost character at the specified baseline point.
			textElement.setAttribute("text-anchor", "end");
			// Aligns the topmost edge of the first text box with the specified baseline point.
			textElement.setAttribute("dominant-baseline", "text-before-edge");
		break;
		case "rightbottom":
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
			throw new Error("Invalid value for corner input: Expecting ´righttop´, ´rightbottom´, ´lefttop´ or ´leftbottom´.");
	} 

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

/**
 * Validates if the input coordinates are a list of length 2 containing numbers.
 *
 * @param {number[]} coordinates - A list representing the coordinates.
 *
 * @throws {TypeError} If the coordinates are not a list.
 * @throws {ValueError} If the coordinates list is not of length 2 or if it contains non-numeric elements or if any of its numeric elements is infinite.
 */
function validateCoordinates2D(coordinates) {
	if (!Array.isArray(coordinates)) {
	  throw new TypeError("Invalid coordinates: Expecting a list.");
	}
	if (coordinates.length !== 2) {
	  throw new ValueError("Invalid coordinates: Expecting a list with length 2 (x and y values).");
	}
	if (!coordinates.every((element) => typeof element === "number" && isFinite(element))) {
	  throw new ValueError("Invalid coordinates: Expecting a list containing only finite numbers.");
	}
	// If all conditions pass, the function returns true (implicit return)
}

/**
 * Validates if the input coordinates are a list of length 3 containing numbers.
 *
 * @param {number[]} coordinates - A list representing the coordinates.
 *
 * @throws {TypeError} If the coordinates are not a list.
 * @throws {ValueError} If the coordinates list is not of length 3 or if it contains non-numeric elements or if any of its numeric elements is infinite.
 */
function validateCoordinates3D(coordinates) {
	if (!Array.isArray(coordinates)) {
	  throw new TypeError("Invalid coordinates: Expecting a list.");
	}
	if (coordinates.length !== 3) {
	  throw new ValueError("Invalid coordinates: Expecting a list with length 3 (x, y and z values).");
	}
	if (!coordinates.every((element) => typeof element === "number" && isFinite(element))) {
	  throw new ValueError("Invalid coordinates: Expecting a list containing only finite numbers.");
	}
	// If all conditions pass, the function returns true (implicit return)
}

/**
 * Validates if the input coordinates are a list of length 2 or 3 containing numbers.
 *
 * @param {number[]} coordinates - A list representing the coordinates.
 *
 * @throws {TypeError} If the coordinates are not a list.
 * @throws {ValueError} If the coordinates list is not of length 2 or 3 or if it contains non-numeric elements or if any of its numeric elements is infinite.
 */
function validateCoordinates2D3D(coordinates) {
	if (!Array.isArray(coordinates)) {
	  throw new TypeError("Invalid coordinates: Expecting a list.");
	}
	if (coordinates.length !== 2 && coordinates.length !== 3) {
	  throw new ValueError("Invalid coordinates: Expecting a list with length 2 or 3 (x and y or x, y and z values).");
	}
	if (!coordinates.every((element) => typeof element === "number" && isFinite(element))) {
	  throw new ValueError("Invalid coordinates: Expecting a list containing only finite numbers.");
	}
	// If all conditions pass, the function returns true (implicit return)
}

/**
Validates if the input is a valid object (not null).
@param {*} input - The value to be validated.
@throws {TypeError} If the input is not an object or is null. 
*/ 
function validateObject(input) {
	if (typeof input !== 'object' || input === null) {
		throw new TypeError("This parameter must be an object.");
	}
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

/**
 * Calculates the element-wise sum of two input arrays of the same length.
 *
 * This function adds corresponding elements from two arrays and returns a new array containing the sums.
 *
 * @param {number[]} array1 - The first input array containing numbers.
 * @param {number[]} array2 - The second input array containing numbers, with the same length as array1.
 *
 * @returns {number[]} A new array containing the element-wise sum of the input arrays.
 *
 * @throws {TypeError} If the input arrays are not of type number[] or have different lengths.
 */
function add(array1, array2) {
	const sumArray = [];
  
	array1.forEach((element, index) => {
	  sumArray.push(element + array2[index]); // Access array2 from the function argument
	});
  
	return sumArray; // Return the resulting array
}

/**
 * Calculates the dot product (scalar product) of two input vectors.
 *
 * The dot product is the sum of the products of corresponding elements in two vectors with the same length.
 *
 * @param {number[]} vectorA - The first input vector represented as a numerical array.
 * @param {number[]} vectorB - The second input vector represented as a numerical array, with the same length as vectorA.
 *
 * @throws {Error} If the input vectors have different lengths.
 *
 * @returns {number} The dot product (scalar value) of the input vectors.
 */
function dot(vectorA, vectorB) {
	if (vectorA.length !== vectorB.length) {
	  throw new Error("Vectors must have the same dimensions");
	}
  
	let product = 0;
	for (let i = 0; i < vectorA.length; i++) {
	  product += vectorA[i] * vectorB[i];
	}
	return product;
}

/**
 * Calculates the magnitude (Euclidean norm) of a 2D or 3D vector represented as a numerical array.
 *
 * The magnitude is the square root of the sum of the squares of each element in the vector.
 * This function supports vectors of length 2 (2D) or length 3 (3D).
 *
 * @param {number[]} vector - The input vector represented as a numerical array of length 2 or 3.
 *
 * @throws {TypeError} If the input is not a valid array.
 * @throws {ValueError} (from validateCoordinates2D3D) - Thrown for invalid input dimensions, non-numeric elements or infinite elements.
 *
 * @returns {number} The magnitude (Euclidean norm) of the input vector.
 */
function norm(vector) {
	// Check if input is a valid array
	validateCoordinates2D3D(vector);
  
	// Calculate the sum of squares of each component
	const sumOfSquares = vector.reduce((acc, curr) => acc + curr * curr, 0);
  
	// Take the square root to get the magnitude
	return Math.sqrt(sumOfSquares);
}

/**
 * Multiplies all elements in an array by a scalar value.
 *
 * This function creates a new array where each element of the input array
 * is multiplied by the provided scalar value. The original array remains unchanged.
 *
 * @param {number} scalar - The scalar value to multiply with each element.
 * @param {number[]} array - The input array containing numerical elements.
 *
 * @throws {TypeError} - If the input array is not a valid array.
 * @throws {TypeError} - If any element in the input array is not a number.
 *
 * @returns {number[]} A new array containing the element-wise products of the scalar and the input array.
 */
function multiply(scalar, array){
	// Check if input is a valid array
	validateCoordinates2D3D(array);

	const scaledArray = [];
	for (let i = 0; i < array.length; i++) {
	scaledArray.push(scalar * array[i]);
	}
	return scaledArray;
}
/**
Calculates the angle in radians between two 2D vectors in the counter-clockwise (CCW) sense.
@param {number[]} vector1 - The first 2D vector represented as an array of length 2 (x, y).
@param {number[]} vector2 - The second 2D vector represented as an array of length 2 (x, y).
@returns {number} The angle in radians between the two vectors in the CCW sense.
Returns 0 if either vector has a magnitude of 0.
@throws {TypeError} If either vector1 or vector2 is not a list.
@throws {ValueError} If either vector1 or vector2 is not of length 2, or if they contain non-numeric elements, or if any of their numeric elements is infinite. 
*/
function angleBetweenVectorsCCW(vector1, vector2) {
	// Check if vectors are valid arrays of length 2
	[vector1, vector2].every(arr => validateCoordinates2D(arr));
  
	// Calculate dot product and magnitudes
	const dotProduct = vector1[0] * vector2[0] + vector1[1] * vector2[1];
	const magnitude1 = norm(vector1);
	const magnitude2 = norm(vector2);
  
	// Prevent division by zero
	if (magnitude1 === 0 || magnitude2 === 0) {
	  return 0;
	}
  
	// Calculate angle using acos and handle potential rounding errors
	let angleRad = Math.acos(dotProduct / (magnitude1 * magnitude2));
  
	// Determine sign based on cross product to ensure CCW direction
	const determinant = vector1[0] * vector2[1] - vector1[1] * vector2[0];
	if (determinant < 0) {
	  angleRad = 2 * Math.PI - angleRad; // Correct for CW angle
	}
  
	// Return angle in radians
	return angleRad;
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
	
	// Transform cartesian plane coordinates in svg element coordinates
    transformCoordinates(coordinates) {
        // Check if coordinates is a number array of length 2.
		validateCoordinates2D(coordinates);
		
		// Destructure the coordinates array.
		const [x, y] = coordinates;
		
		// Transform the x and y values
		const transformedX = this.OriginX + x * this.planeScaleX;
		const transformedY = this.OriginY - y * this.planeScaleY;
		
		// Return a new array with transformed coordinates
		return [transformedX, transformedY];
    }

	//Draw a segment in the cartesian plane
    drawSegment(coordinates1, coordinates2, lineAttributes = {}) {
		// Validate coordinates1 and coordinates2.
		[coordinates1, coordinates2].every(arr => validateCoordinates2D(arr));

		// Validate lineAttributes
		validateObject(lineAttributes);

		// Destructure the lineAttributes and set its default values
		const {strokeColor = "brown", strokeWidth = 2, strokeDasharray = "none", showArrow = false} = lineAttributes;
	
		// Transform points coordinates to draw it in the SVG element and destructure the coordinates array
		const [xPosition1, yPosition1] = this.transformCoordinates(coordinates1);
		const [xPosition2, yPosition2] = this.transformCoordinates(coordinates2);

		// draw the segment
		drawSegment(this.svgElement, xPosition1, yPosition1, xPosition2, yPosition2, strokeColor, strokeWidth, strokeDasharray, showArrow);
    }

	//Draw a point in the cartesian plane
    drawPoint(coordinates, color) {
		//validate inputs
		validateCoordinates2D(coordinates);

		// Transform point coordinates to draw it in the SVG element and destructure the coordinates array.
		const [xPosition, yPosition] = this.transformCoordinates(coordinates);

		// Draw the point
		drawCircle(this.svgElement, xPosition, yPosition, color, 3);
    }

	

	// Draw the angle laid from vector1 to vector2 counter-clockwise
	drawArc(vertex, initialSide, terminalSide, radius) {
		
		// Check if initialPoint and vectorComponents are number arrays of length 2.
		[vertex, initialSide, terminalSide].every(arr => validateCoordinates2D(arr));

		// Declare block values
		let initialPoint = [initialSide[0]/norm(initialSide)*radius, initialSide[1]/norm(initialSide)*radius];
		let terminalPoint = [terminalSide[0]/norm(terminalSide)*radius, terminalSide[1]/norm(terminalSide)*radius];
		const radiusX = radius*this.planeScaleX;
		const radiusY = radius*this.planeScaleY;
		
		// Adjust initialPoint and terminalPoint to the position of the vertex
		initialPoint = add(vertex, initialPoint);
		terminalPoint = add(vertex, terminalPoint);

		// Transform point coordinates to draw it in the SVG element.
		initialPoint = this.transformCoordinates(initialPoint);
		terminalPoint = this.transformCoordinates(terminalPoint);


		// Generate path data string using template literals
		const pathData = `M ${initialPoint[0]},${initialPoint[1]} A ${radiusX},${radiusY} 0 0 0 ${terminalPoint[0]},${terminalPoint[1]}`;

		// Create the path element
		const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
		path.setAttribute("d", pathData);
		path.setAttribute("fill", "none");
		path.setAttribute("stroke", "blue");
		path.setAttribute("stroke-width", "2");

		// Append the path element to the SVG
		this.svgElement.appendChild(path);
	}

	// Draw a vector in the cartesian plane using an existing marker created earlier (only for brown, blue or green colors)
	drawVector(initialPoint, vectorComponents, lineAttributes = {}, textAttributes = {}) {
		// Validate coordinates1 and coordinates2.
		[initialPoint, vectorComponents].every(arr => validateCoordinates2D(arr));

		// Validate lineAttributes and textAttributes
		[lineAttributes,textAttributes].every(arr => validateObject(arr));

		// Destructure the object and set default values
		const {strokeColor = "brown", strokeWidth = 2, strokeDasharray = "none", showArrow = true} = lineAttributes;
		const {textContent = "", corner = "rightbottom"} = textAttributes;

		//Calculate vector endpoint using initial point and vector components.
		const endPoint = add(initialPoint, vectorComponents);

		// Transform points coordinates to draw it in the SVG element and destructure the coordinates array
		const [initialXTransformed, initialYTransformed] = this.transformCoordinates(initialPoint);
		const [endXTransformed, endYTransformed] = this.transformCoordinates(endPoint);

		// Draw the vector
		drawSegment(this.svgElement, initialXTransformed, initialYTransformed, endXTransformed, endYTransformed, strokeColor, strokeWidth, strokeDasharray, showArrow);

		// Draw label if defined
		if (textContent != "") {
			const half = vectorComponents.map(element => element / 2);
			const position = add(initialPoint, half);
			this.drawLabel(position, textAttributes);
		}
	}
	
	// Draw the label of an element giving coordinates of a baseline point, the label text, 
	// the corner parameter: "righttop", "rightbottom", "lefttop" or "leftbottom"
	// and apply some style attributes.
	drawLabel(baselinePoint, textAttributes = {}) {
		// Validade baselinePoint
		validateCoordinates2D(baselinePoint);

		//validate textAttributes
		validateObject(textAttributes);
		
		// destructure textAttributes and assign default values
		const {textContent = "", fontSize = 12, stroke = "none", fill = "brown",  fontWeight = "normal", corner = "rightbottom"} = textAttributes;
		
		// Transform point coordinates to draw it in the SVG element and destructure the coordinates array.
		const [xPosition, yPosition] = this.transformCoordinates(baselinePoint);

		// Write the text
		writeText(this.svgElement, textContent, xPosition, yPosition, fontSize, stroke, fill, fontWeight, corner);
	}

	// Draw x and y axes in cartesian plane.
    drawAxes(yAxisText, xAxisText, originText) {   
		// y-axis
			const planeHeight = this.yMax - this.yMin;
			this.drawVector([0, this.yMin], [0, planeHeight]);
			writeVerticalText(this.svgElement, yAxisText, this.OriginX - 5, 0, 20, "brown", "brown");

		// x-axis
			const planeWidht = this.xMax - this.xMin;
			this.drawVector([this.xMin, 0], [planeWidht, 0]);
			
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
			this.drawLabel([0-0.2, 0], {
				textContent: originText,
				fontSize: 22,
				fill: "brown" 
			});
    }
}


/**
	Represents a Euclidean space within an SVG element. 
*/
class EuclideanSpace {
	/**
		Constants used throughout the class based on the x-axis skew angle. 
	*/ 
	static cosAngle = Math.cos(45*Math.PI/180); 
	static sinAngle = Math.sin(45*Math.PI/180);
	/**
		Creates a new EuclideanSpace instance.
		@param {SVGElement} svgElement - The SVG element where the space will be drawn.
		@param {number[]} centerPoint - The coordinates of the center point in the Euclidean space ([x, y, z]).
		@param {number} scale - The number of pixels per unit of length in the Euclidean space.
		@throws {TypeError} If the svgElement is not an SVGElement or the centerPoint is not an array of length 3.
		@throws {ValueError} If any element in centerPoint is not a number. 
	*/
	constructor(svgElement, centerPoint, scale) {
		// Define the svg element where the euclidean space will be represented
		this.svgElement = svgElement;

		// Get the width and height of the SVG element as strings
		const svgWidth = this.svgElement.getAttribute("width");
		const svgHeight = this.svgElement.getAttribute("height");

		// Convert strings to numbers
		this.svgWidthNum = parseFloat(svgWidth);
		this.svgHeightNum = parseFloat(svgHeight);

		//Set the space scale
		this.spaceScale = scale;

		//Destructure the coordinates of centerPoint
		this.xC = centerPoint[0];
		this.yC = centerPoint[1];
		this.zC = centerPoint[2];

		// SVG canva coordinates of euclidean space origin of coordinates 
		this.OriginX = this.svgWidthNum*EuclideanSpace.sinAngle/2 - this.yC*this.spaceScale + this.xC*EuclideanSpace.cosAngle*this.spaceScale;
		this.OriginY = this.svgHeightNum*(1 - EuclideanSpace.cosAngle/2) + this.zC*this.spaceScale - this.xC*EuclideanSpace.cosAngle*this.spaceScale;
	} 

	// Draw x, y, z axes and origin in euclidean space.
	drawAxes() {
		const planeHeight = this.svgHeightNum/this.spaceScale;
		const planeWidht = this.svgWidthNum/this.spaceScale;

		// x-axis
		this.drawVector([-planeWidht/6, 0, 0], [planeWidht*5/8, 0, 0]);
		this.drawLabel([planeWidht*4/9, 0, planeWidht/100], {textContent: "x"});

		// y-axis
		this.drawVector([0, -planeHeight/6, 0], [0, planeHeight*3/4, 0]);
		this.drawLabel([0, planeHeight*5/9, planeWidht/100], {textContent: "y"});

		//z-axis
		this.drawVector([0, 0, -planeWidht/6], [0, 0, planeWidht*3/4]);
		this.drawLabel([0, -planeWidht/100, planeWidht*5/9], {textContent: "z"}, "righttop");
		
		// Origin.
		this.drawLabel([0, 0-0.1, 0], {textContent: "O"});
	}

	/**
		Transforms a set of Euclidean space coordinates into SVG element coordinates.
		@param {number[]} coordinates - The coordinates in Euclidean space ([x, y, z]).
		@throws {TypeError} If the coordinates array is not of length 3.
		@throws {ValueError} If any element in coordinates is not a number.
		@returns {number[]} The transformed coordinates in SVG element space ([x, y]). 
	*/
    transformCoordinates(coordinates) {
        // Check if coordinates is a number array of length 3.
		validateCoordinates3D(coordinates);
		
		// Destructure the coordinates array.
		const [x, y, z] = coordinates;
		
		// Transform the x and y values
		const transformedX =  this.OriginX + y*this.spaceScale - x*EuclideanSpace.cosAngle*this.spaceScale;
		const transformedY = this.OriginY - z*this.spaceScale + x*EuclideanSpace.cosAngle*this.spaceScale;
		
		// Return a new array with transformed coordinates
		return [transformedX, transformedY];
    }

	/**
		Draws a line segment in the Euclidean space from a starting point to an end point with specific style attributes.
		@param {number[]} initialPoint - The starting point coordinates in Euclidean space ([x, y, z]).
		@param {number[]} endPoint - The end point coordinates in Euclidean space ([x, y, z]).
		@param {object} lineAttributes - An object containing style attributes for the line segment (default values are applied if omitted).
					* `strokeColor` (string): The color of the line (default: "brown").
					* `strokeWidth` (number): The width of the line in pixels (default: 2).
					* `strokeDasharray` (string): The dash pattern for the line (default: "none").
					* `showArrow` (boolean): Whether to draw an arrowhead at the end of the line (default: false).
		@throws {TypeError} If either initialPoint or endPoint is not a number array of length 3.
		@throws {ValueError} If any element in initialPoint or endPoint is not a number.
		@throws {TypeError} If lineAttributes is not an object. 
	*/ 
    drawSegment(initialPoint, endPoint, lineAttributes = {}) {
		// Validate coordinates1 and coordinates2.
		[initialPoint, endPoint].every(arr => validateCoordinates3D(arr));

		// Validate lineAttributes
		validateObject(lineAttributes);

		// Destructure the lineAttributes and set its default values
		const {strokeColor = "brown", strokeWidth = 2, strokeDasharray = "none", showArrow = false} = lineAttributes;

		// Transform points coordinates to draw it in the SVG element and destructure the coordinates array
		const [initialXTransformed, initialYTransformed] = this.transformCoordinates(initialPoint);
		const [endXTransformed, endYTransformed] = this.transformCoordinates(endPoint);
		
		// draw the segment
		drawSegment(this.svgElement, initialXTransformed, initialYTransformed, endXTransformed, endYTransformed, strokeColor, strokeWidth, strokeDasharray, showArrow);
    }

	/**
		Draws a vector in the Euclidean space from a starting point to an end point, which is calculated by adding the vector components to the starting point.
		Optionally, a label can be drawn along the vector.
		@param {number[]} initialPoint - The starting point coordinates in Euclidean space ([x, y, z]).
		@param {number[]} vectorComponents - The vector components to add to the starting point to define the end point ([x, y, z]).
		@param {object} lineAttributes - An object containing style attributes for the vector (default values are applied if omitted).
					* `strokeColor` (string): The color of the line (default: "brown").
					* `strokeWidth` (number): The width of the line in pixels (default: 2).
					* `strokeDasharray` (string): The dash pattern for the line (default: "none").
					* `showArrow` (boolean): Whether to draw an arrowhead at the end of the line (default: true).
		@param {object} textAttributes - An object containing style attributes for the label (default values are applied if omitted).
					* `textContent` (string): The text content of the label (default: "").
					* `corner` (string): The position of the label relative to the vector ("righttop", "rightbottom", "lefttop", or "leftbottom", default: "rightbottom").
		@throws {TypeError} If either initialPoint or vectorComponents is not a number array of length 3.
		@throws {ValueError} If any element in initialPoint or vectorComponents is not a number.
		@throws {TypeError} If either lineAttributes or textAttributes is not an object. 
	*/
	drawVector(initialPoint, vectorComponents, lineAttributes = {}, textAttributes = {}
	) {
		// Validate coordinates1 and coordinates2.
		[initialPoint, vectorComponents].every(arr => validateCoordinates3D(arr));

		// Validate lineAttributes and textAttributes
		[lineAttributes, textAttributes].every(arr	=> validateObject(arr));

		// Destructure lineAttributes and textAttributes, and set its default values
		const {strokeColor = "brown", strokeWidth = 2, strokeDasharray = "none", showArrow = true} = lineAttributes;
		const {textContent = "", corner = "rightbottom"} = textAttributes;

		//Calculate vector endpoint using initial point and vector components.
		const endPoint = add(initialPoint, vectorComponents);

		// Transform points coordinates to draw it in the SVG element and destructure the coordinates array
		const [initialXTransformed, initialYTransformed] = this.transformCoordinates(initialPoint);
		const [endXTransformed, endYTransformed] = this.transformCoordinates(endPoint);
		
		// Draw the vector
		drawSegment(this.svgElement, initialXTransformed, initialYTransformed, endXTransformed, endYTransformed, strokeColor, strokeWidth, strokeDasharray, showArrow);

		// Draw label if defined
		if (textContent != "") {
			const half = vectorComponents.map(element => element / 2);
			const position = add(initialPoint, half);
			this.drawLabel(position, textAttributes);
		}
	}

	/**
	 * Draws a label for an element at a specified baseline point. 
	 * The label can be positioned at one of four corners relative to the point ("righttop", "rightbottom", "lefttop", or "leftbottom").
	 * 
	 * @param {number[]} baselinePoint - The coordinates of the baseline point in Euclidean space ([x, y, z]).
	 * @param {object} textAttributes - An object containing style attributes for the label (default values are applied if omitted).
	 *                 * `textContent` (string): The text content of the label (default: "").
	 *                 * `fontSize` (number): The font size of the label in pixels (default: 20).
	 *                 * `stroke` (string): The color of the label stroke (default: "none").
	 *                 * `fill` (string): The color to fill the label (default: "brown").
	 *                 * `fontWeight` (string): The font weight of the label (default: "normal").
	 *                 * `corner` (string): The position of the label relative to the baseline point ("righttop", "rightbottom", "lefttop", or "leftbottom", default: "rightbottom").
	 * 
	 * @throws {TypeError} If baselinePoint is not a number array of length 3.
	 * @throws {ValueError} If any element in baselinePoint is not a number.
	 * @throws {TypeError} If textAttributes is not an object.
	*/
	drawLabel(baselinePoint, textAttributes = {}) {
		// Validate coordinates1 and coordinates2.
		validateCoordinates3D(baselinePoint);

		// Validate textAttributes
		validateObject(textAttributes);

		// Destructure textAttributes, and set its default values
		const {textContent = "", fontSize = 20, stroke = "none", fill = "brown",  fontWeight = "normal", corner = "rightbottom"} = textAttributes;

		// Transform point coordinates to draw it in the SVG element and destructure the coordinates array.
		const [xPosition, yPosition] = this.transformCoordinates(baselinePoint);
		
		// Write the text
		writeText(this.svgElement, textContent, xPosition, yPosition, fontSize, stroke, fill, fontWeight, corner);
	}

	/**
	 * Draws a point in the Euclidean space at a specified location.
	 * 
	 * @param {number[]} coordinates - The coordinates of the point in Euclidean space ([x, y, z]).
	 * @param {string} color - The color of the point.
	 * 
	 * @throws {TypeError} If coordinates is not a number array of length 3.
	 * @throws {ValueError} If any element in coordinates is not a number.
	 */
    drawPoint(coordinates, color) {
		// Validate coordinates1 and coordinates2.
		validateCoordinates3D(coordinates);

		// Transform point coordinates to draw it in the SVG element and destructure the coordinates array.
		const [xPosition, yPosition] = this.transformCoordinates(coordinates);

		// Draw the point
		drawCircle(this.svgElement, xPosition, yPosition, color, 3);
    }
}

//Calculate vector magnitude and direction from given coordinates and show it in a canvas.
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
	myPlane1_2.drawVector(pointA, vectorA, {strokeColor: "green"}, {textContent: "a", fontSize: 22, fill: "green"});
	
	myPlane1_2.drawVector(vectorA, vectorB, {strokeColor: "blue"}, {textContent: "b", fontSize: 22, fill: "blue"});
	
	myPlane1_2.drawVector(pointA, vectorAPlusB, {strokeColor: "brown"}, {textContent: "a+b", fontSize: 22, corner: "lefttop"});
	
	myPlane1_2.drawVector(pointA, vectorB, {strokeColor: "blue"}, {textContent: "b", fontSize: 22, fill: "blue"});

	myPlane1_2.drawVector(vectorB, vectorA, { strokeColor: "green"}, {textContent: "a", fontSize: 22, fill: "green"});
}

// svg1_3. Cartesian plane and cartesian coordinates of a point.
{
	// Get the SVG element from the DOM
	var svg1_3 = document.getElementById("svg1_3");

	// set a cartesian plane
	const myPlane1_3 = new CartesianPlane(svg1_3, -20, 20, -20, 20);
	myPlane1_3.drawAxes("y-axis", "x-axis", "O");
	//const PointP = new Point({orthogonalParam: [5, 10] });
	//const PointP = new Point([5, 10]);
	myPlane1_3.drawPoint([5, 10], "green");
  	myPlane1_3.drawSegment([5, 0], [5, 10], {strokeColor: "green", strokeDasharray: "5,5", strokeWidth: 1});
	myPlane1_3.drawSegment([0, 10], [5, 10], {strokeColor: "green", strokeDasharray: "5,5", strokeWidth: 1});
	//myPlane1_3.drawVector([5, 10], [5, 10], "green", 1,"v");
  	myPlane1_3.drawLabel([6, 10], {textContent: "P(x\u2081, y\u2081)", fill: "green", fontSize: 20, corner: "leftbottom"})
	/*
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
	svg1_3.appendChild(textElement);	*/
}

// svg1.5 point P, with coordinates (x1, y1, z1)
{
	// Get the SVG element from the DOM
	var svg1_5 = document.getElementById("svg1_5");

	// set a euclidean space
	const mySpace1_5 = new EuclideanSpace(svg1_5, [0, 0, 0], 10);
	mySpace1_5.drawAxes();

	// Draw a point
	mySpace1_5.drawPoint([6, 9, 15], "green");
	
	// Draw dashed lines to ilustrate the point coordinates on each axe x, y and z.
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
	mySpace1_5.drawLabel([6, -0.1, 0], {textContent: "x\u2081", fill: "green", fontSize: 20});
	mySpace1_5.drawLabel([0, 9.1, 0.1], {textContent: "y\u2081", fill: "green", fontSize: 20, corner: "leftbottom"});
	mySpace1_5.drawLabel([0, -0.1, 15], {textContent: "z\u2081", fill: "green", fontSize: 20});
	mySpace1_5.drawLabel([6, 10, 16], {textContent: "P(x\u2081, y\u2081, z\u2081)", fill: "green", corner: "lefttop"});
}

// svg1.6 Projection of `vecW` onto `vecv`
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
	myPlane1_6.drawVector(origin, vectorW, {strokeColor: "green"}, {textContent: "w", fontSize: 22, fill: "green"});
	myPlane1_6.drawVector(origin, vectorV);
	myPlane1_6.drawLabel([19, 2], {textContent: "v", fontSize: 18});
	myPlane1_6.drawVector(origin, ProjectWonV, {strokeColor: "green", strokeDasharray: "5,5"});
	myPlane1_6.drawLabel([14, 2], {textContent: "Proj\u1D65W", fontSize: 18, fill: "green"});
	

	// Draw angle
	myPlane1_6.drawArc(origin, vectorV, vectorW, 4);
	myPlane1_6.drawLabel([7, 3], {textContent: "θ", fontSize: 16, fill: "blue"});

	// Draw segment
	myPlane1_6.drawSegment(add(origin, vectorW), add(origin, ProjectWonV), {strokeColor: "green", strokeDasharray: "5,5"});
}
