// imports necessary for the EuclideanSpace class
import {
    writeText,
    drawCircle,
    drawSegment,
    writeMath
} from './SVGDrawing.ts';
import type { Point3D, LineAttributes, TextAttributes, MathAttributes } from './types.ts';

// Import the math library 
import * as math from 'mathjs';

/**
 * Represents a Euclidean space within an SVG element. 
 */
export class EuclideanSpace {
    /**
     * Constants used throughout the class based on the x-axis skew angle. 
     */
    static readonly cosAngle = Math.cos(45 * Math.PI / 180);
    static readonly sinAngle = Math.sin(45 * Math.PI / 180);

    svgElement: SVGElement;
    svgWidthNum: number;
    svgHeightNum: number;
    spaceScale: number;
    xC: number;
    yC: number;
    zC: number;
    OriginX: number;
    OriginY: number;

    /**
     * Creates a new EuclideanSpace instance.
     * @param svgElement - The SVG element where the space will be drawn.
     * @param centerPoint - The coordinates of the center point in the Euclidean space ([x, y, z]).
     * @param scale - The number of pixels per unit of length in the Euclidean space.
     */
    constructor(svgElement: SVGElement, centerPoint: Point3D, scale: number) {
        // Define the svg element where the euclidean space will be represented
        this.svgElement = svgElement;

        // Get the width and height of the SVG element as strings
        const svgWidth = this.svgElement.getAttribute("width");
        const svgHeight = this.svgElement.getAttribute("height");

        // Convert strings to numbers
        this.svgWidthNum = parseFloat(svgWidth || "0");
        this.svgHeightNum = parseFloat(svgHeight || "0");

        //Set the space scale
        this.spaceScale = scale;

        //Destructure the coordinates of centerPoint
        this.xC = centerPoint[0];
        this.yC = centerPoint[1];
        this.zC = centerPoint[2];

        // SVG canva coordinates of euclidean space origin of coordinates 
        this.OriginX = this.svgWidthNum * EuclideanSpace.sinAngle / 2 - this.yC * this.spaceScale + this.xC * EuclideanSpace.cosAngle * this.spaceScale;
        this.OriginY = this.svgHeightNum * (1 - EuclideanSpace.cosAngle / 2) + this.zC * this.spaceScale - this.xC * EuclideanSpace.cosAngle * this.spaceScale;
    }

    // Draw x, y, z axes and origin in euclidean space.
    drawAxes() {
        const planeHeight = this.svgHeightNum / this.spaceScale;
        const planeWidth = this.svgWidthNum / this.spaceScale;

        // x-axis
        this.drawVector([-planeWidth / 6, 0, 0], [planeWidth * 5 / 8, 0, 0]);
        this.drawMath([planeWidth * 4 / 9, 0, planeWidth / 100], "\\text{x}", {scale: 1.2, dx: -10, dy: -15});

        // y-axis
        this.drawVector([0, -planeHeight / 6, 0], [0, planeHeight * 3 / 4, 0]);
        this.drawMath([0, planeHeight * 5 / 9, planeWidth / 100], "\\text{y}", {scale: 1.2, dx: -10, dy: 15});

        //z-axis
        this.drawVector([0, 0, -planeWidth / 6], [0, 0, planeWidth * 3 / 4]);
        this.drawMath([0, -planeWidth / 100, planeWidth * 5 / 9], "\\text{z}", {scale: 1.2, dx: -10, dy: 4});
        // Origin.
        this.drawMath([0, -0.1, 0], "O", {scale: 1.2, dx: -18, dy: -19});
    }

    /**
     * Validates if the input coordinates contain finite numbers.
     *
     * @param coordinates - an array representing the coordinates.
     *
     * @throws {RangeError} If any of its numeric elements is infinite.
     */
    validateCoordinates3D(coordinates: Point3D): void {
        if (!coordinates.every((element) => isFinite(element))) {
            throw new RangeError("Invalid coordinates: Expecting an array containing only finite numbers.");
        }
    }

    /**
     * Transforms a set of Euclidean space coordinates into SVG element coordinates.
     * @param coordinates - The coordinates in Euclidean space ([x, y, z]).
     * @returns The transformed coordinates in SVG element space ([x, y]). 
     */
    transformCoordinates(coordinates: Point3D): [number, number] {
        // Check if coordinates is a number array of length 3.
        this.validateCoordinates3D(coordinates);

        // Destructure the coordinates array.
        const [x, y, z] = coordinates;

        // Transform the x and y values
        const transformedX = this.OriginX + y * this.spaceScale - x * EuclideanSpace.cosAngle * this.spaceScale;
        const transformedY = this.OriginY - z * this.spaceScale + x * EuclideanSpace.cosAngle * this.spaceScale;

        // Return a new array with transformed coordinates
        return [transformedX, transformedY];
    }

    /**
     * Draws a line segment in the Euclidean space from a starting point to an end point with specific style attributes.
     * @param initialPoint - The starting point coordinates in Euclidean space ([x, y, z]).
     * @param endPoint - The end point coordinates in Euclidean space ([x, y, z]).
     * @param lineAttributes - An object containing style attributes for the line segment.
     */
    drawSegment(initialPoint: Point3D, endPoint: Point3D, lineAttributes: LineAttributes = {}): void {
        // Validate coordinates1 and coordinates2.
        [initialPoint, endPoint].every(arr => this.validateCoordinates3D(arr));

        // Destructure the lineAttributes and set its default values
        const { strokeColor = "brown", strokeWidth = 2, strokeDasharray = "none", showArrow = false } = lineAttributes;

        // Transform points coordinates to draw it in the SVG element and destructure the coordinates array
        const [initialXTransformed, initialYTransformed] = this.transformCoordinates(initialPoint);
        const [endXTransformed, endYTransformed] = this.transformCoordinates(endPoint);

        // draw the segment
        drawSegment(this.svgElement, initialXTransformed, initialYTransformed, endXTransformed, endYTransformed, strokeColor, strokeWidth, strokeDasharray, showArrow);
    }

