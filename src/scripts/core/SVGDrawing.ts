import * as math from 'mathjs';

/**
 * Creates an SVG marker element with a given ID and fill color.
 *
 * This function creates a marker element that can be used to add arrowheads to lines in an SVG.
 * The marker has a triangular shape with the specified fill color.
 *
 * @param id - The unique identifier for the marker element.
 * @param fillColor - The color to fill the marker (e.g., "brown", "blue").
 *
 * @returns The newly created SVG marker element.
 */
export function createMarkerArrow(id: string, fillColor: string): SVGMarkerElement {
    const marker = document.createElementNS("http://www.w3.org/2000/svg", "marker");
    marker.setAttribute("id", id);
    marker.setAttribute("viewBox", "0 0 10 10");
    marker.setAttribute("refX", "10");
    marker.setAttribute("refY", "5");
    marker.setAttribute("markerWidth", "6");
    marker.setAttribute("markerHeight", "6");
    marker.setAttribute("orient", "auto-start-reverse");

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M 0 0 L 10 5 L 0 10 z");
    path.setAttribute("stroke", fillColor);
    path.setAttribute("fill", fillColor);

    marker.appendChild(path);
    return marker;
}

/**
 * Ensure a single hidden SVG with shared <defs> exists in the document containing
 * the arrow marker definitions. Safe to call multiple times (idempotent).
 * @returns {void}
 */
export function ensureSharedMarkerDefs(): void {
    if (document.getElementById('shared-svg-markers')) return;
    const NS = 'http://www.w3.org/2000/svg';
    const sharedSvg = document.createElementNS(NS, 'svg');
    sharedSvg.id = 'shared-svg-markers';
    sharedSvg.setAttribute('style', 'position:absolute;width:0;height:0;overflow:hidden;pointer-events:none');
    const defs = document.createElementNS(NS, 'defs');
    defs.appendChild(createMarkerArrow('Brownarrow', 'brown'));
    defs.appendChild(createMarkerArrow('Bluearrow', 'blue'));
    defs.appendChild(createMarkerArrow('Greenarrow', 'green'));
    defs.appendChild(createMarkerArrow('Redarrow', 'red'));
    defs.appendChild(createMarkerArrow('Orangearrow', 'orange'));
    defs.appendChild(createMarkerArrow('Purplearrow', 'purple'));
    defs.appendChild(createMarkerArrow('DarkKhakiarrow', 'darkKhaki'));
    defs.appendChild(createMarkerArrow('CornflowerBluearrow', 'cornflowerBlue'));
    defs.appendChild(createMarkerArrow('Siennaarrow', 'sienna'));
    sharedSvg.appendChild(defs);
    const appendToBody = () => document.body.appendChild(sharedSvg);
    if (document.body) appendToBody(); else document.addEventListener('DOMContentLoaded', appendToBody, { once: true });
}

/**
 * Draws a line segment in an SVG element with specified styling.
 *
 * This function creates an SVG line element and sets its attributes based on the provided parameters.
 * It also allows for adding an arrowhead to the end of the line based on the `showArrow` flag and stroke color.
 *
 * @param svgElement - The SVG element where the line segment will be appended.
 * @param x1 - The x-coordinate of the starting point.
 * @param y1 - The y-coordinate of the starting point.
 * @param x2 - The x-coordinate of the ending point.
 * @param y2 - The y-coordinate of the ending point.
 * @param strokeColor - The color of the line stroke (e.g., "brown", "blue").
 * @param strokeWidth - The width of the line stroke.
 * @param strokeDasharray - The dash pattern of the line stroke (e.g., "none", "5, 3").
 * @param showArrow - A flag indicating whether to add an arrowhead to the end of the line.
 * @returns {void}
 */
export function drawSegment(svgElement: SVGElement, x1: number, y1: number, x2: number, y2: number, strokeColor: string, strokeWidth: number, strokeDasharray: string, showArrow: boolean): void {
    // Create the line element with styling
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", x1.toString());
    line.setAttribute("y1", y1.toString());
    line.setAttribute("x2", x2.toString());
    line.setAttribute("y2", y2.toString());
    line.setAttribute("stroke", strokeColor);
    line.setAttribute("stroke-width", strokeWidth.toString());
    line.setAttribute("stroke-dasharray", strokeDasharray);
    if (showArrow) {
        switch (strokeColor) {
            case "brown":
                line.setAttribute("marker-end", "url(#Brownarrow)");
                break;
            case "blue":
                line.setAttribute("marker-end", "url(#Bluearrow)");
                break;
            case "green":
                line.setAttribute("marker-end", "url(#Greenarrow)");
                break;
            case "red":
                line.setAttribute("marker-end", "url(#Redarrow)");
                break;
            case "orange":
                line.setAttribute("marker-end", "url(#Orangearrow)");
                break;
            case "purple":
                line.setAttribute("marker-end", "url(#Purplearrow)");
                break;
            case "darkKhaki":
                line.setAttribute("marker-end", "url(#DarkKhakiarrow)");
                break;
            case "cornflowerBlue":
                line.setAttribute("marker-end", "url(#CornflowerBluearrow)");
                break;
            case "Sienna":
                line.setAttribute("marker-end", "url(#Siennaarrow)");
                break;
        }
    }
    // Append the line element to the SVG element
    svgElement.appendChild(line);
}

