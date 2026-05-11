import { useEffect, useMemo } from 'react'
import { CheckSquare, Construction, FileText, Image as ImageIcon, Palette, Presentation, SlidersHorizontal, Sparkles } from 'lucide-react'

import { BANKS, optionLabel } from './data/banks.js'
import { NOTEBOOKLM_TEMPLATE } from './data/template.js'
import { EMPTY_BRIEF } from './data/exampleBrief.js'
import { AUDIT_CHECKLIST_ITEMS, DEFAULT_AUDIT_CHECKLIST } from './data/auditChecklist.js'
import { render } from './lib/render.js'
import { buildVisualBriefBlock } from './lib/visualBrief.js'
import { buildAuditChecklistBlock } from './lib/auditChecklist.js'
import { useLocalStorage } from './hooks/useLocalStorage.js'
import { useSavedPrompts } from './hooks/useSavedPrompts.js'

import { LanguageToggle } from './components/LanguageToggle.jsx'
import { TopicInput } from './components/TopicInput.jsx'
import { VariableSelect } from './components/VariableSelect.jsx'
import { SectionCountSlider } from './components/SectionCountSlider.jsx'
import { CustomBriefInput } from './components/CustomBriefInput.jsx'
import { SlidePreview } from './components/SlidePreview.jsx'
import { AuditChecklist } from './components/AuditChecklist.jsx'
import { OutputTargetPanel } from './components/OutputTargetPanel.jsx'
import { SavedPromptsPanel } from './components/SavedPromptsPanel.jsx'

const DEFAULT_SELECTIONS = {
  slide_style: 'meeting',
  slide_audience: 'team',
  slide_style_custom: '',
  slide_audience_custom: '',
}

const AUDIT_CHECKLIST_DEFAULTS_MIGRATION_KEY = 'spb_audit_checklist_defaults_v2_migrated'

const LEGACY_STYLE_FALLBACK = {
  professional: 'meeting',
  academic: 'meeting',
  ted: 'teaching',
  darktech: 'meeting',
}

const WORKSPACE_TABS = [
  { id: 'basic', icon: SlidersHorizontal, label: { cn: '基本設定', en: 'Basics' } },
  { id: 'visual', icon: Palette, label: { cn: '視覺設定', en: 'Visuals' } },
  { id: 'audit', icon: CheckSquare, label: { cn: '審核清單', en: 'Review' } },
  { id: 'prompt', icon: FileText, label: { cn: 'Prompt', en: 'Prompt' } },
]

const OUTPUT_MODES = [
  {
    id: 'presentation',
    icon: Presentation,
    label: { cn: '簡報', en: 'Deck' },
    description: { cn: 'NotebookLM / Gemma', en: 'NotebookLM / Gemma' },
  },
  {
    id: 'image',
    icon: ImageIcon,
    label: { cn: '畫圖', en: 'Image' },
    description: { cn: 'Nano Banana / ChatGPT Image', en: 'Nano Banana / ChatGPT Image' },
  },
]

function isLegacyAllCheckedAuditChecklist(value) {
  return AUDIT_CHECKLIST_ITEMS.every((item) => value?.[item.id] === true)
}

function selectionText(bankKey, optionId, customText, language) {
  if (optionId === 'custom' && customText?.trim()) return customText.trim()
  return optionLabel(bankKey, optionId, language)
}

function ImageModePlaceholder({ language }) {
  return (
    <section className="rounded-xl border border-zinc-200 bg-white p-8 text-center shadow-sm">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
        <Construction size={22} />
      </div>
      <h2 className="mt-4 text-base font-black text-zinc-800">
        {language === 'cn' ? '畫圖 Prompt 建置中' : 'Image Prompt Under Construction'}
      </h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-zinc-500">
        {language === 'cn'
          ? 'Nano Banana 與 ChatGPT Image 的 prompt 設定尚未開放。完成後會提供專用的圖像類型、比例、文字量與視覺限制設定。'
          : 'Nano Banana and ChatGPT Image prompt settings are not available yet. Dedicated image type, aspect ratio, text, and visual constraint controls will be added later.'}
      </p>
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {['Nano Banana', 'ChatGPT Image'].map((tool) => (
          <span key={tool} className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-xs font-bold text-zinc-500">
            {tool} · {language === 'cn' ? '建置中' : 'WIP'}
          </span>
        ))}
      </div>
    </section>
  )
}

