import { useContext } from "react";
import { Navigate } from "react-router-dom";
import loginContext from "../context/login-Context";

export default function ProtectedRoute({ children }) {
  const { isLoggedIn } = useContext(loginContext);
  const token = localStorage.getItem("token");

  // If no token & no login → redirect to login page
  if (!isLoggedIn && !token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
