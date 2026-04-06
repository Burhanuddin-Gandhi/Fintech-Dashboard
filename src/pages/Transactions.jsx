import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../store/slices/uiSlice';
import { deleteTransaction } from '../store/slices/transactionsSlice';
import { setSearch, setCategory, setType, setSort, resetFilters } from '../store/slices/filtersSlice';
import { selectFiltered } from '../store/selectors';
import { CategoryBadge, TypeBadge } from '../components/UI/Badge';
import { formatCurrency, formatDate } from '../utils/formatters';
import { CATEGORIES } from '../data/mockData';

export default function Transactions() {
  const dispatch  = useDispatch();
  const role      = useSelector(s => s.ui.role);
  const filters   = useSelector(s => s.filters);
  const filtered  = useSelector(selectFiltered);
  const isAdmin   = role === 'admin';

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-[21px] font-bold text-slate-900 dark:text-white tracking-tight">
            Transactions
          </h1>
          <p className="text-[13px] text-slate-500 mt-1">
            {filtered.length} results found
          </p>
        </div>
        {isAdmin && (
          <button
            onClick={() => dispatch(openModal('add'))}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-500 hover:bg-indigo-600
                       text-white rounded-xl text-[13px] font-semibold transition
                       shadow-sm hover:shadow-md hover:shadow-indigo-200"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 strokeWidth="2.5" width="15" height="15">
              <path d="M12 5v14M5 12h14"/>
            </svg>
            Add Transaction
          </button>
        )}
      </div>

      {/* Viewer Notice */}
      {!isAdmin && (
        <div className="flex items-center gap-2.5 px-4 py-3 bg-amber-50 border
                        border-amber-200 rounded-xl text-[12.5px] text-amber-800">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
               strokeWidth="2" width="15" height="15">
            <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0
                     1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            <path d="M12 9v4M12 17h.01"/>
          </svg>
          <span>
            <strong>Viewer mode</strong> — transaction management is disabled.
          </span>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
        <div className="flex flex-wrap gap-3">
          {/* Search */}
          <div className="flex-1 min-w-[180px] relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                 viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 strokeWidth="2" width="15" height="15">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-lg
                         text-[13px] focus:outline-none focus:ring-2 focus:ring-indigo-100
                         focus:border-indigo-400 transition bg-white text-slate-800"
              placeholder="Search transactions..."
              value={filters.search}
              onChange={e => dispatch(setSearch(e.target.value))}
            />
          </div>

          {/* Category */}
          <select
            className="px-3 py-2.5 border border-slate-200 rounded-lg text-[13px]
                       focus:outline-none focus:ring-2 focus:ring-indigo-100
                       focus:border-indigo-400 transition bg-white text-slate-700 cursor-pointer"
            value={filters.category}
            onChange={e => dispatch(setCategory(e.target.value))}
          >
            <option value="">All Categories</option>
            {Object.keys(CATEGORIES).map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          {/* Type */}
          <select
            className="px-3 py-2.5 border border-slate-200 rounded-lg text-[13px]
                       focus:outline-none focus:ring-2 focus:ring-indigo-100
                       focus:border-indigo-400 transition bg-white text-slate-700 cursor-pointer"
            value={filters.type}
            onChange={e => dispatch(setType(e.target.value))}
          >
            <option value="">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          {/* Sort */}
          <select
            className="px-3 py-2.5 border border-slate-200 rounded-lg text-[13px]
                       focus:outline-none focus:ring-2 focus:ring-indigo-100
                       focus:border-indigo-400 transition bg-white text-slate-700 cursor-pointer"
            value={filters.sort}
            onChange={e => dispatch(setSort(e.target.value))}
          >
            <option value="date-desc">Date ↓</option>
            <option value="date-asc">Date ↑</option>
            <option value="amount-desc">Amount ↓</option>
            <option value="amount-asc">Amount ↑</option>
          </select>

          {/* Reset */}
          {(filters.search || filters.category || filters.type || filters.sort !== 'date-desc') && (
            <button
              onClick={() => dispatch(resetFilters())}
              className="px-3 py-2.5 border border-slate-200 rounded-lg text-[13px]
                         text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-slate-400">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 strokeWidth="1.5" width="40" height="40" className="mb-3 opacity-40">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            <p className="text-[14px] font-medium">No transactions found</p>
            <p className="text-[12px] mt-1">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[580px]">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  {['Description','Category','Date','Type','Amount', ...(isAdmin ? ['Actions'] : [])].map(h => (
                    <th key={h}
                      className={`px-5 py-3 text-[10.5px] font-semibold text-slate-400
                                  uppercase tracking-wider
                                  ${h === 'Amount' || h === 'Actions' ? 'text-right' : 'text-left'}`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((t, i) => (
                  <tr
                    key={t.id}
                    className={`hover:bg-slate-50 transition-colors
                      ${i !== filtered.length - 1 ? 'border-b border-slate-50' : ''}`}
                  >
                    <td className="px-5 py-3.5 text-[13px] font-medium text-slate-800">
                      {t.description}
                    </td>
                    <td className="px-5 py-3.5">
                      <CategoryBadge category={t.category}/>
                    </td>
                    <td className="px-5 py-3.5 text-[12px] text-slate-400">
                      {formatDate(t.date)}
                    </td>
                    <td className="px-5 py-3.5">
                      <TypeBadge type={t.type}/>
                    </td>
                    <td className={`px-5 py-3.5 text-right text-[13px] font-semibold font-mono
                      ${t.type === 'income' ? 'text-emerald-500' : 'text-red-400'}`}
                    >
                      {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                    </td>
                    {isAdmin && (
                      <td className="px-5 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => dispatch(openModal({ mode: 'edit', transaction: t }))}
                            className="p-1.5 rounded-lg text-slate-400 hover:bg-indigo-50
                                       hover:text-indigo-500 transition"
                          >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                 strokeWidth="2" width="14" height="14">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                              <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z"/>
                            </svg>
                          </button>
                          <button
                            onClick={() => dispatch(deleteTransaction(t.id))}
                            className="p-1.5 rounded-lg text-slate-400 hover:bg-red-50
                                       hover:text-red-400 transition"
                          >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                 strokeWidth="2" width="14" height="14">
                              <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>
                              <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                            </svg>
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}