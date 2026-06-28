from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    anthropic_api_key: str
    api_secret_token: str
    claude_model: str = "claude-sonnet-4-6"
    allowed_origins: list[str] = [
        "http://localhost:3000",
        "https://fluid-emotion-spectrum-site.vercel.app",
        "https://fluid-emotion-spectrum-site-iunoj6iwf-seokkyu.vercel.app",
        "https://fluid-emotion-spectrum.com",
        "https://www.fluid-emotion-spectrum.com",
    ]
    api_prefix: str = "/api/v1"

    class Config:
        env_file = ".env"


settings = Settings()
