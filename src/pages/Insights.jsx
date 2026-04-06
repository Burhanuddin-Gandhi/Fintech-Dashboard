import React from 'react';
import { useSelector } from 'react-redux';
import { selectTotals, selectBarData, selectDonutData, selectInsights } from '../store/selectors';
import { CATEGORIES } from '../data/mockData';
import { formatCurrency } from '../utils/formatters';
import BarChart   from '../components/Charts/BarChart';
import DonutChart from '../components/Charts/DonutChart';

export default function Insights() {
  const totals   = useSelector(selectTotals);
  const barData  = useSelector(selectBarData);
  const donut    = useSelector(selectDonutData);
  const insights = useSelector(selectInsights);
  const donutTotal = donut.reduce((s, d) => s + d.value, 0);

  const insightCards = [
    {
      label: 'Top Spend Category',
      value: insights.topCategory?.name ?? '—',
      note:  insights.topCategory ? `${formatCurrency(insights.topCategory.amount)} total spent` : '',
      bg:    CATEGORIES[insights.topCategory?.name]?.bg ?? '#eef2ff',
      iconColor: CATEGORIES[insights.topCategory?.name]?.color ?? '#6366f1',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
        </svg>
    ),
    },
    {
      label: 'Month-on-Month',
      value: `${insights.monthDiff >= 0 ? '+' : ''}${formatCurrency(insights.monthDiff)}`,
      note:  insights.monthDiff >= 0 ? 'More spent vs April' : 'Less spent vs April',
      bg:    insights.monthDiff >= 0 ? '#fef2f2' : '#f0fdf4',
      iconColor: insights.monthDiff >= 0 ? '#ef4444' : '#22c55e',
      icon: insights.monthDiff >= 0 ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
          <path d="M22 7L13.5 15.5L8.5 10.5L2 17"/>
          <path d="M16 7h6v6"/>
        </svg>
    ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
          <path d="M22 17L13.5 8.5L8.5 13.5L2 7"/>
          <path d="M16 17h6v-6"/>
        </svg>
    ),
      valueColor: insights.monthDiff >= 0 ? 'text-red-400' : 'text-emerald-500',
    },
    {
      label: 'Savings Rate',
      value: `${insights.savingsRate}%`,
      note:  'of total income retained',
      bg:    '#fffbeb',
      iconColor: '#f59e0b',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
      ),
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-[21px] font-bold text-slate-900 dark:text-white tracking-tight">
          Insights & Analytics
        </h1>
        <p className="text-[13px] text-slate-500 mt-1">
          Smart observations about your finances
        </p>
      </div>

      {/* Insight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {insightCards.map((c, i) => (
          <div key={i}
            className="bg-white dark:bg-slate-0 rounded-2xl p-5 border border-slate-200
                       dark:border-slate-800 bg-white shadow-sm flex items-start gap-3"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: c.bg, color: c.iconColor }}
            >
              {c.icon}  
            </div>
            <div>
              <p className="text-[10.5px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                {c.label}
              </p>
              <p className={`text-[16px] font-bold leading-tight
                ${c.valueColor ?? 'text-slate-900'}`}
              >
                {c.value}
              </p>
              <p className="text-[11.5px] text-slate-400 mt-0.5">{c.note}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3 bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <h2 className="text-[14px] font-semibold text-slate-800 mb-1">Monthly Trend</h2>
          <p className="text-[11.5px] text-slate-400 mb-4">Income vs Expenses over 5 months</p>
          <BarChart data={barData}/>
        </div>
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <h2 className="text-[14px] font-semibold text-slate-800 mb-1">Expense Breakdown</h2>
          <p className="text-[11.5px] text-slate-400 mb-4">Where your money goes</p>
          <DonutChart data={donut}/>
        </div>
      </div>

      {/* Category Progress Bars */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
        <h2 className="text-[14px] font-semibold text-slate-800 mb-1 dark:text-white tracking-tight">
          Category Breakdown
        </h2>
        <p className="text-[11.5px] text-slate-400 mb-5">
          All expense categories ranked by spend
        </p>
        <div className="space-y-4">
          {donut.map((d, i) => {
            const pct = Math.round((d.value / donutTotal) * 100);
            return (
              <div key={i}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
                      style={{ background: CATEGORIES[d.name]?.color }}
                    />
                    <span className="text-[13px] font-medium text-slate-700">{d.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[11.5px] text-slate-400">{pct}%</span>
                    <span className="text-[13px] font-semibold font-mono text-slate-700">
                      {formatCurrency(d.value)}
                    </span>
                  </div>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width:      `${pct}%`,
                      background: CATEGORIES[d.name]?.color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Income',   value: formatCurrency(totals.income),   color: 'text-emerald-500' },
          { label: 'Total Expenses', value: formatCurrency(totals.expense),  color: 'text-red-400'     },
          { label: 'Net Balance',    value: formatCurrency(totals.balance),  color: 'text-indigo-500'  },
          { label: 'Savings Rate',   value: `${insights.savingsRate}%`,      color: 'text-amber-500'   },
        ].map((s, i) => (
          <div key={i}
            className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm text-center"
          >
            <p className="text-[10.5px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
              {s.label}
            </p>
            <p className={`text-[18px] font-bold font-mono ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

    </div>
  );
}