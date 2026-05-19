"use client"

import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import { InteractiveSelector } from "@/components/ui/interactive-selector"
import { Scissors, Sparkles, Crown, Gem, Flame, Leaf } from "lucide-react"

const SERVICE_ICONS = [Scissors, Flame, Sparkles, Crown]

export function AboutSection() {
  const { t } = useTranslation()
  const stats = [
    { value: "18+", label: t("about.stat1Label") },
    { value: "24", label: t("about.stat2Label") },
    { value: "5K+", label: t("about.stat3Label") },
    { value: "4", label: t("about.stat4Label") },
  ]

  return (
    <section id="about" className="relative py-24 md:py-40 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.05),transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-sm overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1596728325488-58c87691e9af?w=1200&q=80&auto=format&fit=crop)",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-noir-950/80 via-noir-950/20 to-transparent" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.1),transparent_70%)]" />
            </div>

            {/* Floating card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute -bottom-8 -right-4 md:-right-12 glass-gold rounded-sm p-6 max-w-[240px]"
            >
              <div className="flex items-center gap-3 mb-3">
                <Gem className="w-5 h-5 text-gold-300" />
                <span className="text-[10px] tracking-[0.3em] uppercase text-gold-300">
                  {t("brand.est")}
                </span>
              </div>
              <p className="text-sm text-cream-50 font-light leading-relaxed">
                Founded on the philosophy that grooming is a silent language of power.
              </p>
            </motion.div>

            {/* Corner accents */}
            <div className="absolute -top-2 -left-2 w-6 h-6 border-l border-t border-gold-300/50" />
            <div className="absolute -bottom-2 -left-2 w-6 h-6 border-l border-b border-gold-300/50" />
          </motion.div>

          {/* Right: Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="w-12 h-px bg-gold-300/60" />
              <span className="text-[10px] md:text-xs tracking-[0.5em] uppercase text-gold-300 font-medium">
                {t("about.eyebrow")}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display text-4xl md:text-6xl lg:text-7xl text-cream-50 leading-[0.95] mb-4"
            >
              {t("about.title")}
            </motion.h2>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-display text-4xl md:text-6xl lg:text-7xl text-gold-gradient leading-[0.95] mb-8"
            >
              {t("about.titleAccent")}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-base md:text-lg text-noir-200 font-light leading-relaxed mb-6"
            >
              {t("about.p1")}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base md:text-lg text-noir-200 font-light leading-relaxed mb-12"
            >
              {t("about.p2")}
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {stats.map((s, i) => (
                <div key={i} className="group">
                  <div className="font-display text-4xl md:text-5xl text-gold-gradient mb-2 group-hover:scale-105 transition-transform duration-500">
                    {s.value}
                  </div>
                  <div className="text-[10px] tracking-[0.2em] uppercase text-noir-300">
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function ServicesSection() {
  const { t } = useTranslation()
  const services = t("services.items", { returnObjects: true }) as Array<{
    name: string
    duration: string
    price: string
    desc: string
  }>

  return (
    <section id="services" className="relative py-24 md:py-40 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(212,175,55,0.06),transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <div className="w-12 h-px bg-gold-300/60" />
            <span className="text-[10px] md:text-xs tracking-[0.5em] uppercase text-gold-300 font-medium">
              {t("services.eyebrow")}
            </span>
            <div className="w-12 h-px bg-gold-300/60" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl text-cream-50 leading-[0.95] mb-4"
          >
            {t("services.title")}
          </motion.h2>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl text-gold-gradient leading-[0.95] mb-6"
          >
            {t("services.titleAccent")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl mx-auto text-base md:text-lg text-noir-200 font-light"
          >
            {t("services.sub")}
          </motion.p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((s, i) => {
            const Icon = SERVICE_ICONS[i]
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="group relative glass rounded-sm p-8 md:p-10 hover:border-gold-300/40 transition-all duration-700 overflow-hidden"
              >
                {/* Number */}
                <div className="absolute top-6 right-6 font-display text-6xl md:text-8xl text-noir-800 group-hover:text-gold-300/20 transition-colors duration-700">
                  0{i + 1}
                </div>

                <div className="relative">
                  <div className="w-14 h-14 rounded-sm bg-gradient-to-br from-gold-300/20 to-gold-600/5 border border-gold-300/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-gold-300/50 transition-all duration-500">
                    <Icon className="w-6 h-6 text-gold-300" />
                  </div>

                  <h3 className="font-display text-3xl md:text-4xl text-cream-50 mb-3">
                    {s.name}
                  </h3>
                  <p className="text-sm md:text-base text-noir-300 leading-relaxed mb-6 max-w-md">
                    {s.desc}
                  </p>

                  <div className="flex items-center gap-6 pt-6 border-t border-noir-800">
                    <div className="flex items-center gap-2 text-xs text-noir-400">
                      <span className="w-1 h-1 rounded-full bg-gold-300" />
                      <span className="tracking-wider">{s.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Leaf className="w-3 h-3 text-gold-300" />
                      <span className="text-gold-300 tracking-wider">{s.price}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function GallerySection() {
  const { t } = useTranslation()

  return (
    <section id="gallery" className="relative py-24 md:py-40 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <div className="w-12 h-px bg-gold-300/60" />
            <span className="text-[10px] md:text-xs tracking-[0.5em] uppercase text-gold-300 font-medium">
              {t("gallery.eyebrow")}
            </span>
            <div className="w-12 h-px bg-gold-300/60" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-6xl lg:text-7xl text-cream-50 leading-[0.95] mb-4"
          >
            {t("gallery.title")}
          </motion.h2>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-6xl lg:text-7xl text-gold-gradient leading-[0.95] mb-6"
          >
            {t("gallery.titleAccent")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-base md:text-lg text-noir-200 font-light"
          >
            {t("gallery.sub")}
          </motion.p>
        </div>

        <InteractiveSelector />
      </div>
    </section>
  )
}

export default { AboutSection, ServicesSection, GallerySection }
