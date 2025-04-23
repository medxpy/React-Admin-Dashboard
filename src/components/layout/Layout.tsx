import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Outlet } from 'react-router-dom';
import { NavBar, MobileHeader } from './NavBar';

export const Layout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    if (isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="h-screen flex overflow-hidden bg-background-light">
      <NavBar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <MobileHeader toggleSidebar={toggleSidebar} />

      {/* Backdrop for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 z-20 lg:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      <div className="flex-1 flex flex-col overflow-hidden lg:pl-16">
        <motion.main 
          className="flex-1 overflow-y-auto pt-4 pb-6 px-4 lg:p-6 lg:pt-3 mt-14 lg:mt-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.main>
      </div>
    </div>
  );
};