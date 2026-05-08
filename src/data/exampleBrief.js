// 「填入範例」按鈕用——示範一份完整 brief 的填法（醫療公衛資訊圖表場景）。
// 結構與 visualBrief state 一致：色號／字型用結構化欄位，其他寫進 notes。

export const EXAMPLE_BRIEF = {
  cn: {
    background: '#FFFFFF',
    primary: '#003366',
    accent: '#FF6B5B',
    headingFont: 'Noto Sans TC Bold',
    bodyFont: 'Noto Serif TC',
    notes: `輔助色使用鐵灰色與淺灰色進行區塊分割。
主色 #003366 象徵專業權威；強調色用於關鍵數據（如重症、住院率）。
使用資訊圖表（Infographics）為主，而非單純文字。
關鍵數據需以「大字級」突顯，並放置於圓形框內。
圖示要求：儘量使用簡潔的扁平化圖示（Flat Icons）。
背景應保持潔白，維持高負空間感（Negative Space），提升可讀性。`,
  },

  en: {
    background: '#FFFFFF',
    primary: '#003366',
    accent: '#FF6B5B',
    headingFont: 'Noto Sans TC Bold',
    bodyFont: 'Noto Serif TC',
    notes: `Secondary palette: iron-gray and light-gray for section dividers.
The primary #003366 conveys authority; the accent is reserved for key metrics (e.g. severe cases, hospitalization rate).
Lead with infographics, not plain text.
Key numbers in large display type, placed inside circular badges.
Iconography: simple flat icons only.
Maintain a clean white background and ample negative space for readability.`,
  },
}

export const EMPTY_BRIEF = {
  background: '',
  primary: '',
  accent: '',
  headingFont: '',
  bodyFont: '',
  notes: '',
}
