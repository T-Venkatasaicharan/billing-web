import InvoicePage from "./InvoicePage";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { FaChartLine, FaFileInvoice, FaHistory } from "react-icons/fa";
import Billing from "./Billing";
import BillHistory from "./BillHistory";
import Dashboard from "./Dashboard";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-container">

        {/* Sidebar */}
        <div className="sidebar">
          <h2 className="logo">Billing Generat</h2>

          <Link to="/" className="nav-link">
            <FaFileInvoice /> Billing
          </Link>

          <Link to="/history" className="nav-link">
            <FaHistory /> History
          </Link>

          <Link to="/dashboard" className="nav-link">
            <FaChartLine /> Dashboard
          </Link>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <Routes>
            <Route path="/invoice/:id" element={<InvoicePage />} />
            <Route path="/" element={<Billing />} />
            <Route path="/history" element={<BillHistory />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>

      </div>
    </BrowserRouter>
  );
}