function OutputModeToggle({ outputMode, setOutputMode, language, compact = false }) {
  return (
    <div className={`rounded-xl border border-zinc-200 bg-white p-1 shadow-sm ${compact ? 'w-full' : 'w-full sm:w-auto'}`}>
      <div className="grid grid-cols-2 gap-1" role="tablist" aria-label={language === 'cn' ? '輸出模式' : 'Output mode'}>
        {OUTPUT_MODES.map((mode) => {
          const Icon = mode.icon
          const isActive = outputMode === mode.id

          return (
            <button
              key={mode.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setOutputMode(mode.id)}
              className={`inline-flex min-h-9 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-black transition ${
                isActive
                  ? 'bg-zinc-900 text-white shadow-sm'
                  : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-800'
              }`}
            >
              <Icon size={15} className="shrink-0" />
              <span>{mode.label[language] || mode.label.cn}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function App() {
  const [language, setLanguage] = useLocalStorage('spb_language_v1', 'cn')
  const [outputMode, setOutputMode] = useLocalStorage('spb_output_mode_v1', 'presentation')
  const [activeTab, setActiveTab] = useLocalStorage('spb_active_tab_v1', 'basic')
  const [selections, setSelections] = useLocalStorage('spb_selections_v1', DEFAULT_SELECTIONS)
  const [topic, setTopic] = useLocalStorage('spb_topic_v1', '')
  const [sectionCount, setSectionCount] = useLocalStorage('spb_section_count_v1', 5)
  const [visualBrief, setVisualBrief] = useLocalStorage('spb_visual_brief_v1', EMPTY_BRIEF)
  const [auditChecklist, setAuditChecklist] = useLocalStorage('spb_audit_checklist_v1', DEFAULT_AUDIT_CHECKLIST)
  const { savedPrompts, savePrompt, deletePrompt, renamePrompt } = useSavedPrompts()

  useEffect(() => {
    try {
      if (localStorage.getItem(AUDIT_CHECKLIST_DEFAULTS_MIGRATION_KEY) === 'true') return
      localStorage.setItem(AUDIT_CHECKLIST_DEFAULTS_MIGRATION_KEY, 'true')
    } catch {
      return
    }

    if (!isLegacyAllCheckedAuditChecklist(auditChecklist)) return
    setAuditChecklist(DEFAULT_AUDIT_CHECKLIST)
  }, [auditChecklist, setAuditChecklist])

  useEffect(() => {
    if (OUTPUT_MODES.some((mode) => mode.id === outputMode)) return
    setOutputMode('presentation')
  }, [outputMode, setOutputMode])

  useEffect(() => {
    if (WORKSPACE_TABS.some((tab) => tab.id === activeTab)) return
    setActiveTab('prompt')
  }, [activeTab, setActiveTab])

  useEffect(() => {
    const nextStyle = optionLabel('slide_style', selections.slide_style, language)
      ? selections.slide_style
      : LEGACY_STYLE_FALLBACK[selections.slide_style] || DEFAULT_SELECTIONS.slide_style
    const nextAudience = optionLabel('slide_audience', selections.slide_audience, language)
      ? selections.slide_audience
      : DEFAULT_SELECTIONS.slide_audience

    if (nextStyle === selections.slide_style && nextAudience === selections.slide_audience) return
    setSelections({ ...selections, slide_style: nextStyle, slide_audience: nextAudience })
  }, [language, selections.slide_style, selections.slide_audience])

  const generated = useMemo(() => {
    const slideStyle = optionLabel('slide_style', selections.slide_style, language)
      ? selections.slide_style
      : LEGACY_STYLE_FALLBACK[selections.slide_style] || DEFAULT_SELECTIONS.slide_style
    const slideAudience = optionLabel('slide_audience', selections.slide_audience, language)
      ? selections.slide_audience
      : DEFAULT_SELECTIONS.slide_audience
    const slideStyleText = selectionText('slide_style', slideStyle, selections.slide_style_custom, language)
    const slideAudienceText = selectionText('slide_audience', slideAudience, selections.slide_audience_custom, language)
    const tpl = NOTEBOOKLM_TEMPLATE[language] || NOTEBOOKLM_TEMPLATE.cn
    return render(tpl, {
      topic: topic.trim() || (language === 'cn' ? '（請填寫主題）' : '(topic placeholder)'),
      slide_style: slideStyleText,
      slide_audience: slideAudienceText,
      section_count: String(sectionCount),
      custom_brief_block: buildVisualBriefBlock(visualBrief, language),
      audit_checklist_block: buildAuditChecklistBlock(auditChecklist, language),
    })
  }, [language, selections, topic, sectionCount, visualBrief, auditChecklist])

  const updateSelection = (key, value) => {
    setSelections({ ...selections, [key]: value })
  }

  const handleSave = (name) => {
    savePrompt({ name, topic, selections, sectionCount, visualBrief, auditChecklist, outputMode })
  }

  const handleLoad = (item) => {
    if (item.topic !== undefined) setTopic(item.topic)
    if (item.selections) {
      const nextStyle = optionLabel('slide_style', item.selections.slide_style, language)
        ? item.selections.slide_style
        : LEGACY_STYLE_FALLBACK[item.selections.slide_style] || DEFAULT_SELECTIONS.slide_style
      setSelections({
        ...item.selections,
        slide_style: nextStyle,
        slide_audience: optionLabel('slide_audience', item.selections.slide_audience, language)
          ? item.selections.slide_audience
          : DEFAULT_SELECTIONS.slide_audience,
      })
    }
    if (item.sectionCount) setSectionCount(item.sectionCount)
    // 結構化 brief 優先；找不到再 fallback 到舊版字串 customBrief（前一版本格式）
    if (item.visualBrief) {
      setVisualBrief({ ...EMPTY_BRIEF, ...item.visualBrief })
    } else if (typeof item.customBrief === 'string') {
      setVisualBrief({ ...EMPTY_BRIEF, notes: item.customBrief })
    } else {
      setVisualBrief(EMPTY_BRIEF)
    }
    setAuditChecklist(item.auditChecklist ? { ...DEFAULT_AUDIT_CHECKLIST, ...item.auditChecklist } : DEFAULT_AUDIT_CHECKLIST)
    if (OUTPUT_MODES.some((mode) => mode.id === item.outputMode)) setOutputMode(item.outputMode)
    setActiveTab('basic')
  }

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <header className="sticky top-0 z-10 backdrop-blur-md bg-white/80 border-b border-zinc-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-2">
            <Sparkles size={20} className="text-orange-500" />
            <h1 className="truncate text-base font-bold">
              {language === 'cn' ? '專業報告 Prompt 工作台' : 'Professional Report Prompt Workspace'}
            </h1>
          </div>
          <div className="flex w-full items-center gap-2 sm:w-auto">
            <OutputModeToggle outputMode={outputMode} setOutputMode={setOutputMode} language={language} compact />
            <LanguageToggle language={language} setLanguage={setLanguage} />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {outputMode === 'image' ? (
          <ImageModePlaceholder language={language} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_420px] gap-6 lg:items-start">
            <div className="space-y-6">
            <div className="rounded-xl border border-zinc-200 bg-white p-1 shadow-sm">
              <div className="grid grid-cols-2 gap-1 sm:grid-cols-4" role="tablist" aria-label={language === 'cn' ? '工作區分頁' : 'Workspace tabs'}>
                {WORKSPACE_TABS.map((tab) => {
                  const Icon = tab.icon
                  const isActive = activeTab === tab.id

                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveTab(tab.id)}
                      className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-lg px-2 py-2 text-sm font-bold transition ${
                        isActive
                          ? 'bg-orange-500 text-white shadow-sm'
                          : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-800'
                      }`}
                    >
                      <Icon size={15} />
                      <span className="truncate">{tab.label[language] || tab.label.cn}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {activeTab === 'basic' && (
              <div className="space-y-6" role="tabpanel">
                <TopicInput value={topic} onChange={setTopic} language={language} />

                <div className="space-y-5">
                  <VariableSelect
                    bankKey="slide_style"
                    value={selections.slide_style}
                    onChange={(v) => updateSelection('slide_style', v)}
                    customValue={selections.slide_style_custom || ''}
                    onCustomChange={(v) => updateSelection('slide_style_custom', v)}
                    language={language}
                  />
                  <VariableSelect
                    bankKey="slide_audience"
                    value={selections.slide_audience}
                    onChange={(v) => updateSelection('slide_audience', v)}
                    customValue={selections.slide_audience_custom || ''}
                    onCustomChange={(v) => updateSelection('slide_audience_custom', v)}
                    language={language}
                  />
                </div>
                <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs leading-relaxed text-amber-900">
                  {language === 'cn'
                    ? '簡報用途決定內容結構、資訊密度與任務重點；讀者背景決定術語深度、解釋程度與決策情境。若兩者看似衝突，請以讀者背景的理解需求優先。'
                    : 'Deck purpose controls structure, density, and task emphasis; audience background controls terminology depth, explanation level, and decision context. If they conflict, prioritize the audience’s comprehension needs.'}
                </div>
                <SectionCountSlider
                  value={sectionCount}
                  onChange={setSectionCount}
                  language={language}
                />
              </div>
            )}

            {activeTab === 'visual' && (
              <div role="tabpanel">
                <CustomBriefInput
                  value={visualBrief}
                  onChange={setVisualBrief}
                  language={language}
                  slideStyle={selections.slide_style}
                  forceOpen
                />
              </div>
            )}

            {activeTab === 'audit' && (
              <div role="tabpanel">
                <AuditChecklist
                  value={auditChecklist}
                  onChange={setAuditChecklist}
                  language={language}
                />
              </div>
            )}

            {activeTab === 'prompt' && (
              <div role="tabpanel">
                <OutputTargetPanel notebookPrompt={generated} outputType={outputMode} language={language} />
              </div>
            )}

            <div className="lg:hidden space-y-6 pt-2">
              {outputMode === 'presentation' && (
                <SlidePreview
                  brief={visualBrief}
                  topic={topic}
                  sectionCount={sectionCount}
                  language={language}
                />
              )}
              <SavedPromptsPanel
                saved={savedPrompts}
                onSave={handleSave}
                onLoad={handleLoad}
                onDelete={deletePrompt}
                onRename={renamePrompt}
                language={language}
              />
            </div>
          </div>

          <aside className="hidden lg:block lg:sticky lg:top-20 space-y-6">
            {outputMode === 'presentation' && (
              <SlidePreview
                brief={visualBrief}
                topic={topic}
                sectionCount={sectionCount}
                language={language}
                compact
              />
            )}
            <SavedPromptsPanel
              saved={savedPrompts}
              onSave={handleSave}
              onLoad={handleLoad}
              onDelete={deletePrompt}
              onRename={renamePrompt}
              language={language}
            />
          </aside>
          </div>
        )}

        <footer className="text-center text-xs text-zinc-400 pt-8 pb-8">
          {language === 'cn'
            ? '所有資料只儲存在你自己的瀏覽器 LocalStorage，沒有後端、不離開你的裝置'
            : 'Everything stays in your browser LocalStorage — no backend, no tracking.'}
        </footer>
      </main>
    </div>
  )
}
