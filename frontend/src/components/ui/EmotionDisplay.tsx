"use client";

import { useEmotionStore } from "@/store/emotionStore";
import { toKoreanLabel } from "@/config/emotionLabels";

export default function EmotionDisplay() {
  const { current, error } = useEmotionStore();

  if (error) {
    return (
      <div className="mt-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
        {error}
      </div>
    );
  }

  if (!current) return null;

  const { emotion, label } = current;

  return (
    <div className="mt-6 flex flex-col items-center gap-2 text-center">
      <span className="text-lg font-semibold text-black">
        {toKoreanLabel(label)}
      </span>
      <div className="flex gap-4 text-xs text-gray-500 tabular-nums">
        <span>긍부정 {emotion.valence >= 0 ? "+" : ""}{emotion.valence.toFixed(2)}</span>
        <span>활성도 {emotion.arousal >= 0 ? "+" : ""}{emotion.arousal.toFixed(2)}</span>
        <span>통제감 {emotion.dominance >= 0 ? "+" : ""}{emotion.dominance.toFixed(2)}</span>
      </div>
    </div>
  );
}
