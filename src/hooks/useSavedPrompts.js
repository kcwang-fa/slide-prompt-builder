import { useLocalStorage } from './useLocalStorage.js'

const STORAGE_KEY = 'spb_saved_prompts_v1'
const SAVED_PROMPT_SCHEMA_VERSION = 3

export function useSavedPrompts() {
  const [savedPrompts, setSavedPrompts] = useLocalStorage(STORAGE_KEY, [])

  const savePrompt = (data) => {
    const item = {
      id: `sp_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      schemaVersion: SAVED_PROMPT_SCHEMA_VERSION,
      createdAt: Date.now(),
      ...data,
    }
    setSavedPrompts((prev) => [item, ...prev])
    return item
  }

  const deletePrompt = (id) => {
    setSavedPrompts((prev) => prev.filter((p) => p.id !== id))
  }

  const renamePrompt = (id, name) => {
    setSavedPrompts((prev) => prev.map((p) => (p.id === id ? { ...p, name } : p)))
  }

  return { savedPrompts, savePrompt, deletePrompt, renamePrompt }
}
