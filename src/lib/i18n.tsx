import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { L, Lang } from "@/data/salon";

const AR_DIGITS = "٠١٢٣٤٥٦٧٨٩";
export function toDigits(v: string | number, lang: Lang) {
  const s = String(v);
  return lang === "ar" ? s.replace(/\d/g, (d) => AR_DIGITS[+d]) : s;
}
export function formatPrice(n: number, lang: Lang) {
  return lang === "ar" ? `${toDigits(n.toLocaleString("en-US").replace(/,/g, "٬"), "ar")} ج.م` : `EGP ${n.toLocaleString("en-US")}`;
}

type Ctx = { lang: Lang; setLang: (l: Lang) => void; tr: (x: L) => string; dir: "rtl" | "ltr"; num: (v: string | number) => string; price: (n: number) => string };
const LangCtx = createContext<Ctx | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ar");
  useEffect(() => {
    const saved = localStorage.getItem("lamsa-lang");
    if (saved === "en" || saved === "ar") setLangState(saved);
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);
  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("lamsa-lang", l);
  };
  const value: Ctx = {
    lang, setLang, dir: lang === "ar" ? "rtl" : "ltr",
    tr: (x) => x[lang], num: (v) => toDigits(v, lang), price: (n) => formatPrice(n, lang),
  };
  return <LangCtx.Provider value={value}>{children}</LangCtx.Provider>;
}
export function useLang() {
  const c = useContext(LangCtx);
  if (!c) throw new Error("useLang outside provider");
  return c;
}
