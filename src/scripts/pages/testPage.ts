/**
 * Sets up interactivity for the dynamic math formulas.
 * Focuses on updating LaTeX expressions via MathJax in real-time.
 */
function setupInteractivity() {
  // Elements for the dynamic square root test
  const inputDynA = document.getElementById('input-dyn-a') as HTMLInputElement;
  const inputDynB = document.getElementById('input-dyn-b') as HTMLInputElement;
  const dynContainer = document.getElementById('dynamic-sqrt-test');

  // Validate existence
  if (!inputDynA || !inputDynB || !dynContainer) return;
  // Avoid duplicate listeners
  if (dynContainer.hasAttribute('data-math-initialized')) return;

  // MathJax declaration (global in the browser)
  declare const MathJax: any;

  const updateDynamicMath = () => {
    const a = parseFloat(inputDynA.value) || 0;
    const b = parseFloat(inputDynB.value) || 0;
    const hypotenuse = Math.sqrt(a * a + b * b);

    // Build the LaTeX string. 
    // IMPORTANT: Escape backslashes (\\sqrt instead of \sqrt) and use template literals for variable interpolation.
    const latex = `$$ \\sqrt{${a}^2 + ${b}^2} = \\sqrt{${(a * a).toFixed(1)} + ${(b * b).toFixed(1)}} = \\sqrt{${(a * a + b * b).toFixed(1)}} \\approx ${hypotenuse.toFixed(2)} $$`;

    // Update internal HTML
    dynContainer.innerHTML = latex;

    // Notify MathJax to process it 
    if (typeof MathJax !== 'undefined' && MathJax.typesetPromise) {
      MathJax.typesetPromise([dynContainer]).catch((err: any) => console.error(err));
    }
  };

  // Assign events
  inputDynA.addEventListener('input', updateDynamicMath);
  inputDynB.addEventListener('input', updateDynamicMath);

  // Mark as initialized
  dynContainer.setAttribute('data-math-initialized', 'true');

  // Initial synchronization
  updateDynamicMath();
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