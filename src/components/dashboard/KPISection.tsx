'use client';

import React from 'react';
import {
  Box,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  SimpleGrid,
  HStack,
  Text,
  useColorModeValue,
  Progress,
  Flex,
  Icon,
} from '@chakra-ui/react';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Calendar, 
  DollarSign,
  Target
} from 'lucide-react';
import { dashboardData } from '../../data/dashboardData';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

interface KPICardProps {
  title: string;
  currentValue: number;
  previousValue: number;
  format?: 'number' | 'currency' | 'percent';
  icon: React.ElementType;
  color: string;
  target?: number;
}

const KPICard: React.FC<KPICardProps> = ({ 
  title, 
  currentValue, 
  previousValue, 
  format = 'number',
  icon: IconComponent,
  color,
  target
}) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.400');

  const percentChange = ((currentValue - previousValue) / previousValue) * 100;
  const isPositive = percentChange > 0;

  const formatValue = (value: number) => {
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('es-MX', {
          style: 'currency',
          currency: 'MXN',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(value);
      case 'percent':
        return `${value.toFixed(1)}%`;
      default:
        return new Intl.NumberFormat('es-MX').format(value);
    }
  };

  const targetProgress = target ? (currentValue / target) * 100 : null;

  return (
    <MotionBox
      p={5}
      bg={bgColor}
      borderRadius="xl"
      border="1px solid"
      borderColor={borderColor}
      boxShadow="sm"
      whileHover={{ y: -2, boxShadow: 'md' }}
      transition={{ duration: 0.2 }}
    >
      <Flex justify="space-between" align="flex-start" mb={3}>
        <Box>
          <Text fontSize="sm" color={textColor} fontWeight="medium">
            {title}
          </Text>
          <Text fontSize="2xl" fontWeight="bold" mt={1}>
            {formatValue(currentValue)}
          </Text>
        </Box>
        <Box
          p={2}
          borderRadius="lg"
          bg={`${color}.100`}
          color={`${color}.600`}
        >
          <IconComponent size={20} />
        </Box>
      </Flex>

      <HStack spacing={2} mb={target ? 3 : 0}>
        <HStack 
          color={isPositive ? 'green.500' : 'red.500'}
          fontSize="sm"
          fontWeight="medium"
        >
          {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          <Text>{Math.abs(percentChange).toFixed(1)}%</Text>
        </HStack>
        <Text fontSize="sm" color={textColor}>
          vs período anterior
        </Text>
      </HStack>

      {target && targetProgress !== null && (
        <Box mt={2}>
          <Flex justify="space-between" mb={1}>
            <Text fontSize="xs" color={textColor}>
              Meta: {formatValue(target)}
            </Text>
            <Text fontSize="xs" color={targetProgress >= 100 ? 'green.500' : color + '.500'}>
              {targetProgress.toFixed(0)}%
            </Text>
          </Flex>
          <Progress 
            value={Math.min(targetProgress, 100)} 
            size="sm" 
            colorScheme={targetProgress >= 100 ? 'green' : color}
            borderRadius="full"
          />
        </Box>
      )}
    </MotionBox>
  );
};

const KPISection: React.FC = () => {
  const { kpis, stats } = dashboardData;

  const kpiData = [
    {
      title: 'Leads esta semana',
      currentValue: kpis.newLeadsThisWeek,
      previousValue: kpis.newLeadsLastWeek,
      icon: Users,
      color: 'blue',
      target: 15,
    },
    {
      title: 'Citas esta semana',
      currentValue: kpis.appointmentsThisWeek,
      previousValue: kpis.appointmentsLastWeek,
      icon: Calendar,
      color: 'purple',
      target: 30,
    },
    {
      title: 'Ingresos del mes',
      currentValue: kpis.revenueThisMonth,
      previousValue: kpis.revenueLastMonth,
      format: 'currency' as const,
      icon: DollarSign,
      color: 'green',
      target: 500000,
    },
    {
      title: 'Tasa de conversión',
      currentValue: kpis.conversionThisMonth,
      previousValue: kpis.conversionLastMonth,
      format: 'percent' as const,
      icon: Target,
      color: 'teal',
      target: 30,
    },
  ];

  return (
    <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={4}>
      {kpiData.map((kpi, index) => (
        <MotionBox
          key={kpi.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <KPICard {...kpi} />
        </MotionBox>
      ))}
    </SimpleGrid>
  );
};

export default KPISection;
