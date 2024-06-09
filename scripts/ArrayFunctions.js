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
/*
function add(array1, array2) {
	// check if both arrays have the same length
	if (array1.length !== array2.length) {
		throw new TypeError("Vectors must have the same dimensions");
	}

	// validate arrays
	[array1, array2].every(arr => validateCoordinates2D3D(arr));

	const sumArray = [];
  
	array1.forEach((element, index) => {
	  sumArray.push(element + array2[index]); // Access array2 from the function argument
	});
  
	return sumArray; // Return the resulting array
}*/

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
/*
function dot(vectorA, vectorB) {
	// check if both arrays have the same length
	if (vectorA.length !== vectorB.length) {
	  throw new Error("Vectors must have the same dimensions");
	}

	// validate arrays
	[vectorA, vectorB].every(arr => validateCoordinates2D3D(arr));
  
	let product = 0;
	for (let i = 0; i < vectorA.length; i++) {
	  product += vectorA[i] * vectorB[i];
	}
	return product;
}*/

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
/*
function norm(vector) {
	// Check if input is a valid array
	validateCoordinates2D3D(vector);
  
	// Calculate the sum of squares of each component
	const sumOfSquares = vector.reduce((acc, curr) => acc + curr * curr, 0);
  
	// Take the square root to get the magnitude
	return Math.sqrt(sumOfSquares);
}*/

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
/*
function multiply(scalar, array){
	// Check if input is a valid array
	validateCoordinates2D3D(array);

	const scaledArray = [];
	for (let i = 0; i < array.length; i++) {
	scaledArray.push(scalar * array[i]);
	}
	return scaledArray;
}*/

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

/**
* Calculates the cross product of two 3D vectors.
* 
* The cross product of two vectors a and b is a new vector that is orthogonal to both a and b. 
* The direction of the resulting vector is determined by the right-hand rule.
*
* @param {number[]} vector1 - The first 3D vector represented as an array of length 3 (x, y, z).
* @param {number[]} vector2 - The second 3D vector represented as an array of length 3 (x, y, z).
* @returns {number[]} The resulting cross product vector as a new array of length 3 (x, y, z).
* @throws {Error} If the two vectors have different lengths (dimensions).
* @throws {TypeError} If either vector1 or vector2 is not an array.
* @throws {ValueError} If either vector1 or vector2 contains non-numeric elements, or if any of their numeric elements are infinite. 
*/
/*
function cross(vector1, vector2) {
	// check if both arrays have the same length
	if (vector1.length !== vector2.length) {
		throw new Error("Vectors must have the same dimensions");
	}
	
	// Check if vectors are valid arrays of length 3
	[vector1, vector2].every(arr => validateCoordinates3D(arr));
  
	// Destructure the vectors for readability
	const [x1, y1, z1] = vector1;
	const [x2, y2, z2] = vector2;
  
	// Calculate the vector product components
	const vectorProductX = y1 * z2 - z1 * y2;
	const vectorProductY = z1 * x2 - x1 * z2;
	const vectorProductZ = x1 * y2 - y1 * x2;
  
	// Return the resulting vector product as an array
	return [vectorProductX, vectorProductY, vectorProductZ];
  }*/