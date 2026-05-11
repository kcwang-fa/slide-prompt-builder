// NotebookLM 專屬 prompt 範本。{{...}} 由 lib/render.js 代換。

export const NOTEBOOKLM_TEMPLATE = {
  cn: `### NotebookLM 簡報生成

請基於我目前 Notebook 中的來源資料，產生一份結構完整的投影片簡報。

**主題與範圍：**
- 主題：{{topic}}
- 讀者背景：{{slide_audience}}
- 呈現重點：請從來源中萃取最關鍵的論點、證據與結論，避免大段複製原文

**用途與呈現原則：**
- 簡報用途：{{slide_style}}
- 字體、留白與版面密度需服務所選用途；同一份簡報內請維持視覺一致
- 若簡報用途與讀者背景需求衝突，請以讀者背景的理解需求、決策情境與專業背景優先
{{custom_brief_block}}
**結構與資訊密度：**
- 開場：1 張封面 + 1 張摘要（TL;DR）
- 主體：依來源內在邏輯切分為 {{section_count}} 個章節，每章節 2–4 張投影片
- 結尾：1 張關鍵 takeaways + 1 張參考來源
- 預設每張內容投影片至多 5 個重點項目；若所選用途需要完整作業資訊（例：決策會議、教育訓練），可使用表格、流程圖或完整段落，但仍維持版面清楚
- 圖表優先：能用對照表、流程圖、時間軸表達的內容，請避免改回純文字

**引用與忠實度：**
- 所有事實、數據、引述必須來自我的 Notebook 來源；不要外部補充或自行推論
- 若來源彼此衝突，請在投影片上明確指出兩種說法
- 每張投影片底部以小字標註本頁主要參照的來源檔名
{{audit_checklist_block}}`,

  en: `### NotebookLM Slide Deck

Generate a complete slide deck from the sources in my current notebook.

**Topic & Scope:**
- Topic: {{topic}}
- Audience background: {{slide_audience}}
- Surface only the most important arguments, evidence, and conclusions from the sources — do not copy long passages verbatim.

**Purpose & Presentation Principles:**
- Deck purpose: {{slide_style}}
- Typography, whitespace, and layout density should serve the selected purpose; keep one deck visually unified.
- If the deck purpose conflicts with the audience background, prioritize the audience’s comprehension needs, decision context, and domain background.
{{custom_brief_block}}
**Structure & Density:**
- Opening: 1 cover slide + 1 TL;DR summary slide
- Body: Section the deck by the internal logic of the sources into {{section_count}} sections, 2–4 slides per section
- Closing: 1 key takeaways slide + 1 source reference slide
- Up to 5 bullets per content slide by default; if the chosen purpose requires complete operational detail (e.g. Decision Meeting or Training), use tables, flowcharts, or full paragraphs while keeping the layout clear.
- Prefer visuals: comparison tables, flowcharts, timelines beat plain text whenever possible.

**Citation & Faithfulness:**
- Every fact, figure, and quote must come from the notebook sources — no external additions or inference.
- If sources conflict, surface both positions explicitly on the slide.
- At the bottom of every content slide, cite the source filename(s) the slide draws from in small text.
{{audit_checklist_block}}`,
}
