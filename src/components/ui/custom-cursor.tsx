"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function CustomCursor() {
  const [visible, setVisible] = useState(false)
  const [variant, setVariant] = useState<"default" | "hover">("default")
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 28, stiffness: 400, mass: 0.4 }
  const x = useSpring(cursorX, springConfig)
  const y = useSpring(cursorY, springConfig)

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches
    if (isTouchDevice || window.innerWidth < 768) return

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      setVisible(true)

      const target = e.target as HTMLElement
      const interactive = target.closest(
        "a, button, [role='button'], input, textarea, select, [data-cursor='hover']",
      )
      setVariant(interactive ? "hover" : "default")
    }

    const leave = () => setVisible(false)

    window.addEventListener("mousemove", move)
    document.addEventListener("mouseleave", leave)
    return () => {
      window.removeEventListener("mousemove", move)
      document.removeEventListener("mouseleave", leave)
    }
  }, [cursorX, cursorY])

  if (!visible) return null

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          animate={{
            width: variant === "hover" ? 44 : 8,
            height: variant === "hover" ? 44 : 8,
            opacity: variant === "hover" ? 0.5 : 1,
          }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="bg-cream-50 rounded-full"
        />
      </motion.div>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          animate={{
            width: variant === "hover" ? 80 : 32,
            height: variant === "hover" ? 80 : 32,
            opacity: variant === "hover" ? 0.3 : 0.15,
            borderColor: variant === "hover" ? "rgba(212,175,55,0.8)" : "rgba(212,175,55,0.35)",
          }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="border border-gold-300 rounded-full"
        />
      </motion.div>
    </>
  )
}

export function MouseLight() {
  const [pos, setPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handle = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener("mousemove", handle)
    return () => window.removeEventListener("mousemove", handle)
  }, [])

  return (
    <div
      className="fixed pointer-events-none z-0 w-[600px] h-[600px] rounded-full"
      style={{
        left: pos.x,
        top: pos.y,
        transform: "translate(-50%, -50%)",
        background:
          "radial-gradient(circle, rgba(212,175,55,0.06) 0%, rgba(212,175,55,0.02) 30%, transparent 70%)",
      }}
    />
  )
}

export default CustomCursor
