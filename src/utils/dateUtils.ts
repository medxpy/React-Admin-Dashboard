import { addDays, format, subDays, subMonths, subYears } from 'date-fns';
import { DateRange, TimeRange } from '../types';

export const formatDate = (date: Date): string => {
  return format(date, 'MMM dd, yyyy');
};

export const formatShortDate = (date: Date): string => {
  return format(date, 'MMM dd');
};

export const getDateRangeFromTimeRange = (timeRange: TimeRange): DateRange => {
  const endDate = new Date();
  let startDate: Date;

  switch (timeRange) {
    case '7d':
      startDate = subDays(endDate, 7);
      break;
    case '30d':
      startDate = subDays(endDate, 30);
      break;
    case '90d':
      startDate = subDays(endDate, 90);
      break;
    case '1y':
      startDate = subYears(endDate, 1);
      break;
    default:
      startDate = subDays(endDate, 30); // Default to 30 days
  }

  return { startDate, endDate };
};

export const getDateLabels = (startDate: Date, endDate: Date, interval: 'day' | 'week' | 'month'): string[] => {
  const labels: string[] = [];
  let currentDate = new Date(startDate);
  
  while (currentDate <= endDate) {
    labels.push(format(currentDate, 'MMM dd'));
    
    switch (interval) {
      case 'day':
        currentDate = addDays(currentDate, 1);
        break;
      case 'week':
        currentDate = addDays(currentDate, 7);
        break;
      case 'month':
        currentDate = addDays(currentDate, 30);
        break;
    }
  }

  return labels;
};

export const formatChangeLabel = (timeRange: TimeRange): string => {
  switch (timeRange) {
    case '7d':
      return 'vs previous 7 days';
    case '30d':
      return 'vs previous 30 days';
    case '90d':
      return 'vs previous 90 days';
    case '1y':
      return 'vs previous year';
    default:
      return 'vs previous period';
  }
};