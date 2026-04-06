import React from 'react';
import { useSelector } from 'react-redux';
import StatCard   from '../components/UI/StatCard';
import BarChart   from '../components/Charts/BarChart';
import DonutChart from '../components/Charts/DonutChart';
import { selectTotals, selectBarData, selectDonutData, selectFiltered } from '../store/selectors';
import { CATEGORIES } from '../data/mockData';
import { formatCurrency, formatDate } from '../utils/formatters';

export default function Dashboard() {
  const totals    = useSelector(selectTotals);
  const barData   = useSelector(selectBarData);
  const donutData = useSelector(selectDonutData);
  const allTxn    = useSelector(s => s.transactions.items);
  const recent    = [...allTxn].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

  const cards = [
    {
      label:      'Total Balance',
      value:      totals.balance,
      change:     '12.4%',
      direction:  'up',
      iconBg:     '#eef2ff',
      iconColor:  '#6366f1',
      icon:       <><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></>,
    },
    {
      label:      'Total Income',
      value:      totals.income,
      change:     '8.1%',
      direction:  'up',
      iconBg:     '#f0fdf4',
      iconColor:  '#22c55e',
      icon:       <path d="M12 19V5M5 12l7-7 7 7"/>,
    },
    {
      label:      'Total Expenses',
      value:      totals.expense,
      change:     '5.3%',
      direction:  'down',
      iconBg:     '#fef2f2',
      iconColor:  '#ef4444',
      icon:       <path d="M12 5v14M5 12l7 7 7-7"/>,
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="ext-[21px] font-bold text-slate-900 dark:text-white tracking-tight">
          Financial Overview
        </h1>
        <p className="text-[13px] text-slate-500 mt-1">
          May 2024 &middot; {allTxn.length} transactions
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((c, i) => <StatCard key={i} {...c}/>)}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Bar Chart */}
        <div className="lg:col-span-3 bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <h2 className="text-[14px] font-semibold text-slate-800 mb-1">
            Income vs Expenses
          </h2>
          <p className="text-[11.5px] text-slate-400 mb-4">
            Last 5 months comparison
          </p>
          <BarChart data={barData}/>
        </div>

        {/* Donut Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <h2 className="text-[14px] font-semibold text-slate-800 mb-1">
            Spending by Category
          </h2>
          <p className="text-[11.5px] text-slate-400 mb-4">
            All time distribution
          </p>
          <DonutChart data={donutData}/>
        </div>
      </div>

      {/* Recent Transactions */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[14px] font-semibold text-slate-800 dark:text-white tracking-tight">
            Recent Transactions
          </h2>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px]">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="text-left px-5 py-3 text-[10.5px] font-semibold text-slate-400 uppercase tracking-wider">Description</th>
                  <th className="text-left px-5 py-3 text-[10.5px] font-semibold text-slate-400 uppercase tracking-wider">Category</th>
                  <th className="text-left px-5 py-3 text-[10.5px] font-semibold text-slate-400 uppercase tracking-wider">Date</th>
                  <th className="text-left px-5 py-3 text-[10.5px] font-semibold text-slate-400 uppercase tracking-wider">Type</th>
                  <th className="text-right px-5 py-3 text-[10.5px] font-semibold text-slate-400 uppercase tracking-wider">Amount</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((t, i) => (
                  <tr
                    key={t.id}
                    className={`border-b border-slate-50 hover:bg-slate-50 transition-colors
                      ${i === recent.length - 1 ? 'border-none' : ''}`}
                  >
                    <td className="px-5 py-3.5 text-[13px] font-medium text-slate-800">
                      {t.description}
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium"
                        style={{
                          background: CATEGORIES[t.category]?.bg,
                          color:      CATEGORIES[t.category]?.color,
                        }}
                      >
                        {t.category}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-[12px] text-slate-400">
                      {formatDate(t.date)}
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`text-[11px] font-semibold px-2 py-1 rounded-md
                        ${t.type === 'income'
                          ? 'bg-emerald-50 text-emerald-600'
                          : 'bg-red-50 text-red-400'
                        }`}
                      >
                        {t.type}
                      </span>
                    </td>
                    <td className={`px-5 py-3.5 text-right text-[13px] font-semibold font-mono
                      ${t.type === 'income' ? 'text-emerald-500' : 'text-red-400'}`}
                    >
                      {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
}