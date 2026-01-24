// imports necessary for the EuclideanSpace class
import { validateObject,
    writeText,
    drawCircle,
    drawSegment
} from './SVGDrawing.js';

// Import the math library 
import * as math from 'mathjs';
// Cuando lo integremos, recordar añadir node_modules/ al archivo .gitignore en la raíz del proyecto.

/**
	Represents a Euclidean space within an SVG element. 
*/
export class EuclideanSpace {
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
		const planeWidth = this.svgWidthNum/this.spaceScale;

		// x-axis
		this.drawVector([-planeWidth/6, 0, 0], [planeWidth*5/8, 0, 0]);
		this.drawLabel([planeWidth*4/9, 0, planeWidth/100], "x", {});

		// y-axis
		this.drawVector([0, -planeHeight/6, 0], [0, planeHeight*3/4, 0]);
		this.drawLabel([0, planeHeight*5/9, planeWidth/100], "y", {});

		//z-axis
		this.drawVector([0, 0, -planeWidth/6], [0, 0, planeWidth*3/4]);
		this.drawLabel([0, -planeWidth/100, planeWidth*5/9], "z", {corner: "righttop"});
		
		// Origin.
		this.drawLabel([0, 0-0.1, 0], "O", {});
	}

    /**
     * Validates if the input coordinates are an array of length 3 containing numbers.
     *
     * @param {number[]} coordinates - an array representing the coordinates.
     *
     * @throws {TypeError} If the coordinates are not an array.
     * @throws {ValueError} If the coordinates array is not of length 3 or if it contains non-numeric elements or if any of its numeric elements is infinite.
     */
    validateCoordinates3D(coordinates) {
        if (!Array.isArray(coordinates)) {
        throw new TypeError("Invalid coordinates: Expecting an array.");
        }
        if (coordinates.length !== 3) {
        throw new RangeError("Invalid coordinates: Expecting an array with length 3 (x, y and z values).");
        }
        if (!coordinates.every((element) => typeof element === "number" && isFinite(element))) {
        throw new RangeError("Invalid coordinates: Expecting an array containing only finite numbers.");
        }
        // If all conditions pass, the function returns true (implicit return)
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
		this.validateCoordinates3D(coordinates);
		
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
		[initialPoint, endPoint].every(arr => this.validateCoordinates3D(arr));

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
        [initialPoint, vectorComponents].every(arr => this.validateCoordinates3D(arr));

		// Validate lineAttributes and textAttributes
		[lineAttributes, textAttributes].every(arr	=> validateObject(arr));

		// Destructure lineAttributes and textAttributes, and set its default values
		const {strokeColor = "brown", strokeWidth = 2, strokeDasharray = "none", showArrow = true} = lineAttributes;

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
		this.validateCoordinates3D(baselinePoint);

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
		this.validateCoordinates3D(coordinates);

		// Transform point coordinates to draw it in the SVG element and destructure the coordinates array.
		const [xPosition, yPosition] = this.transformCoordinates(coordinates);

		// Draw the point
		drawCircle(this.svgElement, xPosition, yPosition, color, 3);
    }

    drawPath(coordinates, color) {
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
            this.validateCoordinates3D(coordinates[i]);
        }

        // Transform coodinates
        const svgCoordinates = [];
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
}
