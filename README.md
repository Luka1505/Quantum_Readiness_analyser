# Quantum Readiness Analyser

A full-stack web application for analysing organisations' quantum computing readiness and providing actionable insights.

## 🚀 Quick Start

### Prerequisites
- **Backend**: Python 3.8+
- **Frontend**: Node.js 16+ and npm/yarn
- **System**: Windows/macOS/Linux

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create and activate virtual environment** (Windows)
   ```bash
   python -m venv venv
   venv\Scripts\activate.bat
   ```
   
   Or (macOS/Linux)
   ```bash
   python -m venv venv
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the server**
   ```bash
   python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
   ```
   
   Or use the provided script:
   - **Windows**: `run.bat`
   - **macOS/Linux**: `run.sh`

   The API will be available at `http://localhost:8000`
   - API Documentation: `http://localhost:8000/docs`
   - ReDoc: `http://localhost:8000/redoc`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

   The application will open at `http://localhost:5173`

4. **Build for production**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
Quantum_Tech_Analyser/
├── backend/
│   ├── app/
│   │   ├── models/              # Pydantic models for data validation
│   │   │   ├── company.py       # Company input and report models
│   │   │   └── __init__.py
│   │   ├── routes/              # API endpoints
│   │   │   ├── analysis.py      # Analysis endpoints
│   │   │   └── __init__.py
│   │   ├── services/            # Business logic
│   │   │   ├── analyzer.py      # Quantum readiness analysis engine
│   │   │   └── __init__.py
│   │   ├── main.py              # FastAPI app initialization
│   │   ├── config.py            # Configuration settings
│   │   └── __init__.py
│   ├── requirements.txt         # Python dependencies
│   ├── run.bat                  # Windows startup script
│   ├── run.sh                   # Unix/Linux startup script
│   └── .gitignore
│
├── frontend/
│   ├── src/
│   │   ├── components/          # Reusable React components
│   │   │   ├── Form.jsx         # Company data input form
│   │   │   ├── Dashboard.jsx    # Results display dashboard
│   │   │   ├── Charts.jsx       # Data visualization charts
│   │   │   └── index.js         # Component exports
│   │   ├── pages/               # Page components
│   │   │   ├── Home.jsx         # Landing page with form
│   │   │   ├── Analysis.jsx     # Analysis result page
│   │   │   └── index.js         # Page exports
│   │   ├── services/            # API communication
│   │   │   ├── api.js           # Axios API client
│   │   │   └── index.js         # Service exports
│   │   ├── App.jsx              # Main app component
│   │   ├── main.jsx             # React entry point
│   │   └── index.css            # Global styles
│   ├── public/                  # Static assets
│   ├── index.html               # HTML entry point
│   ├── package.json             # Dependencies
│   ├── vite.config.js           # Vite configuration
│   ├── tailwind.config.js       # Tailwind CSS configuration
│   ├── postcss.config.js        # PostCSS configuration
│   ├── .eslintignore            # ESLint ignore rules
│   ├── .gitignore               # Git ignore rules
│   └── README.md                # Frontend documentation
│
└── README.md                    # Main project documentation
```


## 🚀 Future Enhancements

- [ ] Database integration for storing analyses
- [ ] User authentication and authorization
- [ ] Historical analysis comparison
- [ ] Advanced visualization options
- [ ] Export to PDF/Excel
- [ ] Team collaboration features
- [ ] Custom assessment templates
- [ ] Integration with quantum cloud providers



---

