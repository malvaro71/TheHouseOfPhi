// Importaciones
import { createMarkerArrow,
    generateFunctionPoints
} from './SVGDrawing.js';

// Import the CartesianPlane class
import CartesianPlane from './CartesianPlane.js';

// Import the EuclideanSpace class
import EuclideanSpace from './EuclideanSpace.js';

// Import the math library 
// import * as math from 'mathjs'; lo dejamos en paso hasta que integremos mathjs en el proyecto.
// Cuando lo integremos, recordar añadir node_modules/ al archivo .gitignore en la raíz del proyecto.

// svg1.1 point P, with coordinates (x1, y1, z1)
{
    // Get the SVG element from the DOM
    var svg1_1 = document.getElementById("svg1_1");

    // Set attributes
    svg1_1.setAttribute("viewBox", "0 0 400 400"); 
    svg1_1.setAttribute("width", "400"); 
    svg1_1.setAttribute("height", "400");

    //Create arrow markers
    const brownMarker = createMarkerArrow("Brownarrow", "brown");
    const blueMarker = createMarkerArrow("Bluearrow", "blue");
    const greenMarker = createMarkerArrow("Greenarrow", "green");

    // Add the marker to the SVG
    svg1_1.appendChild(brownMarker); 
    svg1_1.appendChild(blueMarker); 
    svg1_1.appendChild(greenMarker);

    // set a euclidean space
    const mySpace1_1 = new EuclideanSpace(svg1_1, [0, 0, 0], 10);
    mySpace1_1.drawAxes();

    // set drawing element values
    const P = [6, 9, 15];
    const x = [6, 0, 0];
    const y = [0, 9, 0];
    const z = [0, 0, 15];

    // Draw a point
    mySpace1_1.drawPoint(P, "green");
    
    // Draw dashed lines to ilustrate the point coordinates on each axis x, y and z.
    mySpace1_1.drawSegment(x, [6, 9, 0], {strokeColor: "green", strokeDasharray: "5,5"});
    mySpace1_1.drawSegment([6, 9, 0], P, {strokeColor: "green", strokeDasharray: "5,5"});
    mySpace1_1.drawSegment(y, [6, 9, 0], {strokeColor: "green", strokeDasharray: "5,5"});
    

    // Labels x, y, z and P(x(t), y(t), z(t))
    mySpace1_1.drawLabel([6, -0.1, 0], "x", {fill: "green", fontSize: 20});
    mySpace1_1.drawLabel([0, 9.1, 0.1], "y", {fill: "green", fontSize: 20, corner: "leftbottom"});
    mySpace1_1.drawLabel([0, -0.1, 15], "z", {fill: "green", fontSize: 20});
    mySpace1_1.drawLabel([6, 10, 16], "P(x(t), y(t), z(t))", {fill: "green", corner: "lefttop"});

    // Draw r, xi, yj and zk vectors
    mySpace1_1.drawVector([0, 0, 0], P, "r(t)", {strokeColor: "blue"}, {});
    mySpace1_1.drawVector([0, 0, 0], x, "x", {strokeColor: "blue"}, {});
    mySpace1_1.drawVector([0, 0, 0], y, "y", {strokeColor: "blue"}, {});
    mySpace1_1.drawVector([0, 0, 0], z, "z", {strokeColor: "blue"}, {});

	// set a list of points that define the path of movement. 
    const Points = [[-1, -1, 8], [6, 9, 15], [5, 28, 18], [20, 25, 12]];

	// Draw the path
    mySpace1_1.drawPath(Points, [0, 1, 9], "green");
	
}

// svg1.2 trajectory and displacement vector
{
    // Get the SVG element from the DOM
    var svg1_2 = document.getElementById("svg1_2");

    // Set attributes
    svg1_2.setAttribute("viewBox", "0 0 400 400"); 
    svg1_2.setAttribute("width", "400"); 
    svg1_2.setAttribute("height", "400");

    // set a euclidean space
    const mySpace1_2 = new EuclideanSpace(svg1_2, [0, 0, 0], 10);
    mySpace1_2.drawAxes();

    function r(t) {
        // generate the x, y, z values based on time t
        const x = 4 - t / 10;
        const y = t*2;
        const z = 20 - (t * t) / 5;

        return [x, y, z]; // returns r(t) coordinates
    }
    
    
    // Generate a list of points: r(t) = [x(t), y(t), z(t)] in a time interval
    const numberOfPoints = 20; // number of points to generate
    const timeStart = 0; // start time
    const finalTime = 10; // end time
    const points = [];
    const step = (finalTime - timeStart) / (numberOfPoints - 1);
	for (let i = 0; i < numberOfPoints; i++) {
        const t = timeStart + i * step;
        points.push(r(t));
    }
    
    // Calculate displacement vector (deltar)
    const deltar = math.subtract(r(6), r(1));

    // Draw r(1), r(4) and deltar
    mySpace1_2.drawVector([0, 0, 0], r(1), "r1", {strokeColor: "blue"}, {});
    mySpace1_2.drawVector([0, 0, 0], r(6), "r2", {strokeColor: "blue"}, {});
    mySpace1_2.drawVector(r(1), deltar, "r2-r1", {strokeColor: "green"}, {corner: "righttop"});
    
    // Draw the path
    mySpace1_2.drawPath(points, "green");
}

