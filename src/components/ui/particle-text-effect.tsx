"use client"

import { useEffect, useRef, useState } from "react"

interface Vector2D {
  x: number
  y: number
}

class Particle {
  pos: Vector2D = { x: 0, y: 0 }
  vel: Vector2D = { x: 0, y: 0 }
  acc: Vector2D = { x: 0, y: 0 }
  target: Vector2D = { x: 0, y: 0 }

  closeEnoughTarget = 100
  maxSpeed = 1.0
  maxForce = 0.1
  particleSize = 10
  isKilled = false

  startColor = { r: 0, g: 0, b: 0 }
  targetColor = { r: 0, g: 0, b: 0 }
  colorWeight = 0
  colorBlendRate = 0.01

  move() {
    let proximityMult = 1
    const distance = Math.sqrt(
      Math.pow(this.pos.x - this.target.x, 2) + Math.pow(this.pos.y - this.target.y, 2),
    )

    if (distance < this.closeEnoughTarget) {
      proximityMult = distance / this.closeEnoughTarget
    }

    const towardsTarget = {
      x: this.target.x - this.pos.x,
      y: this.target.y - this.pos.y,
    }

    const magnitude = Math.sqrt(
      towardsTarget.x * towardsTarget.x + towardsTarget.y * towardsTarget.y,
    )

    if (magnitude > 0) {
      towardsTarget.x = (towardsTarget.x / magnitude) * this.maxSpeed * proximityMult
      towardsTarget.y = (towardsTarget.y / magnitude) * this.maxSpeed * proximityMult
    }

    const steer = {
      x: towardsTarget.x - this.vel.x,
      y: towardsTarget.y - this.vel.y,
    }

    const steerMagnitude = Math.sqrt(steer.x * steer.x + steer.y * steer.y)

    if (steerMagnitude > 0) {
      steer.x = (steer.x / steerMagnitude) * this.maxForce
      steer.y = (steer.y / steerMagnitude) * this.maxForce
    }

    this.acc.x += steer.x
    this.acc.y += steer.y

    this.vel.x += this.acc.x
    this.vel.y += this.acc.y
    this.pos.x += this.vel.x
    this.pos.y += this.vel.y
    this.acc.x = 0
    this.acc.y = 0
  }

  draw(ctx: CanvasRenderingContext2D, drawAsPoints: boolean) {
    if (this.colorWeight < 1.0) {
      this.colorWeight = Math.min(this.colorWeight + this.colorBlendRate, 1.0)
    }

    const currentColor = {
      r: Math.round(this.startColor.r + (this.targetColor.r - this.startColor.r) * this.colorWeight),
      g: Math.round(this.startColor.g + (this.targetColor.g - this.startColor.g) * this.colorWeight),
      b: Math.round(this.startColor.b + (this.targetColor.b - this.startColor.b) * this.colorWeight),
    }

    ctx.fillStyle = `rgb(${currentColor.r}, ${currentColor.g}, ${currentColor.b})`

    if (drawAsPoints) {
      ctx.fillRect(this.pos.x, this.pos.y, 2, 2)
    } else {
      ctx.beginPath()
      ctx.arc(this.pos.x, this.pos.y, this.particleSize / 2, 0, Math.PI * 2)
      ctx.fill()
    }
  }
}

export interface ParticleTextEffectProps {
  words?: string[]
  colorStart?: { r: number; g: number; b: number }
  colorEnd?: { r: number; g: number; b: number }
  wordCycleMs?: number
}

const DEFAULT_WORDS = [
  "ELITE CUTS",
  "LUXURY GROOMING",
  "PREMIUM BARBER",
  "MODERN GENTLEMEN",
  "EXECUTIVE STYLE",
]

const COLOR_START = { r: 139, g: 105, b: 20 } // deep gold
const COLOR_END = { r: 245, g: 230, b: 168 } // light gold

