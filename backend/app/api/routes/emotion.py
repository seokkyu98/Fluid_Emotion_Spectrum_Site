from fastapi import APIRouter, HTTPException
from app.schemas.emotion import AnalyzeRequest, AnalyzeResponse
from app.core.claude_client import analyze_emotion

router = APIRouter()


@router.post("/analyze", response_model=AnalyzeResponse)
async def analyze(request: AnalyzeRequest) -> AnalyzeResponse:
    try:
        return await analyze_emotion(request.text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
