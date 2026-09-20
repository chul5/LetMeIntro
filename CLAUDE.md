# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project status

This repository currently contains only the mission spec at [docs/mission.md](docs/mission.md) — no application code has been written yet. That file is the authoritative requirements document; read it in full before implementing anything, since the summary below omits detail.

## What this project is

A vanilla HTML/CSS/JavaScript responsive portfolio site (no frameworks, no build tooling). It fetches the owner's repos from the GitHub API and renders them as project cards. There is no build step by design — the expected structure per the spec is:

```
index.html
css/style.css
js/*.js
images/
```

## Hard constraints (from docs/mission.md)

- No external libraries/frameworks (React, Vue, jQuery, Bootstrap, Tailwind, etc.). Icon fonts (Font Awesome) and web fonts (Google Fonts) are the only allowed externals.
- JavaScript: `const`/`let` only (no `var`), no inline `onclick=` attributes — wire all events via `addEventListener`, script tag uses `defer`.
- No inline `style="..."` attributes — all styling goes through `css/style.css`.
- CSS: define theme values as CSS variables on `:root`, with a dark-mode override set under `[data-theme="dark"]`. Nav uses Flexbox; the Projects card grid uses CSS Grid (`auto-fit`/`minmax`). Mobile-first, breakpoints at 768px and 1024px.
- Dark mode preference persists via `localStorage`.
- GitHub API calls (`https://api.github.com/users/{username}/repos`) must be done with `fetch`/`async-await` + `try/catch`, and must render distinct loading/success/error/empty states in the Projects section (403 rate-limit responses should surface as the error state).
- At least 3 distinct "user event → state change → DOM re-render" flows must exist (dark mode toggle, API load state, form validation state are the expected three; a filter is a bonus fourth).
- Deployment target is GitHub Pages; the README (once written) must include description, tech stack, deploy URL, and screenshots.

## Development workflow

There is no package manager, build, lint, or test tooling in this repo — it's static files served as-is. Use VS Code's Live Server extension (or any static file server) to preview locally; there is no separate build/compile step. Deployment is via GitHub Pages serving this repo directly.
