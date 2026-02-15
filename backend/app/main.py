from fastapi import FastAPI, Request, Body, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from app.services.scoring import analyze_company

app = FastAPI(title="Quantum Readiness Analyzer")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

REQUIRED_FIELDS = [
    "problem_type",
    "scale",
    "annual_compute_cost",
    "time_sensitivity",
    "has_quantum_team",
    "has_research_partnerships",
    "has_advanced_hpc"
]


@app.get("/")
def root():
    return {"message": "Quantum Readiness Analyzer API running"}


from fastapi import Body

@app.post("/analyze")
async def analyze(data: dict = Body(...)):
    try:
        result = analyze_company(data)
        return result
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid input")
