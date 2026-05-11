import { BANKS } from '../data/banks.js'
import {
  BookOpen,
  Briefcase,
  Building2,
  CircleUserRound,
  ClipboardList,
  FileQuestion,
  FileText,
  GraduationCap,
  Lightbulb,
  Microscope,
  PencilLine,
  Presentation,
  Stethoscope,
  Target,
  UserCheck,
} from 'lucide-react'

const OPTION_ICONS = {
  meeting: Briefcase,
  training: GraduationCap,
  teaching: Presentation,
  sketchnote: BookOpen,
  minimal: Lightbulb,
  health_department: Stethoscope,
  team: Target,
  peer: Microscope,
  student: FileText,
  public: CircleUserRound,
  self: PencilLine,
  custom: FileQuestion,
}

const BANK_ICONS = {
  slide_style: ClipboardList,
  slide_audience: Building2,
}

const CUSTOM_PLACEHOLDERS = {
  slide_style: {
    cn: '例如：教育訓練，需涵蓋臨床診斷、症狀、治療、通報定義與公衛措施，並加入案例演練',
    en: 'Example: Training deck covering clinical diagnosis, symptoms, treatment, reporting definition, public-health actions, and case exercises',
  },
  slide_audience: {
    cn: '例如：衛生局所第一線同仁，具公衛實務背景，但不一定熟悉此疾病的臨床細節',
    en: 'Example: Local health department frontline staff with public-health experience but limited clinical detail on this disease',
  },
}

function optionTitle(option, language) {
  return option.title?.[language] || option.title?.cn || option[language] || option.cn
}

function optionDescription(option, language) {
  return option.description?.[language] || option.description?.cn || ''
}

export function VariableSelect({ bankKey, value, onChange, language, customValue = '', onCustomChange }) {
  const bank = BANKS[bankKey]
  if (!bank) return null
  const BankIcon = BANK_ICONS[bankKey] || ClipboardList
  const customPlaceholder = CUSTOM_PLACEHOLDERS[bankKey]?.[language] || CUSTOM_PLACEHOLDERS[bankKey]?.cn || ''

  return (
    <section>
      <div className="mb-2 flex items-center gap-2">
        <BankIcon size={16} className="shrink-0 text-orange-500" />
        <h2 className="text-sm font-semibold text-zinc-700">
          {bank.label[language] || bank.label.cn}
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2" role="radiogroup" aria-label={bank.label[language] || bank.label.cn}>
        {bank.options.map((opt) => {
          const isActive = value === opt.id
          const Icon = OPTION_ICONS[opt.id] || UserCheck

          return (
            <button
              key={opt.id}
              type="button"
              role="radio"
              aria-checked={isActive}
              onClick={() => onChange(opt.id)}
              title={opt[language] || opt.cn}
              className={`flex min-h-[82px] items-start gap-3 rounded-lg border px-3 py-2.5 text-left transition ${
                isActive
                  ? 'border-orange-500 bg-orange-50 text-zinc-900'
                  : 'border-zinc-200 bg-white hover:border-orange-300 hover:bg-orange-50'
              }`}
            >
              <span
                className={`mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${
                  isActive ? 'bg-orange-500 text-white' : 'bg-zinc-100 text-zinc-500'
                }`}
              >
                <Icon size={16} />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-bold leading-snug text-zinc-800">
                  {optionTitle(opt, language)}
                </span>
                <span className="mt-1 block text-[11px] leading-snug text-zinc-500">
                  {optionDescription(opt, language)}
                </span>
              </span>
            </button>
          )
        })}
      </div>

      {value === 'custom' && (
        <label className="mt-3 block">
          <span className="mb-1 block text-xs font-semibold text-zinc-600">
            {language === 'cn' ? '自訂內容' : 'Custom detail'}
          </span>
          <textarea
            value={customValue}
            onChange={(e) => onCustomChange?.(e.target.value)}
            rows={3}
            placeholder={customPlaceholder}
            className="w-full resize-y rounded-lg border border-zinc-300 px-3 py-2 text-sm leading-relaxed focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
        </label>
      )}
    </section>
  )
}
