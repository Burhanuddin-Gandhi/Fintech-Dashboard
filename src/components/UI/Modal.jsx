import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../store/slices/uiSlice';
import { addTransaction, editTransaction } from '../../store/slices/transactionsSlice';
import { CATEGORIES } from '../../data/mockData';

const BLANK = {
  date:        new Date().toISOString().slice(0, 10),
  description: '',
  category:    'Food',
  type:        'expense',
  amount:      '',
};

export default function Modal() {
  const dispatch = useDispatch();
  const modal    = useSelector(s => s.ui.modal);
  const [form, setForm] = useState(BLANK);
  const [errors, setErrors] = useState({});

  const isEdit = modal?.mode === 'edit';

  useEffect(() => {
    if (isEdit) setForm(modal.transaction);
    else        setForm(BLANK);
    setErrors({});
  }, [modal]);

  // Close on Escape
  useEffect(() => {
    const handler = e => e.key === 'Escape' && dispatch(closeModal());
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  if (!modal) return null;

  const set = (k, v) => {
    setForm(f => ({ ...f, [k]: v }));
    setErrors(e => ({ ...e, [k]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.description.trim()) e.description = 'Description is required';
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0)
    e.amount = 'Enter a valid positive amount';
    if (Number(form.amount) > 10000000)
    e.amount = 'Amount cannot exceed ₹1,00,00,000';
    if (!form.date) e.date = 'Date is required';
    return e;
  };

  const submit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    const payload = { ...form, amount: parseFloat(form.amount) };
    if (isEdit) dispatch(editTransaction(payload));
    else        dispatch(addTransaction(payload));
    dispatch(closeModal());
  };

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center p-4
                 bg-slate-900/40 backdrop-blur-sm"
      onClick={e => e.target === e.currentTarget && dispatch(closeModal())}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md
                      max-h-[calc(100vh-2rem)] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <h2 className="text-[16px] font-bold text-slate-900">
            {isEdit ? 'Edit Transaction' : 'Add Transaction'}
          </h2>
          <button
            onClick={() => dispatch(closeModal())}
            className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100
                       hover:text-slate-700 transition"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 strokeWidth="2.5" width="16" height="16">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          {/* Description */}
          <div>
            <label className="block text-[11.5px] font-semibold text-slate-500 mb-1.5">
              Description
            </label>
            <input
              className={`w-full px-3 py-2.5 border rounded-lg text-[13.5px]
                          focus:outline-none focus:ring-2 focus:ring-indigo-100
                          focus:border-indigo-400 transition bg-white text-slate-800
                          ${errors.description ? 'border-red-300' : 'border-slate-200'}`}
              placeholder="e.g. Grocery Shopping"
              value={form.description}
              onChange={e => set('description', e.target.value)}
            />
            {errors.description && (
              <p className="text-[11px] text-red-400 mt-1">{errors.description}</p>
            )}
          </div>

          {/* Amount + Date */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11.5px] font-semibold text-slate-500 mb-1.5">
                Amount (₹)
              </label>
              <input
                type="number"
                min="1"
                max="10000000"
                placeholder="0"
                className={`w-full px-3 py-2.5 border rounded-lg text-[13.5px]
                            focus:outline-none focus:ring-2 focus:ring-indigo-100
                            focus:border-indigo-400 transition bg-white text-slate-800
                            ${errors.amount ? 'border-red-300' : 'border-slate-200'}`}
                value={form.amount}
                onChange={e => set('amount', e.target.value)}
              />
              {errors.amount && (
                <p className="text-[11px] text-red-400 mt-1">{errors.amount}</p>
              )}
            </div>
            <div>
              <label className="block text-[11.5px] font-semibold text-slate-500 mb-1.5">
                Date
              </label>
              <input
                type="date"
                className={`w-full px-3 py-2.5 border rounded-lg text-[13.5px]
                            focus:outline-none focus:ring-2 focus:ring-indigo-100
                            focus:border-indigo-400 transition bg-white text-slate-800
                            ${errors.date ? 'border-red-300' : 'border-slate-200'}`}
                value={form.date}
                onChange={e => set('date', e.target.value)}
              />
              {errors.date && (
                <p className="text-[11px] text-red-400 mt-1">{errors.date}</p>
              )}
            </div>
          </div>

          {/*Category + Type*/} 
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11.5px] font-semibold text-slate-500 mb-1.5">
                Category
              </label>
              <select
                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-[13.5px]
                           focus:outline-none focus:ring-2 focus:ring-indigo-100
                           focus:border-indigo-400 transition bg-white text-slate-800"
                value={form.category}
                onChange={e => set('category', e.target.value)}
              >
                {Object.keys(CATEGORIES).map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[11.5px] font-semibold text-slate-500 mb-1.5">
                Type
              </label>
              <select
                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-[13.5px]
                           focus:outline-none focus:ring-2 focus:ring-indigo-100
                           focus:border-indigo-400 transition bg-white text-slate-800"
                value={form.type}
                onChange={e => set('type', e.target.value)}
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
          </div>
        </div>

        
        <div className="px-6 py-4 border-t border-slate-100 flex gap-2 justify-end">
          <button
            onClick={() => dispatch(closeModal())}
            className="px-4 py-2 rounded-lg text-[13px] font-semibold text-slate-600
                       border border-slate-200 hover:bg-slate-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            className="px-5 py-2 rounded-lg text-[13px] font-semibold text-white
                       bg-indigo-500 hover:bg-indigo-600 transition shadow-sm
                       hover:shadow-indigo-200 hover:shadow-md"
          >
            {isEdit ? 'Save Changes' : 'Add Transaction'}
          </button>
        </div>
      </div>
    </div>
  );
}