# AGENTS.md

## Project Overview
German Plus is a static single-page site (landing page) for a German-language courses and
educational-consulting business. Content comes from `_Website German Plus.pdf`, using the
“Clean & Academic” visual style from [anonbanana/website-designs](https://github.com/anonbanana/website-designs).

## Tech Stack
- Pure HTML/CSS/JS. No build step, no framework, no backend, no external dependencies.
- Fonts are Georgia and system fonts — no external font loading, so the site stays fast
  and avoids tracking/privacy concerns (GDPR/TTDSG).

## Project Structure
- `index.html` — German (default language page)
- `en.html` — English
- `styles.css` — shared design system, used by both pages
- `script.js` — shared JavaScript: menu, scrollspy, animations, contact form
- `assets/` — photographs to drop in here
- `.htaccess` — charset and caching for Strato
- `deploy.sh` — optional automated upload script using lftp
- `_Website German Plus.pdf` — content source, referenced only locally, not uploaded

## Page Structure
Both pages share the same section order and IDs. The sections are: introductory navigation,
courses (Deutschkurse), Studienkolleg, Ausbildung, career in Germany, and educational
consulting. A DE | EN toggle in the navigation switches language while keeping the
user on the same section.

## Changes
- Text edits need to be mirrored in both `index.html` and `en.html`. The structures,
  hierarchical IDs, and classes are identical between the two files.
- The contact form validation messages live in `script.js` (the `M` object, which is
  detected automatically from `<html lang="de|en">`).

## Debugging
- Use browser devtools to inspect the console.
- Check the `.htaccess` file because cached pages offered users stale content or prevented
  resources from loading on the host.

## Language
Write in English.

## Working Style
Stay concise.

## Boundaries
- Do not modify files in `assets/` or `_Website German Plus.pdf` unless requested.
