import { Navigate } from "react-router-dom";

export default function AdminProtectedRoute({ children }) {
  const adminToken = sessionStorage.getItem("adminToken");

  if (!adminToken) {
    return <Navigate to="/admin/login" />;
  }

  return children;
}

