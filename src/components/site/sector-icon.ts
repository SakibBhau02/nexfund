import { createElement } from "react";
import {
  Egg,
  Factory,
  HeartPulse,
  Shirt,
  Store,
  Truck,
  Wheat,
  Cpu,
  type LucideIcon,
} from "lucide-react";

/**
 * R13: sector → icon mapping so a card/hero chip tells the sector at a glance
 * (user request: "সেটা কোন সেক্টরের মধ্যে পড়তেছে, আইকন দেখে যেন বোঝা যায়").
 * Matching is keyword-based over the EN sector string; unknown → Factory.
 */
const MAP: [string[], LucideIcon][] = [
  [["garment", "apparel", "textile", "rmg"], Shirt],
  [["agri", "agro", "food", "poultry", "egg", "farm", "crop"], Wheat],
  [["logistics", "cold", "transport", "fleet", "supply"], Truck],
  [["tech", "software", "it", "digital", "platform"], Cpu],
  [["retail", "shop", "commerce", "grocery"], Store],
  [["health", "pharma", "medical", "clinic"], HeartPulse],
  [["dairy", "hatchery"], Egg],
];

export function sectorIcon(sector: string): LucideIcon {
  const s = sector.toLowerCase();
  for (const [keys, icon] of MAP) {
    if (keys.some((k) => s.includes(k))) return icon;
  }
  return Factory;
}

/** Render helper — createElement keeps the react-hooks/static-components
 *  rule happy (no capitalized component assignment during render). */
export function SectorGlyph({
  sector,
  className,
}: {
  sector: string;
  className?: string;
}) {
  return createElement(sectorIcon(sector), { className, "aria-hidden": true });
}
