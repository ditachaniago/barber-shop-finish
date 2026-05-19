"use client"

import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import { BookingSystem } from "@/components/ui/booking-system"

export function BookingSection() {
  const { t } = useTranslation()

  return (
    <section id="booking" className="relative py-24 md:py-40 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08),transparent_60%)]" />

      <div className="relative max-w-5xl mx-auto px-6 md:px-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <div className="w-12 h-px bg-gold-300/60" />
            <span className="text-[10px] md:text-xs tracking-[0.5em] uppercase text-gold-300 font-medium">
              {t("booking.eyebrow")}
            </span>
            <div className="w-12 h-px bg-gold-300/60" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-6xl lg:text-7xl text-cream-50 leading-[0.95] mb-4"
          >
            {t("booking.title")}
          </motion.h2>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-6xl lg:text-7xl text-gold-gradient leading-[0.95] mb-6"
          >
            {t("booking.titleAccent")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-base md:text-lg text-noir-200 font-light"
          >
            {t("booking.sub")}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <BookingSystem />
        </motion.div>
      </div>
    </section>
  )
}

export default BookingSection
