import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Billing from "./Billing";
import BillHistory from "./BillHistory";
import Dashboard from "./Dashboard";
import InvoicePage from "./InvoicePage";

export default function App() {
  return (
    <BrowserRouter>

      <div className="navbar">
        <Link to="/">Billing</Link>
        <Link to="/history">History</Link>
        <Link to="/dashboard">Dashboard</Link>
      </div>

      <Routes>
        <Route path="/" element={<Billing />} />
        <Route path="/history" element={<BillHistory />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/invoice/:id" element={<InvoicePage />} />
      </Routes>

    </BrowserRouter>
  );
}