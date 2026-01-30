// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// https://astro.build/config
export default defineConfig({
  integrations: [mdx({
    // Habilita la sintaxis de LaTeX ($...$)
    remarkPlugins: [remarkMath],
    // Renderiza el LaTeX a HTML y SVG usando KaTeX
    rehypePlugins: [rehypeKatex]
  })]
});
