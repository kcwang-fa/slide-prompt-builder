# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A single-page tool that composes a structured prompt for **NotebookLM**'s slide-deck generation. The user picks a deck purpose, audience background, section count, and review checklist; optionally fine-tunes color palette, font pairing, design terms, and freeform visual notes; and copies the resulting prompt into NotebookLM. Everything is client-side — no backend, no router, no AI calls. Vite + React 18 + Tailwind.

This project was forked-in-spirit from `~/PromptFill` (a much larger AI-art prompt-fill tool) but is **intentionally minimal**: only the variable+template engine concept was kept. Do not import Prompt Fill's masonry, html2canvas export, IndexedDB, video preview, AI services, sharing, or smart-split features unless explicitly asked.

## Common Commands

```bash
npm install
npm run dev       # Vite on :1421 (PromptFill uses 1420 — kept distinct so they can run side by side)
npm run build     # → dist/
npm run preview   # Serve dist/ for local sanity check
```

There is no lint config and no test suite. The validation gate is "open it in the browser, click around, copy a prompt, paste into NotebookLM."

## Architecture

### State model

All state lives in `App.jsx` and persists via `useLocalStorage` (LocalStorage, debounced via React render). Main top-level pieces:

- `language` — `'cn'` / `'en'`
- `outputMode` — `'presentation'` / `'image'`. Image mode is currently a placeholder.
- `activeTab` — workspace tab id (`basic`, `visual`, `audit`, `prompt`).
- `selections` — `{ slide_style, slide_audience, slide_style_custom, slide_audience_custom }`. The legacy key names remain for compatibility, but the UI labels are now **簡報用途** and **讀者背景**. `slide_style_custom` and `slide_audience_custom` are used only when the corresponding option id is `'custom'`.
- `topic` — free text
- `sectionCount` — integer 3–10 (drives **body sections**, not total slide count; see UI section below)
- `visualBrief` — structured object: `{ background, primary, accent, headingFont, bodyFont, designTerms, notes }`. All fields optional. **This shape replaced an earlier flat string `customBrief`** — the loader in `handleLoad` migrates old saved prompts (`item.customBrief: string` → `visualBrief.notes`).
- `auditChecklist` — object keyed by item id. Default checked items are only `no_external_inference` and `neutral_tone`; all other review items start unchecked. A one-time migration in `App.jsx` moves old "everything checked" LocalStorage state to the new default.

Saved prompts (the "我的收藏" feature) live at LocalStorage key `spb_saved_prompts_v1`. New entries use `schemaVersion: 2` and store `{ id, schemaVersion, name, createdAt, topic, selections, sectionCount, visualBrief, auditChecklist, outputMode }`. Managed by `hooks/useSavedPrompts.js`.

### Two parallel control surfaces

The UI has three distinct ways to influence the output, and the prompt template encodes a precedence rule:

1. **Basic flow** (always visible): deck purpose + audience background + section count.
2. **Advanced visual brief** (`<CustomBriefInput>`, collapsed by default): palette swatches, hex pickers, font pairings, freeform notes.
3. **Review checklist** (`<AuditChecklist>`): optional professional review constraints appended near the citation/fidelity section.

The basic purpose and audience descriptions go into the prompt as bullets. If the user selects the `custom` card and types text, `App.jsx` passes the custom text into the template instead of the stock option label. If the advanced brief has any non-empty field, it appends a `**視覺細部要求（使用者自訂，優先於前述風格／配色）：**` block right after the purpose section. The "優先於前述" wording is what lets a user pick a broad purpose and then override specific visual details without contradictory instructions confusing NotebookLM.

### Purpose-aware suggestion sorting

`PALETTES` (`src/data/palettes.js`) and `FONT_PAIRINGS` (`src/data/fontPairings.js`) each carry a `suitableFor: ['meeting', 'training', …]` array of `slide_style` ids. `CustomBriefInput` receives the current `slideStyle` prop and sorts both lists so matching options come first, with an orange "✓ 對應用途" badge. Adding a new deck purpose, palette, or pairing? Don't forget the `suitableFor` field, otherwise it will sort to the bottom for that purpose.

### Prompt template & render

`src/data/template.js` exports `NOTEBOOKLM_TEMPLATE = { cn, en }` — two strings with `{{placeholder}}` slots: `{{topic}}`, `{{slide_style}}`, `{{slide_audience}}`, `{{section_count}}`, `{{custom_brief_block}}`, `{{audit_checklist_block}}`.

`src/lib/render.js` does the substitution. **Important quirk**: empty string substitutes as empty (not as the literal `{{key}}`). This lets `{{custom_brief_block}}` disappear cleanly when the advanced brief is empty. `undefined`/`null` still render as `{{key}}` (so missing keys are visibly broken — easier to debug).

`src/lib/visualBrief.js` `buildVisualBriefBlock(brief, language)` composes the structured brief into Markdown bullets. Any field missing → bullet skipped. All fields missing AND notes empty → returns `''`, which makes the placeholder vanish.

`src/lib/auditChecklist.js` `buildAuditChecklistBlock(value, language)` appends only checked review items. Keep language constraints out of the base template; if the user wants Taiwan Traditional Chinese, they can enable the `taiwan_traditional_chinese` checklist item.

### Section count vs slide count

`SectionCountSlider` controls **body sections**, not total slides. The label shows a live estimate: `主體章節數：5（總計約 14–22 張投影片）` derived from `4 + value*2` to `4 + value*4` (cover + TL;DR + body sections × 2–4 slides each + takeaways + sources). NotebookLM responds better to "X sections" than "X slides" because section structure is content-driven; if a user complains the deck isn't N slides exactly, that's expected — recommend tweaking the section count rather than fighting NotebookLM.

### No router

Single page, no routes. If you ever need a settings or about page, you'll need to add `react-router-dom` and switch `src/main.jsx` accordingly. Prefer not to.

## Deployment

Railway via Dockerfile. The pattern is identical to PromptFill's — see `Dockerfile`, `nginx.conf.template`, `railway.json`:

- `node:20-alpine` builds, `nginx:alpine` serves `dist/`.
- `CMD` runs `envsubst '$PORT'` on the nginx template (only `$PORT` is substituted; nginx variables like `$uri` are preserved).
- SPA fallback (`try_files $uri $uri/ /index.html`) is configured even though this app has no client routes — kept for future-proofing.
- **Required Railway service variable**: `PORT=8080`. Then in Networking → target port also `8080`. Both must match or the public URL won't reach the container.

## Conventions

- Commit messages mirror PromptFill: Chinese conventional commits (`feat:`, `fix:`, `chore:`).
- No backend dependencies. Don't add API calls, telemetry, or external fonts (font names in pairings are passed as text into the prompt — they don't need to actually render in the UI).
- LocalStorage keys are versioned: `spb_*_v1`. If a stored shape changes incompatibly, bump to `_v2` and write a one-time migration in `useLocalStorage` or `handleLoad`.
- The `@/` import alias points to `src/` (configured in `vite.config.js`).
