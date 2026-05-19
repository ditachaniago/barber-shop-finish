"use client"

import { useTranslation } from "react-i18next"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Globe } from "lucide-react"
import { LANGUAGES, setLanguage, type LangCode } from "@/i18n"

export function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const current = i18n.language as LangCode
  const currentLang = LANGUAGES.find((l) => l.code === current) || LANGUAGES[0]

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setTimeout(() => setOpen(false), 200)}
        className="group flex items-center gap-2.5 px-3 py-2 md:px-4 md:py-2.5 glass-gold rounded-full hover:border-gold-300/50 transition-all duration-500"
      >
        <Globe className="w-3.5 h-3.5 text-gold-300 group-hover:rotate-45 transition-transform duration-700" />
        <span className="text-[10px] md:text-xs tracking-[0.25em] uppercase text-cream-50 font-medium">
          {currentLang.flag}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-[4px] border-t-gold-300"
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full right-0 mt-2 glass-gold rounded-sm overflow-hidden min-w-[140px] z-50"
          >
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code)
                  setOpen(false)
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-xs tracking-[0.2em] uppercase transition-all ${
                  lang.code === current
                    ? "bg-gold-300/10 text-gold-300"
                    : "text-cream-100 hover:bg-gold-300/5 hover:text-gold-300"
                }`}
              >
                <span className="font-display text-base">{lang.flag}</span>
                <span>{lang.label}</span>
                {lang.code === current && (
                  <span className="ml-auto w-1 h-1 rounded-full bg-gold-300" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default LanguageSwitcher
