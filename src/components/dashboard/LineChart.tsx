import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Card, CardBody, CardHeader } from '../ui/Card';
import { ChartData } from '../../types';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface LineChartProps {
  title: string;
  data: ChartData;
  height?: number;
  showLegend?: boolean;
  showGrid?: boolean;
  fill?: boolean;
}

export const LineChart: React.FC<LineChartProps> = ({
  title,
  data,
  height = 300,
  showLegend = true,
  showGrid = true,
  fill = false,
}) => {
  const [chartData, setChartData] = useState<ChartData>(data);

  useEffect(() => {
    setChartData(data);
  }, [data]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
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
      },
      y: {
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
    elements: {
      line: {
        tension: 0.4,
      },
      point: {
        radius: 3,
        hoverRadius: 5,
      },
    },
  };

  // Update datasets to include fill property if needed
  const modifiedData = {
    ...chartData,
    datasets: chartData.datasets.map(dataset => ({
      ...dataset,
      fill: fill,
    })),
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
          <Line data={modifiedData} options={options} />
        </div>
      </CardBody>
    </Card>
  );
};