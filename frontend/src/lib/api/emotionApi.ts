import type { AnalyzeRequest, AnalyzeResponse } from "@/types/emotion";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "https://fluid-emotion-spectrum-site.onrender.com";
const API_TOKEN = process.env.NEXT_PUBLIC_API_SECRET_TOKEN ?? "";

export async function analyzeEmotion(
  request: AnalyzeRequest
): Promise<AnalyzeResponse> {
  const res = await fetch(`${API_BASE}/api/v1/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-SECRET-TOKEN": API_TOKEN,
    },
    body: JSON.stringify(request),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "Unknown error" }));
    throw new Error(err.detail ?? `HTTP ${res.status}`);
  }

  return res.json() as Promise<AnalyzeResponse>;
}
