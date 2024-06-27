
// Exercise data. 
const vRiver = [9, 0]; // Water velocity; parallel to river bank; so parallel to x-axis.
const vBoat = [0, 36]; // Speed of 36 km/h perpendicular to river bank; so parallel to y-axis.

// Boat velocity, vBoat, is the composition of water velocity, vRiver, and the Velocity with which the boat is propelled by the boatman, vPropelled => vBoat = vRiver + vPropelled. So,vPropelled = vBoat - vRiver. 
const vPropelled = math.subtract(vBoat, vRiver); 

//Calculate the solutions
const normvPropelled = math.norm(vPropelled); // How fast should the boat be propelled?
// From the dot product, see [1.13] 
const phi = math.acos(math.dot(vRiver, vPropelled)/(math.norm(vRiver)*normvPropelled))*180/math.PI;

// Define a variable containing the complete HTML content for the exercise.
const exerciseContentEng = `
    <h3>Exercise 1</h3>
    <p>
        A boatman is rowing on the boat, wanting to always stay perpendicular to the river bank and crossing with an average speed of 9 km / h. The river water flows with a speed of 9 km / h. How fast should the boat be propelled? In what direction?
    </p>
    <p>
        The velocity of the boat \`vecv_b\` is the sum of the velocity with which the boat \`vecv_p\` is propelled by the boatman plus the velocity of the river water \`vecv_r\`. Then:
    </p>
    <p>
        &emsp; \`vecv_p = vecv_b - vecv_r \`,
    </p>
    <p>
        If we choose the coordinate plane so that the x-axis has the same direction as the river:
    </p>
    <p>
            &emsp; \`vecv_b\` = (${vBoat[0]}, ${vBoat[1]}) Km/h,
    </p>
    <p>
            &emsp; \`vecv_r\` = (${vRiver}) Km/h,
    </p>
    <p>
            &emsp; \`vecv_p\` = (${vBoat}) - (${vRiver}) = (${vPropelled}) Km/h,
    </p>
    <p>
        The magnitude of the vector \`vec v_p\` is the speed at which the boat is propelled, is expressed as \`norm(vecv_p)\` and, according to <a href="#[1.2]">[1.2]</a>, is calculated as:
    </p>
    <p>
        &emsp; \`norm(vecv_p) = sqrt(v_x^2+v_y^2) = sqrt(9^2 + 36^2) = sqrt(81+1296) = sqrt(1377)\` = ${normvPropelled.toFixed(1)} Km/h.
    </p>
    <p>
        The value of the angle &phi; is the direction in which the boat is propelled, corresponds to the orientation of \`vecv_p\` and according to <a href="#[1.13]">[1.13]</a>, is calculated as:
    </p>
    <p>
        &emsp; &phi; \` = arccos((norm(vecv_p)norm(vecv_r))/(vecv_p*vecv_r))\` = ${phi.toFixed(1)}º
    </p>
    <p>
        So, the answer to the exercise is that the boat must be propeled at a speed of ${normvPropelled.toFixed(1)} Km/h and in a direction that forms ${phi.toFixed(1)}º with the river.
    </p>
    <aside><!--References-->
        <!-- references to concepts used in this problem target="_blank" will display the link in a new tab. -->
        <h4  >References</h4>
        <ul>
            <li>
                <a href="https://www.mathsisfun.com/definitions/coordinate-plane.html" target="_blank">
                    [1] Coordinate Plane.
                </a>
            </li>
            <li>
                <a href="https://www.mathsisfun.com/algebra/vectors.html" target="_blank">
                    [2] Vectors.
                </a>
            </li>
            <li>
                <a href="https://www.mathsisfun.com/measure/speed-velocity.html" target="_blank">
                    [3] Speed and Velocity.
                </a>
            </li>
            <li>
                <a href="https://www.mathsisfun.com/algebra/trig-four-quadrants.html" target="_blank">
                    [4] Sine, Cosine and Tangent in Four Quadrants.
                </a>
            </li>
            <li>
                <a href="https://www.mathsisfun.com/algebra/vectors-dot-product.html" target="_blank">
                    [5] Dot Product.
                </a>
            </li>
        </ul>
    </aside>
`;

// Access the section element
const divEng = document.getElementById("vectors_exercise_1_en");

// Insert the content within the section.
divEng.innerHTML = exerciseContentEng;   

