import React from 'react'

function ConsultingDashboard({ result }) {
  if (!result) {
    return (
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 text-center">
        <p className="text-slate-400">No analysis data available</p>
      </div>
    )
  }

  const getRiskVariant = (risk) => {
    const variants = {
      'Low': {
        bg: 'bg-emerald-900/30',
        border: 'border-emerald-700',
        text: 'text-emerald-300',
        label: 'emerald'
      },
      'Moderate': {
        bg: 'bg-yellow-900/30',
        border: 'border-yellow-700',
        text: 'text-yellow-300',
        label: 'yellow'
      },
      'High': {
        bg: 'bg-orange-900/30',
        border: 'border-orange-700',
        text: 'text-orange-300',
        label: 'orange'
      },
      'Critical': {
        bg: 'bg-red-900/30',
        border: 'border-red-700',
        text: 'text-red-300',
        label: 'red'
      }
    }
    return variants[risk] || variants['Moderate']
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'from-emerald-500 to-cyan-500'
    if (score >= 60) return 'from-blue-500 to-cyan-500'
    if (score >= 40) return 'from-yellow-500 to-orange-500'
    return 'from-orange-500 to-red-500'
  }

  const getProgressBarColor = (score) => {
    if (score >= 80) return 'bg-emerald-500'
    if (score >= 60) return 'bg-blue-500'
    if (score >= 40) return 'bg-yellow-500'
    return 'bg-orange-500'
  }

  const riskVariant = getRiskVariant(result.risk_level)

  return (
    <div className="space-y-6">
      {/* Hero Section with Score */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700">
        {/* Background accent */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full blur-3xl" />
        </div>

        <div className="relative p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Score */}
            <div className="md:col-span-2">
              <p className="text-slate-400 text-sm font-medium mb-2 uppercase tracking-widest">
                Quantum Suitability Assessment
              </p>
              <div className="flex items-baseline gap-4">
                <div className={`text-7xl font-bold bg-gradient-to-r ${getScoreColor(result.suitability_score)} bg-clip-text text-transparent`}>
                  {result.suitability_score}
                </div>
                <span className="text-slate-400 text-2xl font-light">/100</span>
              </div>
              <p className="text-slate-300 mt-4 text-lg leading-relaxed">
                {result.suitability_score >= 80 && "Highly suitable for quantum computing initiatives"}
                {result.suitability_score >= 60 && result.suitability_score < 80 && "Good quantum computing potential with strategic planning"}
                {result.suitability_score >= 40 && result.suitability_score < 60 && "Moderate potential requiring hybrid approaches"}
                {result.suitability_score < 40 && "Classical approaches are currently more suitable"}
              </p>
            </div>

            {/* Risk Level Card */}
            <div className="flex flex-col items-center justify-center p-6 bg-slate-900/50 rounded-xl border border-slate-700">
              <p className="text-slate-400 text-xs font-medium uppercase tracking-widest mb-3">Risk Level</p>
              <div className={`px-4 py-3 rounded-lg font-bold text-lg border ${riskVariant.bg} ${riskVariant.border} ${riskVariant.text}`}>
                {result.risk_level}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Score Breakdown Section */}
      <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 p-8">
        <h2 className="text-2xl font-bold text-white mb-1">Capability Breakdown</h2>
        <p className="text-slate-400 text-sm mb-8">Detailed assessment across key dimensions</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.entries(result.breakdown).map(([category, score]) => (
            <div key={category} className="space-y-3">
              {/* Label and Score */}
              <div className="flex justify-between items-center">
                <label className="text-slate-300 font-semibold capitalize">
                  {category.replace(/_/g, ' ')}
                </label>
                <span className={`text-lg font-bold ${getProgressBarColor(score)} bg-clip-text text-transparent bg-gradient-to-r from-slate-100 to-slate-100`}>
                  {score.toFixed(1)}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="relative h-3 bg-slate-700/50 rounded-full overflow-hidden border border-slate-600">
                <div
                  className={`h-full ${getProgressBarColor(score)} transition-all duration-500 ease-out rounded-full`}
                  style={{ width: `${Math.min(score, 100)}%` }}
                />
                <div
                  className="absolute inset-0 opacity-0 hover:opacity-20 bg-white/20 transition-opacity"
                  title={`${score.toFixed(1)}/100`}
                />
              </div>

              {/* Classification */}
              <div className="text-xs text-slate-400">
                {score >= 80 && '✓ Excellent'}
                {score >= 60 && score < 80 && '• Good'}
                {score >= 40 && score < 60 && '◦ Fair'}
                {score < 40 && '◦ Limited'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Qubit Estimate */}
      <div className="rounded-2xl bg-gradient-to-br from-blue-900/20 via-slate-900 to-slate-900 border border-blue-500/30 p-8">
        <h3 className="text-slate-400 text-sm font-medium uppercase tracking-widest mb-4">
          Hardware Requirements
        </h3>
        <div className="flex items-baseline gap-3">
          <div className="text-4xl font-bold text-blue-300">
            {result.qubit_estimate}
          </div>
        </div>
        <p className="text-slate-400 text-sm mt-4">
          Estimated logical qubits required for optimal execution of your problem
        </p>
        <div className="mt-4 pt-4 border-t border-blue-500/20">
          <p className="text-xs text-blue-300/70">
            ℹ 1 logical qubit = 1000+ physical qubits with current error rates
          </p>
        </div>
      </div>

      {/* Hardware Feasibility */}
      <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 p-8">
        <h3 className="text-slate-400 text-sm font-medium uppercase tracking-widest mb-6">
          Hardware Feasibility Assessment
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Current Hardware Availability */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <p className="text-slate-400 text-xs font-medium uppercase mb-3">Current Availability</p>
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${result.suitability_score >= 60 ? 'bg-emerald-500' : 'bg-orange-500'}`} />
              <p className="text-white font-semibold">
                {result.suitability_score >= 60 ? 'Accessible' : 'Limited'}
              </p>
            </div>
            <p className="text-slate-400 text-sm mt-3">
              {result.suitability_score >= 60 
                ? 'Quantum hardware is currently accessible through cloud providers'
                : 'May require partnership with quantum vendors'}
            </p>
          </div>

          {/* Timeline to Production */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <p className="text-slate-400 text-xs font-medium uppercase mb-3">Timeline to Production</p>
            <div className="flex items-center gap-3">
              <p className="text-white font-semibold">
                {result.suitability_score >= 80 && '18-24 months'}
                {result.suitability_score >= 60 && result.suitability_score < 80 && '24-36 months'}
                {result.suitability_score >= 40 && result.suitability_score < 60 && '36-48 months'}
                {result.suitability_score < 40 && 'Not recommended'}
              </p>
            </div>
            <p className="text-slate-400 text-sm mt-3">
              {result.suitability_score >= 80 && 'Development and deployment can proceed with confidence'}
              {result.suitability_score >= 60 && result.suitability_score < 80 && 'Phased approach recommended with pilot programs'}
              {result.suitability_score >= 40 && result.suitability_score < 60 && 'Focus on algorithm research and classical-quantum hybrid'}
              {result.suitability_score < 40 && 'Continue optimizing classical approaches'}
            </p>
          </div>
        </div>
      </div>

      {/* ROI Confidence Band */}
      {result.confidence_band.optimistic_roi_years !== null && (
        <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 p-8">
          <h3 className="text-slate-400 text-sm font-medium uppercase tracking-widest mb-1">
            Return on Investment
          </h3>
          <p className="text-slate-400 text-sm mb-8">Time to break-even analysis</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Optimistic Scenario */}
            <div className="bg-gradient-to-br from-emerald-900/20 to-slate-900 border border-emerald-500/30 rounded-xl p-6">
              <p className="text-emerald-300 text-sm font-semibold uppercase tracking-widest mb-4">
                Optimistic Scenario
              </p>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-5xl font-bold text-emerald-300">
                  {result.confidence_band.optimistic_roi_years}
                </span>
                <span className="text-emerald-400">years</span>
              </div>
              <p className="text-slate-400 text-sm">
                Assumes efficient implementation and favorable market adoption of quantum solutions
              </p>
              <div className="mt-4 pt-4 border-t border-emerald-500/20">
                <div className="flex items-center gap-2 text-xs text-emerald-300/70">
                  <span>✓</span>
                  <span>Based on: Strong organizational readiness + high problem fit</span>
                </div>
              </div>
            </div>

            {/* Conservative Scenario */}
            <div className="bg-gradient-to-br from-orange-900/20 to-slate-900 border border-orange-500/30 rounded-xl p-6">
              <p className="text-orange-300 text-sm font-semibold uppercase tracking-widest mb-4">
                Conservative Scenario
              </p>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-5xl font-bold text-orange-300">
                  {result.confidence_band.conservative_roi_years}
                </span>
                <span className="text-orange-400">years</span>
              </div>
              <p className="text-slate-400 text-sm">
                Accounts for implementation challenges and gradual technology maturation
              </p>
              <div className="mt-4 pt-4 border-t border-orange-500/20">
                <div className="flex items-center gap-2 text-xs text-orange-300/70">
                  <span>•</span>
                  <span>Based on: Standard implementation pace + market uncertainty</span>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline Visualization */}
          <div className="mt-8 pt-8 border-t border-slate-700">
            <p className="text-slate-400 text-xs font-medium uppercase mb-4">Investment Timeline</p>
            <div className="relative h-12 bg-slate-800 rounded-lg border border-slate-700 p-2">
              {/* Optimistic marker */}
              <div 
                className="absolute h-full bg-emerald-500/20 rounded border border-emerald-500/50 flex items-center justify-center text-xs font-bold text-emerald-300"
                style={{ 
                  left: '8px', 
                  width: `calc(${(result.confidence_band.optimistic_roi_years / result.confidence_band.conservative_roi_years) * 100}% - 16px)`
                }}
              >
                {result.confidence_band.optimistic_roi_years}y
              </div>
              
              {/* Conservative span */}
              <div className="absolute right-2 top-1/2 -translate-y-1/2 text-orange-400 text-xs font-bold">
                {result.confidence_band.conservative_roi_years}y
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Strategic Recommendation */}
      <div className="rounded-2xl border-2 border-cyan-500/50 bg-gradient-to-br from-cyan-900/10 via-slate-900 to-slate-900 p-8 relative overflow-hidden">
        {/* Background accent */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-400 rounded-full blur-3xl" />
        </div>

        <div className="relative">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-cyan-500/20 border border-cyan-500/50">
                <span className="text-cyan-400 text-xl">→</span>
              </div>
            </div>
            <div className="flex-grow">
              <h3 className="text-cyan-300 text-lg font-bold mb-2">Strategic Recommendation</h3>
              <p className="text-slate-200 text-lg leading-relaxed font-medium">
                {result.strategic_recommendation}
              </p>

              {/* Action items based on score */}
              <div className="mt-6 space-y-2 pt-6 border-t border-cyan-500/20">
                <p className="text-slate-400 text-xs font-semibold uppercase">Next Steps:</p>
                {result.suitability_score >= 80 && (
                  <ul className="space-y-1 text-sm text-slate-300">
                    <li className="flex items-center gap-2">
                      <span className="text-cyan-400">✓</span> Establish quantum computing task force
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-cyan-400">✓</span> Develop detailed implementation roadmap
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-cyan-400">✓</span> Engage quantum hardware vendors for pilot
                    </li>
                  </ul>
                )}
                {result.suitability_score >= 60 && result.suitability_score < 80 && (
                  <ul className="space-y-1 text-sm text-slate-300">
                    <li className="flex items-center gap-2">
                      <span className="text-cyan-400">•</span> Design hybrid quantum-classical architecture
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-cyan-400">•</span> Build internal quantum expertise
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-cyan-400">•</span> Plan pilot programs with managed partners
                    </li>
                  </ul>
                )}
                {result.suitability_score >= 40 && result.suitability_score < 60 && (
                  <ul className="space-y-1 text-sm text-slate-300">
                    <li className="flex items-center gap-2">
                      <span className="text-cyan-400">◦</span> Research quantum-inspired classical algorithms
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-cyan-400">◦</span> Monitor quantum technology maturation
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-cyan-400">◦</span> Evaluate partnerships with quantum researchers
                    </li>
                  </ul>
                )}
                {result.suitability_score < 40 && (
                  <ul className="space-y-1 text-sm text-slate-300">
                    <li className="flex items-center gap-2">
                      <span className="text-cyan-400">◦</span> Optimize classical computing infrastructure
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-cyan-400">◦</span> Revisit quantum potential in 2-3 years
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-cyan-400">◦</span> Stay informed on quantum advances
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="rounded-lg bg-slate-900/50 border border-slate-700 p-4">
        <p className="text-slate-400 text-xs leading-relaxed">
          <span className="font-semibold text-slate-300">Disclaimer:</span> This assessment is based on current quantum computing capabilities and technology maturity. Recommendations should be evaluated in conjunction with detailed architectural reviews and expert consultation. Quantum technology landscape evolves rapidly.
        </p>
      </div>
    </div>
  )
}

export default ConsultingDashboard
