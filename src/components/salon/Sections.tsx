import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { categories, hours, offer, salon, services, stylists, t } from "@/data/salon";
import { useLang } from "@/lib/i18n";

export function Header() {
  const { tr, lang, setLang } = useLang();
  return (
    <header className="glass sticky top-0 z-40 mx-3 mt-3 flex items-center justify-between rounded-full px-4 py-2">
      <a href="#top" className="font-display text-lg font-bold text-gradient">{tr(salon.name)}</a>
      <nav className="hidden gap-5 text-sm md:flex">
        {(["services", "team", "booking", "visit"] as const).map((k) => (
          <a key={k} href={`#${k}`} className="hover:text-primary">{tr(t.nav[k])}</a>
        ))}
      </nav>
      <div className="flex rounded-full bg-muted p-1 text-xs font-bold">
        {(["ar", "en"] as const).map((l) => (
          <button key={l} onClick={() => setLang(l)} aria-pressed={lang === l}
            className={`rounded-full px-3 py-1 transition ${lang === l ? "bg-gradient-primary text-primary-foreground shadow-glow" : "text-muted-foreground"}`}>
            {l === "ar" ? "العربية" : "English"}
          </button>
        ))}
      </div>
    </header>
  );
}

const SPARKS = [[8, 20, 0], [85, 15, 0.6], [20, 70, 1.2], [70, 60, 0.3], [50, 30, 1.8], [92, 80, 0.9], [35, 88, 2.2], [60, 10, 1.5]];

