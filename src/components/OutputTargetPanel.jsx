import { useMemo, useState } from 'react'
import { Bot, Construction } from 'lucide-react'
import { PromptOutput } from './PromptOutput.jsx'

const OUTPUT_TOOLS = {
  presentation: [
    { id: 'notebooklm', label: { cn: 'NotebookLM', en: 'NotebookLM' }, status: 'ready' },
    { id: 'gemma', label: { cn: 'Gemma', en: 'Gemma' }, status: 'building' },
  ],
  image: [
    { id: 'nano_banana', label: { cn: 'Nano Banana', en: 'Nano Banana' }, status: 'building' },
    { id: 'chatgpt_image', label: { cn: 'ChatGPT Image', en: 'ChatGPT Image' }, status: 'building' },
  ],
}

function ConstructionPanel({ language, toolLabel, compact }) {
  return (
    <section className={`rounded-xl border border-zinc-200 bg-white shadow-sm ${compact ? 'p-3' : 'p-4'}`}>
      <div className="flex items-center gap-2">
        <Construction size={18} className="text-orange-500" />
        <h2 className="text-sm font-semibold text-zinc-700">
          {toolLabel}
        </h2>
      </div>
      <div className="mt-3 rounded-lg border border-dashed border-zinc-300 bg-zinc-50 px-4 py-6 text-center">
        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-white text-zinc-500 shadow-sm">
          <Bot size={18} />
        </div>
        <div className="mt-3 text-sm font-bold text-zinc-700">
          {language === 'cn' ? '建置中' : 'Under construction'}
        </div>
        <p className="mt-1 text-xs leading-relaxed text-zinc-500">
          {language === 'cn'
            ? '這個輸出目標已先保留位置，之後會接上專用 prompt 模板。'
            : 'This output target is reserved and will be connected to its dedicated prompt template later.'}
        </p>
      </div>
    </section>
  )
}

export function OutputTargetPanel({ notebookPrompt, outputType, language, compact = false }) {
  const [toolByType, setToolByType] = useState({
    presentation: 'notebooklm',
    image: 'nano_banana',
  })

  const tools = OUTPUT_TOOLS[outputType] || OUTPUT_TOOLS.presentation
  const activeToolId = toolByType[outputType] || tools[0].id
  const activeTool = useMemo(
    () => tools.find((tool) => tool.id === activeToolId) || tools[0],
    [activeToolId, tools]
  )

  const setActiveTool = (toolId) => {
    setToolByType((prev) => ({ ...prev, [outputType]: toolId }))
  }

  return (
    <section className="space-y-3">
      <div className="flex gap-2 overflow-x-auto pb-1">
        {tools.map((tool) => {
          const isActive = activeTool.id === tool.id

          return (
            <button
              key={tool.id}
              type="button"
              onClick={() => setActiveTool(tool.id)}
              className={`shrink-0 rounded-lg border px-3 py-2 text-xs font-bold transition ${
                isActive
                  ? 'border-orange-500 bg-orange-50 text-orange-700'
                  : 'border-zinc-200 bg-white text-zinc-500 hover:border-orange-300 hover:bg-orange-50'
              }`}
            >
              {tool.label[language] || tool.label.cn}
              {tool.status === 'building' && (
                <span className="ml-1 font-semibold text-zinc-400">
                  {language === 'cn' ? '建置中' : 'WIP'}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {activeTool.status === 'ready' ? (
        <PromptOutput
          prompt={notebookPrompt}
          language={language}
          compact={compact}
          title={language === 'cn' ? 'NotebookLM Prompt' : 'NotebookLM Prompt'}
          editable
        />
      ) : (
        <ConstructionPanel
          language={language}
          toolLabel={activeTool.label[language] || activeTool.label.cn}
          compact={compact}
        />
      )}
    </section>
  )
}
