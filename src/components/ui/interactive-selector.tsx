"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, Scissors } from "lucide-react"

interface GalleryItem {
  id: number
  title: string
  subtitle: string
  image: string
  category: string
}

const GALLERY: GalleryItem[] = [
  {
    id: 1,
    title: "The Executive Suite",
    subtitle: "Private VIP atmosphere — Tokyo flagship",
    image:
      "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1600&q=80&auto=format&fit=crop",
    category: "Interior",
  },
  {
    id: 2,
    title: "Precision Cut",
    subtitle: "Signature sculpting by Maître Kenji",
    image:
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1600&q=80&auto=format&fit=crop",
    category: "Craft",
  },
  {
    id: 3,
    title: "Hot Towel Ritual",
    subtitle: "Eucalyptus steam & straight-razor",
    image:
      "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=1600&q=80&auto=format&fit=crop",
    category: "Ritual",
  },
  {
    id: 4,
    title: "The Lounge",
    subtitle: "Whiskey, leather, silence",
    image:
      "https://images.unsplash.com/photo-1622296089863-eb7fc530daa8?w=1600&q=80&auto=format&fit=crop",
    category: "Lounge",
  },
  {
    id: 5,
    title: "Beard Architecture",
    subtitle: "Designed. Never trimmed.",
    image:
      "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=1600&q=80&auto=format&fit=crop",
    category: "Signature",
  },
]

export function InteractiveSelector() {
  return (
    <div className="w-full grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 h-[60vh] min-h-[500px] md:h-[75vh]">
      {GALLERY.map((item, i) => (
        <motion.div
          key={item.id}
          className="relative group cursor-none overflow-hidden rounded-sm"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ flex: 3 }}
          style={{ flex: 1 }}
        >
          {/* Image */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
            style={{ backgroundImage: `url(${item.image})` }}
          />

          {/* Cinematic overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20 transition-opacity duration-700 group-hover:from-black/95" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          {/* Gold corner frame */}
          <div className="absolute top-4 left-4 w-8 h-8 border-l border-t border-gold-300/0 group-hover:border-gold-300/80 transition-all duration-500" />
          <div className="absolute top-4 right-4 w-8 h-8 border-r border-t border-gold-300/0 group-hover:border-gold-300/80 transition-all duration-500" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-l border-b border-gold-300/0 group-hover:border-gold-300/80 transition-all duration-500" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-r border-b border-gold-300/0 group-hover:border-gold-300/80 transition-all duration-500" />

          {/* Category tag */}
          <div className="absolute top-5 left-5 flex items-center gap-2">
            <span className="text-[10px] tracking-[0.3em] uppercase text-gold-300/90 font-medium">
              {item.category}
            </span>
            <span className="w-6 h-px bg-gold-300/60" />
            <span className="text-[10px] text-noir-300 tracking-widest">
              0{i + 1}
            </span>
          </div>

          {/* Content */}
          <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-700">
            <Scissors className="w-4 h-4 text-gold-300 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <h3 className="font-display text-xl md:text-2xl lg:text-3xl text-cream-50 leading-tight mb-2 opacity-90 group-hover:opacity-100">
              {item.title}
            </h3>
            <p className="text-xs md:text-sm text-noir-200 font-light tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-700 max-w-[90%]">
              {item.subtitle}
            </p>

            <div className="mt-4 flex items-center gap-2 text-gold-300 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100">
              <span className="text-[10px] tracking-[0.3em] uppercase">View</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>

          {/* Shine sweep */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-gold-300/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[1500ms]" />
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default InteractiveSelector
