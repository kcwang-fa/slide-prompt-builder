// NotebookLM 專屬 prompt 範本。{{...}} 由 lib/render.js 代換。

export const NOTEBOOKLM_SUMMARY_TEMPLATE = {
  cn: `### NotebookLM 對話摘要

請基於我目前 Notebook 中的來源資料，先整理一份可用於建立簡報的內容摘要。請不要產生投影片，只產生摘要。

**基本設定：**
- 主題：{{topic}}
- 簡報用途：{{slide_style}}
{{audience_background_block}}
- 預計主體章節數：{{section_count}}

**摘要要求：**
- 從來源中萃取最關鍵的論點、證據、數據與結論，避免大段複製原文
- 依簡報用途整理內容取捨，讓後續可直接建立投影片大綱
- 標示可用於摘要頁、主體章節、圖表或時間軸的重點素材
- 若來源彼此衝突，請明確列出不同說法
- 若來源不足，請標示「資料不足」，不要外部補充或自行推論
{{audit_checklist_block}}
**請用下列格式輸出：**
1. 核心重點
2. 可用於簡報的章節或頁面素材`,

  en: `### NotebookLM Chat Summary

Create a content summary from the sources in my current notebook for later slide-deck creation. Do not generate slides yet; generate the summary only.

**Basic Settings:**
- Topic: {{topic}}
- Deck purpose: {{slide_style}}
{{audience_background_block}}
- Planned body sections: {{section_count}}

**Summary Requirements:**
- Extract the most important arguments, evidence, figures, and conclusions from the sources without copying long passages verbatim.
- Organize content based on the selected deck purpose so it can directly support a slide outline later.
- Identify material suitable for a summary slide, body sections, charts, or timelines.
- If sources conflict, list the competing positions explicitly.
- If evidence is insufficient, mark it as insufficient rather than adding external information or inference.
{{audit_checklist_block}}
**Output Format:**
1. Core points
2. Slide sections or page material`,
}

export const NOTEBOOKLM_PRESENTATION_STYLE_TEMPLATE = {
  cn: `請依據 Notebook 來源建立簡報。

**視覺與版面要求：**
- 字體、留白與版面密度需一致，並服務簡報內容，不要只追求裝飾效果
- 預設每張內容投影片至多 5 個重點項目；資訊複雜時優先使用表格、流程圖、對照圖或時間軸
- 圖表優先：能用對照表、流程圖、時間軸表達的內容，請避免改回純文字
- 每張投影片需有清楚標題，並讓重點結論容易掃讀
{{custom_brief_block}}`,

  en: `Create a slide deck based on the Notebook sources.

**Visual & Layout Requirements:**
- Keep typography, whitespace, and layout density consistent and in service of the content rather than decorative.
- Use up to 5 key points per content slide by default; when information is complex, prefer tables, flowcharts, comparison diagrams, or timelines.
- Prefer visuals: comparison tables, flowcharts, and timelines beat plain text whenever possible.
- Every slide needs a clear title, and key takeaways should be easy to scan.
{{custom_brief_block}}`,
}
