/**
 * Validates if the input coordinates are an array of length 2 containing numbers.
 *
 * @param {number[]} coordinates - an array representing the coordinates.
 *
 * @throws {TypeError} If the coordinates are not an array.
 * @throws {ValueError} If the coordinates array is not of length 2 or if it contains non-numeric elements or if any of its numeric elements is infinite.
 */
function validateCoordinates2D(coordinates) {
	if (!Array.isArray(coordinates)) {
	  throw new TypeError("Invalid coordinates: Expecting an array.");
	}
	if (coordinates.length !== 2) {
	  throw new ValueError("Invalid coordinates: Expecting an array with length 2 (x and y values).");
	}
	if (!coordinates.every((element) => typeof element === "number" && isFinite(element))) {
	  throw new ValueError("Invalid coordinates: Expecting an array containing only finite numbers.");
	}
	// If all conditions pass, the function returns true (implicit return)
}

/**
 * Validates if the input coordinates are an array of length 3 containing numbers.
 *
 * @param {number[]} coordinates - an array representing the coordinates.
 *
 * @throws {TypeError} If the coordinates are not an array.
 * @throws {ValueError} If the coordinates array is not of length 3 or if it contains non-numeric elements or if any of its numeric elements is infinite.
 */
function validateCoordinates3D(coordinates) {
	if (!Array.isArray(coordinates)) {
	  throw new TypeError("Invalid coordinates: Expecting an array.");
	}
	if (coordinates.length !== 3) {
	  throw new ValueError("Invalid coordinates: Expecting an array with length 3 (x, y and z values).");
	}
	if (!coordinates.every((element) => typeof element === "number" && isFinite(element))) {
	  throw new ValueError("Invalid coordinates: Expecting an array containing only finite numbers.");
	}
	// If all conditions pass, the function returns true (implicit return)
}

/**
 * Validates if the input coordinates are an array of length 2 or 3 containing numbers.
 *
 * @param {number[]} coordinates - an array representing the coordinates.
 *
 * @throws {TypeError} If the coordinates are not an array.
 * @throws {ValueError} If the coordinates array is not of length 2 or 3 or if it contains non-numeric elements or if any of its numeric elements is infinite.
 */
function validateCoordinates2D3D(coordinates) {
	if (!Array.isArray(coordinates)) {
	  throw new TypeError("Invalid coordinates: Expecting an array.");
	}
	if (coordinates.length !== 2 && coordinates.length !== 3) {
	  throw new ValueError("Invalid coordinates: Expecting an array with length 2 or 3 (x and y or x, y and z values).");
	}
	if (!coordinates.every((element) => typeof element === "number" && isFinite(element))) {
	  throw new ValueError("Invalid coordinates: Expecting an array containing only finite numbers.");
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

/**
Calculates the angle in radians between two 2D or 3D vectors in the counter-clockwise (CCW) sense.
@param {number[]} vector1 - The first vector represented as an array of length 2 or 3.
@param {number[]} vector2 - The second 2D vector represented as an array of length 2 or 3.
@returns {number} The angle in radians between the two vectors in the CCW sense.
Returns 0 if either vector has a magnitude of 0.
@throws {Error} If arrays have different length.
@throws {TypeError} If either vector1 or vector2 is not an array.
@throws {ValueError} If either vector1 or vector2 is not of length 2 or 3, or if they contain non-numeric elements, or if any of their numeric elements is infinite. 
*/
function angleBetweenVectorsCCW(vector1, vector2) {
	// check if both arrays have the same length
	if (vector1.length !== vector2.length) {
		throw new Error("Vectors must have the same dimensions");
	}
	
	// Check if vectors are valid arrays of length 2
	[vector1, vector2].every(arr => validateCoordinates2D3D(arr));
  
	// Calculate dot product and magnitudes
	const dotProduct = math.dot(vector1, vector2);
	const magnitude1 = math.norm(vector1);
	const magnitude2 = math.norm(vector2);
  
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