const exerciseContentEsp = `
    <h3>Ejercicio 1</h3>
    <p>
        Un barquero está remando en el bote, queriendo mantenerse siempre perpendicular a la orilla del río y cruzando con una velocidad media de 36 km/h. El agua del río fluye a una velocidad de 9 km/h. ¿A qué velocidad debe propulsarse el bote? ¿En qué dirección?
    </p>
    <p>
        La velocidad del bote \`vecv_b\` es la suma de la velocidad con la que el barquero propulsa el bote \`vecv_p\` más la velocidad del agua del río \`vecv_r\`. Entonces:
    </p>
    <p>
        &emsp; \`vecv_p = vecv_b - vecv_r \`,
    </p>
    <p>
        Si elegimos el plano de coordenadas de manera que el eje x tenga la misma dirección que el río:
    </p>
    <p>
        &emsp; \`vecv_b\` = ${vBoat} Km/h,
    </p>
    <p>
        &emsp; \`vecv_r\` = ${vRiver} Km/h,
    </p>
    <p>
        &emsp; \`vecv_p\` = (${vBoat}) - (${vRiver}) = (${vPropelled}) Km/h,
    </p>
    <p>
        La magnitud del vector \`vec v_p\` es la velocidad a la que se impulsa el bote, se expresa como \`norm(vecv_p)\` y, según <a href="#[1.2]">[1.2]</a>, se calcula como:
    </p>
    <p>
        &emsp; \`norm(vecv_p) = sqrt(v_x^2+v_y^2) = sqrt(9^2 + 36^2) = sqrt(81+1296) = sqrt(1377)\` = ${normvPropelled.toFixed(1)} (km)/h.
    </p>
    <p>
        El valor del ángulo  &phi; es la dirección en la que se impulsa el bote, corresponde con la orientación de \`vecv_p\` y según <a href="#[1.13]">[1.13]</a>, se calcula como:
    </p>
    <p>
        &emsp; &phi; \` = arccos((norm(vecv_p)norm(vecv_r))/(vecv_p*vecv_r))\` = ${phi.toFixed(1)}º
    </p>
    <p>
        Entonces, la respuesta al ejercicio es que la embarcación debe ser impulsada a una velocidad de ${normvPropelled.toFixed(1)} Km/h y en una dirección que forme ${phi.toFixed(1)}º con el río.
    </p>
    <aside><!--References-->
        <!-- references to concepts used in this problem target="_blank" will display the link in a new tab. -->
        <h4>Referencias</h4>
        <ul>
            <li>
                <a href="https://www.mathsisfun.com/definitions/coordinate-plane.html" target="_blank">
                    [1] Coordinate Plane.
                </a>
            </li>
            <li>
                <a href="https://www.mathsisfun.com/algebra/vectors.html" target="_blank">
                    [2] Vectors.
                </a>
            </li>
            <li>
                <a href="https://www.mathsisfun.com/measure/speed-velocity.html" target="_blank">
                    [3] Speed and Velocity.
                </a>
            </li>
            <li>
                <a href="https://www.mathsisfun.com/algebra/trig-four-quadrants.html" target="_blank">
                    [4] Sine, Cosine and Tangent in Four Quadrants.
                </a>
            </li>
            <li>
                <a href="https://www.mathsisfun.com/algebra/vectors-dot-product.html" target="_blank">
                    [5] Dot Product.
                </a>
            </li>
        </ul>
    </aside>
`;

// Access the section element
const divEsp = document.getElementById("vectors_exercise_1_es");

// Insert the content within the section.
divEsp.innerHTML = exerciseContentEsp;

const exerciseFigure = `
    <svg id="svg2_1"></svg>
    <figcaption class="lang lang-en"><b>Figure 2.1</b>, showing coordinate-plane, \`vecv_r\` as the water velocity and \`vecv\` as the velocity with which the boat is propelled.</figcaption>
    <figcaption class="lang lang-es" lang="es"><b>Figura 2.1</b>, mostrando plano de coordenadas, \`vecv_r\` como la velocidad del agua del río y \`vecv\` como la velocidad con la que se propulsa el bote.</figcaption>
`;

// Access the section element
const figure = document.getElementById("vectors_exercise_1_fig");

// Insert the content within the section.
figure.innerHTML = exerciseFigure;

// Get the SVG element from the DOM
var svg2_1 = document.getElementById("svg2_1");

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
