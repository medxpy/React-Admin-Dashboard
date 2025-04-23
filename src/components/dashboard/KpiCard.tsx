import React from 'react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { Card, CardBody } from '../ui/Card';
import { KpiData } from '../../types';
import { formatNumber } from '../../utils/numberFormat';

interface KpiCardProps {
  data: KpiData;
}

export const KpiCard: React.FC<KpiCardProps> = ({ data }) => {
  const { 
    title, 
    value, 
    change, 
    changeType, 
    changeLabel, 
    prefix = '', 
    suffix = '', 
    color = 'primary' 
  } = data;

  const colorClasses = {
    primary: 'text-primary-500 bg-primary-50',
    secondary: 'text-secondary-500 bg-secondary-50',
    accent: 'text-accent-500 bg-accent-50',
    success: 'text-success-500 bg-success-50',
    warning: 'text-warning-500 bg-warning-50',
    error: 'text-error-500 bg-error-50',
  };

  const getColorClass = (colorKey: string) => {
    return colorClasses[colorKey as keyof typeof colorClasses] || colorClasses.primary;
  };

  return (
    <Card className="h-full">
      <CardBody>
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className="mt-2 flex items-baseline">
          <p className="text-2xl font-semibold text-gray-900">
            {formatNumber(value, { prefix, suffix })}
          </p>
          <span
            className={`ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
              changeType === 'increase' ? 'text-success-700 bg-success-50' : 'text-error-700 bg-error-50'
            }`}
          >
            {changeType === 'increase' ? (
              <ArrowUpRight className="h-3 w-3 mr-1" />
            ) : (
              <ArrowDownRight className="h-3 w-3 mr-1" />
            )}
            {change}%
          </span>
        </div>
        <div className="mt-1">
          <div className={`w-full h-1 rounded-full overflow-hidden bg-gray-100`}>
            <div
              className={`h-full ${getColorClass(color).split(' ')[0]}`}
              style={{ width: `${Math.min(100, change * 2)}%` }}
            ></div>
          </div>
          <p className="mt-1 text-xs text-gray-500">{changeLabel}</p>
        </div>
      </CardBody>
    </Card>
  );
};