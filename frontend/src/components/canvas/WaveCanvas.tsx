"use client";

import { useEffect, useRef } from "react";
import type { DerivedPalette, EmotionVector } from "@/types/emotion";
import { fbm } from "@/lib/animation/noise";

interface Props {
  palette: DerivedPalette | null;
  emotion: EmotionVector | null;
}

const RING_STEPS = 160;

export default function WaveCanvas({ palette, emotion }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const triggerRef = useRef({ time: 0, arousal: 0.5, active: false });

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
        arousal: (emotion.arousal + 1) / 2, // normalize to [0, 1]
        active: true,
      };
    }

    const drawOrganicRing = (
      cx: number,
      cy: number,
      baseRadius: number,
      noiseAmp: number,
      txOff: number,
      tyOff: number,
      color: string,
      alpha: number
    ) => {
      if (alpha < 0.005 || baseRadius <= 0) return;
      ctx.beginPath();
      const step = (Math.PI * 2) / RING_STEPS;
      for (let i = 0; i <= RING_STEPS; i++) {
        const angle = i * step;
        const nx = Math.cos(angle) * 0.6 + txOff;
        const ny = Math.sin(angle) * 0.6 + tyOff;
        const n = fbm(nx, ny, 4);
        const r = Math.max(1, baseRadius + n * noiseAmp);
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      const hexAlpha = Math.round(Math.min(1, alpha) * 255)
        .toString(16)
        .padStart(2, "0");
      ctx.fillStyle = `${color}${hexAlpha}`;
      ctx.fill();
    };

    const draw = (ts: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!palette || !triggerRef.current.active) {
        animRef.current = requestAnimationFrame(draw);
        return;
      }

      const { time: triggerTime, arousal } = triggerRef.current;
      const elapsed = (ts - triggerTime) * 0.001; // seconds since trigger

      // === Amplitude envelope by arousal level ===
      let envelope: number;
      let shakeAmp: number;

      if (arousal >= 0.6) {
        // HIGH ENERGY: burst spike → long sustain decay
        const spike = 2.5 * Math.exp(-elapsed / 0.5);
        const sustain = 1.1 * Math.exp(-elapsed / 10);
        envelope = Math.max(spike, sustain);
        shakeAmp = Math.exp(-elapsed / 0.6) * 28 * ((arousal - 0.6) / 0.4);
      } else if (arousal <= 0.4) {
        // LOW ENERGY: slow ink-bloom rise → very slow decay
        const rise = 1 - Math.exp(-elapsed / 2.2);
        const decay = Math.exp(-Math.max(0, elapsed - 6) / 30);
        envelope = rise * decay;
        shakeAmp = 0;
      } else {
        // MEDIUM: moderate rise + long decay
        const mid = (arousal - 0.4) / 0.2;
        const rise = 1 - Math.exp(-elapsed / (1.8 - mid * 1.4));
        const spike = (1.5 + mid) * Math.exp(-elapsed / (1.2 - mid * 0.5));
        const decay = Math.exp(-Math.max(0, elapsed - 3) / (18 - mid * 6));
        envelope = Math.max(rise * decay, spike * 0.4);
        shakeAmp = Math.exp(-elapsed / 0.7) * 12 * mid;
      }

      // Idle floor: always retain subtle organic movement
      envelope = Math.max(envelope, 0.1 + arousal * 0.12);

      const time = ts * 0.001;
      const speed = 0.25 + arousal * 1.5;

      // Smooth noise-based shake for high arousal burst
      ctx.save();
      if (shakeAmp > 0.5) {
        const sx = fbm(time * 28, 0, 2) * shakeAmp;
        const sy = fbm(0, time * 22, 2) * shakeAmp;
        ctx.translate(sx, sy);
      }

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const maxR = Math.max(canvas.width, canvas.height) * 0.75;

      const baseAmp = (40 + arousal * 130) * envelope;
      const ringCount = 6 + Math.round(arousal * 6);
      const baseOpacity =
        (0.18 + arousal * 0.32) * Math.min(1, envelope * 2.0);

      // Outward ripple: rings expand outward from center over time
      const ripplePhase = elapsed * 0.4;

      for (let i = 0; i < ringCount; i++) {
        const progress = i / ringCount;

        // Ripple offset: each ring pulses outward with slight phase delay
        const rippleOffset = Math.sin(ripplePhase - i * 0.5) * 0.06 * envelope;
        const baseRadius = maxR * (0.06 + (progress + rippleOffset) * 0.9);

        // Alternating rotation direction per ring for visual variety
        const rotDir = i % 2 === 0 ? 1 : -0.6;
        const txOff = time * speed * 0.1 * rotDir + i * 0.8;
        const tyOff = time * speed * 0.07 * rotDir + i * 0.6;

        // Per-ring noise modulation for organic variation
        const ringNoise = (fbm(txOff * 0.25, tyOff * 0.25 + 50, 2) + 1) / 2;
        const ringAmp = baseAmp * (0.5 + ringNoise * 1.2);

        const opacityNoise =
          (fbm(txOff * 0.15 + 30, i * 1.1, 2) + 1) / 2;
        const ringOpacity = baseOpacity * (0.6 + opacityNoise * 0.9);

        const colorIdx = i % palette.gradient.length;
        drawOrganicRing(
          cx, cy, baseRadius, ringAmp,
          txOff, tyOff,
          palette.gradient[colorIdx],
          ringOpacity
        );
      }

      ctx.restore();
      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [palette, emotion]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
