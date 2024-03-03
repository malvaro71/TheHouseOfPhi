function openForm() {
	document.getElementById("coordToMagDir").style.display = "block";
}

function closeForm() {
	document.getElementById("coordToMagDir").style.display = "none";
}

function updateMagnitudeAndDirection() {
	const inpObj1 = document.getElementById("xCoordinate");
	const inpObj2 = document.getElementById("yCoordinate");
	p2.x = parseFloat(inpObj1.value) + canvas.height / 2;
	p2.y = -parseFloat(inpObj2.value) + canvas.height / 2;
	let mod = Math.sqrt((p2.x - p0.x) ** 2 + (p2.y - p0.y) ** 2);
	let thetaRad = Math.atan2(-p2.y + p0.y, p2.x - p0.x);
	let thetaDeg = thetaRad * 180 / Math.PI;

	if (!inpObj1.checkValidity()) {
		alert(inpObj1.validationMessage);
	} else {
		if (!inpObj2.checkValidity()) {
			alert(inpObj2.validationMessage);
		} else {
			//shows magnitude with two decimals
			document.getElementById("magnitude").innerHTML =
				Math.round((mod + Number.EPSILON) * 100) / 100;
			//shows direction with two decimals	
			document.getElementById("direction").innerHTML =
				Math.round((thetaDeg + Number.EPSILON) * 100) / 100;
			//draw the vector	
			drawLineWithArrowhead(p0, p2, 5);
		}
	}
}

function drawLineWithArrowhead(pa, pb, headLength) {
	// calc the angle of the line
	var dx = pb.x - pa.x;
	var dy = pb.y - pa.y;
	var angle = Math.atan2(dy, dx);
	//Define the style to use as "red", when drawing in the canvas context
	ctx.strokeStyle = "green";
	//Clean previous arrow
	ctx.clearRect(0, 0, canvas.height, canvas.height);
	//draw x and y axis
	ctx.beginPath();
	ctx.lineWidth = 0.3;
	ctx.moveTo(0, canvas.height / 2);
	ctx.lineTo(canvas.height, canvas.height / 2);
	ctx.moveTo(canvas.height / 2, 0);
	ctx.lineTo(canvas.height / 2, canvas.height);
	ctx.strokeStyle = "green";
	ctx.stroke();
	//Name the X and Y asis
	ctx.font = "10px Arial";
	ctx.fillStyle = "brown";
	ctx.fillText("X", canvas.height - 10, canvas.height / 2 - 4);
	ctx.fillText("Y", canvas.height / 2 - 10, 10);
	// draw the line from pa to pb
	ctx.beginPath();
	ctx.lineWidth = 2;
	ctx.moveTo(pa.x, pa.y);
	ctx.lineTo(pb.x, pb.y);
	// draw partial arrowhead at 220 degrees
	ctx.moveTo(pb.x, pb.y);
	ctx.lineTo(pb.x + headLength * Math.cos(angle + 220 * Math.PI / 180),
		pb.y + headLength * Math.sin(angle + 220 * Math.PI / 180));
	// draw partial arrowhead at 140 degrees
	ctx.moveTo(pb.x, pb.y);
	ctx.lineTo(pb.x + headLength * Math.cos(angle + 140 * Math.PI / 180),
		pb.y + headLength * Math.sin(angle + 140 * Math.PI / 180));
	// stroke the line and arrowhead
	ctx.strokeStyle = "green";
	ctx.stroke();
}

function convert3DTo2D(x1, y1, z1) {
	/*
	This program Convert from 3D coordinates to 2D oblique projection coordinates for and svg drawing. 
	Reference: https://en.wikipedia.org/wiki/Oblique_projection
	3D z-coordinate is parallel to svg Canva y-coordinate but has opposite orientation.
   	3D y-coordinate is parallel to svg Canva x-coordinate and have same orientation. 
   	3D x-axis is skewed 45 degrees and is oriented toward the svg Canva.
	*/

	// SVG viewport size
	const svgWidth = 400;
	const svgHeight = 400;
  
	// Conversion factors based on oblique angle
	const skewedAngle = Math.PI * 45 / 180;
	const cosAngle = Math.cos(skewedAngle);
	const sinAngle = Math.sin(skewedAngle);
  
	// SVG canvas origin coordinates (0, 0, 0) (considering flipped z-axis)
	const Ox = svgWidth * sinAngle / 2;
	const Oy = svgHeight * (1 - cosAngle) / 2;
  
	// Calculate 2D coordinates
	const x2 = Ox + y1 - x1 * cosAngle;
	const y2 = Oy - z1 + x1 * cosAngle;
  
	return { x: x2, y: y2 };
  }

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

var p0 = { x: canvas.height / 2, y: canvas.height / 2 };
var p2 = { x: 0, y: 0 };
//set min and max input values
document.getElementById("xCoordinate").min = -canvas.height / 2;
document.getElementById("yCoordinate").min = -canvas.height / 2;
document.getElementById("xCoordinate").max = canvas.height / 2;
document.getElementById("yCoordinate").max = canvas.height / 2;
//Call the function when some value is entered
document.getElementById("xCoordinate").oninput = function () { updateMagnitudeAndDirection() };
document.getElementById("yCoordinate").oninput = function () { updateMagnitudeAndDirection() };

