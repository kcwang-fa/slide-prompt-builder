import { IMAGE_DEFAULTS, PATHOGEN_TRANSMISSION_HINTS } from '../data/imageBanks.js'

export function localizeImageValue(value, language) {
  if (value === undefined || value === null) return ''
  if (typeof value === 'string') return value
  if (typeof value !== 'object') return String(value)
  if (value.prompt) {
    const prompt = localizeImageValue(value.prompt, language)
    const diseaseName = localizeImageValue(value.label, 'cn')
    const transmissionHint = localizeImageValue(PATHOGEN_TRANSMISSION_HINTS[diseaseName], language)
    return [prompt, transmissionHint].filter(Boolean).join('\n')
  }
  return value[language] || value.cn || value.en || value['zh-tw'] || Object.values(value).find(Boolean) || ''
}

export function localizeImageOptionLabel(value, language) {
  if (value && typeof value === 'object' && value.label) {
    return localizeImageValue(value.label, language)
  }
  return localizeImageValue(value, language)
}

export function getImageTemplateLanguage(template, language) {
  const supported = Array.isArray(template?.language)
    ? template.language
    : template?.language
      ? [template.language]
      : ['cn', 'en']

  return supported.includes(language) ? language : supported[0] || language
}

export function getImageTemplateText(template, language) {
  const templateLanguage = getImageTemplateLanguage(template, language)
  return localizeImageValue(template?.content, templateLanguage)
}

export function getImageTemplateName(template, language) {
  return localizeImageValue(template?.name, language)
}

export function getImageSelectionValue(template, selections, key, index) {
  const uniqueKey = `${key}-${index}`
  return (
    selections?.[uniqueKey] ??
    selections?.[key] ??
    template?.selections?.[uniqueKey] ??
    template?.selections?.[key] ??
    IMAGE_DEFAULTS[key]
  )
}

export function getImageTemplateVariables(template, language) {
  const text = getImageTemplateText(template, language)
  const matches = [...text.matchAll(/\{\{(.*?)\}\}/g)].map((match) => match[1].trim())
  const totals = matches.reduce((acc, key) => {
    acc[key] = (acc[key] || 0) + 1
    return acc
  }, {})
  const counters = {}

  return matches.map((key) => {
    const index = counters[key] || 0
    counters[key] = index + 1
    return {
      key,
      index,
      uniqueKey: `${key}-${index}`,
      count: totals[key],
    }
  })
}

export function renderImagePrompt(template, selections, language) {
  const templateLanguage = getImageTemplateLanguage(template, language)
  const text = getImageTemplateText(template, templateLanguage)
  const counters = {}

  const rendered = text.replace(/\{\{(.*?)\}\}/g, (match, rawKey) => {
    const key = rawKey.trim()
    const index = counters[key] || 0
    counters[key] = index + 1
    const value = getImageSelectionValue(template, selections, key, index)
    return localizeImageValue(value, templateLanguage) || match
  })

  return rendered
    .replace(/^###\s*/gm, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}
