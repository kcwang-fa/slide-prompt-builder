import { useEffect, useMemo } from 'react'
import { CheckSquare, FileText, Image as ImageIcon, Palette, Presentation, SlidersHorizontal, Sparkles } from 'lucide-react'

import { BANKS, optionLabel } from './data/banks.js'
import { IMAGE_TEMPLATES } from './data/imageTemplates.js'
import {
  NOTEBOOKLM_PRESENTATION_STYLE_TEMPLATE,
  NOTEBOOKLM_SIMPLE_PRESENTATION_STYLE_TEMPLATE,
  NOTEBOOKLM_SUMMARY_TEMPLATE,
} from './data/template.js'
import { EMPTY_BRIEF } from './data/exampleBrief.js'
import { AUDIT_CHECKLIST_ITEMS, DEFAULT_AUDIT_CHECKLIST } from './data/auditChecklist.js'
import { render } from './lib/render.js'
import {
  DEFAULT_SIMPLE_VISUAL_BRIEF,
  buildSimpleVisualBriefBlock,
  buildVisualBriefBlock,
  hasAdvancedVisualBrief,
  normalizeSimpleVisualBrief,
  simpleVisualBriefToPreviewBrief,
} from './lib/visualBrief.js'
import { buildAuditChecklistBlock } from './lib/auditChecklist.js'
import { renderImagePrompt } from './lib/imagePrompt.js'
import { useLocalStorage } from './hooks/useLocalStorage.js'
import { useSavedPrompts } from './hooks/useSavedPrompts.js'

import { LanguageToggle } from './components/LanguageToggle.jsx'
import { TopicInput } from './components/TopicInput.jsx'
import { VariableSelect } from './components/VariableSelect.jsx'
import { SectionCountSlider } from './components/SectionCountSlider.jsx'
import { SimpleBriefInput } from './components/SimpleBriefInput.jsx'
import { CustomBriefInput } from './components/CustomBriefInput.jsx'
import { SlidePreview } from './components/SlidePreview.jsx'
import { AuditChecklist } from './components/AuditChecklist.jsx'
import { OutputTargetPanel } from './components/OutputTargetPanel.jsx'
import { SavedPromptsPanel } from './components/SavedPromptsPanel.jsx'
import { ImagePromptWorkspace } from './components/ImagePromptWorkspace.jsx'

const DEFAULT_SELECTIONS = {
  slide_style: 'teaching',
  slide_audience: 'peer',
  slide_style_custom: '',
  slide_audience_custom: '',
}

const AUDIT_CHECKLIST_DEFAULTS_MIGRATION_KEY = 'spb_audit_checklist_defaults_v2_migrated'
const VISUAL_MODE_MIGRATION_KEY = 'spb_visual_mode_v1_migrated'
const SECTION_COUNT_MIN = 1
const SECTION_COUNT_MAX = 6
const SECTION_COUNT_DEFAULT = 3

const LEGACY_STYLE_FALLBACK = {
  meeting: 'teaching',
  professional: 'teaching',
  academic: 'teaching',
  training: 'teaching',
  ted: 'teaching',
  darktech: 'teaching',
}

const LEGACY_AUDIENCE_FALLBACK = {
  health_department: 'peer',
  team: 'peer',
  self: 'peer',
}

const AUDIENCE_REQUIRED_STYLE_IDS = new Set(['teaching', 'sketchnote', 'minimal'])

const WORKSPACE_TABS = [
  { id: 'basic', icon: SlidersHorizontal, label: { cn: '基本設定', en: 'Basics' } },
  { id: 'visual', icon: Palette, label: { cn: '視覺設定', en: 'Visuals' } },
  { id: 'audit', icon: CheckSquare, label: { cn: '審核清單', en: 'Review' } },
  { id: 'prompt', icon: FileText, label: { cn: 'Prompt', en: 'Prompt' } },
]

const VISUAL_MODES = [
  {
    id: 'simple',
    label: { cn: '簡化版', en: 'Simple' },
    description: { cn: '配色＋字型', en: 'Color + type' },
  },
  {
    id: 'advanced',
    label: { cn: '進階版', en: 'Advanced' },
    description: { cn: '細部指示', en: 'Detailed brief' },
  },
]

const OUTPUT_MODES = [
  {
    id: 'presentation',
    icon: Presentation,
    label: { cn: '簡報', en: 'Deck' },
    description: { cn: 'NotebookLM', en: 'NotebookLM' },
  },
  {
    id: 'image',
    icon: ImageIcon,
    label: { cn: '畫圖', en: 'Image' },
    description: { cn: 'Nano Banana', en: 'Nano Banana' },
  },
]

