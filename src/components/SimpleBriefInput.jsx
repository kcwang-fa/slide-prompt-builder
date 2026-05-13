import { Check, Palette, Type } from 'lucide-react'
import { FONT_PAIRINGS } from '../data/fontPairings.js'
import { PALETTES } from '../data/palettes.js'
import { DEFAULT_SIMPLE_VISUAL_BRIEF, normalizeSimpleVisualBrief } from '../lib/visualBrief.js'

function optionText(value, language) {
  return value?.[language] || value?.cn || ''
}

function sortByPurpose(items, slideStyle) {
  return [...items].sort((a, b) => {
    const aMatch = a.suitableFor.includes(slideStyle)
    const bMatch = b.suitableFor.includes(slideStyle)
    return aMatch === bMatch ? 0 : aMatch ? -1 : 1
  })
}

function PaletteOption({ palette, active, onSelect, language, isMatch }) {
  const name = optionText(palette.name, language)
  const prompt = optionText(palette.prompt, language)

  return (
    <button
      type="button"
      onClick={() => onSelect(palette.id)}
      title={prompt || name}
      className={`relative flex min-h-[52px] flex-col items-start gap-0.5 rounded-lg border px-2 py-1.5 pr-6 text-left transition ${
        active
          ? 'border-orange-500 bg-orange-50 text-zinc-900'
          : 'border-zinc-200 bg-white hover:border-orange-300 hover:bg-orange-50'
      }`}
    >
      <span className="flex gap-1">
        <span className="h-3.5 w-3.5 rounded-full border border-zinc-300" style={{ background: palette.background }} />
        <span className="h-3.5 w-3.5 rounded-full" style={{ background: palette.primary }} />
        <span className="h-3.5 w-3.5 rounded-full" style={{ background: palette.accent }} />
      </span>
      <span className="block text-[11px] font-bold leading-tight text-zinc-700">
        {name}
      </span>
      {isMatch && (
        <span className="block text-[9px] font-bold text-orange-600">
          {language === 'cn' ? '對應用途' : 'matches purpose'}
        </span>
      )}
      {active && (
        <span className="absolute right-1.5 top-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-white">
          <Check size={10} strokeWidth={3} />
        </span>
      )}
    </button>
  )
}

function FontOption({ pairing, active, onSelect, language, isMatch }) {
  const label = optionText(pairing.simpleLabel, language) || optionText(pairing.prompt, language)
  const detail = optionText(pairing.prompt, language)
  const showDetail = detail && detail !== label

  return (
    <button
      type="button"
      onClick={() => onSelect(pairing.id)}
      title={detail || label}
      className={`relative flex min-h-[68px] flex-col items-start gap-0.5 rounded-lg border px-2.5 py-2 pr-6 text-left transition ${
        active
          ? 'border-orange-500 bg-orange-50 text-zinc-900'
          : 'border-zinc-200 bg-white hover:border-orange-300 hover:bg-orange-50'
      }`}
    >
      <span className="block text-[11px] font-bold leading-tight text-zinc-700">
        {label}
      </span>
      {showDetail && (
        <span className="line-clamp-2 text-[9px] leading-snug text-zinc-500">
          {detail}
        </span>
      )}
      {isMatch && (
        <span className="block text-[9px] font-bold text-orange-600">
          {language === 'cn' ? '對應用途' : 'matches purpose'}
        </span>
      )}
      {active && (
        <span className="absolute right-1.5 top-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-white">
          <Check size={10} strokeWidth={3} />
        </span>
      )}
    </button>
  )
}

export function SimpleBriefInput({ value, onChange, language, slideStyle }) {
  const normalized = normalizeSimpleVisualBrief(value || DEFAULT_SIMPLE_VISUAL_BRIEF)
  const updateField = (key, nextValue) => onChange({ ...normalized, [key]: nextValue })
  const sortedPalettes = sortByPurpose(PALETTES, slideStyle)
  const sortedPairings = sortByPurpose(FONT_PAIRINGS, slideStyle)

  return (
    <section className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="space-y-4">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-zinc-700">
            <Palette size={17} className="text-orange-500" />
            <h2>{language === 'cn' ? '配色' : 'Color'}</h2>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {sortedPalettes.map((palette) => (
              <PaletteOption
                key={palette.id}
                palette={palette}
                active={normalized.paletteId === palette.id}
                onSelect={(paletteId) => updateField('paletteId', paletteId)}
                language={language}
                isMatch={palette.suitableFor.includes(slideStyle)}
              />
            ))}
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-zinc-700">
            <Type size={17} className="text-orange-500" />
            <h2>{language === 'cn' ? '字型' : 'Typography'}</h2>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {sortedPairings.map((pairing) => (
              <FontOption
                key={pairing.id}
                pairing={pairing}
                active={normalized.fontPairingId === pairing.id}
                onSelect={(fontPairingId) => updateField('fontPairingId', fontPairingId)}
                language={language}
                isMatch={pairing.suitableFor.includes(slideStyle)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
