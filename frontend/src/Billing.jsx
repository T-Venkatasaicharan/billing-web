import { useState } from "react";

const API = "http://localhost:8080/bills";

export default function Billing() {

  const [items, setItems] = useState([
    { name: "", price: "", quantity: "" }
  ]);

  const [total, setTotal] = useState(0);

  const handleChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);

    let sum = 0;
    newItems.forEach(i => {
      sum += (i.price || 0) * (i.quantity || 0);
    });
    setTotal(sum);
  };

  const addItem = () => {
    setItems([...items, { name: "", price: "", quantity: "" }]);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const submitBill = () => {
    const bill = {
      date: new Date().toISOString().split("T")[0],
      items
    };

    fetch(API, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(bill)
    })
      .then(res => res.json())
      .then(data => alert("Saved ₹" + data.totalAmount));
  };

  return (
    <div className="container">
      <h2>Create Bill</h2>

      <div className="card">

        {items.map((item, index) => (
          <div key={index} className="row">

            <input placeholder="Item"
              onChange={e => handleChange(index,"name",e.target.value)} />

            <input type="number" placeholder="Price"
              onChange={e => handleChange(index,"price",e.target.value)} />

            <input type="number" placeholder="Qty"
              onChange={e => handleChange(index,"quantity",e.target.value)} />

            <button onClick={() => removeItem(index)}>X</button>

          </div>
        ))}

        <button onClick={addItem}>+ Add Item</button>
      </div>

      <h3>Total: ₹{total}</h3>

      <button onClick={submitBill}>Generate Bill</button>
    </div>
  );
}