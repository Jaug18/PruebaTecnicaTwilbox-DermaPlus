'use client';

import React from 'react';
import { useColorModeValue } from '@chakra-ui/react';
import ReactECharts from 'echarts-for-react';
import { dashboardData } from '../../data/dashboardData';

interface RevenueChartProps {
  showComparison?: boolean;
}

const RevenueChart: React.FC<RevenueChartProps> = ({ showComparison = true }) => {
  const textColor = useColorModeValue('#4A5568', '#A0AEC0');
  const gridColor = useColorModeValue('#E2E8F0', '#4A5568');
  const tooltipBg = useColorModeValue('#ffffff', '#2D3748');

  const option = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: tooltipBg,
      borderColor: gridColor,
      textStyle: { color: textColor },
      formatter: (params: any) => {
        let result = `<strong>${params[0].axisValue}</strong><br/>`;
        params.forEach((item: any) => {
          const value = new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN',
            minimumFractionDigits: 0,
          }).format(item.value);
          result += `${item.marker} ${item.seriesName}: ${value}<br/>`;
        });
        return result;
      },
    },
    legend: {
      data: showComparison ? ['Ingresos', 'Gastos'] : ['Ingresos'],
      textStyle: { color: textColor },
      bottom: 0,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      top: '10%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: dashboardData.revenuePerMonth.labels,
      axisLine: { lineStyle: { color: gridColor } },
      axisLabel: { color: textColor },
    },
    yAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: gridColor } },
      axisLabel: {
        color: textColor,
        formatter: (value: number) => {
          if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
          if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
          return `$${value}`;
        },
      },
      splitLine: { lineStyle: { color: gridColor, type: 'dashed' } },
    },
    series: [
      {
        name: 'Ingresos',
        type: 'line',
        data: dashboardData.revenuePerMonth.data,
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: {
          width: 3,
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              { offset: 0, color: '#38B2AC' },
              { offset: 1, color: '#319795' },
            ],
          },
        },
        itemStyle: { color: '#319795' },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(49, 151, 149, 0.4)' },
              { offset: 1, color: 'rgba(49, 151, 149, 0.05)' },
            ],
          },
        },
      },
      ...(showComparison
        ? [
            {
              name: 'Gastos',
              type: 'line',
              data: dashboardData.revenuePerMonth.expenses,
              smooth: true,
              symbol: 'circle',
              symbolSize: 8,
              lineStyle: {
                width: 3,
                color: '#E53E3E',
              },
              itemStyle: { color: '#E53E3E' },
              areaStyle: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    { offset: 0, color: 'rgba(229, 62, 62, 0.2)' },
                    { offset: 1, color: 'rgba(229, 62, 62, 0.02)' },
                  ],
                },
              },
            },
          ]
        : []),
    ],
  };

  return <ReactECharts option={option} style={{ height: '300px', width: '100%' }} />;
};

export default RevenueChart;
