export function SectionCountSlider({ value, onChange, language }) {
  // 投影片數估算：開場 1 封面 + 1 TL;DR、主體 value × 2–4、結尾 1 takeaways + 1 sources
  const minSlides = 4 + value * 2
  const maxSlides = 4 + value * 4
  return (
    <label className="block">
      <div className="flex items-baseline justify-between mb-1">
        <span className="text-sm font-semibold text-zinc-700">
          {language === 'cn' ? `主體章節數：${value}` : `Body Sections: ${value}`}
        </span>
        <span className="text-xs text-zinc-500">
          {language === 'cn'
            ? `總計約 ${minSlides}–${maxSlides} 張投影片`
            : `≈ ${minSlides}–${maxSlides} slides total`}
        </span>
      </div>
      <input
        type="range"
        min={3}
        max={10}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-orange-500"
      />
      <div className="flex justify-between text-xs text-zinc-400 mt-1">
        <span>3</span>
        <span>10</span>
      </div>
      <div className="text-[11px] text-zinc-400 mt-1">
        {language === 'cn'
          ? '每章節 2–4 張；另含封面、TL;DR、takeaways、來源頁。'
          : 'Each section yields 2–4 slides; plus cover, TL;DR, takeaways, sources.'}
      </div>
    </label>
  )
}
