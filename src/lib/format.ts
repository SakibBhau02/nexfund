import type { Lang } from "./i18n";

/** Convert Latin digits to Bangla digits (০-৯) */
export function bnNum(n: number | string): string {
  const map = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(n).replace(/[0-9]/g, (d) => map[Number(d)]);
}

/**
 * Format a ticket size in lakh/crore (Bangladesh convention, blueprint §8.4).
 * @param valueInLakh e.g. 250 => ৳2.5 crore
 */
export function formatTk(valueInLakh: number, lang: Lang): string {
  const fmtNum = (v: number) =>
    v >= 100
      ? (v / 100).toFixed(v % 100 === 0 ? 0 : 1)
      : String(v);
  if (valueInLakh >= 100) {
    const cr = fmtNum(valueInLakh);
    return lang === "bn" ? `৳${bnNum(cr)} কোটি` : `৳${cr} crore`;
  }
  return lang === "bn" ? `৳${bnNum(valueInLakh)} লক্ষ` : `৳${valueInLakh} lakh`;
}

/** Format a lakh range, e.g. min=60 max=90 => "৳60–90 lakh" / "৳৬০–৯০ লক্ষ" */
export function formatTkRange(min: number, max: number, lang: Lang): string {
  if (min >= 100 && max >= 100) {
    const a = (min / 100).toFixed(min % 100 === 0 ? 0 : 1);
    const b = (max / 100).toFixed(max % 100 === 0 ? 0 : 1);
    return lang === "bn"
      ? `৳${bnNum(a)}–${bnNum(b)} কোটি`
      : `৳${a}–${b} crore`;
  }
  return lang === "bn"
    ? `৳${bnNum(min)}–${bnNum(max)} লক্ষ`
    : `৳${min}–${max} lakh`;
}
