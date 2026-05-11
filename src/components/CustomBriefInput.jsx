import { useState } from 'react'
import {
  AlignLeft,
  BadgePercent,
  BarChart3,
  LayoutGrid,
  Shapes,
  Space,
  Sparkles,
} from 'lucide-react'
import { EXAMPLE_BRIEF, EMPTY_BRIEF } from '../data/exampleBrief.js'
import { PALETTES } from '../data/palettes.js'
import { FONT_PAIRINGS } from '../data/fontPairings.js'
import { DESIGN_TERMS } from '../data/designTerms.js'

const TERM_ICONS = {
  flat_icons: Shapes,
  high_negative_space: Space,
  infographic_first: BarChart3,
  data_badges: BadgePercent,
  clear_hierarchy: AlignLeft,
  grid_alignment: LayoutGrid,
}

const VISUAL_SECTIONS = [
  { id: 'colors', label: { cn: '色彩', en: 'Colors' } },
  { id: 'fonts', label: { cn: '字型', en: 'Fonts' } },
  { id: 'terms', label: { cn: '語彙', en: 'Terms' } },
  { id: 'notes', label: { cn: '備註', en: 'Notes' } },
]

function ColorField({ label, value, onChange, language }) {
  const swatch = /^#[0-9A-Fa-f]{6}$/.test(value) ? value : '#FFFFFF'
  return (
    <label className="block">
      <span className="block text-xs font-semibold text-zinc-600 mb-1">{label}</span>
      <div className="flex min-w-0 items-stretch gap-2">
        <input
          type="color"
          value={swatch}
          onChange={(e) => onChange(e.target.value.toUpperCase())}
          className="h-9 w-10 min-w-10 shrink-0 rounded border border-zinc-300 cursor-pointer p-0"
          aria-label={`${label} picker`}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={language === 'cn' ? '#003366 或留空' : '#003366 or blank'}
          className="min-w-0 flex-1 rounded-lg border border-zinc-300 px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400"
        />
      </div>
    </label>
  )
}

function TextField({ label, value, onChange, placeholder }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold text-zinc-600 mb-1">{label}</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400"
      />
    </label>
  )
}

function PaletteChip({ palette, onApply, isMatch, isActive, language }) {
  return (
    <button
      type="button"
      onClick={() => onApply(palette)}
      title={palette.description[language]}
      className={`flex min-h-[52px] flex-col items-start gap-0.5 rounded-lg border px-2 py-1.5 text-left transition ${
        isActive
          ? 'border-orange-500 bg-orange-50'
          : 'border-zinc-200 hover:border-orange-300 hover:bg-orange-50'
      }`}
    >
      <div className="flex gap-1">
        <span className="h-3.5 w-3.5 rounded-full border border-zinc-300" style={{ background: palette.background }} />
        <span className="h-3.5 w-3.5 rounded-full" style={{ background: palette.primary }} />
        <span className="h-3.5 w-3.5 rounded-full" style={{ background: palette.accent }} />
      </div>
      <span className="text-[11px] font-bold text-zinc-700">{palette.name[language]}</span>
      {isMatch && (
        <span className="text-[9px] text-orange-600 font-bold">
          {language === 'cn' ? '✓ 對應用途' : '✓ matches purpose'}
        </span>
      )}
    </button>
  )
}

function PairingChip({ pairing, onApply, isMatch, isActive, language }) {
  return (
    <button
      type="button"
      onClick={() => onApply(pairing)}
      className={`flex min-h-[68px] flex-col items-start gap-0.5 rounded-lg border px-2.5 py-2 text-left transition ${
        isActive
          ? 'border-orange-500 bg-orange-50'
          : 'border-zinc-200 hover:border-orange-300 hover:bg-orange-50'
      }`}
    >
      <span className="text-[11px] font-bold leading-tight text-zinc-700">{pairing.name[language]}</span>
      <span className="line-clamp-2 text-[9px] leading-snug text-zinc-500">
        {pairing.headingFont} ／ {pairing.bodyFont}
      </span>
      {isMatch && (
        <span className="text-[9px] text-orange-600 font-bold">
          {language === 'cn' ? '✓ 對應用途' : '✓ matches purpose'}
        </span>
      )}
    </button>
  )
}