// svg1.3 trajectory, displacement vector and velocity 2D
{
    // Get the SVG element from the DOM
    var svg1_3 = document.getElementById("svg1_3");

    // Set attributes
    svg1_3.setAttribute("viewBox", "0 0 400 400"); 
    svg1_3.setAttribute("width", "400"); 
    svg1_3.setAttribute("height", "400");

    // set a cartesian plane
	const myPlane1_3 = new CartesianPlane(svg1_3, 0, 8, 0, 8);

	// set a function to generate a list of points: f(x) = 5 - (x^2)/25
	function f1_3(x) {
	    return 5 - (x * x)/25;
	}

	// set a the derivative of the previous funciton
	function df1_3(x) {
		return -2*x/25;
	}
    
    // set a list of points that define the path of movement. 
	const Points = generateFunctionPoints(f1_3, 1, 8, 20);

    // Calculate r1, r2, v1, v2 and displacement vector (deltar)
	const r1 = [3, f1_3(3)];
	const r2 = [7, f1_3(7)];
	const v1 = [1, df1_3(3)];
	const v2 = [1, df1_3(7)];
    const deltar = math.subtract(r2, r1);

    // Draw r1 and r2, deltar, v1 and v2
    myPlane1_3.drawVector([0, 0], r1, "r\u2081", {strokeColor: "blue"}, {});
    myPlane1_3.drawVector([0, 0], r2, "r\u2082", {strokeColor: "blue"}, {});
    myPlane1_3.drawVector(r1, deltar, "\u0394r", {strokeColor: "green"}, {corner: "righttop"});
    myPlane1_3.drawVector(r1, v1, "v\u2081", {strokeColor: "brown"}, {});
    myPlane1_3.drawVector(r2, v2, "v\u2082", {strokeColor: "brown"}, {corner: "righttop"});
    
    // Draw the path
	myPlane1_3.drawPath(Points, "green");
}

// svg1.4 Velocity change in a time interval
{
    // Get the SVG element from the DOM
    var svg1_4 = document.getElementById("svg1_4");

    // Set attributes
    svg1_4.setAttribute("viewBox", "0 0 400 400"); 
    svg1_4.setAttribute("width", "400"); 
    svg1_4.setAttribute("height", "400");

    // set a cartesian plane
	const myPlane1_4 = new CartesianPlane(svg1_4, 0, 10, 0, 10);

	// set a function to generate a list of points: f(x) = 5 - (x^2)/25
	function f1_4(x) {
	    return 5 + x - (x * x)/15;
	}

	// set a the derivative of the previous funciton
	function df1_4(x) {
		return 1 - 2*x/15;
	}
    
    // set a list of points that define the path of movement. 
	const Points = generateFunctionPoints(f1_4, 1, 8, 20);

	// Draw the path
	myPlane1_4.drawPath(Points, "green");

    // Draw r1 and r2, deltar, v1 and v2
    const center = [4.4, 2.5];
	const r1 = [3, f1_4(3)];
	const r2 = [6, f1_4(6)];
	const v1 = [1, df1_4(3)];
	const v2 = [2, 2*df1_4(6)];
	myPlane1_4.drawVector(center, math.subtract(r1, center), "r\u2081", {strokeColor: "blue"}, {corner: "righttop"});
	myPlane1_4.drawVector(center, math.subtract(r2, center), "r\u2082", {strokeColor: "blue"});
	myPlane1_4.drawVector(r1, v1, "v\u2081", {strokeColor: "brown"}, {});
	myPlane1_4.drawVector(r1, v2, "v\u2082", {strokeColor: "brown"}, {corner: "righttop"});
    myPlane1_4.drawVector(r2, v2, "v\u2082", {strokeColor: "brown"}, {corner: "righttop"});

    // Calculate and draw velocidy variation, deltav
	const deltav = math.subtract(v2, v1);
	myPlane1_4.drawVector(math.add(r1, v1), deltav, "\u0394v", {strokeColor: "green"}, {corner: "leftbottom"});
	
}

