#!/bin/bash
# Backend startup script

echo "🚀 Starting Quantum Readiness Analyzer Backend"
echo "=============================================="

# Check if venv exists
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python -m venv venv
fi

# Activate virtual environment
echo "🔌 Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "📚 Installing dependencies..."
pip install -r requirements.txt

# Run the application
echo "⚛️ Starting FastAPI server on http://localhost:8000"
echo "📖 API docs available at http://localhost:8000/docs"
echo ""
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
