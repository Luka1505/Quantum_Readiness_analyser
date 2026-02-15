import React from 'react'

function ResultsDashboard({ result }) {
  if (!result) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <p className="text-gray-600">No analysis data available</p>
      </div>
    )
  }

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'Low':
        return 'bg-green-100 text-green-800'
      case 'Moderate':
        return 'bg-yellow-100 text-yellow-800'
      case 'High':
        return 'bg-orange-100 text-orange-800'
      case 'Critical':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-8">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-2">
              Quantum Suitability Analysis
            </h2>
            <p className="text-gray-600">Comprehensive assessment and strategic recommendations</p>
          </div>
          <div className="text-right">
            <div className="text-5xl font-bold text-quantum-600">
              {result.suitability_score}
            </div>
            <p className="text-gray-600 text-sm">Suitability Score</p>
          </div>
        </div>
      </div>

      {/* Risk Level and Strategic Recommendation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Risk Level</h3>
          <div className={`px-6 py-4 rounded-lg font-semibold text-center text-lg ${getRiskColor(result.risk_level)}`}>
            {result.risk_level}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Strategic Direction</h3>
          <p className="text-gray-700 italic">{result.strategic_recommendation}</p>
        </div>
      </div>

      {/* Score Breakdown */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Score Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(result.breakdown).map(([category, score]) => (
            <div key={category}>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 capitalize">
                  {category.replace(/_/g, ' ')}
                </span>
                <span className="text-sm font-bold text-quantum-600">{score.toFixed(1)}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-quantum-400 to-quantum-600 h-2 rounded-full"
                  style={{ width: `${Math.min(score, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Qubit Estimate */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Estimated Qubit Requirements</h3>
        <p className="text-2xl font-semibold text-quantum-600">{result.qubit_estimate}</p>
        <p className="text-gray-600 text-sm mt-2">
          Logical qubits required for execution
        </p>
      </div>

      {/* ROI Confidence Band */}
      {result.confidence_band.optimistic_roi_years !== null && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">ROI Timeline Estimates</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Optimistic Scenario</p>
              <p className="text-3xl font-bold text-quantum-600">
                {result.confidence_band.optimistic_roi_years}
              </p>
              <p className="text-xs text-gray-600">years to ROI</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Conservative Scenario</p>
              <p className="text-3xl font-bold text-quantum-600">
                {result.confidence_band.conservative_roi_years}
              </p>
              <p className="text-xs text-gray-600">years to ROI</p>
            </div>
          </div>
        </div>
      )}

      {/* No ROI Available */}
      {result.confidence_band.optimistic_roi_years === null && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-xl font-bold text-red-800 mb-2">ROI Analysis</h3>
          <p className="text-red-700">
            This use case is not currently recommended for quantum computing adoption.
            Classical approaches are more suitable at this time.
          </p>
        </div>
      )}
    </div>
  )
}

export default ResultsDashboard
