# Create separate variables for each part of your physics exercise content (enunciate, analysis, equation, etc.).
const enunciate = '<h3 class="lang lang-en">Exercise 1</h3>
                   <h3 class="lang lang-es" lang="es">Ejercicio 1</h3>
                   <p class="lang lang-en">
                      A boatman is rowing on the boat, wanting to always stay perpendicular to the river bank and crossing with an average speed of 36 km / h. The river water flows with a speed of 9 km / h. How fast should the boat be propelled? In what direction?
                   </p>
                   <p class="lang lang-es" lang="es">
                       Un barquero está remando en el bote, queriendo mantenerse siempre perpendicular a la orilla del río y cruzando con una velocidad media de 36 km/h. El agua del río fluye a una velocidad de 9 km/h. ¿A qué velocidad debe propulsarse el bote? ¿En qué dirección?
                   </p>';
const analysis1 = '<p class="lang lang-en">
                      Lets represent the river in a coordinate plane where the water flows in same direction thant the x-axis, and the y-axis is perpendicular to the river bank. Then, we represent `vecv_r` as water velocity and `vecv` as the velocity with which the boat is propelled. And decompose `vecv` into its x and y components. As the vectors that represent velocity are free vectors, we place the origin of `vecv_r` and `vecv` at the origin of coordinates, as standard-position vectors.
                  </p>
                  <p class="lang lang-es" lang="es">
                      Vamos a representar el río en un plano de coordenadas donde el agua fluye en la misma dirección que el eje x, y el eje y es perpendicular a la orilla del río. Luego, representamos `vecv_r` como la velocidad del agua del río y `vecv` como la velocidad con la que se propulsa el bote. Y descomponer `vecv` en sus componentes x e y. Como los vectores que representan la velocidad son vectores libres, situamos el origen de `vecv_r` y `vecv` en el origen de coordenadas, como vectores de posición estándar.
                  </p>';
const figure = '<figure class="centered">
                  <svg id="svg2_1"></svg>
                  <figcaption class="lang lang-en"><b>Figure 2.1</b>, showing coordinate-plane, `vecv_r` as the water velocity and `vecv` as the velocity with which the boat is propelled.</figcaption>
                  <figcaption class="lang lang-es" lang="es"><b>Figura 2.1</b>, mostrando plano de coordenadas, `vecv_r` como la velocidad del agua del río y `vecv` como la velocidad con la que se propulsa el bote.</figcaption>
                </figure>';
