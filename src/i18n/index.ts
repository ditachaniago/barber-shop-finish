import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import en from "./locales/en.json"
import id from "./locales/id.json"

export const LANGUAGES = [
  { code: "en", label: "English", flag: "EN" },
  { code: "id", label: "Indonesia", flag: "ID" },
] as const

export type LangCode = (typeof LANGUAGES)[number]["code"]

const STORAGE_KEY = "noir-lang"

const detectBrowserLang = (): LangCode => {
  if (typeof navigator === "undefined") return "en"
  const lang = navigator.language?.toLowerCase() || "en"
  if (lang.startsWith("id")) return "id"
  return "en"
}

const savedLang =
  (typeof localStorage !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null) as LangCode | null

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    id: { translation: id },
  },
  lng: savedLang || detectBrowserLang(),
  fallbackLng: "en",
  interpolation: { escapeValue: false },
})

export const setLanguage = (code: LangCode) => {
  i18n.changeLanguage(code)
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(STORAGE_KEY, code)
  }
  if (typeof document !== "undefined") {
    document.documentElement.lang = code

    // Localized page title + description
    const titles: Record<LangCode, string> = {
      en: "NOIR & CO. — Atelier de Grooming · Luxury Barber Experience",
      id: "NOIR & CO. — Atelier Perawatan · Pengalaman Barber Mewah",
    }
    const descs: Record<LangCode, string> = {
      en: "An invitation-only grooming atelier for the modern gentleman. Tokyo · Dubai · New York · London.",
      id: "Atelier perawatan eksklusif untuk pria modern. Tokyo · Dubai · New York · London.",
    }
    document.title = titles[code] || titles.en
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute("content", descs[code] || descs.en)

    // Alternate hreflang tags
    const base =
      typeof window !== "undefined" ? window.location.origin + window.location.pathname : ""
    const ensureLink = (lang: string, href: string) => {
      const sel = `link[rel="alternate"][hreflang="${lang}"]`
      let el = document.head.querySelector(sel) as HTMLLinkElement | null
      if (!el) {
        el = document.createElement("link")
        el.rel = "alternate"
        el.hreflang = lang
        document.head.appendChild(el)
      }
      el.href = href
    }
    ensureLink("en", `${base}?lang=en`)
    ensureLink("id", `${base}?lang=id`)
    ensureLink("x-default", base)
  }
}

// Initial head setup
if (typeof document !== "undefined") {
  setLanguage(i18n.language as LangCode)
}

export default i18n
