import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Invoice from "./Invoice";

const API = "http://localhost:8080/bills";

export default function InvoicePage() {

  const { id } = useParams();
  const [bill, setBill] = useState(null);

  useEffect(() => {
    fetch(`${API}/${id}`)
      .then(res => res.json())
      .then(data => setBill(data));
  }, [id]);

  return <Invoice bill={bill} />;
}