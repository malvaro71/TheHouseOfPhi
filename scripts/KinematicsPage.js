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
    
    // set a list of points that define the path of movement. 
    // const Points = [[-1, -1, 8], [0, 2, 13], [3, 6, 15], [11, 28, 18], [20, 25, 12]];

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
    //const Points = [[1, 5], [3, 6], [5, 7], [7, 5], [8, 4]];
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
    //myPlane1_3.drawPath(Points, [2, 5], "green");
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

    
    // set a list of point that define the path of movement. 
    // const Points = [[2, 5], [3, 6], [4.5, 6.1], [6, 5.5], [7, 4]];

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
	/**
    const r1End = math.subtract(Points[1], center);
    const r2End = math.subtract(Points[3], center);
    myPlane1_4.drawVector(center, r1End, "R", {strokeColor: "blue"}, {corner: "righttop"});
    myPlane1_4.drawVector(center, r2End, "R", {strokeColor: "blue"}, {});
    myPlane1_4.drawVector(Points[1], [1.5, 0.5], "v\u2081", {strokeColor: "brown"}, {});
    myPlane1_4.drawVector(Points[3], [2, -1.6], "v\u2082", {strokeColor: "brown"}, {corner: "righttop"});
    myPlane1_4.drawVector(Points[1], [2, -1.6], "v\u2082", {strokeColor: "brown"}, {corner: "righttop"});
	*/

    // Calculate and draw velocidy variation, deltav
	const deltav = math.subtract(v2, v1);
	myPlane1_4.drawVector(math.add(r1, v1), deltav, "\u0394v", {strokeColor: "green"}, {corner: "leftbottom"});
	/**
    const deltavStart = math.add(Points[1], [1.5, 0.5]);
    const deltavEnd = math.add(Points[1], [2, -1.6]);
    const deltav = math.subtract(deltavEnd, deltavStart);
    myPlane1_4.drawVector(deltavStart, deltav, "\u0394v", {strokeColor: "green"}, {corner: "leftbottom"});
    */
    
    // Draw the path
    //myPlane1_4.drawPath(Points, [2.5, 5.6], "green");
}

// svg1.5 trajectory and displacement vector
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
    const deltar = math.subtract(r(5), r(2));

    // Draw r1 and r2 and deltar
    mySpace1_5.drawVector([0, 0, 0], r(2), "r1", {strokeColor: "blue"}, {});
    mySpace1_5.drawVector([0, 0, 0], r(5), "r2", {strokeColor: "blue"}, {});
    mySpace1_5.drawVector(r(2), deltar, "\u0394r", {strokeColor: "green"}, {corner: "righttop"});
    
    // Draw the path
    mySpace1_5.drawPath(points, "green");
}

// svg1_6. Cartesian plane and cartesian coordinates of a point.
{
    // Get the SVG element from the DOM
    var svg1_6 = document.getElementById("svg1_6");

    // Set attributes
    svg1_6.setAttribute("viewBox", "0 30 400 300"); 
    svg1_6.setAttribute("width", "400"); 
    svg1_6.setAttribute("height", "300");

    // set a cartesian plane
    const myPlane1_6 = new CartesianPlane(svg1_6, -2, 20, -2, 10);
    myPlane1_6.drawAxes("", "x", "O");
    
    // Draw a point, its label and two segments
    myPlane1_6.drawPoint([5, 0], "green");
    myPlane1_6.drawPoint([15, 0], "green");
    myPlane1_6.drawLabel([5, 0], "x(t\u2081)", {fill: "green", fontSize: 20, corner: "righttop"});
    myPlane1_6.drawLabel([15, 0], "x(t\u2082)", {fill: "green", fontSize: 20, corner: "lefttop"});
    myPlane1_6.drawLabel([8, 0], "\u0394x = \u0394s", {fill: "green", fontSize: 20, corner: "leftbottom"});
    myPlane1_6.drawSegment([5, 0], [15, 0], {strokeColor: "green", strokeWidth: 2});
}