// svg1.5 Trajectory, speed and position of a moving object in uniform rectilinear motion.
{
    // Get the SVG element from the DOM
    var svg1_5 = document.getElementById("svg1_5");

    // Set attributes
    svg1_5.setAttribute("viewBox", "0 0 400 400"); 
    svg1_5.setAttribute("width", "400"); 
    svg1_5.setAttribute("height", "400");

    // set a euclidean space
    const mySpace1_5 = new EuclideanSpace(svg1_5, [0, 0, 0], 10);
    mySpace1_5.drawAxes();

    function r(t) {
        const r0 = [-5, -5, 10]; // initial position.
        const v = [2, 5, -0.3]; // Speed.

        return math.add(r0, math.multiply(v, t));; // returns r(t) = r0 + vt
    }
    
    
    // Generate a list of points: r(t) = [x(t), y(t), z(t)] in a time interval
    const numberOfPoints = 10; // number of points to generate
    const timeStart = 0; // start time
    const finalTime = 7; // end time
    const points = [];
    const step = (finalTime - timeStart) / (numberOfPoints - 1);
	for (let i = 0; i < numberOfPoints; i++) {
        const t = timeStart + i * step;
        points.push(r(t));
    }

    // Calculate displacement vector (deltar)
    const deltar = math.subtract(r(5), r(3));

    // Draw r1 and r2 and deltar
    mySpace1_5.drawVector([0, 0, 0], r(0), "r(t\u2080)", {strokeColor: "blue"}, {corner: "righttop"});
    mySpace1_5.drawVector(r(0), [2, 5, -0.3], "v", {strokeColor: "blue"}, {});
    //mySpace1_5.drawVector(r(2), [2, 5, -0.3], "v\u2081", {strokeColor: "blue"}, {});
    //mySpace1_5.drawVector(r(5), [2, 5, -0.3], "v\u2082", {strokeColor: "blue"}, {});
    mySpace1_5.drawVector([0, 0, 0], r(3), "r(t\u2081)", {strokeColor: "blue"}, {});
    mySpace1_5.drawVector([0, 0, 0], r(5), "r(t\u2082)", {strokeColor: "blue"}, {});
    mySpace1_5.drawVector(r(3), deltar, "\u0394r", {strokeColor: "green"}, {corner: "leftbottom"});
    
    // Draw the path
    mySpace1_5.drawPath(points, "green");
}

// svg1_6. In a rectilinear movement, the direction of movement can be taken as a reference system.
{
    // Get the SVG element from the DOM
    var svg1_6 = document.getElementById("svg1_6");

    // Set attributes
    svg1_6.setAttribute("viewBox", "0 0 400 200"); 
    svg1_6.setAttribute("width", "400"); 
    svg1_6.setAttribute("height", "200");

    // set a cartesian plane
    const myPlane1_6 = new CartesianPlane(svg1_6, -2, 20, -2, 10);
    
    
    // Draw a point, its label and two segments
    myPlane1_6.drawVector([0, 0], [20, 0], "", {strokeColor: "brown"}, {});
    myPlane1_6.drawPoint([0, 0], "green");
    myPlane1_6.drawLabel([0, 0], "x(t\u2080)", {fill: "green", fontSize: 20, corner: "lefttop"});
    myPlane1_6.drawPoint([5, 0], "green");
    myPlane1_6.drawPoint([15, 0], "green");
    myPlane1_6.drawLabel([5, 0], "x(t\u2081)", {fill: "green", fontSize: 20, corner: "righttop"});
    myPlane1_6.drawLabel([15, 0], "x(t\u2082)", {fill: "green", fontSize: 20, corner: "lefttop"});
    myPlane1_6.drawLabel([8, 0], "\u0394x = \u0394s", {fill: "green", fontSize: 20, corner: "leftbottom"});
    myPlane1_6.drawSegment([5, 0], [15, 0], {strokeColor: "green", strokeWidth: 2});
}

