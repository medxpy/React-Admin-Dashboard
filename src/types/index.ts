export type TimeRange = '7d' | '30d' | '90d' | '1y' | 'custom';

export interface DateRange {
  startDate: Date;
  endDate: Date;
}

export interface KpiData {
  title: string;
  value: number;
  change: number;
  changeType: 'increase' | 'decrease';
  changeLabel: string;
  prefix?: string;
  suffix?: string;
  color?: string;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
    fill?: boolean;
    tension?: number;
  }[];
}

export interface UserMetric {
  date: string;
  newUsers: number;
  activeUsers: number;
  totalUsers: number;
}

export interface RevenueMetric {
  date: string;
  revenue: number;
  subscriptions: number;
  arpu: number;
}

export interface EngagementMetric {
  date: string;
  sessionDuration: number;
  pageViews: number;
  bounceRate: number;
  retentionRate: number;
}

export interface UsersBySource {
  source: string;
  count: number;
  percentage: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  lastActive: string;
  status: 'active' | 'inactive';
}