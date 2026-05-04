import { useState } from "react";

export default function Invoice({ bill }) {

  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  if (!bill) return <p style={{ textAlign: "center" }}>Loading...</p>;

  // 🤖 AI Summary (backend call)
  const getAISummary = () => {
    setLoading(true);

    fetch("http://localhost:8080/ai/summary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bill)
    })
      .then(res => res.text())
      .then(data => {
        setSummary(data);
        setLoading(false);
      })
      .catch(() => {
        setSummary("AI failed. Try again.");
        setLoading(false);
      });
  };

  return (
    <div className="invoice-container">

      {/* HEADER */}
      <h2 className="invoice-title">🧾 INVOICE</h2>

      <div className="invoice-info">
        <p><b>Bill ID:</b> {bill.id}</p>
        <p><b>Date:</b> {bill.date}</p>
      </div>

      {/* TABLE */}
      <table className="invoice-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>
          {bill.items.map((item, i) => (
            <tr key={i}>
              <td>{item.name}</td>
              <td>₹{item.price}</td>
              <td>{item.quantity}</td>
              <td>₹{item.price * item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* TOTAL */}
      <h3 className="invoice-total">
        Total: ₹{bill.totalAmount}
      </h3>

      {/* ACTIONS */}
      <div className="invoice-actions">
        <button onClick={() => window.print()}>
          🖨️ Print
        </button>

        <button onClick={getAISummary}>
          🤖 {loading ? "Generating..." : "AI Summary"}
        </button>
      </div>

      {/* AI OUTPUT */}
      {summary && (
        <div className="ai-box">
          <h4>AI Insight:</h4>
          <p>{summary}</p>
        </div>
      )}

    </div>
  );
}