// Figure 1.7. Graph of x = f(t) for a uniform rectilinear motion.
{
    // Get the SVG element from the DOM
    const svg1_7 = document.getElementById("svg1_7");

    // Set attributes
    svg1_7.setAttribute("viewBox", "0 0 400 400"); 
    svg1_7.setAttribute("width", "400"); 
    svg1_7.setAttribute("height", "400");

    // set a cartesian plane where the river bank is parallel to x-axis.
    const myPlane1_7 = new CartesianPlane(svg1_7, -5, 40, -5, 40);
    myPlane1_7.drawAxes("", "t", "O");
    myPlane1_7.drawLabel([-2, 37], "x", {corner: "leftbottom", fontSize: 25});

    // set values for the uniform rectilinear motion
    const x0 = 10; // initial position of the object when t=0
    const speed = 0.5; // speed of the moving object

    // set a function that describes a uniform rectilinear motion: f(t) = x0 + speed * t
    function f1_7(t) {
        // Set the initial values
        return x0 + speed * t;
    }
    
    // Generate a list of points: (x,t) = [x(t), t] in a time interval
    const numberOfPoints = 10; // number of points to generate
    const timeMin = 0; // start time
    const timeMax = 37; // end time
    const points = [];
    const step = (timeMax - timeMin) / (numberOfPoints - 1);
	for (let i = 0; i < numberOfPoints; i++) {
        const t = timeMin + i * step;
        points.push([t, f1_7(t)]);
    }

    // Draw the path
    myPlane1_7.drawPath(points, "green");

    // Mark x0
    myPlane1_7.drawLabel([-3, 12], "x\u2080", {fill: "green", corner: "lefttop", fontSize: 25});

    // Draw an horizontal line at x0
    myPlane1_7.drawSegment([0, x0], [37, x0], {strokeColor: "green", strokeDasharray: "5,5"});

    //Draw an arc representing an angle in the Cartesian plane
    myPlane1_7.drawArc([0, x0], [10, 0], [10, f1_7(10) - x0], 5);

    // Mark the angle α
    myPlane1_7.drawLabel([6, x0 + 0.5], "\u03B1", {fill: "blue", corner: "leftbottom", fontSize: 25}); // alpha

	// Draw a point
	myPlane1_7.drawPoint([20, f1_7(20)], "blue");
	myPlane1_7.drawSegment([20, 0], [20, f1_7(20)], {strokeColor: "blue", strokeDasharray: "5,5"});
	myPlane1_7.drawSegment([0, f1_7(20)], [20, f1_7(20)], {strokeColor: "blue", strokeDasharray: "5,5"});
	myPlane1_7.drawLabel([0, f1_7(20)], "x(t\u2081)", {fill: "blue", corner: "rightbottom", fontSize: 25});
	myPlane1_7.drawLabel([20, 0], "t\u2081", {fill: "blue", corner: "lefttop", fontSize: 25});
}

// Figure 1.8. Graph of x = f(t) for a uniformly accelerated rectilinear motion.
{
    // Get the SVG element from the DOM
    const svg1_8 = document.getElementById("svg1_8");

    // Set attributes
    svg1_8.setAttribute("viewBox", "0 0 400 400"); 
    svg1_8.setAttribute("width", "400"); 
    svg1_8.setAttribute("height", "400");

    // set a cartesian plane with xMin, xMax, yMin and yMax.
    const myPlane1_8 = new CartesianPlane(svg1_8, -3, 20, -10, 100);
    myPlane1_8.drawAxes("", "t", "O");
    myPlane1_8.drawLabel([-2, 80], "x", {corner: "leftbottom", fontSize: 25});

    // set values for the uniform rectilinear motion
    const x0 = 10; // initial position of the object when t=0
	const v0 = 1 // initial speed of the moving object when t=0
	const a = 0.5; // acceleration of the moving object

    // set a function that describes a uniform rectilinear motion: f(t) = x0 + v0 * t + (1/2)*a*t**2
    function f1_8(t) {
        return x0 + v0*t + (1/2)*a*t**2;
    }
    
    // Generate a list of points: (x,t) = [x(t), t] in a time interval
    const numberOfPoints = 30; // number of points to generate
    const timeMin = 0; // start time
    const timeMax = 15; // end time
    const points = [];
    const step = (timeMax - timeMin) / (numberOfPoints - 1);
	for (let i = 0; i < numberOfPoints; i++) {
        const t = timeMin + i * step;
        const position = f1_8(t); // Calculate the position for the current 't'
        points.push([t, position]);
    }

    // Draw the path
    myPlane1_8.drawPath(points, "green");

    // Mark x0
    myPlane1_8.drawLabel([0, x0], "x\u2080", {fill: "green", corner: "lefttop", fontSize: 25});

    // Draw an horizontal line at x0
    myPlane1_8.drawSegment([0, x0], [37, x0], {strokeColor: "green", strokeDasharray: "5,5"});
}

    

