# Mathematical Expressions Guide

This document outlines how to write mathematical expressions in **TheHouseOfPhi** project using MDX and LaTeX syntax.

## 1. Overview

We use **KaTeX** for fast, client-side math rendering. The styles are globally included in `BaseLayout.astro`, ensuring consistent rendering across all pages.

## 2. Syntax

### Inline Math
Use single dollar signs (`$`) to include math within a sentence.

**Source:**
```md
The velocity vector is defined as $\vec{v} = \frac{d\vec{r}}{dt}$.
```

**Rendered:**
The velocity vector is defined as $\vec{v} = \frac{d\vec{r}}{dt}$.

### Block Math (Display Mode)
Use double dollar signs (`$$`) to display equations on their own line, centered.

**Source:**
```md
$$
\int_{a}^{b} f(x) dx = F(b) - F(a)
$$
```

**Rendered:**
$$
\int_{a}^{b} f(x) dx = F(b) - F(a)
$$

## 3. Common Symbols Cheat Sheet

| Description | LaTeX Code | Example |
| :--- | :--- | :--- |
| **Greek Letters** | `\alpha`, `\beta`, `\theta`, `\pi`, `\Delta` | $\alpha, \beta, \theta, \pi, \Delta$ |
| **Fractions** | `\frac{numerator}{denominator}` | $\frac{a}{b}$ |
| **Powers & Indices** | `x^2`, `y_{min}` | $x^2, y_{min}$ |
| **Roots** | `\sqrt{x}` | $\sqrt{x}$ |
| **Trigonometry** | `\sin`, `\cos`, `\tan` | $\sin, \cos, \tan$ |
| **Vectors** | `\vec{v}` | $\vec{v}$ |
| **Multiplication** | `\cdot` | $a \cdot b$ |

## 4. Best Practices

1.  **Spacing:** LaTeX ignores spaces in math mode. Use `\,` for small spaces or `\quad` for larger spaces if necessary, though usually not needed for simple formulas.
2.  **Text inside Math:** Use `\text{...}` to write normal text inside an equation.
    *   Example: `$$ v_{\text{final}} = v_0 + at $$`
3.  **Layout:** Always ensure your MDX file uses `BaseLayout` so the KaTeX CSS is loaded properly.

## 5. Troubleshooting

*   **Math not rendering?**
    *   Ensure the file extension is `.mdx`.
    *   Verify that `layout: ../../layouts/BaseLayout.astro` is present in the frontmatter.
*   **Broken layout or errors?**
    *   Check for unescaped characters inside the LaTeX block.
    *   Ensure you are not nesting dollar signs incorrectly.