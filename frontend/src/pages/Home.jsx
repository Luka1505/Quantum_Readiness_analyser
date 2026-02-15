import React from "react";
import { useNavigate } from "react-router-dom";
import CompanyForm from "../components/Form";

function Home() {
  const navigate = useNavigate();

  const handleAnalysisComplete = (result) => {
    // Save to session storage
    sessionStorage.setItem("analysisResult", JSON.stringify(result));

    // Pass via router state
    navigate("/analysis", { state: { data: result } });
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-10">
      <h1 className="text-4xl mb-6 font-bold">
        Quantum Readiness Analyzer
      </h1>

      <CompanyForm onAnalysisComplete={handleAnalysisComplete} />
    </div>
  );
}

export default Home;
