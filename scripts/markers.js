function createMarker(id, viewBox, markerWidth, markerHeight, fillColor) {
	var marker = document.createElementNS("http://www.w3.org/2000/svg", "marker");
	marker.setAttribute("id", id);
	marker.setAttribute("viewBox", viewBox);
	marker.setAttribute("refX", 10);
	marker.setAttribute("refY", 5);
	marker.setAttribute("markerWidth", markerWidth);
	marker.setAttribute("markerHeight", markerHeight);
	marker.setAttribute("orient", "auto-start-reverse");
  
	var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
	path.setAttribute("d", "M 0 0 L 10 5 L 0 10 z");
	path.setAttribute("stroke", fillColor);
	path.setAttribute("fill", fillColor);
  
	marker.appendChild(path);
	return marker;
  }