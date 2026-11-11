import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import { anyStylist, services, stylists, t, timeSlots } from "@/data/salon";
import { useLang } from "@/lib/i18n";
import { SectionTitle } from "./Sections";

function nextDays(n: number) {
  const base = new Date();
  base.setHours(0, 0, 0, 0);
  return Array.from({ length: n }, (_, i) => new Date(base.getTime() + i * 86400000));
}
// deterministic "booked" slots per date
function isBooked(d: Date, slot: string) {
  const h = parseInt(slot);
  return (d.getDate() * 7 + h * 3) % 5 === 0;
}


export function Booking() {
  const { tr, num, price, lang, dir } = useLang();
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [sel, setSel] = useState<string[]>([]);
  const [stylist, setStylist] = useState("any");
  const [date, setDate] = useState<number | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", notes: "" });
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const days = useMemo(() => nextDays(14), []);
  const locale = lang === "ar" ? "ar-EG" : "en-GB";

  const chosen = services.filter((s) => sel.includes(s.id));
  const total = chosen.reduce((a, s) => a + s.price, 0);
  const sign = dir === "rtl" ? -1 : 1;
  const variants = {
    // page turn: hinge on the spine (start edge going forward), direction-aware for RTL/LTR
    enter: (d: number) => (reduce ? { opacity: 0 } : { rotateY: d * sign * -75, opacity: 0, transformOrigin: (d * sign > 0) ? "left center" : "right center" }),
    center: { rotateY: 0, opacity: 1 },
    exit: (d: number) => (reduce ? { opacity: 0 } : { rotateY: d * sign * 75, opacity: 0, transformOrigin: (d * sign > 0) ? "left center" : "right center" }),
  };

  const validate = () => {
    if (step === 0 && !sel.length) return tr(t.errService);
    if (step === 2 && (date === null || !slot)) return tr(t.errSlot);
    if (step === 3) {
      if (!form.name.trim()) return tr(t.errName);
      const digits = form.phone.replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d))).replace(/\D/g, "");
      if (!/^01\d{9}$/.test(digits)) return tr(t.errPhone);
    }
    return null;
  };
  const go = (d: number) => {
    if (d > 0) {
      const e = validate();
      setError(e);
      if (e) return;
      if (step === 3) return setDone(true);
    } else setError(null);
    setDirection(d);
    setStep((s) => s + d);
  };
  const reset = () => { setDone(false); setStep(0); setSel([]); setStylist("any"); setDate(null); setSlot(null); setForm({ name: "", phone: "", notes: "" }); };

  const stylistName = stylist === "any" ? tr(anyStylist) : tr(stylists.find((s) => s.id === stylist)!.name);
  const input = "w-full border-0 border-b border-foreground bg-transparent px-1 py-3 outline-none focus:border-primary focus:border-b-2";

  return (
    <section id="booking" className="border-b border-foreground px-4 py-16">
      <SectionTitle title={tr(t.bookingTitle)} n={num("03")} />
      <div className="mx-auto max-w-xl overflow-hidden border border-foreground bg-background p-5 [perspective:1400px]">
        {done ? (
          <div className="relative py-10 text-center">
            <motion.div aria-hidden className="mx-auto inline-block -rotate-12 border-4 border-secondary px-6 py-2 font-display text-5xl font-bold uppercase tracking-widest text-secondary"
              initial={reduce ? false : { scale: 2.6, opacity: 0, rotate: -30 }} animate={{ scale: 1, opacity: 1, rotate: -12 }}
              transition={{ type: "spring", stiffness: 420, damping: 18 }}>
              {lang === "ar" ? "مؤكَّد" : "Confirmed"}
            </motion.div>
            <h3 className="mt-8 font-display text-3xl font-bold">{tr(t.successTitle)}</h3>
            <p className="mt-2 text-muted-foreground">{tr(t.successSub).replace(/\p{Extended_Pictographic}\uFE0F?/gu, "").trim()}</p>
            <button onClick={reset} className="mt-6 bg-primary px-6 py-3 text-sm font-bold uppercase tracking-widest text-primary-foreground">{tr(t.newBooking)}</button>
          </div>
        ) : (
          <>
            <div className="mb-2 flex justify-between text-xs font-bold text-muted-foreground">
              {t.steps.map((s, i) => <span key={i} className={i <= step ? "text-primary" : ""}>{num(i + 1)}. {tr(s)}</span>)}
            </div>
            <div className="mb-5 h-1 overflow-hidden bg-muted">
              <motion.div className="h-full bg-secondary" animate={{ width: `${((step + 1) / 4) * 100}%` }} transition={{ duration: 0.5 }} />
            </div>
            <p className="mb-4 font-display text-2xl font-bold">{tr(t.stepHint[step]!)}</p>

            <div className="relative min-h-[300px]">
              <AnimatePresence mode="wait" custom={direction} initial={false}>
                <motion.div key={`${step}-${lang}`} custom={direction} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                  {step === 0 && (
                    <div className="grid max-h-[340px] gap-2 overflow-y-auto pe-1">
                      {services.map((s) => {
                        const on = sel.includes(s.id);
                        return (
                          <button key={s.id} onClick={() => setSel(on ? sel.filter((x) => x !== s.id) : [...sel, s.id])}
                            className={`flex items-center gap-3 border-b border-foreground p-3 text-start transition ${on ? "bg-muted" : "hover:bg-muted/50"}`}>
                                                        <span className="flex-1 font-bold">{tr(s.name)}</span>
                            <span className="text-sm text-primary">{price(s.price)}</span>
                            <span className={`grid h-5 w-5 place-items-center text-xs ${on ? "bg-foreground text-background" : "border border-foreground"}`}>{on ? "✓" : ""}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                  {step === 1 && (
                    <div className="grid gap-3">
                      {[{ id: "any", label: tr(anyStylist), sub: "", grad: "bg-muted", init: "✦" }, ...stylists.map((s) => ({ id: s.id, label: tr(s.name), sub: tr(s.specialty), grad: ["bg-primary","bg-secondary text-secondary-foreground","bg-muted"][stylists.indexOf(s) % 3]!, init: tr(s.initials) }))].map((o) => (
                        <button key={o.id} onClick={() => setStylist(o.id)}
                          className={`flex items-center gap-3 border border-foreground p-3 text-start transition ${stylist === o.id ? "bg-muted" : ""}`}>
                          <span className={`grid h-11 w-11 place-items-center rounded-full ${o.grad} font-display text-xl font-bold`}>{o.init}</span>
                          <span><span className="block font-bold">{o.label}</span><span className="text-sm text-muted-foreground">{o.sub}</span></span>
                        </button>
                      ))}
                    </div>
                  )}
                  {step === 2 && (
                    <div>
                      <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-2">
                        {days.map((d, i) => (
                          <button key={i} onClick={() => { setDate(i); setSlot(null); }}
                            className={`flex w-16 shrink-0 flex-col items-center border border-foreground py-3 transition ${date === i ? "bg-foreground text-background" : ""}`}>
                            <span className="text-xs">{i === 0 ? tr(t.today) : d.toLocaleDateString(locale, { weekday: "short" })}</span>
                            <span className="text-xl font-bold">{num(d.getDate())}</span>
                            <span className="text-xs">{d.toLocaleDateString(locale, { month: "short" })}</span>
                          </button>
                        ))}
                      </div>
                      {date !== null && (
                        <div className="mt-4 grid grid-cols-3 gap-2">
                          {timeSlots.map((s) => {
                            const booked = isBooked(days[date]!, s);
                            const h = parseInt(s);
                            const label = lang === "ar" ? `${num(h > 12 ? h - 12 : h)}:${num("00")} ${h >= 12 ? "م" : "ص"}` : `${h > 12 ? h - 12 : h}:00 ${h >= 12 ? "pm" : "am"}`;
                            return (
                              <motion.button key={s} disabled={booked} onClick={() => setSlot(s)}
                                whileTap={reduce || booked ? {} : { scale: 0.88, rotate: -3 }}
                                animate={slot === s && !reduce ? { scale: [1.12, 0.94, 1], rotate: [-4, 2, 0] } : { scale: 1, rotate: 0 }}
                                transition={{ duration: 0.28 }}
                                className={`border-2 py-2 text-sm font-bold ${booked ? "cursor-not-allowed border-muted text-muted-foreground line-through opacity-50" : slot === s ? "border-primary bg-primary text-primary-foreground" : "border-foreground"}`}
                                title={booked ? tr(t.unavailable) : undefined}>
                                {label}
                              </motion.button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                  {step === 3 && (
                    <div className="grid gap-3">
                      <label className="text-sm font-bold">{tr(t.name)}<input className={`${input} mt-1`} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
                      <label className="text-sm font-bold">{tr(t.phone)}<input className={`${input} mt-1`} inputMode="tel" dir="ltr" placeholder="01xxxxxxxxx" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></label>
                      <label className="text-sm font-bold">{tr(t.notes)}<textarea rows={2} className={`${input} mt-1`} placeholder={tr(t.notesPh)} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} /></label>
                      <div className="bg-muted p-4 text-sm">
                        <p className="mb-2 font-display font-bold">{tr(t.summary)}</p>
                        {chosen.map((s) => <p key={s.id} className="flex justify-between"><span>{tr(s.name)}</span><span>{price(s.price)}</span></p>)}
                        <p className="mt-2 text-muted-foreground">{stylistName}</p>
                        {date !== null && <p className="text-muted-foreground">{days[date]!.toLocaleDateString(locale, { weekday: "long", day: "numeric", month: "long" })} — {slot && num(slot)}</p>}
                        <p className="mt-2 flex justify-between border-t border-foreground pt-2 font-bold"><span>{tr(t.total)}</span><span>{price(total)}</span></p>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {error && <p role="alert" className="mt-3 border-s-4 border-secondary bg-muted px-3 py-2 text-sm font-bold text-secondary">{error}</p>}
            <div className="mt-5 flex gap-3">
              {step > 0 && <button onClick={() => go(-1)} className="border border-foreground px-6 py-3 text-sm font-bold uppercase tracking-widest">{tr(t.back)}</button>}
              <button onClick={() => go(1)} className="flex-1 bg-primary py-3 text-sm font-bold uppercase tracking-widest text-primary-foreground hover:bg-foreground hover:text-background">
                {step === 3 ? tr(t.submit) : tr(t.next)}
              </button>
            </div>
          </>
        )}
      </div>
      <p className="mt-3 text-center text-sm font-bold text-muted-foreground">{tr(t.demoNote)}</p>
    </section>
  );
}
