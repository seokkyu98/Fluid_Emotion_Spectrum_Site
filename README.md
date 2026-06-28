# Fluid Emotion Spectrum

사용자의 텍스트 감정을 실시간으로 분석하고, 3차원 감정 벡터(Valence/Arousal/Dominance) 기반의 동적 색상 파동으로 시각화하는 반응형 웹앱.

## 스택

| 레이어 | 기술 |
|--------|------|
| Backend | FastAPI + Claude Sonnet (`claude-sonnet-4-6`) |
| Frontend | Next.js 15 + Zustand + chroma-js + Tailwind CSS |
| 배포 | Backend → Render / Frontend → Vercel |
| 도메인 | Cloudflare |

## 로컬 실행

### Backend
```bash
cd backend
pip install -r requirements.txt
cp .env.example .env   # ANTHROPIC_API_KEY 입력
uvicorn app.main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## API 계약

`POST /api/v1/analyze`

**Request**
```json
{ "text": "오늘 발표가 잘 끝나서 기쁘다" }
```

**Response**
```json
{
  "emotion": { "valence": 0.8, "arousal": 0.5, "dominance": 0.6 },
  "seed_hex": "#F4A261",
  "label": "calm_joy"
}
```
