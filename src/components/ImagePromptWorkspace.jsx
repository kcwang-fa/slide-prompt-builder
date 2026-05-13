import { useMemo, useState } from 'react'
import { Image as ImageIcon, RotateCcw, Search, Tags } from 'lucide-react'

import { IMAGE_BANKS } from '../data/imageBanks.js'
import { IMAGE_TEMPLATE_TAGS, IMAGE_TEMPLATES } from '../data/imageTemplates.js'
import {
  getImageSelectionValue,
  getImageTemplateName,
  getImageTemplateVariables,
  localizeImageValue,
} from '../lib/imagePrompt.js'

const TAG_LABELS = {
  人物: { cn: '人物', en: 'People' },
  攝影: { cn: '攝影', en: 'Photo' },
  產品: { cn: '產品', en: 'Product' },
  建築: { cn: '建築', en: 'Architecture' },
  圖表: { cn: '圖表', en: 'Diagram' },
  卡通: { cn: '卡通', en: 'Cartoon' },
  遊戲: { cn: '遊戲', en: 'Game' },
  創意: { cn: '創意', en: 'Creative' },
}

function tagLabel(tag, language) {
  return TAG_LABELS[tag]?.[language] || tag
}

function optionIndexForValue(options, value, language) {
  const text = localizeImageValue(value, language)
  return options.findIndex((option) => localizeImageValue(option, language) === text)
}

function ImageVariableField({ field, template, selections, language, onChange }) {
  const bank = IMAGE_BANKS[field.key]
  const options = bank?.options || []
  const value = getImageSelectionValue(template, selections, field.key, field.index)
  const selectedOptionIndex = optionIndexForValue(options, value, language)
  const label = localizeImageValue(bank?.label, language) || field.key
  const inputValue = localizeImageValue(value, language)
  const fieldLabel = field.count > 1 ? `${label} ${field.index + 1}` : label

  return (
    <label className="block rounded-lg border border-zinc-200 bg-white p-3">
      <div className="mb-2 flex items-start justify-between gap-2">
        <span className="text-xs font-black uppercase tracking-wide text-zinc-500">
          {fieldLabel}
        </span>
        <button
          type="button"
          onClick={() => onChange(field.uniqueKey, undefined)}
          className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700"
          title={language === 'cn' ? '還原預設值' : 'Reset to default'}
          aria-label={language === 'cn' ? '還原預設值' : 'Reset to default'}
        >
          <RotateCcw size={13} />
        </button>
      </div>

      {options.length > 0 && (
        <select
          value={selectedOptionIndex >= 0 ? String(selectedOptionIndex) : ''}
          onChange={(event) => {
            const index = Number(event.target.value)
            if (Number.isInteger(index) && options[index]) onChange(field.uniqueKey, options[index])
          }}
          className="mb-2 w-full rounded-md border border-zinc-300 bg-white px-2 py-2 text-xs font-semibold text-zinc-700 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200"
        >
          <option value="">
            {language === 'cn' ? '快速選擇詞庫選項' : 'Choose from bank'}
          </option>
          {options.map((option, index) => (
            <option key={`${field.uniqueKey}-${index}`} value={index}>
              {localizeImageValue(option, language)}
            </option>
          ))}
        </select>
      )}

      <textarea
        value={inputValue}
        onChange={(event) => onChange(field.uniqueKey, event.target.value)}
        rows={2}
        className="w-full resize-y rounded-md border border-zinc-300 px-2 py-2 text-sm leading-relaxed text-zinc-800 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200"
      />
    </label>
  )
}

