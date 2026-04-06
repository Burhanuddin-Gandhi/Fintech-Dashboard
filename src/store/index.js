import { configureStore } from '@reduxjs/toolkit';
import transactionsReducer from './slices/transactionsSlice';
import filtersReducer      from './slices/filtersSlice';
import uiReducer           from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    filters:      filtersReducer,
    ui:           uiReducer,
  },
});