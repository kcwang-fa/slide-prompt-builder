import { useMemo } from 'react'
import { Sparkles } from 'lucide-react'

import { BANKS, optionLabel } from './data/banks.js'
import { NOTEBOOKLM_TEMPLATE } from './data/template.js'
import { EMPTY_BRIEF } from './data/exampleBrief.js'
import { render } from './lib/render.js'
import { buildVisualBriefBlock } from './lib/visualBrief.js'
import { useLocalStorage } from './hooks/useLocalStorage.js'
import { useSavedPrompts } from './hooks/useSavedPrompts.js'

import { LanguageToggle } from './components/LanguageToggle.jsx'
import { TopicInput } from './components/TopicInput.jsx'
import { VariableSelect } from './components/VariableSelect.jsx'
import { SectionCountSlider } from './components/SectionCountSlider.jsx'
import { CustomBriefInput } from './components/CustomBriefInput.jsx'
import { PromptOutput } from './components/PromptOutput.jsx'
import { SavedPromptsPanel } from './components/SavedPromptsPanel.jsx'

const DEFAULT_SELECTIONS = {
  slide_style: 'professional',
  slide_audience: 'exec',
}

export default function App() {
  const [language, setLanguage] = useLocalStorage('spb_language_v1', 'cn')
  const [selections, setSelections] = useLocalStorage('spb_selections_v1', DEFAULT_SELECTIONS)
  const [topic, setTopic] = useLocalStorage('spb_topic_v1', '')
  const [sectionCount, setSectionCount] = useLocalStorage('spb_section_count_v1', 5)
  const [visualBrief, setVisualBrief] = useLocalStorage('spb_visual_brief_v1', EMPTY_BRIEF)
  const { savedPrompts, savePrompt, deletePrompt, renamePrompt } = useSavedPrompts()

  const generated = useMemo(() => {
    const tpl = NOTEBOOKLM_TEMPLATE[language] || NOTEBOOKLM_TEMPLATE.cn
    return render(tpl, {
      topic: topic.trim() || (language === 'cn' ? '（請填寫主題）' : '(topic placeholder)'),
      slide_style: optionLabel('slide_style', selections.slide_style, language),
      slide_audience: optionLabel('slide_audience', selections.slide_audience, language),
      section_count: String(sectionCount),
      custom_brief_block: buildVisualBriefBlock(visualBrief, language),
    })
  }, [language, selections, topic, sectionCount, visualBrief])

  const updateSelection = (key, value) => {
    setSelections({ ...selections, [key]: value })
  }

  const handleSave = (name) => {
    savePrompt({ name, topic, selections, sectionCount, visualBrief })
  }

  const handleLoad = (item) => {
    if (item.topic !== undefined) setTopic(item.topic)
    if (item.selections) setSelections(item.selections)
    if (item.sectionCount) setSectionCount(item.sectionCount)
    // 結構化 brief 優先；找不到再 fallback 到舊版字串 customBrief（前一版本格式）
    if (item.visualBrief) {
      setVisualBrief({ ...EMPTY_BRIEF, ...item.visualBrief })
    } else if (typeof item.customBrief === 'string') {
      setVisualBrief({ ...EMPTY_BRIEF, notes: item.customBrief })
    } else {
      setVisualBrief(EMPTY_BRIEF)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <header className="sticky top-0 z-10 backdrop-blur-md bg-white/80 border-b border-zinc-200">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles size={20} className="text-orange-500" />
            <h1 className="text-base font-bold">
              {language === 'cn' ? 'NotebookLM 簡報 Prompt 產生器' : 'NotebookLM Slide Prompt Builder'}
            </h1>
          </div>
          <LanguageToggle language={language} setLanguage={setLanguage} />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <TopicInput value={topic} onChange={setTopic} language={language} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <VariableSelect
            bankKey="slide_style"
            value={selections.slide_style}
            onChange={(v) => updateSelection('slide_style', v)}
            language={language}
          />
          <VariableSelect
            bankKey="slide_audience"
            value={selections.slide_audience}
            onChange={(v) => updateSelection('slide_audience', v)}
            language={language}
          />
        </div>
        <SectionCountSlider
          value={sectionCount}
          onChange={setSectionCount}
          language={language}
        />

        <CustomBriefInput
          value={visualBrief}
          onChange={setVisualBrief}
          language={language}
          slideStyle={selections.slide_style}
        />

        <PromptOutput prompt={generated} language={language} />

        <SavedPromptsPanel
          saved={savedPrompts}
          onSave={handleSave}
          onLoad={handleLoad}
          onDelete={deletePrompt}
          onRename={renamePrompt}
          language={language}
        />

        <footer className="text-center text-xs text-zinc-400 pt-4 pb-8">
          {language === 'cn'
            ? '所有資料只儲存在你自己的瀏覽器 LocalStorage，沒有後端、不離開你的裝置'
            : 'Everything stays in your browser LocalStorage — no backend, no tracking.'}
        </footer>
      </main>
    </div>
  )
}
