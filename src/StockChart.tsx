import React from 'react';

interface StockChartProps {
  prices: number[];
  symbol?: string;  // Optional symbol prop
}

const StockChart = ({ prices, symbol }: StockChartProps) => {
  const width = 400;
  const height = 100;
  const max = Math.max(...prices);
  const min = Math.min(...prices);

  const points = prices.map((p, i) => {
    const x = (i / prices.length) * width;
    const y = height - ((p - min) / (max - min)) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div>
      <h4>{symbol || 'Stock Chart'}</h4>
      <svg width={width} height={height} style={{ border: '1px solid gray' }}>
        <polyline points={points} fill="none" stroke="blue" strokeWidth="2" />
      </svg>
    </div>
  );
};

export default StockChart;