/**
 * Draws a circle element in an SVG element with specified center coordinates, color, and radius.
 *
 * @param svgElement - The SVG element where the circle will be drawn.
 * @param centreX - The x-coordinate of the circle's center.
 * @param centreY - The y-coordinate of the circle's center.
 * @param color - The color of the circle's stroke and fill.
 * @param radius - The radius of the circle.
 * @returns {void}
 */
export function drawCircle(svgElement: SVGElement, centreX: number, centreY: number, color: string, radius: number): void {
    // Create a new circle element.
    const circleElement = document.createElementNS("http://www.w3.org/2000/svg", "circle");

    circleElement.setAttribute("cx", centreX.toString());
    circleElement.setAttribute("cy", centreY.toString());
    circleElement.setAttribute("r", radius.toString());
    circleElement.setAttribute("stroke", color);
    circleElement.setAttribute("fill", color);

    // Append the circle element to the SVG.
    svgElement.appendChild(circleElement);
}

/**
 * Returns an SVG text element with a regular text followed by a subscript text.
 *
 * @param regular - The main text content.
 * @param subscript - The subscript text content.
 * @returns An SVG text element containing the regular text and subscript.
 */
export function textWithSubscript(regular: string, subscript: string): SVGTextElement {
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.appendChild(document.createTextNode(regular));

    const subscriptSpan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
    subscriptSpan.appendChild(document.createTextNode(subscript));
    subscriptSpan.setAttribute("baseline-shift", "-0.3em");
    subscriptSpan.setAttribute("style", "font-size: 90%");

    text.appendChild(subscriptSpan);
    return text;
}

/**
 * Writes text within an SVG element with specified content, positioning, and styling.
 *
 * @param svgElement - The SVG element where the text will be written.
 * @param text - The content of the text element (string) or an existing SVGTextElement.
 * @param x - The x-coordinate of the text element's anchor point.
 * @param y - The y-coordinate of the text element's anchor point.
 * @param fontSize - The font size of the text in pixels.
 * @param stroke - The color of the text stroke (outline).
 * @param fill - The color for filling the text.
 * @param fontWeight - The font weight (e.g., "normal", "bold").
 * @param corner - The corner of the text element to be positioned at the specified coordinates.
 *                 It can be "righttop", "rightbottom", "lefttop", or "leftbottom". Defaults to "rightbottom".
 *
 * @throws {Error} If an invalid value is provided for the `corner` parameter.
 * @throws {TypeError} If `text` is not a string or SVGTextElement.
 * @returns {void}
 */
export function writeText(svgElement: SVGElement, text: string | SVGTextElement, x: number, y: number, fontSize: number, stroke: string, fill: string, fontWeight: string, corner: string = "rightbottom"): void {
    let svgTextElement: SVGTextElement;

    if (typeof text === "string") {
        // Creates a new SVG text element and sets its text content.
        svgTextElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
        svgTextElement.textContent = text;
    } else if (text instanceof SVGTextElement) {
        // Use the provided SVGTextElement directly
        svgTextElement = text;
    } else {
        // Throw an error for unexpected types
        throw new TypeError("Invalid type for 'text' parameter. Expected string, SVGTextElement.");
    }

    // Set attributes for id, positioning and styling
    svgTextElement.setAttribute("x", x.toString());
    svgTextElement.setAttribute("y", y.toString());
    svgTextElement.setAttribute("font-size", fontSize.toString());
    svgTextElement.setAttribute("stroke", stroke);
    svgTextElement.setAttribute("fill", fill);
    svgTextElement.setAttribute("font-weight", fontWeight);

    // Handles different corner values to position the text element.
    switch (corner) {
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
            throw new Error("Invalid value for corner input: Expecting 'righttop', 'rightbottom', 'lefttop' or 'leftbottom'.");
    }

    // Add the text element to the SVG
    svgElement.appendChild(svgTextElement);
}

// Declare MathJax globally for TypeScript
declare const MathJax: any;

/**
 * Writes a LaTeX math expression within an SVG element at specified coordinates.
 *
 * @param svgElement - The SVG element where the math will be drawn.
 * @param latex - The LaTeX expression.
 * @param x - The x-coordinate.
 * @param y - The y-coordinate.
 * @param scale - Scaling factor.
 * @param color - Fill color.
 * @param dx - Horizontal offset in pixels.
 * @param dy - Vertical offset in pixels.
 * @param rotation - Rotation angle in degrees.
 * @returns {void}
 */
