"use client"

import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import { Quote, Star, AtSign, Globe } from "lucide-react"

const BARBER_IMAGES = [
  "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=800&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1545167622-3a6ac756afa4?w=800&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80&auto=format&fit=crop",
]

export function TeamSection() {
  const { t } = useTranslation()
  const members = t("team.members", { returnObjects: true }) as Array<{
    name: string
    role: string
    years: string
  }>

  return (
    <section id="team" className="relative py-24 md:py-40 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.06),transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <div className="w-12 h-px bg-gold-300/60" />
            <span className="text-[10px] md:text-xs tracking-[0.5em] uppercase text-gold-300 font-medium">
              {t("team.eyebrow")}
            </span>
            <div className="w-12 h-px bg-gold-300/60" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-6xl lg:text-7xl text-cream-50 leading-[0.95] mb-4"
          >
            {t("team.title")}
          </motion.h2>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-6xl lg:text-7xl text-gold-gradient leading-[0.95] mb-6"
          >
            {t("team.titleAccent")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-base md:text-lg text-noir-200 font-light"
          >
            {t("team.sub")}
          </motion.p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {members.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="group relative"
            >
              <div className="relative aspect-[3/4] rounded-sm overflow-hidden mb-4">
                <div
                  className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[1500ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{ backgroundImage: `url(${BARBER_IMAGES[i]})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-noir-950 via-noir-950/30 to-transparent opacity-80" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                {/* Corner frame */}
                <div className="absolute top-3 left-3 w-6 h-6 border-l border-t border-gold-300/0 group-hover:border-gold-300/80 transition-all duration-500" />
                <div className="absolute bottom-3 right-3 w-6 h-6 border-r border-b border-gold-300/0 group-hover:border-gold-300/80 transition-all duration-500" />

                {/* Social icons */}
                <div className="absolute bottom-4 left-4 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  <div className="w-8 h-8 rounded-full glass-gold flex items-center justify-center">
                    <AtSign className="w-3.5 h-3.5 text-gold-300" />
                  </div>
                  <div className="w-8 h-8 rounded-full glass-gold flex items-center justify-center">
                    <Globe className="w-3.5 h-3.5 text-gold-300" />
                  </div>
                </div>

                {/* Years badge */}
                <div className="absolute top-4 right-4 glass-gold rounded-full px-3 py-1">
                  <span className="text-[9px] tracking-[0.3em] uppercase text-gold-300">
                    {m.years}
                  </span>
                </div>
              </div>

              <h3 className="font-display text-xl md:text-2xl text-cream-50 mb-1">{m.name}</h3>
              <p className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-gold-300/80">
                {m.role}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function TestimonialsSection() {
  const { t } = useTranslation()
  const items = t("testimonials.items", { returnObjects: true }) as Array<{
    quote: string
    name: string
    title: string
  }>

  return (
    <section className="relative py-24 md:py-40 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-noir-950 via-noir-900 to-noir-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08),transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <div className="w-12 h-px bg-gold-300/60" />
            <span className="text-[10px] md:text-xs tracking-[0.5em] uppercase text-gold-300 font-medium">
              {t("testimonials.eyebrow")}
            </span>
            <div className="w-12 h-px bg-gold-300/60" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-6xl lg:text-7xl text-cream-50 leading-[0.95] mb-4"
          >
            {t("testimonials.title")}
          </motion.h2>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-6xl lg:text-7xl text-gold-gradient leading-[0.95]"
          >
            {t("testimonials.titleAccent")}
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="glass rounded-sm p-8 md:p-10 relative group hover:border-gold-300/40 transition-all duration-700"
            >
              <Quote className="w-10 h-10 text-gold-300/30 mb-6" />
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-3 h-3 fill-gold-300 text-gold-300" />
                ))}
              </div>
              <p className="font-serif-lux text-lg md:text-xl text-cream-50 leading-relaxed mb-8 italic">
                "{item.quote}"
              </p>
              <div className="pt-6 border-t border-noir-800">
                <div className="font-display text-lg text-cream-50">{item.name}</div>
                <div className="text-[10px] tracking-[0.2em] uppercase text-gold-300/80 mt-1">
                  {item.title}
                </div>
              </div>
              <div className="absolute top-6 right-6 font-display text-6xl text-noir-800 group-hover:text-gold-300/20 transition-colors duration-700">
                0{i + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function MembershipSection() {
  const { t } = useTranslation()
  const tiers = t("membership.tiers", { returnObjects: true }) as Array<{
    name: string
    price: string
    period: string
    perks: string[]
    featured?: boolean
  }>

  return (
    <section id="membership" className="relative py-24 md:py-40 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(212,175,55,0.08),transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <div className="w-12 h-px bg-gold-300/60" />
            <span className="text-[10px] md:text-xs tracking-[0.5em] uppercase text-gold-300 font-medium">
              {t("membership.eyebrow")}
            </span>
            <div className="w-12 h-px bg-gold-300/60" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-6xl lg:text-7xl text-cream-50 leading-[0.95] mb-4"
          >
            {t("membership.title")}
          </motion.h2>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-6xl lg:text-7xl text-gold-gradient leading-[0.95] mb-6"
          >
            {t("membership.titleAccent")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-base md:text-lg text-noir-200 font-light"
          >
            {t("membership.sub")}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((tier, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className={`relative rounded-sm p-8 md:p-10 overflow-hidden transition-all duration-700 ${
                tier.featured
                  ? "glass-gold border-gold-300/50 md:-mt-4 md:mb-4"
                  : "glass hover:border-gold-300/30"
              }`}
            >
              {tier.featured && (
                <div className="absolute top-6 right-6 bg-gradient-to-r from-gold-300 to-gold-600 text-noir-950 text-[9px] tracking-[0.3em] uppercase px-3 py-1 rounded-full font-medium">
                  Signature
                </div>
              )}

              <div className="font-display text-3xl text-cream-50 mb-4">{tier.name}</div>
              <div className="flex items-baseline gap-2 mb-8">
                <span className="font-display text-5xl text-gold-gradient">{tier.price}</span>
                <span className="text-sm text-noir-400 tracking-wider">{tier.period}</span>
              </div>

              <ul className="space-y-4 mb-10">
                {tier.perks.map((perk, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-noir-200">
                    <span className="w-1 h-1 rounded-full bg-gold-300 mt-2 flex-shrink-0" />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-4 rounded-sm transition-all duration-500 gold-shine ${
                  tier.featured
                    ? "bg-gradient-to-r from-gold-300 to-gold-600 text-noir-950 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
                    : "border border-gold-300/30 text-gold-300 hover:border-gold-300/70"
                }`}
              >
                <span className="text-xs tracking-[0.3em] uppercase font-medium relative z-10">
                  {t("membership.join")}
                </span>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default { TeamSection, TestimonialsSection, MembershipSection }
