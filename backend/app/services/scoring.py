"""
Quantum Readiness Scoring Service
Enterprise-grade deterministic scoring engine
with dynamic quantum simulation integration.
"""

from typing import Dict, Any
import math
import random

# Optional import (safe fallback if Qiskit not installed)
try:
    from app.services.quantum_engine import run_dynamic_quantum_simulation
    QUANTUM_ENGINE_AVAILABLE = True
except Exception:
    QUANTUM_ENGINE_AVAILABLE = False


# ============================================================
# MAIN ENTRY POINT
# ============================================================

def analyze_company(data: dict) -> Dict[str, Any]:

    # ---- Extract Inputs ----
    problem_type = data.get("problem_type", "web_backend").lower()
    scale = data.get("scale", "small").lower()
    annual_compute_cost = float(data.get("annual_compute_cost", 0))
    time_sensitivity = data.get("time_sensitivity", "batch").lower()
    has_quantum_team = bool(data.get("has_quantum_team", False))
    has_research_partnerships = bool(data.get("has_research_partnerships", False))
    has_advanced_hpc = bool(data.get("has_advanced_hpc", False))
    business_criticality = data.get("business_criticality", "low impact").lower()
    investment_horizon = data.get("investment_horizon", "<2 years").lower()

    # ---- Core Scoring ----
    technical = _technical_score(problem_type)
    scale_score = _scale_score(scale)
    economic = _economic_score(annual_compute_cost)
    urgency = _urgency_score(time_sensitivity)
    organizational = _organizational_score(
        has_quantum_team,
        has_research_partnerships,
        has_advanced_hpc
    )

    suitability_score = int(
        technical * 0.35 +
        scale_score * 0.20 +
        economic * 0.20 +
        urgency * 0.15 +
        organizational * 0.10
    )

    # ---- Qubit Estimation ----
    qubit_estimate = _estimate_qubits_by_algorithm(problem_type, scale)

    # ---- Dynamic Quantum Simulation (Safe Fallback) ----
    if QUANTUM_ENGINE_AVAILABLE:
        quantum_simulation = run_dynamic_quantum_simulation(scale, suitability_score)
    else:
        quantum_simulation = _mock_quantum_simulation(scale)

    # ---- Hardware Feasibility ----
    hardware_feasibility = _hardware_feasibility(
        qubit_estimate["physical_qubits"]
    )

    # ---- ROI ----
    confidence_band = _roi_confidence(suitability_score, annual_compute_cost)

    # ---- Return Everything ----
    return {
        "suitability_score": suitability_score,
        "risk_level": _risk_level(suitability_score),
        "breakdown": {
            "technical": technical,
            "scale": scale_score,
            "economic": economic,
            "urgency": urgency,
            "organizational": organizational
        },
        "qubit_estimate": qubit_estimate,
        "hardware_feasibility": hardware_feasibility,
        "confidence_band": confidence_band,
        "executive_summary": _generate_executive_summary(
            suitability_score,
            business_criticality,
            investment_horizon
        ),
        "classical_alternative": _generate_classical_alternative(problem_type),
        "technical_analysis": _generate_technical_analysis(problem_type, scale, suitability_score),
        "economic_analysis": _generate_economic_analysis(annual_compute_cost, suitability_score),
        "migration_roadmap": _generate_migration_roadmap(suitability_score),
        "risk_assessment": _generate_risk_assessment(suitability_score, organizational),
        "quantum_simulation": quantum_simulation
    }


# ============================================================
# SCORING FUNCTIONS
# ============================================================

def _technical_score(problem_type: str) -> float:
    mapping = {
        "molecular_simulation": 95,
        "cryptography": 90,
        "optimization": 85,
        "search": 75,
        "machine_learning": 40,
        "web_backend": 5
    }
    return float(mapping.get(problem_type, 5))


def _scale_score(scale: str) -> float:
    mapping = {
        "massive": 90,
        "large": 70,
        "medium": 40,
        "small": 10
    }
    return float(mapping.get(scale, 10))


def _economic_score(cost: float) -> float:
    if cost < 100_000:
        return 10.0
    elif cost < 1_000_000:
        return 40.0
    elif cost < 10_000_000:
        return 70.0
    else:
        return 90.0


def _urgency_score(time_sensitivity: str) -> float:
    mapping = {
        "batch": 85,
        "hours": 70,
        "minutes": 40,
        "real_time": 10
    }
    return float(mapping.get(time_sensitivity, 85))


def _organizational_score(
    has_quantum_team: bool,
    has_research_partnerships: bool,
    has_advanced_hpc: bool
) -> float:

    score = 20.0
    if has_quantum_team:
        score += 30
    if has_research_partnerships:
        score += 25
    if has_advanced_hpc:
        score += 25

    return min(score, 100.0)


# ============================================================
# QUBIT ESTIMATION
# ============================================================

