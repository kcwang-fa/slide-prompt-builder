// 詞庫：簡報用途與讀者背景。每個選項帶中英描述，會原封不動代入 prompt。

export const BANKS = {
  slide_style: {
    label: { cn: '簡報用途', en: 'Deck Purpose' },
    options: [
      {
        id: 'meeting',
        title: { cn: '決策會議', en: 'Decision Meeting' },
        description: {
          cn: '整理現況、風險、限制與需要拍板的事項',
          en: 'Status, risks, limits, and decisions to make',
        },
        cn: '決策會議 — 整理現況、風險、限制與待決策事項；資訊完整、層級清楚，方便主管或跨組同仁討論下一步。',
        en: 'Decision Meeting — organize status, risks, limits, and decisions; complete and structured for leadership or cross-team discussion.',
      },
      {
        id: 'training',
        title: { cn: '教育訓練', en: 'Training' },
        description: {
          cn: '安排學習目標、判斷標準、流程與案例演練',
          en: 'Learning goals, criteria, workflows, and exercises',
        },
        cn: '教育訓練 — 適合衛生局所、第一線同仁或跨單位訓練；依學習目標安排背景知識、判斷標準、作業流程、案例演練與重點提醒。',
        en: 'Training — for local health departments, frontline staff, or cross-agency training; structure by learning goals, background, criteria, workflows, case exercises, and reminders.',
      },
      {
        id: 'teaching',
        title: { cn: '專題分享', en: 'Topic Briefing' },
        description: {
          cn: '用清楚敘事帶出背景、概念、案例與 takeaways',
          en: 'Narrative flow with context, concepts, examples, and takeaways',
        },
        cn: '專題分享 — 背景、核心概念、案例與 takeaways，資訊密度中等、敘事清楚，適合研討會、課程或專題簡報。',
        en: 'Topic Briefing — background, core concepts, examples, and takeaways with medium density and clear narrative flow.',
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
        id: 'health_department',
        title: { cn: '衛生局所同仁', en: 'Local Health Staff' },
        description: {
          cn: '需掌握臨床辨識、通報、公衛處置與協作',
          en: 'Clinical recognition, reporting, public-health action, and coordination',
        },
        cn: '衛生局所同仁 — 具公衛實務背景，需掌握臨床辨識重點、通報定義、公衛處置、風險溝通與跨單位協作。',
        en: 'Local Health Staff — public-health practitioners who need clinical recognition points, reporting definitions, public-health response, risk communication, and cross-agency coordination.',
      },
      {
        id: 'team',
        title: { cn: '決策者／主管', en: 'Decision Makers' },
        description: {
          cn: '要結論、風險、選項、資源需求與下一步',
          en: 'Conclusions, risks, options, resource needs, and next steps',
        },
        cn: '決策者／主管 — 給主管、跨組決策者或業務承辦；聚焦結論、風險、選項、資源需求與下一步。',
        en: 'Decision Makers — for supervisors, cross-team decision makers, or program owners; focus on conclusions, risks, options, resource needs, and next steps.',
      },
      {
        id: 'peer',
        title: { cn: '專家', en: 'Experts' },
        description: {
          cn: '可保留方法、限制、專有名詞與技術細節',
          en: 'Methods, limitations, terminology, and technical detail are acceptable',
        },
        cn: '專家 — 給學術、流病、統計、實驗室、臨床或公衛專家；可保留方法、限制、專有名詞與技術細節。',
        en: 'Experts — for academic, epidemiology, statistics, laboratory, clinical, or public-health experts; retain methods, limitations, terminology, and technical detail.',
      },
      {
        id: 'student',
        title: { cn: '入門者／學生', en: 'Beginners / Students' },
        description: {
          cn: '需要背景鋪陳、術語解釋與循序漸進',
          en: 'Needs context, terminology explanations, and progressive disclosure',
        },
        cn: '入門者／學生 — 從背景開始，循序漸進解釋核心概念、術語與判斷邏輯。',
        en: 'Beginners / Students — start with background and explain core concepts, terminology, and reasoning step by step.',
      },
      {
        id: 'public',
        title: { cn: '一般大眾', en: 'General Public' },
        description: {
          cn: '用白話、情境化說明，避免縮寫與艱深術語',
          en: 'Plain-language, contextual explanations; avoid acronyms and jargon',
        },
        cn: '一般大眾 — 用白話與情境化說明代替術語，避免縮寫與未解釋的專有名詞。',
        en: 'General Public — use plain-language and contextual explanations instead of jargon; avoid acronyms and unexplained technical terms.',
      },
      {
        id: 'self',
        title: { cn: '自己／個人筆記', en: 'Self / Notes' },
        description: {
          cn: '保留問題、想法、待查事項與整理脈絡',
          en: 'Keep questions, ideas, follow-ups, and thinking context',
        },
        cn: '自己／個人筆記 — 為日後複習與整理思路，保留問題、想法、待查事項與整理脈絡。',
        en: 'Self / Personal Notes — for later review and thinking; keep questions, ideas, follow-ups, and context.',
      },
      {
        id: 'custom',
        title: { cn: '自訂讀者', en: 'Custom Audience' },
        description: {
          cn: '自行描述讀者角色、背景與需要理解的程度',
          en: 'Describe the audience role, background, and needed depth',
        },
        cn: '自訂讀者 — 請依使用者輸入的讀者角色、專業背景、理解需求與決策情境調整內容。',
        en: 'Custom Audience — adapt to the user-provided audience role, domain background, comprehension needs, and decision context.',
      },
    ],
  },
}

export const STYLE_GUIDE = [
  {
    id: 'meeting',
    title: { cn: '決策會議', en: 'Decision Meeting' },
    body: {
      cn: '適合週報、監測更新與跨組會議；資訊完整、層級清楚，方便討論風險、限制與待決策事項。',
      en: 'For weekly reports, surveillance updates, and cross-team meetings; complete, structured, and ready for risk, limitation, and decision discussions.',
    },
  },
  {
    id: 'training',
    title: { cn: '教育訓練', en: 'Training' },
    body: {
      cn: '適合衛生局所、第一線同仁或跨單位訓練；依學習目標安排背景知識、判斷標準、作業流程、案例演練與重點提醒。',
      en: 'For local health departments, frontline staff, or cross-agency training; organized around learning goals, criteria, workflows, case exercises, and reminders.',
    },
  },
  {
    id: 'teaching',
    title: { cn: '專題分享', en: 'Topic Briefing' },
    body: {
      cn: '適合研討會、課程或專題分享；用清楚敘事帶出背景、概念、案例與重點結論。',
      en: 'For seminars, courses, or topic briefings; uses narrative flow for background, concepts, examples, and takeaways.',
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
