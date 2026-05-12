// 詞庫：簡報用途與讀者背景。每個選項帶中英描述，會原封不動代入 prompt。

export const BANKS = {
  slide_style: {
    label: { cn: '簡報用途', en: 'Deck Purpose' },
    options: [
      {
        id: 'acip',
        title: { cn: 'ACIP 報告', en: 'ACIP Report' },
        description: {
          cn: '預防接種諮詢委員會報告案／討論案，含流病、疫苗比較、各國建議與採購規劃',
          en: 'Advisory Committee on Immunization Practices report or discussion item',
        },
        cn: 'ACIP 報告 — 用於預防接種諮詢委員會（ACIP）報告案或討論案。請依下列章節組織內容，並在封面註明案件性質（報告案／討論案）、案號、提案單位與日期：(1) 封面與大綱；(2) 背景說明（清楚引用過往 ACIP 決議：年份、會議次別、決議原文摘錄，並交代政策沿革與本次修訂緣由）；(3) 疾病流行病學（多年期病例數與死亡數趨勢、年齡層分布、血清型／菌型分布、IPD 高風險族群、發生率以「每 10 萬人」呈現，盡量用表格或趨勢圖；註明資料來源與更新日期）；(4) 國內現行政策與接種情形（推動歷程時間軸、各階段接種對象、世代、累計接種劑數、接種完成率，依年度／世代分層）；(5) 國際各國接種建議比較表（美國 CDC、加拿大 NACI、英國、澳洲等；列國家／對象／一般成人／高風險對象／接種順序與間隔，附資料來源連結）；(6) 疫苗介紹表（疫苗種類、涵蓋血清型／抗原、廠商、國內藥證取得日、供貨情形、價格 / 公費或自費）；(7) 疫苗比較（免疫原性不劣性／優越性、安全性、適用對象、臨床試驗證據）；(8) 工作小組會議決議或書面審查結果（會議日期、決議文）；(9) 提案內容（銜接原則、追加劑、採購比例、最有利標、期程；建議用「現況 vs 修訂後」對照表）；(10) 國內庫存與供貨推估（庫存量、預定交貨量、使用至何時）；(11) 提請決議事項（明列提案備查／提請討論／提請決議的具體文字）；(12) 簡報完畢，敬請指教。資訊密度高、表格密集，請保留專業術語（價數、血清型、不劣性、免疫原性、IPD、PCV／PPV／Tdap／MMR 等），日期一律使用民國年（如「114/8/21」）並註明資料更新時點。',
        en: 'ACIP Report — for Taiwan Advisory Committee on Immunization Practices (ACIP) report items or discussion items. Structure the deck this way, and on the cover note the item type (report / discussion), item number, proposing unit, and date: (1) Cover and outline; (2) Background — cite past ACIP resolutions verbatim with year, session number, and original wording, and explain policy history and reason for revision; (3) Disease epidemiology — multi-year case and death trends, age-group distribution, serotype / strain distribution, IPD high-risk groups; express incidence as per 100,000; prefer tables and trend charts; cite source and data-update date; (4) Current domestic policy and uptake — rollout timeline, target cohorts per phase, cumulative doses, completion rates, broken down by year / cohort; (5) Cross-country recommendation table (US CDC, NACI Canada, UK, Australia, etc.) covering country, target, general adults, high-risk adults, sequence and intervals, with source URLs; (6) Vaccine introduction table — vaccine type, serotype / antigen coverage, manufacturer, domestic license date, supply status, price / public-funded or self-pay; (7) Vaccine comparison — immunogenicity non-inferiority / superiority, safety, indication, clinical-trial evidence; (8) Working-group meeting resolution or written review results (date and resolution text); (9) Proposal — bridging principle, booster doses, procurement ratio, best-value tender, schedule; use a current vs. revised comparison table; (10) National stockpile and supply projection — inventory, scheduled deliveries, runway; (11) Resolution requested — spell out exact wording for noting / discussion / decision; (12) Closing slide. Density is high and tables are heavy; retain technical terminology (valency, serotype, non-inferiority, immunogenicity, IPD, PCV / PPV / Tdap / MMR, etc.), use the ROC calendar year format (e.g. 114/8/21), and label every data point with its update timestamp.',
      },
      {
        id: 'outbreak',
        title: { cn: '疫調／群聚報告', en: 'Outbreak Investigation' },
        description: {
          cn: '指標個案、接觸者、檢驗、防治作為的標準公衛疫調簡報',
          en: 'Index case, contacts, lab results, response actions',
        },
        cn: '疫調／群聚報告 — 用於疫情調查與群聚事件回報。請依下列章節組織內容：(1) 疫情緣起／背景；(2) 指標個案調查（基本資料、職業／旅遊史、潛在病史、接種史、發病日）；(3) 發病及就醫經過（依日期時序，逐日列出生命徵象、檢驗、用藥與處置）；(4) 接觸者匡列與追蹤（依同住家屬、職場、醫療院所、航空器等類別分層，附匡列人數、健康狀況、採檢結果、預防性投藥、監測截止日）；(5) 確定病例名冊（以表格列出通報日、年齡性別、身分別、接種史、發病日、發燒日、出疹日、檢驗結果含 PCR／Ct／IgM／IgG、研判日，必要時拆成多頁）；(6) 流行病學曲線、疫情規模與病例關係圖；(7) 檢驗結果一覽（採檢日期、檢體類型、送驗單位、結果、Ct 值、序列定型）；(8) 環境與地理關聯（場域照片、周邊撲殺紀錄、感控查核、員工免疫力調查）；(9) 疫情研判；(10) 防治作為（按醫院／衛生局／區管中心或地方／中央分層列點，每項註明日期與動作）；(11) 檢討與建議；(12) 致謝／簡報完畢。資訊密度可高，請多用表格、時間軸與條列；每張內容投影片仍應有清楚標題，並於頁底註明本頁參照來源。',
        en: 'Outbreak Investigation — for outbreak / cluster event reports. Structure the deck as: (1) Background and how the outbreak surfaced; (2) Index case investigation (demographics, occupational / travel history, comorbidities, vaccination history, onset date); (3) Onset and clinical course in chronological order (daily vitals, labs, medications, disposition); (4) Contact tracing and follow-up, grouped by household, workplace, healthcare facility, aircraft, etc. — include counts, health status, swab results, prophylaxis, and monitoring end date; (5) Confirmed-case roster as a table with report date, age / sex, role, vaccination history, onset / fever / rash dates, lab results (PCR / Ct / IgM / IgG), and adjudication date — split across slides if needed; (6) Epi curve, outbreak scale, and case-linkage diagram; (7) Laboratory results table (sample date, specimen type, lab, result, Ct, sequencing typing); (8) Environmental and geographic links (site photos, nearby culling records, infection-control audit, staff immunity survey); (9) Outbreak assessment; (10) Response actions, split by hospital / local health department / regional center or local / central, each item labeled with date and action; (11) Lessons learned and recommendations; (12) Acknowledgements / closing. Information density may be high; prefer tables, timelines, and bullets. Every content slide must still have a clear title and cite its source at the bottom.',
      },
      {
        id: 'teaching',
        title: { cn: '教學／分享', en: 'Teaching & Briefing' },
        description: {
          cn: '整合背景脈絡、核心概念、判斷標準、流程與案例演練',
          en: 'Context, concepts, criteria, workflows, examples, and takeaways',
        },
        cn: '教學／分享 — 適合研討會、課程、主題介紹或跨單位學習；依需求安排背景脈絡、核心概念、學習目標、判斷標準、作業流程、案例演練與重點提醒。',
        en: 'Teaching & Briefing — for seminars, courses, topic briefings, or cross-agency learning; structure by context, core concepts, learning goals, criteria, workflows, case exercises, and takeaways.',
      },
      {
        id: 'sketchnote',
        title: { cn: '文獻整理', en: 'Evidence Review' },
        description: {
          cn: '整理研究問題、方法、主要發現、限制與應用',
          en: 'Research questions, methods, findings, limits, and applications',
        },
        cn: '文獻整理 — 聚焦研究問題、方法、主要發現、限制與可應用處，適合 paper review、證據摘要與讀書筆記。',
        en: 'Evidence Review — focus on research questions, methods, findings, limitations, and applications for paper reviews or evidence summaries.',
      },
      {
        id: 'minimal',
        title: { cn: '重點摘要', en: 'Key Summary' },
        description: {
          cn: '少文字、高留白，突出摘要頁與關鍵結論',
          en: 'Sparse text and high whitespace for key conclusions',
        },
        cn: '重點摘要 — 高留白、少文字、大標題，適合摘要頁、開場頁與重點結論頁，讓單一重點更醒目。',
        en: 'Key Summary — high whitespace, sparse text, and large titles for summaries, openings, and key takeaway slides.',
      },
      {
        id: 'custom',
        title: { cn: '自訂用途', en: 'Custom Purpose' },
        description: {
          cn: '自行描述這份簡報要完成的任務',
          en: 'Describe what this deck needs to accomplish',
        },
        cn: '自訂用途 — 請依使用者輸入的簡報用途安排內容結構、資訊密度與呈現重點。',
        en: 'Custom Purpose — follow the user-provided deck purpose when choosing structure, density, and emphasis.',
      },
    ],
  },

  slide_audience: {
    label: { cn: '讀者背景', en: 'Audience Background' },
    options: [
      {
        id: 'peer',
        title: { cn: '專業同儕', en: 'Professional Peers' },
        description: {
          cn: '保留方法、數據、限制與推論邏輯',
          en: 'Retain methods, data, limitations, and reasoning',
        },
        cn: '專業同儕 — 面向具相關領域背景的讀者；可保留必要專有名詞、方法、數據、限制與不確定性，重點放在證據品質、推論邏輯、實務含義與可討論問題，避免過度簡化。',
        en: 'Professional Peers — for readers with relevant domain background; retain necessary terminology, methods, data, limitations, and uncertainty, emphasizing evidence quality, reasoning, practical implications, and discussion points without oversimplifying.',
      },
      {
        id: 'public',
        title: { cn: '一般大眾', en: 'General Public' },
        description: {
          cn: '白話、情境化、避免未解釋縮寫',
          en: 'Plain language, context, and no unexplained acronyms',
        },
        cn: '一般大眾 — 面向沒有專業背景的讀者；請使用白話、情境化說明與具體例子，避免未解釋的縮寫、艱深術語與過細方法學，重點放在這件事是什麼、為什麼重要、和讀者有什麼關係。',
        en: 'General Public — for readers without professional background; use plain language, contextual explanations, and concrete examples, avoiding unexplained acronyms, dense jargon, and excessive methodology, with emphasis on what this is, why it matters, and how it relates to readers.',
      },
      {
        id: 'student',
        title: { cn: '入門學習者', en: 'Beginning Learners' },
        description: {
          cn: '背景脈絡、術語解釋、循序漸進',
          en: 'Context, terminology explanations, and step-by-step logic',
        },
        cn: '入門學習者 — 面向學生、新進人員或跨領域讀者；請先交代背景脈絡，再循序解釋核心概念、重要術語、判斷邏輯與常見誤解，必要時加入簡短例子與每節重點整理。',
        en: 'Beginning Learners — for students, new staff, or cross-disciplinary readers; start with context, then explain core concepts, key terminology, reasoning, and common misunderstandings step by step, adding short examples and section takeaways when useful.',
      },
      {
        id: 'custom',
        title: { cn: '自訂讀者', en: 'Custom Audience' },
        description: {
          cn: '自行描述角色、背景、使用情境與需求',
          en: 'Describe the role, background, context, and needs',
        },
        cn: '自訂讀者 — 請依使用者輸入的讀者角色、專業背景、理解需求、使用情境與需要採取的行動，調整術語深度、解釋程度、資訊密度與呈現順序。',
        en: 'Custom Audience — adapt terminology depth, explanation level, information density, and sequencing based on the user-provided audience role, domain background, comprehension needs, usage context, and actions they need to take.',
      },
    ],
  },
}