export function ParticleTextEffect({
  words = DEFAULT_WORDS,
  colorStart = COLOR_START,
  colorEnd = COLOR_END,
  wordCycleMs = 3200,
}: ParticleTextEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef<Vector2D>({ x: -9999, y: -9999 })
  const [currentIndex, setCurrentIndex] = useState(0)
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      const rect = container.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      ctx.scale(dpr, dpr)
      sampleTextToParticles(words[currentIndex])
    }

    const sampleTextToParticles = (text: string) => {
      const rect = container.getBoundingClientRect()
      const w = rect.width
      const h = rect.height

      // Offscreen canvas to render text and sample pixels
      const off = document.createElement("canvas")
      off.width = w
      off.height = h
      const octx = off.getContext("2d")
      if (!octx) return

      octx.fillStyle = "#fff"
      octx.textAlign = "center"
      octx.textBaseline = "middle"

      // Dynamic font size based on canvas width
      const isMobile = w < 640
      const fontSize = Math.min(w * 0.14, 200)
      octx.font = `900 ${fontSize}px "Bebas Neue", "Oswald", sans-serif`

      // Measure
      const metrics = octx.measureText(text)
      const textWidth = metrics.width
      let scale = 1
      if (textWidth > w * 0.9) {
        scale = (w * 0.9) / textWidth
      }
      octx.save()
      octx.translate(w / 2, h / 2)
      octx.scale(scale, scale)
      octx.fillText(text, 0, 0)
      octx.restore()

      const imageData = octx.getImageData(0, 0, w, h).data

      const gap = isMobile ? 6 : 4
      const targets: Vector2D[] = []
      for (let y = 0; y < h; y += gap) {
        for (let x = 0; x < w; x += gap) {
          const idx = (y * w + x) * 4 + 3
          if (imageData[idx] > 128) {
            targets.push({ x, y })
          }
        }
      }

      // Reconcile particle count with target count
      const existing = particlesRef.current
      if (existing.length < targets.length) {
        for (let i = existing.length; i < targets.length; i++) {
          const p = new Particle()
          p.pos = {
            x: Math.random() * w,
            y: Math.random() * h,
          }
          p.target = { ...targets[i] }
          p.startColor = { ...colorStart }
          p.targetColor = { ...colorEnd }
          p.colorWeight = 0
          p.colorBlendRate = 0.008 + Math.random() * 0.02
          p.maxSpeed = 1.2 + Math.random() * 0.6
          p.maxForce = 0.08 + Math.random() * 0.04
          p.particleSize = isMobile ? 1.6 : 2.2
          existing.push(p)
        }
      } else if (existing.length > targets.length) {
        existing.length = targets.length
      }

      for (let i = 0; i < existing.length; i++) {
        existing[i].target = { ...targets[i] }
        existing[i].startColor = { ...colorStart }
        existing[i].targetColor = { ...colorEnd }
        existing[i].colorWeight = 0
      }
    }

    resize()

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 }
    }
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      }
    }

    const animate = () => {
      const w = canvas.width / dpr
      const h = canvas.height / dpr
      ctx.clearRect(0, 0, w, h)

      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      for (const p of particlesRef.current) {
        // Repel particles away from cursor within radius
        const dx = p.pos.x - mx
        const dy = p.pos.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        const repelRadius = 90
        if (dist < repelRadius && dist > 0) {
          const force = (repelRadius - dist) / repelRadius
          p.acc.x += (dx / dist) * force * 2.4
          p.acc.y += (dy / dist) * force * 2.4
        }
        p.move()
        p.draw(ctx, true)
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    window.addEventListener("resize", resize)
    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseleave", handleMouseLeave)
    canvas.addEventListener("touchmove", handleTouchMove, { passive: true })

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      window.removeEventListener("resize", resize)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
      canvas.removeEventListener("touchmove", handleTouchMove)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Cycle words
  useEffect(() => {
    const id = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length)
    }, wordCycleMs)
    return () => clearInterval(id)
  }, [words, wordCycleMs])

  // Resample on word change
  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = container.getBoundingClientRect()
    const w = rect.width
    const h = rect.height
    const text = words[currentIndex]

    const off = document.createElement("canvas")
    off.width = w
    off.height = h
    const octx = off.getContext("2d")
    if (!octx) return
    octx.fillStyle = "#fff"
    octx.textAlign = "center"
    octx.textBaseline = "middle"
    const isMobile = w < 640
    const fontSize = Math.min(w * 0.14, 200)
    octx.font = `900 ${fontSize}px "Bebas Neue", "Oswald", sans-serif`
    const metrics = octx.measureText(text)
    let scale = 1
    if (metrics.width > w * 0.9) scale = (w * 0.9) / metrics.width
    octx.save()
    octx.translate(w / 2, h / 2)
    octx.scale(scale, scale)
    octx.fillText(text, 0, 0)
    octx.restore()

    const imageData = octx.getImageData(0, 0, w, h).data
    const gap = isMobile ? 6 : 4
    const targets: Vector2D[] = []
    for (let y = 0; y < h; y += gap) {
      for (let x = 0; x < w; x += gap) {
        const idx = (y * w + x) * 4 + 3
        if (imageData[idx] > 128) targets.push({ x, y })
      }
    }

    const existing = particlesRef.current
    if (existing.length < targets.length) {
      for (let i = existing.length; i < targets.length; i++) {
        const p = new Particle()
        p.pos = { x: Math.random() * w, y: Math.random() * h }
        p.startColor = { ...colorStart }
        p.targetColor = { ...colorEnd }
        p.colorWeight = 0
        p.maxSpeed = 1.2 + Math.random() * 0.6
        p.maxForce = 0.08 + Math.random() * 0.04
        p.particleSize = isMobile ? 1.6 : 2.2
        existing.push(p)
      }
    } else if (existing.length > targets.length) {
      existing.length = targets.length
    }
    for (let i = 0; i < existing.length; i++) {
      existing[i].target = { ...targets[i] }
      existing[i].startColor = { ...colorStart }
      existing[i].targetColor = { ...colorEnd }
      existing[i].colorWeight = 0
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, words])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[50vh] min-h-[340px] sm:h-[60vh] md:h-[70vh] overflow-hidden"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      {/* Word indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {words.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            aria-label={`Show word ${i + 1}`}
            className={`h-[2px] transition-all duration-700 ${
              i === currentIndex ? "w-10 bg-gold-300" : "w-4 bg-noir-600"
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default ParticleTextEffect
