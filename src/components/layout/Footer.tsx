'use client';

import React from 'react';
import { 
  Box, 
  Container, 
  SimpleGrid, 
  VStack, 
  HStack, 
  Text, 
  Heading, 
  Icon,
  Divider,
  Input,
  Button,
  useColorModeValue,
  IconButton
} from '@chakra-ui/react';
import { MapPin, Phone, Mail, Clock, Heart, Instagram, Facebook, Twitter, Send } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const bgColor = useColorModeValue('gray.900', 'gray.950');
  const textColor = useColorModeValue('gray.400', 'gray.500');
  const headingColor = useColorModeValue('white', 'gray.100');
  const hoverColor = useColorModeValue('teal.300', 'teal.400');
  const dividerColor = useColorModeValue('gray.800', 'gray.800');
  
  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ];

  const quickLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Servicios', href: '/#servicios' },
    { name: 'Contacto', href: '/contacto' },
    { name: 'Dashboard', href: '/dashboard' },
  ];

  return (
    <Box as="footer" bg={bgColor} color="white" position="relative" overflow="hidden">
      {/* Background Decoration */}
      <Box
        position="absolute"
        top="-200px"
        right="-200px"
        w="400px"
        h="400px"
        bg="teal.900"
        borderRadius="full"
        filter="blur(150px)"
        opacity={0.3}
      />

      <Container maxW="container.xl" py={20} position="relative" zIndex={1}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={12}>
          {/* Brand */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <VStack align="flex-start" spacing={6}>
              <Heading 
                size="xl" 
                bgGradient="linear(to-r, teal.300, cyan.300)"
                bgClip="text"
              >
                DermaPlus
              </Heading>
              <Text color={textColor} fontSize="sm" lineHeight="tall">
                Tu clínica de confianza para tratamientos estéticos y dermatológicos. 
                Tecnología avanzada y profesionales certificados para cuidar de ti.
              </Text>
              {/* Social Links */}
              <HStack spacing={3}>
                {socialLinks.map((social) => (
                  <IconButton
                    key={social.label}
                    as="a"
                    href={social.href}
                    aria-label={social.label}
                    icon={<Icon as={social.icon} boxSize={5} />}
                    size="lg"
                    variant="ghost"
                    color={textColor}
                    bg="whiteAlpha.100"
                    borderRadius="xl"
                    _hover={{ 
                      color: 'white', 
                      bg: 'teal.500',
                      transform: 'translateY(-3px)'
                    }}
                    transition="all 0.3s"
                  />
                ))}
              </HStack>
            </VStack>
          </MotionBox>
          
          {/* Quick Links */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <VStack align="flex-start" spacing={5}>
              <Heading size="sm" color={headingColor} letterSpacing="wide">
                ENLACES RÁPIDOS
              </Heading>
              <VStack align="flex-start" spacing={3}>
                {quickLinks.map((link) => (
                  <Link key={link.name} href={link.href}>
                    <Text 
                      color={textColor} 
                      _hover={{ color: hoverColor, pl: 2 }} 
                      transition="all 0.3s" 
                      cursor="pointer"
                      fontSize="sm"
                    >
                      {link.name}
                    </Text>
                  </Link>
                ))}
              </VStack>
            </VStack>
          </MotionBox>
          
          {/* Contact */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <VStack align="flex-start" spacing={5}>
              <Heading size="sm" color={headingColor} letterSpacing="wide">
                CONTACTO
              </Heading>
              <VStack align="flex-start" spacing={4}>
                <HStack spacing={3}>
                  <Box p={2} bg="whiteAlpha.100" borderRadius="lg">
                    <Icon as={MapPin} boxSize={4} color="teal.300" />
                  </Box>
                  <Text fontSize="sm" color={textColor}>Av. Reforma 456, CDMX</Text>
                </HStack>
                <HStack spacing={3}>
                  <Box p={2} bg="whiteAlpha.100" borderRadius="lg">
                    <Icon as={Phone} boxSize={4} color="teal.300" />
                  </Box>
                  <Text fontSize="sm" color={textColor}>+52 (55) 1234-5678</Text>
                </HStack>
                <HStack spacing={3}>
                  <Box p={2} bg="whiteAlpha.100" borderRadius="lg">
                    <Icon as={Mail} boxSize={4} color="teal.300" />
                  </Box>
                  <Text fontSize="sm" color={textColor}>contacto@dermaplus.mx</Text>
                </HStack>
                <HStack spacing={3}>
                  <Box p={2} bg="whiteAlpha.100" borderRadius="lg">
                    <Icon as={Clock} boxSize={4} color="teal.300" />
                  </Box>
                  <VStack align="flex-start" spacing={0}>
                    <Text fontSize="sm" color={textColor}>Lun - Vie: 9:00 - 19:00</Text>
                    <Text fontSize="sm" color={textColor}>Sáb: 10:00 - 16:00</Text>
                  </VStack>
                </HStack>
              </VStack>
            </VStack>
          </MotionBox>
          
          {/* Newsletter */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <VStack align="flex-start" spacing={5}>
              <Heading size="sm" color={headingColor} letterSpacing="wide">
                NEWSLETTER
              </Heading>
              <Text fontSize="sm" color={textColor}>
                Suscríbete para recibir ofertas exclusivas y consejos de belleza.
              </Text>
              <HStack w="full">
                <Input 
                  placeholder="Tu email"
                  size="lg"
                  bg="whiteAlpha.100"
                  border="none"
                  borderRadius="xl"
                  _placeholder={{ color: 'gray.500' }}
                  _focus={{ bg: 'whiteAlpha.200' }}
                />
                <IconButton
                  aria-label="Subscribe"
                  icon={<Icon as={Send} />}
                  colorScheme="teal"
                  size="lg"
                  borderRadius="xl"
                />
              </HStack>
            </VStack>
          </MotionBox>
        </SimpleGrid>
        
        <Divider my={10} borderColor={dividerColor} />
        
        <HStack 
          justify="space-between" 
          flexWrap="wrap" 
          spacing={4}
          flexDirection={{ base: 'column', md: 'row' }}
          textAlign={{ base: 'center', md: 'left' }}
        >
          <Text color={textColor} fontSize="sm">
            © {currentYear} DermaPlus. Todos los derechos reservados.
          </Text>
          <HStack color={textColor} fontSize="sm" spacing={1}>
            <Text>Hecho con</Text>
            <MotionBox
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Icon as={Heart} boxSize={4} color="red.400" fill="red.400" />
            </MotionBox>
            <Text>en México</Text>
          </HStack>
        </HStack>
      </Container>
    </Box>
  );
};

export default Footer;