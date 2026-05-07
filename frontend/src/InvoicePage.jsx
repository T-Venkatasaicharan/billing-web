import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API = "https://billing-web-b447.onrender.com/bills";

export default function InvoicePage() {

  const { id } = useParams();

  const [bill, setBill] = useState(null);
  const [aiSummary, setAiSummary] = useState("");

  useEffect(() => {

    fetch(`${API}/${id}`)
      .then((res) => res.json())
      .then((data) => {

        setBill(data);

        fetch("https://billing-web-b447.onrender.com/ai/summary", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        })
          .then((res) => res.text())
          .then((summary) => setAiSummary(summary))
          .catch(() => setAiSummary("AI insight unavailable"));

      });

  }, [id]);

  if (!bill) {
    return (
      <div className="card">
        <h2>Loading invoice...</h2>
      </div>
    );
  }

  return (

    <div>

    

      <div className="card">

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "20px",
            alignItems: "center",
            marginBottom: "30px"
          }}
        >

          <div>
            <h1 style={{ fontSize: "32px" }}>
              Vertex Billing
            </h1>

            <p style={{ color: "#94a3b8", marginTop: "8px" }}>
              Smart Invoice & Billing Platform
            </p>
          </div>

          <button onClick={() => window.print()}>
             Print Invoice
          </button>

        </div>

        <hr
          style={{
            border: "1px solid rgba(255,255,255,0.08)",
            marginBottom: "25px"
          }}
        />

      

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "30px"
          }}
        >

          <div>
            <h3>Invoice Details</h3>

            <p style={{ marginTop: "10px", color: "#cbd5e1" }}>
              Invoice ID: #{bill.id}
            </p>

            <p style={{ marginTop: "5px", color: "#cbd5e1" }}>
              Date: {bill.date}
            </p>
          </div>

          <div>
            <h3>Billing Summary</h3>

            <p style={{ marginTop: "10px", color: "#cbd5e1" }}>
              Total Items: {bill.items.length}
            </p>

            <p style={{ marginTop: "5px", color: "#22c55e" }}>
              Status: Paid
            </p>
          </div>

        </div>

       

        <table>

          <thead>
            <tr>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>

            {bill.items.map((item) => (

              <tr key={item.id}>

                <td>{item.name}</td>

                <td>{item.quantity}</td>

                <td>₹{item.price}</td>

                <td>
                  ₹{item.price * item.quantity}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

     

        <div
          style={{
            marginTop: "30px",
            textAlign: "right"
          }}
        >

          <h2>
            Total Amount: ₹{bill.totalAmount}
          </h2>

        </div>

      </div>

    

      <div
        className="card"
        style={{
          marginTop: "25px"
        }}
      >

        <h2 style={{ marginBottom: "15px" }}>
    
        </h2>

        <p
          style={{
            color: "#cbd5e1",
            lineHeight: "1.8",
            fontSize: "15px"
          }}
        >
          {aiSummary || "Generating AI insights..."}
        </p>

      </div>

    </div>

  );
}