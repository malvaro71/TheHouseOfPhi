/**
 * Represents a 2D point in a Cartesian plane.
 * It is a tuple where the first element is the x-coordinate and the second is the y-coordinate.
 * @example const myPoint: Point2D = [10, -5];
 */
export type Point2D = [number, number];

/**
 * Represents a 3D point in Euclidean space.
 * It is a tuple where the elements are the x, y, and z coordinates, respectively.
 * @example const myPoint: Point3D = [3, 4, 5];
 */
export type Point3D = [number, number, number];

/**
 * Defines the visual attributes for line-based elements like segments, vectors, and arcs.
 * All properties are optional and have default values in the drawing methods.
 */
export interface LineAttributes {
    /** The color of the line stroke.
     * @default "brown"
     */
    strokeColor?: string;
    /** The width of the line stroke in pixels.
     * @default 2
     */
    strokeWidth?: number;
    /** The dash pattern for the line stroke (e.g., "5,5" for dashed).
     * @default "none"
     */
    strokeDasharray?: string;
    /** Whether to display an arrowhead at the end of the line.
     * @default false (or true for drawVector)
     */
    showArrow?: boolean;
}

/**
 * Defines the visual attributes for text elements within an SVG.
 * All properties are optional and have default values in the drawing methods.
 */
export interface TextAttributes {
    /** The font size of the text in pixels.
     * @default 20
     */
    fontSize?: number;
    /** The color of the text's outline.
     * @default "none"
     */
    stroke?: string;
    /** The fill color of the text.
     * @default "brown"
     */
    fill?: string;
    /** The font weight of the text (e.g., "normal", "bold").
     * @default "normal"
     */
    fontWeight?: string;
    /**
     * Determines which corner of the text's bounding box aligns with the specified coordinates.
     * @default "rightbottom"
     */
    corner?: 'righttop' | 'rightbottom' | 'lefttop' | 'leftbottom';
}

/**
 * Defines the visual attributes for LaTeX expressions rendered with MathJax inside an SVG.
 * All properties are optional and have default values in the drawing methods.
 */
export interface MathAttributes {
    /** A scaling factor to apply to the rendered math expression.
     * @default 1
     */
    scale?: number;
    /** The fill color of the math expression.
     * @default "brown"
     */
    color?: string;
    /** A horizontal offset (padding) in pixels to apply after positioning.
     * @default 0
     */
    dx?: number;
    /** A vertical offset (padding) in pixels to apply after positioning.
     * @default 0
     */
    dy?: number;
    /** The rotation angle in degrees.
     * @default 0
     */
    rotation?: number;
}