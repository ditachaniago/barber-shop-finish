"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Clock,
  MapPin,
  User,
  Scissors,
  Crown,
  Check,
  ChevronRight,
  Sparkles,
  MessageCircle,
  CreditCard,
  X,
  Armchair,
} from "lucide-react"
import { useTranslation } from "react-i18next"

type Step = 1 | 2 | 3 | 4 | 5

const SERVICES = [
  { key: "executive", price: "$180", duration: "60m", icon: Scissors },
  { key: "shave", price: "$120", duration: "45m", icon: Sparkles },
  { key: "beard", price: "$95", duration: "40m", icon: User },
  { key: "royal", price: "$420", duration: "120m", icon: Crown },
] as const

export function BookingSystem() {
  const { t } = useTranslation()
  const barbers = t("booking.barbers", { returnObjects: true }) as string[]
  const branches = t("booking.branches", { returnObjects: true }) as string[]
  const slots = t("booking.timeSlots", { returnObjects: true }) as string[]
  const serviceNames = t("services.items", { returnObjects: true }) as Array<{ name: string }>

  const [step, setStep] = useState<Step>(1)
  const [barber, setBarber] = useState("")
  const [branch, setBranch] = useState("")
  const [service, setService] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [isVip, setIsVip] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [confirmed, setConfirmed] = useState(false)

  const nextDays = useMemo(() => {
    const days: string[] = []
    const today = new Date()
    for (let i = 1; i <= 7; i++) {
      const d = new Date(today)
      d.setDate(today.getDate() + i)
      days.push(d.toISOString().slice(0, 10))
    }
    return days
  }, [])

  const canProceed = () => {
    if (step === 1) return !!barber
    if (step === 2) return !!branch
    if (step === 3) return !!service
    if (step === 4) return !!date && !!time
    if (step === 5) return !!name && !!email && !!phone
    return false
  }

  const handleConfirm = () => {
    setConfirmed(true)
  }

  const formatDay = (iso: string) => {
    const d = new Date(iso)
    return {
      day: d.toLocaleDateString("en", { weekday: "short" }).toUpperCase(),
      date: d.getDate(),
      month: d.toLocaleDateString("en", { month: "short" }),
    }
  }

  return (
    <div className="w-full relative">
      <AnimatePresence mode="wait">
        {!confirmed ? (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass rounded-sm p-6 md:p-10 relative overflow-hidden"
          >
            {/* Ambient glow */}
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-gold-300/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gold-500/5 rounded-full blur-[120px] pointer-events-none" />

            {/* Progress */}
            <div className="flex items-center justify-between mb-8 md:mb-12">
              {[1, 2, 3, 4, 5].map((s) => (
                <div key={s} className="flex items-center flex-1 last:flex-0">
                  <div
                    className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs md:text-sm font-medium transition-all duration-500 ${
                      step >= s
                        ? "bg-gradient-to-br from-gold-300 to-gold-600 text-noir-950"
                        : "bg-noir-800 text-noir-400 border border-noir-700"
                    }`}
                  >
                    {step > s ? <Check className="w-4 h-4" /> : s}
                  </div>
                  {s < 5 && (
                    <div
                      className={`flex-1 h-px mx-2 md:mx-4 transition-all duration-500 ${
                        step > s ? "bg-gold-300" : "bg-noir-700"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Step 1: Barber */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                key="step1"
              >
                <p className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-gold-300 mb-3">
                  01 — {t("booking.chooseBarber")}
                </p>
                <h3 className="font-display text-3xl md:text-5xl text-cream-50 mb-8">
                  {t("booking.chooseBarber")}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {barbers.map((b, i) => (
                    <button
                      key={b}
                      onClick={() => setBarber(b)}
                      className={`group relative p-6 rounded-sm text-left transition-all duration-500 overflow-hidden ${
                        barber === b
                          ? "bg-gradient-to-br from-gold-300/20 to-gold-600/5 border border-gold-300/50"
                          : "bg-noir-800/60 border border-noir-700 hover:border-gold-300/30"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold-300 to-gold-600 flex items-center justify-center text-noir-950 font-display text-xl">
                          {b.split(" ").slice(-1)[0]?.[0] || "M"}
                        </div>
                        <div className="flex-1">
                          <div className="font-display text-xl text-cream-50">{b}</div>
                          <div className="text-xs text-noir-300 tracking-wider uppercase">
                            Maître · 15+ yrs
                          </div>
                        </div>
                        <div className="flex flex-col gap-1">
                          {[...Array(5)].map((_, j) => (
                            <div
                              key={j}
                              className={`h-[2px] rounded-full transition-all ${
                                j < 5 - i * 0 ? "w-6 bg-gold-300" : "w-3 bg-noir-700"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      {barber === b && (
                        <motion.div
                          layoutId="selected"
                          className="absolute top-4 right-4 w-5 h-5 rounded-full bg-gold-300 flex items-center justify-center"
                        >
                          <Check className="w-3 h-3 text-noir-950" />
                        </motion.div>
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Branch */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                key="step2"
              >
                <p className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-gold-300 mb-3">
                  02 — {t("booking.chooseBranch")}
                </p>
                <h3 className="font-display text-3xl md:text-5xl text-cream-50 mb-8">
                  {t("booking.chooseBranch")}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {branches.map((br) => {
                    const city = br.split(" — ")[0]
                    const area = br.split(" — ")[1]
                    return (
                      <button
                        key={br}
                        onClick={() => setBranch(br)}
                        className={`p-6 rounded-sm text-left transition-all duration-500 border ${
                          branch === br
                            ? "bg-gradient-to-br from-gold-300/20 to-gold-600/5 border-gold-300/50"
                            : "bg-noir-800/60 border-noir-700 hover:border-gold-300/30"
                        }`}
                      >
                        <MapPin className="w-5 h-5 text-gold-300 mb-4" />
                        <div className="font-display text-2xl text-cream-50 mb-1">{city}</div>
                        <div className="text-sm text-noir-300 tracking-wide">{area}</div>
                        <div className="mt-4 text-[10px] tracking-[0.3em] uppercase text-gold-300/70">
                          Open today · 10:00 — 22:00
                        </div>
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {/* Step 3: Service */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                key="step3"
              >
                <p className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-gold-300 mb-3">
                  03 — {t("booking.chooseService")}
                </p>
                <h3 className="font-display text-3xl md:text-5xl text-cream-50 mb-8">
                  {t("booking.chooseService")}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {SERVICES.map((s, i) => {
                    const Icon = s.icon
                    return (
                      <button
                        key={s.key}
                        onClick={() => setService(s.key)}
                        className={`p-6 rounded-sm text-left transition-all duration-500 border group ${
                          service === s.key
                            ? "bg-gradient-to-br from-gold-300/20 to-gold-600/5 border-gold-300/50"
                            : "bg-noir-800/60 border-noir-700 hover:border-gold-300/30"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <Icon className="w-6 h-6 text-gold-300" />
                          <span className="text-[10px] tracking-[0.3em] uppercase text-noir-400">
                            0{i + 1}
                          </span>
                        </div>
                        <div className="font-display text-xl text-cream-50 mb-2">
                          {serviceNames[i]?.name}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-noir-300 mb-4">
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3 h-3" />
                            {s.duration}
                          </span>
                        </div>
                        <div className="text-gold-300 font-medium">{s.price}</div>
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {/* Step 4: Date & Time */}
            {step === 4 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                key="step4"
              >
                <p className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-gold-300 mb-3">
                  04 — {t("booking.chooseDate")}
                </p>
                <h3 className="font-display text-3xl md:text-5xl text-cream-50 mb-8">
                  {t("booking.chooseDate")}
                </h3>

                {/* VIP toggle */}
                <button
                  onClick={() => setIsVip(!isVip)}
                  className={`w-full mb-6 p-5 rounded-sm border flex items-center justify-between transition-all ${
                    isVip
                      ? "bg-gradient-to-r from-gold-300/20 to-gold-600/5 border-gold-300/50"
                      : "bg-noir-800/40 border-noir-700 hover:border-gold-300/30"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Crown className={`w-5 h-5 ${isVip ? "text-gold-300" : "text-noir-400"}`} />
                    <div className="text-left">
                      <div className="font-display text-lg text-cream-50">
                        {t("booking.vipRoom")}
                      </div>
                      <div className="text-xs text-noir-300">
                        +$80 · Private suite · Complimentary whiskey
                      </div>
                    </div>
                  </div>
                  <div
                    className={`w-10 h-5 rounded-full transition-all ${
                      isVip ? "bg-gold-300" : "bg-noir-700"
                    } relative`}
                  >
                    <div
                      className={`absolute top-0.5 w-4 h-4 rounded-full bg-noir-950 transition-all ${
                        isVip ? "left-5" : "left-0.5"
                      }`}
                    />
                  </div>
                </button>

                {/* Date grid */}
                <div className="grid grid-cols-7 gap-2 mb-6">
                  {nextDays.map((d) => {
                    const { day, date: num, month } = formatDay(d)
                    return (
                      <button
                        key={d}
                        onClick={() => setDate(d)}
                        className={`p-3 rounded-sm text-center transition-all border ${
                          date === d
                            ? "bg-gradient-to-br from-gold-300 to-gold-600 text-noir-950 border-gold-300"
                            : "bg-noir-800/40 border-noir-700 hover:border-gold-300/30 text-cream-50"
                        }`}
                      >
                        <div className="text-[9px] tracking-[0.2em] opacity-60">{day}</div>
                        <div className="font-display text-2xl leading-none my-1">{num}</div>
                        <div className="text-[9px] tracking-wider opacity-60">{month}</div>
                      </button>
                    )
                  })}
                </div>

                {/* Time slots */}
                <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
                  {slots.map((s) => (
                    <button
                      key={s}
                      onClick={() => setTime(s)}
                      className={`py-3 rounded-sm text-sm tracking-wider transition-all border ${
                        time === s
                          ? "bg-gold-300 text-noir-950 border-gold-300 font-medium"
                          : "bg-noir-800/40 border-noir-700 hover:border-gold-300/30 text-cream-100"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 5: Contact */}
            {step === 5 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                key="step5"
              >
                <p className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-gold-300 mb-3">
                  05 — {t("booking.confirm")}
                </p>
                <h3 className="font-display text-3xl md:text-5xl text-cream-50 mb-8">
                  {t("booking.confirm")}
                </h3>

                {/* Summary card */}
                <div className="glass-gold rounded-sm p-5 mb-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="text-[10px] tracking-[0.3em] uppercase text-noir-400 mb-1">
                        Maître
                      </div>
                      <div className="text-cream-50 font-medium">{barber}</div>
                    </div>
                    <div>
                      <div className="text-[10px] tracking-[0.3em] uppercase text-noir-400 mb-1">
                        Location
                      </div>
                      <div className="text-cream-50 font-medium">{branch}</div>
                    </div>
                    <div>
                      <div className="text-[10px] tracking-[0.3em] uppercase text-noir-400 mb-1">
                        Date
                      </div>
                      <div className="text-cream-50 font-medium">{date} · {time}</div>
                    </div>
                    <div>
                      <div className="text-[10px] tracking-[0.3em] uppercase text-noir-400 mb-1">
                        Seat
                      </div>
                      <div className="text-cream-50 font-medium flex items-center gap-1.5">
                        {isVip ? <Crown className="w-3 h-3 text-gold-300" /> : <Armchair className="w-3 h-3 text-gold-300" />}
                        {isVip ? "VIP Suite" : "Atelier"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t("booking.fullName")}
                    className="bg-noir-800/60 border border-noir-700 focus:border-gold-300/50 rounded-sm px-5 py-4 text-cream-50 placeholder:text-noir-500 outline-none transition-all"
                  />
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder={t("booking.email")}
                    className="bg-noir-800/60 border border-noir-700 focus:border-gold-300/50 rounded-sm px-5 py-4 text-cream-50 placeholder:text-noir-500 outline-none transition-all"
                  />
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    type="tel"
                    placeholder={t("booking.phone")}
                    className="md:col-span-2 bg-noir-800/60 border border-noir-700 focus:border-gold-300/50 rounded-sm px-5 py-4 text-cream-50 placeholder:text-noir-500 outline-none transition-all"
                  />
                </div>
              </motion.div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 md:mt-12 pt-6 border-t border-noir-800">
              <button
                onClick={() => step > 1 && setStep((step - 1) as Step)}
                className={`text-sm tracking-[0.2em] uppercase transition-all ${
                  step === 1
                    ? "opacity-30 pointer-events-none text-noir-500"
                    : "text-cream-100 hover:text-gold-300"
                }`}
              >
                ← Back
              </button>
              {step < 5 ? (
                <button
                  onClick={() => canProceed() && setStep((step + 1) as Step)}
                  disabled={!canProceed()}
                  className={`group flex items-center gap-3 px-6 md:px-8 py-3 rounded-sm transition-all ${
                    canProceed()
                      ? "bg-gradient-to-r from-gold-300 to-gold-600 text-noir-950 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
                      : "bg-noir-800 text-noir-500 cursor-not-allowed"
                  }`}
                >
                  <span className="text-xs tracking-[0.3em] uppercase font-medium">Continue</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              ) : (
                <button
                  onClick={handleConfirm}
                  disabled={!canProceed()}
                  className={`group flex items-center gap-3 px-6 md:px-8 py-3 rounded-sm transition-all ${
                    canProceed()
                      ? "bg-gradient-to-r from-gold-300 to-gold-600 text-noir-950 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
                      : "bg-noir-800 text-noir-500 cursor-not-allowed"
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span className="text-xs tracking-[0.3em] uppercase font-medium">
                    {t("booking.confirm")}
                  </span>
                </button>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="confirmed"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-sm p-10 md:p-16 text-center relative overflow-hidden"
          >
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-gold-300/20 rounded-full blur-[120px]" />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-20 h-20 mx-auto mb-8 rounded-full bg-gradient-to-br from-gold-300 to-gold-600 flex items-center justify-center"
            >
              <Check className="w-10 h-10 text-noir-950" strokeWidth={3} />
            </motion.div>
            <h3 className="font-display text-4xl md:text-6xl text-cream-50 mb-4">
              {t("booking.success")}
            </h3>
            <p className="text-noir-200 max-w-md mx-auto mb-10">
              {t("booking.successMsg")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(
                  `Reservation: ${barber} at ${branch} on ${date} ${time}`,
                )}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-sm bg-gradient-to-r from-gold-300 to-gold-600 text-noir-950 font-medium"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="text-xs tracking-[0.3em] uppercase">{t("booking.whatsapp")}</span>
              </a>
              <button
                onClick={() => {
                  setConfirmed(false)
                  setStep(1)
                  setBarber("")
                  setBranch("")
                  setService("")
                  setDate("")
                  setTime("")
                  setName("")
                  setEmail("")
                  setPhone("")
                }}
                className="flex items-center gap-2 px-6 py-3 rounded-sm border border-noir-700 text-cream-100 hover:border-gold-300/50"
              >
                <X className="w-4 h-4" />
                <span className="text-xs tracking-[0.3em] uppercase">New Booking</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default BookingSystem
