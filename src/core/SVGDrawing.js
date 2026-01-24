
// src/drawing/SVGDrawing.js

// Import mathjs for mathematical expression parsing and conversion to LaTeX
import * as math from "mathjs";

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
export function createMarkerArrow(id, fillColor) {
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
 * Ensure a single hidden SVG with shared <defs> exists in the document containing
 * the arrow marker definitions. Safe to call multiple times (idempotent).
 */
export function ensureSharedMarkerDefs() {
	if (document.getElementById('shared-svg-markers')) return;
	const NS = 'http://www.w3.org/2000/svg';
	const sharedSvg = document.createElementNS(NS, 'svg');
	sharedSvg.id = 'shared-svg-markers';
	sharedSvg.setAttribute('style', 'position:absolute;width:0;height:0;overflow:hidden;pointer-events:none');
	const defs = document.createElementNS(NS, 'defs');
	defs.appendChild(createMarkerArrow('Brownarrow', 'brown'));
	defs.appendChild(createMarkerArrow('Bluearrow', 'blue'));
	defs.appendChild(createMarkerArrow('Greenarrow', 'green'));
	sharedSvg.appendChild(defs);
	const appendToBody = () => document.body.appendChild(sharedSvg);
	if (document.body) appendToBody(); else document.addEventListener('DOMContentLoaded', appendToBody, {once:true});
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
export function drawSegment(svgElement, x1, y1, x2, y2, strokeColor, strokeWidth, strokeDasharray, showArrow) {
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
export function drawCircle(svgElement, centreX, centreY, color, radius) {
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
export function textWithSubscript(regular, subscript) {
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
 * Renders a mathematical expression written in Math.js syntax into an HTML element using MathJax for LaTeX rendering.
 *
 * @param {HTMLElement} elementId The HTML element where the mathematical expression will be rendered.
 * @param {string} expression The mathematical expression to be rendered, written in a format parsable by Math.js (e.g., "x = x_0 + v_0*t + 1/2*a*t^2").
 * @returns {void}
 */
export function renderMathExpression(elementId, expression) {
	// Parse the expression using Math.js
	const node = math.parse(expression);

	// Convert the parsed expression to LaTeX
	const latex = node.toTex({parenthesis: 'keep'});

	// Use MathJax to render the LaTeX expression
	elementId.innerHTML = '';
	elementId.innerHTML = MathJax.tex2svg(latex).outerHTML;
}

/**
 * Writes a value to an element's innerHTML.
 * If the value is an array, joins its elements with commas and spaces.
 * Otherwise, sets the innerHTML to the value directly.
 * @param {string} elementId - The ID of the element to update.
 * @param {Array|string|number} value - The value to write to the element.
 */
export function writeValue(elementId, value) {
	const element = document.getElementById(elementId);
	if (!element) return;
	if (Array.isArray(value)) {
		element.innerHTML = value.join(", ");
	} else {
		element.innerHTML = value;
	}
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
export function writeText(svgElement, text, x, y, fontSize, stroke, fill, fontWeight, corner = "rightbottom") {
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
export function writeVerticalText(svgElement, text, x, y, fontSize, stroke, fill) {
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
export function generateFunctionPoints(func, intervalStart, intervalEnd, numberOfPoints) {
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

/**
Validates if the input is a valid object (not null).
@param {*} input - The value to be validated.
@throws {TypeError} If the input is not an object or is null. 
*/ 
export function validateObject(input) {
	if (typeof input !== 'object' || input === null) {
		throw new TypeError("This parameter must be an object.");
	}
}	