import { useEffect, useState } from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { LoadingScreen } from "../views/components/LoadingScreen";
import { HomePage } from "../views/pages/HomePage";
import { ResourcesPage } from "../views/pages/ResourcesPage";

export function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setLoading(false);
    }, 1900);

    return () => window.clearTimeout(timeoutId);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
