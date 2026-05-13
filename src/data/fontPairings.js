// 字型組合：每組綁定一對標題＋正文字型，並標記適合的 slide_style。
// 會在 UI 顯示，點選後同時填入 headingFont 與 bodyFont。

export const FONT_PAIRINGS = [
  {
    id: 'noto_modern',
    name: { cn: 'Noto Sans TC + Inter', en: 'Noto Sans TC + Inter' },
    simpleLabel: { cn: '現代黑體、英文無襯線', en: 'Modern Chinese sans-serif, English sans-serif' },
    headingFont: 'Noto Sans TC Bold（中文）+ Inter SemiBold（英文數字）',
    bodyFont: 'Noto Sans TC（中文）+ Inter（英文數字）',
    prompt: {
      cn: '中文黑體、英文無襯線',
      en: 'Chinese sans-serif, English sans-serif',
    },
    suitableFor: ['acip', 'outbreak', 'teaching'],
  },
  {
    id: 'serif_academic',
    name: { cn: 'Noto Serif TC + Source Serif 4', en: 'Noto Serif TC + Source Serif 4' },
    simpleLabel: { cn: '中文宋體、英文襯線', en: 'Chinese serif, English serif' },
    headingFont: 'Noto Serif TC Bold（中文）+ Source Serif 4 Semibold（英文）',
    bodyFont: 'Noto Serif TC（中文）+ Source Serif 4（英文）',
    prompt: {
      cn: '中文宋體、英文襯線',
      en: 'Chinese serif, English serif',
    },
    suitableFor: ['sketchnote'],
  },
  {
    id: 'sans_serif_mix',
    name: { cn: 'Noto Sans 標題 + Noto Serif 正文', en: 'Noto Sans Headings + Noto Serif Body' },
    simpleLabel: { cn: '黑體標題、宋體正文', en: 'Sans-serif headings, serif body text' },
    headingFont: 'Noto Sans TC Bold（中文）+ Inter SemiBold（英文數字）',
    bodyFont: 'Noto Serif TC（中文）+ Source Serif 4（英文）',
    prompt: {
      cn: '標題中文黑體、正文中文宋體，英文搭配襯線',
      en: 'Chinese sans-serif headings, Chinese serif body text, paired with English serif text',
    },
    suitableFor: ['sketchnote'],
  },
  {
    id: 'reading_academic',
    name: { cn: '思源黑體 + 思源宋體', en: 'Source Han Sans + Source Han Serif' },
    simpleLabel: { cn: '閱讀型宋體正文', en: 'Readable serif body text' },
    headingFont: '思源黑體 Bold（中文）+ Inter SemiBold（英文數字）',
    bodyFont: '思源宋體（中文）+ Source Serif 4（英文）',
    prompt: {
      cn: '中文黑體標題、中文宋體正文，英文搭配襯線',
      en: 'Chinese sans-serif headings, Chinese serif body text, paired with English serif text',
    },
    suitableFor: ['sketchnote', 'acip'],
  },
  {
    id: 'mono_tech',
    name: { cn: 'IBM Plex Sans TC + IBM Plex Mono', en: 'IBM Plex Sans TC + IBM Plex Mono' },
    simpleLabel: { cn: '黑體搭配等寬數字', en: 'Sans-serif with monospace numbers' },
    headingFont: 'IBM Plex Sans TC Bold（中文）+ IBM Plex Mono SemiBold（指標數字）',
    bodyFont: 'IBM Plex Sans TC（中文）+ IBM Plex Mono（數字註記）',
    prompt: {
      cn: '中文黑體、英文無襯線，數字與代碼使用等寬字型',
      en: 'Chinese sans-serif, English sans-serif, with monospace type for numbers and code',
    },
    suitableFor: ['sketchnote'],
  },
  {
    id: 'jhenghei_safe',
    name: { cn: '微軟正黑體 + Inter', en: 'Microsoft JhengHei + Inter' },
    simpleLabel: { cn: '通用黑體、英文無襯線', en: 'System Chinese sans-serif, English sans-serif' },
    headingFont: '微軟正黑體 Bold（中文）+ Inter Bold（英文數字）',
    bodyFont: '微軟正黑體（中文）+ Inter（英文數字）',
    prompt: {
      cn: '中文黑體、英文無襯線',
      en: 'Chinese sans-serif, English sans-serif',
    },
    suitableFor: ['acip', 'outbreak', 'teaching', 'minimal'],
  },
]

export function fontPairingById(id) {
  return FONT_PAIRINGS.find((pairing) => pairing.id === id)
}
