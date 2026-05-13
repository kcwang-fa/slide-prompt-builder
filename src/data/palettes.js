// 預設色板：每組是經過搭配的 background / primary / accent 三色組合。
// `suitableFor` 列出這套色板適合搭配的 slide_style id；會被用來在 UI 上標「對應你的用途」。

export const PALETTES = [
  {
    id: 'medical',
    name: { cn: '醫療公衛', en: 'Medical & Public Health' },
    background: '#FFFFFF',
    primary: '#003366',
    accent: '#FF6B5B',
    description: { cn: '深海藍＋珊瑚橙，白底', en: 'Deep navy + coral on white' },
    prompt: {
      cn: '白色背景、深海藍主色、珊瑚橙強調',
      en: 'white background, deep navy as the primary color, coral orange as the accent',
    },
    suitableFor: ['acip', 'outbreak', 'teaching', 'minimal'],
  },
  {
    id: 'corporate',
    name: { cn: '商務正式', en: 'Corporate Formal' },
    background: '#FFFFFF',
    primary: '#1F3A5F',
    accent: '#C19A6B',
    description: { cn: '海軍藍＋卡其金', en: 'Navy + warm khaki' },
    prompt: {
      cn: '白色背景、海軍藍主色、暖金色強調',
      en: 'white background, navy as the primary color, warm gold as the accent',
    },
    suitableFor: ['outbreak', 'acip'],
  },
  {
    id: 'academic',
    name: { cn: '學術出版', en: 'Academic' },
    background: '#F5F0E6',
    primary: '#3B2F2F',
    accent: '#8B4513',
    description: { cn: '米白底＋深棕，引用感', en: 'Cream + dark brown' },
    prompt: {
      cn: '米白背景、深棕主色、赭色強調',
      en: 'cream background, dark brown as the primary color, ocher as the accent',
    },
    suitableFor: ['sketchnote', 'outbreak', 'acip'],
  },
  {
    id: 'teaching',
    name: { cn: '教學溫暖', en: 'Teaching Warm' },
    background: '#FFF8F0',
    primary: '#D2691E',
    accent: '#5B8A72',
    description: { cn: '暖橘＋森林綠', en: 'Warm orange + sage green' },
    prompt: {
      cn: '暖白背景、橘色主色、森林綠強調',
      en: 'warm white background, orange as the primary color, forest green as the accent',
    },
    suitableFor: ['teaching', 'sketchnote'],
  },
  {
    id: 'ted',
    name: { cn: 'TED 極簡', en: 'TED Minimal' },
    background: '#FFFFFF',
    primary: '#000000',
    accent: '#E62B1E',
    description: { cn: '純黑＋TED 紅', en: 'Pure black + TED red' },
    prompt: {
      cn: '白色背景、黑色主色、紅色強調',
      en: 'white background, black as the primary color, red as the accent',
    },
    suitableFor: ['teaching', 'minimal'],
  },
  {
    id: 'darktech',
    name: { cn: '深色科技', en: 'Dark Tech' },
    background: '#0F1115',
    primary: '#7C5CFF',
    accent: '#22D3EE',
    description: { cn: '黑底＋紫＋電光藍', en: 'Black + violet + neon cyan' },
    prompt: {
      cn: '深色背景、紫色主色、亮藍色強調',
      en: 'dark background, violet as the primary color, bright cyan as the accent',
    },
    suitableFor: [],
  },
  {
    id: 'sketchnote',
    name: { cn: '手繪溫暖', en: 'Sketchnote Warm' },
    background: '#FFFCF7',
    primary: '#2C3E50',
    accent: '#E67E22',
    description: { cn: '米白＋深藍灰＋活力橘', en: 'Cream + slate + zest' },
    prompt: {
      cn: '紙張米白背景、深藍灰主色、活力橘強調',
      en: 'paper-cream background, slate blue as the primary color, vivid orange as the accent',
    },
    suitableFor: ['sketchnote', 'teaching'],
  },
  {
    id: 'forest',
    name: { cn: '森林沉穩', en: 'Forest Calm' },
    background: '#F5F1EA',
    primary: '#1F3D2A',
    accent: '#B8860B',
    description: { cn: '米底＋墨綠＋古銅金', en: 'Cream + forest + bronze' },
    prompt: {
      cn: '米白背景、深綠主色、金色強調',
      en: 'cream background, deep green as the primary color, gold as the accent',
    },
    suitableFor: ['minimal'],
  },
]

export function paletteById(id) {
  return PALETTES.find((palette) => palette.id === id)
}
