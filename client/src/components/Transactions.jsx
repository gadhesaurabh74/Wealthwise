import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { apiRequest } from "../lib/api.js";
import { Button } from "./ui.jsx";

export default function Transactions() {
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    type: "expense",
    amount: "",
    category: "",
    merchant: "",
    date: new Date().toISOString().slice(0, 10),
  });
  useEffect(() => {
    apiRequest("/transactions")
      .then((data) => setItems(data.items || []))
      .catch(() => setMessage("Could not load transactions."));
  }, []);
  const update = (event) =>
    setForm({ ...form, [event.target.name]: event.target.value });
  const submit = async (event) => {
    event.preventDefault();
    try {
      const data = await apiRequest("/transactions", {
        method: "POST",
        body: JSON.stringify(form),
      });
      setItems([data.item, ...items]);
      setForm({ ...form, amount: "", merchant: "" });
      setMessage("Transaction added.");
    } catch (error) {
      setMessage(error.message);
    }
  };
  return (
    <main className="app-content">
      <div className="dashboard-heading">
        <div>
          <span className="eyebrow">Your ledger</span>
          <h2>Transactions</h2>
        </div>
      </div>
      <div className="finance-layout">
        <form className="data-panel transaction-form" onSubmit={submit}>
          <h3>Add a transaction</h3>
          <label>
            Type
            <select name="type" value={form.type} onChange={update}>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </label>
          <label>
            Amount
            <input
              name="amount"
              value={form.amount}
              onChange={update}
              required
              min="0.01"
              step="0.01"
              type="number"
            />
          </label>
          <label>
            Category
            <input
              name="category"
              value={form.category}
              onChange={update}
              required
              placeholder="Food"
            />
          </label>
          <label>
            Merchant
            <input name="merchant" value={form.merchant} onChange={update} />
          </label>
          <label>
            Date
            <input
              name="date"
              value={form.date}
              onChange={update}
              required
              type="date"
            />
          </label>
          {message && <p>{message}</p>}
          <Button>
            Add transaction <ArrowRight size={15} />
          </Button>
        </form>
        <section className="data-panel transaction-list">
          <div className="panel-title">
            <h3>Recent activity</h3>
            <span>{items.length} shown</span>
          </div>
          {items.length ? (
            items.map((item) => (
              <div className="transaction-row" key={item._id}>
                <span className="transaction-icon">
                  {item.type === "income" ? "+" : "-"}
                </span>
                <div>
                  <b>{item.merchant || item.category}</b>
                  <small>
                    {item.category} · {new Date(item.date).toLocaleDateString()}
                  </small>
                </div>
                <strong>
                  {item.type === "income" ? "+" : "-"}${item.amount.toFixed(2)}
                </strong>
              </div>
            ))
          ) : (
            <p>Your transactions will appear here after you add them.</p>
          )}
        </section>
      </div>
    </main>
  );
}
