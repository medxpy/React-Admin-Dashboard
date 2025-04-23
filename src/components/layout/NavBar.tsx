import React from 'react';
import { LayoutDashboard, BarChart3, PieChart, Users, Settings, Menu, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';

interface NavBarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const NavBar: React.FC<NavBarProps> = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <div
      className={`fixed inset-y-0 left-0 bg-white shadow-md w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static z-30 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-500 text-white rounded-md flex items-center justify-center">
              <BarChart3 className="w-5 h-5" />
            </div>
            <span className="text-lg font-bold text-gray-900">StartupMetrics</span>
          </div>
          <button
            className="lg:hidden text-gray-500 hover:text-gray-700"
            onClick={toggleSidebar}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-4 flex-1 overflow-y-auto">
          <nav className="px-3 space-y-1">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-primary-600'
                }`
              }
            >
              <LayoutDashboard className="w-5 h-5 mr-3" />
              Dashboard
            </NavLink>
            <NavLink
              to="/users"
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-primary-600'
                }`
              }
            >
              <Users className="w-5 h-5 mr-3" />
              Users
            </NavLink>
            <NavLink
              to="/revenue"
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-primary-600'
                }`
              }
            >
              <BarChart3 className="w-5 h-5 mr-3" />
              Revenue
            </NavLink>
            <NavLink
              to="/engagement"
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-primary-600'
                }`
              }
            >
              <PieChart className="w-5 h-5 mr-3" />
              Engagement
            </NavLink>
          </nav>
        </div>

        <div className="p-4 border-t border-gray-100">
          <NavLink
            to="/settings"
            className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-600"
          >
            <Settings className="w-5 h-5 mr-3" />
            Settings
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export const MobileHeader: React.FC<{ toggleSidebar: () => void }> = ({ toggleSidebar }) => {
  return (
    <div className="lg:hidden fixed top-0 left-0 right-0 bg-white shadow-sm border-b border-gray-200 z-20">
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary-500 text-white rounded-md flex items-center justify-center">
            <BarChart3 className="w-5 h-5" />
          </div>
          <span className="text-lg font-bold text-gray-900">StartupMetrics</span>
        </div>
        <button
          className="text-gray-500 hover:text-gray-700"
          onClick={toggleSidebar}
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};