function DesignTermChip({ term, isActive, onToggle, language }) {
  const Icon = TERM_ICONS[term.id] || Sparkles

  return (
    <button
      type="button"
      onClick={() => onToggle(term.id)}
      title={term.description[language] || term.description.cn}
      className={`min-h-[76px] rounded-lg border px-3 py-2 text-left transition flex items-start gap-2 ${
        isActive
          ? 'border-orange-500 bg-orange-50 text-zinc-900'
          : 'border-zinc-200 bg-white hover:border-orange-300 hover:bg-orange-50'
      }`}
    >
      <span
        className={`mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${
          isActive ? 'bg-orange-500 text-white' : 'bg-zinc-100 text-zinc-500'
        }`}
      >
        <Icon size={15} />
      </span>
      <span className="min-w-0">
        <span className="block text-xs font-bold text-zinc-700">{term.label[language] || term.label.cn}</span>
        <span className="mt-0.5 block text-[11px] leading-snug text-zinc-500">
          {term.description[language] || term.description.cn}
        </span>
      </span>
    </button>
  )
}

export function CustomBriefInput({ value, onChange, language, slideStyle, forceOpen = false }) {
  const [activeSection, setActiveSection] = useState('colors')
  const isOpen = Object.values(value).some((v) => {
    if (Array.isArray(v)) return v.length > 0
    return Boolean(v && String(v).length > 0)
  })
  const selectedDesignTerms = Array.isArray(value.designTerms) ? value.designTerms : []

  const updateField = (key, val) => onChange({ ...value, [key]: val })

  const handleLoadExample = () => onChange(EXAMPLE_BRIEF[language] || EXAMPLE_BRIEF.cn)
  const handleClear = () => onChange(EMPTY_BRIEF)

  const applyPalette = (p) => {
    onChange({
      ...value,
      background: p.background,
      primary: p.primary,
      accent: p.accent,
    })
  }

  const applyPairing = (pair) => {
    onChange({
      ...value,
      headingFont: pair.headingFont,
      bodyFont: pair.bodyFont,
    })
  }

  const toggleDesignTerm = (termId) => {
    const next = selectedDesignTerms.includes(termId)
      ? selectedDesignTerms.filter((id) => id !== termId)
      : [...selectedDesignTerms, termId]

    onChange({
      ...value,
      designTerms: next,
    })
  }

  // 將「對應目前用途」的選項排在前面
  const sortedPalettes = [...PALETTES].sort((a, b) => {
    const aMatch = a.suitableFor.includes(slideStyle)
    const bMatch = b.suitableFor.includes(slideStyle)
    return aMatch === bMatch ? 0 : aMatch ? -1 : 1
  })
  const sortedPairings = [...FONT_PAIRINGS].sort((a, b) => {
    const aMatch = a.suitableFor.includes(slideStyle)
    const bMatch = b.suitableFor.includes(slideStyle)
    return aMatch === bMatch ? 0 : aMatch ? -1 : 1
  })

  return (
    <details className="rounded-xl border border-zinc-200 bg-white open:shadow-sm" open={forceOpen || isOpen}>
      <summary className="cursor-pointer list-none px-4 py-3 flex items-center justify-between gap-2">
        <span className="text-sm font-semibold text-zinc-700">
          {language === 'cn' ? '進階視覺指示（選填）' : 'Advanced Visual Brief (optional)'}
        </span>
        <span className="text-xs text-zinc-400 truncate">
          {language === 'cn'
            ? '挑色板、字型與設計語彙'
            : 'Pick palettes, fonts, and design terms'}
        </span>
      </summary>

      <div className="px-4 pb-4 space-y-4 border-t border-zinc-100 pt-4">
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-1">
          <div className="grid grid-cols-4 gap-1" role="tablist" aria-label={language === 'cn' ? '視覺設定分類' : 'Visual settings'}>
            {VISUAL_SECTIONS.map((section) => {
              const isActive = activeSection === section.id

              return (
                <button
                  key={section.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveSection(section.id)}
                  className={`min-h-8 rounded-md px-2 py-1 text-xs font-bold transition ${
                    isActive
                      ? 'bg-white text-orange-600 shadow-sm'
                      : 'text-zinc-500 hover:bg-white/70 hover:text-zinc-800'
                  }`}
                >
                  {section.label[language] || section.label.cn}
                </button>
              )
            })}
          </div>
        </div>

        {activeSection === 'colors' && (
          <div className="space-y-4">
            {/* 建議色板 */}
            <div>
              <div className="text-xs font-semibold text-zinc-600 mb-2">
                {language === 'cn' ? '建議色板（點擊套用）' : 'Suggested Palettes (click to apply)'}
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {sortedPalettes.map((p) => (
                  <PaletteChip
                    key={p.id}
                    palette={p}
                    onApply={applyPalette}
                    isMatch={p.suitableFor.includes(slideStyle)}
                    isActive={
                      value.background === p.background &&
                      value.primary === p.primary &&
                      value.accent === p.accent
                    }
                    language={language}
                  />
                ))}
              </div>
            </div>

            {/* 顏色微調 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <ColorField
                label={language === 'cn' ? '背景色' : 'Background'}
                value={value.background}
                onChange={(v) => updateField('background', v)}
                language={language}
              />
              <ColorField
                label={language === 'cn' ? '主色' : 'Primary'}
                value={value.primary}
                onChange={(v) => updateField('primary', v)}
                language={language}
              />
              <ColorField
                label={language === 'cn' ? '強調色（重點數據）' : 'Accent (key data)'}
                value={value.accent}
                onChange={(v) => updateField('accent', v)}
                language={language}
              />
            </div>
          </div>
        )}

        {activeSection === 'fonts' && (
          <div className="space-y-4">
            <div>
              <div className="text-xs font-semibold text-zinc-600 mb-2">
                {language === 'cn' ? '建議字型組合（點擊套用）' : 'Suggested Font Pairings (click to apply)'}
              </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {sortedPairings.map((pair) => (
                  <PairingChip
                    key={pair.id}
                    pairing={pair}
                    onApply={applyPairing}
                    isMatch={pair.suitableFor.includes(slideStyle)}
                    isActive={
                      value.headingFont === pair.headingFont &&
                      value.bodyFont === pair.bodyFont
                    }
                    language={language}
                  />
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3">
              <div className="text-xs font-semibold text-zinc-600 mb-2">
                {language === 'cn' ? '自訂字型' : 'Custom Fonts'}
              </div>
              <div className="grid grid-cols-1 gap-3">
                <TextField
                  label={language === 'cn' ? '標題字型' : 'Heading font'}
                  value={value.headingFont}
                  onChange={(v) => updateField('headingFont', v)}
                  placeholder={
                    language === 'cn'
                      ? '例如：Noto Sans TC Bold（中文）+ Inter Bold（英文數字）'
                      : 'e.g., Noto Sans TC Bold + Inter Bold'
                  }
                />
                <TextField
                  label={language === 'cn' ? '正文字型' : 'Body font'}
                  value={value.bodyFont}
                  onChange={(v) => updateField('bodyFont', v)}
                  placeholder={
                    language === 'cn'
                      ? '例如：Noto Serif TC（中文）+ Source Serif 4（英文）'
                      : 'e.g., Noto Serif TC + Source Serif 4'
                  }
                />
              </div>
            </div>
          </div>
        )}

        {activeSection === 'terms' && (
          <div>
            <div className="text-xs font-semibold text-zinc-600 mb-2">
              {language === 'cn' ? '設計語彙（點擊加入 Prompt）' : 'Design Terms (click to include)'}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {DESIGN_TERMS.map((term) => (
                <DesignTermChip
                  key={term.id}
                  term={term}
                  isActive={selectedDesignTerms.includes(term.id)}
                  onToggle={toggleDesignTerm}
                  language={language}
                />
              ))}
            </div>
          </div>
        )}

        {activeSection === 'notes' && (
          <label className="block">
            <span className="block text-xs font-semibold text-zinc-600 mb-1">
              {language === 'cn' ? '其他要求（圖示、版面、字距等）' : 'Other notes (icons, layout, spacing…)'}
            </span>
            <textarea
              value={value.notes}
              onChange={(e) => updateField('notes', e.target.value)}
              rows={5}
              placeholder={
                language === 'cn'
                  ? '例如：使用扁平化圖示、關鍵數據放在圓形框內、保持高負空間感…'
                  : 'e.g., Use flat icons, key numbers inside circular badges, keep ample negative space...'
              }
              className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 resize-y"
            />
          </label>
        )}

        {/* 動作列 */}
        <div className="flex items-center gap-2 text-xs">
          <button
            type="button"
            onClick={handleLoadExample}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-orange-600 hover:bg-orange-50 font-bold"
          >
            <Sparkles size={12} />
            {language === 'cn' ? '填入範例' : 'Load example'}
          </button>
          {(forceOpen || isOpen) && (
            <button
              type="button"
              onClick={handleClear}
              className="px-2.5 py-1 rounded-md text-zinc-500 hover:bg-zinc-100 font-bold"
            >
              {language === 'cn' ? '全部清除' : 'Clear all'}
            </button>
          )}
        </div>
      </div>
    </details>
  )
}
