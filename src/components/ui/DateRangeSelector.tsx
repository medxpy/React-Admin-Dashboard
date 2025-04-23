import React, { useState } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';
import { TimeRange } from '../../types';
import { formatDate, getDateRangeFromTimeRange } from '../../utils/dateUtils';

interface DateRangeSelectorProps {
  selectedRange: TimeRange;
  onRangeChange: (range: TimeRange) => void;
}

export const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({ 
  selectedRange, 
  onRangeChange 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { startDate, endDate } = getDateRangeFromTimeRange(selectedRange);

  const timeRanges: { value: TimeRange; label: string }[] = [
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' },
    { value: '1y', label: 'Last Year' },
    { value: 'custom', label: 'Custom Range' },
  ];

  const handleOptionClick = (range: TimeRange) => {
    onRangeChange(range);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
      >
        <Calendar className="h-4 w-4 mr-2 text-gray-500" />
        <span>
          {selectedRange === 'custom'
            ? `${formatDate(startDate)} - ${formatDate(endDate)}`
            : timeRanges.find((r) => r.value === selectedRange)?.label}
        </span>
        <ChevronDown className="h-4 w-4 ml-2 text-gray-500" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          <div className="py-1">
            {timeRanges.map((range) => (
              <button
                key={range.value}
                className={`w-full text-left px-4 py-2 text-sm ${
                  selectedRange === range.value
                    ? 'bg-primary-50 text-primary-700 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => handleOptionClick(range.value)}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};