"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState<"loading" | "exit">("loading")

  useEffect(() => {
    const start = performance.now()
    const duration = 2200
    let raf: number
    const tick = (t: number) => {
      const p = Math.min((t - start) / duration, 1)
      setProgress(Math.floor(p * 100))
      if (p < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setTimeout(() => setPhase("exit"), 300)
        setTimeout(() => onComplete(), 1400)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [onComplete])

  return (
    <AnimatePresence>
      {phase === "loading" && (
        <motion.div
          key="loader"
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-[10000] bg-noir-950 flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Radial glow */}
          <div className="absolute inset-0 lux-radial-glow opacity-80" />

          {/* Gold monogram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative mb-12"
          >
            <div className="font-display text-7xl md:text-9xl text-gold-gradient tracking-wider">
              N&amp;C
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-300/20 to-transparent animate-pulse" />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-[10px] md:text-xs tracking-[0.5em] uppercase text-noir-300 mb-8"
          >
            Atelier de Grooming
          </motion.div>

          {/* Progress bar */}
          <div className="w-64 md:w-80 h-px bg-noir-800 relative overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-gold-300 to-gold-600"
              style={{ width: `${progress}%` }}
            />
            <motion.div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-transparent via-gold-200 to-transparent"
              style={{
                width: "30%",
                transform: `translateX(${progress * 2.5}%)`,
              }}
            />
          </div>

          {/* Progress text */}
          <div className="mt-6 flex items-center gap-4 text-[10px] tracking-[0.3em] uppercase text-noir-400">
            <span>Preparing</span>
            <span className="font-display text-gold-300 text-base tabular-nums">{progress}</span>
            <span>%</span>
          </div>

          {/* Corner marks */}
          <div className="absolute top-8 left-8 w-8 h-8 border-l border-t border-gold-300/40" />
          <div className="absolute top-8 right-8 w-8 h-8 border-r border-t border-gold-300/40" />
          <div className="absolute bottom-8 left-8 w-8 h-8 border-l border-b border-gold-300/40" />
          <div className="absolute bottom-8 right-8 w-8 h-8 border-r border-b border-gold-300/40" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LoadingScreen
