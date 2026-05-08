import { Sparkles } from 'lucide-react'
import { EXAMPLE_BRIEF, EMPTY_BRIEF } from '../data/exampleBrief.js'
import { PALETTES } from '../data/palettes.js'
import { FONT_PAIRINGS } from '../data/fontPairings.js'

function ColorField({ label, value, onChange, language }) {
  const swatch = /^#[0-9A-Fa-f]{6}$/.test(value) ? value : '#FFFFFF'
  return (
    <label className="block">
      <span className="block text-xs font-semibold text-zinc-600 mb-1">{label}</span>
      <div className="flex items-stretch gap-2">
        <input
          type="color"
          value={swatch}
          onChange={(e) => onChange(e.target.value.toUpperCase())}
          className="w-10 h-9 rounded border border-zinc-300 cursor-pointer p-0"
          aria-label={`${label} picker`}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={language === 'cn' ? '#003366 或留空' : '#003366 or blank'}
          className="flex-1 rounded-lg border border-zinc-300 px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400"
        />
      </div>
    </label>
  )
}

function PaletteChip({ palette, onApply, isMatch, isActive, language }) {
  return (
    <button
      type="button"
      onClick={() => onApply(palette)}
      title={palette.description[language]}
      className={`shrink-0 flex flex-col items-start gap-1 px-2.5 py-2 rounded-lg border transition ${
        isActive
          ? 'border-orange-500 bg-orange-50'
          : 'border-zinc-200 hover:border-orange-300 hover:bg-orange-50'
      }`}
    >
      <div className="flex gap-1">
        <span className="w-4 h-4 rounded-full border border-zinc-300" style={{ background: palette.background }} />
        <span className="w-4 h-4 rounded-full" style={{ background: palette.primary }} />
        <span className="w-4 h-4 rounded-full" style={{ background: palette.accent }} />
      </div>
      <span className="text-xs font-bold text-zinc-700">{palette.name[language]}</span>
      {isMatch && (
        <span className="text-[10px] text-orange-600 font-bold">
          {language === 'cn' ? '✓ 對應風格' : '✓ matches style'}
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
      className={`shrink-0 flex flex-col items-start gap-0.5 px-3 py-2 rounded-lg border transition text-left ${
        isActive
          ? 'border-orange-500 bg-orange-50'
          : 'border-zinc-200 hover:border-orange-300 hover:bg-orange-50'
      }`}
    >
      <span className="text-xs font-bold text-zinc-700">{pairing.name[language]}</span>
      <span className="text-[10px] text-zinc-500 truncate max-w-[200px]">
        {pairing.headingFont} ／ {pairing.bodyFont}
      </span>
      {isMatch && (
        <span className="text-[10px] text-orange-600 font-bold">
          {language === 'cn' ? '✓ 對應風格' : '✓ matches style'}
        </span>
      )}
    </button>
  )
}

export function CustomBriefInput({ value, onChange, language, slideStyle }) {
  const isOpen = Object.values(value).some((v) => v && v.length > 0)

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

  // 將「對應目前風格」的選項排在前面
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
    <details className="rounded-xl border border-zinc-200 bg-white open:shadow-sm" open={isOpen}>
      <summary className="cursor-pointer list-none px-4 py-3 flex items-center justify-between gap-2">
        <span className="text-sm font-semibold text-zinc-700">
          {language === 'cn' ? '進階視覺指示（選填）' : 'Advanced Visual Brief (optional)'}
        </span>
        <span className="text-xs text-zinc-400 truncate">
          {language === 'cn'
            ? '挑色板與字型組合，或直接輸入色號／字型'
            : 'Pick palettes & font pairings, or type custom values'}
        </span>
      </summary>

      <div className="px-4 pb-4 space-y-5 border-t border-zinc-100 pt-4">
        {/* 建議色板 */}
        <div>
          <div className="text-xs font-semibold text-zinc-600 mb-2">
            {language === 'cn' ? '建議色板（點擊套用）' : 'Suggested Palettes (click to apply)'}
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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

        {/* 建議字型組合 */}
        <div>
          <div className="text-xs font-semibold text-zinc-600 mb-2">
            {language === 'cn' ? '建議字型組合（點擊套用）' : 'Suggested Font Pairings (click to apply)'}
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
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

        {/* 其他備註 */}
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
          {isOpen && (
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
