import { visit } from 'unist-util-visit';

/**
 * Plugin de Rehype para transformar imágenes con src "vector:ID" en componentes <VectorCanvas id="ID" />.
 * Debe ejecutarse DESPUÉS de rehype-figure para aprovechar el envoltorio <figure> y <figcaption>.
 */
export function rehypeVectorCanvas() {
  return (tree) => {
    visit(tree, 'element', (node, index, parent) => {
      if (
        node.tagName === 'img' &&
        node.properties &&
        typeof node.properties.src === 'string' &&
        node.properties.src.startsWith('vector:')
      ) {
        const vectorId = node.properties.src.replace('vector:', '');

        // Creamos el nodo JSX para MDX que representa <VectorCanvas id="..." />
        const newNode = {
          type: 'mdxJsxFlowElement',
          name: 'VectorCanvas',
          attributes: [
            { type: 'mdxJsxAttribute', name: 'id', value: vectorId }
          ],
          children: []
        };

        // Reemplazamos el nodo <img> original por nuestro componente
        if (parent && index !== undefined) {
          parent.children[index] = newNode;
        }
      }
    });
  };
}
