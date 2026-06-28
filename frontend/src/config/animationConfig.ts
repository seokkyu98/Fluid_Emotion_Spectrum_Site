import type { EmotionVector } from "@/types/emotion";

export interface WaveConfig {
  speed: number;
  amplitude: number;
  ringCount: number;
  opacity: number;
}

export interface GlitchConfig {
  intensity: number;
  enabled: boolean;
}

export interface LerpConfig {
  durationMs: number;
}

export interface AnimationConfig {
  wave: WaveConfig;
  glitch: GlitchConfig;
  lerp: LerpConfig;
}

// Derives animation parameters from live emotion vector
export function deriveAnimationConfig(emotion: EmotionVector): AnimationConfig {
  const { arousal, dominance } = emotion;

  // Arousal drives wave speed and amplitude
  const normalizedArousal = (arousal + 1) / 2; // 0 ~ 1

  // Low dominance → more glitch (loss of control)
  const glitchIntensity = Math.max(0, (-dominance + 1) / 2 - 0.3);

  return {
    wave: {
      speed: 0.5 + normalizedArousal * 2.5,
      amplitude: 10 + normalizedArousal * 40,
      ringCount: 4 + Math.round(normalizedArousal * 3),
      opacity: 0.3 + normalizedArousal * 0.4,
    },
    glitch: {
      intensity: glitchIntensity,
      enabled: glitchIntensity > 0.1,
    },
    lerp: {
      durationMs: 800,
    },
  };
}
