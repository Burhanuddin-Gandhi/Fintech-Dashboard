import React from 'react';
import { useSelector } from 'react-redux';
import { CATEGORIES } from '../../data/mockData';
import { formatCurrency } from '../../utils/formatters';

export default function DonutChart({ data }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  let cumulative = 0;
  const r = 44, cx = 54, cy = 54, strokeW = 16;
  const circumference = 2 * Math.PI * r;

  return (
    <div className="flex items-center gap-4 flex-wrap">
      {/* SVG Donut */}
      <svg width="108" height="108" viewBox="0 0 108 108" className="flex-shrink-0">
        {/* Track */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f1f5f9" strokeWidth={strokeW}/>
        {/* Segments */}
        {data.map((d, i) => {
          const pct  = d.value / total;
          const dash = pct * circumference;
          const offset = -cumulative * circumference - circumference * 0.25;
          cumulative += pct;
          return (
            <circle
              key={i} cx={cx} cy={cy} r={r}
              fill="none"
              stroke={CATEGORIES[d.name]?.color || '#94a3b8'}
              strokeWidth={strokeW}
              strokeDasharray={`${dash} ${circumference - dash}`}
              strokeDashoffset={offset}
              className="transition-all duration-500"
            />
          );
        })}
        {/* Center text */}
        <text x={cx} y={cy - 4} textAnchor="middle" fontSize="10"
              fontWeight="700" fontFamily="monospace" fill="#0f172a">
          {formatCurrency(total)}
        </text>
        <text x={cx} y={cy + 9} textAnchor="middle" fontSize="7.5" fill="#94a3b8">
          expenses
        </text>
      </svg>

      {/* Labels */}
      <div className="flex flex-col gap-2 flex-1 min-w-[100px]">
        {data.map((d, i) => (
          <div key={i} className="flex items-center gap-2 text-[12px]">
            <div
              className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
              style={{ background: CATEGORIES[d.name]?.color || '#94a3b8' }}
            />
            <span className="flex-1 text-slate-500 truncate">{d.name}</span>
            <span className="font-semibold text-[11px] font-mono text-slate-700">
              {Math.round((d.value / total) * 100)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}