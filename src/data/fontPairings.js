// 字型組合：每組綁定一對標題＋正文字型，並標記適合的 slide_style。
// 會在 UI 顯示，點選後同時填入 headingFont 與 bodyFont。

export const FONT_PAIRINGS = [
  {
    id: 'noto_modern',
    name: { cn: 'Noto Sans TC + Inter', en: 'Noto Sans TC + Inter' },
    headingFont: 'Noto Sans TC Bold（中文）+ Inter SemiBold（英文數字）',
    bodyFont: 'Noto Sans TC（中文）+ Inter（英文數字）',
    suitableFor: ['meeting', 'training', 'teaching'],
  },
  {
    id: 'serif_academic',
    name: { cn: 'Noto Serif TC + Source Serif 4', en: 'Noto Serif TC + Source Serif 4' },
    headingFont: 'Noto Serif TC Bold（中文）+ Source Serif 4 Semibold（英文）',
    bodyFont: 'Noto Serif TC（中文）+ Source Serif 4（英文）',
    suitableFor: ['sketchnote'],
  },
  {
    id: 'sans_serif_mix',
    name: { cn: 'Noto Sans 標題 + Noto Serif 正文', en: 'Noto Sans Headings + Noto Serif Body' },
    headingFont: 'Noto Sans TC Bold（中文）+ Inter SemiBold（英文數字）',
    bodyFont: 'Noto Serif TC（中文）+ Source Serif 4（英文）',
    suitableFor: ['sketchnote', 'meeting'],
  },
  {
    id: 'reading_academic',
    name: { cn: '思源黑體 + 思源宋體', en: 'Source Han Sans + Source Han Serif' },
    headingFont: '思源黑體 Bold（中文）+ Inter SemiBold（英文數字）',
    bodyFont: '思源宋體（中文）+ Source Serif 4（英文）',
    suitableFor: ['sketchnote', 'meeting'],
  },
  {
    id: 'mono_tech',
    name: { cn: 'IBM Plex Sans TC + IBM Plex Mono', en: 'IBM Plex Sans TC + IBM Plex Mono' },
    headingFont: 'IBM Plex Sans TC Bold（中文）+ IBM Plex Mono SemiBold（指標數字）',
    bodyFont: 'IBM Plex Sans TC（中文）+ IBM Plex Mono（數字註記）',
    suitableFor: ['meeting', 'sketchnote'],
  },
  {
    id: 'jhenghei_safe',
    name: { cn: '微軟正黑體 + Inter', en: 'Microsoft JhengHei + Inter' },
    headingFont: '微軟正黑體 Bold（中文）+ Inter Bold（英文數字）',
    bodyFont: '微軟正黑體（中文）+ Inter（英文數字）',
    suitableFor: ['meeting', 'training', 'minimal'],
  },
]
