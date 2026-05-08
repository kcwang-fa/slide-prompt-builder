// 詞庫：簡報風格、配色、目標讀者。每個選項帶中英描述，會原封不動代入 prompt。

export const BANKS = {
  slide_style: {
    label: { cn: '簡報風格', en: 'Slide Style' },
    options: [
      { id: 'professional', cn: '專業風 — 對外簡潔、留白多、講者口頭補充細節', en: 'Professional — clean and spacious, presenter-driven' },
      { id: 'meeting',      cn: '會議報告風 — 對內、資訊完整、不在現場的人也看得懂', en: 'Meeting Report — internal, content-complete, self-contained slides' },
      { id: 'minimal',      cn: '極簡風 — 大量留白、單一強調色、Helvetica 風格字體', en: 'Minimalist — heavy whitespace, single accent color, Helvetica-style typography' },
      { id: 'academic',     cn: '學術論文風 — 嚴謹、襯線字體、引用感強、灰階為主', en: 'Academic — formal, serif typography, citation-heavy, grayscale-led' },
      { id: 'teaching',     cn: '教學筆記風 — 清楚階層、重點框、適合上課與共學', en: 'Teaching Notes — clear hierarchy, highlight boxes, classroom-friendly' },
      { id: 'ted',          cn: 'TED 演講風 — 一頁一概念、大字、留白多、敘事驅動', en: 'TED Talk — one big idea per slide, large type, narrative-driven' },
      { id: 'sketchnote',   cn: '手繪筆記風 — Sketchnote、有溫度、像個人讀書筆記', en: 'Sketchnote — hand-drawn feel, warm, like a personal study journal' },
      { id: 'darktech',     cn: '深色科技風 — 暗底配對比色與等寬字、適合技術內容', en: 'Dark Tech — dark background, high-contrast accents, monospace for code' },
    ],
  },

  slide_audience: {
    label: { cn: '目標讀者', en: 'Target Audience' },
    options: [
      { id: 'team',    cn: '同事或團隊內部 — 假設讀者已有背景知識', en: 'Team / colleagues — assume domain knowledge' },
      { id: 'exec',    cn: '客戶或主管 — 強調結論與商業影響', en: 'Client / executives — lead with conclusions and impact' },
      { id: 'public',  cn: '一般大眾 — 用比喻代替術語、避免縮寫', en: 'General public — analogies over jargon, no acronyms' },
      { id: 'student', cn: '學生或入門者 — 從零開始、循序漸進', en: 'Students / beginners — start from zero, progressive disclosure' },
      { id: 'peer',    cn: '技術同行 — 可保留專業術語與細節', en: 'Technical peers — keep terminology and depth' },
    ],
  },
}

export function optionLabel(bankKey, optionId, language) {
  const opt = BANKS[bankKey]?.options.find(o => o.id === optionId)
  if (!opt) return ''
  return opt[language] || opt.cn
}
