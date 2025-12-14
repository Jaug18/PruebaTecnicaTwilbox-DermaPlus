'use client';

import React from 'react';
import { Box, Text, Flex, Icon, useColorModeValue } from '@chakra-ui/react';
import { TrendingUp, TrendingDown, LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

interface StatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  change: string;
  changeType: 'increase' | 'decrease';
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, change, changeType }) => {
  const isPositive = changeType === 'increase';
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.100', 'gray.700');
  const titleColor = useColorModeValue('gray.500', 'gray.400');
  const valueColor = useColorModeValue('gray.800', 'white');
  const iconBg = useColorModeValue('teal.50', 'teal.900');
  const iconColor = useColorModeValue('teal.500', 'teal.300');
  
  return (
    <MotionBox
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Box 
        bg={bgColor}
        p={6} 
        borderRadius="2xl" 
        boxShadow="lg"
        border="1px solid"
        borderColor={borderColor}
        position="relative"
        overflow="hidden"
      >
        {/* Decorative gradient line */}
        <Box
          position="absolute"
          top={0}
          left={0}
          w="30%"
          h="3px"
          bgGradient="linear(to-r, teal.400, cyan.400)"
          borderRadius="full"
        />

        <Flex justify="space-between" align="flex-start" mb={4}>
          <Box 
            p={3} 
            bg={iconBg}
            borderRadius="xl"
          >
            <Icon as={icon} boxSize={6} color={iconColor} />
          </Box>
          <Flex 
            align="center" 
            bg={isPositive ? 'green.50' : 'red.50'}
            _dark={{ bg: isPositive ? 'green.900' : 'red.900' }}
            color={isPositive ? 'green.500' : 'red.500'}
            px={3}
            py={1}
            borderRadius="full"
            fontSize="xs"
            fontWeight="bold"
          >
            <Icon as={isPositive ? TrendingUp : TrendingDown} boxSize={3} mr={1} />
            {change}
          </Flex>
        </Flex>
        
        <Text 
          fontSize="3xl" 
          fontWeight="bold" 
          color={valueColor}
          mb={1}
          letterSpacing="-0.02em"
        >
          {value}
        </Text>
        <Text fontSize="sm" color={titleColor} fontWeight="medium">
          {title}
        </Text>
      </Box>
    </MotionBox>
  );
};

export default StatsCard;