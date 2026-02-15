"""Configuration settings for the backend"""

import os
from typing import Optional

class Settings:
    """Application settings"""
    APP_NAME: str = "Quantum Readiness Analyzer"
    APP_VERSION: str = "1.0.0"
    
    # CORS settings
    CORS_ORIGINS: list = [
        "http://localhost:5173",  # Vite dev server
        "http://localhost:3000",  # Alternative React dev server
        "http://localhost:8080",  # Alternative port
    ]
    
    # API settings
    API_PREFIX: str = "/api/v1"
    
    # Database (optional - for future use)
    DATABASE_URL: Optional[str] = None
    
    # Debug mode
    DEBUG: bool = os.getenv("DEBUG", "False") == "True"

settings = Settings()
