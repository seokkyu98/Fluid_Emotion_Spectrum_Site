export interface EmotionVector {
  valence: number;   // -1.0 ~ 1.0
  arousal: number;   // -1.0 ~ 1.0
  dominance: number; // -1.0 ~ 1.0
}

export interface AnalyzeRequest {
  text: string;
}

export interface AnalyzeResponse {
  emotion: EmotionVector;
  seed_hex: string;  // "#RRGGBB" — backend provides base color only
  label: string;     // English slug, e.g. "anxious_relief"
}

export interface DerivedPalette {
  base: string;
  analogous: [string, string];
  complement: string;
  gradient: [string, string, string, string];
  textColor: string;
}

export interface EmotionState {
  current: AnalyzeResponse | null;
  previous: AnalyzeResponse | null;
  palette: DerivedPalette | null;
  isLoading: boolean;
  lerpProgress: number; // 0.0 ~ 1.0
  error: string | null;
}
