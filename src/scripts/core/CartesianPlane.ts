// imports necessary for the CartesianPlane class
import {
    writeText,
    drawCircle,
    drawSegment,
    writeMath
} from './SVGDrawing.ts';
import type { Point2D, LineAttributes, TextAttributes, MathAttributes } from './types.ts';

// Import the math library 
import * as math from 'mathjs';

/**
* Class to manage the graphical representation of a Cartesian plane within an SVG element.
*/
export class CartesianPlane {
    svgElement: SVGElement;
    xMin: number;
    xMax: number;
    yMin: number;
    yMax: number;
    svgWidthNum: number;
    svgHeightNum: number;
    planeScaleX: number;
    planeScaleY: number;
    OriginX: number;
    OriginY: number;

	/**
	* Create a new CartesianPlane instance.
	* 
	* @param svgElement - The SVG element where the Cartesian plane will be drawn.
	* @param xMin - The minimum value on the x-axis.
	* @param xMax - The maximum value on the x-axis (must be greater than xMin).
	* @param yMin - The minimum value on the y-axis.
	* @param yMax - The maximum value on the y-axis (must be greater than yMin).
	* @param desiredScale - Pixels per unit for the plane scale. Default is 16 pixels per unit.
    *
	* @throws {Error} If xMin is greater than xMax or yMin is greater than yMax.
	*/
	constructor(svgElement: SVGElement, xMin: number, xMax: number, yMin: number, yMax: number, desiredScale: number = 16) {
        this.svgElement = svgElement;

        if (xMin > xMax) {
            throw new Error("Invalid plane dimensions: xMin cannot be greater than xMax.");
        }
        if (yMin > yMax) {
            throw new Error("Invalid plane dimensions: yMin cannot be greater than yMax.");
        }

        this.xMin = xMin;
        this.yMin = yMin;
        this.xMax = xMax;
        this.yMax = yMax;

        this.svgWidthNum = (xMax - xMin) * desiredScale;
        this.svgHeightNum = (yMax - yMin) * desiredScale;

        this.svgElement.setAttribute("width", this.svgWidthNum.toString());
        this.svgElement.setAttribute("height", this.svgHeightNum.toString());
        this.svgElement.setAttribute("viewBox", `0 0 ${this.svgWidthNum} ${this.svgHeightNum}`);

        this.planeScaleX = desiredScale;
        this.planeScaleY = desiredScale;

        this.OriginX = -this.xMin * this.planeScaleX;
        this.OriginY = this.svgHeightNum + this.yMin * this.planeScaleY;
    }

    /**
	 * Draws the x and y axes of the Cartesian plane within the SVG element, along with axis labels and an optional origin label.
	 * 
	 * @param yAxisText - a string representing the text to display for the y-axis label.
	 * @param xAxisText - a string representing the text to display for the x-axis label.
	 * @param originText - The text to display at the origin (optional).
	 */
    drawAxes(yAxisText: string, xAxisText: string, originText: string) {
        // y-axis
        const planeHeight = this.yMax - this.yMin;
        this.drawVector([0, this.yMin], [0, planeHeight]);
        this.drawMath([0, this.yMax], yAxisText, { color: "brown", scale: 1.2, dx: -15, dy: 10 });
        
        // x-axis
        const planeWidth = this.xMax - this.xMin;
        this.drawVector([this.xMin, 0], [planeWidth, 0]);
        this.drawMath([this.xMax, 0], xAxisText, { color: "brown", scale: 1.2, dx: -10, dy: 10 });

        // Origin
        if (originText) {
            this.drawMath([-0.2, 0], `\\text{${originText}}`, { color: "brown", scale: 1.2, dx: -10, dy: 5 });
        }
    }

