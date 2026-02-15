"""Analysis routes"""

from fastapi import APIRouter, HTTPException
from typing import List
from ..models import CompanyInput, AnalysisReport
from ..services.analyzer import QuantumAnalyzer

router = APIRouter(prefix="/analysis", tags=["analysis"])
analyzer = QuantumAnalyzer()

@router.post("/analyze", response_model=AnalysisReport)
async def analyze_company(company_data: CompanyInput) -> AnalysisReport:
    """
    Analyze a company's quantum readiness
    
    Args:
        company_data: Company information for analysis
        
    Returns:
        AnalysisReport: Detailed quantum readiness analysis
    """
    try:
        report = analyzer.analyze(company_data)
        return report
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

@router.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "quantum-analyzer"}

@router.get("/industries")
async def get_industries():
    """Get list of supported industries"""
    return {
        "industries": [
            "finance",
            "healthcare",
            "retail",
            "manufacturing",
            "technology",
            "energy",
            "telecommunications",
            "other"
        ]
    }

@router.get("/readiness-levels")
async def get_readiness_levels():
    """Get list of readiness levels"""
    return {
        "levels": [
            "not_ready",
            "beginner",
            "intermediate",
            "advanced",
            "expert"
        ]
    }
