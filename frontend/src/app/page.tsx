"use client";

import { useMemo } from "react";
import { useEmotionStore } from "@/store/emotionStore";
import { deriveAnimationConfig } from "@/config/animationConfig";
import { toRadialGradientCSS } from "@/lib/palette/PaletteGenerator";
import Header from "@/components/ui/Header";
import EmotionInput from "@/components/ui/EmotionInput";
import EmotionDisplay from "@/components/ui/EmotionDisplay";
import WaveCanvas from "@/components/canvas/WaveCanvas";
import GlitchCanvas from "@/components/canvas/GlitchCanvas";

export default function HomePage() {
  const { current, palette, lerpProgress } = useEmotionStore();

  const animConfig = useMemo(
    () =>
      current
        ? deriveAnimationConfig(current.emotion)
        : deriveAnimationConfig({ valence: 0, arousal: 0, dominance: 0 }),
    [current]
  );

  const backgroundStyle = useMemo(() => {
    if (!palette) return {};
    const gradient = toRadialGradientCSS(palette);
    return {
      background: gradient,
      opacity: lerpProgress,
      transition: "opacity 0.1s linear",
    };
  }, [palette, lerpProgress]);

  return (
    <>
      {/* Canvas layers — completely separated from DOM for performance */}
      <WaveCanvas palette={palette} waveConfig={animConfig.wave} />
      <GlitchCanvas
        glitchConfig={animConfig.glitch}
        seedHex={current?.seed_hex ?? null}
      />

      {/* Gradient background overlay */}
      {palette && (
        <div
          className="fixed inset-0 pointer-events-none"
          style={{ ...backgroundStyle, zIndex: 2 }}
        />
      )}

      {/* Main UI layer */}
      <main
        className="relative flex min-h-screen flex-col items-center justify-center px-4"
        style={{ zIndex: 10 }}
      >
        <Header />
        <EmotionInput />
        <EmotionDisplay />
      </main>
    </>
  );
}
