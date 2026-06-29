"use client";

import { useState, type KeyboardEvent } from "react";
import { useEmotionStore } from "@/store/emotionStore";

const MAX_LENGTH = 500;

export default function EmotionInput() {
  const [text, setText] = useState("");
  const { analyze, isLoading } = useEmotionStore();

  const handleSubmit = async () => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;
    await analyze(trimmed);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const remaining = MAX_LENGTH - text.length;
  const isNearLimit = remaining <= 50;
  const isAtLimit = remaining <= 0;

  return (
    <div className="relative w-full max-w-xl">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="지금 어떤 감정인지 자유롭게 써보세요..."
        disabled={isLoading}
        maxLength={MAX_LENGTH}
        rows={4}
        className="
          w-full resize-none rounded-3xl
          px-6 py-5 text-black placeholder-gray-500
          text-base leading-relaxed
          focus:outline-none
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all duration-300
        "
        style={{
          background: "rgba(255,255,255,0.45)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.6)",
          boxShadow: "0 4px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.7)",
        }}
      />
      <p
        className="text-right text-xs mt-1 pr-2 transition-colors duration-200"
        style={{ color: isAtLimit ? "#ef4444" : isNearLimit ? "#f97316" : "rgba(0,0,0,0.3)" }}
      >
        {text.length} / {MAX_LENGTH}
      </p>
      <button
        onClick={handleSubmit}
        disabled={isLoading || !text.trim()}
        className="
          mt-3 w-full py-3 rounded-2xl
          font-medium text-sm tracking-wide
          active:scale-[0.98]
          disabled:opacity-40 disabled:cursor-not-allowed
          transition-all duration-300
        "
        style={{
          background: isLoading
            ? "rgba(0,0,0,0.25)"
            : "rgba(0,0,0,0.55)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.25)",
          color: "rgba(255,255,255,0.92)",
          boxShadow: "0 2px 16px rgba(0,0,0,0.12)",
          letterSpacing: "0.08em",
        }}
      >
        {isLoading ? "느끼는 중..." : "감정 분석"}
      </button>
    </div>
  );
}
