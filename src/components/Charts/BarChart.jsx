import React from 'react';
import { formatCurrency } from '../../utils/formatters';

export default function BarChart({ data }) {
  const max = Math.max(...data.flatMap(d => [d.income, d.expense]), 1);

  return (
    <div>
      <div className="flex items-end gap-2 h-36">
        {data.map((d, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full">
            <div className="flex gap-1 items-end flex-1 w-full">
              {/* Income bar */}
              <div className="group relative flex-1 flex flex-col justify-end">
                <div
                  className="w-full bg-emerald-400 rounded-t-md opacity-85 transition-all duration-300 cursor-pointer hover:opacity-100"
                  style={{ height: `${(d.income / max) * 100}%` }}
                >
                  {/* Tooltip */}
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 hidden group-hover:block
                                  bg-slate-800 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap z-10">
                    {formatCurrency(d.income)}
                  </div>
                </div>
              </div>
              {/* Expense bar */}
              <div className="group relative flex-1 flex flex-col justify-end">
                <div
                  className="w-full bg-indigo-400 rounded-t-md opacity-85 transition-all duration-300 cursor-pointer hover:opacity-100"
                  style={{ height: `${(d.expense / max) * 100}%` }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 hidden group-hover:block
                                  bg-slate-800 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap z-10">
                    {formatCurrency(d.expense)}
                  </div>
                </div>
              </div>
            </div>
            <p className="text-[9px] text-slate-400 font-medium">{d.month}</p>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex gap-4 mt-3">
        <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"/>
          Income
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
          <div className="w-2.5 h-2.5 rounded-full bg-indigo-400"/>
          Expense
        </div>
      </div>
    </div>
  );
}