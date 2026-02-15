import React, { useState } from "react";
import { analyzeQuantumSuitability } from "../services/api";

function CompanyForm({ onAnalysisComplete }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    company_name: "",
    industry: "finance",
    business_criticality: "important",
    investment_horizon: "2-5",
    problem_type: "optimization",
    scale: "medium",
    annual_compute_cost: 500000,
    time_sensitivity: "hours",
    has_quantum_team: false,
    has_research_partnerships: false,
    has_advanced_hpc: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? parseFloat(value)
          : value,
    }));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await analyzeQuantumSuitability(formData);
      onAnalysisComplete(result);
    } catch (err) {
      setError("Analysis failed.");
    } finally {
      setLoading(false);
    }
  };

  const progressWidth = `${(step / 3) * 100}%`;

  return (
    <div className="max-w-4xl mx-auto bg-gray-900 text-gray-200 p-10 rounded-2xl shadow-2xl border border-gray-800">

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="h-2 bg-gray-800 rounded-full">
          <div
            className="h-2 bg-indigo-600 rounded-full transition-all duration-300"
            style={{ width: progressWidth }}
          />
        </div>
        <p className="text-sm text-gray-400 mt-2">
          Step {step} of 3
        </p>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-900 text-red-200 rounded-lg">
          {error}
        </div>
      )}

      {/* STEP 1 – BUSINESS */}
      {step === 1 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Business Context</h2>

          <input
            type="text"
            name="company_name"
            placeholder="Company Name"
            value={formData.company_name}
            onChange={handleChange}
            className="w-full bg-gray-800 p-3 rounded-lg border border-gray-700"
          />

          <select
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            className="w-full bg-gray-800 p-3 rounded-lg border border-gray-700"
          >
            <option value="finance">Finance</option>
            <option value="logistics">Logistics</option>
            <option value="pharma">Pharma</option>
            <option value="energy">Energy</option>
            <option value="technology">Technology</option>
          </select>

          <select
            name="business_criticality"
            value={formData.business_criticality}
            onChange={handleChange}
            className="w-full bg-gray-800 p-3 rounded-lg border border-gray-700"
          >
            <option value="low">Low Impact</option>
            <option value="important">Important</option>
            <option value="core">Core Revenue Driver</option>
            <option value="existential">Mission Critical</option>
          </select>

          <select
            name="investment_horizon"
            value={formData.investment_horizon}
            onChange={handleChange}
            className="w-full bg-gray-800 p-3 rounded-lg border border-gray-700"
          >
            <option value="<2">&lt; 2 Years</option>
            <option value="2-5">2–5 Years</option>
            <option value="5-10">5–10 Years</option>
            <option value="10+">10+ Years Strategic</option>
          </select>

          <button
            onClick={nextStep}
            className="bg-indigo-600 px-6 py-2 rounded-lg"
          >
            Next
          </button>
        </div>
      )}

      {/* STEP 2 – TECHNICAL */}
      {step === 2 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Technical Context</h2>

          <select name="problem_type" value={formData.problem_type} onChange={handleChange}
            className="w-full bg-gray-800 p-3 rounded-lg border border-gray-700">
            <option value="optimization">Optimization</option>
            <option value="cryptography">Cryptography</option>
            <option value="molecular_simulation">Molecular Simulation</option>
            <option value="search">Search</option>
            <option value="machine_learning">Machine Learning</option>
          </select>

          <select name="scale" value={formData.scale} onChange={handleChange}
            className="w-full bg-gray-800 p-3 rounded-lg border border-gray-700">
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
            <option value="massive">Massive</option>
          </select>

          <input type="number"
            name="annual_compute_cost"
            value={formData.annual_compute_cost}
            onChange={handleChange}
            placeholder="Annual Compute Cost ($)"
            className="w-full bg-gray-800 p-3 rounded-lg border border-gray-700"
          />

          <select name="time_sensitivity" value={formData.time_sensitivity}
            onChange={handleChange}
            className="w-full bg-gray-800 p-3 rounded-lg border border-gray-700">
            <option value="real_time">Real-time</option>
            <option value="minutes">Minutes</option>
            <option value="hours">Hours</option>
            <option value="batch">Batch</option>
          </select>

          <div className="flex justify-between">
            <button onClick={prevStep} className="bg-gray-700 px-6 py-2 rounded-lg">
              Back
            </button>
            <button onClick={nextStep} className="bg-indigo-600 px-6 py-2 rounded-lg">
              Next
            </button>
          </div>
        </div>
      )}

      {/* STEP 3 – ORGANIZATIONAL */}
      {step === 3 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Organizational Readiness</h2>

          <label className="flex items-center space-x-3">
            <input type="checkbox" name="has_quantum_team"
              checked={formData.has_quantum_team}
              onChange={handleChange} />
            <span>Dedicated Quantum Team</span>
          </label>

          <label className="flex items-center space-x-3">
            <input type="checkbox" name="has_research_partnerships"
              checked={formData.has_research_partnerships}
              onChange={handleChange} />
            <span>Research Partnerships</span>
          </label>

          <label className="flex items-center space-x-3">
            <input type="checkbox" name="has_advanced_hpc"
              checked={formData.has_advanced_hpc}
              onChange={handleChange} />
            <span>Advanced HPC Infrastructure</span>
          </label>

          <div className="flex justify-between">
            <button onClick={prevStep} className="bg-gray-700 px-6 py-2 rounded-lg">
              Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-indigo-600 px-6 py-2 rounded-lg"
            >
              {loading ? "Analyzing..." : "Generate Report"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CompanyForm;
