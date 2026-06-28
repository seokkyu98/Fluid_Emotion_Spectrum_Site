"use client";

import { useEffect, useRef } from "react";
import type { DerivedPalette } from "@/types/emotion";
import type { WaveConfig } from "@/config/animationConfig";

interface Props {
  palette: DerivedPalette | null;
  waveConfig: WaveConfig;
}

export default function WaveCanvas({ palette, waveConfig }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

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

    const draw = (ts: number) => {
      timeRef.current = ts * 0.001 * waveConfig.speed;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!palette) {
        animRef.current = requestAnimationFrame(draw);
        return;
      }

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const maxR = Math.max(canvas.width, canvas.height) * 0.8;

      for (let i = 0; i < waveConfig.ringCount; i++) {
        const progress = i / waveConfig.ringCount;
        const phase = timeRef.current + progress * Math.PI * 2;
        const radiusBase = maxR * progress;
        const wave = Math.sin(phase) * waveConfig.amplitude;
        const r = radiusBase + wave;

        const colorIndex = i % palette.gradient.length;
        const color = palette.gradient[colorIndex];

        const gradient = ctx.createRadialGradient(cx, cy, r * 0.8, cx, cy, r);
        gradient.addColorStop(0, `${color}00`);
        gradient.addColorStop(0.5, `${color}${Math.round(waveConfig.opacity * 255).toString(16).padStart(2, "0")}`);
        gradient.addColorStop(1, `${color}00`);

        ctx.beginPath();
        ctx.arc(cx, cy, Math.max(0, r), 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [palette, waveConfig]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
