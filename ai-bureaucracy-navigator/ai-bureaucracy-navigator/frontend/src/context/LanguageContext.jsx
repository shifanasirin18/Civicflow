import { createContext, useContext, useMemo, useState } from 'react'
import { translations } from '@/i18n/translations'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('abn_lang') || 'en')

  const setLangPersist = (l) => {
    setLang(l)
    localStorage.setItem('abn_lang', l)
  }

  const value = useMemo(
    () => ({
      lang,
      setLang: setLangPersist,
      t: (key) => translations[key]?.[lang] ?? translations[key]?.en ?? key,
      tb: (val) => val?.[lang] ?? val?.en ?? '',
    }),
    [lang],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}

