import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Card, CardBody, CardHeader } from '../ui/Card';
import { ChartData } from '../../types';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  title: string;
  data: ChartData;
  height?: number;
  showLegend?: boolean;
  showGrid?: boolean;
  stacked?: boolean;
  horizontal?: boolean;
}

export const BarChart: React.FC<BarChartProps> = ({
  title,
  data,
  height = 300,
  showLegend = true,
  showGrid = true,
  stacked = false,
  horizontal = false,
}) => {
  const [chartData, setChartData] = useState<ChartData>(data);

  useEffect(() => {
    setChartData(data);
  }, [data]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: horizontal ? 'y' as const : 'x' as const,
    plugins: {
      legend: {
        display: showLegend,
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          boxWidth: 6,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        titleColor: '#64748b',
        bodyColor: '#334155',
        borderColor: '#e2e8f0',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        bodyFont: {
          size: 13,
        },
        titleFont: {
          size: 12,
          weight: 'bold',
        },
        cornerRadius: 6,
      },
    },
    scales: {
      x: {
        stacked: stacked,
        grid: {
          display: showGrid && !horizontal,
          color: '#f1f5f9',
        },
        ticks: {
          font: {
            size: 11,
          },
          color: '#94a3b8',
        },
      },
      y: {
        stacked: stacked,
        grid: {
          display: showGrid,
          color: '#f1f5f9',
        },
        ticks: {
          font: {
            size: 11,
          },
          color: '#94a3b8',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <Card className="h-full">
      {title && (
        <CardHeader>
          <h3 className="text-base font-medium text-gray-800">{title}</h3>
        </CardHeader>
      )}
      <CardBody className="overflow-hidden">
        <div style={{ height: `${height}px` }}>
          <Bar data={chartData} options={options} />
        </div>
      </CardBody>
    </Card>
  );
};