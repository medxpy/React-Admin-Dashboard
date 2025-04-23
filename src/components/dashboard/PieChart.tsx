import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Card, CardBody, CardHeader } from '../ui/Card';
import { ChartData } from '../../types';

// Register ChartJS components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

interface PieChartProps {
  title: string;
  data: ChartData;
  height?: number;
  showLegend?: boolean;
  donut?: boolean;
}

export const PieChart: React.FC<PieChartProps> = ({
  title,
  data,
  height = 300,
  showLegend = true,
  donut = false,
}) => {
  const [chartData, setChartData] = useState<ChartData>(data);

  useEffect(() => {
    setChartData(data);
  }, [data]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: donut ? '60%' : undefined,
    plugins: {
      legend: {
        display: showLegend,
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
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
  };

  return (
    <Card className="h-full">
      {title && (
        <CardHeader>
          <h3 className="text-base font-medium text-gray-800">{title}</h3>
        </CardHeader>
      )}
      <CardBody className="overflow-hidden">
        <div style={{ height: `${height}px`, position: 'relative' }}>
          <Pie data={chartData} options={options} />
        </div>
      </CardBody>
    </Card>
  );
};