import { Navigate } from "react-router-dom";

export default function ProviderProtectedRoute({ children }) {
  const token = sessionStorage.getItem("providerToken");

  if (!token) {
    return <Navigate to="/provider/login" />;
  }

  return children;
}

