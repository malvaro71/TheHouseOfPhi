// Define a variable containing the complete HTML content for the exercise.
const exerciseContent = `
    <div class="lang lang-en">
        <h3>Exercise 1</h3>
        <p>
            A boatman is rowing on the boat, wanting to always stay perpendicular to the river bank and crossing with an average speed of 36 km / h. The river water flows with a speed of 9 km / h. How fast should the boat be propelled? In what direction?
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
            Vamos a representar el río en un plano de coordenadas donde el agua fluye en la misma dirección que el eje x, y el eje y es perpendicular a la orilla del río. Luego, representamos \`vecv_r\` como la velocidad del agua del río y \`vecv\` como la velocidad con la que se propulsa el bote. Y descomponer \`vecv\` en sus componentes x e y. Como los vectores que representan la velocidad son vectores libres, situamos el origen de \`vecv_r\` y \`vecv\` en el origen de coordenadas, como vectores de posición estándar.
        </p>
        <p>
            Según los datos del ejercicio,
        </p>
        <p>
            &emsp; \`vecv_r = << 9 (Km)/h, 0 (Km)/h >> \`,
        </p>
        <p>
            &emsp; \`vecv = << v_x , v_y >> \`,
        </p>
        <p>
            Podemos considerar que la velocidad del bote respecto a la orilla del río es una suma de la velocidad con la que se propulsa el bote \`vecv\` más la la velocidad del agua del río \`vecv_r\`. Por ejemplo si el barquero no remara, \`vecv = vec0\` y la velocidad del bote respecto a la orilla sería igual a la velocidad del agua del río. Entonces,
        </p>
        <p>
            &emsp; \`vecv + vecv_r = << 9 + v_x (Km)/h, v_y (Km)/h >> \`.
        </p>
        <p>
            Entonces, para permanecer perpendicular al río, la componente x de la suma debe ser cero.
        </p>
        <p >
            &emsp; \`9 + v_x = 0 => v_x = -9 (km)/h\`
        </p>
        <p>
            y, como el barquero quire cruzar con una velocidad media de 36 km/h, la componente y de la suma debe ser 36 km/h.
        </p>
        <p>
            &emsp; \`v_y = 36 (km)/h\`,
        </p>
        <p>
            &emsp; \`vecv = << -9 (Km)/h, 36 (Km)/h >>\`
        </p>
        <p>
            La magnitud del vector \`vec v\` es la velocidad a la se impulsa el bote. Y se expresa como \`norm(vecv)\`.
        </p>
        <p>
            &emsp; \`norm(vecv) = sqrt(v_x^2+v_y^2) = sqrt(9^2 + 36^2) = sqrt(81+1296) = sqrt(1377) = 37.11 (km)/h.\`
        </p>
        <p>
            El valor del ángulo  &phi; es la dirección en la que se impulsa el bote. <br />
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
