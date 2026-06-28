"use client";

import { useEffect, useRef } from "react";
import type { GlitchConfig } from "@/config/animationConfig";

interface Props {
  glitchConfig: GlitchConfig;
  seedHex: string | null;
}

export default function GlitchCanvas({ glitchConfig, seedHex }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

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

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!glitchConfig.enabled || !seedHex || glitchConfig.intensity <= 0) {
        animRef.current = requestAnimationFrame(draw);
        return;
      }

      // Random glitch slices
      if (Math.random() < glitchConfig.intensity * 0.3) {
        const sliceCount = Math.floor(glitchConfig.intensity * 8);
        for (let i = 0; i < sliceCount; i++) {
          const y = Math.random() * canvas.height;
          const h = Math.random() * 6 + 1;
          const offset = (Math.random() - 0.5) * glitchConfig.intensity * 60;
          const alpha = Math.random() * glitchConfig.intensity * 0.4;

          ctx.fillStyle = `${seedHex}${Math.round(alpha * 255).toString(16).padStart(2, "0")}`;
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
  }, [glitchConfig, seedHex]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}