export const STYLE_GUIDE = [
  {
    id: 'acip',
    title: { cn: 'ACIP 報告', en: 'ACIP Report' },
    body: {
      cn: '適合預防接種諮詢委員會（ACIP）報告案／討論案；標準章節含背景與過往決議、疾病流行病學、國內政策與接種情形、國際接種建議比較、疫苗介紹與比較、工作小組決議、提案內容、庫存與期程、提請決議事項。',
      en: 'For Taiwan ACIP report or discussion items; standard sections cover background and prior resolutions, disease epidemiology, current domestic policy and uptake, cross-country recommendations, vaccine introduction and comparison, working-group resolutions, proposal, stockpile and timeline, and resolution requested.',
    },
  },
  {
    id: 'outbreak',
    title: { cn: '疫調／群聚報告', en: 'Outbreak Investigation' },
    body: {
      cn: '適合疫情調查、群聚事件回報；標準章節包含疫情緣起、指標個案、發病就醫經過、接觸者匡列、確診病例名冊、流病曲線、檢驗結果、環境關聯、疫情研判、防治作為（分層）、檢討建議。',
      en: 'For outbreak investigations and cluster reports; standard sections cover background, index case, clinical course, contact tracing, case roster, epi curve, lab results, environmental links, outbreak assessment, response actions (by tier), and recommendations.',
    },
  },
  {
    id: 'teaching',
    title: { cn: '教學／分享', en: 'Teaching & Briefing' },
    body: {
      cn: '適合研討會、課程、主題介紹或跨單位學習；可用清楚敘事帶出背景與概念，也可加入學習目標、判斷標準、流程與案例演練。',
      en: 'For seminars, courses, topic briefings, or cross-agency learning; use narrative flow for context and concepts, or add goals, criteria, workflows, and case exercises when needed.',
    },
  },
  {
    id: 'sketchnote',
    title: { cn: '文獻整理', en: 'Evidence Review' },
    body: {
      cn: '適合 paper review 與文獻摘要；聚焦研究問題、方法、主要發現、限制與可應用處。',
      en: 'For paper reviews and evidence summaries; focuses on research questions, methods, findings, limitations, and applications.',
    },
  },
  {
    id: 'minimal',
    title: { cn: '重點摘要', en: 'Key Summary' },
    body: {
      cn: '適合封面、摘要、關鍵 takeaways；高留白、少文字，讓單一重點更醒目。',
      en: 'For covers, summaries, and key takeaways; uses whitespace and sparse text to foreground one main idea.',
    },
  },
]

export function optionLabel(bankKey, optionId, language) {
  const opt = BANKS[bankKey]?.options.find(o => o.id === optionId)
  if (!opt) return ''
  return opt[language] || opt.cn
}
