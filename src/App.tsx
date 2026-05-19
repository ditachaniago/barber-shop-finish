import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import "@/i18n"
import { Navbar } from "@/components/Navbar"
import { CustomCursor, MouseLight } from "@/components/ui/custom-cursor"
import { LoadingScreen } from "@/components/ui/loading-screen"
import { HeroSection } from "@/components/sections/HeroSection"
import {
  AboutSection,
  ServicesSection,
  GallerySection,
} from "@/components/sections/AboutServices"
import { BookingSection } from "@/components/sections/BookingSection"
import {
  TeamSection,
  TestimonialsSection,
  MembershipSection,
} from "@/components/sections/TeamTestimonials"
import {
  AppSection,
  LocationSection,
  Footer,
} from "@/components/sections/AppLocationFooter"

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    if (loaded) {
      const t = setTimeout(() => setShowContent(true), 200)
      return () => clearTimeout(t)
    }
  }, [loaded])

  return (
    <div className="relative min-h-screen bg-noir-950 text-cream-50 overflow-x-hidden">
      {/* Cinematic ambient layer */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(212,175,55,0.08),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_30%_at_80%_80%,rgba(184,134,11,0.04),transparent)]" />
        <div className="lux-noise absolute inset-0" />
      </div>

      {/* Custom cursor */}
      <CustomCursor />
      <MouseLight />

      {/* Loading screen */}
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}

      {/* Main content */}
      {showContent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10"
        >
          <Navbar />
          <HeroSection />

          {/* Divider */}
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="lux-divider" />
          </div>

          <AboutSection />

          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="lux-divider" />
          </div>

          <ServicesSection />
          <GallerySection />

          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="lux-divider" />
          </div>

          <BookingSection />

          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="lux-divider" />
          </div>

          <TeamSection />
          <TestimonialsSection />
          <MembershipSection />

          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="lux-divider" />
          </div>

          <AppSection />
          <LocationSection />
          <Footer />
        </motion.div>
      )}
    </div>
  )
}
