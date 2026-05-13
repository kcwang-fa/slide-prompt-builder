export function SectionCountSlider({ value, onChange, language }) {
  // 投影片數估算：開場 1 封面 + 1 摘要、主體 value × 2–4、結尾 1 takeaways + 1 sources
  const minSlides = 4 + value * 2
  const maxSlides = 4 + value * 4
  return (
    <section className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <label htmlFor="section-count" className="block text-base font-black text-zinc-900">
            {language === 'cn' ? '主體章節數' : 'Body Sections'}
          </label>
          <p className="mt-1 text-sm font-semibold leading-relaxed text-zinc-600">
            {language === 'cn'
              ? '控制簡報的內容結構，不是硬性的總投影片張數。'
              : 'Controls deck structure, not the strict total slide count.'}
          </p>
        </div>
        <div className="shrink-0 rounded-lg bg-orange-50 px-3 py-2 text-right">
          <div className="text-2xl font-black leading-none text-orange-600">
            {value}
            <span className="ml-1 text-sm font-bold text-orange-700">
              {language === 'cn' ? '章' : 'sections'}
            </span>
          </div>
          <div className="mt-1 text-xs font-bold text-zinc-500">
            {language === 'cn'
              ? `約 ${minSlides}–${maxSlides} 張投影片`
              : `≈ ${minSlides}–${maxSlides} slides`}
          </div>
        </div>
      </div>
      <input
        id="section-count"
        type="range"
        min={1}
        max={6}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-4 w-full accent-orange-500"
      />
      <div className="flex justify-between text-xs text-zinc-400 mt-1">
        <span>1</span>
        <span>6</span>
      </div>
      <div className="mt-2 text-sm font-semibold leading-relaxed text-zinc-500">
        {language === 'cn'
          ? '建議 2–4 章；5–6 章適合長篇或高密度報告，但可能影響產出品質。估算已包含封面、摘要、takeaways 與來源頁。'
          : 'Recommended: 2–4 sections; 5–6 fits longer or denser reports but may reduce output quality. The estimate includes cover, summary, takeaways, and sources.'}
      </div>
    </section>
  )
}
