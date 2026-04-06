import React from 'react';
 import { formatCurrency } from '../../utils/formatters';

export default function StatCard({ label, value, change, direction, icon, iconBg, iconColor }) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
      <div className="flex items-start justify-between mb-3">
        <p className="text-[11.5px] font-semibold text-slate-400 uppercase tracking-wider">
          {label}
        </p>
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: iconBg }}
        >
          <svg
            viewBox="0 0 24 24" fill="none"
            stroke={iconColor} strokeWidth="2"
            width="17" height="17"
          >
            {icon}
          </svg>
        </div>
      </div>
      <p className="text-[24px] font-bold text-slate-900 tracking-tight font-mono leading-none">
        {formatCurrency(value)}
      </p>
      <p className={`text-[12px] font-medium mt-2 flex items-center gap-1
        ${direction === 'up' ? 'text-emerald-500' : 'text-red-400'}`}
      >
        {direction === 'up' ? '▲' : '▼'} {change} vs last month
      </p>
    </div>
  );
}
