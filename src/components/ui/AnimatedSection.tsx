'use client';

import React from 'react';
import { Box } from '@chakra-ui/react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const MotionBox = motion(Box);

interface AnimatedSectionProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({ 
  children, 
  delay = 0,
  direction = 'up' 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { y: 50, x: 0 };
      case 'down': return { y: -50, x: 0 };
      case 'left': return { y: 0, x: -50 };
      case 'right': return { y: 0, x: 50 };
      default: return { y: 50, x: 0 };
    }
  };

  const initial = getInitialPosition();

  return (
    <MotionBox
      ref={ref}
      initial={{ opacity: 0, ...initial }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, ...initial }}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
    >
      {children}
    </MotionBox>
  );
};

export default AnimatedSection;
