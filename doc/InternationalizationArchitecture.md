# Internationalization (i18n) Architecture

TheHouseOfPhi uses a **Static Routing Strategy** for internationalization, leveraging Astro's native file-system routing. This approach ensures optimal performance, SEO friendliness, and a clean authoring experience using MDX.

## 1. Directory Structure

Content is separated into language-specific directories within `src/pages/`:

```text
src/pages/
├── index.astro         # Root redirector logic
├── en/
│   ├── index.mdx       # Homepage (English)
│   └── geometry.mdx    # Geometry lesson (English)
└── es/
    ├── index.mdx       # Homepage (Spanish)
    └── geometry.mdx    # Geometry lesson (Spanish)

## 2. Localization Workflow

### Content Authoring
Instead of using CSS classes to hide/show text (e.g., `.lang-es`), we create independent files for each language. This allows for:
- **Clean Markdown:** No JSX clutter for language logic.
- **Independent Updates:** You can add specific university-level details in one language without affecting the other immediately.
- **Faster Loads:** Users only download the content for their chosen language.

### Routing & Navigation
- **Default Redirection:** The root `index.astro` uses a client-side script to detect the user's language (via `localStorage` or browser settings) and redirects to `/en/` or `/es/`.
- **Language Switching:** Pages contain direct links to localized versions. Visiting a localized page updates the `preferredLang` in `localStorage`.

## 3. Implementation Details

- **Engine:** Astro + MDX.
- **Layouts:** `BaseLayout.astro` provides the HTML shell, accepts a `lang` prop, and includes global styles.
- **Math Rendering:** Shared via a global `BaseLayout.astro` that imports KaTeX CSS, ensuring mathematical expressions ($E=mc^2$) look consistent across all languages.
- **State Persistence:** Language preference is stored in `localStorage` via inline scripts in the MDX pages, ensuring consistent redirection on future visits to the root.