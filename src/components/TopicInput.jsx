const TOPIC_PLACEHOLDERS = {
  acip: {
    cn: '例如：115 年流感疫苗接種政策修訂 ACIP 討論案',
    en: 'e.g., ACIP discussion item on revising the 2026 influenza vaccination policy',
  },
  outbreak: {
    cn: '例如：某醫院麻疹群聚事件疫調與防治作為報告',
    en: 'e.g., Outbreak investigation and response report for a measles cluster in a hospital',
  },
  teaching: {
    cn: '例如：登革熱臨床辨識、通報定義與公衛處置教學',
    en: 'e.g., Teaching deck on dengue clinical recognition, reporting definition, and public-health response',
  },
  sketchnote: {
    cn: '例如：某篇疫苗有效性研究的研究設計、主要發現與限制整理',
    en: 'e.g., Evidence review of a vaccine effectiveness study: design, main findings, and limitations',
  },
  minimal: {
    cn: '例如：本週呼吸道病毒監測重點摘要',
    en: 'e.g., Key summary of this week’s respiratory virus surveillance',
  },
  custom: {
    cn: '例如：請描述這份簡報的主題、範圍與使用情境',
    en: 'e.g., Describe the deck topic, scope, and usage context',
  },
}

function topicPlaceholder(slideStyle, language) {
  const fallback = TOPIC_PLACEHOLDERS.custom
  const placeholder = TOPIC_PLACEHOLDERS[slideStyle] || fallback
  return placeholder[language] || placeholder.cn
}

export function TopicInput({ value, onChange, language, slideStyle }) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold text-zinc-700 mb-1">
        {language === 'cn' ? '主題' : 'Topic'}
      </span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        placeholder={topicPlaceholder(slideStyle, language)}
        className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 resize-y"
      />
    </label>
  )
}
