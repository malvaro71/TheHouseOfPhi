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

    // set a list of points that define the path of movement. 
    const Points = [[-1, -1, 8], [3, 6, 15], [11, 28, 18], [20, 25, 12]];

    // Calculate displacement vector (deltar)
    const deltar = math.subtract(Points[2], Points[1]);

    // Draw r1 and r2 and deltar
    mySpace1_2.drawVector([0, 0, 0], Points[1], "r1", {strokeColor: "blue"}, {});
    mySpace1_2.drawVector([0, 0, 0], Points[2], "r2", {strokeColor: "blue"}, {});
    mySpace1_2.drawVector(Points[1], deltar, "r2-r1", {strokeColor: "green"}, {corner: "righttop"});
    
    // Draw the path
    mySpace1_2.drawPath(Points, [0, 1, 9], "green");
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
