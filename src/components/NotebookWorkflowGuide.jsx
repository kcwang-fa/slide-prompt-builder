import { FileCheck, MessageSquare, PenLine, Presentation, StickyNote, Upload } from 'lucide-react'

const WORKFLOW_STEPS = [
  {
    id: 'upload',
    icon: Upload,
    title: { cn: '上傳資料', en: 'Upload sources' },
    detail: {
      cn: '先把文件、網頁或資料檔加入 NotebookLM。',
      en: 'Add documents, pages, or data files to NotebookLM.',
    },
  },
  {
    id: 'summarize',
    icon: MessageSquare,
    title: { cn: '取得摘要', en: 'Get a summary' },
    detail: {
      cn: '自行摘要，或貼上第一段對話摘要 Prompt。',
      en: 'Summarize yourself, or paste the first chat summary prompt.',
    },
  },
  {
    id: 'save-note',
    icon: StickyNote,
    title: { cn: '儲存成記事', en: 'Save as a note' },
    detail: {
      cn: '把 NotebookLM 的摘要回答儲存成記事。',
      en: "Save NotebookLM's summary response as a note.",
    },
  },
  {
    id: 'source',
    icon: FileCheck,
    title: { cn: '轉成來源並勾選', en: 'Convert and select' },
    detail: {
      cn: '將記事轉成來源，並勾選這個來源。',
      en: 'Turn the note into a source, then select that source.',
    },
  },
  {
    id: 'studio',
    icon: Presentation,
    title: { cn: '開自訂簡報', en: 'Open custom deck' },
    detail: {
      cn: '到工作室頁籤，開啟「自訂簡報」。',
      en: 'Go to Studio, then open Custom presentation.',
    },
  },
  {
    id: 'style',
    icon: PenLine,
    title: { cn: '貼上風格說明', en: 'Paste style brief' },
    detail: {
      cn: '把第二段貼到「說明要建立的簡報」。',
      en: 'Paste the second prompt into "Describe the presentation you want to create."',
    },
  },
]

export function NotebookWorkflowGuide({ language }) {
  return (
    <section className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-sm font-black text-zinc-800">
            {language === 'cn' ? 'NotebookLM 使用流程' : 'NotebookLM Workflow'}
          </h2>
          <p className="mt-1 text-xs leading-relaxed text-zinc-500">
            {language === 'cn'
              ? '先在 NotebookLM 建立可用來源，再用本工具產生的兩段 prompt 完成摘要與自訂簡報。'
              : 'Prepare usable sources in NotebookLM, then use the two generated prompts for the summary and custom deck.'}
          </p>
        </div>
      </div>

      <ol
        className="mt-4 grid grid-cols-1 gap-2 md:grid-cols-2"
        aria-label={language === 'cn' ? 'NotebookLM 使用步驟' : 'NotebookLM workflow steps'}
      >
        {WORKFLOW_STEPS.map((step, index) => {
          const Icon = step.icon

          return (
            <li key={step.id} className="flex min-h-[76px] gap-3 rounded-lg border border-zinc-100 bg-zinc-50 px-3 py-2.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-orange-500 shadow-sm">
                <Icon size={17} />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] font-bold text-zinc-400">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-sm font-bold leading-tight text-zinc-800">
                    {step.title[language] || step.title.cn}
                  </span>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                  {step.detail[language] || step.detail.cn}
                </p>
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
