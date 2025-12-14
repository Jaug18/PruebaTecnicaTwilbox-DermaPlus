'use client';

import React from 'react';
import { 
  Box, 
  Flex, 
  Heading, 
  HStack, 
  Button,
  Container,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  VStack,
  useColorModeValue,
  useColorMode
} from '@chakra-ui/react';
import { Menu, Sun, Moon } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const navLinks = [
  { name: 'Inicio', href: '/' },
  { name: 'Servicios', href: '/#servicios' },
  { name: 'Contacto', href: '/contacto' },
  { name: 'Dashboard', href: '/dashboard' }
];

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  
  const bgColor = useColorModeValue('white', 'gray.900');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const hoverColor = useColorModeValue('teal.500', 'teal.300');
  const borderColor = useColorModeValue('gray.100', 'gray.800');

  return (
    <MotionBox 
      as="header" 
      bg={bgColor}
      boxShadow="sm"
      position="sticky"
      top={0}
      zIndex={1000}
      borderBottom="1px solid"
      borderColor={borderColor}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Container maxW="container.xl">
        <Flex align="center" justify="space-between" py={4}>
          <Link href="/">
            <MotionBox
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Heading 
                size="lg" 
                bgGradient="linear(to-r, teal.400, cyan.500)"
                bgClip="text"
                fontWeight="bold"
                cursor="pointer"
              >
                DermaPlus
              </Heading>
            </MotionBox>
          </Link>
          
          {/* Desktop Navigation */}
          <HStack spacing={8} display={{ base: 'none', md: 'flex' }}>
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href}>
                <MotionBox
                  fontWeight="medium"
                  color={textColor}
                  position="relative"
                  cursor="pointer"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                  _hover={{ color: hoverColor }}
                  sx={{
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: '-4px',
                      left: 0,
                      width: '0%',
                      height: '2px',
                      bg: 'teal.400',
                      transition: 'width 0.3s ease'
                    },
                    '&:hover::after': {
                      width: '100%'
                    }
                  }}
                >
                  {link.name}
                </MotionBox>
              </Link>
            ))}
          </HStack>

          <HStack spacing={3}>
            {/* Color Mode Toggle */}
            <IconButton
              aria-label="Toggle color mode"
              icon={colorMode === 'light' ? <Moon size={18} /> : <Sun size={18} />}
              onClick={toggleColorMode}
              variant="ghost"
              size="sm"
              borderRadius="full"
              display={{ base: 'none', md: 'flex' }}
            />
            
            {/* CTA Button */}
            <Button 
              as={Link}
              href="/contacto"
              colorScheme="teal"
              size="sm"
              borderRadius="full"
              px={6}
              display={{ base: 'none', md: 'flex' }}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg'
              }}
              transition="all 0.3s"
            >
              Agendar cita
            </Button>
            
            {/* Mobile Menu Button */}
            <IconButton
              aria-label="Open menu"
              icon={<Menu size={24} />}
              variant="ghost"
              display={{ base: 'flex', md: 'none' }}
              onClick={onOpen}
            />
          </HStack>
        </Flex>
      </Container>
      
      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="sm">
        <DrawerOverlay backdropFilter="blur(4px)" />
        <DrawerContent bg={bgColor}>
          <DrawerCloseButton size="lg" mt={2} />
          <DrawerBody pt={20}>
            <VStack spacing={6} align="stretch">
              {navLinks.map((link, index) => (
                <MotionBox
                  key={link.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link href={link.href} onClick={onClose}>
                    <Box
                      py={3}
                      px={4}
                      fontWeight="medium"
                      fontSize="lg"
                      color={textColor}
                      borderRadius="xl"
                      _hover={{ 
                        color: hoverColor,
                        bg: useColorModeValue('teal.50', 'gray.800')
                      }}
                      transition="all 0.3s"
                    >
                      {link.name}
                    </Box>
                  </Link>
                </MotionBox>
              ))}
              
              {/* Mobile Color Mode Toggle */}
              <MotionBox
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <HStack 
                  py={3} 
                  px={4} 
                  justify="space-between"
                  borderRadius="xl"
                  bg={useColorModeValue('gray.50', 'gray.800')}
                >
                  <Box fontWeight="medium" color={textColor}>
                    Modo {colorMode === 'light' ? 'oscuro' : 'claro'}
                  </Box>
                  <IconButton
                    aria-label="Toggle color mode"
                    icon={colorMode === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                    onClick={toggleColorMode}
                    variant="ghost"
                    size="sm"
                    borderRadius="full"
                  />
                </HStack>
              </MotionBox>

              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                <Button 
                  as={Link}
                  href="/contacto"
                  colorScheme="teal"
                  size="lg"
                  borderRadius="full"
                  w="full"
                  mt={4}
                  onClick={onClose}
                >
                  Agendar cita
                </Button>
              </MotionBox>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </MotionBox>
  );
};

export default Header;