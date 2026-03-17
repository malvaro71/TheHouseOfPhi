// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeFigure from 'rehype-figure';
import { rehypeVectorCanvas } from './src/plugins/rehype-vector-canvas.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://malvaro71.github.io',
  base: process.env.NODE_ENV === 'production' ? '/TheHouseOfPhi-1' : '/',

  integrations: [
    mdx({
      // Enables LaTeX syntax ($...$)
      remarkPlugins: [remarkMath],

      // Renderiza el LaTeX a HTML y SVG usando KaTeX, procesa figuras y luego inyecta VectorCanvas
      rehypePlugins: [
        rehypeKatex,
        [rehypeFigure, { className: 'centered' }],
        rehypeVectorCanvas
      ]
    })
  ]
});
