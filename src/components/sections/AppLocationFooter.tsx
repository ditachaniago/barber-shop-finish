"use client"

import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import {
  Smartphone,
  Calendar,
  MessageCircle,
  Gift,
  MapPin,
  BookOpen,
  Bell,
  ArrowUpRight,
  Mail,
} from "lucide-react"

const APP_ICONS = [Calendar, MessageCircle, Gift, MapPin, BookOpen, Bell]

export function AppSection() {
  const { t } = useTranslation()
  const features = t("app.features", { returnObjects: true }) as string[]

  return (
    <section className="relative py-24 md:py-40 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(212,175,55,0.08),transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="w-12 h-px bg-gold-300/60" />
              <span className="text-[10px] md:text-xs tracking-[0.5em] uppercase text-gold-300 font-medium">
                {t("app.eyebrow")}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-4xl md:text-6xl lg:text-7xl text-cream-50 leading-[0.95] mb-4"
            >
              {t("app.title")}
            </motion.h2>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-4xl md:text-6xl lg:text-7xl text-gold-gradient leading-[0.95] mb-8"
            >
              {t("app.titleAccent")}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-base md:text-lg text-noir-200 font-light leading-relaxed mb-10"
            >
              {t("app.sub")}
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
              {features.map((f, i) => {
                const Icon = APP_ICONS[i]
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 glass rounded-sm px-4 py-3 hover:border-gold-300/30 transition-all"
                  >
                    <Icon className="w-4 h-4 text-gold-300 flex-shrink-0" />
                    <span className="text-sm text-cream-100">{f}</span>
                  </motion.div>
                )
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button className="group flex items-center gap-3 px-6 py-3 rounded-sm bg-gradient-to-r from-gold-300 to-gold-600 text-noir-950 gold-shine">
                <Smartphone className="w-4 h-4" />
                <span className="text-xs tracking-[0.2em] uppercase font-medium">
                  {t("app.download")}
                </span>
              </button>
              <button className="group flex items-center gap-3 px-6 py-3 rounded-sm border border-noir-700 hover:border-gold-300/50 text-cream-100 hover:text-gold-300 transition-all">
                <Smartphone className="w-4 h-4" />
                <span className="text-xs tracking-[0.2em] uppercase">
                  {t("app.android")}
                </span>
              </button>
            </div>
          </div>

          {/* Right: Phone mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Phone frame */}
              <div className="relative w-[300px] h-[620px] rounded-[3rem] bg-gradient-to-b from-noir-700 to-noir-900 p-3 shadow-[0_0_80px_rgba(212,175,55,0.2)]">
                <div className="absolute inset-0 rounded-[3rem] border-2 border-gold-300/20" />
                <div className="relative w-full h-full rounded-[2.5rem] bg-noir-950 overflow-hidden">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-noir-900 rounded-b-2xl z-10" />

                  {/* Screen content */}
                  <div className="relative h-full bg-gradient-to-b from-noir-900 to-noir-950 p-6 pt-10">
                    <div className="text-center mb-6">
                      <div className="font-display text-3xl text-gold-gradient mb-1">N&amp;C</div>
                      <div className="text-[9px] tracking-[0.4em] uppercase text-noir-400">
                        Atelier
                      </div>
                    </div>

                    <div className="glass-gold rounded-xl p-4 mb-3">
                      <div className="text-[9px] tracking-[0.3em] uppercase text-gold-300 mb-1">
                        Next Reservation
                      </div>
                      <div className="font-display text-xl text-cream-50">Kenji · Tokyo</div>
                      <div className="text-xs text-noir-300 mt-1">Tomorrow · 16:00</div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-3">
                      {["Book", "Maître", "Perks", "Journal"].map((x) => (
                        <div
                          key={x}
                          className="glass rounded-lg p-3 text-center text-[10px] text-cream-100 tracking-wider"
                        >
                          {x}
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2">
                      {["Executive Cut", "Hot Shave", "Beard Sculpt"].map((x) => (
                        <div
                          key={x}
                          className="flex items-center justify-between glass rounded-lg p-3"
                        >
                          <span className="text-xs text-cream-100">{x}</span>
                          <span className="text-[10px] text-gold-300">$180</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -left-16 glass-gold rounded-full p-4 hidden md:block"
              >
                <Bell className="w-5 h-5 text-gold-300" />
              </motion.div>
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-1/3 -right-20 glass-gold rounded-full p-4 hidden md:block"
              >
                <Gift className="w-5 h-5 text-gold-300" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export function LocationSection() {
  const { t } = useTranslation()
  const houses = t("location.houses", { returnObjects: true }) as Array<{
    city: string
    address: string
    hours: string
  }>

  return (
    <section id="location" className="relative py-24 md:py-40 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(212,175,55,0.06),transparent_60%)]" />

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
              {t("location.eyebrow")}
            </span>
            <div className="w-12 h-px bg-gold-300/60" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-6xl lg:text-7xl text-cream-50 leading-[0.95] mb-4"
          >
            {t("location.title")}
          </motion.h2>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-6xl lg:text-7xl text-gold-gradient leading-[0.95] mb-6"
          >
            {t("location.titleAccent")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-base md:text-lg text-noir-200 font-light"
          >
            {t("location.sub")}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {houses.map((h, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="group glass rounded-sm p-6 md:p-8 hover:border-gold-300/40 transition-all duration-700 relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 font-display text-5xl text-noir-800 group-hover:text-gold-300/20 transition-colors duration-700">
                0{i + 1}
              </div>

              <MapPin className="w-5 h-5 text-gold-300 mb-4" />
              <div className="font-display text-3xl md:text-4xl text-cream-50 mb-2">{h.city}</div>
              <div className="text-sm text-noir-300 leading-relaxed mb-6">{h.address}</div>
              <div className="pt-4 border-t border-noir-800 flex items-center justify-between">
                <div className="text-[10px] tracking-[0.3em] uppercase text-gold-300/80">
                  {h.hours}
                </div>
                <ArrowUpRight className="w-4 h-4 text-gold-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="relative pt-24 pb-10 overflow-hidden border-t border-noir-800">
      <div className="absolute inset-0 bg-gradient-to-b from-noir-950 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.05),transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        {/* Top grid */}
        <div className="grid md:grid-cols-4 gap-10 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="font-display text-4xl md:text-5xl text-gold-gradient tracking-wider mb-4">
              {t("brand.name")}
            </div>
            <div className="text-[10px] tracking-[0.4em] uppercase text-noir-400 mb-6">
              {t("brand.tagline")} · {t("brand.est")}
            </div>
            <p className="text-sm text-noir-300 font-light leading-relaxed max-w-md mb-8">
              {t("footer.mission")}
            </p>

            {/* Newsletter */}
            <div className="max-w-md">
              <div className="text-[10px] tracking-[0.3em] uppercase text-gold-300 mb-2">
                {t("footer.newsletter")}
              </div>
              <p className="text-sm text-noir-300 mb-4">{t("footer.newsletterSub")}</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder={t("footer.emailPlaceholder")}
                  className="flex-1 bg-noir-800/60 border border-noir-700 focus:border-gold-300/50 rounded-sm px-4 py-3 text-sm text-cream-50 placeholder:text-noir-500 outline-none transition-all"
                />
                <button className="bg-gradient-to-r from-gold-300 to-gold-600 text-noir-950 px-6 py-3 rounded-sm flex items-center gap-2 group hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all">
                  <Mail className="w-4 h-4" />
                  <span className="text-xs tracking-[0.2em] uppercase font-medium">
                    {t("footer.subscribe")}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <div className="text-[10px] tracking-[0.4em] uppercase text-gold-300 mb-6">
              {t("footer.explore")}
            </div>
            <ul className="space-y-3">
              {[
                { k: "about", h: "#about" },
                { k: "services", h: "#services" },
                { k: "membership", h: "#membership" },
                { k: "contact", h: "#location" },
                { k: "press", h: "#" },
              ].map((l) => (
                <li key={l.k}>
                  <a
                    href={l.h}
                    className="text-sm text-noir-300 hover:text-gold-300 transition-colors duration-300"
                  >
                    {t(`footer.${l.k}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-[10px] tracking-[0.4em] uppercase text-gold-300 mb-6">
              {t("footer.follow")}
            </div>
            <ul className="space-y-3">
              {["Instagram", "Pinterest", "YouTube", "Spotify", "TikTok"].map((s) => (
                <li key={s}>
                  <a
                    href="#"
                    className="text-sm text-noir-300 hover:text-gold-300 transition-colors duration-300 flex items-center gap-2 group"
                  >
                    {s}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Marquee */}
        <div className="relative overflow-hidden py-8 border-y border-noir-800 mb-10">
          <div className="flex whitespace-nowrap animate-[lux-marquee_30s_linear_infinite]">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center gap-8 px-8">
                <span className="font-display text-4xl md:text-6xl text-gold-gradient">
                  {t("brand.name")}
                </span>
                <span className="w-2 h-2 rounded-full bg-gold-300" />
                <span className="font-serif-lux italic text-2xl md:text-3xl text-noir-400">
                  {t("brand.tagline")}
                </span>
                <span className="w-2 h-2 rounded-full bg-gold-300" />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-noir-400 tracking-wider">
          <div>{t("footer.rights")}</div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-gold-300 transition-colors">
              {t("footer.privacy")}
            </a>
            <a href="#" className="hover:text-gold-300 transition-colors">
              {t("footer.terms")}
            </a>
            <a href="#" className="hover:text-gold-300 transition-colors">
              {t("footer.careers")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default { AppSection, LocationSection, Footer }
