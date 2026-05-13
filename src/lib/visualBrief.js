// 把 visualBrief 物件組成可貼進 prompt 的區塊。
// 任何欄位空著就跳過；全空就回傳空字串（template 那邊會整段消失）。

import { designTermById } from '../data/designTerms.js'
import { fontPairingById } from '../data/fontPairings.js'
import { paletteById } from '../data/palettes.js'

export const DEFAULT_SIMPLE_VISUAL_BRIEF = {
  paletteId: 'forest',
  fontPairingId: 'jhenghei_safe',
}

export function normalizeSimpleVisualBrief(brief = {}) {
  const source = brief || {}
  const paletteId = paletteById(source.paletteId)
    ? source.paletteId
    : DEFAULT_SIMPLE_VISUAL_BRIEF.paletteId
  const fontPairingId = fontPairingById(source.fontPairingId)
    ? source.fontPairingId
    : DEFAULT_SIMPLE_VISUAL_BRIEF.fontPairingId

  return { paletteId, fontPairingId }
}

export function simpleVisualBriefToPreviewBrief(brief) {
  const normalized = normalizeSimpleVisualBrief(brief)
  const palette = paletteById(normalized.paletteId)
  const pairing = fontPairingById(normalized.fontPairingId)

  return {
    background: palette?.background || '',
    primary: palette?.primary || '',
    accent: palette?.accent || '',
    headingFont: pairing?.headingFont || '',
    bodyFont: pairing?.bodyFont || '',
    designTerms: [],
    notes: '',
  }
}

export function buildSimpleVisualBriefBlock(brief, language) {
  const t = (cn, en) => (language === 'cn' ? cn : en)
  const normalized = normalizeSimpleVisualBrief(brief)
  const palette = paletteById(normalized.paletteId)
  const pairing = fontPairingById(normalized.fontPairingId)

  const paletteText = palette?.prompt?.[language] || palette?.prompt?.cn || palette?.description?.[language]
  const fontText =
    pairing?.prompt?.[language] ||
    pairing?.prompt?.cn ||
    pairing?.simpleLabel?.[language] ||
    pairing?.simpleLabel?.cn ||
    pairing?.name?.[language]

  if (!paletteText && !fontText) return ''

  const lines = []
  if (paletteText) lines.push(`${t('配色', 'Color direction')}：${paletteText}。`)
  if (fontText) lines.push(`${t('字型', 'Typography')}：${fontText}。`)

  return '\n' + lines.join('\n') + '\n'
}

export function hasAdvancedVisualBrief(brief = {}) {
  return Object.values(brief || {}).some((value) => {
    if (Array.isArray(value)) return value.length > 0
    return Boolean(value && String(value).trim().length > 0)
  })
}

export function buildVisualBriefBlock(brief, language) {
  const t = (cn, en) => (language === 'cn' ? cn : en)

  const bullets = []
  if (brief.background) bullets.push(`- ${t('背景色', 'Background')}：${brief.background}`)
  if (brief.primary) bullets.push(`- ${t('主色', 'Primary color')}：${brief.primary}`)
  if (brief.accent)
    bullets.push(`- ${t('強調色（用於關鍵數據與重點）', 'Accent (key metrics & highlights)')}：${brief.accent}`)
  if (brief.headingFont) bullets.push(`- ${t('標題字型', 'Heading font')}：${brief.headingFont}`)
  if (brief.bodyFont) bullets.push(`- ${t('正文字型', 'Body font')}：${brief.bodyFont}`)

  const selectedTerms = Array.isArray(brief.designTerms)
    ? brief.designTerms
        .map((id) => designTermById(id))
        .filter(Boolean)
        .map((term) => `- ${term.label[language] || term.label.cn}：${term.prompt[language] || term.prompt.cn}`)
    : []
  const notes = (brief.notes || '').trim()
  if (bullets.length === 0 && selectedTerms.length === 0 && !notes) return ''

  const heading = t(
    '**視覺細部要求（使用者自訂，優先於前述風格／配色）：**',
    '**Detailed Visual Spec (user-provided, takes priority over the style/palette above):**'
  )
  const termsLabel = t('設計語彙：', 'Design terms:')
  const otherLabel = t('其他要求：', 'Other notes:')
  const conflictRule = t(
    '若設計語彙彼此衝突，請以資訊清楚、內容完整與可讀性優先；高負空間主要用於封面、摘要與結論頁，資料密集頁可降低留白要求。',
    'If design terms conflict, prioritize clarity, completeness, and readability; high negative space should mainly apply to cover, summary, and closing slides, while data-dense slides may use tighter spacing.'
  )

  const parts = [heading]
  if (bullets.length) parts.push(bullets.join('\n'))
  if (selectedTerms.length) parts.push(`${termsLabel}\n${selectedTerms.join('\n')}\n- ${conflictRule}`)
  if (notes) parts.push(`${otherLabel}\n${notes}`)
  return '\n' + parts.join('\n\n') + '\n'
}
