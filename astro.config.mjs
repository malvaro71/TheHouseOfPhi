// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeFigure from 'rehype-figure';
import { rehypeVectorCanvas } from './src/plugins/rehype-vector-canvas.mjs';

// https://astro.build/config
export default defineConfig({
  integrations: [mdx({
    // Habilita la sintaxis de LaTeX ($...$)
    remarkPlugins: [remarkMath],
    // Renderiza el LaTeX a HTML y SVG usando KaTeX, procesa figuras y luego inyecta VectorCanvas
    rehypePlugins: [rehypeKatex, [rehypeFigure, { className: 'centered' }], rehypeVectorCanvas]
  })]
});