function isLegacyAllCheckedAuditChecklist(value) {
  return AUDIT_CHECKLIST_ITEMS.every((item) => value?.[item.id] === true)
}

function clampSectionCount(value) {
  const numericValue = Number(value)
  if (!Number.isFinite(numericValue)) return SECTION_COUNT_DEFAULT
  return Math.min(SECTION_COUNT_MAX, Math.max(SECTION_COUNT_MIN, Math.round(numericValue)))
}

function selectionText(bankKey, optionId, customText, language) {
  if (optionId === 'custom' && customText?.trim()) return customText.trim()
  return optionLabel(bankKey, optionId, language)
}

function normalizeSlideStyle(styleId, language) {
  return optionLabel('slide_style', styleId, language)
    ? styleId
    : LEGACY_STYLE_FALLBACK[styleId] || DEFAULT_SELECTIONS.slide_style
}

function normalizeSlideAudience(audienceId, language) {
  return optionLabel('slide_audience', audienceId, language)
    ? audienceId
    : LEGACY_AUDIENCE_FALLBACK[audienceId] || DEFAULT_SELECTIONS.slide_audience
}

function buildAudienceBackgroundBlock(audienceText, language) {
  if (!audienceText) return ''
  return language === 'cn'
    ? `- 讀者背景：${audienceText}`
    : `- Audience background: ${audienceText}`
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

function VisualModeToggle({ visualMode, setVisualMode, language }) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-1 shadow-sm">
      <div className="grid grid-cols-2 gap-1" role="tablist" aria-label={language === 'cn' ? '視覺設定模式' : 'Visual mode'}>
        {VISUAL_MODES.map((mode) => {
          const isActive = visualMode === mode.id

          return (
            <button
              key={mode.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setVisualMode(mode.id)}
              className={`min-h-10 rounded-lg px-3 py-2 text-sm font-black transition ${
                isActive
                  ? 'bg-zinc-900 text-white shadow-sm'
                  : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-800'
              }`}
            >
              <span className="block">{mode.label[language] || mode.label.cn}</span>
              <span className={`mt-0.5 block text-[10px] font-semibold ${isActive ? 'text-zinc-200' : 'text-zinc-400'}`}>
                {mode.description[language] || mode.description.cn}
              </span>
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
  const [sectionCount, setSectionCount] = useLocalStorage('spb_section_count_v1', SECTION_COUNT_DEFAULT)
  const [visualMode, setVisualMode] = useLocalStorage('spb_visual_mode_v1', 'simple')
  const [simpleVisualBrief, setSimpleVisualBrief] = useLocalStorage('spb_simple_visual_brief_v1', DEFAULT_SIMPLE_VISUAL_BRIEF)
  const [visualBrief, setVisualBrief] = useLocalStorage('spb_visual_brief_v1', EMPTY_BRIEF)
  const [auditChecklist, setAuditChecklist] = useLocalStorage('spb_audit_checklist_v1', DEFAULT_AUDIT_CHECKLIST)
  const [imageTemplateId, setImageTemplateId] = useLocalStorage('spb_image_template_id_v1', IMAGE_TEMPLATES[0]?.id || '')
  const [imageSelections, setImageSelections] = useLocalStorage('spb_image_selections_v1', {})
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
    if (IMAGE_TEMPLATES.some((template) => template.id === imageTemplateId)) return
    setImageTemplateId(IMAGE_TEMPLATES[0]?.id || '')
  }, [imageTemplateId, setImageTemplateId])

  useEffect(() => {
    if (VISUAL_MODES.some((mode) => mode.id === visualMode)) return
    setVisualMode('simple')
  }, [visualMode, setVisualMode])

  useEffect(() => {
    try {
      if (localStorage.getItem(VISUAL_MODE_MIGRATION_KEY) === 'true') return
      localStorage.setItem(VISUAL_MODE_MIGRATION_KEY, 'true')
    } catch {
      return
    }

    if (hasAdvancedVisualBrief(visualBrief)) setVisualMode('advanced')
  }, [visualBrief, setVisualMode])

  useEffect(() => {
    if (WORKSPACE_TABS.some((tab) => tab.id === activeTab)) return
    setActiveTab('prompt')
  }, [activeTab, setActiveTab])

  useEffect(() => {
    const nextSectionCount = clampSectionCount(sectionCount)
    if (nextSectionCount === sectionCount) return
    setSectionCount(nextSectionCount)
  }, [sectionCount, setSectionCount])

  useEffect(() => {
    const nextStyle = normalizeSlideStyle(selections.slide_style, language)
    const nextAudience = normalizeSlideAudience(selections.slide_audience, language)

    if (nextStyle === selections.slide_style && nextAudience === selections.slide_audience) return
    setSelections({ ...selections, slide_style: nextStyle, slide_audience: nextAudience })
  }, [language, selections.slide_style, selections.slide_audience])

  const slideStyle = normalizeSlideStyle(selections.slide_style, language)
  const requiresAudience = AUDIENCE_REQUIRED_STYLE_IDS.has(slideStyle)
  const activeVisualMode = visualMode === 'advanced' ? 'advanced' : 'simple'
  const normalizedSectionCount = clampSectionCount(sectionCount)
  const activeImageTemplate = IMAGE_TEMPLATES.find((template) => template.id === imageTemplateId) || IMAGE_TEMPLATES[0]

  const summaryPrompt = useMemo(() => {
    const slideAudience = normalizeSlideAudience(selections.slide_audience, language)
    const slideStyleText = selectionText('slide_style', slideStyle, selections.slide_style_custom, language)
    const slideAudienceText = requiresAudience
      ? selectionText('slide_audience', slideAudience, selections.slide_audience_custom, language)
      : ''
    const tpl = NOTEBOOKLM_SUMMARY_TEMPLATE[language] || NOTEBOOKLM_SUMMARY_TEMPLATE.cn
    return render(tpl, {
      topic: topic.trim() || (language === 'cn' ? '（請填寫主題）' : '(topic placeholder)'),
      slide_style: slideStyleText,
      audience_background_block: buildAudienceBackgroundBlock(slideAudienceText, language),
      section_count: String(normalizedSectionCount),
      audit_checklist_block: buildAuditChecklistBlock(auditChecklist, language),
    })
  }, [language, selections, slideStyle, requiresAudience, topic, normalizedSectionCount, auditChecklist])

  const stylePrompt = useMemo(() => {
    const templates =
      activeVisualMode === 'advanced'
        ? NOTEBOOKLM_PRESENTATION_STYLE_TEMPLATE
        : NOTEBOOKLM_SIMPLE_PRESENTATION_STYLE_TEMPLATE
    const tpl = templates[language] || templates.cn
    return render(tpl, {
      custom_brief_block:
        activeVisualMode === 'advanced'
          ? buildVisualBriefBlock(visualBrief, language)
          : buildSimpleVisualBriefBlock(simpleVisualBrief, language),
      section_count: String(normalizedSectionCount),
    })
  }, [language, activeVisualMode, visualBrief, simpleVisualBrief, normalizedSectionCount])

  const previewBrief = useMemo(
    () => (activeVisualMode === 'advanced' ? visualBrief : simpleVisualBriefToPreviewBrief(simpleVisualBrief)),
    [activeVisualMode, visualBrief, simpleVisualBrief]
  )

  const imagePrompt = useMemo(
    () => renderImagePrompt(activeImageTemplate, imageSelections, language),
    [activeImageTemplate, imageSelections, language]
  )

  const updateSelection = (key, value) => {
    setSelections({ ...selections, [key]: value })
  }

  const updateImageSelection = (key, value) => {
    setImageSelections((prev) => {
      const next = { ...(prev || {}) }
      if (value === undefined) {
        delete next[key]
      } else {
        next[key] = value
      }
      return next
    })
  }

  const handleImageTemplateChange = (nextTemplateId) => {
    setImageTemplateId(nextTemplateId)
    setImageSelections({})
  }

  const handleSave = (name) => {
    savePrompt({
      name,
      topic,
      selections,
      sectionCount: normalizedSectionCount,
      visualMode: activeVisualMode,
      simpleVisualBrief: normalizeSimpleVisualBrief(simpleVisualBrief),
      visualBrief,
      auditChecklist,
      outputMode,
      imageTemplateId,
      imageTemplateName: activeImageTemplate?.name,
      imageSelections,
    })
  }

  const handleLoad = (item) => {
    if (item.topic !== undefined) setTopic(item.topic)
    if (item.selections) {
      const nextStyle = normalizeSlideStyle(item.selections.slide_style, language)
      setSelections({
        ...item.selections,
        slide_style: nextStyle,
        slide_audience: normalizeSlideAudience(item.selections.slide_audience, language),
      })
    }
    if (item.sectionCount) setSectionCount(clampSectionCount(item.sectionCount))
    if (item.simpleVisualBrief) {
      setSimpleVisualBrief(normalizeSimpleVisualBrief(item.simpleVisualBrief))
    } else {
      setSimpleVisualBrief(DEFAULT_SIMPLE_VISUAL_BRIEF)
    }

    let nextVisualBrief = EMPTY_BRIEF
    // 結構化 brief 優先；找不到再 fallback 到舊版字串 customBrief（前一版本格式）
    if (item.visualBrief) {
      nextVisualBrief = { ...EMPTY_BRIEF, ...item.visualBrief }
    } else if (typeof item.customBrief === 'string') {
      nextVisualBrief = { ...EMPTY_BRIEF, notes: item.customBrief }
    }
    setVisualBrief(nextVisualBrief)

    if (VISUAL_MODES.some((mode) => mode.id === item.visualMode)) {
      setVisualMode(item.visualMode)
    } else if (hasAdvancedVisualBrief(nextVisualBrief)) {
      setVisualMode('advanced')
    } else {
      setVisualMode('simple')
    }
    setAuditChecklist(item.auditChecklist ? { ...DEFAULT_AUDIT_CHECKLIST, ...item.auditChecklist } : DEFAULT_AUDIT_CHECKLIST)
    if (item.imageTemplateId && IMAGE_TEMPLATES.some((template) => template.id === item.imageTemplateId)) {
      setImageTemplateId(item.imageTemplateId)
    }
    if (item.imageSelections) {
      setImageSelections(item.imageSelections)
    } else if (item.outputMode === 'image') {
      setImageSelections({})
    }
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
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-start">
            <div className="space-y-6">
              <ImagePromptWorkspace
                language={language}
                templateId={activeImageTemplate?.id}
                onTemplateChange={handleImageTemplateChange}
                selections={imageSelections}
                onSelectionChange={updateImageSelection}
              />

              <div className="space-y-6 lg:hidden">
                <OutputTargetPanel
                  imagePrompt={imagePrompt}
                  outputType={outputMode}
                  language={language}
                />
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

            <aside className="hidden space-y-6 lg:sticky lg:top-20 lg:block">
              <OutputTargetPanel
                imagePrompt={imagePrompt}
                outputType={outputMode}
                language={language}
                compact
              />
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
                  <TopicInput value={topic} onChange={setTopic} language={language} slideStyle={slideStyle} />

                  <div className="space-y-5">
                    <VariableSelect
                      bankKey="slide_style"
                      value={selections.slide_style}
                      onChange={(v) => updateSelection('slide_style', v)}
                      customValue={selections.slide_style_custom || ''}
                      onCustomChange={(v) => updateSelection('slide_style_custom', v)}
                      language={language}
                    />
                    {requiresAudience && (
                      <VariableSelect
                        bankKey="slide_audience"
                        value={selections.slide_audience}
                        onChange={(v) => updateSelection('slide_audience', v)}
                        customValue={selections.slide_audience_custom || ''}
                        onCustomChange={(v) => updateSelection('slide_audience_custom', v)}
                        language={language}
                      />
                    )}
                  </div>
                  <SectionCountSlider
                    value={normalizedSectionCount}
                    onChange={setSectionCount}
                    language={language}
                  />
                </div>
              )}

              {activeTab === 'visual' && (
                <div className="space-y-4" role="tabpanel">
                  <VisualModeToggle
                    visualMode={activeVisualMode}
                    setVisualMode={setVisualMode}
                    language={language}
                  />
                  {activeVisualMode === 'simple' ? (
                    <SimpleBriefInput
                      value={simpleVisualBrief}
                      onChange={setSimpleVisualBrief}
                      language={language}
                      slideStyle={slideStyle}
                    />
                  ) : (
                    <CustomBriefInput
                      value={visualBrief}
                      onChange={setVisualBrief}
                      language={language}
                      slideStyle={slideStyle}
                      forceOpen
                    />
                  )}
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
                  <OutputTargetPanel
                    notebookPrompts={{ summary: summaryPrompt, style: stylePrompt }}
                    outputType={outputMode}
                    language={language}
                  />
                </div>
              )}

              <div className="lg:hidden space-y-6 pt-2">
                {outputMode === 'presentation' && (
                  <SlidePreview
                    brief={previewBrief}
                    topic={topic}
                    sectionCount={normalizedSectionCount}
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
                  brief={previewBrief}
                  topic={topic}
                  sectionCount={normalizedSectionCount}
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
