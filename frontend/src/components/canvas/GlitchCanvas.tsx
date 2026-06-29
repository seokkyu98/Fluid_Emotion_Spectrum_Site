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

      // Glitch decays slower for more lasting impact
      const decayTau = arousal > 0.6 ? 3.0 : 8.0;
      const glitchEnvelope = dominanceLoss * Math.exp(-elapsed / decayTau);

      // Arousal burst adds extra glitch at trigger moment
      const burstBonus =
        arousal > 0.6
          ? (arousal - 0.6) * 1.4 * Math.exp(-elapsed / 0.6)
          : 0;

      const totalIntensity = glitchEnvelope + burstBonus;

      if (totalIntensity < 0.02) {
        animRef.current = requestAnimationFrame(draw);
        return;
      }

      // Parse seedHex into RGB components for channel splitting
      const r = parseInt(seedHex.slice(1, 3), 16);
      const g = parseInt(seedHex.slice(3, 5), 16);
      const b = parseInt(seedHex.slice(5, 7), 16);

      if (Math.random() < totalIntensity * 0.65) {
        const sliceCount = Math.floor(totalIntensity * 22);
        for (let i = 0; i < sliceCount; i++) {
          const y = Math.random() * canvas.height;
          const h = Math.random() * 8 + 1;
          const offset = (Math.random() - 0.5) * totalIntensity * 120;
          const alpha = Math.random() * totalIntensity * 0.55;

          // RGB channel split: red/green/blue shifted independently
          const channelShift = totalIntensity * 18;
          ctx.fillStyle = `rgba(${r},0,0,${alpha * 0.8})`;
          ctx.fillRect(offset - channelShift, y, canvas.width, h);
          ctx.fillStyle = `rgba(0,${g},0,${alpha * 0.8})`;
          ctx.fillRect(offset, y, canvas.width, h);
          ctx.fillStyle = `rgba(0,0,${b},${alpha * 0.8})`;
          ctx.fillRect(offset + channelShift, y, canvas.width, h);

          // Full color overlay on some slices
          if (Math.random() < 0.4) {
            ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
            ctx.fillRect(offset, y, canvas.width, h);
          }
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
