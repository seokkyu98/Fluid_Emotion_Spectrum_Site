from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.routes.emotion import router as emotion_router

app = FastAPI(title="Fluid Emotion Spectrum API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(emotion_router, prefix=settings.api_prefix)


@app.get("/health")
async def health():
    return {"status": "ok"}
