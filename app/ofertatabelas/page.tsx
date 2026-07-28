import type { CSSProperties } from "react";
import { Montserrat } from "next/font/google";
import TravelSavingsFlow from "./TravelSavingsFlow";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

const theme = {
  "--travel-gradient": "linear-gradient(105deg, #0AD990 0%, #0AF578 100%)",
  "--travel-green": "#08c982",
} as CSSProperties;

export default function OfertaTabelasPage() {
  return (
    <main
      style={theme}
      className={`${montserrat.variable} min-h-screen bg-[#f8fffb] font-[family-name:var(--font-montserrat)] text-slate-950 selection:bg-emerald-100 selection:text-emerald-900`}
    >
      <TravelSavingsFlow />
    </main>
  );
}
