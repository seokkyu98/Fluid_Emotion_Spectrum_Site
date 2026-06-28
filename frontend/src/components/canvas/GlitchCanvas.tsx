"use client";

import { useEffect, useRef } from "react";
import type { EmotionVector } from "@/types/emotion";

interface Props {
  emotion: EmotionVector | null;
  seedHex: string | null;
}

export default function GlitchCanvas({ emotion, seedHex }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const triggerRef = useRef({
    time: 0,
    arousal: 0,
    dominanceLoss: 0,
    active: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    if (emotion) {
      triggerRef.current = {
        time: performance.now(),
        arousal: (emotion.arousal + 1) / 2,
        dominanceLoss: Math.max(0, (-emotion.dominance + 1) / 2 - 0.2),
        active: true,
      };
    }

    const draw = (ts: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!seedHex || !triggerRef.current.active) {
        animRef.current = requestAnimationFrame(draw);
        return;
      }

      const { time: triggerTime, arousal, dominanceLoss } = triggerRef.current;
      const elapsed = (ts - triggerTime) * 0.001;

      // Glitch decays faster for high arousal (more dramatic), slower for low
      const decayTau = arousal > 0.6 ? 1.2 : 3.5;
      const glitchEnvelope = dominanceLoss * Math.exp(-elapsed / decayTau);

      // Arousal burst adds extra glitch at trigger moment
      const burstBonus =
        arousal > 0.6
          ? (arousal - 0.6) * 0.8 * Math.exp(-elapsed / 0.25)
          : 0;

      const totalIntensity = glitchEnvelope + burstBonus;

      if (totalIntensity < 0.02) {
        animRef.current = requestAnimationFrame(draw);
        return;
      }

      if (Math.random() < totalIntensity * 0.45) {
        const sliceCount = Math.floor(totalIntensity * 12);
        for (let i = 0; i < sliceCount; i++) {
          const y = Math.random() * canvas.height;
          const h = Math.random() * 5 + 1;
          const offset = (Math.random() - 0.5) * totalIntensity * 70;
          const alpha = Math.random() * totalIntensity * 0.35;
          const hexAlpha = Math.round(alpha * 255)
            .toString(16)
            .padStart(2, "0");
          ctx.fillStyle = `${seedHex}${hexAlpha}`;
          ctx.fillRect(offset, y, canvas.width, h);
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [emotion, seedHex]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}
