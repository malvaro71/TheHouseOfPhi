import { CartesianPlane } from '../core/CartesianPlane.ts';
import { ensureSharedMarkerDefs } from '../core/SVGDrawing.ts';
import type { Point2D } from '../core/types.ts';

/**
 * Dibuja el gráfico de prueba en el SVG con id "svg_test_simple".
 * Seguro para SSR: no ejecuta nada en el servidor porque solo se llama desde init() en cliente.
 */
function drawTestSimple() {
  const el = document.getElementById('svg_test_simple');
  if (!(el instanceof SVGElement)) {
    console.warn('[testPage] SVG element not found or wrong type');
    return;
  }

  if (el.hasAttribute('data-drawn')) {
    return; // idempotencia: ya dibujado
  }

  const vecStr = el.getAttribute('data-vec');
  if (!vecStr) {
    console.warn('[testPage] data-vec attribute missing');
    return;
  }

  let vec: Point2D;
  try {
    vec = JSON.parse(vecStr) as Point2D;
  } catch (err) {
    console.error('[testPage] invalid data-vec JSON', err);
    return;
  }

  try {
    ensureSharedMarkerDefs();

    const plane = new CartesianPlane(el, -1, 5, -1, 5, 50);
    plane.drawAxes('y', 'x', 'O');
    plane.drawVectorB([0, 0], vec, '\\vec{v}_{test}', { strokeColor: 'purple' });

    el.setAttribute('data-drawn', 'true');
  } catch (err) {
    console.error('[testPage] drawing error', err);
  }
}

/**
 * Inicializador público que debe ser llamado desde el cliente.
 * Se asegura de esperar al DOM y maneja navegación SPA de Astro.
 */
export default function init() {
  if (typeof window === 'undefined') return; // protección extra para SSR

  const run = () => {
    try {
      drawTestSimple();
    } catch (err) {
      console.error('[testPage] unexpected error in run', err);
    }
  };

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    run();
  } else {
    document.addEventListener('DOMContentLoaded', run, { once: true });
  }

  // Para navegación interna de Astro
  document.addEventListener('astro:after-swap', run);
}