export const formatCurrency = (amount) =>
  '₹' + Math.abs(amount).toLocaleString('en-IN');

export const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString('en-IN', {
    day:   'numeric',
    month: 'short',
    year:  'numeric',
  });

export const formatMonth = (dateStr) =>
  new Date(dateStr).toLocaleDateString('en-IN', {
    month: 'long',
    year:  'numeric',
  });

export const formatPercentage = (value) =>
  `${Math.round(value)}%`;