'use client';

import React from 'react';
import ReactECharts from 'echarts-for-react';
import { Box, useColorModeValue } from '@chakra-ui/react';

const TreatmentsChart = () => {
  const textColor = useColorModeValue('#4A5568', '#A0AEC0');
  const bgColor = useColorModeValue('rgba(255, 255, 255, 0.95)', 'rgba(26, 32, 44, 0.95)');
  const borderColor = useColorModeValue('#e2e8f0', '#4A5568');

  const option = {
    tooltip: {
      trigger: 'item',
      backgroundColor: bgColor,
      borderColor: borderColor,
      borderWidth: 1,
      textStyle: {
        color: useColorModeValue('#1a202c', '#E2E8F0')
      },
      formatter: '{b}: {c}%'
    },
    legend: {
      orient: 'vertical',
      right: '5%',
      top: 'center',
      textStyle: {
        color: textColor,
        fontSize: 12
      },
      itemGap: 15,
      icon: 'circle',
      itemWidth: 10,
      itemHeight: 10
    },
    series: [
      {
        name: 'Tratamientos',
        type: 'pie',
        radius: ['45%', '75%'],
        center: ['35%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: useColorModeValue('#fff', '#1A202C'),
          borderWidth: 3
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 18,
            fontWeight: 'bold',
            formatter: '{b}\n{c}%',
            color: textColor
          },
          scale: true,
          scaleSize: 10
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 40, name: 'Limpieza facial', itemStyle: { color: '#38B2AC' } },
          { value: 25, name: 'Botox', itemStyle: { color: '#4FD1C5' } },
          { value: 20, name: 'Depilación láser', itemStyle: { color: '#81E6D9' } },
          { value: 15, name: 'Trat. corporales', itemStyle: { color: '#B2F5EA' } }
        ],
        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay: (idx: number) => idx * 100
      }
    ]
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

export default TreatmentsChart;