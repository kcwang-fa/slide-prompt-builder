// 把 visualBrief 物件組成可貼進 prompt 的區塊。
// 任何欄位空著就跳過；全空就回傳空字串（template 那邊會整段消失）。

export function buildVisualBriefBlock(brief, language) {
  const t = (cn, en) => (language === 'cn' ? cn : en)

  const bullets = []
  if (brief.background) bullets.push(`- ${t('背景色', 'Background')}：${brief.background}`)
  if (brief.primary) bullets.push(`- ${t('主色', 'Primary color')}：${brief.primary}`)
  if (brief.accent)
    bullets.push(`- ${t('強調色（用於關鍵數據與重點）', 'Accent (key metrics & highlights)')}：${brief.accent}`)
  if (brief.headingFont) bullets.push(`- ${t('標題字型', 'Heading font')}：${brief.headingFont}`)
  if (brief.bodyFont) bullets.push(`- ${t('正文字型', 'Body font')}：${brief.bodyFont}`)

  const notes = (brief.notes || '').trim()
  if (bullets.length === 0 && !notes) return ''

  const heading = t(
    '**視覺細部要求（使用者自訂，優先於前述風格／配色）：**',
    '**Detailed Visual Spec (user-provided, takes priority over the style/palette above):**'
  )
  const otherLabel = t('其他要求：', 'Other notes:')

  const parts = [heading]
  if (bullets.length) parts.push(bullets.join('\n'))
  if (notes) parts.push(`${otherLabel}\n${notes}`)
  return '\n' + parts.join('\n\n') + '\n'
}
