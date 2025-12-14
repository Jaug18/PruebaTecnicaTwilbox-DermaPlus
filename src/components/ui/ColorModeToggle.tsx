'use client';

import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

const MotionIconButton = motion(IconButton);

const ColorModeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const Icon = colorMode === 'light' ? Moon : Sun;
  const bgHover = useColorModeValue('gray.100', 'gray.700');

  return (
    <MotionIconButton
      aria-label="Toggle color mode"
      icon={<Icon size={20} />}
      onClick={toggleColorMode}
      variant="ghost"
      size="md"
      borderRadius="full"
      _hover={{ bg: bgHover }}
      whileTap={{ scale: 0.9, rotate: 180 }}
      transition={{ duration: 0.3 }}
    />
  );
};

export default ColorModeToggle;
