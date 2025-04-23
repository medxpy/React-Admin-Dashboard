import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, User, DollarSign, Clock } from 'lucide-react';
import { getKpiData, getUserMetrics, getRevenueMetrics, getEngagementMetrics, getUsersBySource } from '../services/mockData';
import { Tab, Tabs } from '../components/ui/Tab';
import { KpiCard } from '../components/dashboard/KpiCard';
import { LineChart } from '../components/dashboard/LineChart';
import { BarChart } from '../components/dashboard/BarChart';
import { PieChart } from '../components/dashboard/PieChart';
import { DateRangeSelector } from '../components/ui/DateRangeSelector';
import { TimeRange } from '../types';
import { getDateRangeFromTimeRange } from '../utils/dateUtils';

export const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');
  const [kpiData, setKpiData] = useState(getKpiData(timeRange));
  const [userMetrics, setUserMetrics] = useState(getUserMetrics(30));
  const [revenueMetrics, setRevenueMetrics] = useState(getRevenueMetrics(30));
  const [engagementMetrics, setEngagementMetrics] = useState(getEngagementMetrics(30));
  const [userSourceData, setUserSourceData] = useState(getUsersBySource());

  useEffect(() => {
    // Update data when time range changes
    const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : timeRange === '90d' ? 90 : 365;
    setKpiData(getKpiData(timeRange));
    setUserMetrics(getUserMetrics(days));
    setRevenueMetrics(getRevenueMetrics(days));
    setEngagementMetrics(getEngagementMetrics(days));
  }, [timeRange]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleTimeRangeChange = (range: TimeRange) => {
    setTimeRange(range);
  };

  // Prepare chart data
  const userGrowthData = {
    labels: userMetrics.map(data => data.date.substring(5)),
    datasets: [
      {
        label: 'New Users',
        data: userMetrics.map(data => data.newUsers),
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.3,
      },
      {
        label: 'Active Users',
        data: userMetrics.map(data => data.activeUsers),
        borderColor: '#0ea5e9',
        backgroundColor: 'rgba(14, 165, 233, 0.1)',
        tension: 0.3,
      },
    ],
  };

  const revenueData = {
    labels: revenueMetrics.map(data => data.date.substring(5)),
    datasets: [
      {
        label: 'Revenue',
        data: revenueMetrics.map(data => data.revenue),
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.3,
      },
    ],
  };

  const engagementData = {
    labels: engagementMetrics.map(data => data.date.substring(5)),
    datasets: [
      {
        label: 'Session Duration (sec)',
        data: engagementMetrics.map(data => data.sessionDuration),
        borderColor: '#8b5cf6',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        tension: 0.3,
      },
      {
        label: 'Retention Rate (%)',
        data: engagementMetrics.map(data => data.retentionRate),
        borderColor: '#f59e0b',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        tension: 0.3,
      },
    ],
  };

  const userSourcesChartData = {
    labels: userSourceData.map(data => data.source),
    datasets: [
      {
        label: 'Users by Source',
        data: userSourceData.map(data => data.count),
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(14, 165, 233, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const pageViewsData = {
    labels: engagementMetrics.map(data => data.date.substring(5)),
    datasets: [
      {
        label: 'Page Views',
        data: engagementMetrics.map(data => data.pageViews),
        backgroundColor: 'rgba(14, 165, 233, 0.8)',
        borderColor: 'rgba(14, 165, 233, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Animation variants
  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Analytics Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Monitor your startup's key metrics
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <DateRangeSelector 
            selectedRange={timeRange} 
            onRangeChange={handleTimeRangeChange} 
          />
        </div>
      </div>

      <div className="mb-6">
        <Tabs className="border-b border-gray-200">
          <Tab
            label="Overview"
            value="overview"
            isActive={activeTab === 'overview'}
            onClick={handleTabChange}
            icon={<Activity className="w-4 h-4" />}
          />
          <Tab
            label="Users"
            value="users"
            isActive={activeTab === 'users'}
            onClick={handleTabChange}
            icon={<User className="w-4 h-4" />}
          />
          <Tab
            label="Revenue"
            value="revenue"
            isActive={activeTab === 'revenue'}
            onClick={handleTabChange}
            icon={<DollarSign className="w-4 h-4" />}
          />
          <Tab
            label="Engagement"
            value="engagement"
            isActive={activeTab === 'engagement'}
            onClick={handleTabChange}
            icon={<Clock className="w-4 h-4" />}
          />
        </Tabs>
      </div>

      {activeTab === 'overview' && (
        <motion.div
          variants={staggerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {kpiData.slice(0, 6).map((kpi, index) => (
                <KpiCard key={index} data={kpi} />
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <LineChart 
              title="User Growth" 
              data={userGrowthData} 
              height={300}
              fill={true}
            />
            <LineChart 
              title="Revenue Trend" 
              data={revenueData} 
              height={300}
              fill={true}
            />
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <BarChart
              title="Page Views"
              data={pageViewsData}
              height={300}
            />
            <PieChart
              title="Users by Source"
              data={userSourcesChartData}
              height={300}
              donut={true}
            />
          </motion.div>
        </motion.div>
      )}

      {activeTab === 'users' && (
        <motion.div
          variants={staggerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {kpiData.slice(0, 3).map((kpi, index) => (
                <KpiCard key={index} data={kpi} />
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 gap-6 mb-6">
            <LineChart 
              title="User Metrics Over Time" 
              data={userGrowthData} 
              height={350}
              fill={true}
            />
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PieChart
              title="User Acquisition by Source"
              data={userSourcesChartData}
              height={300}
              donut={true}
            />
            <BarChart
              title="New Users by Day"
              data={{
                labels: userMetrics.slice(-14).map(data => data.date.substring(5)),
                datasets: [
                  {
                    label: 'New Users',
                    data: userMetrics.slice(-14).map(data => data.newUsers),
                    backgroundColor: 'rgba(59, 130, 246, 0.8)',
                  }
                ]
              }}
              height={300}
            />
          </motion.div>
        </motion.div>
      )}

      {activeTab === 'revenue' && (
        <motion.div
          variants={staggerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <KpiCard data={kpiData[2]} />
              <KpiCard 
                data={{
                  title: 'Subscriptions',
                  value: revenueMetrics[revenueMetrics.length - 1].subscriptions,
                  change: 8.7,
                  changeType: 'increase',
                  changeLabel: 'vs previous period',
                  color: 'secondary',
                }} 
              />
              <KpiCard 
                data={{
                  title: 'ARPU',
                  value: revenueMetrics[revenueMetrics.length - 1].arpu,
                  change: 12.3,
                  changeType: 'increase',
                  changeLabel: 'vs previous period',
                  prefix: '$',
                  color: 'accent',
                }} 
              />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-6">
            <LineChart 
              title="Revenue Trend" 
              data={revenueData} 
              height={350}
              fill={true}
            />
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BarChart
              title="Monthly Revenue Comparison"
              data={{
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [
                  {
                    label: 'This Year',
                    data: [12500, 17800, 18400, 19300, 22560, 24200],
                    backgroundColor: 'rgba(16, 185, 129, 0.8)',
                  },
                  {
                    label: 'Last Year',
                    data: [8600, 11200, 14300, 15700, 16900, 18100],
                    backgroundColor: 'rgba(14, 165, 233, 0.8)',
                  }
                ]
              }}
              height={300}
              stacked={false}
            />
            <LineChart
              title="Average Revenue Per User"
              data={{
                labels: revenueMetrics.map(data => data.date.substring(5)),
                datasets: [
                  {
                    label: 'ARPU',
                    data: revenueMetrics.map(data => data.arpu),
                    borderColor: '#8b5cf6',
                    backgroundColor: 'rgba(139, 92, 246, 0.1)',
                    tension: 0.3,
                  }
                ]
              }}
              height={300}
              fill={true}
            />
          </motion.div>
        </motion.div>
      )}

      {activeTab === 'engagement' && (
        <motion.div
          variants={staggerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <KpiCard data={kpiData[3]} />
              <KpiCard data={kpiData[4]} />
              <KpiCard data={kpiData[5]} />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-6">
            <LineChart 
              title="User Engagement Metrics" 
              data={engagementData} 
              height={350}
            />
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BarChart
              title="Page Views"
              data={pageViewsData}
              height={300}
            />
            <LineChart
              title="Bounce Rate vs Retention Rate"
              data={{
                labels: engagementMetrics.map(data => data.date.substring(5)),
                datasets: [
                  {
                    label: 'Bounce Rate',
                    data: engagementMetrics.map(data => data.bounceRate),
                    borderColor: '#ef4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    tension: 0.3,
                  },
                  {
                    label: 'Retention Rate',
                    data: engagementMetrics.map(data => data.retentionRate),
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    tension: 0.3,
                  }
                ]
              }}
              height={300}
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};