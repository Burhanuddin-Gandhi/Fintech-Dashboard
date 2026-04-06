import React from 'react';
import Sidebar from './Sidebar';
import Topbar  from './Topbar';

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 lg:ml-0">
        <Topbar />
        <main className="flex-1 p-4 sm:p-6 lg:p-7 overflow-x-hidden
                 bg-slate-100 dark:bg-slate-950 transition-colors duration-300">
          {children}
        </main>
      </div>
    </div>
  );
}