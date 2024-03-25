// Define a blue arrow marker
var blueMarker = document.createElementNS("http://www.w3.org/2000/svg", "marker");
blueMarker.setAttribute("id", "Bluearrow");
blueMarker.setAttribute("viewBox", "0 0 10 10");
blueMarker.setAttribute("refX", 10);
blueMarker.setAttribute("refY", 5);
blueMarker.setAttribute("markerWidth", 6);
blueMarker.setAttribute("markerHeight", 6);
blueMarker.setAttribute("orient", "auto-start-reverse");

var bluePath = document.createElementNS("http://www.w3.org/2000/svg", "path");
bluePath.setAttribute("d", "M 0 0 L 10 5 L 0 10 z");
bluePath.setAttribute("stroke", "blue");
bluePath.setAttribute("fill", "blue");

blueMarker.appendChild(bluePath);

// Define a brown arrow marker (similar to the previous code)
var brownMarker = document.createElementNS("http://www.w3.org/2000/svg", "marker");
brownMarker.setAttribute("id", "Brownarrow");
brownMarker.setAttribute("viewBox", "0 0 10 10");
brownMarker.setAttribute("refX", 10);
brownMarker.setAttribute("refY", 5);
brownMarker.setAttribute("markerWidth", 6);
brownMarker.setAttribute("markerHeight", 6);
brownMarker.setAttribute("orient", "auto-start-reverse");

var brownPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
brownPath.setAttribute("d", "M 0 0 L 10 5 L 0 10 z");
brownPath.setAttribute("stroke", "brown");
brownPath.setAttribute("fill", "brown");

brownMarker.appendChild(brownPath);

// Define a green arrow marker (similar to the previous code)
var greenMarker = document.createElementNS("http://www.w3.org/2000/svg", "marker");
greenMarker.setAttribute("id", "Greenarrow");
greenMarker.setAttribute("viewBox", "0 0 10 10");
greenMarker.setAttribute("refX", 10);
brownMarker.setAttribute("refY", 5); 
greenMarker.setAttribute("markerWidth", 6);
greenMarker.setAttribute("markerHeight", 6);
greenMarker.setAttribute("orient", "auto-start-reverse");

var greenPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
greenPath.setAttribute("d", "M 0 0 L 10 5 L 0 10 z");
greenPath.setAttribute("stroke", "green");
greenPath.setAttribute("fill", "green");

greenMarker.appendChild(greenPath);

// Export the markers (optional)
export { blueMarker, brownMarker, greenMarker }; // Optional for cleaner code in the main HTML file