"use client";

import { create } from "zustand";
import type { EmotionState, AnalyzeResponse } from "@/types/emotion";
import { generatePalette } from "@/lib/palette/PaletteGenerator";
import { analyzeEmotion } from "@/lib/api/emotionApi";
import { easeInOutCubic } from "@/lib/animation/lerp";

interface EmotionStore extends EmotionState {
  analyze: (text: string) => Promise<void>;
  reset: () => void;
}

const LERP_DURATION_MS = 800;

export const useEmotionStore = create<EmotionStore>((set, get) => ({
  current: null,
  previous: null,
  palette: null,
  isLoading: false,
  lerpProgress: 1,
  error: null,

  analyze: async (text: string) => {
    set({ isLoading: true, error: null });

    try {
      const response: AnalyzeResponse = await analyzeEmotion({ text });
      const palette = generatePalette(response.seed_hex, response.emotion);

      set((state) => ({
        previous: state.current,
        current: response,
        palette,
        isLoading: false,
        lerpProgress: 0,
      }));

      // Animate lerp progress 0 → 1
      const start = performance.now();
      const tick = () => {
        const elapsed = performance.now() - start;
        const raw = Math.min(elapsed / LERP_DURATION_MS, 1);
        const eased = easeInOutCubic(raw);
        set({ lerpProgress: eased });
        if (raw < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    } catch (err) {
      set({
        isLoading: false,
        error: err instanceof Error ? err.message : "분석 중 오류가 발생했습니다",
      });
    }
  },

  reset: () =>
    set({
      current: null,
      previous: null,
      palette: null,
      isLoading: false,
      lerpProgress: 1,
      error: null,
    }),
}));
