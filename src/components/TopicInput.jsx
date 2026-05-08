export function TopicInput({ value, onChange, language }) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold text-zinc-700 mb-1">
        {language === 'cn' ? '主題' : 'Topic'}
      </span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        placeholder={
          language === 'cn'
            ? '例如：機器學習在醫療影像辨識的應用'
            : 'e.g., Applications of ML in medical imaging'
        }
        className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 resize-y"
      />
    </label>
  )
}
