"use client";

import { useMemo } from "react";
import { useEmotionStore } from "@/store/emotionStore";
import { toRadialGradientCSS } from "@/lib/palette/PaletteGenerator";
import Header from "@/components/ui/Header";
import EmotionInput from "@/components/ui/EmotionInput";
import EmotionDisplay from "@/components/ui/EmotionDisplay";
import WaveCanvas from "@/components/canvas/WaveCanvas";
import GlitchCanvas from "@/components/canvas/GlitchCanvas";

export default function HomePage() {
  const { current, palette, lerpProgress } = useEmotionStore();

  const backgroundStyle = useMemo(() => {
    if (!palette) return {};
    return {
      background: toRadialGradientCSS(palette),
      opacity: lerpProgress,
      transition: "opacity 0.1s linear",
    };
  }, [palette, lerpProgress]);

  return (
    <>
      <WaveCanvas palette={palette} emotion={current?.emotion ?? null} />
      <GlitchCanvas
        emotion={current?.emotion ?? null}
        seedHex={current?.seed_hex ?? null}
      />

      <main
        className="relative flex min-h-screen flex-col items-center justify-center px-4"
        style={{ zIndex: 10 }}
      >
        {palette && (
          <div
            className="fixed inset-0 pointer-events-none"
            style={backgroundStyle}
          />
        )}
        <Header />
        <EmotionInput />
        <EmotionDisplay />
      </main>
    </>
  );
}
