// English slug → Korean display label mapping
export const EMOTION_LABELS: Record<string, string> = {
  // Positive high arousal
  joyful_excitement: "기쁜 흥분",
  euphoric_bliss: "황홀한 기쁨",
  passionate_love: "열정적인 사랑",
  thrilling_adventure: "짜릿한 설렘",
  confident_pride: "자신감 넘치는 자부심",

  // Positive low arousal
  calm_joy: "잔잔한 기쁨",
  peaceful_contentment: "평온한 만족",
  gentle_happiness: "포근한 행복",
  serene_gratitude: "고요한 감사",
  warm_nostalgia: "따뜻한 그리움",

  // Negative high arousal
  anxious_panic: "불안한 공황",
  frustrated_anger: "좌절한 분노",
  furious_rage: "격렬한 분노",
  terrified_fear: "극심한 공포",
  desperate_urgency: "절박한 긴박감",

  // Negative low arousal
  deep_sadness: "깊은 슬픔",
  lonely_melancholy: "외로운 우울",
  hopeless_despair: "희망 없는 절망",
  empty_numbness: "공허한 무감각",
  bitter_disappointment: "쓴 실망",

  // Mixed / complex
  anxious_relief: "긴장된 안도감",
  bittersweet_longing: "달콤쌉쌀한 그리움",
  conflicted_ambivalence: "갈등하는 양가감정",
  melancholic_acceptance: "우울한 수용",
  nostalgic_warmth: "향수 어린 온기",
  cautious_optimism: "조심스러운 낙관",
  nervous_anticipation: "긴장된 기대",
  overwhelmed_gratitude: "벅찬 감사",

  // Neutral
  neutral_calm: "중립적인 평온",
  curious_interest: "호기심 어린 관심",
  focused_determination: "집중된 결의",
};

export function toKoreanLabel(slug: string): string {
  return EMOTION_LABELS[slug] ?? slug.replace(/_/g, " ");
}
