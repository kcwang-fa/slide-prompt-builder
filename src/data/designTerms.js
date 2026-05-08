// Reusable visual-language terms that can be inserted into the generated prompt.
// Keep these concrete so NotebookLM has layout-level instructions, not vague style words.

export const DESIGN_TERMS = [
  {
    id: 'flat_icons',
    label: { cn: '扁平化圖示', en: 'Flat Icons' },
    description: {
      cn: '一致筆畫、單色或雙色，不做擬真陰影',
      en: 'Consistent stroke weight, one or two colors, no realistic shadows',
    },
    prompt: {
      cn: '圖示系統採用簡潔扁平化圖示（Flat Icons），維持一致筆畫、單色或雙色，不使用擬真陰影。',
      en: 'Use simple flat icons with consistent stroke weight, one or two colors, and no realistic shadows.',
    },
  },
  {
    id: 'high_negative_space',
    label: { cn: '高負空間', en: 'High Negative Space' },
    description: {
      cn: '少元素、大邊界、讓重點自己呼吸',
      en: 'Fewer elements, wider margins, more breathing room',
    },
    prompt: {
      cn: '維持高負空間（High Negative Space）：每頁只保留必要元素，四周留白明顯，避免將文字與圖表塞滿畫面。',
      en: 'Maintain high negative space: keep only essential elements on each slide, use generous margins, and avoid filling the canvas with text or charts.',
    },
  },
  {
    id: 'infographic_first',
    label: { cn: '資訊圖表優先', en: 'Infographic First' },
    description: {
      cn: '用流程、對照與時間軸取代純文字',
      en: 'Use flows, comparisons, and timelines before plain text',
    },
    prompt: {
      cn: '優先以資訊圖表（Infographics）呈現內容，例如流程圖、對照表、時間軸與關係圖，避免整頁純文字。',
      en: 'Prioritize infographics such as process diagrams, comparison tables, timelines, and relationship maps instead of full-text slides.',
    },
  },
  {
    id: 'data_badges',
    label: { cn: '數據徽章', en: 'Data Badges' },
    description: {
      cn: '關鍵數字放大並放進圓形或膠囊標籤',
      en: 'Make key figures large inside circular or pill badges',
    },
    prompt: {
      cn: '關鍵數據需以大字級突顯，放在圓形或膠囊形徽章中，並使用強調色建立視覺焦點。',
      en: 'Highlight key numbers in large display type inside circular or pill-shaped badges, using the accent color as the visual focus.',
    },
  },
  {
    id: 'clear_hierarchy',
    label: { cn: '清楚視覺階層', en: 'Clear Hierarchy' },
    description: {
      cn: '標題、重點、補充資訊層級分明',
      en: 'Distinct levels for titles, key points, and support text',
    },
    prompt: {
      cn: '建立清楚視覺階層：標題、關鍵句、補充文字與來源註記需有明確字級差異與位置分工。',
      en: 'Create clear visual hierarchy: titles, key statements, support text, and source notes need distinct type sizes and placement roles.',
    },
  },
  {
    id: 'grid_alignment',
    label: { cn: '網格對齊', en: 'Grid Alignment' },
    description: {
      cn: '使用一致欄寬、間距與對齊線',
      en: 'Use consistent columns, spacing, and alignment lines',
    },
    prompt: {
      cn: '版面使用網格對齊（Grid Alignment）：欄寬、間距與對齊線需一致，讓圖示、數據與文字形成穩定節奏。',
      en: 'Use grid alignment with consistent column widths, spacing, and alignment lines so icons, metrics, and text form a stable rhythm.',
    },
  },
]

export function designTermById(id) {
  return DESIGN_TERMS.find((term) => term.id === id)
}
