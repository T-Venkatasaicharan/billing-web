import { useEffect, useState } from "react";

const API = "http://localhost:8080/bills";

export default function Dashboard() {

  const [bills, setBills] = useState([]);

  useEffect(() => {
    fetch(API)
      .then(res => res.json())
      .then(data => setBills(data));
  }, []);

  const total = bills.reduce((sum, b) => sum + b.totalAmount, 0);

  return (
    <div className="container">
      <h2>Dashboard</h2>

      <div className="card">
        <h3>Total Bills: {bills.length}</h3>
        <h3>Total Revenue: ₹{total}</h3>
      </div>
    </div>
  );
}