    /**
     * Validates if the input coordinates contain finite numbers.
     *
     * @param coordinates - an array representing the coordinates.
     *
     * @throws {RangeError} If any of its numeric elements is infinite.
     */
    validateCoordinates2D(coordinates: Point2D): void {
        if (!coordinates.every((element) => isFinite(element))) {
            throw new RangeError("Invalid coordinates: Expecting an array containing only finite numbers.");
        }
    }

    /**
	 * Transforms a set of Cartesian plane coordinates into SVG element coordinates.
	 * 
	 * @param coordinates - An array containing the x and y coordinates of a point in the Cartesian plane.
	 * @returns The transformed coordinates in SVG element space ([x, y]).
	 */
    transformCoordinates(coordinates: Point2D): Point2D {
        this.validateCoordinates2D(coordinates);
        const [x, y] = coordinates;
        const transformedX = this.OriginX + x * this.planeScaleX;
        const transformedY = this.OriginY - y * this.planeScaleY;
        return [transformedX, transformedY];
    }

    /**
	 * Draws a line segment in the Cartesian plane.
	 * 
	 * @param coordinates1 - The starting point coordinates in the Cartesian plane.
	 * @param coordinates2 - The end point coordinates in the Cartesian plane.
	 * @param lineAttributes - An object containing style attributes for the line segment.
	 */
    drawSegment(coordinates1: Point2D, coordinates2: Point2D, lineAttributes: LineAttributes = {}): void {
        this.validateCoordinates2D(coordinates1);
        this.validateCoordinates2D(coordinates2);

        const { strokeColor = "brown", strokeWidth = 2, strokeDasharray = "none", showArrow = false } = lineAttributes;

        const [xPosition1, yPosition1] = this.transformCoordinates(coordinates1);
        const [xPosition2, yPosition2] = this.transformCoordinates(coordinates2);

        drawSegment(this.svgElement, xPosition1, yPosition1, xPosition2, yPosition2, strokeColor, strokeWidth, strokeDasharray, showArrow);
    }

    /**
	 * Draws a point in the Cartesian plane.
	 * 
	 * @param coordinates - The coordinates of the point in the Cartesian plane.
	 * @param color - The color of the point.
	 */
    drawPoint(coordinates: Point2D, color: string): void {
        this.validateCoordinates2D(coordinates);
        const [xPosition, yPosition] = this.transformCoordinates(coordinates);
        drawCircle(this.svgElement, xPosition, yPosition, color, 3);
    }

    /**
	 * Draws a circumference in the Cartesian plane.
	 * 
	 * @param coordinates - The coordinates of the center in the Cartesian plane.
	 * @param radius - The radius of the circumference.
	 * @param lineAttributes - An object containing style attributes for the line.
	 */
    drawCircunference(coordinates: Point2D, radius: number, lineAttributes: LineAttributes = {}): void {
        this.validateCoordinates2D(coordinates);

        const { strokeColor = "brown", strokeWidth = 2, strokeDasharray = "none" } = lineAttributes;
        const [xPosition, yPosition] = this.transformCoordinates(coordinates);
        const transformedRadius = radius * this.planeScaleX;

        const circleElement = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circleElement.setAttribute("cx", xPosition.toString());
        circleElement.setAttribute("cy", yPosition.toString());
        circleElement.setAttribute("r", transformedRadius.toString());
        circleElement.setAttribute("fill", "none");
        circleElement.setAttribute("stroke", strokeColor);
        circleElement.setAttribute("stroke-width", strokeWidth.toString());
        circleElement.setAttribute("stroke-dasharray", strokeDasharray);

        this.svgElement.appendChild(circleElement);
    }

