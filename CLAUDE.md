# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A single-page tool that composes two structured prompts for **NotebookLM** slide-deck generation. The first prompt is pasted into NotebookLM chat to create a source-grounded summary from the basic settings and review checklist. The second prompt is pasted into NotebookLM custom presentation's "describe the presentation to create" field and carries the visual/style instructions. Everything is client-side — no backend, no router, no AI calls. Vite + React 18 + Tailwind.

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
- `selections` — `{ slide_style, slide_audience, slide_style_custom, slide_audience_custom }`. The legacy key names remain for compatibility, but the UI labels are now **簡報用途** and **讀者背景**. `slide_audience` is only shown and rendered for audience-sensitive purposes (`teaching`, `sketchnote`, `minimal`). `slide_style_custom` and `slide_audience_custom` are used only when the corresponding option id is `'custom'`.
- `topic` — free text. `TopicInput` receives the normalized `slideStyle` and changes its placeholder example to match the selected deck purpose; this is only a hint and never auto-fills the topic.
- `sectionCount` — integer 1–10 (drives **body sections**, not total slide count; see UI section below)
- `visualBrief` — structured object: `{ background, primary, accent, headingFont, bodyFont, designTerms, notes }`. All fields optional. **This shape replaced an earlier flat string `customBrief`** — the loader in `handleLoad` migrates old saved prompts (`item.customBrief: string` → `visualBrief.notes`).
- `auditChecklist` — object keyed by item id. Default checked items are only `no_external_inference` and `neutral_tone`; all other review items start unchecked. A one-time migration in `App.jsx` moves old "everything checked" LocalStorage state to the new default.

Saved prompts (the "我的收藏" feature) live at LocalStorage key `spb_saved_prompts_v1`. New entries use `schemaVersion: 2` and store `{ id, schemaVersion, name, createdAt, topic, selections, sectionCount, visualBrief, auditChecklist, outputMode }`. Managed by `hooks/useSavedPrompts.js`.

### Two parallel control surfaces

The UI has three distinct ways to influence the two-step output:

1. **Basic flow**: deck purpose + section count, with audience background shown only for `teaching`, `sketchnote`, and `minimal`.
2. **Advanced visual brief** (`<CustomBriefInput>`, collapsed by default): palette swatches, hex pickers, font pairings, freeform notes. This only affects the custom presentation style prompt.
3. **Review checklist** (`<AuditChecklist>`): optional professional review constraints appended to the chat summary prompt.

The basic purpose description goes into the chat summary prompt as a bullet; audience background is added only for audience-sensitive purposes. If the user selects the `custom` card and types text, `App.jsx` passes the custom text into the template instead of the stock option label. If the advanced brief has any non-empty field, it appears only in the custom presentation style prompt, which starts with `請依據 Notebook 來源建立簡報。`.

The chat summary prompt asks NotebookLM to output only two sections: `核心重點` and `可用於簡報的章節或頁面素材` (English: `Core points` and `Slide sections or page material`). Keep fixed citation/fidelity wording out of the base template; those constraints should come from the optional review checklist when enabled.

### Purpose-aware suggestion sorting

`PALETTES` (`src/data/palettes.js`) and `FONT_PAIRINGS` (`src/data/fontPairings.js`) each carry a `suitableFor: ['acip', 'teaching', …]` array of `slide_style` ids. `CustomBriefInput` receives the current `slideStyle` prop and sorts both lists so matching options come first, with an orange "✓ 對應用途" badge. Adding a new deck purpose, palette, or pairing? Don't forget the `suitableFor` field, otherwise it will sort to the bottom for that purpose.

### Prompt template & render

`src/data/template.js` exports `NOTEBOOKLM_SUMMARY_TEMPLATE = { cn, en }` and `NOTEBOOKLM_PRESENTATION_STYLE_TEMPLATE = { cn, en }`. The summary template uses `{{topic}}`, `{{slide_style}}`, `{{audience_background_block}}`, `{{section_count}}`, and `{{audit_checklist_block}}`. The style template uses `{{custom_brief_block}}`.

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
