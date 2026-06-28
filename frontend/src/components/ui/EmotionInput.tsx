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
          w-full resize-none rounded-2xl
          border-2 border-black bg-white
          px-5 py-4 text-black placeholder-gray-400
          text-base leading-relaxed
          focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2
          disabled:opacity-60 disabled:cursor-not-allowed
          transition-shadow duration-200
          shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
        "
      />
      <p
        className="text-right text-xs mt-1 pr-1 transition-colors duration-200"
        style={{ color: isAtLimit ? "#ef4444" : isNearLimit ? "#f97316" : "#9ca3af" }}
      >
        {text.length} / {MAX_LENGTH}
      </p>
      <button
        onClick={handleSubmit}
        disabled={isLoading || !text.trim()}
        className="
          mt-2 w-full py-3 rounded-xl
          bg-black text-white font-medium text-sm
          hover:bg-gray-800 active:scale-[0.98]
          disabled:opacity-40 disabled:cursor-not-allowed
          transition-all duration-150
        "
      >
        {isLoading ? "분석 중..." : "감정 분석"}
      </button>
    </div>
  );
}
