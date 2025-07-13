// imports necessary for the CartesianPlane class
import { validateObject,
    writeText,
    writeVerticalText,
    drawCircle,
    drawSegment
} from './SVGDrawing.js';

// Import the math library 
// import * as math from 'mathjs'; lo dejamos en paso hasta que integremos mathjs en el proyecto.
// Cuando lo integremos, recordar añadir node_modules/ al archivo .gitignore en la raíz del proyecto.

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
     * Validates if the input coordinates are an array of length 2 containing numbers.
     *
     * @param {number[]} coordinates - an array representing the coordinates.
     *
     * @throws {TypeError} If the coordinates are not an array.
     * @throws {ValueError} If the coordinates array is not of length 2 or if it contains non-numeric elements or if any of its numeric elements is infinite.
     */
    validateCoordinates2D(coordinates) {
        if (!Array.isArray(coordinates)) {
        throw new TypeError("Invalid coordinates: Expecting an array.");
        }
        if (coordinates.length !== 2) {
        throw new RangeError("Invalid coordinates: Expecting an array with length 2 (x and y values).");
        }
        if (!coordinates.every((element) => typeof element === "number" && isFinite(element))) {
        throw new RangeError("Invalid coordinates: Expecting an array containing only finite numbers.");
        }
        // If all conditions pass, the function returns true (implicit return)
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
		this.validateCoordinates2D(coordinates);
		
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
		[coordinates1, coordinates2].every(arr => this.validateCoordinates2D(arr));

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
		this.validateCoordinates2D(coordinates);

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
		[vertex, initialSide, terminalSide].every(arr => this.validateCoordinates2D(arr));

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
	drawPath(coordinates, color) {
	    // Check if there are at least two coordinates
		if (coordinates.length < 2) {
			throw new Error('The coordinate list must contain at least two values.');
		}

		// Validate coordinates
		for (let i = 0; i < coordinates.length; i++) {
			this.validateCoordinates2D(coordinates[i]);
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
	    let pathData = `M ${svgCoordinates[0].join(' ')}`;
	
	    // Loop through the rest of the points and add 'L' (lineto) commands
	    for (let i = 1; i < svgCoordinates.length; i++) {
	        pathData += ` L ${svgCoordinates[i].join(' ')}`;
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
		[initialPoint, vectorComponents].every(arr => this.validateCoordinates2D(arr));

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
		this.validateCoordinates2D(baselinePoint);

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

// Exports CartesianPlane class by default
export default CartesianPlane;