def _estimate_qubits_by_algorithm(problem_type: str, scale: str):

    problem_size = {
        "small": 100,
        "medium": 1000,
        "large": 10000,
        "massive": 100000
    }

    size = problem_size.get(scale, 1000)

    logical_qubits = 0
    algorithm_used = "Not Applicable"

    if problem_type == "optimization":
        logical_qubits = size
        algorithm_used = "QAOA"

    elif problem_type == "search":
        logical_qubits = math.ceil(math.log2(size))
        algorithm_used = "Grover"

    elif problem_type == "cryptography":
        logical_qubits = size // 2
        algorithm_used = "Shor"

    elif problem_type == "molecular_simulation":
        logical_qubits = int(size * 0.05)
        algorithm_used = "VQE"

    elif problem_type == "machine_learning":
        logical_qubits = int(size * 0.01)
        algorithm_used = "Variational Quantum Circuit"

    physical_qubits = logical_qubits * 1000  # error correction factor

    return {
        "algorithm_used": algorithm_used,
        "logical_qubits": logical_qubits,
        "physical_qubits": physical_qubits
    }


# ============================================================
# MOCK QUANTUM SIMULATION
# ============================================================

def _mock_quantum_simulation(scale: str):

    scale_to_qubits = {
        "small": 2,
        "medium": 3,
        "large": 4,
        "massive": 5
    }

    qubits = scale_to_qubits.get(scale, 3)

    states = [format(i, f'0{qubits}b') for i in range(2 ** qubits)]
    measured_state = random.choice(states)
    probability = round(random.uniform(0.1, 0.9), 3)

    return {
        "qubits_used": qubits,
        "measured_state": measured_state,
        "probability": probability
    }


# ============================================================
# HARDWARE
# ============================================================

def _hardware_feasibility(physical_qubits: int) -> str:

    if physical_qubits == 0:
        return "Quantum computing not applicable."

    if physical_qubits < 1_000_000:
        return "Feasible for experimental cloud quantum platforms."

    if physical_qubits < 100_000_000:
        return "Requires significant hardware scaling beyond NISQ systems."

    return "Not feasible with current hardware maturity."


# ============================================================
# ROI
# ============================================================

def _roi_confidence(score: int, cost: float):

    if score < 40:
        return {"optimistic_roi_years": None, "conservative_roi_years": None}

    if score >= 80:
        optimistic, conservative = 3, 6
    elif score >= 60:
        optimistic, conservative = 5, 9
    else:
        optimistic, conservative = 8, 12

    if cost > 10_000_000:
        optimistic = max(optimistic - 1, 1)
        conservative = max(conservative - 1, 2)

    return {
        "optimistic_roi_years": optimistic,
        "conservative_roi_years": conservative
    }


# ============================================================
# STRATEGIC SECTIONS
# ============================================================

def _risk_level(score: int) -> str:
    if score < 30:
        return "High Risk"
    elif score < 60:
        return "Experimental"
    elif score < 80:
        return "Hybrid Exploration"
    else:
        return "Strategic Opportunity"


def _generate_executive_summary(score: int, criticality: str, horizon: str):

    if score >= 80:
        headline = "High Strategic Quantum Potential"
    elif score >= 60:
        headline = "Moderate Quantum Opportunity"
    else:
        headline = "Limited Near-Term Quantum Value"

    return {
        "headline": headline,
        "key_message": f"Suitability score of {score} indicates alignment with quantum initiatives.",
        "investment_signal": f"Business criticality: {criticality}. Investment horizon: {horizon}.",
        "recommended_action": "Structured pilot recommended." if score >= 60 else "Continue classical optimization.",
        "risk_statement": "Quantum hardware maturity remains evolving."
    }


def _generate_classical_alternative(problem_type: str):
    if problem_type == "cryptography":
        return "Adopt Post-Quantum Cryptography standards."
    if problem_type == "optimization":
        return "Leverage GPU acceleration and classical heuristics."
    return "Continue classical HPC improvements."


def _generate_technical_analysis(problem_type: str, scale: str, score: int):
    return {
        "problem_type": problem_type.capitalize(),
        "scale": scale.capitalize(),
        "assessment": (
            "Strong quantum potential." if score >= 75 else
            "Moderate feasibility." if score >= 50 else
            "Limited quantum viability."
        )
    }


def _generate_economic_analysis(cost: float, score: int):
    guidance = (
        "High investment case." if score >= 75 else
        "Pilot projects recommended." if score >= 50 else
        "Continue classical optimization."
    )
    return {
        "annual_compute_budget": cost,
        "investment_guidance": guidance
    }


def _generate_migration_roadmap(score: int):
    return [
        {"phase": "Phase 1", "action": "Cloud exploration", "timeline": "0-6 months"},
        {"phase": "Phase 2", "action": "Hybrid architecture", "timeline": "6-12 months"},
        {"phase": "Phase 3", "action": "Proof of Concept", "timeline": "12-18 months"},
        {"phase": "Phase 4", "action": "Strategic decision", "timeline": "18 months"}
    ]


def _generate_risk_assessment(score: int, org_score: float):
    return [
        {"risk": "Hardware Maturity", "level": "Medium"},
        {"risk": "Algorithm Uncertainty", "level": "Medium-High" if score < 70 else "Medium"},
        {"risk": "Talent Gap", "level": "High" if org_score < 50 else "Medium"},
        {"risk": "Vendor Lock-in", "level": "Medium"}
    ]
