from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    anthropic_api_key: str
    claude_model: str = "claude-sonnet-4-6"
    allowed_origins: list[str] = ["http://localhost:3000", "https://*.vercel.app"]
    api_prefix: str = "/api/v1"

    class Config:
        env_file = ".env"


settings = Settings()
