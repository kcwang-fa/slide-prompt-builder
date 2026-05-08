export function LanguageToggle({ language, setLanguage }) {
  return (
    <button
      onClick={() => setLanguage(language === 'cn' ? 'en' : 'cn')}
      className="text-xs font-bold px-2.5 py-1 rounded-md border border-zinc-300 bg-white hover:bg-zinc-50 transition"
      aria-label="Toggle language"
    >
      {language === 'cn' ? '中／EN' : 'EN／中'}
    </button>
  )
}
