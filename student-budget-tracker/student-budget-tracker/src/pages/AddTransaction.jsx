import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTransaction } from '../api/transactionAPI';

export default function AddTransaction() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    type: 'expense',                     // 'income' | 'expense'
    category: 'General',
    amount: '',
    date: new Date().toISOString().slice(0, 10),
    note: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await createTransaction({
        type: form.type,
        category: form.category,
        amount: Number(form.amount || 0),
        date: form.date,
        note: form.note,
      });

      // go to history (or wherever you list transactions)
      navigate('/history');
    } catch (err) {
      console.error(err);
      setError('Failed to add transaction. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-semibold mb-4">Add Transaction</h1>

      {error && (
        <div className="mb-4 rounded border border-red-200 bg-red-50 text-red-700 p-3">
          {error}
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Type</label>
          <div className="flex items-center gap-4">
            <label className="inline-flex items-center gap-2">
              <input
                type="radio"
                name="type"
                value="expense"
                checked={form.type === 'expense'}
                onChange={onChange}
              />
              <span>Expense</span>
            </label>
            <label className="inline-flex items-center gap-2">
              <input
                type="radio"
                name="type"
                value="income"
                checked={form.type === 'income'}
                onChange={onChange}
              />
              <span>Income</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <input
            className="w-full border rounded px-3 py-2"
            name="category"
            value={form.category}
            onChange={onChange}
            placeholder="e.g., Groceries"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Amount</label>
          <input
            className="w-full border rounded px-3 py-2"
            name="amount"
            type="number"
            step="0.01"
            min="0"
            value={form.amount}
            onChange={onChange}
            placeholder="0.00"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Date</label>
          <input
            className="w-full border rounded px-3 py-2"
            name="date"
            type="date"
            value={form.date}
            onChange={onChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Note (optional)</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            name="note"
            rows={3}
            value={form.note}
            onChange={onChange}
            placeholder="Optional memo"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {submitting ? 'Saving…' : 'Add Transaction'}
        </button>
      </form>
    </div>
  );
}
