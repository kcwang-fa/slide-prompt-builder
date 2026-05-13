import { useState } from 'react'
import { Bookmark, Check, Edit2, Trash2, X } from 'lucide-react'

function localize(value, language) {
  if (!value || typeof value !== 'object') return value || ''
  return value[language] || value.cn || value.en || ''
}

function itemSubtitle(item, language) {
  if (item.outputMode === 'image') {
    return localize(item.imageTemplateName, language) || item.imageTemplateId || (language === 'cn' ? '圖片 Prompt' : 'Image prompt')
  }
  return item.topic || (language === 'cn' ? '（無主題）' : '(no topic)')
}

export function SavedPromptsPanel({ saved, onSave, onLoad, onDelete, onRename, language }) {
  const [name, setName] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editName, setEditName] = useState('')

  const handleSave = () => {
    const trimmed = name.trim()
    if (!trimmed) return
    onSave(trimmed)
    setName('')
  }

  const startRename = (item) => {
    setEditingId(item.id)
    setEditName(item.name)
  }
  const commitRename = () => {
    const t = editName.trim()
    if (t) onRename(editingId, t)
    setEditingId(null)
  }

  return (
    <section className="rounded-xl border border-zinc-200 bg-white p-4 space-y-3">
      <div className="flex items-center gap-2">
        <Bookmark size={18} className="text-orange-500" />
        <h2 className="text-sm font-semibold text-zinc-700">
          {language === 'cn' ? '我的收藏' : 'Saved Prompts'}
        </h2>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          placeholder={language === 'cn' ? '為這次的組合取個名字' : 'Name this combination'}
          className="flex-1 rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400"
        />
        <button
          onClick={handleSave}
          disabled={!name.trim()}
          className="px-4 py-2 rounded-lg text-sm font-bold bg-orange-500 text-white hover:bg-orange-600 disabled:bg-zinc-200 disabled:text-zinc-400 disabled:cursor-not-allowed"
        >
          {language === 'cn' ? '儲存目前組合' : 'Save'}
        </button>
      </div>

      {saved.length === 0 ? (
        <div className="text-xs text-zinc-400 py-4 text-center">
          {language === 'cn' ? '還沒有儲存的組合' : 'No saved prompts yet'}
        </div>
      ) : (
        <ul className="divide-y divide-zinc-100">
          {saved.map((item) => (
            <li key={item.id} className="py-2 flex items-center gap-2">
              {editingId === item.id ? (
                <>
                  <input
                    autoFocus
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') commitRename()
                      if (e.key === 'Escape') setEditingId(null)
                    }}
                    className="flex-1 rounded border border-zinc-300 px-2 py-1 text-sm"
                  />
                  <button onClick={commitRename} className="p-1 text-green-600 hover:bg-green-50 rounded">
                    <Check size={14} />
                  </button>
                  <button onClick={() => setEditingId(null)} className="p-1 text-zinc-400 hover:bg-zinc-50 rounded">
                    <X size={14} />
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => onLoad(item)}
                    className="flex-1 text-left text-sm font-medium text-zinc-700 hover:text-orange-600 truncate"
                    title={language === 'cn' ? '點擊載入此組合' : 'Click to load'}
                  >
                    <span className="block truncate">{item.name}</span>
                    <span className="block text-xs text-zinc-400 font-normal truncate">
                      {itemSubtitle(item, language)}
                    </span>
                  </button>
                  <button
                    onClick={() => startRename(item)}
                    className="p-1 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded"
                    title={language === 'cn' ? '重新命名' : 'Rename'}
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    onClick={() => onDelete(item.id)}
                    className="p-1 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded"
                    title={language === 'cn' ? '刪除' : 'Delete'}
                  >
                    <Trash2 size={14} />
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
