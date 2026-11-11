import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { categories, hours, offer, salon, services, stylists, t } from "@/data/salon";
import { useLang } from "@/lib/i18n";
import { Collage } from "./Art";

export function Header() {
  const { tr, lang, setLang } = useLang();
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between border-b border-foreground bg-background px-4 py-3">
      <a href="#top" className="font-display text-xl font-bold text-secondary">{tr(salon.name)}</a>
      <nav className="hidden gap-6 text-xs font-bold uppercase tracking-widest md:flex">
        {(["services", "team", "booking", "visit"] as const).map((k) => (
          <a key={k} href={`#${k}`} className="hover:text-primary">{tr(t.nav[k])}</a>
        ))}
      </nav>
      <div className="flex border border-foreground text-xs font-bold">
        {(["ar", "en"] as const).map((l) => (
          <button key={l} onClick={() => setLang(l)} aria-pressed={lang === l}
            className={`px-3 py-1 ${lang === l ? "bg-foreground text-background" : ""}`}>
            {l === "ar" ? "العربية" : "English"}
          </button>
        ))}
      </div>
    </header>
  );
}

export function Hero() {
  const { tr, lang } = useLang();
  const reduce = useReducedMotion();
  const name = tr(salon.name);
  // Arabic letters must stay joined: animate words in Arabic, letters in English.
  const parts = lang === "ar" ? name.split(" ") : name.split("");
  return (
    <section id="top" className="relative overflow-hidden border-b border-foreground px-4 pb-12 pt-10">
      <Collage className="opacity-90" />
      <div className="relative">
        <p className="text-xs font-bold uppercase tracking-[0.3em]">{lang === "ar" ? "العدد ٠١ — جمال وموضة" : "Issue 01 — Beauty & Fashion"}</p>
        <h1 key={lang} aria-label={name} className="mt-4 font-display text-[22vw] font-bold leading-[0.85] text-secondary md:text-[11rem]">
          {parts.map((c, i) => (
            <motion.span key={i} aria-hidden className="inline-block whitespace-pre"
              initial={reduce ? false : { y: "100%", opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 + i * 0.07, duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}>
              {c}{lang === "ar" && i < parts.length - 1 ? " " : ""}
            </motion.span>
          ))}
        </h1>
        <p className="mt-6 max-w-md bg-background font-display text-3xl italic md:text-4xl">{tr(salon.tagline)}</p>
        <p className="mt-2 max-w-md bg-background text-muted-foreground">{tr(salon.heroSub)}</p>
        <a href="#booking" className="mt-8 inline-block bg-primary px-8 py-4 text-sm font-bold uppercase tracking-widest text-primary-foreground transition hover:bg-foreground hover:text-background">
          {tr(t.bookCta)}
        </a>
      </div>
    </section>
  );
}

export function Ticker() {
  const { tr, dir, price } = useLang();
  const items = [`${tr(offer.badge)}: ${tr(offer.title)} — ${price(offer.price)}`, ...services.slice(0, 6).map((s) => tr(s.name))];
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-b border-foreground bg-secondary py-3 text-secondary-foreground" aria-label={tr(offer.title)}>
      <div className={`flex w-max gap-8 whitespace-nowrap font-display text-2xl ${dir === "rtl" ? "ticker-rtl" : "ticker"}`}>
        {row.map((x, i) => <span key={i} aria-hidden={i >= items.length}>{x} <span className="text-primary">✦</span></span>)}
      </div>
    </div>
  );
}

export function SectionTitle({ title, sub, n }: { title: string; sub?: string; n?: string }) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4 border-b border-foreground pb-3">
      <h2 className="font-display text-5xl font-bold leading-none text-secondary md:text-7xl">{title}</h2>
      <div className="text-end">
        {n && <span className="block font-display text-4xl text-primary">{n}</span>}
        {sub && <p className="max-w-[14rem] text-xs text-muted-foreground">{sub}</p>}
      </div>
    </div>
  );
}

