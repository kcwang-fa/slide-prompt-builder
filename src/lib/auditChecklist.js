import { AUDIT_CHECKLIST_ITEMS } from '../data/auditChecklist.js'

export function buildAuditChecklistBlock(value, language) {
  const t = (cn, en) => (language === 'cn' ? cn : en)
  const activeItems = AUDIT_CHECKLIST_ITEMS.filter((item) => value?.[item.id])

  if (activeItems.length === 0) return ''

  const bullets = activeItems.map((item) => `- ${item.label[language] || item.label.cn}：${item.prompt[language] || item.prompt.cn}`)

  return `\n${t('**專業審核清單（產出前逐項確認）：**', '**Professional Review Checklist (verify before finalizing):**')}\n${bullets.join('\n')}\n`
}
