// Exercise data. 
const vRiver = [9, 0]; // Water velocity; parallel to river bank; so parallel to x-axis.
const vBoat = [0, 36]; // Speed of 36 km/h perpendicular to river bank; so parallel to y-axis.

// Boat velocity, vBoat, is the composition of water velocity, vRiver, and the Velocity with which the boat is propelled, vPropelled: vBoat = vRiver + vPropelled. So vPropelled = vBoat - vRiver. 
const vPropelled = math.add(math.multiply(-1, vRiver), vBoat); // Velocity with which the boat is propelled.

//Calculate the solutions
const normvPropelled = math.norm(vPropelled); // How fast should the boat be propelled?
const phi = angleBetweenVectorsCCW(vRiver, vPropelled)*180/Math.PI; //In what direction?

// Define a variable containing the complete HTML content for the exercise.
const exerciseContent = `
    <div class="lang lang-en">
        <h3>Exercise 1</h3>
        <p>
            A boatman is rowing on the boat, wanting to always stay perpendicular to the river bank and crossing with an average speed of ${vBoat[1]} km / h. The river water flows with a speed of 9 km / h. How fast should the boat be propelled? In what direction?
        </p>
        <p>
            Lets represent the river in a coordinate plane where the water flows in same direction thant the x-axis, and the y-axis is perpendicular to the river bank. Then, we represent  \`vecv_r \` as water velocity and  \`vecv \` as the velocity with which the boat is propelled. And decompose  \`vecv \` into its x and y components. As the vectors that represent velocity are free vectors, we place the origin of \`vecv_r\` and \`vecv \` at the origin of coordinates, as standard-position vectors.
        </p>
        <p>
            According to the data of the exercise,
        </p>
        <p>
            &emsp;  \`vecv_r = << 9 (Km)/h, 0 (Km)/h >> \`,
        </p>
        <p>
            &emsp; \`vecv = << v_x , v_y >> \`,
        </p>
        <p>
            We can consider that the speed of the boat with respect to the river bank is a sum of the speed with which the boat is propelled \`vecv\` plus the speed of the river water \`vecv_r\`. For example, if the boatman did not row, \`vecv = vec0\` and the speed of the boat with respect to the shore would be equal to the speed of the river water. So,
        </p>
        <p>
            &emsp; \`vecv + vecv_r = << 9 + v_x (Km)/h, v_y (Km)/h >> \`.
        </p>
        <p>
            So, to stay perpendicular to the river, the x-component of the vector sum must be zero.
        </p>
        <p >
            &emsp; \`9 + v_x = 0 => v_x = -9 (km)/h\`
        </p>
        <p>
            and, since the boatman wants to cross with an average speed of 36 km/h, the y component of the sum must be 36 km/h.
        </p>
        <p>
            &emsp; \`v_y = 36 (km)/h\`,
        </p>
        <p>
            &emsp; \`vecv = << -9 (Km)/h, 36 (Km)/h >>\`
        </p>
        <p>
            The magnitude of the vector \`vec v\` is the speed at wich the boat is propelled and it is
            expresed as \`norm(vecv)\`.
        </p>
        <p>
            &emsp; \`norm(vecv) = sqrt(v_x^2+v_y^2) = sqrt(9^2 + 36^2) = sqrt(81+1296) = sqrt(1377) = 37.11 (km)/h.\`
        </p>
        <p>
            The value of the angle &phi; is the direction in wich the boat is propeled. <br />
        </p>
        <p>
            &emsp; &phi; \`= arctan(v_y/v_x) = arctan(36/-9) =\` -76º
        </p>
        <p>
            this is the angle span betwen \`vecv_x\` and \`vecv\`.  <br />
        </p>
        <p>
            But normally the angle to calculate the orientation is measured from the x-axis, which in this case is in the opposite direction to \`v_x\`. So, if we measure the orientation of the boat with respect to the x axis, it would be 180 - 76 = 104º.
        </p>
        <p>
            So, the answer to the exercise is that the boat must be propeled at a speed of 37.11 Km/h and in a direction that forms 104º with the river.
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
            </ul>
        </aside>
    </div>      

    <div class="lang lang-es">
        <h3>Ejercicio 1</h3>
        <p>
            Un barquero está remando en el bote, queriendo mantenerse siempre perpendicular a la orilla del río y cruzando con una velocidad media de 36 km/h. El agua del río fluye a una velocidad de 9 km/h. ¿A qué velocidad debe propulsarse el bote? ¿En qué dirección?
        </p>
        <p>
            La velocidad del bote \`vecv_b\` es la suma de la velocidad con la que se propulsa el bote \`vecv_p\` más la velocidad del agua del río \`vecv_r\`. Entonces:
        </p>
        <p>
            &emsp; \`vecv_p = vecv_b - vecv_r \`,
        </p>
        <p>
            Si elegimos el plano de coordenadas de manera que el eje x tenga la misma dirección que el río:
        </p>
        <p>
            &emsp; \`vecv_b =\` (0, 36) Km/h ,
        </p>
        <p>
            &emsp; \`vecv_r =\` (9, 0) Km/h ,
        </p>
        <p>
            &emsp; \`vecv_p = (0, 36) - (9, 0) = (-9, 36) Km/h \`,
        </p>
        <p>
            La magnitud del vector \`vec v_p\` es la velocidad a la que se impulsa el bote, se expresa como \`norm(vecv_p)\` y, según <a href="#[1.2]">[1.2]</a>, se calcula como:
        </p>
        <p>
            &emsp; \`norm(vecv_p) = sqrt(v_x^2+v_y^2) = sqrt(9^2 + 36^2) = sqrt(81+1296) = sqrt(1377) = 37.11 (km)/h.\`
        </p>
        <p>
            El valor del ángulo  &phi; es la dirección en la que se impulsa el bote, corresponde con la orientación de \`vecv_p\` y según <a href="#[1.3]">[1.3]</a>, se calcula como: <br />
        </p>
        <p>
            &emsp; &phi; \`= arctan(v_y/v_x) = arctan(36/-9) =\` -76º
        </p>
        <p>
            Este es el ángulo que va de \`vecv_x\` a \`vecv\`.  <br />
        </p>
        <p>
            Pero, normalmente, el ángulo para calcular la orientación se mide desde el eje x, que en este caso está en dirección opuesta a \`v_x\`. Así que, si medimos la orientación del bote respecto al eje x, ésta sería 180 - 76= 104º.
        </p>
        <p>
            Entonces, la respuesta al ejercicio es que la embarcación debe ser impulsada a una velocidad de 37,11 Km/h y en una dirección que forme 104º con el río.
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
            </ul>
        </aside>
    </div>

    <figure class="centered">
        <svg id="svg2_1"></svg>
        <figcaption class="lang lang-en"><b>Figure 2.1</b>, showing coordinate-plane, \`vecv_r\` as the water velocity and \`vecv\` as the velocity with which the boat is propelled.</figcaption>
        <figcaption class="lang lang-es" lang="es"><b>Figura 2.1</b>, mostrando plano de coordenadas, \`vecv_r\` como la velocidad del agua del río y \`vecv\` como la velocidad con la que se propulsa el bote.</figcaption>
    </figure>`;

// Access the section element
const sectionElement = document.getElementById("vectors_exercise_1");

// Insert the content within the section.
sectionElement.innerHTML = exerciseContent;

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
