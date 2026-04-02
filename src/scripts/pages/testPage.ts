import { CartesianPlane } from '../core/CartesianPlane.ts';
import { ensureSharedMarkerDefs } from '../core/SVGDrawing.ts';
import type { Point2D } from '../core/types.ts';
import * as math from 'mathjs';

const vecA: Point2D = [2, 4]; // Fixed vector A defined in the exercise

/**
 * Draws the test graph in the SVG with id "svg_test_simple".
 * If a 'vecSum' vector is passed, it redraws the graph with that value.
 */
function drawTestSimple(vecSum?: Point2D) {
  const el = document.getElementById('svg_test_simple');
  if (!(el instanceof SVGElement)) {
    return;
  }

  let vec: Point2D;

  if (vecSum) {
    // Update mode: Clear the SVG and use the new vector
    el.innerHTML = '';
    vec = vecSum;
  } else {
    // Initial mode: Read from the HTML attribute
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

    // Adjust the range to accommodate larger vectors if the user changes values
    const plane = new CartesianPlane(el, -2, 10, -2, 10, 35);
    plane.drawAxes('y', 'x', 'O');
    
    // Draw A for reference
    plane.drawVectorB([0, 0], vecA, '\\vec{a}', { strokeColor: 'blue' });

    // Draw the resulting vector (Sum)
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

    // Calculate new sum
    const vecB: Point2D = [bx, by];
    const vecSum = math.add(vecA, vecB) as Point2D;

    // Redraw
    drawTestSimple(vecSum);
  };

  inputBx.addEventListener('input', update);
  inputBy.addEventListener('input', update);
}

// Automatic client-side execution
if (typeof document !== 'undefined') {
    // Attempt to draw immediately
    drawTestSimple();
    drawTestStatic();
    setupInteractivity();
    // Ensure drawing when DOM loads
    document.addEventListener('DOMContentLoaded', () => {
      drawTestSimple();
      drawTestStatic();
      setupInteractivity();
    });
    // Ensure redrawing on SPA navigation
    document.addEventListener('astro:after-swap', () => {
      drawTestSimple();
      drawTestStatic();
      setupInteractivity();
    });
}