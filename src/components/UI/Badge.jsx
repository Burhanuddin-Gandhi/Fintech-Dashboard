import React from 'react';
import { CATEGORIES } from '../../data/mockData';

export function CategoryBadge({ category }) {
  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium whitespace-nowrap"
      style={{
        background: CATEGORIES[category]?.bg,
        color:      CATEGORIES[category]?.color,
      }}
    >
      {category}
    </span>
  );
}

export function TypeBadge({ type }) {
  return (
    <span className={`text-[11px] font-semibold px-2 py-1 rounded-md whitespace-nowrap
      ${type === 'income'
        ? 'bg-emerald-50 text-emerald-600'
        : 'bg-red-50 text-red-400'
      }`}
    >
      {type}
    </span>
  );
}