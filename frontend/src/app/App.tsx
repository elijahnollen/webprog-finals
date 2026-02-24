import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { HomePage } from "../views/pages/HomePage";
import { ResourcesPage } from "../views/pages/ResourcesPage";

export function App() {
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
