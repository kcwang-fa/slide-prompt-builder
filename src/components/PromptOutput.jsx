import { useEffect, useState } from 'react'
import { Check, Copy, RotateCcw } from 'lucide-react'

const copiedPromptOutputs = new Map()

export function PromptOutput({ prompt, language, compact = false, title, helperText, copyLabel, copyStateKey, editable = false }) {
  const [draft, setDraft] = useState(prompt)
  const [isDirty, setIsDirty] = useState(false)
  const copyButtonLabel = copyLabel || (language === 'cn' ? '複製' : 'Copy')
  const copiedKey = copyStateKey || copyButtonLabel
  const [copiedOutput, setCopiedOutput] = useState(() => copiedPromptOutputs.get(copiedKey) || '')
  const output = editable ? draft : prompt
  const copied = copiedOutput === output

  useEffect(() => {
    if (isDirty) return
    setDraft(prompt)
  }, [prompt, isDirty])

  useEffect(() => {
    setCopiedOutput(copiedPromptOutputs.get(copiedKey) || '')
  }, [copiedKey])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output)
      copiedPromptOutputs.set(copiedKey, output)
      setCopiedOutput(output)
    } catch (e) {
      console.error('copy failed', e)
    }
  }

  const handleChange = (nextValue) => {
    setDraft(nextValue)
    setIsDirty(nextValue !== prompt)
  }

  const handleReset = () => {
    setDraft(prompt)
    setIsDirty(false)
  }

  return (
    <div className="rounded-xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
      <div className="flex flex-col gap-2 px-4 py-2 border-b border-zinc-200 bg-zinc-50 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <span className="block truncate text-sm font-semibold text-zinc-700">
            {title || (language === 'cn' ? '生成的 Prompt' : 'Generated Prompt')}
          </span>
          {helperText && (
            <span className="mt-0.5 block text-[11px] font-medium leading-snug text-zinc-500">
              {helperText}
            </span>
          )}
          {editable && isDirty && (
            <span className="block text-[11px] font-semibold text-orange-600">
              {language === 'cn' ? '已手動修改' : 'Edited manually'}
            </span>
          )}
        </div>
        <div className="flex w-full flex-wrap items-center justify-end gap-1 sm:w-auto sm:shrink-0">
          {editable && isDirty && (
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-bold text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-800"
            >
              <RotateCcw size={13} />
              {language === 'cn' ? '還原' : 'Reset'}
            </button>
          )}
          <button
            type="button"
            onClick={handleCopy}
            title={copyButtonLabel}
            aria-label={copyButtonLabel}
            className={`inline-flex h-8 w-8 items-center justify-center rounded-md transition ${
              copied ? 'bg-green-500 text-white' : 'bg-orange-500 text-white hover:bg-orange-600'
            }`}
          >
            {copied ? <Check size={15} /> : <Copy size={15} />}
          </button>
        </div>
      </div>
      {editable ? (
        <textarea
          value={draft}
          onChange={(e) => handleChange(e.target.value)}
          spellCheck={false}
          className={`block w-full resize-y border-0 bg-white whitespace-pre-wrap font-mono text-zinc-800 leading-relaxed focus:outline-none focus:ring-0 ${
            compact ? 'h-[320px] p-3 text-xs' : 'min-h-[420px] p-4 text-sm'
          }`}
        />
      ) : (
        <pre
          className={`whitespace-pre-wrap font-mono text-zinc-800 leading-relaxed overflow-y-auto ${
            compact ? 'max-h-[320px] p-3 text-xs' : 'max-h-[480px] p-4 text-sm'
          }`}
        >
          {prompt}
        </pre>
      )}
    </div>
  )
}
