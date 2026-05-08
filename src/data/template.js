// NotebookLM 專屬 prompt 範本。{{...}} 由 lib/render.js 代換。

export const NOTEBOOKLM_TEMPLATE = {
  cn: `### NotebookLM 簡報生成

請基於我目前 Notebook 中的來源資料，產生一份結構完整的投影片簡報。

**主題與範圍：**
- 主題：{{topic}}
- 目標讀者：{{slide_audience}}
- 呈現重點：請從來源中萃取最關鍵的論點、證據與結論，避免大段複製原文

**視覺風格：**
- 簡報風格：{{slide_style}}
- 字體與留白比例需與所選風格一致；同一份簡報內請維持風格統一
- 若簡報風格與目標讀者需求衝突，請以目標讀者的理解需求、決策需求與專業背景優先；風格只調整版面、資訊密度與視覺語氣
{{custom_brief_block}}
**結構與資訊密度：**
- 開場：1 張封面 + 1 張摘要（TL;DR）
- 主體：依來源內在邏輯切分為 {{section_count}} 個章節，每章節 2–4 張投影片
- 結尾：1 張關鍵 takeaways + 1 張參考來源
- 預設每張內容投影片至多 5 個重點項目；若所選風格傾向「資訊塞滿」（例：會議報告風），則改為完整段落但仍維持版面清楚
- 圖表優先：能用對照表、流程圖、時間軸表達的內容，請避免改回純文字

**引用與忠實度：**
- 所有事實、數據、引述必須來自我的 Notebook 來源；不要外部補充或自行推論
- 若來源彼此衝突，請在投影片上明確指出兩種說法
- 每張投影片底部以小字標註本頁主要參照的來源檔名
{{audit_checklist_block}}

**語言：**
- 全程使用繁體中文（台灣慣用語）；專有名詞、人名、技術術語保留原文`,

  en: `### NotebookLM Slide Deck

Generate a complete slide deck from the sources in my current notebook.

**Topic & Scope:**
- Topic: {{topic}}
- Audience: {{slide_audience}}
- Surface only the most important arguments, evidence, and conclusions from the sources — do not copy long passages verbatim.

**Visual Style:**
- Deck style: {{slide_style}}
- Typography and whitespace must match the chosen style consistently across all slides — keep one deck visually unified.
- If the deck style conflicts with the target audience, prioritize the audience’s comprehension needs, decision context, and domain background; style should only adjust layout, information density, and visual tone.
{{custom_brief_block}}
**Structure & Density:**
- Opening: 1 cover slide + 1 TL;DR summary slide
- Body: Section the deck by the internal logic of the sources into {{section_count}} sections, 2–4 slides per section
- Closing: 1 key takeaways slide + 1 source reference slide
- Up to 5 bullets per content slide by default; if the chosen style is content-dense (e.g. Meeting Report), use full paragraphs but keep the layout clear.
- Prefer visuals: comparison tables, flowcharts, timelines beat plain text whenever possible.

**Citation & Faithfulness:**
- Every fact, figure, and quote must come from the notebook sources — no external additions or inference.
- If sources conflict, surface both positions explicitly on the slide.
- At the bottom of every content slide, cite the source filename(s) the slide draws from in small text.
{{audit_checklist_block}}

**Language:**
- Entire deck in the user's preferred language; keep proper nouns, names, and technical terms in their original form.`,
}
