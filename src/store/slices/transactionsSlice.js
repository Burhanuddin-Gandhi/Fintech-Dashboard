import { createSlice } from '@reduxjs/toolkit';
import { INITIAL_TRANSACTIONS } from '../../data/mockData';

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: {
    items: INITIAL_TRANSACTIONS,
  },
  reducers: {
    addTransaction: (state, action) => {
      state.items.unshift({ ...action.payload, id: Date.now() });
    },
    editTransaction: (state, action) => {
      const idx = state.items.findIndex(t => t.id === action.payload.id);
      if (idx !== -1) state.items[idx] = action.payload;
    },
    deleteTransaction: (state, action) => {
      state.items = state.items.filter(t => t.id !== action.payload);
    },
  },
});

export const { addTransaction, editTransaction, deleteTransaction } = transactionsSlice.actions;
export default transactionsSlice.reducer;