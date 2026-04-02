/**
 * Sets up interactivity for the dynamic math formulas.
 * Focuses on updating LaTeX expressions via MathJax in real-time.
 */
function setupInteractivity() {
  // Elementos para la prueba de raíz cuadrada dinámica
  const inputDynA = document.getElementById('input-dyn-a') as HTMLInputElement;
  const inputDynB = document.getElementById('input-dyn-b') as HTMLInputElement;
  const dynContainer = document.getElementById('dynamic-sqrt-test');

  // Declaración para MathJax (global en el navegador)
  declare const MathJax: any;

  const updateDynamicMath = () => {
    if (!inputDynA || !inputDynB || !dynContainer) return;

    const a = parseFloat(inputDynA.value) || 0;
    const b = parseFloat(inputDynB.value) || 0;
    const hypotenuse = Math.sqrt(a * a + b * b);

    // Construimos la cadena de LaTeX. 
    // IMPORTANTE: Escapamos las barras invertidas (\\sqrt en lugar de \sqrt)
    const latex = `$$ \\sqrt{${a}^2 + ${b}^2} = \\sqrt{${(a * a).toFixed(1)} + ${(b * b).toFixed(1)}} = \\sqrt{${(a * a + b * b).toFixed(1)}} \\approx ${hypotenuse.toFixed(2)} $$`;

    // Actualizamos el HTML interno
    dynContainer.innerHTML = latex;

    // Avisamos a MathJax para que lo procese
    if (typeof MathJax !== 'undefined' && MathJax.typesetPromise) {
      MathJax.typesetPromise([dynContainer]).catch((err: any) => console.error(err));
    }
  };

  if (inputDynA && inputDynB) {
    inputDynA.addEventListener('input', updateDynamicMath);
    inputDynB.addEventListener('input', updateDynamicMath);
  }
}

// Automatic client-side execution
if (typeof document !== 'undefined') {
    setupInteractivity();
    document.addEventListener('DOMContentLoaded', () => {
      setupInteractivity();
    });
    document.addEventListener('astro:after-swap', () => {
      setupInteractivity();
    });
}