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
    

    // Labels x1, y1, z1 and P(x1, y1, z1)
    mySpace1_1.drawLabel([6, -0.1, 0], "x", {fill: "green", fontSize: 20});
    mySpace1_1.drawLabel([0, 9.1, 0.1], "y", {fill: "green", fontSize: 20, corner: "leftbottom"});
    mySpace1_1.drawLabel([0, -0.1, 15], "z", {fill: "green", fontSize: 20});
    mySpace1_1.drawLabel([6, 10, 16], "P(x, y, z)", {fill: "green", corner: "lefttop"});

    // Draw r, xi, yj and zk vectors
    mySpace1_1.drawVector([0, 0, 0], P, "r", {strokeColor: "blue"}, {});
    mySpace1_1.drawVector([0, 0, 0], x, "x", {strokeColor: "blue"}, {});
    mySpace1_1.drawVector([0, 0, 0], y, "y", {strokeColor: "blue"}, {});
    mySpace1_1.drawVector([0, 0, 0], z, "z", {strokeColor: "blue"}, {});
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

    // set a list of point that define the path of movement. 
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