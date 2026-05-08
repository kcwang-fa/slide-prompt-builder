// 把 {{key}} 換成 values[key]。
// undefined / null → 保留 `{{key}}` 字面（方便偵錯遺漏）。
// 空字串 → 視為「正常的空值」直接消失（給選填的條件區塊用）。
export function render(template, values) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    const v = values[key]
    if (v === undefined || v === null) return `{{${key}}}`
    return String(v)
  })
}
