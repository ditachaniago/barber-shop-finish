"use client"

import { useTranslation } from "react-i18next"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { LanguageSwitcher } from "@/components/ui/language-switcher"

export function Navbar() {
  const { t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const links = [
    { key: "about", href: "#about" },
    { key: "services", href: "#services" },
    { key: "gallery", href: "#gallery" },
    { key: "booking", href: "#booking" },
    { key: "team", href: "#team" },
    { key: "membership", href: "#membership" },
  ]

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled ? "py-3 glass" : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="font-display text-2xl md:text-3xl text-gold-gradient tracking-wider">
              {t("brand.name")}
            </div>
            <div className="hidden md:block h-6 w-px bg-noir-700" />
            <div className="hidden md:block text-[9px] tracking-[0.3em] uppercase text-noir-400">
              {t("brand.tagline")}
            </div>
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.key}
                href={link.href}
                className="text-xs tracking-[0.2em] uppercase text-noir-200 hover:text-gold-300 transition-colors duration-300 relative group"
              >
                {t(`nav.${link.key}`)}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold-300 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <a
              href="#booking"
              className="hidden md:flex items-center gap-2 px-5 py-2.5 glass-gold rounded-full hover:border-gold-300/50 transition-all duration-500 group"
            >
              <span className="text-[10px] tracking-[0.3em] uppercase text-gold-300 font-medium">
                {t("nav.bookNow")}
              </span>
            </a>
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden w-10 h-10 flex items-center justify-center glass-gold rounded-full"
            >
              <Menu className="w-4 h-4 text-gold-300" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-noir-950/98 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col h-full p-8">
              <div className="flex items-center justify-between mb-12">
                <div className="font-display text-3xl text-gold-gradient">{t("brand.name")}</div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-10 h-10 flex items-center justify-center glass-gold rounded-full"
                >
                  <X className="w-4 h-4 text-gold-300" />
                </button>
              </div>
              <div className="flex-1 flex flex-col gap-6">
                {links.map((link, i) => (
                  <motion.a
                    key={link.key}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="font-display text-4xl text-cream-50 hover:text-gold-300 transition-colors"
                  >
                    {t(`nav.${link.key}`)}
                  </motion.a>
                ))}
              </div>
              <a
                href="#booking"
                onClick={() => setMobileOpen(false)}
                className="glass-gold rounded-full py-4 text-center text-xs tracking-[0.3em] uppercase text-gold-300 font-medium"
              >
                {t("nav.bookNow")}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
