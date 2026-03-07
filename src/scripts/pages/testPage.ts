import { CartesianPlane } from '../core/CartesianPlane.ts';
import { ensureSharedMarkerDefs } from '../core/SVGDrawing.ts';
import type { Point2D } from '../core/types.ts';
import * as math from 'mathjs';

const vecA: Point2D = [2, 4]; // Vector fijo A definido en el ejercicio

/**
 * Dibuja el gráfico de prueba en el SVG con id "svg_test_simple".
 * Si se pasa un vector 'vecSum', redibuja el gráfico con ese valor.
 */
function drawTestSimple(vecSum?: Point2D) {
  const el = document.getElementById('svg_test_simple');
  if (!(el instanceof SVGElement)) {
    return;
  }

  let vec: Point2D;

  if (vecSum) {
    // Modo actualización: Limpiamos el SVG y usamos el nuevo vector
    el.innerHTML = '';
    vec = vecSum;
  } else {
    // Modo inicial: Leemos del atributo HTML
    if (el.hasAttribute('data-drawn')) return;
    
    const vecStr = el.getAttribute('data-vec');
    if (!vecStr) return;
    
    try {
      vec = JSON.parse(vecStr) as Point2D;
    } catch (err) {
      console.error('[testPage] invalid data-vec JSON', err);
      return;
    }
  }

  try {
    ensureSharedMarkerDefs();

    // Ajustamos el rango para que quepan vectores más grandes si el usuario cambia los valores
    const plane = new CartesianPlane(el, -2, 10, -2, 10, 35);
    plane.drawAxes('y', 'x', 'O');
    
    // Dibujamos A para referencia
    plane.drawVectorB([0, 0], vecA, '\\vec{a}', { strokeColor: 'blue' });

    // Dibujamos el vector resultante (Suma)
    plane.drawVectorB([0, 0], vec, '\\vec{v}_{test}', { strokeColor: 'purple' });
    plane.drawMath([1, 8], `\\vec{v}_{test} = (${vec[0]}, ${vec[1]})`, { color: 'purple', scale: 1.2 });

    el.setAttribute('data-drawn', 'true');
  } catch (err) {
    console.error('[testPage] drawing error', err);
  }
}

function drawTestStatic() {
  const el = document.getElementById('svg_test_static');
  if (!(el instanceof SVGElement)) return;
  if (el.hasAttribute('data-drawn')) return;

  const vecStr = el.getAttribute('data-vec');
  if (!vecStr) return;

  let vec: Point2D;
  try {
    // When parsing, we must cast to the expected type. In this case it is Point2D.
    vec = JSON.parse(vecStr) as Point2D;
  } catch (err) {
    console.error('[testPage] invalid data-vec JSON', err);
    return;
  }

  try {
    ensureSharedMarkerDefs();
    const plane = new CartesianPlane(el, -2, 10, -2, 10, 35);
    plane.drawAxes('y', 'x', 'O');
    plane.drawVectorB([0, 0], vecA, '\\vec{a}', { strokeColor: 'blue' });
    plane.drawVectorB([0, 0], vec, '\\vec{v}_{test}', { strokeColor: 'purple' });
    plane.drawMath([1, 8], `\\vec{v}_{test} = (${vec[0]}, ${vec[1]})`, { color: 'purple', scale: 1.2 });
    el.setAttribute('data-drawn', 'true');
  } catch (err) {
    console.error('[testPage] drawing error', err);
  }
}

function setupInteractivity() {
  const inputBx = document.getElementById('input-bx') as HTMLInputElement;
  const inputBy = document.getElementById('input-by') as HTMLInputElement;

  if (!inputBx || !inputBy) return;

  const update = () => {
    const bx = parseFloat(inputBx.value) || 0;
    const by = parseFloat(inputBy.value) || 0;

    // Calcular nueva suma
    const vecB: Point2D = [bx, by];
    const vecSum = math.add(vecA, vecB) as Point2D;

    // Redibujar
    drawTestSimple(vecSum);
  };

  inputBx.addEventListener('input', update);
  inputBy.addEventListener('input', update);
}

// Ejecución automática en el cliente
if (typeof document !== 'undefined') {
    // Intentar dibujar inmediatamente
    drawTestSimple();
    drawTestStatic();
    setupInteractivity();
    // Asegurar dibujo al cargar el DOM
    document.addEventListener('DOMContentLoaded', () => {
      drawTestSimple();
      drawTestStatic();
      setupInteractivity();
    });
    // Asegurar redibujado en navegación SPA
    document.addEventListener('astro:after-swap', () => {
      drawTestSimple();
      drawTestStatic();
      setupInteractivity();
    });
}