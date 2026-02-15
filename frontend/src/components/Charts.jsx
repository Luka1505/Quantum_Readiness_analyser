import React from 'react'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

function Charts({ report }) {
  const readinessData = report.readiness_scores.map(score => ({
    name: score.category.split(' ').slice(0, 2).join(' '),
    score: score.score
  }))

  const scoreDistribution = [
    { name: 'Current Score', value: report.overall_score },
    { name: 'Target Score', value: 100 - report.overall_score }
  ]

  const COLORS = ['#0ea5e9', '#bfdbfe']

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Readiness Scores Bar Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Readiness by Category</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={readinessData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="score" fill="#0ea5e9" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Overall Score Pie Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Overall Score</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={scoreDistribution}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {COLORS.map((color, index) => (
                <Cell key={`cell-${index}`} fill={color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value.toFixed(1)}%`} />
          </PieChart>
        </ResponsiveContainer>
        <div className="text-center mt-4">
          <p className="text-3xl font-bold text-quantum-600">{report.overall_score.toFixed(1)}/100</p>
          <p className="text-gray-600 text-sm">Quantum Readiness Score</p>
        </div>
      </div>

      {/* Survey Score Details */}
      <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Detailed Category Scores</h3>
        <div className="space-y-4">
          {report.readiness_scores.map((score, idx) => (
            <div key={idx}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">{score.category}</span>
                <span className="text-sm font-bold text-quantum-600">{score.score.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-quantum-400 to-quantum-600 h-2 rounded-full"
                  style={{ width: `${score.score}%` }}
                />
              </div>
              <p className="text-xs text-gray-600 mt-1">{score.recommendation}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Charts
