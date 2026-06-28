function fade(t: number): number {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function hash(x: number, y: number): number {
  const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123;
  return n - Math.floor(n); // [0, 1)
}

// 2D value noise → [0, 1)
export function noise2D(x: number, y: number): number {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;
  const ux = fade(fx);
  const uy = fade(fy);
  const a = hash(ix, iy);
  const b = hash(ix + 1, iy);
  const c = hash(ix, iy + 1);
  const d = hash(ix + 1, iy + 1);
  return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy;
}

// Fractal Brownian Motion → approximately [-1, 1]
export function fbm(x: number, y: number, octaves = 4): number {
  let value = 0;
  let amplitude = 0.5;
  let frequency = 1;
  for (let i = 0; i < octaves; i++) {
    value += (noise2D(x * frequency, y * frequency) * 2 - 1) * amplitude;
    amplitude *= 0.5;
    frequency *= 2;
  }
  return value;
}
