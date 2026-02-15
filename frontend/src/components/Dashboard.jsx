import React from "react";

function getScoreColor(score) {
  if (!score && score !== 0) return "text-gray-400";
  if (score >= 75) return "text-green-400";
  if (score >= 50) return "text-yellow-400";
  return "text-red-400";
}

function Dashboard({ data }) {
  if (!data) return null;

  const breakdown = data.breakdown || {};
  const qubits = data.qubit_estimate || {};
  const roi = data.confidence_band || {};
  const exec = data.executive_summary || {};
  const tech = data.technical_analysis || {};
  const econ = data.economic_analysis || {};
  const roadmap = data.migration_roadmap || [];
  const risks = data.risk_assessment || [];
  const quantum = data.quantum_simulation || {};

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 p-10">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">
            Quantum Readiness Report
          </h1>
          <span className="px-6 py-2 rounded-full bg-indigo-600 text-white text-sm font-semibold">
            {data.risk_level}
          </span>
        </div>

        {/* Suitability Score */}
        <div className="bg-gray-900 p-8 rounded-2xl shadow-xl">
          <p className="text-gray-400">Suitability Score</p>
          <div className={`text-7xl font-extrabold mt-3 ${getScoreColor(data.suitability_score)}`}>
            {data.suitability_score}
          </div>
          <p className="text-gray-500 mt-3">
            Overall Quantum Suitability Assessment
          </p>
        </div>

        {/* Score Breakdown */}
        <div className="bg-gray-900 p-8 rounded-2xl shadow-xl">
          <h2 className="text-xl font-semibold mb-6">Score Breakdown</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {Object.entries(breakdown).map(([key, value]) => (
              <div key={key} className="bg-gray-800 p-4 rounded-xl">
                <p className="text-gray-400 text-sm capitalize">{key}</p>
                <p className={`text-2xl font-bold ${getScoreColor(value)}`}>
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Quantum Algorithm & Hardware */}
        <div className="bg-gray-900 p-8 rounded-2xl shadow-xl">
          <h2 className="text-xl font-semibold mb-4">
            Quantum Algorithm & Hardware
          </h2>

          <p>
            Algorithm Used:{" "}
            <span className="text-blue-400 font-semibold">
              {qubits.algorithm_used}
            </span>
          </p>

          <p>
            Logical Qubits:{" "}
            <span className="text-blue-400 font-semibold">
              {qubits.logical_qubits?.toLocaleString()}
            </span>
          </p>

          <p>
            Physical Qubits:{" "}
            <span className="text-blue-400 font-semibold">
              {qubits.physical_qubits?.toLocaleString()}
            </span>
          </p>

          <p className="mt-3 text-gray-400">
            {data.hardware_feasibility}
          </p>
        </div>

        {/* Quantum Simulation Demo */}
        {quantum.qubits_used && (
          <div className="bg-indigo-900 p-8 rounded-2xl shadow-xl">
            <h2 className="text-xl font-semibold mb-4">
              Quantum Simulation Demo
            </h2>

            <p>Qubits Used: {quantum.qubits_used}</p>
            <p>Measured State: {quantum.measured_state}</p>
            <p>Probability: {quantum.probability}</p>
          </div>
        )}

        {/* Technical Analysis */}
        <div className="bg-gray-900 p-8 rounded-2xl shadow-xl">
          <h2 className="text-xl font-semibold mb-4">
            Technical Analysis
          </h2>

          <p>Problem Type: {tech.problem_type}</p>
          <p>Scale: {tech.scale}</p>
          <p className="mt-3 text-gray-400">{tech.assessment}</p>
        </div>

        {/* Economic Analysis */}
        <div className="bg-gray-900 p-8 rounded-2xl shadow-xl">
          <h2 className="text-xl font-semibold mb-4">
            Economic Analysis
          </h2>

          <p>
            Annual Compute Budget: $
            {econ.annual_compute_budget?.toLocaleString()}
          </p>

          <p className="mt-3 text-gray-400">
            {econ.investment_guidance}
          </p>
        </div>

        {/* ROI */}
        {roi.optimistic_roi_years && (
          <div className="bg-gray-900 p-8 rounded-2xl shadow-xl">
            <h2 className="text-xl font-semibold mb-4">
              ROI Forecast
            </h2>

            <p>Optimistic ROI: {roi.optimistic_roi_years} years</p>
            <p>Conservative ROI: {roi.conservative_roi_years} years</p>
          </div>
        )}

        {/* Migration Roadmap */}
        <div className="bg-gray-900 p-8 rounded-2xl shadow-xl">
          <h2 className="text-xl font-semibold mb-4">
            Migration Roadmap
          </h2>

          <ul className="space-y-4">
            {roadmap.map((phase, index) => (
              <li key={index} className="border-l-2 border-indigo-600 pl-4">
                <p className="font-semibold">{phase.phase}</p>
                <p>{phase.action}</p>
                <p className="text-gray-400 text-sm">
                  Timeline: {phase.timeline}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Risk Assessment */}
        <div className="bg-gray-900 p-8 rounded-2xl shadow-xl">
          <h2 className="text-xl font-semibold mb-4">
            Risk Assessment
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {risks.map((risk, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded-lg">
                <p className="font-semibold">{risk.risk}</p>
                <p className="text-gray-400">{risk.level}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Executive Summary */}
        <div className="bg-indigo-950 p-8 rounded-2xl shadow-xl border border-indigo-700">
          <h2 className="text-2xl font-bold mb-4 text-indigo-300">
            Executive Summary
          </h2>

          <p className="text-xl font-semibold text-white mb-2">
            {exec.headline}
          </p>

          <p className="text-gray-300 mb-3">
            {exec.key_message}
          </p>

          <p className="text-indigo-300 font-semibold mb-1">
            Investment Signal:
          </p>
          <p className="text-gray-300 mb-3">
            {exec.investment_signal}
          </p>

          <p className="text-indigo-300 font-semibold mb-1">
            Recommended Action:
          </p>
          <p className="text-gray-300 mb-3">
            {exec.recommended_action}
          </p>

          <p className="text-gray-400 text-sm mt-4">
            {exec.risk_statement}
          </p>
        </div>

        {/* Classical Alternative */}
        <div className="bg-indigo-900 p-8 rounded-2xl shadow-xl">
          <h2 className="text-xl font-semibold mb-4">
            Classical Alternative Recommendation
          </h2>
          <p>{data.classical_alternative}</p>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
