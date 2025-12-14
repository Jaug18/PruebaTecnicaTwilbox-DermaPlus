'use client';

import React from 'react';
import ReactECharts from 'echarts-for-react';
import { Box, useColorModeValue } from '@chakra-ui/react';

const PatientsChart = () => {
  const textColor = useColorModeValue('#4A5568', '#A0AEC0');
  const gridColor = useColorModeValue('#E2E8F0', '#2D3748');

  const option = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: useColorModeValue('rgba(255, 255, 255, 0.95)', 'rgba(26, 32, 44, 0.95)'),
      borderColor: useColorModeValue('#e2e8f0', '#4A5568'),
      borderWidth: 1,
      textStyle: {
        color: useColorModeValue('#1a202c', '#E2E8F0')
      },
      axisPointer: {
        type: 'shadow'
      },
      formatter: (params: any) => {
        const data = params[0];
        return `
          <div style="padding: 8px;">
            <div style="font-weight: bold; margin-bottom: 4px;">${data.name}</div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="width: 10px; height: 10px; background: #38B2AC; border-radius: 50%;"></span>
              <span>${data.value} pacientes</span>
            </div>
          </div>
        `;
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
      axisLine: {
        lineStyle: {
          color: gridColor
        }
      },
      axisLabel: {
        color: textColor,
        fontSize: 12
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: textColor,
        fontSize: 12
      },
      splitLine: {
        lineStyle: {
          color: gridColor,
          type: 'dashed'
        }
      }
    },
    series: [
      {
        name: 'Pacientes',
        type: 'bar',
        data: [95, 140, 210, 260, 330],
        barWidth: '45%',
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: '#4FD1C5' },
              { offset: 1, color: '#319795' }
            ]
          },
          borderRadius: [8, 8, 0, 0]
        },
        emphasis: {
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: '#38B2AC' },
                { offset: 1, color: '#2C7A7B' }
              ]
            }
          }
        },
        animationDelay: (idx: number) => idx * 100
      }
    ],
    animationEasing: 'elasticOut'
  };

  return (
    <Box h="280px">
      <ReactECharts 
        option={option} 
        style={{ height: '100%', width: '100%' }}
        opts={{ renderer: 'svg' }}
      />
    </Box>
  );
};

export default PatientsChart;