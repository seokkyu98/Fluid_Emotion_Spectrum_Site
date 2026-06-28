from fastapi import APIRouter, HTTPException, Depends, Header
from app.schemas.emotion import AnalyzeRequest, AnalyzeResponse
from app.core.claude_client import analyze_emotion
from app.core.config import settings

router = APIRouter()


def verify_token(x_api_secret_token: str = Header(...)):
    if x_api_secret_token != settings.api_secret_token:
        raise HTTPException(status_code=401, detail="Unauthorized")


@router.post("/analyze", response_model=AnalyzeResponse)
async def analyze(
    request: AnalyzeRequest,
    _: None = Depends(verify_token),
) -> AnalyzeResponse:
    try:
        return await analyze_emotion(request.text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
