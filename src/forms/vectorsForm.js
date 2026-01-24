// ============================================================================
// vectorsForm.js — ES Module for vectors_es.html and vectors_en.html
// ============================================================================

// ------------------------------------------------------------
// Show / hide form
// ------------------------------------------------------------
function openForm(formID) {
    const form = document.getElementById(formID);
    if (form) form.style.display = "block";
}

function closeForm(formID) {
    const form = document.getElementById(formID);
    if (form) form.style.display = "none";
}

// ------------------------------------------------------------
// Compute magnitude and direction from (x, y) and draw vector
// ------------------------------------------------------------
function updateMagnitudeAndDirection(xInput, yInput, magID, dirID, canvas) {

    const p0 = { x: canvas.height / 2, y: canvas.height / 2 }; // origin in canvas
    const p2 = {
        x: parseFloat(xInput.value) + canvas.height / 2,
        y: -parseFloat(yInput.value) + canvas.height / 2
    };

    const dx = p2.x - p0.x;
    const dy = p2.y - p0.y;

    const magnitude = Math.sqrt(dx * dx + dy * dy);
    const thetaRad = Math.atan2(-dy, dx);
    const thetaDeg = thetaRad * 180 / Math.PI;

    // Validate inputs
    if (!xInput.checkValidity()) {
        alert(xInput.validationMessage);
        return;
    }
    if (!yInput.checkValidity()) {
        alert(yInput.validationMessage);
        return;
    }

    // Write magnitude and direction
    document.getElementById(magID).innerHTML =
        Math.round((magnitude + Number.EPSILON) * 100) / 100;

    document.getElementById(dirID).innerHTML =
        Math.round((thetaDeg + Number.EPSILON) * 100) / 100;

    // Draw vector
    drawSegmentWithArrowhead(p0, p2, 5, canvas);
}

// ------------------------------------------------------------
// Draw vector with arrowhead in canvas
// ------------------------------------------------------------
function drawSegmentWithArrowhead(pa, pb, headLength, canvas) {

    const ctx = canvas.getContext("2d");

    const dx = pb.x - pa.x;
    const dy = pb.y - pa.y;
    const angle = Math.atan2(dy, dx);

    // Clear canvas
    ctx.clearRect(0, 0, canvas.height, canvas.height);

    // Draw axes
    ctx.beginPath();
    ctx.lineWidth = 0.3;
    ctx.strokeStyle = "green";

    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.height, canvas.height / 2);

    ctx.moveTo(canvas.height / 2, 0);
    ctx.lineTo(canvas.height / 2, canvas.height);

    ctx.stroke();

    // Axis labels
    ctx.font = "10px Arial";
    ctx.fillStyle = "brown";
    ctx.fillText("X", canvas.height - 10, canvas.height / 2 - 4);
    ctx.fillText("Y", canvas.height / 2 - 10, 10);

    // Draw vector
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.moveTo(pa.x, pa.y);
    ctx.lineTo(pb.x, pb.y);

    // Arrowhead (two lines)
    ctx.moveTo(pb.x, pb.y);
    ctx.lineTo(
        pb.x + headLength * Math.cos(angle + 220 * Math.PI / 180),
        pb.y + headLength * Math.sin(angle + 220 * Math.PI / 180)
    );

    ctx.moveTo(pb.x, pb.y);
    ctx.lineTo(
        pb.x + headLength * Math.cos(angle + 140 * Math.PI / 180),
        pb.y + headLength * Math.sin(angle + 140 * Math.PI / 180)
    );

    ctx.stroke();
}

// ------------------------------------------------------------
// Initialize canvas and inputs
// ------------------------------------------------------------
function manageCanvas(canvasID, xID, yID, magID, dirID) {

    const canvas = document.getElementById(canvasID);
    const xInput = document.getElementById(xID);
    const yInput = document.getElementById(yID);

    if (!canvas || !xInput || !yInput) return;

    // Set input limits based on canvas size
    xInput.min = -canvas.height / 2;
    yInput.min = -canvas.height / 2;
    xInput.max = canvas.height / 2;
    yInput.max = canvas.height / 2;

    // Update vector when inputs change
    xInput.oninput = () =>
        updateMagnitudeAndDirection(xInput, yInput, magID, dirID, canvas);

    yInput.oninput = () =>
        updateMagnitudeAndDirection(xInput, yInput, magID, dirID, canvas);
}

// ------------------------------------------------------------
// DOMContentLoaded — initialize everything
// ------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {

    // Open form button
    const openButton = document.getElementById("openFormButton");
    if (openButton) {
        openButton.addEventListener("click", () => openForm("coordToMagDir"));
    }

    // Close form button
    const closeButton = document.getElementById("closeFormButton");
    if (closeButton) {
        closeButton.addEventListener("click", () => closeForm("coordToMagDir"));
    }

    // Initialize canvas only if present
    const canvas = document.getElementById("myCanvasEng");
    if (canvas) {
        manageCanvas("myCanvasEng", "xCoordinate", "yCoordinate", "magnitude", "direction");
    }
});

// END OF FILE