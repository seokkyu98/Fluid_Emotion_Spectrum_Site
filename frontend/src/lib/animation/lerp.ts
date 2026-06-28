export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function lerpColor(hexA: string, hexB: string, t: number): string {
  const parseHex = (hex: string) => ({
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  });

  const a = parseHex(hexA);
  const b = parseHex(hexB);

  const r = Math.round(lerp(a.r, b.r, t));
  const g = Math.round(lerp(a.g, b.g, t));
  const bVal = Math.round(lerp(a.b, b.b, t));

  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${bVal.toString(16).padStart(2, "0")}`;
}

// Easing: ease-in-out cubic
export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
