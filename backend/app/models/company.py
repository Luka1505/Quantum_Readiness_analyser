"""Company data models"""

from pydantic import BaseModel
from typing import Optional, List
from enum import Enum

class IndustryType(str, Enum):
    """Industry classification"""
    FINANCE = "finance"
    HEALTHCARE = "healthcare"
    RETAIL = "retail"
    MANUFACTURING = "manufacturing"
    TECHNOLOGY = "technology"
    ENERGY = "energy"
    TELECOMMUNICATIONS = "telecommunications"
    OTHER = "other"

class QuantumReadiness(str, Enum):
    """Quantum readiness levels"""
    NOT_READY = "not_ready"
    BEGINNER = "beginner"
    INTERMEDIATE = "intermediate"
    ADVANCED = "advanced"
    EXPERT = "expert"

class CompanyInput(BaseModel):
    """Input model for company quantum readiness analysis"""
    company_name: str
    industry: IndustryType
    employees: int
    annual_revenue: float
    current_tech_maturity: int  # 1-10 scale
    quantum_awareness: bool
    has_it_team: bool
    budget_for_quantum: float
    primary_use_case: str
    timeline_expectations: str  # months/years
    
    class Config:
        json_schema_extra = {
            "example": {
                "company_name": "TechCorp Inc",
                "industry": "technology",
                "employees": 500,
                "annual_revenue": 50000000,
                "current_tech_maturity": 7,
                "quantum_awareness": True,
                "has_it_team": True,
                "budget_for_quantum": 500000,
                "primary_use_case": "Optimization problems",
                "timeline_expectations": "24 months"
            }
        }

class ReadinessScore(BaseModel):
    """Readiness score breakdown"""
    category: str
    score: float  # 0-100
    recommendation: str

class AnalysisReport(BaseModel):
    """Output model for analysis report"""
    company_name: str
    analysis_date: str
    readiness_level: QuantumReadiness
    overall_score: float  # 0-100
    readiness_scores: List[ReadinessScore]
    key_findings: List[str]
    recommendations: List[str]
    risk_factors: List[str]
    implementation_roadmap: List[str]
    estimated_timeline: str
    budget_estimate: float
    
    class Config:
        json_schema_extra = {
            "example": {
                "company_name": "TechCorp Inc",
                "analysis_date": "2026-02-14",
                "readiness_level": "intermediate",
                "overall_score": 65.5,
                "readiness_scores": [
                    {
                        "category": "Technical Infrastructure",
                        "score": 75.0,
                        "recommendation": "Consider upgrading cloud infrastructure"
                    }
                ],
                "key_findings": ["Strong IT team", "Limited quantum knowledge"],
                "recommendations": ["Partner with quantum vendors", "Train workforce"],
                "risk_factors": ["High implementation costs"],
                "implementation_roadmap": ["Phase 1: Assessment", "Phase 2: Pilot"],
                "estimated_timeline": "24 months",
                "budget_estimate": 1500000
            }
        }
