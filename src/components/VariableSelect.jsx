import { BANKS } from '../data/banks.js'

export function VariableSelect({ bankKey, value, onChange, language }) {
  const bank = BANKS[bankKey]
  if (!bank) return null
  return (
    <label className="block">
      <span className="block text-sm font-semibold text-zinc-700 mb-1">
        {bank.label[language] || bank.label.cn}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400"
      >
        {bank.options.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt[language] || opt.cn}
          </option>
        ))}
      </select>
    </label>
  )
}