export function writeMath(svgElement: SVGElement, latex: string, x: number, y: number, scale: number = 1, color: string = "brown", dx: number = 0, dy: number = 0, rotation: number = 0): void {
    if (typeof MathJax === 'undefined') {
        console.error("MathJax is not loaded.");
        return;
    }

    try {
        const container = MathJax.tex2svg(latex);
        const svg = container.querySelector("svg");

        if (svg) {
            const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
            g.setAttribute("transform", `translate(${x + dx}, ${y + dy}) rotate(${rotation}) scale(${scale})`);
            g.style.color = color;
            g.appendChild(svg);
            svgElement.appendChild(g);
        }
    } catch (e) {
        console.error("Error rendering math:", e);
    }
}

/**
 * Renders a mathematical expression written in Math.js syntax into an HTML element using MathJax v3.
 * This function assumes MathJax.startup.promise has already resolved.
 *
 * @param element - The HTML element where the mathematical expression will be rendered.
 * @param expression - The mathematical expression to be rendered, written in Math.js syntax.
 * @returns {Promise<void>}
 */
export async function renderMathExpression(element: HTMLElement, expression: string): Promise<void> {
    // Parse the expression using Math.js
    const node = math.parse(expression);

    // Convert the parsed expression to LaTeX
    const latex = node.toTex({ parenthesis: 'keep' });

    // Clear previous content
    element.innerHTML = '';

    // Render using MathJax v3 (asynchronous)
    const svgNode = await MathJax.tex2svgPromise(latex);

    // Convert the internal MathJax node to an actual SVG string
    const svgString = MathJax.startup.adaptor.outerHTML(svgNode);

    // Insert into the DOM
    element.innerHTML = svgString;
}

/**
 * Renders a LaTeX math expression into an SVG using MathJax v3.
 * This function assumes MathJax.startup.promise has already resolved.
 *
 * @param elementId - The ID of the HTML element where the SVG will be inserted.
 * @param latex - The LaTeX expression to render.
 * @returns {void}
 */
export function renderMathExpressionSVG(elementId: string, latex: string): void {
    // Convert the LaTeX string into an SVG using MathJax v3.
    // tex2svg returns a DOM element containing the SVG.
    const svg = MathJax.tex2svg(latex).querySelector("svg");

    // Get the target element where the SVG will be placed.
    const container = document.getElementById(elementId);

    if (container) {
        // Clear any previous content to avoid duplicate renderings.
        container.innerHTML = "";

        // Insert the generated SVG into the page.
        if (svg) {
            container.appendChild(svg);
        }
    }
}

/**
 * Writes a value to an element's innerHTML.
 * If the value is an array, joins its elements with commas and spaces.
 * Otherwise, sets the innerHTML to the value directly.
 * @param elementId - The ID of the element to update.
 * @param value - The value to write to the element.
 * @returns {void}
 */
export function writeValue(elementId: string, value: any[] | string | number): void {
    const element = document.getElementById(elementId);
    if (!element) return;
    if (Array.isArray(value)) {
        element.innerHTML = value.join(", ");
    } else {
        element.innerHTML = value.toString();
    }
}

/**
 * Generates an ordered list of 2D points (x, y) for a given mathematical function
 * over a specified interval. The x-coordinates are equally spaced within the interval.
 *
 * @param func - The mathematical function to evaluate.
 * It should take a single number as input and return a number.
 * @param intervalStart - The inclusive starting point (inferior limit) of the interval.
 * @param intervalEnd - The inclusive ending point (superior limit) of the interval.
 * @param numberOfPoints - The total number of points to generate. Must be an integer greater than or equal to 2.
 * @returns An ordered list of points, where each point is an array `[x, y]`.
 * The list starts with the point at `intervalStart` and ends with the point at `intervalEnd`.
 * @throws {Error} If `numberOfPoints` is less than 2, or if `intervalStart` is greater than `intervalEnd`.
 */
export function generateFunctionPoints(func: (x: number) => number, intervalStart: number, intervalEnd: number, numberOfPoints: number): [number, number][] {
    if (numberOfPoints < 2) {
        throw new Error("numberOfPoints must be an integer greater than or equal to 2 to define an interval.");
    }
    if (intervalStart > intervalEnd) {
        throw new Error("intervalStart cannot be greater than intervalEnd.");
    }

    const points: [number, number][] = [];
    const step = (intervalEnd - intervalStart) / (numberOfPoints - 1);

    for (let i = 0; i < numberOfPoints; i++) {
        const x = intervalStart + i * step;
        const y = func(x);
        points.push([x, y]);
    }

    return points;
}

/**
 * Validates if the input is a valid object (not null).
 * @param input - The value to be validated.
 * @throws {TypeError} If the input is not an object or is null.
 * @returns {void}
 */
export function validateObject(input: any): void {
    if (typeof input !== 'object' || input === null) {
        throw new TypeError("This parameter must be an object.");
    }
}