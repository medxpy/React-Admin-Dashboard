export const formatNumber = (
  value: number,
  options: {
    abbreviate?: boolean;
    prefix?: string;
    suffix?: string;
    decimals?: number;
  } = {}
): string => {
  const { abbreviate = false, prefix = '', suffix = '', decimals = 0 } = options;
  
  if (abbreviate) {
    if (value >= 1000000) {
      return `${prefix}${(value / 1000000).toFixed(1)}M${suffix}`;
    }
    if (value >= 1000) {
      return `${prefix}${(value / 1000).toFixed(1)}K${suffix}`;
    }
  }
  
  return `${prefix}${value.toFixed(decimals)}${suffix}`;
};

export const formatCurrency = (
  value: number,
  options: {
    abbreviate?: boolean;
    currency?: string;
    decimals?: number;
  } = {}
): string => {
  const { abbreviate = false, currency = 'USD', decimals = 0 } = options;
  
  if (abbreviate) {
    if (value >= 1000000) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        maximumFractionDigits: 1,
        notation: 'compact',
        compactDisplay: 'short',
      }).format(value);
    }
    if (value >= 1000) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        maximumFractionDigits: 1,
        notation: 'compact',
        compactDisplay: 'short',
      }).format(value);
    }
  }
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
};

export const formatPercentage = (
  value: number,
  options: {
    decimals?: number;
    includeSign?: boolean;
  } = {}
): string => {
  const { decimals = 1, includeSign = false } = options;
  const sign = includeSign && value > 0 ? '+' : '';
  return `${sign}${value.toFixed(decimals)}%`;
};