    /**
	 * Draws an arc representing an angle in the Cartesian plane, counter-clockwise from the initial side to the terminal side.
	 * 
	 * @param vertex - The coordinates of the vertex of the angle.
	 * @param initialSide - The initial side vector of the angle.
	 * @param terminalSide - The terminal side vector of the angle.
	 * @param radius - The radius of the arc.
	 * @param lineAttributes - An object containing style attributes for the arc.
	 */
    drawArc(vertex: Point2D, initialSide: Point2D, terminalSide: Point2D, radius: number, lineAttributes: LineAttributes = {}): void {
        this.validateCoordinates2D(vertex);
        this.validateCoordinates2D(initialSide);
        this.validateCoordinates2D(terminalSide);

        const { strokeColor = "brown", strokeWidth = 2, strokeDasharray = "none" } = lineAttributes;

        const normInitial = math.norm(initialSide) as number;
        const normTerminal = math.norm(terminalSide) as number;

        const initialPointOffset: Point2D = [
            (initialSide[0] / normInitial) * radius,
            (initialSide[1] / normInitial) * radius
        ];
        const terminalPointOffset: Point2D = [
            (terminalSide[0] / normTerminal) * radius,
            (terminalSide[1] / normTerminal) * radius
        ];

        const radiusX = radius * this.planeScaleX;
        const radiusY = radius * this.planeScaleY;

        const initialPoint = math.add(vertex, initialPointOffset) as Point2D;
        const terminalPoint = math.add(vertex, terminalPointOffset) as Point2D;

        const transInitialPoint = this.transformCoordinates(initialPoint);
        const transTerminalPoint = this.transformCoordinates(terminalPoint);

        const pathData = `M ${transInitialPoint[0]},${transInitialPoint[1]} A ${radiusX},${radiusY} 0 0 0 ${transTerminalPoint[0]},${transTerminalPoint[1]}`;

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", pathData);
        path.setAttribute("fill", "none");
        path.setAttribute("stroke", strokeColor);
        path.setAttribute("stroke-width", strokeWidth.toString());
        path.setAttribute("stroke-dasharray", strokeDasharray);

        this.svgElement.appendChild(path);
    }

    /**
     * Draws a right angle symbol (square corner) at a vertex defined by two vectors.
     * 
     * @param vertex - The vertex of the angle.
     * @param side1 - Vector along the first side.
     * @param side2 - Vector along the second side.
     * @param size - The size of the square symbol in plane units.
     * @param lineAttributes - Style attributes for the symbol.
     */
    drawRightAngle(vertex: Point2D, side1: Point2D, side2: Point2D, size: number, lineAttributes: LineAttributes = {}): void {
        this.validateCoordinates2D(vertex);
        this.validateCoordinates2D(side1);
        this.validateCoordinates2D(side2);

        const { strokeColor = "brown", strokeWidth = 1, strokeDasharray = "none" } = lineAttributes;

        // Normalize direction vectors
        const norm1 = math.norm(side1) as number;
        const norm2 = math.norm(side2) as number;
        
        const u1 = [side1[0]/norm1, side1[1]/norm1] as Point2D;
        const u2 = [side2[0]/norm2, side2[1]/norm2] as Point2D;

        // Calculate corner points relative to vertex
        const p1 = [u1[0]*size, u1[1]*size] as Point2D;
        const p2 = [u2[0]*size, u2[1]*size] as Point2D;
        // p3 completes the parallelogram (square if vectors are perpendicular)
        const p3 = [p1[0]+p2[0], p1[1]+p2[1]] as Point2D;

        // Absolute coordinates
        const P1 = math.add(vertex, p1) as Point2D;
        const P2 = math.add(vertex, p2) as Point2D;
        const P3 = math.add(vertex, p3) as Point2D;

        // Transform to SVG coordinates
        const tP1 = this.transformCoordinates(P1);
        const tP2 = this.transformCoordinates(P2);
        const tP3 = this.transformCoordinates(P3);

        // Draw path P1 -> P3 -> P2
        const pathData = `M ${tP1[0]},${tP1[1]} L ${tP3[0]},${tP3[1]} L ${tP2[0]},${tP2[1]}`;
        
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", pathData);
        path.setAttribute("fill", "none");
        path.setAttribute("stroke", strokeColor);
        path.setAttribute("stroke-width", strokeWidth.toString());
        path.setAttribute("stroke-dasharray", strokeDasharray);

        this.svgElement.appendChild(path);
    }

