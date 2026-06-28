from pydantic import BaseModel, Field, field_validator
import re


class EmotionVector(BaseModel):
    valence: float = Field(..., ge=-1.0, le=1.0)
    arousal: float = Field(..., ge=-1.0, le=1.0)
    dominance: float = Field(..., ge=-1.0, le=1.0)


class AnalyzeRequest(BaseModel):
    text: str = Field(..., min_length=1, max_length=500)


class AnalyzeResponse(BaseModel):
    emotion: EmotionVector
    seed_hex: str = Field(..., pattern=r"^#[0-9A-Fa-f]{6}$")
    label: str  # English slug, e.g. "anxious_relief"

    @field_validator("seed_hex")
    @classmethod
    def validate_hex(cls, v: str) -> str:
        if not re.match(r"^#[0-9A-Fa-f]{6}$", v):
            raise ValueError("seed_hex must be a valid 6-digit hex color")
        return v.upper()
