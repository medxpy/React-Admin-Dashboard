import { addDays, format, subDays } from 'date-fns';
import { 
  EngagementMetric, 
  KpiData, 
  RevenueMetric, 
  TimeRange, 
  User, 
  UserMetric, 
  UsersBySource 
} from '../types';
import { formatChangeLabel } from '../utils/dateUtils';

// Generate date range
const generateDateRange = (days: number): string[] => {
  const result = [];
  let currentDate = subDays(new Date(), days);
  
  for (let i = 0; i < days; i++) {
    result.push(format(currentDate, 'yyyy-MM-dd'));
    currentDate = addDays(currentDate, 1);
  }
  
  return result;
};

// Generate random data with trend
const generateTrendData = (
  days: number, 
  baseValue: number, 
  volatility: number, 
  trend: number
): number[] => {
  const result = [];
  let value = baseValue;
  
  for (let i = 0; i < days; i++) {
    // Add random volatility
    const change = (Math.random() - 0.5) * volatility;
    // Add trend
    value = Math.max(0, value + change + trend);
    result.push(Math.round(value));
  }
  
  return result;
};

// User metrics
export const getUserMetrics = (days: number): UserMetric[] => {
  const dates = generateDateRange(days);
  
  // Generate trend data
  const newUsers = generateTrendData(days, 120, 40, 2);
  const activeUsers = generateTrendData(days, 2500, 300, 30);
  
  // Calculate total users (cumulative sum of new users + initial base)
  const baseUsers = 10000;
  let totalUsers = baseUsers;
  const totalUsersData = [totalUsers];
  
  for (let i = 0; i < newUsers.length - 1; i++) {
    totalUsers += newUsers[i];
    totalUsersData.push(totalUsers);
  }
  
  return dates.map((date, i) => ({
    date,
    newUsers: newUsers[i],
    activeUsers: activeUsers[i],
    totalUsers: totalUsersData[i],
  }));
};

// Revenue metrics
export const getRevenueMetrics = (days: number): RevenueMetric[] => {
  const dates = generateDateRange(days);
  
  // Generate trend data
  const revenue = generateTrendData(days, 15000, 3000, 200);
  const subscriptions = generateTrendData(days, 800, 100, 10);
  
  return dates.map((date, i) => {
    const arpu = subscriptions[i] > 0 ? revenue[i] / subscriptions[i] : 0;
    
    return {
      date,
      revenue: revenue[i],
      subscriptions: subscriptions[i],
      arpu: parseFloat(arpu.toFixed(2)),
    };
  });
};

// Engagement metrics
export const getEngagementMetrics = (days: number): EngagementMetric[] => {
  const dates = generateDateRange(days);
  
  // Generate trend data
  const sessionDuration = generateTrendData(days, 180, 20, 0.5);
  const pageViews = generateTrendData(days, 12000, 2000, 100);
  const bounceRate = generateTrendData(days, 35, 5, -0.1).map(v => Math.min(v, 100));
  const retentionRate = generateTrendData(days, 60, 8, 0.2).map(v => Math.min(v, 100));
  
  return dates.map((date, i) => ({
    date,
    sessionDuration: sessionDuration[i],
    pageViews: pageViews[i],
    bounceRate: bounceRate[i],
    retentionRate: retentionRate[i],
  }));
};

// User acquisition by source
export const getUsersBySource = (): UsersBySource[] => {
  const sources = [
    { source: 'Organic Search', count: 4235 },
    { source: 'Direct', count: 2018 },
    { source: 'Referral', count: 1642 },
    { source: 'Social Media', count: 1280 },
    { source: 'Email', count: 768 },
    { source: 'Other', count: 412 },
  ];
  
  const total = sources.reduce((sum, { count }) => sum + count, 0);
  
  return sources.map(({ source, count }) => ({
    source,
    count,
    percentage: parseFloat(((count / total) * 100).toFixed(1)),
  }));
};

// KPI data
export const getKpiData = (timeRange: TimeRange): KpiData[] => {
  const changeLabel = formatChangeLabel(timeRange);
  
  return [
    {
      title: 'Total Users',
      value: 12548,
      change: 12.4,
      changeType: 'increase',
      changeLabel,
      color: 'primary',
    },
    {
      title: 'Active Users',
      value: 3254,
      change: 8.2,
      changeType: 'increase',
      changeLabel,
      color: 'secondary',
    },
    {
      title: 'Revenue',
      value: 42569,
      change: 23.1,
      changeType: 'increase',
      changeLabel,
      prefix: '$',
      color: 'success',
    },
    {
      title: 'Retention Rate',
      value: 68.7,
      change: 5.3,
      changeType: 'increase',
      changeLabel,
      suffix: '%',
      color: 'accent',
    },
    {
      title: 'Conversion Rate',
      value: 3.2,
      change: 0.8,
      changeType: 'increase',
      changeLabel,
      suffix: '%',
      color: 'warning',
    },
    {
      title: 'Bounce Rate',
      value: 32.5,
      change: 2.1,
      changeType: 'decrease',
      changeLabel,
      suffix: '%',
      color: 'error',
    },
  ];
};

// Recent users
export const getRecentUsers = (): User[] => {
  return [
    {
      id: '1',
      name: 'Alex Johnson',
      email: 'alex@example.com',
      joinDate: '2023-10-15',
      lastActive: '2023-10-28',
      status: 'active',
    },
    {
      id: '2',
      name: 'Sarah Miller',
      email: 'sarah@example.com',
      joinDate: '2023-10-18',
      lastActive: '2023-10-27',
      status: 'active',
    },
    {
      id: '3',
      name: 'David Wilson',
      email: 'david@example.com',
      joinDate: '2023-10-20',
      lastActive: '2023-10-25',
      status: 'inactive',
    },
    {
      id: '4',
      name: 'Jessica Brown',
      email: 'jessica@example.com',
      joinDate: '2023-10-22',
      lastActive: '2023-10-28',
      status: 'active',
    },
  ];
};