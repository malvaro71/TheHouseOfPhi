# Backlog

- [x] Move content from vectors_es.astro to en/vectors.mdx
- [ ] Review MDXAuthoringGuide.md after moving vector exercises.
- [x] Update ProjectStructure.md after moving vector exercises.
- [ ] Update ProjectDependencies.md after moving vector exercises.
- [ ] Review MDXAuthoringGuide.md, ProjectStructure.md, and ProjectDependencies.md after moving kinematics exercises.
- [x] Migrate JavaScript to TypeScript, reviewing types for CartesianPlane and EuclideanSpace. Consider using 2D component objects ({x, y}) and 3D objects ({x, y, z}) instead of arrays.
- [x] After introducing typing in CartesianPlane and EuclideanSpace, review the use of validation functions like validateCoordinates2D, validateCoordinates3D, validateObject, etc.
- [x] Decide whether to keep mathjs or implement required methods in CartesianPlane and EuclideanSpace. => Kept MathJS.
- [x] Create SVGDrawings.md file, defining how SVG images are written in the project. => Created DrawingEngineReference.md.

- [ ] Verify if renderMathExpressionSVG function works for SVG rendering.
- [ ] Create a README.md for the project.
- [x] Update copilot-instructions.md.
- [ ] Analyze and decide whether to create a single agent for project development or split it into an architecture agent and a content editing agent.
- [ ] Review introduction wording in geometry.mdx according to MDXAuthoringGuide.md instructions.
- [x] Review introduction wording in vectors.mdx according to MDXAuthoringGuide.md instructions.
- [ ] Review introduction wording in kinematics.mdx according to MDXAuthoringGuide.md instructions.
- [ ] Expand content in es/geometry.mdx as planned in its introduction section.
- [ ] Translate Spanish content of geometry.mdx to English in en/geometry.mdx.
- [ ] Recover kinematicsPage.js from recycle bin and save to /src/scripts/pages/kinematicsPage.js.
- [ ] Transform kinematicsPage.js into ../scripts/pages/kinematicsPage.ts with the same structure as vectorsPage.ts.
- [ ] Transform kinematics_es.astro content to .mdx and save as es/kinematics.mdx (use es/vectors.mdx as reference).
- [ ] In src/components/VectorCanvas.astro, add import and const for ../scripts/pages/kinematicsPage.ts.
- [x] Write all code comments in English and translate existing ones.
- [x] Update MDXAuthoringGuide.md and other technical docs to specify that all code comments must be in English.
- [ ] add the Astro Docs MCP server to the project to be used by the agents for code analysis and editing. This will allow us to use the "Codebase Analysis" feature of the MCP, which provides a more comprehensive understanding of the code structure and dependencies compared to just using GitHub's code search.