export function ImagePromptWorkspace({
  language,
  templateId,
  onTemplateChange,
  selections,
  onSelectionChange,
}) {
  const [query, setQuery] = useState('')
  const [activeTag, setActiveTag] = useState('')
  const activeTemplate = IMAGE_TEMPLATES.find((template) => template.id === templateId) || IMAGE_TEMPLATES[0]

  const filteredTemplates = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return IMAGE_TEMPLATES.filter((template) => {
      const matchesTag = !activeTag || template.tags?.includes(activeTag)
      if (!matchesTag) return false
      if (!normalizedQuery) return true

      const searchable = [
        template.id,
        getImageTemplateName(template, 'cn'),
        getImageTemplateName(template, 'en'),
        template.author,
        ...(template.tags || []),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()

      return searchable.includes(normalizedQuery)
    })
  }, [activeTag, query])

  const fields = useMemo(
    () => getImageTemplateVariables(activeTemplate, language),
    [activeTemplate, language]
  )

  return (
    <section className="space-y-4">
      <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center gap-2">
          <ImageIcon size={18} className="text-orange-500" />
          <h2 className="text-sm font-semibold text-zinc-700">
            {language === 'cn' ? '圖片模板' : 'Image Templates'}
          </h2>
          <span className="ml-auto rounded-full bg-zinc-100 px-2 py-1 text-[11px] font-bold text-zinc-500">
            {filteredTemplates.length}/{IMAGE_TEMPLATES.length}
          </span>
        </div>

        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={language === 'cn' ? '搜尋模板、作者或標籤' : 'Search templates, authors, or tags'}
            className="w-full rounded-lg border border-zinc-300 bg-white py-2 pl-9 pr-3 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200"
          />
        </div>

        <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => setActiveTag('')}
            className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-bold transition ${
              activeTag === ''
                ? 'border-orange-500 bg-orange-500 text-white'
                : 'border-zinc-200 bg-white text-zinc-500 hover:border-orange-300 hover:text-orange-600'
            }`}
          >
            {language === 'cn' ? '全部' : 'All'}
          </button>
          {IMAGE_TEMPLATE_TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(activeTag === tag ? '' : tag)}
              className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-bold transition ${
                activeTag === tag
                  ? 'border-orange-500 bg-orange-500 text-white'
                  : 'border-zinc-200 bg-white text-zinc-500 hover:border-orange-300 hover:text-orange-600'
              }`}
            >
              {tagLabel(tag, language)}
            </button>
          ))}
        </div>

        <div className="mt-4 grid max-h-[360px] grid-cols-1 gap-2 overflow-y-auto pr-1">
          {filteredTemplates.map((template) => {
            const isActive = template.id === activeTemplate.id
            return (
              <button
                key={template.id}
                type="button"
                onClick={() => onTemplateChange(template.id)}
                className={`flex gap-3 rounded-lg border p-2 text-left transition ${
                  isActive
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-zinc-200 bg-white hover:border-orange-300 hover:bg-orange-50'
                }`}
              >
                <img
                  src={template.imageUrl}
                  alt=""
                  className="h-16 w-16 shrink-0 rounded-md bg-zinc-100 object-cover"
                  loading="lazy"
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-black text-zinc-800">
                    {getImageTemplateName(template, language)}
                  </span>
                  <span className="mt-1 block truncate text-[11px] font-semibold text-zinc-400">
                    {template.id}
                  </span>
                  <span className="mt-2 flex flex-wrap gap-1">
                    {(template.tags || []).slice(0, 3).map((tag) => (
                      <span key={tag} className="rounded bg-zinc-100 px-1.5 py-0.5 text-[10px] font-bold text-zinc-500">
                        {tagLabel(tag, language)}
                      </span>
                    ))}
                  </span>
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row">
          <img
            src={activeTemplate.imageUrl}
            alt=""
            className="aspect-[4/3] w-full rounded-lg bg-zinc-100 object-cover sm:w-44"
          />
          <div className="min-w-0 flex-1">
            <h2 className="text-base font-black text-zinc-900">
              {getImageTemplateName(activeTemplate, language)}
            </h2>
            <p className="mt-1 text-xs font-semibold text-zinc-400">
              {activeTemplate.author || 'PromptFill'} · {activeTemplate.id}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {(activeTemplate.tags || []).map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1 rounded-md bg-zinc-100 px-2 py-1 text-[11px] font-bold text-zinc-500">
                  <Tags size={11} />
                  {tagLabel(tag, language)}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
          {fields.map((field) => (
            <ImageVariableField
              key={field.uniqueKey}
              field={field}
              template={activeTemplate}
              selections={selections}
              language={language}
              onChange={onSelectionChange}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
