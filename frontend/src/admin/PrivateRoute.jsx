import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken"); // récupère le JWT admin
  return token ? children : <Navigate to="/admin-login" />;
};

export default PrivateRoute;
