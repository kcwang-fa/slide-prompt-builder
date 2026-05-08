import {
  AlignLeft,
  BadgePercent,
  BarChart3,
  CircleDot,
  LayoutGrid,
  PanelTop,
  Shapes,
  Space,
} from 'lucide-react'
import { DESIGN_TERMS } from '../data/designTerms.js'

const HEX_RE = /^#[0-9A-Fa-f]{6}$/

function safeHex(value, fallback) {
  return HEX_RE.test(value || '') ? value : fallback
}

function hexToRgb(hex) {
  const normalized = hex.replace('#', '')
  return [
    parseInt(normalized.slice(0, 2), 16),
    parseInt(normalized.slice(2, 4), 16),
    parseInt(normalized.slice(4, 6), 16),
  ]
}

function rgba(hex, alpha) {
  const [r, g, b] = hexToRgb(hex)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

function luminance(hex) {
  const [r, g, b] = hexToRgb(hex).map((channel) => {
    const value = channel / 255
    return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function quotedFamilies(families) {
  return [...new Set(families)].map((family) => `"${family}"`).join(', ')
}

function fontStack(font, fallback) {
  if (!font) return fallback

  const value = font.toLowerCase()
  const families = []

  if (value.includes('caveat')) families.push('Caveat')
  if (value.includes('jetbrains mono')) families.push('JetBrains Mono')
  if (value.includes('source serif')) families.push('Source Serif 4')
  if (value.includes('noto serif')) families.push('Noto Serif TC')
  if (value.includes('ibm plex mono')) families.push('IBM Plex Mono')
  if (value.includes('ibm plex sans')) families.push('IBM Plex Sans TC')
  if (font.includes('思源宋體') || value.includes('source han serif')) {
    families.push('Source Han Serif TC', 'Noto Serif TC')
  }
  if (font.includes('思源黑體') || value.includes('source han sans')) {
    families.push('Source Han Sans TC', 'Noto Sans TC')
  }
  if (value.includes('noto sans')) families.push('Noto Sans TC')
  if (value.includes('inter')) families.push('Inter')
  if (value.includes('helvetica')) families.push('Helvetica Neue')
  if (font.includes('微軟正黑體')) families.push('Microsoft JhengHei')

  if (families.length === 0) return fallback
  if (value.includes('mono')) return `${quotedFamilies(families)}, ui-monospace, SFMono-Regular, Menlo, monospace`
  if (value.includes('serif') || font.includes('宋體')) return `${quotedFamilies(families)}, Georgia, "Times New Roman", serif`
  if (value.includes('caveat')) return `${quotedFamilies(families)}, cursive, sans-serif`
  return `${quotedFamilies(families)}, ${fallback}`
}

function headingWeight(font) {
  if (/black|heavy/i.test(font || '')) return 900
  if (/semibold|semiBold/i.test(font || '')) return 750
  return 800
}

function metricFontStack(font, fallback) {
  return /jetbrains mono|mono/i.test(font || '')
    ? '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace'
    : fallback
}

function termLabel(termId, language) {
  const term = DESIGN_TERMS.find((item) => item.id === termId)
  return term ? term.label[language] || term.label.cn : termId
}

function PreviewIcon({ icon: Icon, primary, surface, compact = false }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-md ${compact ? 'h-6 w-6' : 'h-7 w-7'}`}
      style={{ backgroundColor: surface, color: primary }}
    >
      <Icon size={compact ? 13 : 15} strokeWidth={2.2} />
    </span>
  )
}

export function SlidePreview({ brief, topic, sectionCount, language, compact = false }) {
  const selectedTerms = Array.isArray(brief.designTerms) ? brief.designTerms : []
  const hasTerm = (id) => selectedTerms.includes(id)

  const background = safeHex(brief.background, '#FFFFFF')
  const primary = safeHex(brief.primary, '#1F3A5F')
  const accent = safeHex(brief.accent, '#FF6B5B')
  const isDark = luminance(background) < 0.35
  const textColor = isDark ? '#F8FAFC' : '#18181B'
  const mutedColor = isDark ? 'rgba(248, 250, 252, 0.68)' : 'rgba(39, 39, 42, 0.62)'
  const lineColor = isDark ? 'rgba(248, 250, 252, 0.14)' : 'rgba(39, 39, 42, 0.12)'
  const surfaceColor = isDark ? 'rgba(248, 250, 252, 0.08)' : 'rgba(255, 255, 255, 0.86)'
  const sparse = hasTerm('high_negative_space')
  const title = topic.trim() || (language === 'cn' ? '你的簡報主題' : 'Your slide topic')
  const headingFamily = fontStack(brief.headingFont, 'Inter, system-ui, sans-serif')
  const bodyFamily = fontStack(brief.bodyFont, 'Inter, system-ui, sans-serif')
  const metricFamily = metricFontStack(`${brief.headingFont} ${brief.bodyFont}`, bodyFamily)
  const displayedTerms = selectedTerms.slice(0, compact ? 1 : 3)
  const slidePadding = compact
    ? sparse ? 'p-5' : 'p-4'
    : sparse ? 'p-5 sm:p-10' : 'p-4 sm:p-7'
  const contentGap = compact
    ? sparse ? 'gap-4 pt-4' : 'gap-3 pt-3'
    : sparse ? 'gap-5 pt-5 sm:gap-8 sm:pt-7' : 'gap-4 pt-4 sm:gap-5 sm:pt-5'

  return (
    <section className={`rounded-xl border border-zinc-200 bg-white shadow-sm ${compact ? 'p-3' : 'p-4'}`}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <PanelTop size={18} className="text-orange-500" />
          <h2 className="text-sm font-semibold text-zinc-700">
            {language === 'cn' ? '預覽畫面 Preview' : 'Preview'}
          </h2>
        </div>
        {displayedTerms.length > 0 && (
          <div className="hidden sm:flex min-w-0 items-center gap-1">
            {displayedTerms.map((termId) => (
              <span
                key={termId}
                className="max-w-[130px] truncate rounded-md bg-zinc-100 px-2 py-1 text-[11px] font-semibold text-zinc-500"
              >
                {termLabel(termId, language)}
              </span>
            ))}
          </div>
        )}
      </div>

      <div
        className="mt-3 aspect-video w-full overflow-hidden rounded-lg border shadow-sm"
        style={{
          backgroundColor: background,
          borderColor: lineColor,
          color: textColor,
          fontFamily: bodyFamily,
        }}
      >
        <div className="relative h-full">
          {hasTerm('grid_alignment') && (
            <div
              className="absolute inset-0 opacity-70"
              style={{
                backgroundImage: `linear-gradient(${lineColor} 1px, transparent 1px), linear-gradient(90deg, ${lineColor} 1px, transparent 1px)`,
                backgroundSize: '12.5% 25%',
              }}
            />
          )}

          <div className={`relative z-10 flex h-full flex-col ${slidePadding}`}>
            <div className="flex items-center justify-between gap-3">
              <span className={`h-1.5 rounded-full ${compact ? 'w-12' : 'w-14'}`} style={{ backgroundColor: primary }} />
              <span className="text-[10px] font-semibold" style={{ color: mutedColor, fontFamily: metricFamily }}>
                01 / {String(sectionCount).padStart(2, '0')}
              </span>
            </div>

            <div className={`grid min-h-0 flex-1 grid-cols-[1.1fr_0.9fr] ${contentGap}`}>
              <div className="min-w-0">
                <div className="text-[10px] font-bold" style={{ color: accent }}>
                  {language === 'cn' ? '核心洞察 / KEY INSIGHT' : 'KEY INSIGHT'}
                </div>
                <h3
                  className={`mt-1 max-w-full font-extrabold leading-tight ${compact ? 'text-lg' : 'text-base sm:text-2xl'}`}
                  style={{
                    color: primary,
                    fontFamily: headingFamily,
                    fontWeight: headingWeight(brief.headingFont),
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {title}
                </h3>
                <p
                  className={`mt-2 max-w-full truncate text-[11px] leading-snug ${compact ? 'hidden sm:block' : 'block'}`}
                  style={{ color: mutedColor, fontFamily: bodyFamily }}
                >
                  {language === 'cn'
                    ? '資料期間、來源註記與方法限制 / Data period, sources, limitations'
                    : 'Data period, source notes, and limitations'}
                </p>

                <div className={compact ? 'mt-3 space-y-1.5' : sparse ? 'mt-5 space-y-3' : 'mt-4 space-y-2'}>
                  {[0, 1, 2].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: accent }} />
                      <span
                        className={`h-2 rounded-full ${item === 2 ? 'w-2/3' : 'w-full'}`}
                        style={{ backgroundColor: lineColor }}
                      />
                    </div>
                  ))}
                </div>

                {hasTerm('flat_icons') && (
                  <div className={`${compact ? 'mt-3' : 'mt-5'} flex items-center gap-2`}>
                    <PreviewIcon icon={Shapes} primary={primary} surface={surfaceColor} compact={compact} />
                    <PreviewIcon icon={Space} primary={primary} surface={surfaceColor} compact={compact} />
                    <PreviewIcon icon={LayoutGrid} primary={primary} surface={surfaceColor} compact={compact} />
                  </div>
                )}
              </div>

              <div className="flex min-w-0 flex-col justify-between gap-3">
                {hasTerm('data_badges') ? (
                  <div
                    className={`ml-auto flex shrink-0 flex-col items-center justify-center rounded-full text-center shadow-sm ${
                      compact ? 'h-14 w-14' : 'h-12 w-12 sm:h-24 sm:w-24'
                    }`}
                    style={{ backgroundColor: accent, color: '#FFFFFF' }}
                  >
                    <span
                      className={`font-black leading-none ${compact ? 'text-xl' : 'text-lg sm:text-3xl'}`}
                      style={{ fontFamily: metricFamily }}
                    >
                      {sectionCount}
                    </span>
                    <span className={`font-bold uppercase leading-none ${compact ? 'mt-0.5 text-[7px]' : 'mt-0.5 text-[7px] sm:mt-1 sm:text-[9px]'}`}>
                      {language === 'cn' ? '章節 / SEC' : 'Sections'}
                    </span>
                  </div>
                ) : (
                  <div className="ml-auto flex items-center gap-2">
                    <PreviewIcon icon={BadgePercent} primary={accent} surface={surfaceColor} compact={compact} />
                    <PreviewIcon icon={CircleDot} primary={primary} surface={surfaceColor} compact={compact} />
                  </div>
                )}

                {hasTerm('infographic_first') ? (
                  <div className={`grid grid-cols-3 items-end gap-2 ${compact ? 'h-12' : 'h-12 sm:h-20'}`}>
                    {[52, 76, 64].map((height, index) => (
                      <div key={height} className="flex flex-col items-center gap-1">
                        <div
                          className="w-full rounded-t-md"
                          style={{
                            height: `${height}%`,
                            backgroundColor: index === 1 ? rgba(accent, 0.9) : rgba(primary, 0.82),
                          }}
                        />
                        <span className="h-1 w-full rounded-full" style={{ backgroundColor: lineColor }} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="h-8 rounded-md" style={{ backgroundColor: surfaceColor, border: `1px solid ${lineColor}` }} />
                    <div className="h-8 rounded-md" style={{ backgroundColor: surfaceColor, border: `1px solid ${lineColor}` }} />
                  </div>
                )}

                {!compact && hasTerm('clear_hierarchy') && (
                  <div className="hidden items-center gap-2 sm:flex" style={{ color: mutedColor }}>
                    <AlignLeft size={13} />
                    <span className="h-1.5 flex-1 rounded-full" style={{ backgroundColor: lineColor }} />
                  </div>
                )}

                {!compact && hasTerm('infographic_first') && (
                  <div className="hidden items-center gap-2 text-[10px] font-semibold sm:flex" style={{ color: mutedColor }}>
                    <BarChart3 size={13} />
                    <span>{language === 'cn' ? '圖表優先 / Visual first' : 'Visual first'}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
