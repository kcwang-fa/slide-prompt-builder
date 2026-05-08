// 詞庫：簡報風格、配色、目標讀者。每個選項帶中英描述，會原封不動代入 prompt。

export const BANKS = {
  slide_style: {
    label: { cn: '簡報風格', en: 'Slide Style' },
    options: [
      { id: 'meeting',    cn: '會議報告風 — 適合內部會議或外部專家會議，資訊完整、層級清楚、方便討論決策', en: 'Meeting Report — for internal or external expert meetings, complete, structured, and discussion-ready' },
      { id: 'teaching',   cn: 'Seminar 簡報風 — 背景、核心概念、案例與 takeaways，資訊密度中等、敘事清楚', en: 'Seminar — background, core concepts, examples, and takeaways with a clear narrative' },
      { id: 'sketchnote', cn: '讀書筆記／文獻整理風 — 研究問題、方法、主要發現、限制與可應用處', en: 'Reading Notes / Literature Review — research questions, methods, findings, limitations, and applications' },
      { id: 'minimal',    cn: '極簡風 — 高留白、少文字、大標題，適合摘要頁、開場頁與重點結論頁', en: 'Minimal — high whitespace, sparse text, large titles for summary, opening, and key takeaway slides' },
    ],
  },

  slide_audience: {
    label: { cn: '目標讀者', en: 'Target Audience' },
    options: [
      { id: 'team',    cn: '內部會議 — 給主管、跨組同仁或業務承辦，聚焦進度、風險與決策事項', en: 'Internal Meeting — for supervisors, cross-team colleagues, or program staff; focus on status, risks, and decisions' },
      { id: 'self',    cn: '自己／個人筆記 — 為日後複習與整理思路，保留問題、想法與待查事項', en: 'Self / Personal Notes — for later review and thinking; keep questions, ideas, and follow-ups' },
      { id: 'public',  cn: '一般大眾 — 用比喻代替術語、避免縮寫', en: 'General public — analogies over jargon, no acronyms' },
      { id: 'student', cn: '學生或入門者 — 從零開始、循序漸進', en: 'Students / beginners — start from zero, progressive disclosure' },
      { id: 'peer',    cn: '外部專家會議 — 給學術、流病、統計、實驗室等專家，保留方法、限制與專業細節', en: 'External Expert Meeting — for academic, epidemiology, statistics, or laboratory experts; keep methods, limitations, and technical detail' },
    ],
  },
}

export const STYLE_GUIDE = [
  {
    id: 'meeting',
    title: { cn: '會議報告風', en: 'Meeting Report' },
    body: {
      cn: '適合內部會議、外部專家會議、週報與監測更新；資訊完整、層級清楚，方便討論風險、限制與決策事項。',
      en: 'For internal meetings, external expert meetings, weekly reports, and surveillance updates; complete, structured, and ready for risk, limitation, and decision discussions.',
    },
  },
  {
    id: 'teaching',
    title: { cn: 'Seminar 簡報風', en: 'Seminar' },
    body: {
      cn: '適合研討會、課程或專題分享；用清楚敘事帶出背景、概念、案例與重點結論。',
      en: 'For seminars, courses, or topic briefings; uses narrative flow for background, concepts, examples, and takeaways.',
    },
  },
  {
    id: 'sketchnote',
    title: { cn: '讀書筆記／文獻整理風', en: 'Reading Notes / Literature Review' },
    body: {
      cn: '適合 paper review 與文獻摘要；聚焦研究問題、方法、主要發現、限制與可應用處。',
      en: 'For paper reviews and evidence summaries; focuses on research questions, methods, findings, limitations, and applications.',
    },
  },
  {
    id: 'minimal',
    title: { cn: '極簡風', en: 'Minimal' },
    body: {
      cn: '適合封面、摘要、關鍵 takeaways；高留白、少文字，讓單一重點更醒目。',
      en: 'For covers, summaries, and key takeaways; uses whitespace and sparse text to foreground one main idea.',
    },
  },
]

export function optionLabel(bankKey, optionId, language) {
  const opt = BANKS[bankKey]?.options.find(o => o.id === optionId)
  if (!opt) return ''
  return opt[language] || opt.cn
}