    /**
     * Draws an angle arc and optionally places a label in the bisector direction.
     * 
     * @param vertex - The vertex of the angle.
     * @param initialSide - Vector for initial side.
     * @param terminalSide - Vector for terminal side.
     * @param radius - Radius of the arc.
     * @param label - Label text (optional).
     * @param lineAttributes - Style for the arc.
     * @param mathAttributes - Style for the label.
     */
    drawAngle(vertex: Point2D, initialSide: Point2D, terminalSide: Point2D, radius: number, label: string = "", lineAttributes: LineAttributes = {}, mathAttributes: MathAttributes = {}): void {
        this.drawArc(vertex, initialSide, terminalSide, radius, lineAttributes);

        if (label) {
            // Calculate bisector vector for label positioning
            const norm1 = math.norm(initialSide) as number;
            const norm2 = math.norm(terminalSide) as number;
            
            const u1 = [initialSide[0]/norm1, initialSide[1]/norm1] as Point2D;
            const u2 = [terminalSide[0]/norm2, terminalSide[1]/norm2] as Point2D;
            
            // Mid vector (bisector)
            const midVec = [u1[0]+u2[0], u1[1]+u2[1]] as Point2D;
            const normMid = math.norm(midVec) as number;
            const uMid = (normMid > 1e-6) ? [midVec[0]/normMid, midVec[1]/normMid] as Point2D : [-u1[1], u1[0]]; // Fallback if 180 deg
            
            const labelRadius = radius * 1.3; 
            const labelPos = math.add(vertex, [uMid[0]*labelRadius, uMid[1]*labelRadius]) as Point2D;
            
            this.drawMath(labelPos, `\\text{${label}}`, mathAttributes);
        }
    }

    /**
	 * Plots a series of 2D points as a continuous line within an SVG element.
	 *
	 * @param coordinates - An ordered list of 2D points.
	 * @param color - The color of the line stroke.
     * @throws {Error} If the coordinate list contains fewer than two values.
	 */
    drawPath(coordinates: Point2D[], color: string): void {
        if (coordinates.length < 2) {
            throw new Error('The coordinate list must contain at least two values.');
        }

        coordinates.forEach(coord => this.validateCoordinates2D(coord));

        const svgCoordinates = coordinates.map(coord => this.transformCoordinates(coord));

        const pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");

        let pathData = `M ${svgCoordinates[0].join(' ')}`;
        for (let i = 1; i < svgCoordinates.length; i++) {
            pathData += ` L ${svgCoordinates[i].join(' ')}`;
        }

        pathElement.setAttribute("d", pathData);
        pathElement.setAttribute("fill", "none");
        pathElement.setAttribute("stroke", color);
        pathElement.setAttribute("stroke-width", "1");

        this.svgElement.appendChild(pathElement);
    }

    /**
	 * Draws a vector in the Cartesian plane using an existing marker created earlier (only for brown, blue or green colors).
	 * 
	 * @param initialPoint - The starting point coordinates of the vector in the Cartesian plane.
	 * @param vectorComponents - The components of the vector in the Cartesian plane.
     * @param textContent - The text content of the label (default: "").
	 * @param lineAttributes - An object containing style attributes for the vector.
	 * @param textAttributes - An object containing style attributes for the label.
	 */
    drawVector(initialPoint: Point2D, vectorComponents: Point2D, textContent: string = "", lineAttributes: LineAttributes = {}, textAttributes: TextAttributes = {}): void {
        this.validateCoordinates2D(initialPoint);
        this.validateCoordinates2D(vectorComponents);

        const { strokeColor = "brown", strokeWidth = 2, strokeDasharray = "none", showArrow = true } = lineAttributes;
        
        const endPoint = math.add(initialPoint, vectorComponents) as Point2D;
        
        const [initialXTransformed, initialYTransformed] = this.transformCoordinates(initialPoint);
        const [endXTransformed, endYTransformed] = this.transformCoordinates(endPoint);
        
        drawSegment(this.svgElement, initialXTransformed, initialYTransformed, endXTransformed, endYTransformed, strokeColor, strokeWidth, strokeDasharray, showArrow);
        
        if (textContent) {
            const half = vectorComponents.map(element => element / 2) as Point2D;
			const position = math.add(initialPoint, half) as Point2D;
			textAttributes.fill = strokeColor;
			this.drawLabel(position, textContent, textAttributes);
        }
    }

