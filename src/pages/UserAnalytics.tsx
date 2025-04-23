import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronUp, ChevronDown, Search } from 'lucide-react';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { LineChart } from '../components/dashboard/LineChart';
import { BarChart } from '../components/dashboard/BarChart';
import { PieChart } from '../components/dashboard/PieChart';
import { DateRangeSelector } from '../components/ui/DateRangeSelector';
import { TimeRange } from '../types';
import { getUserMetrics, getUsersBySource, getRecentUsers } from '../services/mockData';

export const UserAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');
  const [userMetrics, setUserMetrics] = useState(getUserMetrics(30));
  const [userSourceData, setUserSourceData] = useState(getUsersBySource());
  const [recentUsers, setRecentUsers] = useState(getRecentUsers());
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleTimeRangeChange = (range: TimeRange) => {
    setTimeRange(range);
    const days = range === '7d' ? 7 : range === '30d' ? 30 : range === '90d' ? 90 : 365;
    setUserMetrics(getUserMetrics(days));
  };
  
  const filteredUsers = recentUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    ],
  };

  const activeUsersData = {
    labels: userMetrics.map(data => data.date.substring(5)),
    datasets: [
      {
        label: 'Active Users',
        data: userMetrics.map(data => data.activeUsers),
        borderColor: '#0ea5e9',
        backgroundColor: 'rgba(14, 165, 233, 0.1)',
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

  const cumulativeUsersData = {
    labels: userMetrics.map(data => data.date.substring(5)),
    datasets: [
      {
        label: 'Total Users',
        data: userMetrics.map(data => data.totalUsers),
        borderColor: '#8b5cf6',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        tension: 0.3,
        fill: true,
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
          <h1 className="text-2xl font-semibold text-gray-900">User Analytics</h1>
          <p className="mt-1 text-sm text-gray-500">
            Track and analyze user growth and engagement
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <DateRangeSelector 
            selectedRange={timeRange} 
            onRangeChange={handleTimeRangeChange} 
          />
        </div>
      </div>

      <motion.div
        variants={staggerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <LineChart 
            title="New User Signups" 
            data={userGrowthData} 
            height={300}
            fill={true}
          />
          <LineChart 
            title="Active Users" 
            data={activeUsersData} 
            height={300}
            fill={true}
          />
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <LineChart 
            title="Total User Growth" 
            data={cumulativeUsersData} 
            height={300}
          />
          <PieChart
            title="Users by Source"
            data={userSourcesChartData}
            height={300}
            donut={true}
          />
        </motion.div>

        <motion.div variants={itemVariants} className="mb-6">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <h3 className="text-base font-medium text-gray-800">User Acquisition Sources</h3>
            </CardHeader>
            <CardBody>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Source
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Users
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Percentage
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {userSourceData.map((source, index) => (
                      <tr 
                        key={index}
                        className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                      >
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-800">
                          {source.source}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                          {source.count.toLocaleString()}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="text-sm text-gray-600 mr-2">
                              {source.percentage}%
                            </span>
                            <div className="w-32 bg-gray-200 h-2 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary-500"
                                style={{ width: `${source.percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <h3 className="text-base font-medium text-gray-800">Recent Users</h3>
              <div className="mt-2 sm:mt-0 max-w-md w-full relative">
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
            </CardHeader>
            <CardBody>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Joined
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Active
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-medium">
                              {user.name.charAt(0)}
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-gray-800">{user.name}</div>
                              <div className="text-xs text-gray-500">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                          {user.joinDate}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                          {user.lastActive}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs rounded-full font-medium ${
                              user.status === 'active'
                                ? 'bg-success-100 text-success-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {user.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};