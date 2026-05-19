"use client"

import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import { ParticleTextEffect } from "@/components/ui/particle-text-effect"
import { ChevronDown } from "lucide-react"

export function HeroSection() {
  const { t } = useTranslation()

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background ambient */}
      <div className="absolute inset-0 lux-radial-glow opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(212,175,55,0.08),transparent_60%)]" />

      {/* Corner frames */}
      <div className="absolute top-24 left-8 md:left-16 w-12 h-12 border-l border-t border-gold-300/30" />
      <div className="absolute top-24 right-8 md:right-16 w-12 h-12 border-r border-t border-gold-300/30" />
      <div className="absolute bottom-8 left-8 md:left-16 w-12 h-12 border-l border-b border-gold-300/30" />
      <div className="absolute bottom-8 right-8 md:right-16 w-12 h-12 border-r border-b border-gold-300/30" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pt-32 pb-20">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex items-center gap-4 mb-6"
        >
          <div className="w-12 h-px bg-gold-300/60" />
          <span className="text-[10px] md:text-xs tracking-[0.5em] uppercase text-gold-300 font-medium">
            {t("hero.eyebrow")}
          </span>
          <div className="w-12 h-px bg-gold-300/60" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-5xl md:text-7xl lg:text-8xl xl:text-9xl text-cream-50 leading-[0.9] mb-4"
        >
          {t("hero.headline")}
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-5xl md:text-7xl lg:text-8xl xl:text-9xl text-gold-gradient leading-[0.9] mb-12"
        >
          {t("hero.headlineAccent")}
        </motion.h1>

        {/* Particle text effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <ParticleTextEffect />
        </motion.div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="max-w-2xl text-base md:text-lg text-noir-200 font-light leading-relaxed mb-10"
        >
          {t("hero.sub")}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a
            href="#booking"
            className="group relative px-8 py-4 rounded-sm bg-gradient-to-r from-gold-300 to-gold-600 text-noir-950 font-medium overflow-hidden gold-shine"
          >
            <span className="relative z-10 text-xs tracking-[0.3em] uppercase">
              {t("hero.ctaPrimary")}
            </span>
          </a>
          <a
            href="#about"
            className="group px-8 py-4 rounded-sm border border-noir-600 hover:border-gold-300/50 text-cream-100 hover:text-gold-300 transition-all duration-500"
          >
            <span className="text-xs tracking-[0.3em] uppercase">{t("hero.ctaSecondary")}</span>
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] tracking-[0.4em] uppercase text-noir-400">
          {t("hero.scroll")}
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-4 h-4 text-gold-300" />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default HeroSection
