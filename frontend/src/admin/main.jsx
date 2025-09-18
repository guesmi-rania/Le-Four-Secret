import React from "react";
import ReactDOM from "react-dom/client";
import AdminDashboard from "./AdminDashboard"; // <- ici
import { BrowserRouter } from "react-router-dom";
import "../styles/admin.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AdminDashboard />
    </BrowserRouter>
  </React.StrictMode>
);
