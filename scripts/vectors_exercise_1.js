// Exercise enunciate
/*A boatman is rowing on the boat, wanting to always stay perpendicular to the river bank and crossing with an average speed of 36 km / h. The river water flows with a speed of 9 km / h. How fast should the boat be propelled? In what direction?*/

// Exercise data. 
const vRiver = [9, 0]; // Water velocity; parallel to river bank; so parallel to x-axis.
const vBoat = [0, 36]; // Speed of 36 km/h perpendicular to river bank; so parallel to y-axis.

// Boat velocity, vBoat, is the composition of water velocity, vRiver, and the Velocity with which the boat is propelled by the boatman, vPropelled => vBoat = vRiver + vPropelled. So,vPropelled = vBoat - vRiver. 
const vPropelled = math.subtract(vBoat, vRiver); 

//Calculate the solutions
const normvPropelled = math.norm(vPropelled); // How fast should the boat be propelled?
// From the dot product, see [1.13] 
const phi = math.acos(math.dot(vRiver, vPropelled)/(math.norm(vRiver)*normvPropelled))*180/math.PI;

function writeValue(elementId, value) {
    const element = document.getElementById(elementId);
    if (Array.isArray(value)) {
      element.innerHTML = value.join(", "); // Join elements for arrays
    } else {
      element.innerHTML = value; // Set single value directly
    }
};

writeValue("avgSpeed", vBoat[1]);
writeValue("riverSpeed", vRiver[0]);
writeValue("vBoat", vBoat);
writeValue("vRiver", vRiver);
writeValue("vBoat1", vBoat);
writeValue("vRiver1", vRiver);
writeValue("vPropelled", vPropelled);
writeValue("normvPropelled", normvPropelled.toFixed(1));
writeValue("phi1", phi.toFixed(1));
writeValue("normvPropelled1", normvPropelled.toFixed(1));
writeValue("phi2", phi.toFixed(1));

function drawSvg2_1(svgElementId){
    // Get the SVG element from the DOM
    const svg2_1 = document.getElementById(svgElementId);

    // Set attributes
    svg2_1.setAttribute("viewBox", "0 0 400 400"); 
    svg2_1.setAttribute("width", "400"); 
    svg2_1.setAttribute("height", "400");

    // set a cartesian plane where the river bank is parallel to x-axis.
    const myPlane2_1 = new CartesianPlane(svg2_1, -23, 23, -6, 40);
    myPlane2_1.drawAxes("y-axis", "x-axis", "O");

    // Write exercise data
    myPlane2_1.drawLabel([7, 39], "Data:", {corner: "lefttop", fontSize: 15});
    myPlane2_1.drawLabel([7, 36], "Vr = <9, 0> Km/h", {corner: "lefttop", fontSize: 15});
    myPlane2_1.drawLabel([7, 33], "Vb = <0, 36> Km/h", {corner: "lefttop", fontSize: 15});


    // Set a common initial point for the vectors at the origin of coordinates 
    const initialPoint = [0, 0];

    // Draw Vr
    const Vr = TextWithSubscript("V", "r");
    myPlane2_1.drawVector(initialPoint, vRiver, Vr, {strokeColor: "green"}, {corner: "righttop"});

    // Draw Vp
    const Vp = TextWithSubscript("V", "p");
    myPlane2_1.drawVector(initialPoint, vPropelled, Vp, {strokeColor: "blue"}, {corner: "righttop"});

    // Draw V components
    myPlane2_1.drawSegment(vPropelled, math.multiply(-1, vRiver), {strokeColor: "green", strokeDasharray: "5,5"});
    myPlane2_1.drawVector(initialPoint, math.multiply(-1, vRiver), "Vx = -Vrx", {strokeColor: "green"}, {corner: "righttop"});
    myPlane2_1.drawSegment(vPropelled, vBoat, {strokeColor: "green", strokeDasharray: "5,5"});
    myPlane2_1.drawVector(initialPoint, vBoat, "Vy = Vby", {strokeColor: "green"}, {corner: "lefttop"});
    myPlane2_1.drawArc(initialPoint, vRiver, vPropelled, 3);
    myPlane2_1.drawLabel([3,3], "φ", {fill: "blue", corner: "leftbottom"}); // phi

    // Write the solutions
    myPlane2_1.drawLabel([7, 30], "Solution:", {corner: "lefttop", fontSize: 15});
    myPlane2_1.drawLabel([7, 27], "φ = " + phi.toFixed(1).toString() + "º", {corner: "lefttop", fontSize: 15});
    myPlane2_1.drawLabel([7, 24], "|Vp| = " + normvPropelled.toFixed(1).toString() + " Km/h", {corner: "lefttop", fontSize: 15});
}


drawSvg2_1("svg2_1");

