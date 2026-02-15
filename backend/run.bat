@echo off
REM Backend startup script for Windows

echo 🚀 Starting Quantum Readiness Analyzer Backend
echo ==============================================

REM Check if venv exists
if not exist "venv" (
    echo 📦 Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment
echo 🔌 Activating virtual environment...
call venv\Scripts\activate.bat

REM Install dependencies
echo 📚 Installing dependencies...
pip install -r requirements.txt

REM Run the application
echo ⚛️ Starting FastAPI server on http://localhost:8000
echo 📖 API docs available at http://localhost:8000/docs
echo.
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
