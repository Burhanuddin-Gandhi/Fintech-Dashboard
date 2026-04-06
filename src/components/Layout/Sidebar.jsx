import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveTab, setSidebarOpen, setRole ,toggleDarkMode} from '../../store/slices/uiSlice';

const navItems = [
  {
    id: 'dashboard',
    label: 'Overview',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="17" height="17">
        <rect x="3" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/>
        <rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
  },
  {
    id: 'transactions',
    label: 'Transactions',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="17" height="17">
        <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/>
        <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/>
        <path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/>
      </svg>
    ),
  },
  {
    id: 'insights',
    label: 'Insights',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="17" height="17">
        <path d="m22 12-4-4-4 4-4-4-4 4"/>
        <path d="M2 20h20"/>
      </svg>
    ),
  },
];

export default function Sidebar() {
  const dispatch   = useDispatch();
  const activeTab  = useSelector(s => s.ui.activeTab);
  const role       = useSelector(s => s.ui.role);
  const sidebarOpen = useSelector(s => s.ui.sidebarOpen);
  const darkMode = useSelector(s => s.ui.darkMode);

  

  const go = (tab) => {
    dispatch(setActiveTab(tab));
    dispatch(setSidebarOpen(false));
  };

  return (
    <>
      {/* Overlay (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[199] lg:hidden"
          onClick={() => dispatch(setSidebarOpen(false))}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
            fixed top-0 left-0 h-screen w-[220px] bg-white dark:bg-slate-900
            border-r border-slate-200 dark:border-slate-800
            flex flex-col z-[200] transition-transform duration-300
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            lg:translate-x-0 lg:sticky
        `}
      >
        {/* Logo */}
        <div className="px-5 py-5 border-b border-slate-200 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" fill="white" width="17" height="17">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
              </svg>
            </div>
            <div>
              <div className="text-[15px] font-bold text-slate-900 dark:text-white tracking-tight">Finflow</div>
              <div className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest">Dashboard</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-600 uppercase tracking-widest px-2 mb-2">
            Navigation
          </p>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13.5px] font-medium
                  transition-all duration-150 mb-1 text-left
                  ${activeTab === item.id
                    ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400'
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-white'
                  }
                `}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
        {/* Dark mode toggle */}
          <div className="px-5 py-3 border-t border-slate-200 dark:border-slate-800 flex-shrink-0">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-semibold text-slate-500 dark:text-slate-400">
              Dark Mode
            </span>
            <button
              onClick={() => dispatch(toggleDarkMode())}
              className={`relative inline-flex h-6 w-11 items-center rounded-full
                          transition-colors duration-300 focus:outline-none
                          ${darkMode ? 'bg-indigo-500' : 'bg-slate-200'}`}
            >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm
                        transition-transform duration-300
                        ${darkMode ? 'translate-x-6' : 'translate-x-1'}`}
          />
        </button>
      </div>
    </div>
        {/* Role Switcher */}
        <div className="px-5 py-4 border-t border-slate-200 dark:border-slate-800 flex-shrink-0">
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-2">
            Access Role
          </p>
          <select
            value={role}
            onChange={e => dispatch(setRole(e.target.value))}
            className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg
                text-[13px] bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200
                cursor-pointer focus:outline-none focus:border-indigo-400
                focus:ring-2 focus:ring-indigo-100 transition"
          >
            <option value="admin">Admin</option>
            <option value="viewer">Viewer</option>
          </select>
          <span
            className={`
              inline-flex items-center gap-1 mt-2 px-2.5 py-1 rounded-full text-[11px] font-semibold
              ${role === 'admin'
                ? 'bg-indigo-50 text-indigo-600'
                : 'bg-slate-100 text-slate-500'
              }
            `}
          >
            {role === 'admin' ? 'Admin Access' : 'View Only'}
          </span>
        </div>
      </aside>
    </>
  );
}   