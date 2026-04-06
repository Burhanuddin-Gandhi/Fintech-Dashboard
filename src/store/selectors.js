import { createSelector } from '@reduxjs/toolkit';

const getItems   = state => state.transactions.items;
const getFilters = state => state.filters;

export const selectFiltered = createSelector(
  [getItems, getFilters],
  (items, filters) => {
    let result = [...items];

    if (filters.search)
      result = result.filter(t =>
        t.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        t.category.toLowerCase().includes(filters.search.toLowerCase())
      );

    if (filters.category)
      result = result.filter(t => t.category === filters.category);

    if (filters.type)
      result = result.filter(t => t.type === filters.type);

    const [key, dir] = filters.sort.split('-');
    result.sort((a, b) => {
      const av = key === 'date' ? new Date(a.date) : a.amount;
      const bv = key === 'date' ? new Date(b.date) : b.amount;
      return dir === 'asc' ? av - bv : bv - av;
    });

    return result;
  }
);

export const selectTotals = createSelector([getItems], (items) => {
  const income  = items.filter(t => t.type === 'income').reduce((s, t)  => s + t.amount, 0);
  const expense = items.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  return { income, expense, balance: income - expense };
});

export const selectDonutData = createSelector([getItems], (items) => {
  const cats = {};
  items
    .filter(t => t.type === 'expense')
    .forEach(t => { cats[t.category] = (cats[t.category] || 0) + t.amount });
  return Object.entries(cats)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, value]) => ({ name, value }));
});

export const selectBarData = createSelector([getItems], (items) => {
  const months = [
    { label: 'Jan', prefix: '2024-01' },
    { label: 'Feb', prefix: '2024-02' },
    { label: 'Mar', prefix: '2024-03' },
    { label: 'Apr', prefix: '2024-04' },
    { label: 'May', prefix: '2024-05' },
  ];
  return months.map(({ label, prefix }) => ({
    month:   label,
    income:  items.filter(t => t.type === 'income'  && t.date.startsWith(prefix)).reduce((s, t) => s + t.amount, 0),
    expense: items.filter(t => t.type === 'expense' && t.date.startsWith(prefix)).reduce((s, t) => s + t.amount, 0),
  }));
});

export const selectInsights = createSelector([getItems], (items) => {
  const cats = {};
  items
    .filter(t => t.type === 'expense')
    .forEach(t => { cats[t.category] = (cats[t.category] || 0) + t.amount });

  const topCategory = Object.entries(cats).sort((a, b) => b[1] - a[1])[0];

  const mayExp = items.filter(t => t.type === 'expense' && t.date.startsWith('2024-05')).reduce((s, t) => s + t.amount, 0);
  const aprExp = items.filter(t => t.type === 'expense' && t.date.startsWith('2024-04')).reduce((s, t) => s + t.amount, 0);

  const totalIncome  = items.filter(t => t.type === 'income').reduce((s, t)  => s + t.amount, 0);
  const totalExpense = items.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const savingsRate  = totalIncome > 0 ? Math.round((1 - totalExpense / totalIncome) * 100) : 0;

  return {
    topCategory: topCategory ? { name: topCategory[0], amount: topCategory[1] } : null,
    monthDiff: mayExp - aprExp,
    mayExpense: mayExp,
    aprExpense: aprExp,
    savingsRate,
  };
});