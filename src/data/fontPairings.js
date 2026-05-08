// 字型組合：每組綁定一對標題＋正文字型，並標記適合的 slide_style。
// 會在 UI 顯示，點選後同時填入 headingFont 與 bodyFont。

export const FONT_PAIRINGS = [
  {
    id: 'helvetica_classic',
    name: { cn: 'Helvetica 經典', en: 'Helvetica Classic' },
    headingFont: 'Helvetica Neue Bold',
    bodyFont: 'Helvetica Neue',
    suitableFor: ['professional', 'minimal'],
  },
  {
    id: 'noto_modern',
    name: { cn: 'Noto Sans 現代', en: 'Noto Sans Modern' },
    headingFont: 'Noto Sans TC Bold',
    bodyFont: 'Noto Sans TC',
    suitableFor: ['professional', 'meeting', 'teaching'],
  },
  {
    id: 'serif_academic',
    name: { cn: '思源宋體 學院派', en: 'Source Han Serif Academic' },
    headingFont: '思源宋體',
    bodyFont: '思源宋體',
    suitableFor: ['academic'],
  },
  {
    id: 'sans_serif_mix',
    name: { cn: '黑體標題＋宋體正文', en: 'Sans Headings + Serif Body' },
    headingFont: 'Noto Sans TC Bold',
    bodyFont: 'Noto Serif TC',
    suitableFor: ['academic', 'meeting', 'teaching'],
  },
  {
    id: 'ted_display',
    name: { cn: 'TED 演講大字', en: 'TED Display' },
    headingFont: 'Helvetica Neue Bold',
    bodyFont: 'Helvetica Neue',
    suitableFor: ['ted', 'minimal'],
  },
  {
    id: 'inter_clean',
    name: { cn: 'Inter 簡潔', en: 'Inter Clean' },
    headingFont: 'Inter Bold',
    bodyFont: 'Inter',
    suitableFor: ['minimal', 'professional'],
  },
  {
    id: 'sketchnote_hand',
    name: { cn: '手寫＋黑體', en: 'Hand-lettered + Sans' },
    headingFont: 'Caveat Bold',
    bodyFont: '微軟正黑體',
    suitableFor: ['sketchnote'],
  },
  {
    id: 'mono_tech',
    name: { cn: '科技等寬', en: 'Tech Monospace' },
    headingFont: 'JetBrains Mono Bold',
    bodyFont: 'Inter',
    suitableFor: ['darktech'],
  },
]
