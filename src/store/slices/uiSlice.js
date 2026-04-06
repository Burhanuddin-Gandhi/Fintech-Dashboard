import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    role: 'admin',
    activeTab: 'dashboard',
    sidebarOpen: false,
    modal: null,
    darkMode: false,
  },
  reducers: {
    setRole:        (state, action) => { state.role        = action.payload },
    setActiveTab:   (state, action) => { state.activeTab   = action.payload },
    setSidebarOpen: (state, action) => { state.sidebarOpen = action.payload },
    openModal:      (state, action) => { state.modal       = action.payload },
    closeModal:     (state)         => { state.modal       = null },
    toggleDarkMode: (state) => { state.darkMode = !state.darkMode },
  },
});

export const { setRole, setActiveTab, setSidebarOpen, openModal, closeModal ,toggleDarkMode} = uiSlice.actions;
export default uiSlice.reducer;