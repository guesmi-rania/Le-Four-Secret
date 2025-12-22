import { BrowserRouter, Routes, Route } from "react-router-dom";
import Orders from "./pages/Orders";
import Sidebar from "./components/Sidebar";

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1, padding: "20px" }}>
          <Routes>
            <Route path="/" element={<Orders />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