    /**
     * Draws a vector in the Euclidean space from a starting point to an end point, which is calculated by adding the vector components to the starting point.
     * Optionally, a label can be drawn along the vector.
     * @param initialPoint - The starting point coordinates in Euclidean space ([x, y, z]).
     * @param vectorComponents - The vector components to add to the starting point to define the end point ([x, y, z]).
     * @param textContent - The text content of the label (default: "").
     * @param lineAttributes - An object containing style attributes for the vector.
     * @param textAttributes - An object containing style attributes for the label.
     */
    drawVector(initialPoint: Point3D, vectorComponents: Point3D, textContent: string = "", lineAttributes: LineAttributes = {}, textAttributes: TextAttributes = {}): void {
        // Validate coordinates1 and coordinates2.
        [initialPoint, vectorComponents].every(arr => this.validateCoordinates3D(arr));

        // Destructure lineAttributes and textAttributes, and set its default values
        const { strokeColor = "brown", strokeWidth = 2, strokeDasharray = "none", showArrow = true } = lineAttributes;

        //Calculate vector endpoint using initial point and vector components.
        const endPoint = math.add(initialPoint, vectorComponents) as Point3D;

        // Transform points coordinates to draw it in the SVG element and destructure the coordinates array
        const [initialXTransformed, initialYTransformed] = this.transformCoordinates(initialPoint);
        const [endXTransformed, endYTransformed] = this.transformCoordinates(endPoint);

        // Draw the vector
        drawSegment(this.svgElement, initialXTransformed, initialYTransformed, endXTransformed, endYTransformed, strokeColor, strokeWidth, strokeDasharray, showArrow);

        // Draw label if defined
        if (textContent != "") {
            const half = vectorComponents.map(element => element / 2) as Point3D;
            const position = math.add(initialPoint, half) as Point3D;
            textAttributes.fill = strokeColor;
            this.drawLabel(position, textContent, textAttributes);
        }
    }

    /**
     * Draws a label for an element at a specified baseline point. 
     * The label can be positioned at one of four corners relative to the point ("righttop", "rightbottom", "lefttop", or "leftbottom").
     * 
     * @param baselinePoint - The coordinates of the baseline point in Euclidean space ([x, y, z]).
     * @param textContent - The text content of the label.
     * @param textAttributes - An object containing style attributes for the label.
    */
    drawLabel(baselinePoint: Point3D, textContent: string | SVGTextElement, textAttributes: TextAttributes = {}): void {
        // Validate baselinePoint.
        this.validateCoordinates3D(baselinePoint);

        // Destructure textAttributes, and set its default values
        const { fontSize = 20, stroke = "none", fill = "brown", fontWeight = "normal", corner = "rightbottom" } = textAttributes;

        // Transform point coordinates to draw it in the SVG element and destructure the coordinates array.
        const [xPosition, yPosition] = this.transformCoordinates(baselinePoint);

        // Write the text
        writeText(this.svgElement, textContent, xPosition, yPosition, fontSize, stroke, fill, fontWeight, corner);
    }

    /**
     * Draws a LaTeX math expression at a specified point.
     * 
     * @param baselinePoint - The coordinates of the point in Euclidean space ([x, y, z]).
     * @param latex - The LaTeX expression.
     * @param mathAttributes - An object containing style attributes.
     */
    drawMath(baselinePoint: Point3D, latex: string, mathAttributes: MathAttributes = {}): void {
        this.validateCoordinates3D(baselinePoint);

        const { scale = 1, color = "brown", dx = 0, dy = 0, rotation = 0 } = mathAttributes;

        const [xPosition, yPosition] = this.transformCoordinates(baselinePoint);

        writeMath(this.svgElement, latex, xPosition, yPosition, scale, color, dx, dy, rotation);
    }

    /**
     * Draws a point in the Euclidean space at a specified location.
     * 
     * @param coordinates - The coordinates of the point in Euclidean space ([x, y, z]).
     * @param color - The color of the point.
     */
    drawPoint(coordinates: Point3D, color: string): void {
        // Validate coordinates1 and coordinates2.
        this.validateCoordinates3D(coordinates);

        // Transform point coordinates to draw it in the SVG element and destructure the coordinates array.
        const [xPosition, yPosition] = this.transformCoordinates(coordinates);

        // Draw the point
        drawCircle(this.svgElement, xPosition, yPosition, color, 3);
    }

    /**
     * Plots a series of 3D points as a continuous line within an SVG element.
     *
     * @param coordinates - An ordered list of 3D points.
     * @param color - The color of the line stroke.
     * @throws {Error} If the coordinate list contains fewer than two values.
     */
    drawPath(coordinates: Point3D[], color: string): void {
        // Check if there are at least two coordinates
        if (coordinates.length < 2) {
            throw new Error('The coordinate list must contain at least two values.');
        }

        // Validate coordinates
        for (let i = 0; i < coordinates.length; i++) {
            this.validateCoordinates3D(coordinates[i]);
        }

        // Transform coodinates
        const svgCoordinates: [number, number][] = [];
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