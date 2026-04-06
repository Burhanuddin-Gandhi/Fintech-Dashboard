import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSidebarOpen} from '../../store/slices/uiSlice';

export default function Topbar() {
  const dispatch    = useDispatch();
  const role        = useSelector(s => s.ui.role);
  const sidebarOpen = useSelector(s => s.ui.sidebarOpen);
  

  return (
    <header className="lg:hidden sticky top-0 z-[100] flex items-center justify-between
                       px-4 py-3.5 bg-white dark:bg-slate-900 border-b
                       border-slate-200 dark:border-slate-800 transition-colors duration-300">
      {/* Logo */}
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 bg-indigo-500 rounded-lg flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="white" width="15" height="15">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
          </svg>
        </div>
        <span className="text-[15px] font-bold text-slate-900 dark:text-white tracking-tight">
          Finflow
        </span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2.5">

        {/* Role badge */}
        <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full
          ${role === 'admin'
            ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400'
            : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
          }`}
        >
          {role === 'admin' ? 'Admin' : 'Viewer'}
        </span>

        {/* Hamburger */}
        <button
          onClick={() => dispatch(setSidebarOpen(!sidebarOpen))}
          className="p-2 rounded-lg text-slate-700 dark:text-slate-300
                     hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="20" height="20">
            <path d="M3 6h18M3 12h18M3 18h18"/>
          </svg>
        </button>

      </div>
    </header>
  );
}