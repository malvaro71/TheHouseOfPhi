
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
 * Returns an SVG text element with a regular text followed by a subscript text.
 * 
 * @param {string} regular - The main text content.
 * @param {string} subscript - The subscript text content.
 * @returns {SVGTextElement} An SVG text element containing the regular text and subscript.
 */
function TextWithSubscript(regular, subscript) {
    // Create the text element
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");

    // Create the text node for main text
    const textNode = document.createTextNode(regular);
    text.appendChild(textNode);

    // Create a separate tspan element for the subscript
    const subscriptSpan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
    const subscriptNode = document.createTextNode(subscript);
    subscriptSpan.appendChild(subscriptNode);

    // Apply the 'baseline-shift' attribute to the subscript tspan
    subscriptSpan.setAttribute("baseline-shift", "-0.3em");
    subscriptSpan.setAttribute("style", "font-size: 90%"); // Adjust font size as needed

    // Add the subscript tspan to the main text element
    text.appendChild(subscriptSpan);

    return text;
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
 *                                   - It can be "righttop", "rightbottom", "lefttop", or "leftbottom". Defaults to "rightbottom".
 *
 * @throws {Error} If an invalid value is provided for the `corner` parameter.
 */
function writeText(svgElement, text, x, y, fontSize, stroke, fill, fontWeight, corner = "rightbottom") {
	let svgTextElement;
	
	if (typeof text === "string") {
		// Creates a new SVG text element and sets its text content.
		svgTextElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
		svgTextElement.textContent = text;
	  } else if (text instanceof SVGTextElement) {
		// Use the provided SVGTextElement directly
		svgTextElement = text;
	  } else {
		// Throw an error for unexpected types
		throw new TypeError("Invalid type for 'text' parameter. Expected string, SVGTextElement, or object.");
	}

	// Set attributes for id, positioning and styling
	svgTextElement.setAttribute("x", x);
	svgTextElement.setAttribute("y", y);
	svgTextElement.setAttribute("font-size", fontSize);
	svgTextElement.setAttribute("stroke", stroke);
	svgTextElement.setAttribute("fill", fill);
	svgTextElement.setAttribute("font-weight", fontWeight);

	// Handles different corner values to position the text element.
	switch(corner) {
		case "righttop":
			// Positions the rightmost character at the specified baseline point.
			svgTextElement.setAttribute("text-anchor", "end");
			// Aligns the topmost edge of the first text box with the specified baseline point.
			svgTextElement.setAttribute("dominant-baseline", "text-before-edge");
		break;
		case "rightbottom":
			// Positions the rightmost character at the specified baseline point.
			svgTextElement.setAttribute("text-anchor", "end");
			// Aligns the bottommost edge of the last text box with the specified baseline point.
			svgTextElement.setAttribute("dominant-baseline", "text-after-edge");
		break;
		case "lefttop":
			// Positions the leftmost character at the specified x-coordinate.
			svgTextElement.setAttribute("text-anchor", "start");
			// Aligns the topmost edge of the first text box with the specified baseline point.
			svgTextElement.setAttribute("dominant-baseline", "text-before-edge");
		break;
		case "leftbottom":
			// Positions the leftmost character at the specified x-coordinate.
			svgTextElement.setAttribute("text-anchor", "start");
			// Aligns the bottommost edge of the last text box with the specified baseline point.
			svgTextElement.setAttribute("dominant-baseline", "text-after-edge");
		break;
		default:
			throw new Error("Invalid value for corner input: Expecting ´righttop´, ´rightbottom´, ´lefttop´ or ´leftbottom´.");
	} 

	// Add the text element to the SVG
	svgElement.appendChild(svgTextElement);
}

/**
 * Writes text vertically within an SVG element, applying specified content, positioning, and styling.
 * The text is rotated -90 degrees and positioned with its end at the specified coordinates,
 * aligning the bottommost edge of the text box with the baseline.
 *
 * @param {SVGElement} svgElement - The SVG element where the vertical text will be written.
 * @param {string} text - The content of the text element.
 * @param {number} x - The x-coordinate for the anchor point of the rotated text.
 * @param {number} y - The y-coordinate for the anchor point of the rotated text.
 * @param {number} fontSize - The font size of the text in pixels.
 * @param {string} stroke - The color of the text stroke (outline).
 * @param {string} fill - The color for filling the text.
 */
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
 * Class to manage the graphical representation of a Cartesian plane within an SVG element.
 */
class CartesianPlane {
	/**
	 * Create a new CartesianPlane instance.
	 * 
	 * @param {SVGElement} svgElement - The SVG element where the Cartesian plane will be drawn.
	 * @param {number} xMin - The minimum value on the x-axis.
	 * @param {number} xMax - The maximum value on the x-axis (must be greater than xMin).
	 * @param {number} yMin - The minimum value on the y-axis.
	 * @param {number} yMax - The maximum value on the y-axis (must be greater than yMin).
	 * 
	 * @throws {Error} If xMin is greater than xMax or yMin is greater than yMax.
	 */
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
	
	/**
	 * Transforms a set of Cartesian plane coordinates into SVG element coordinates.
	 * 
	 * @param {number[]} coordinates - An array containing the x and y coordinates of a point in the Cartesian plane.
	 * 
	 * @throws {TypeError} If coordinates is not a number array of length 2.
	 * @throws {ValueError} If any element in coordinates is not a number.
	 * 
	 * @returns {number[]} The transformed coordinates in SVG element space ([x, y]).
	 */
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

	/**
	 * Draws a line segment in the Cartesian plane.
	 * 
	 * @param {number[]} coordinates1 - The starting point coordinates in the Cartesian plane ([x, y]).
	 * @param {number[]} coordinates2 - The end point coordinates in the Cartesian plane ([x, y]).
	 * @param {object} lineAttributes - An object containing style attributes for the line segment (default values are applied if omitted).
	 *                 * `strokeColor` (string): The color of the line (default: "brown").
	 *                 * `strokeWidth` (number): The width of the line in pixels (default: 2).
	 *                 * `strokeDasharray` (string): The dash pattern for the line (default: "none").
	 *                 * `showArrow` (boolean): Whether to draw an arrowhead at the end of the line (default: false).
	 * 
	 * @throws {TypeError} If either coordinates1 or coordinates2 is not a number array of length 2.
	 * @throws {ValueError} If any element in coordinates1 or coordinates2 is not a number.
	 * @throws {TypeError} If lineAttributes is not an object.
	 */
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

	/**
	 * Draws a point in the Cartesian plane.
	 * 
	 * @param {number[]} coordinates - The coordinates of the point in the Cartesian plane ([x, y]).
	 * @param {string} color - The color of the point.
	 * 
	 * @throws {TypeError} If coordinates is not a number array of length 2.
	 * @throws {ValueError} If any element in coordinates is not a number.
	 */
    drawPoint(coordinates, color) {
		//validate inputs
		validateCoordinates2D(coordinates);

		// Transform point coordinates to draw it in the SVG element and destructure the coordinates array.
		const [xPosition, yPosition] = this.transformCoordinates(coordinates);

		// Draw the point
		drawCircle(this.svgElement, xPosition, yPosition, color, 3);
    }

	/**
	 * Draws an arc representing an angle in the Cartesian plane, counter-clockwise from the initial side to the terminal side.
	 * 
	 * @param {number[]} vertex - The coordinates of the vertex of the angle ([x, y]).
	 * @param {number[]} initialSide - The initial side vector of the angle ([x, y]).
	 * @param {number[]} terminalSide - The terminal side vector of the angle ([x, y]).
	 * @param {number} radius - The radius of the arc.
	 * 
	 * @throws {TypeError} If vertex, initialSide, or terminalSide is not a number array of length 2.
	 * @throws {ValueError} If any element in vertex, initialSide, or terminalSide is not a number.
	 */
	drawArc(vertex, initialSide, terminalSide, radius) {
		
		// Check if initialPoint and vectorComponents are number arrays of length 2.
		[vertex, initialSide, terminalSide].every(arr => validateCoordinates2D(arr));

		// Declare block values
		let initialPoint = [initialSide[0]/math.norm(initialSide)*radius, initialSide[1]/math.norm(initialSide)*radius];
		let terminalPoint = [terminalSide[0]/math.norm(terminalSide)*radius, terminalSide[1]/math.norm(terminalSide)*radius];
		const radiusX = radius*this.planeScaleX;
		const radiusY = radius*this.planeScaleY;
		
		// Adjust initialPoint and terminalPoint to the position of the vertex
		initialPoint = math.add(vertex, initialPoint);
		terminalPoint = math.add(vertex, terminalPoint);

		// Transform point coordinates to draw it in the SVG element.
		initialPoint = this.transformCoordinates(initialPoint);
		terminalPoint = this.transformCoordinates(terminalPoint);


		// Generate path data string using template literals (https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths)
        // Uppercase letter => absolute coordinate
        // Lowercase letter => relative coordinate 
        // M or m: move to x, y
        // A or a: section of circle or ellipse rx ry x-axis-rotation large-arc-flag sweep-flag x y (if rx=ry circle)
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

	/**
    drawPath(coordinates, controlPoint, color) {
        // https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths
        // M x y: moves to absolute coordinate x, y
        // Q x1 y1, x y: Quadratic Bézier curve (x1, y1) is the control point and (x, y) is the last point of the curve.
        // T x y: Quadratic Bézier curve (x, y) is the last point of the curve, infers control point from previous curve.

        // Check if there are at least two coordinates
        if (coordinates.length < 2) {
            throw new Error('The coordinate list must contain at least two values.');
        }

        // Validate coordinates
        for (let i = 0; i < coordinates.length; i++) {
            validateCoordinates2D(coordinates[i]);
        }

        // Transform coodinates
        const svgCoordinates = [[0,0,0]];
        for (let i = 0; i < coordinates.length; i++) {
            svgCoordinates[i] = this.transformCoordinates(coordinates[i]);
        }
        let svgControlPoint = this.transformCoordinates(controlPoint);

        // Start the path chain with the movement to the first point and the first Q curve
        let pathData = `M ${svgCoordinates[0].join(' ')} Q ${svgControlPoint.join(' ')} ${svgCoordinates[1].join(' ')}`;

        // Iterate over the remaining coordinates, using T for subsequent curves.
        for (let i = 2; i < svgCoordinates.length; i++) {
            pathData += ` T ${svgCoordinates[i].join(' ')}`;
        }

        // Create the path element 
		const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
		path.setAttribute("d", pathData);
		path.setAttribute("fill", "none");
		path.setAttribute("stroke", color);
		path.setAttribute("stroke-width", "1");

		// Append the path element to the SVG
		this.svgElement.appendChild(path);
    }
    */
	
	/**
	 * Plots a series of 2D points as a continuous line within an SVG element.
	 * The function generates an SVG <path> element using 'M' (moveto) for the
	 * first point and 'L' (lineto) for subsequent points, connecting them with
	 * straight line segments.
	 *
	 * @param {SVGElement} svgElement - The SVG element where the path will be drawn.
	 * @param {Array<[number, number]>} points - An ordered list of 2D points,
	 * where each point is an array `[x, y]`.
	 * @param {string} [strokeColor="#3366FF"] - The color of the line stroke. Defaults to a blue.
	 * @param {number} [strokeWidth=2] - The width of the line stroke in pixels. Defaults to 2.
	 * @param {string} [fillColor="none"] - The fill color of the path. Defaults to "none" for a line.
	 * @returns {SVGPathElement} The created SVG <path> element.
	 * @throws {Error} If the `points` array is empty or not an array.
	 */
	drawPath(points, color) {
	    // Check if there are at least two coordinates
		if (coordinates.length < 2) {
			throw new Error('The coordinate list must contain at least two values.');
		}

		// Validate coordinates
		for (let i = 0; i < coordinates.length; i++) {
			validateCoordinates2D(coordinates[i]);
		}

		// Transform coodinates
		const svgCoordinates = [[0,0]];
		for (let i = 0; i < coordinates.length; i++) {
			svgCoordinates[i] = this.transformCoordinates(coordinates[i]);
		}
	        
	    // Create an SVG path element
	    const pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
	
	    // Construct the 'd' attribute string for the path
	    // Start with 'M' (moveto) to the first point
	    let pathData = `M ${svgCoordinates[0][0]},${svgCoordinates[0][1]}`;
	
	    // Loop through the rest of the points and add 'L' (lineto) commands
	    for (let i = 1; i < svgCoordinates.length; i++) {
	        pathData += ` L ${svgCoordinates[i][0]},${svgCoordinates[i][1]}`;
	    }
	
	    // Set the 'd' attribute with the generated path data
	    pathElement.setAttribute("d", pathData);
	
	    // Set styling attributes
		pathElement.setAttribute("fill", "none");
		pathElement.setAttribute("stroke", color);
		pathElement.setAttribute("stroke-width", "1");
	
	    // Append the path element to the provided SVG element
	    this.svgElement.appendChild(pathElement);
	}

	  /**
	 * Draws a vector in the Cartesian plane using an existing marker created earlier (only for brown, blue or green colors).
	 * 
	 * @param {number[]} initialPoint - The starting point coordinates of the vector in the Cartesian plane ([x, y]).
	 * @param {number[]} vectorComponents - The components of the vector in the Cartesian plane ([x, y]).
	 * @param {object} lineAttributes - An object containing style attributes for the vector (default values are applied if omitted).
	 *                 * `strokeColor` (string): The color of the line (default: "brown").
	 *                 * `strokeWidth` (number): The width of the line in pixels (default: 2).
	 *                 * `strokeDasharray` (string): The dash pattern for the line (default: "none").
	 *                 * `showArrow` (boolean): Whether to draw an arrowhead at the end of the line (default: true).
	 * @param {object} textAttributes - An object containing style attributes for the label (default values are applied if omitted).
	 *                 * `textContent` (string): The text content of the label (default: "").
	 *                 * `corner` (string): The position of the label relative to the vector ("righttop", "rightbottom", "lefttop", or "leftbottom", default: "rightbottom").
	 * 
	 * @throws {TypeError} If either initialPoint or vectorComponents is not a number array of length 2.
	 * @throws {ValueError} If any element in initialPoint or vectorComponents is not a number.
	 * @throws {TypeError} If either lineAttributes or textAttributes is not an object.
	 */
	drawVector(initialPoint, vectorComponents, textContent = "", lineAttributes = {}, textAttributes = {}) {
		// Validate coordinates1 and coordinates2.
		[initialPoint, vectorComponents].every(arr => validateCoordinates2D(arr));

		// Validate lineAttributes and textAttributes
		[lineAttributes,textAttributes].every(arr => validateObject(arr));

		// Destructure the object and set default values
		const {strokeColor = "brown", strokeWidth = 2, strokeDasharray = "none", showArrow = true} = lineAttributes;
		const { corner = "rightbottom"} = textAttributes;

		//Calculate vector endpoint using initial point and vector components.
		const endPoint = math.add(initialPoint, vectorComponents);

		// Transform points coordinates to draw it in the SVG element and destructure the coordinates array
		const [initialXTransformed, initialYTransformed] = this.transformCoordinates(initialPoint);
		const [endXTransformed, endYTransformed] = this.transformCoordinates(endPoint);

		// Draw the vector
		drawSegment(this.svgElement, initialXTransformed, initialYTransformed, endXTransformed, endYTransformed, strokeColor, strokeWidth, strokeDasharray, showArrow);

		// Draw label if defined
		if (textContent != "") {
			const half = vectorComponents.map(element => element / 2);
			const position = math.add(initialPoint, half);
			textAttributes.fill = strokeColor;
			this.drawLabel(position, textContent, textAttributes);
		}
	}
	
	  /**
	 * Draws the label of an element giving coordinates of a baseline point, the label text, 
	 * the corner parameter: "righttop", "rightbottom", "lefttop" or "leftbottom"
	 * and apply some style attributes.
	 * 
	 * @param {number[]} baselinePoint - The coordinates of the baseline point in the Cartesian plane ([x, y]).
	 * @param {object} textAttributes - An object containing style attributes for the label (default values are applied if omitted).
	 *                 * `textContent` (string): The text content of the label (default: "").
	 *                 * `fontSize` (number): The font size of the label in pixels (default: 12).
	 *                 * `stroke` (string): The color of the label stroke (default: "none").
	 *                 * `fill` (string): The color to fill the label (default: "brown").
	 *                 * `fontWeight` (string): The font weight of the label (default: "normal").
	 *                 * `corner` (string): The position of the label relative to the baseline point ("righttop", "rightbottom", "lefttop", or "leftbottom", default: "rightbottom").
	 * 
	 * @throws {TypeError} If baselinePoint is not a number array of length 2.
	 * @throws {ValueError} If any element in baselinePoint is not a number.
	 * @throws {TypeError} If textAttributes is not an object.
	 */
	drawLabel(baselinePoint, textContent, textAttributes = {}) {
		// Validade baselinePoint
		validateCoordinates2D(baselinePoint);

		//validate textAttributes
		validateObject(textAttributes);
		
		// destructure textAttributes and assign default values
		const {fontSize = 20, stroke = "none", fill = "brown",  fontWeight = "normal", corner = "rightbottom"} = textAttributes;
		
		// Transform point coordinates to draw it in the SVG element and destructure the coordinates array.
		const [xPosition, yPosition] = this.transformCoordinates(baselinePoint);

		// Write the text
		writeText(this.svgElement, textContent, xPosition, yPosition, fontSize, stroke, fill, fontWeight, corner);
	}

	

	/**
	 * Draws the x and y axes of the Cartesian plane within the SVG element, along with axis labels and an optional origin label.
	 * 
	 * This method uses the `drawVector` and `drawLabel` methods to create the axes with arrowheads and labels.
	 * 
	 * @param {string} yAxisText - The text to display for the y-axis label.
	 * @param {string} xAxisText - The text to display for the x-axis label.
	 * @param {string} originText - The text to display at the origin (optional).
	 */
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
			xAxisTextElement.setAttribute("x", this.svgWidthNum);
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
			this.drawLabel([0-0.2, 0], originText, {fontSize: 22, fill: "brown"});
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
		this.drawLabel([planeWidht*4/9, 0, planeWidht/100], "x", {});

		// y-axis
		this.drawVector([0, -planeHeight/6, 0], [0, planeHeight*3/4, 0]);
		this.drawLabel([0, planeHeight*5/9, planeWidht/100], "y", {});

		//z-axis
		this.drawVector([0, 0, -planeWidht/6], [0, 0, planeWidht*3/4]);
		this.drawLabel([0, -planeWidht/100, planeWidht*5/9], "z", {corner: "righttop"});
		
		// Origin.
		this.drawLabel([0, 0-0.1, 0], "O", {});
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
	drawVector(initialPoint, vectorComponents, textContent = "", lineAttributes = {}, textAttributes = {}
	) {
		// Validate coordinates1 and coordinates2.
		[initialPoint, vectorComponents].every(arr => validateCoordinates3D(arr));

		// Validate lineAttributes and textAttributes
		[lineAttributes, textAttributes].every(arr	=> validateObject(arr));

		// Destructure lineAttributes and textAttributes, and set its default values
		const {strokeColor = "brown", strokeWidth = 2, strokeDasharray = "none", showArrow = true} = lineAttributes;
		const {corner = "rightbottom", fill} = textAttributes;

		//Calculate vector endpoint using initial point and vector components.
		const endPoint = math.add(initialPoint, vectorComponents);

		// Transform points coordinates to draw it in the SVG element and destructure the coordinates array
		const [initialXTransformed, initialYTransformed] = this.transformCoordinates(initialPoint);
		const [endXTransformed, endYTransformed] = this.transformCoordinates(endPoint);
		
		// Draw the vector
		drawSegment(this.svgElement, initialXTransformed, initialYTransformed, endXTransformed, endYTransformed, strokeColor, strokeWidth, strokeDasharray, showArrow);

		// Draw label if defined
		if (textContent != "") {
			const half = vectorComponents.map(element => element / 2);
			const position = math.add(initialPoint, half);
			textAttributes.fill = strokeColor;
			this.drawLabel(position, textContent, textAttributes);
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
	drawLabel(baselinePoint, textContent, textAttributes = {}) {
		// Validate coordinates1 and coordinates2.
		validateCoordinates3D(baselinePoint);

		// Validate textAttributes
		validateObject(textAttributes);

		// Destructure textAttributes, and set its default values
		const {fontSize = 20, stroke = "none", fill = "brown",  fontWeight = "normal", corner = "rightbottom"} = textAttributes;

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

    drawPath(coordinates, controlPoint, color) {
        // Verify if there are at least three values, point, point and control point for the quadratic bezier curve
        // https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths
        // M x y: moves to absolute coordinate x, y
        // Q x1 y1, x y: Quadratic Bézier curve (x1, y1) is the control point and (x, y) is the last point of the curve.
        // T x y: Quadratic Bézier curve (x, y) is the last point of the curve, infers control point from previous curve.

        // Check if there are at least three coordinates
        if (coordinates.length < 2) {
            throw new Error('The coordinate list must contain at least two values.');
        }

        // Validate coordinates
        for (let i = 0; i < coordinates.length; i++) {
            validateCoordinates3D(coordinates[i]);
        }

        // Transform coodinates
        const svgCoordinates = [[0,0,0]];
        for (let i = 0; i < coordinates.length; i++) {
            svgCoordinates[i] = this.transformCoordinates(coordinates[i]);
        }
        let svgControlPoint = this.transformCoordinates(controlPoint);

        // Start the path chain with the movement to the first point and the first Q curve
        let pathData = `M ${svgCoordinates[0].join(' ')} Q ${svgControlPoint.join(' ')} ${svgCoordinates[1].join(' ')}`;

        // Iterate over the remaining coordinates, using T for subsequent curves.
        for (let i = 2; i < svgCoordinates.length; i++) {
            pathData += ` T ${svgCoordinates[i].join(' ')}`;
        }

        // Create the path element 
		const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
		path.setAttribute("d", pathData);
		path.setAttribute("fill", "none");
		path.setAttribute("stroke", color);
		path.setAttribute("stroke-width", "1");

		// Append the path element to the SVG
		this.svgElement.appendChild(path);
    }
}

function renderMathExpression(elementId, expression) {
	// Parse the expression using Math.js
	const node = math.parse(expression);

	// Convert the parsed expression to LaTeX
	const latex = node.toTex({parenthesis: 'keep'});

	// Use MathJax to render the LaTeX expression
	elementId.innerHTML = '';
	elementId.innerHTML = MathJax.tex2svg(latex).outerHTML;
}

/**
 * Generates an ordered list of 2D points (x, y) for a given mathematical function
 * over a specified interval. The x-coordinates are equally spaced within the interval.
 *
 * @param {function(number): number} func - The mathematical function to evaluate.
 * It should take a single number as input and return a number.
 * @param {number} intervalStart - The inclusive starting point (inferior limit) of the interval.
 * @param {number} intervalEnd - The inclusive ending point (superior limit) of the interval.
 * @param {number} numberOfPoints - The total number of points to generate. Must be an integer greater than or equal to 2.
 * @returns {Array<[number, number]>} An ordered list of points, where each point is an array `[x, y]`.
 * The list starts with the point at `intervalStart` and ends with the point at `intervalEnd`.
 * @throws {Error} If `numberOfPoints` is less than 2, or if `intervalStart` is greater than `intervalEnd`.
 */
function generateFunctionPoints(func, intervalStart, intervalEnd, numberOfPoints) {
    if (numberOfPoints < 2) {
        throw new Error("numberOfPoints must be an integer greater than or equal to 2 to define an interval.");
    }
    if (intervalStart > intervalEnd) {
        throw new Error("intervalStart cannot be greater than intervalEnd.");
    }

    const points = [];
    const step = (intervalEnd - intervalStart) / (numberOfPoints - 1);

    for (let i = 0; i < numberOfPoints; i++) {
        const x = intervalStart + i * step;
        const y = func(x);
        points.push([x, y]);
    }

    return points;
}

