import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "https://billing-web-b447.onrender.com/bills";

export default function BillHistory() {

  const [bills, setBills] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(API)
      .then(res => res.json())
      .then(data => setBills(data));
  }, []);

  return (
    <div className="container">
      <h2>Bill History</h2>

      {bills.map(bill => (
        <div key={bill.id} className="card">

          <h3>Bill #{bill.id}</h3>
          <p>Date: {bill.date}</p>
          <p>Total: ₹{bill.totalAmount}</p>

          <button onClick={() => navigate(`/invoice/${bill.id}`)}>
            View Invoice
          </button>

        </div>
      ))}
    </div>
  );
}