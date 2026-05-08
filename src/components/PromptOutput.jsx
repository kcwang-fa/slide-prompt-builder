import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

export function PromptOutput({ prompt, language }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch (e) {
      console.error('copy failed', e)
    }
  }

  return (
    <div className="rounded-xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-200 bg-zinc-50">
        <span className="text-sm font-semibold text-zinc-700">
          {language === 'cn' ? '生成的 Prompt' : 'Generated Prompt'}
        </span>
        <button
          onClick={handleCopy}
          className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-md transition ${
            copied ? 'bg-green-500 text-white' : 'bg-orange-500 text-white hover:bg-orange-600'
          }`}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? (language === 'cn' ? '已複製' : 'Copied') : language === 'cn' ? '複製' : 'Copy'}
        </button>
      </div>
      <pre className="p-4 text-sm whitespace-pre-wrap font-mono text-zinc-800 leading-relaxed max-h-[480px] overflow-y-auto">
        {prompt}
      </pre>
    </div>
  )
}
