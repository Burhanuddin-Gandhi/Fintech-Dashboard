import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    search: '',
    category: '',
    type: '',
    sort: 'date-desc',
  },
  reducers: {
    setSearch:    (state, action) => { state.search   = action.payload },
    setCategory:  (state, action) => { state.category = action.payload },
    setType:      (state, action) => { state.type     = action.payload },
    setSort:      (state, action) => { state.sort     = action.payload },
    resetFilters: (state)         => {
      state.search   = '';
      state.category = '';
      state.type     = '';
      state.sort     = 'date-desc';
    },
  },
});

export const { setSearch, setCategory, setType, setSort, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;