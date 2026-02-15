"""Quantum readiness analysis service"""

from datetime import datetime
from typing import List
from ..models import (
    CompanyInput, 
    AnalysisReport, 
    ReadinessScore,
    QuantumReadiness
)

class QuantumAnalyzer:
    """Service for analyzing quantum readiness"""
    
    def __init__(self):
        """Initialize the analyzer"""
        self.categories = [
            "Technical Infrastructure",
            "Workforce Skills",
            "Financial Readiness",
            "Leadership Support",
            "Strategic Alignment"
        ]
    
    def analyze(self, company_data: CompanyInput) -> AnalysisReport:
        """
        Perform quantum readiness analysis
        
        Args:
            company_data: Company information
            
        Returns:
            AnalysisReport: Analysis results
        """
        
        # Calculate readiness scores for each category
        readiness_scores = self._calculate_readiness_scores(company_data)
        overall_score = sum(score.score for score in readiness_scores) / len(readiness_scores)
        
        # Determine readiness level
        readiness_level = self._determine_readiness_level(overall_score)
        
        # Generate insights
        key_findings = self._generate_findings(company_data)
        recommendations = self._generate_recommendations(company_data, readiness_level)
        risk_factors = self._identify_risks(company_data)
        roadmap = self._create_roadmap(company_data, readiness_level)
        
        # Estimate budget
        budget_estimate = self._estimate_budget(company_data)
        
        report = AnalysisReport(
            company_name=company_data.company_name,
            analysis_date=datetime.now().strftime("%Y-%m-%d"),
            readiness_level=readiness_level,
            overall_score=round(overall_score, 1),
            readiness_scores=readiness_scores,
            key_findings=key_findings,
            recommendations=recommendations,
            risk_factors=risk_factors,
            implementation_roadmap=roadmap,
            estimated_timeline=self._estimate_timeline(company_data),
            budget_estimate=budget_estimate
        )
        
        return report
    
    def _calculate_readiness_scores(self, company_data: CompanyInput) -> List[ReadinessScore]:
        """Calculate readiness scores for each category"""
        scores = []
        
        # Technical Infrastructure (40% from tech maturity)
        tech_score = (company_data.current_tech_maturity / 10) * 40 + 60
        scores.append(ReadinessScore(
            category="Technical Infrastructure",
            score=min(tech_score, 100),
            recommendation="Upgrade cloud infrastructure and security protocols"
        ))
        
        # Workforce Skills (based on IT team and employees)
        workforce_score = 50 if company_data.has_it_team else 30
        workforce_score += min(company_data.employees / 100, 30)
        scores.append(ReadinessScore(
            category="Workforce Skills",
            score=min(workforce_score, 100),
            recommendation="Invest in quantum computing training programs"
        ))
        
        # Financial Readiness
        financial_ratio = (company_data.budget_for_quantum / (company_data.annual_revenue * 0.05)) * 50
        financial_score = min(financial_ratio + 40, 100)
        scores.append(ReadinessScore(
            category="Financial Readiness",
            score=financial_score,
            recommendation="Budget annually for quantum initiatives"
        ))
        
        # Leadership Support
        leadership_score = 60 if company_data.quantum_awareness else 40
        scores.append(ReadinessScore(
            category="Leadership Support",
            score=leadership_score,
            recommendation="Educate leadership on quantum computing benefits"
        ))
        
        # Strategic Alignment
        alignment_score = 70 if company_data.primary_use_case else 50
        scores.append(ReadinessScore(
            category="Strategic Alignment",
            score=alignment_score,
            recommendation="Align quantum initiatives with business goals"
        ))
        
        return scores
    
    def _determine_readiness_level(self, score: float) -> QuantumReadiness:
        """Determine readiness level based on score"""
        if score < 20:
            return QuantumReadiness.NOT_READY
        elif score < 40:
            return QuantumReadiness.BEGINNER
        elif score < 60:
            return QuantumReadiness.INTERMEDIATE
        elif score < 80:
            return QuantumReadiness.ADVANCED
        else:
            return QuantumReadiness.EXPERT
    
    def _generate_findings(self, company_data: CompanyInput) -> List[str]:
        """Generate key findings"""
        findings = []
        
        findings.append(f"Company operates in {company_data.industry.upper()} industry")
        findings.append(f"Organization size: {company_data.employees} employees")
        
        if company_data.quantum_awareness:
            findings.append("Leadership has quantum computing awareness")
        else:
            findings.append("Limited quantum computing knowledge in organization")
        
        if company_data.has_it_team:
            findings.append("Dedicated IT team available for implementation")
        else:
            findings.append("External partnerships may be needed for technical support")
        
        if company_data.current_tech_maturity >= 7:
            findings.append("Strong existing technology infrastructure")
        else:
            findings.append("Technology infrastructure needs updating")
        
        return findings
    
    def _generate_recommendations(self, company_data: CompanyInput, level: QuantumReadiness) -> List[str]:
        """Generate recommendations"""
        recommendations = [
            "Establish a quantum computing task force",
            "Partner with quantum technology vendors",
            "Develop a multi-year quantum strategy"
        ]
        
        if not company_data.quantum_awareness:
            recommendations.append("Conduct leadership awareness workshops")
        
        if not company_data.has_it_team:
            recommendations.append("Consider outsourcing partners for technical expertise")
        
        if company_data.current_tech_maturity < 7:
            recommendations.append("Modernize existing IT infrastructure first")
        
        if level == QuantumReadiness.NOT_READY:
            recommendations.append("Start with foundational quantum computing education")
        
        return recommendations
    
    def _identify_risks(self, company_data: CompanyInput) -> List[str]:
        """Identify potential risks"""
        risks = []
        
        if company_data.budget_for_quantum < 100000:
            risks.append("Limited budget may delay implementation")
        
        if not company_data.has_it_team:
            risks.append("Lack of internal expertise increases reliance on external partners")
        
        if company_data.current_tech_maturity < 5:
            risks.append("Legacy systems may complicate integration")
        
        if not company_data.quantum_awareness:
            risks.append("Organizational resistance to quantum initiatives")
        
        return risks
    
    def _create_roadmap(self, company_data: CompanyInput, level: QuantumReadiness) -> List[str]:
        """Create implementation roadmap"""
        roadmap = [
            "Phase 1: Assessment & Planning (Months 1-3)",
            "Phase 2: Pilot Project (Months 4-12)",
            "Phase 3: Team Building & Training (Months 6-18)",
            "Phase 4: Production Implementation (Months 13-24)",
            "Phase 5: Optimization & Scaling (Months 18+)"
        ]
        
        return roadmap
    
    def _estimate_timeline(self, company_data: CompanyInput) -> str:
        """Estimate implementation timeline"""
        if company_data.current_tech_maturity >= 8 and company_data.budget_for_quantum >= 500000:
            return "18-24 months"
        elif company_data.current_tech_maturity >= 6 and company_data.budget_for_quantum >= 250000:
            return "24-36 months"
        else:
            return "36-48 months"
    
    def _estimate_budget(self, company_data: CompanyInput) -> float:
        """Estimate total budget needed"""
        base_cost = 500000  # Base implementation cost
        
        # Adjust by company size
        size_multiplier = min(company_data.employees / 100, 3)
        
        # Adjust by complexity
        tech_factor = (10 - company_data.current_tech_maturity) / 10
        
        total = base_cost * (1 + size_multiplier) * (1 + tech_factor)
        
        return round(total, -3)  # Round to nearest 1000
