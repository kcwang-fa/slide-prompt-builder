export const AUDIT_CHECKLIST_ITEMS = [
  {
    id: 'slide_sources',
    label: { cn: '每張投影片標註來源', en: 'Cite sources on every slide' },
    description: {
      cn: '頁尾列出主要來源檔名或資料表',
      en: 'List source filenames or datasets in the footer',
    },
    prompt: {
      cn: '每張內容投影片底部都要標註本頁主要參照的來源檔名、資料表或文件名稱。',
      en: 'Every content slide must cite the main source filename, dataset, or document title in the footer.',
    },
  },
  {
    id: 'no_external_inference',
    label: { cn: '禁止外部推論', en: 'No external inference' },
    description: {
      cn: '不得加入 Notebook 來源外的事實或判斷',
      en: 'Do not add facts or judgments outside the notebook sources',
    },
    prompt: {
      cn: '不得使用 Notebook 來源之外的資料、背景知識或自行推論補充內容；來源不足時請明確標示「資料不足」。',
      en: 'Do not use information, background knowledge, or inference beyond the notebook sources; mark insufficient evidence explicitly.',
    },
  },
  {
    id: 'separate_claim_types',
    label: { cn: '區分事實、推論、建議', en: 'Separate facts, inference, and recommendations' },
    description: {
      cn: '避免把觀察結果和政策建議混在一起',
      en: 'Keep observations and recommendations distinct',
    },
    prompt: {
      cn: '清楚區分「事實 / 資料觀察」、「推論 / 解讀」與「建議 / 行動項目」，不要把三者混寫成同一層級。',
      en: 'Clearly separate facts/data observations, interpretation/inference, and recommendations/action items.',
    },
  },
  {
    id: 'data_limitations',
    label: { cn: '標示資料限制', en: 'Show data limitations' },
    description: {
      cn: '主動指出樣本、期間、偏差與不確定性',
      en: 'Name sample, period, bias, and uncertainty limits',
    },
    prompt: {
      cn: '涉及數據或研究結果時，需標示資料期間、樣本限制、可能偏差與不確定性；不要把有限資料寫成確定結論。',
      en: 'For data or research findings, state the data period, sample limits, possible bias, and uncertainty; do not overstate limited evidence.',
    },
  },
  {
    id: 'neutral_tone',
    label: { cn: '避免聳動語氣', en: 'Avoid sensational tone' },
    description: {
      cn: '用保守、精確、可審核的專業語氣',
      en: 'Use restrained, precise, reviewable language',
    },
    prompt: {
      cn: '語氣需保守、精確、可被審核；避免聳動標題、誇大形容詞、恐慌式措辭或未被資料支持的強烈結論。',
      en: 'Use restrained, precise, reviewable language; avoid sensational headlines, exaggerated adjectives, alarmist wording, or unsupported strong conclusions.',
    },
  },
  {
    id: 'taiwan_traditional_chinese',
    label: { cn: '繁中台灣用語', en: 'Taiwan Traditional Chinese' },
    description: {
      cn: '符合台灣公衛、醫療與政府文件用語',
      en: 'Use Taiwan public-health and government terminology',
    },
    prompt: {
      cn: '全程使用繁體中文與台灣慣用語，公衛、醫療、法規與政府文件名稱需符合台灣語境；專有名詞可保留英文原文。',
      en: 'Use Traditional Chinese with Taiwan usage throughout; public-health, medical, legal, and government terms should fit Taiwan context, while proper nouns may remain in English.',
    },
  },
]

const DEFAULT_ENABLED_AUDIT_ITEM_IDS = new Set([
  'no_external_inference',
  'neutral_tone',
])

export const DEFAULT_AUDIT_CHECKLIST = AUDIT_CHECKLIST_ITEMS.reduce((acc, item) => {
  acc[item.id] = DEFAULT_ENABLED_AUDIT_ITEM_IDS.has(item.id)
  return acc
}, {})
