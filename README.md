# Quantum Readiness Analyzer

A full-stack web application for analyzing organizations' quantum computing readiness and providing actionable insights.

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

## 🎯 Features

### Backend (FastAPI)

- **RESTful API** with clean endpoints
- **Data Validation** using Pydantic models
- **CORS Support** for frontend communication
- **Quantum Readiness Analysis Engine** with 5 key assessment categories:
  - Technical Infrastructure
  - Workforce Skills
  - Financial Readiness
  - Leadership Support
  - Strategic Alignment

**API Endpoints:**
- `POST /api/v1/analysis/analyze` - Analyze company quantum readiness
- `GET /api/v1/analysis/industries` - Get supported industries
- `GET /api/v1/analysis/readiness-levels` - Get readiness levels
- `GET /api/v1/analysis/health` - Health check
- `GET /health` - Server health status
- `GET /` - Welcome endpoint

### Frontend (React + TailwindCSS)

- **Modern UI** with Tailwind CSS
- **Responsive Design** for desktop and mobile
- **Form Component** for company data input
- **Dashboard Component** displaying analysis results
- **Charts Component** with Recharts visualizations:
  - Category readiness bar chart
  - Overall score pie chart
  - Detailed progress bars
- **Multi-page Navigation** using React Router
- **Session Storage** for result persistence

## 📊 Analysis Output

The backend generates comprehensive reports including:

- **Overall Score** (0-100)
- **Readiness Level** (Not Ready, Beginner, Intermediate, Advanced, Expert)
- **Category Scores** with recommendations
- **Key Findings** from the analysis
- **Risk Factors** and mitigation strategies
- **Strategic Recommendations**
- **Implementation Roadmap** with 5 phases
- **Timeline Estimates** (18-48 months)
- **Budget Estimates** based on company profile

## 🔧 Configuration

### Backend Configuration
Edit `backend/app/config.py` to customize:
- App name and version
- CORS origins
- API prefix
- Debug mode

### Frontend Configuration
Edit `frontend/vite.config.js` for:
- Development port
- Build output directory
- Plugin settings

## 🚀 Deployment

### Backend Deployment
The FastAPI application can be deployed to:
- Heroku
- AWS (EC2, Lambda with Zappa)
- Google Cloud Run
- Azure App Service
- DigitalOcean
- Docker containers

### Frontend Deployment
The frontend can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Any static hosting service

## 📦 Dependencies

### Backend
- **FastAPI** 0.104.1 - Web framework
- **Uvicorn** 0.24.0 - ASGI server
- **Pydantic** 2.5.0 - Data validation

### Frontend
- **React** 18.2.0 - UI framework
- **React Router DOM** 6.20.0 - Navigation
- **Axios** 1.6.0 - HTTP client
- **Recharts** 2.10.0 - Charts library
- **TailwindCSS** 3.4.0 - Styling
- **Vite** 5.0.0 - Build tool

## 🤝 How It Works

1. **User submits company data** via the form on the Home page
2. **Frontend sends data** to the backend API
3. **Backend analyzes** the data using the QuantumAnalyzer service
4. **Backend returns** a comprehensive analysis report
5. **Frontend displays** the report with charts and recommendations
6. **User can download** the report as JSON


## 🎨 UI Features

- **Responsive Design** - Works on desktop, tablet, and mobile
- **Modern Gradient Background** - Visually appealing interface
- **Interactive Forms** - Real-time validation and feedback
- **Dynamic Charts** - Visual data representation
- **Status Indicators** - Color-coded readiness levels
- **Progress Bars** - Visual score representation
- **Dark/Light Consistency** - Professional appearance




## 🐛 Troubleshooting

### Port Already in Use
```bash
# For backend (Windows)
netstat -ano | findstr :8000

# For frontend (Windows)
netstat -ano | findstr :5173
```

### CORS Errors
Ensure backend is running on `http://localhost:8000` and add the correct origin to `backend/app/config.py`

### Module Not Found Errors
```bash
# Backend
pip install -r requirements.txt

# Frontend
npm install
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

