'use client';

import React from 'react';
import { useColorModeValue } from '@chakra-ui/react';
import ReactECharts from 'echarts-for-react';
import { dashboardData } from '../../data/dashboardData';

interface ComparisonChartProps {
  showLastYear?: boolean;
}

const ComparisonChart: React.FC<ComparisonChartProps> = ({ showLastYear = true }) => {
  const textColor = useColorModeValue('#4A5568', '#A0AEC0');
  const gridColor = useColorModeValue('#E2E8F0', '#4A5568');
  const tooltipBg = useColorModeValue('#ffffff', '#2D3748');

  const option = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: tooltipBg,
      borderColor: gridColor,
      textStyle: { color: textColor },
    },
    legend: {
      data: showLastYear ? ['Este año', 'Año anterior'] : ['Pacientes'],
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
      data: dashboardData.patientsPerMonth.labels,
      axisLine: { lineStyle: { color: gridColor } },
      axisLabel: { color: textColor },
    },
    yAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: gridColor } },
      axisLabel: { color: textColor },
      splitLine: { lineStyle: { color: gridColor, type: 'dashed' } },
    },
    series: [
      {
        name: showLastYear ? 'Este año' : 'Pacientes',
        type: 'bar',
        data: dashboardData.patientsPerMonth.data,
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: '#38B2AC' },
              { offset: 1, color: '#319795' },
            ],
          },
          borderRadius: [4, 4, 0, 0],
        },
        barWidth: '40%',
      },
      ...(showLastYear
        ? [
            {
              name: 'Año anterior',
              type: 'bar',
              data: dashboardData.patientsPerMonth.lastYearData,
              itemStyle: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    { offset: 0, color: '#A0AEC0' },
                    { offset: 1, color: '#718096' },
                  ],
                },
                borderRadius: [4, 4, 0, 0],
              },
              barWidth: '40%',
            },
          ]
        : []),
    ],
  };

  return <ReactECharts option={option} style={{ height: '300px', width: '100%' }} />;
};

export default ComparisonChart;
