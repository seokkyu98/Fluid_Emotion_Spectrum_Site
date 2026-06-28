import chroma from "chroma-js";
import type { EmotionVector, DerivedPalette } from "@/types/emotion";

// Generates a rich visual palette from a single seed hex color + emotion vector
export function generatePalette(
  seedHex: string,
  emotion: EmotionVector
): DerivedPalette {
  const base = chroma(seedHex);
  const { valence, arousal } = emotion;

  // Analogous colors: ±25°~40° on hue wheel, shifted by valence
  const hueShift = 25 + Math.abs(valence) * 15;
  const analogous: [string, string] = [
    base.set("hsl.h", `+${hueShift}`).hex(),
    base.set("hsl.h", `-${hueShift}`).hex(),
  ];

  // Complement: opposite hue, saturation boosted by arousal
  const complementSatBoost = 0.1 + arousal * 0.2;
  const complement = base
    .set("hsl.h", "+180")
    .set("hsl.s", Math.min(1, base.get("hsl.s") + complementSatBoost))
    .hex();

  // Gradient: 4 stops from dark→base→analogous→light
  // Lightness modulated by valence (positive = brighter)
  const lightnessOffset = valence * 0.15;
  const gradient: [string, string, string, string] = [
    chroma.mix(base, "#000000", 0.5).hex(),
    base.hex(),
    analogous[0],
    base.brighten(1 + lightnessOffset).hex(),
  ];

  // Text color: ensure readable contrast against base
  const textColor = base.luminance() > 0.35 ? "#111111" : "#FFFFFF";

  return {
    base: base.hex(),
    analogous,
    complement,
    gradient,
    textColor,
  };
}

// Creates a CSS radial gradient string for the wave background
export function toRadialGradientCSS(palette: DerivedPalette): string {
  const [stop0, stop1, stop2, stop3] = palette.gradient;
  return `radial-gradient(ellipse at center, ${stop3} 0%, ${stop1} 40%, ${stop2} 70%, ${stop0} 100%)`;
}
