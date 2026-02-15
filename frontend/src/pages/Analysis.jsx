import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";

function Analysis() {
  const location = useLocation();
  const navigate = useNavigate();

  const [data, setData] = useState(null);

  useEffect(() => {
    // First try router state
    if (location.state?.data) {
      setData(location.state.data);
      return;
    }

    // Fallback to sessionStorage
    const stored = sessionStorage.getItem("analysisResult");
    if (stored) {
      setData(JSON.parse(stored));
      return;
    }

    // If nothing exists → go home
    navigate("/");
  }, [location.state, navigate]);

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <h2 className="text-xl">Loading analysis...</h2>
      </div>
    );
  }

  return <Dashboard data={data} />;
}

export default Analysis;
