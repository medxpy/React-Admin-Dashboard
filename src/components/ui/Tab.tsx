import React, { ReactNode } from 'react';

interface TabProps {
  label: string;
  value: string;
  isActive: boolean;
  onClick: (value: string) => void;
  icon?: ReactNode;
}

export const Tab: React.FC<TabProps> = ({ 
  label, 
  value, 
  isActive, 
  onClick, 
  icon 
}) => {
  return (
    <button
      className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
        isActive
          ? 'bg-primary-50 text-primary-700 border-b-2 border-primary-500'
          : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
      }`}
      onClick={() => onClick(value)}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </button>
  );
};

interface TabsProps {
  children: ReactNode;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ children, className = '' }) => {
  return <div className={`flex space-x-1 overflow-x-auto ${className}`}>{children}</div>;
};