export function Hero() {
  const { tr, lang } = useLang();
  const reduce = useReducedMotion();
  const words = tr(salon.tagline).split(" ");
  return (
    <section id="top" className="hero-bg relative mx-3 mt-4 overflow-hidden rounded-[2rem] px-6 pb-16 pt-20 text-center shadow-glow">
      {SPARKS.map(([x, y, d], i) => (
        <span key={i} aria-hidden className="sparkle absolute text-gold" style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${d}s`, fontSize: 10 + (i % 3) * 6 }}>✦</span>
      ))}
      <p className="relative mb-3 inline-block rounded-full glass px-4 py-1 text-sm font-bold text-primary">✦ {tr(salon.name)} ✦</p>
      <h1 key={lang} className="relative text-5xl font-bold leading-tight md:text-7xl">
        {words.map((w, i) => (
          <motion.span key={i} className="inline-block text-gradient px-1"
            initial={reduce ? false : { opacity: 0, y: 24, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.2 + i * 0.18, duration: 0.6 }}>{w}</motion.span>
        ))}
      </h1>
      <p className="relative mx-auto mt-4 max-w-md text-muted-foreground">{tr(salon.heroSub)}</p>
      <a href="#booking" className="relative mt-8 inline-block rounded-full bg-gradient-primary px-8 py-3 font-bold text-primary-foreground shadow-glow transition hover:scale-105">
        {tr(t.bookCta)} ✨
      </a>
    </section>
  );
}

export function SectionTitle({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="mb-6 text-center">
      <h2 className="text-3xl font-bold text-gradient">{title}</h2>
      {sub && <p className="mt-1 text-sm text-muted-foreground">{sub}</p>}
      <div className="mx-auto mt-2 h-1 w-12 rounded-full bg-gold" />
    </div>
  );
}

export function Services() {
  const { tr, num, price } = useLang();
  const [cat, setCat] = useState("hair");
  return (
    <section id="services" className="px-4 pt-16">
      <SectionTitle title={tr(t.servicesTitle)} sub={tr(t.servicesSub)} />
      <div className="no-scrollbar mb-5 flex gap-2 overflow-x-auto">
        {categories.map((c) => (
          <button key={c.id} onClick={() => setCat(c.id)}
            className={`shrink-0 rounded-full px-5 py-2 text-sm font-bold transition ${cat === c.id ? "bg-gradient-primary text-primary-foreground shadow-glow" : "glass"}`}>
            {tr(c.label)}
          </button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.filter((s) => s.cat === cat).map((s, i) => (
          <motion.article key={s.id}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: i * 0.1, duration: 0.5 }} whileHover={{ y: -6 }} whileTap={{ y: -4 }}
            className="glass shimmer flex gap-4 rounded-3xl p-5">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-primary text-2xl shadow-glow">{s.icon}</div>
            <div className="flex-1">
              <h3 className="text-lg font-bold">{tr(s.name)}</h3>
              <p className="text-sm text-muted-foreground">{tr(s.desc)}</p>
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">⏱ {num(s.minutes)} {tr(t.min)}</span>
                <span className="font-bold text-primary">{price(s.price)}</span>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export function Stars({ rating }: { rating: number }) {
  const { num } = useLang();
  return (
    <span className="text-sm text-gold">
      {"★".repeat(Math.round(rating))}<span className="ms-1 text-muted-foreground">{num(rating.toFixed(1))}</span>
    </span>
  );
}

export function Team() {
  const { tr } = useLang();
  return (
    <section id="team" className="px-4 pt-16">
      <SectionTitle title={tr(t.teamTitle)} sub={tr(t.teamSub)} />
      <div className="grid gap-4 sm:grid-cols-3">
        {stylists.map((s, i) => (
          <motion.div key={s.id} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            transition={{ delay: i * 0.12 }} className="glass flex items-center gap-4 rounded-3xl p-5 sm:flex-col sm:text-center">
            <div className={`grid h-16 w-16 shrink-0 place-items-center rounded-full bg-gradient-to-br ${s.gradient} font-display text-2xl font-bold text-primary-foreground shadow-glow ring-2 ring-gold`}>
              {tr(s.initials)}
            </div>
            <div>
              <h3 className="text-lg font-bold">{tr(s.name)}</h3>
              <p className="text-sm text-muted-foreground">{tr(s.specialty)}</p>
              <Stars rating={s.rating} />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function Offer() {
  const { tr, price } = useLang();
  return (
    <section className="px-4 pt-16">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="hero-bg shimmer relative overflow-hidden rounded-[2rem] border-2 border-gold p-6 text-center shadow-glow">
        <span className="inline-block rounded-full bg-gold px-3 py-1 text-xs font-bold text-primary-foreground">👑 {tr(offer.badge)}</span>
        <h2 className="mt-3 text-3xl font-bold">{tr(offer.title)}</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">{tr(offer.desc)}</p>
        <p className="mt-4">
          <span className="me-2 text-muted-foreground line-through">{price(offer.old)}</span>
          <span className="text-2xl font-bold text-primary">{price(offer.price)}</span>
        </p>
        <a href="#booking" className="mt-4 inline-block rounded-full bg-gradient-primary px-6 py-2 font-bold text-primary-foreground shadow-glow">{tr(offer.cta)}</a>
      </motion.div>
    </section>
  );
}

export function Visit() {
  const { tr } = useLang();
  return (
    <section id="visit" className="grid gap-4 px-4 pt-16 md:grid-cols-2">
      <div className="glass rounded-3xl p-6">
        <h3 className="mb-4 text-xl font-bold">🕐 {tr(t.hoursTitle)}</h3>
        {hours.map((h, i) => (
          <div key={i} className="flex justify-between border-b border-glass-border py-2 last:border-0">
            <span>{tr(h.day)}</span><span className="font-bold text-primary">{tr(h.time)}</span>
          </div>
        ))}
      </div>
      <div className="glass rounded-3xl p-6">
        <h3 className="mb-3 text-xl font-bold">📍 {tr(t.locationTitle)}</h3>
        <div className="hero-bg grid h-32 place-items-center rounded-2xl text-muted-foreground">🗺️ {tr(t.mapPh)}</div>
        <p className="mt-3 text-sm">{tr(salon.address)}</p>
        <p className="text-sm text-muted-foreground" dir="ltr">{salon.phone}</p>
      </div>
    </section>
  );
}

export function Footer() {
  const { tr } = useLang();
  return (
    <footer className="mt-16 px-4 pb-8 text-center text-sm text-muted-foreground">
      <p className="font-display text-xl font-bold text-gradient">{tr(salon.name)}</p>
      <p className="mt-1">{tr(salon.tagline)} ✦</p>
      <p className="mt-3">{tr(t.rights)}</p>
    </footer>
  );
}
