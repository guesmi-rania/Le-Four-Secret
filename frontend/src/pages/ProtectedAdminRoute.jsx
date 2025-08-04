import { Navigate } from "react-router-dom";

export default function ProtectedAdminRoute({ children }) {
  const isAdmin = localStorage.getItem("admin") === "true";
  return isAdmin ? children : <Navigate to="/admin-login" />;
}
