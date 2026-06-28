import json
import anthropic
from app.core.config import settings
from app.schemas.emotion import AnalyzeResponse, EmotionVector

_client = anthropic.Anthropic(api_key=settings.anthropic_api_key)

SYSTEM_PROMPT = """You are an emotion analysis engine.
Analyze the emotional content of the user's text and respond ONLY with a valid JSON object.
No explanation, no markdown, no extra text.

Rules:
- valence: -1.0 (very negative) to 1.0 (very positive)
- arousal: -1.0 (very calm) to 1.0 (very excited/agitated)
- dominance: -1.0 (powerless/submissive) to 1.0 (in control/dominant)
- seed_hex: A 6-digit hex color that visually represents the emotional tone (e.g. warm/cool, bright/dark)
- label: A concise English slug describing the emotion (snake_case, e.g. "anxious_relief", "calm_joy", "frustrated_anger")

Respond with exactly this JSON structure:
{
  "valence": <float>,
  "arousal": <float>,
  "dominance": <float>,
  "seed_hex": "<#RRGGBB>",
  "label": "<english_slug>"
}"""


async def analyze_emotion(text: str) -> AnalyzeResponse:
    message = _client.messages.create(
        model=settings.claude_model,
        max_tokens=256,
        system=SYSTEM_PROMPT,
        messages=[{"role": "user", "content": text}],
    )

    raw = message.content[0].text.strip()
    data = json.loads(raw)

    return AnalyzeResponse(
        emotion=EmotionVector(
            valence=data["valence"],
            arousal=data["arousal"],
            dominance=data["dominance"],
        ),
        seed_hex=data["seed_hex"],
        label=data["label"],
    )
