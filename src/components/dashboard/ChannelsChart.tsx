'use client';

import React from 'react';
import ReactECharts from 'echarts-for-react';
import { Box, SimpleGrid, Flex, Text, Icon, useColorModeValue } from '@chakra-ui/react';
import { Globe, Instagram, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const ChannelsChart = () => {
  const textColor = useColorModeValue('#4A5568', '#A0AEC0');
  const bgColor = useColorModeValue('rgba(255, 255, 255, 0.95)', 'rgba(26, 32, 44, 0.95)');
  const borderColor = useColorModeValue('#e2e8f0', '#4A5568');
  const cardBg = useColorModeValue('gray.50', 'gray.700');
  const cardHoverBg = useColorModeValue('gray.100', 'gray.600');

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
      show: false
    },
    series: [
      {
        name: 'Canales',
        type: 'pie',
        radius: ['55%', '85%'],
        center: ['50%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 12,
          borderColor: useColorModeValue('#fff', '#1A202C'),
          borderWidth: 4
        },
        label: {
          show: true,
          position: 'center',
          formatter: 'Total\nLeads',
          fontSize: 16,
          fontWeight: 'bold',
          color: textColor,
          lineHeight: 24
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 18,
            fontWeight: 'bold',
            formatter: '{b}\n{c}%'
          },
          scale: true,
          scaleSize: 8
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 50, name: 'Web', itemStyle: { color: '#3182CE' } },
          { value: 30, name: 'Instagram', itemStyle: { color: '#D53F8C' } },
          { value: 20, name: 'Referidos', itemStyle: { color: '#38A169' } }
        ],
        animationType: 'scale',
        animationEasing: 'elasticOut'
      }
    ]
  };

  const channelDetails = [
    { 
      name: 'Web', 
      percentage: '50%', 
      leads: '518',
      icon: Globe, 
      color: 'blue.500', 
      bgColor: 'blue.50',
      darkBgColor: 'blue.900'
    },
    { 
      name: 'Instagram Ads', 
      percentage: '30%', 
      leads: '311',
      icon: Instagram, 
      color: 'pink.500', 
      bgColor: 'pink.50',
      darkBgColor: 'pink.900'
    },
    { 
      name: 'Referidos', 
      percentage: '20%', 
      leads: '206',
      icon: Users, 
      color: 'green.500', 
      bgColor: 'green.50',
      darkBgColor: 'green.900'
    }
  ];

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} alignItems="center">
      <Box h="280px">
        <ReactECharts 
          option={option} 
          style={{ height: '100%', width: '100%' }}
          opts={{ renderer: 'svg' }}
        />
      </Box>
      
      <Box>
        {channelDetails.map((channel, index) => (
          <MotionBox
            key={index}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ x: -5 }}
          >
            <Flex 
              align="center" 
              p={4} 
              mb={3}
              bg={cardBg}
              borderRadius="xl"
              transition="all 0.3s"
              _hover={{ bg: cardHoverBg }}
              cursor="pointer"
            >
              <Box 
                p={3} 
                bg={useColorModeValue(channel.bgColor, channel.darkBgColor)}
                borderRadius="xl"
                color={channel.color}
                mr={4}
              >
                <Icon as={channel.icon} boxSize={5} />
              </Box>
              <Box flex={1}>
                <Text fontWeight="semibold" color={useColorModeValue('gray.700', 'white')}>
                  {channel.name}
                </Text>
                <Text fontSize="sm" color={useColorModeValue('gray.500', 'gray.400')}>
                  {channel.leads} leads
                </Text>
              </Box>
              <Text fontSize="2xl" fontWeight="bold" color={channel.color}>
                {channel.percentage}
              </Text>
            </Flex>
          </MotionBox>
        ))}
      </Box>
    </SimpleGrid>
  );
};

export default ChannelsChart;