export function Services() {
  const { tr, num, price } = useLang();
  const [cat, setCat] = useState("hair");
  return (
    <section id="services" className="border-b border-foreground px-4 py-16">
      <SectionTitle title={tr(t.servicesTitle)} sub={tr(t.servicesSub)} n={num("01")} />
      <div className="no-scrollbar mb-6 flex overflow-x-auto border border-foreground">
        {categories.map((c) => (
          <button key={c.id} onClick={() => setCat(c.id)}
            className={`shrink-0 flex-1 border-e border-foreground px-5 py-3 text-sm font-bold uppercase tracking-wider last:border-e-0 ${cat === c.id ? "bg-foreground text-background" : ""}`}>
            {tr(c.label)}
          </button>
        ))}
      </div>
      <ol>
        {services.filter((s) => s.cat === cat).map((s, i) => (
          <motion.li key={s.id} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
            className="group relative border-b border-foreground">
            <span aria-hidden className="absolute inset-0 origin-left rtl:origin-right scale-x-0 bg-muted transition-transform duration-500 group-hover:scale-x-100" />
            <div className="relative grid grid-cols-[3rem_1fr_auto] items-baseline gap-3 py-5">
              <span className="font-display text-2xl text-primary">{num(String(i + 1).padStart(2, "0"))}</span>
              <div>
                <h3 className="font-display text-2xl font-bold md:text-3xl">{tr(s.name)}</h3>
                <p className="text-sm text-muted-foreground">{tr(s.desc)} · {num(s.minutes)} {tr(t.min)}</p>
              </div>
              <span className="font-bold">{price(s.price)}</span>
            </div>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}

export function Stars({ rating }: { rating: number }) {
  const { num } = useLang();
  return <span className="text-sm text-primary">{"★".repeat(Math.round(rating))}<span className="ms-1 text-muted-foreground">{num(rating.toFixed(1))}</span></span>;
}

const BLOCKS = ["bg-muted", "bg-secondary text-secondary-foreground", "bg-primary"];
export function Team() {
  const { tr, num } = useLang();
  return (
    <section id="team" className="border-b border-foreground px-4 py-16">
      <SectionTitle title={tr(t.teamTitle)} sub={tr(t.teamSub)} n={num("02")} />
      <div className="grid border border-foreground sm:grid-cols-3">
        {stylists.map((s, i) => (
          <div key={s.id} className="border-b border-foreground last:border-b-0 sm:border-b-0 sm:border-e sm:last:border-e-0">
            <div className={`relative grid h-40 place-items-center overflow-hidden ${BLOCKS[i % 3]}`}>
              <span className="absolute -bottom-10 h-28 w-28 rounded-t-full bg-background" />
              <span className="relative font-display text-7xl font-bold">{tr(s.initials)}</span>
            </div>
            <div className="p-4">
              <h3 className="font-display text-2xl font-bold">{tr(s.name)}</h3>
              <p className="text-sm text-muted-foreground">{tr(s.specialty)}</p>
              <Stars rating={s.rating} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Offer() {
  const { tr, price } = useLang();
  return (
    <section className="border-b border-foreground px-4 py-16">
      <div className="relative overflow-hidden bg-muted p-8">
        <span aria-hidden className="absolute -end-16 -top-16 h-56 w-56 rounded-full bg-primary" />
        <span aria-hidden className="absolute -bottom-20 start-10 h-40 w-32 rounded-t-full bg-secondary" />
        <div className="relative max-w-lg">
          <span className="inline-block bg-foreground px-3 py-1 text-xs font-bold uppercase tracking-widest text-background">{tr(offer.badge)}</span>
          <h2 className="mt-4 font-display text-5xl font-bold leading-none text-secondary md:text-6xl">{tr(offer.title)}</h2>
          <p className="mt-3">{tr(offer.desc)}</p>
          <p className="mt-4">
            <span className="me-3 text-muted-foreground line-through">{price(offer.old)}</span>
            <span className="font-display text-4xl font-bold">{price(offer.price)}</span>
          </p>
          <a href="#booking" className="mt-5 inline-block bg-primary px-6 py-3 text-sm font-bold uppercase tracking-widest text-primary-foreground hover:bg-foreground hover:text-background">{tr(offer.cta)}</a>
        </div>
      </div>
    </section>
  );
}

export function Visit() {
  const { tr } = useLang();
  return (
    <section id="visit" className="grid border-b border-foreground md:grid-cols-2">
      <div className="border-b border-foreground p-6 md:border-b-0 md:border-e">
        <h3 className="mb-4 font-display text-3xl font-bold text-secondary">{tr(t.hoursTitle)}</h3>
        {hours.map((h, i) => (
          <div key={i} className="flex justify-between border-b border-foreground py-2 last:border-0">
            <span>{tr(h.day)}</span><span className="font-bold">{tr(h.time)}</span>
          </div>
        ))}
      </div>
      <div className="p-6">
        <h3 className="mb-3 font-display text-3xl font-bold text-secondary">{tr(t.locationTitle)}</h3>
        <div className="relative grid h-32 place-items-center overflow-hidden bg-muted text-sm font-bold">
          <span aria-hidden className="absolute -start-6 -top-6 h-20 w-20 rounded-full bg-primary" />
          <span className="relative">{tr(t.mapPh)}</span>
        </div>
        <p className="mt-3 text-sm">{tr(salon.address)}</p>
        <p className="text-sm text-muted-foreground" dir="ltr">{salon.phone}</p>
      </div>
    </section>
  );
}

export function Footer() {
  const { tr } = useLang();
  return (
    <footer className="bg-secondary px-4 py-10 text-center text-sm text-secondary-foreground">
      <p className="font-display text-5xl font-bold">{tr(salon.name)}</p>
      <p className="mt-2 font-display text-xl italic">{tr(salon.tagline)}</p>
      <p className="mt-4 text-xs uppercase tracking-widest">{tr(t.rights)}</p>
    </footer>
  );
}