    /**
	 * Draws a vector in the Cartesian plane using an existing marker created earlier (only for brown, blue or green colors).
	 * This method allows rendering a LaTeX expression as a label using MathJax.
	 * 
	 * @param initialPoint - The starting point coordinates of the vector in the Cartesian plane.
	 * @param vectorComponents - The components of the vector in the Cartesian plane.
	 * @param latexExpression - The LaTeX expression for the label (default: "").
	 * @param lineAttributes - An object containing style attributes for the vector.
	 * @param mathAttributes - An object containing style attributes for the math label.
	 */
	drawVectorB(initialPoint: Point2D, vectorComponents: Point2D, latexExpression: string = "", lineAttributes: LineAttributes = {}, mathAttributes: MathAttributes = {}): void {
		this.validateCoordinates2D(initialPoint);
        this.validateCoordinates2D(vectorComponents);

		const {strokeColor = "brown", strokeWidth = 2, strokeDasharray = "none", showArrow = true} = lineAttributes;

		const endPoint = math.add(initialPoint, vectorComponents) as Point2D;

		const [initialXTransformed, initialYTransformed] = this.transformCoordinates(initialPoint);
		const [endXTransformed, endYTransformed] = this.transformCoordinates(endPoint);

		drawSegment(this.svgElement, initialXTransformed, initialYTransformed, endXTransformed, endYTransformed, strokeColor, strokeWidth, strokeDasharray, showArrow);

		if (latexExpression != "") {
			const half = vectorComponents.map(element => element / 2) as Point2D;
			const position = math.add(initialPoint, half) as Point2D;
			
			mathAttributes.color = strokeColor;
			
			this.drawMath(position, latexExpression, mathAttributes);
		}
	}

    /**
	 * Draws the label of an element giving coordinates of a baseline point.
	 * 
	 * @param baselinePoint - The coordinates of the baseline point in the Cartesian plane.
	 * @param textContent - The text content of the label.
	 * @param textAttributes - An object containing style attributes for the label.
	 */
    drawLabel(baselinePoint: Point2D, textContent: string | SVGTextElement, textAttributes: TextAttributes = {}): void {
        this.validateCoordinates2D(baselinePoint);

        const { fontSize = 20, stroke = "none", fill = "brown", fontWeight = "normal", corner = "rightbottom" } = textAttributes;
        const [xPosition, yPosition] = this.transformCoordinates(baselinePoint);
        writeText(this.svgElement, textContent, xPosition, yPosition, fontSize, stroke, fill, fontWeight, corner);
    }

    /**
	 * Draws a LaTeX math expression at a specified point.
	 * 
	 * @param baselinePoint - The coordinates of the point in the Cartesian plane.
	 * @param latex - The LaTeX expression.
	 * @param mathAttributes - An object containing style attributes.
	 */
	drawMath(baselinePoint: Point2D, latex: string, mathAttributes: MathAttributes = {}): void {
		this.validateCoordinates2D(baselinePoint);

		const { scale = 1, color = "brown", dx = 0, dy = 0, rotation = 0} = mathAttributes;

		const [xPosition, yPosition] = this.transformCoordinates(baselinePoint);

		writeMath(this.svgElement, latex, xPosition, yPosition, scale, color, dx, dy, rotation);
	}
}