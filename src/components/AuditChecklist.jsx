import {
  AlertTriangle,
  Ban,
  CheckSquare,
  ClipboardCheck,
  FileText,
  Languages,
  Split,
} from 'lucide-react'
import { AUDIT_CHECKLIST_ITEMS } from '../data/auditChecklist.js'

const ITEM_ICONS = {
  slide_sources: FileText,
  no_external_inference: Ban,
  separate_claim_types: Split,
  data_limitations: AlertTriangle,
  neutral_tone: ClipboardCheck,
  taiwan_traditional_chinese: Languages,
}

export function AuditChecklist({ value, onChange, language, compact = false }) {
  const toggleItem = (id) => {
    onChange({
      ...value,
      [id]: !value?.[id],
    })
  }

  const activeCount = AUDIT_CHECKLIST_ITEMS.filter((item) => value?.[item.id]).length

  return (
    <section className={`rounded-xl border border-zinc-200 bg-white shadow-sm ${compact ? 'p-3' : 'p-4'}`}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <CheckSquare size={18} className="shrink-0 text-orange-500" />
          <h2 className="truncate text-sm font-semibold text-zinc-700">
            {language === 'cn' ? '審核清單' : 'Review Checklist'}
          </h2>
        </div>
        <span className="shrink-0 rounded-md bg-zinc-100 px-2 py-1 text-[11px] font-bold text-zinc-500">
          {activeCount}/{AUDIT_CHECKLIST_ITEMS.length}
        </span>
      </div>

      <div className={`${compact ? 'mt-2 space-y-1.5' : 'mt-3 space-y-2'}`}>
        {AUDIT_CHECKLIST_ITEMS.map((item) => {
          const Icon = ITEM_ICONS[item.id] || CheckSquare
          const checked = Boolean(value?.[item.id])

          return (
            <label
              key={item.id}
              title={item.description[language] || item.description.cn}
              className={`flex cursor-pointer items-start gap-2 rounded-lg border transition ${
                compact ? 'p-2' : 'p-3'
              } ${
                checked
                  ? 'border-orange-200 bg-orange-50/70'
                  : 'border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50'
              }`}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggleItem(item.id)}
                className="mt-1 h-4 w-4 shrink-0 accent-orange-500"
              />
              <span
                className={`mt-0.5 hidden shrink-0 items-center justify-center rounded-md ${
                  compact ? 'h-6 w-6 sm:inline-flex' : 'h-7 w-7 sm:inline-flex'
                } ${checked ? 'bg-orange-500 text-white' : 'bg-zinc-100 text-zinc-500'}`}
              >
                <Icon size={compact ? 13 : 15} />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-bold text-zinc-700">
                  {item.label[language] || item.label.cn}
                </span>
                <span className={`mt-0.5 text-[11px] leading-snug text-zinc-500 ${compact ? 'hidden' : 'block'}`}>
                  {item.description[language] || item.description.cn}
                </span>
              </span>
            </label>
          )
        })}
      </div>
    </section>
  )
}
