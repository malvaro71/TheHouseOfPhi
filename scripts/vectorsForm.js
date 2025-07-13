// form id="coordToMagDir" Calculate vector magnitude and direction from given coordinates and show it in a canvas.

{
	function openForm(formID) {
		document.getElementById(formID).style.display = "block";
	}
	
	function closeForm(formID) {
		document.getElementById(formID).style.display = "none";
	}

	function updateMagnitudeAndDirection(xInput, yInput, mag, dir, canvas) {
        //const xObj = document.getElementById(xID);
		//const yObj = document.getElementById(yID);
        const p0 = { x: canvas.height / 2, y: canvas.height / 2 };
        const p2 = { x: 0, y: 0 };
		p2.x = parseFloat(xInput.value) + canvas.height / 2;
		p2.y = -parseFloat(yInput.value) + canvas.height / 2;
		let mod = Math.sqrt((p2.x - p0.x) ** 2 + (p2.y - p0.y) ** 2);
		let thetaRad = Math.atan2(-p2.y + p0.y, p2.x - p0.x);
		let thetaDeg = thetaRad * 180 / Math.PI;
	
		if (!xInput.checkValidity()) {
			alert(xInput.validationMessage);
		} else {
			if (!yInput.checkValidity()) {
				alert(yInput.validationMessage);
			} else {
				//shows magnitude with two decimals
				document.getElementById(mag).innerHTML =
					Math.round((mod + Number.EPSILON) * 100) / 100;
				//shows direction with two decimals	
				document.getElementById(dir).innerHTML =
					Math.round((thetaDeg + Number.EPSILON) * 100) / 100;
				//draw the vector	
				drawSegmentWithArrowhead(p0, p2, 5, canvas);
			}
		}
	}

	function drawSegmentWithArrowhead(pa, pb, headLength, canvas) {
		const ctx = canvas.getContext("2d");
        // calc the angle of the line
		var dx = pb.x - pa.x;
		var dy = pb.y - pa.y;
		var angle = Math.atan2(dy, dx);
		//Define the style to use as "green", when drawing in the canvas context
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

    function manageCanvas(canvasID, xID, yID, magID, dirID){
        const canvas = document.getElementById(canvasID);
        const xInput = document.getElementById(xID);
		const yInput = document.getElementById(yID);
        //set min and max input values
        xInput.min = -canvas.height / 2;
        yInput.min = -canvas.height / 2;
        xInput.max = canvas.height / 2;
        yInput.max = canvas.height / 2;
        //Call the function when some value is entered
        xInput.oninput = function () { updateMagnitudeAndDirection(xInput, yInput, magID, dirID, canvas) };
        yInput.oninput = function () { updateMagnitudeAndDirection(xInput, yInput, magID, dirID, canvas) };
    }

    document.addEventListener('DOMContentLoaded', () => {
        const button = document.getElementById('openFormButton');
        if (button) {
            button.addEventListener('click', () => openForm('coordToMagDir'));
        }
    });

    document.addEventListener('DOMContentLoaded', () => {
        const closeButton = document.getElementById('closeFormButton');
        if (closeButton) {
            closeButton.addEventListener('click', () => closeForm('coordToMagDir'));
        }
    });

    document.addEventListener("DOMContentLoaded", () => {
        // Solo inicializa el canvas si existe en la página actual
        const canvas = document.getElementById("myCanvasEng");
        if (canvas) {
            manageCanvas("myCanvasEng", "xCoordinate", "yCoordinate", "magnitude", "direction");
        }
    });
}