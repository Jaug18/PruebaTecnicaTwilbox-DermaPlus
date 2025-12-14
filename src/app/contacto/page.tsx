'use client';

import React from 'react';
import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  SimpleGrid, 
  VStack,
  Badge,
  useColorModeValue
} from '@chakra-ui/react';
import ContactForm from '../../components/contact/ContactForm';
import ClinicInfo from '../../components/contact/ClinicInfo';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

export default function ContactPage() {
  const bgColor = useColorModeValue('gray.50', 'gray.900');

  return (
    <Box py={20} bg={bgColor} minH="100vh" position="relative" overflow="hidden">
      {/* Background Decorations */}
      <Box
        position="absolute"
        top="10%"
        right="-10%"
        w="500px"
        h="500px"
        bg="teal.100"
        borderRadius="full"
        filter="blur(150px)"
        opacity={0.4}
      />
      <Box
        position="absolute"
        bottom="10%"
        left="-10%"
        w="400px"
        h="400px"
        bg="cyan.100"
        borderRadius="full"
        filter="blur(120px)"
        opacity={0.3}
      />

      <Container maxW="container.xl" position="relative" zIndex={1}>
        {/* Header */}
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <VStack spacing={4} textAlign="center" mb={16}>
            <Badge 
              colorScheme="teal" 
              px={4} 
              py={2} 
              borderRadius="full" 
              fontSize="sm"
            >
              📍 Contáctanos
            </Badge>
            <Heading 
              as="h1" 
              size="2xl" 
              bgGradient="linear(to-r, gray.800, gray.600)"
              bgClip="text"
              _dark={{ bgGradient: 'linear(to-r, white, gray.300)' }}
            >
              Estamos aquí para ayudarte
            </Heading>
            <Text 
              fontSize="xl" 
              color="gray.600" 
              _dark={{ color: 'gray.400' }}
              maxW="600px"
            >
              ¿Tienes alguna pregunta o deseas agendar una cita? 
              Completa el formulario y te responderemos a la brevedad.
            </Text>
          </VStack>
        </MotionBox>
        
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={12}>
          <MotionBox
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <VStack align="stretch" spacing={6}>
              <Heading 
                as="h2" 
                size="lg" 
                color="gray.700"
                _dark={{ color: 'gray.200' }}
              >
                Envíanos un mensaje
              </Heading>
              <ContactForm />
            </VStack>
          </MotionBox>
          
          <MotionBox
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <VStack align="stretch" spacing={6}>
              <Heading 
                as="h2" 
                size="lg" 
                color="gray.700"
                _dark={{ color: 'gray.200' }}
              >
                Información de la clínica
              </Heading>
              <ClinicInfo />
              
              {/* Map Placeholder */}
              <Box
                h="250px"
                borderRadius="2xl"
                overflow="hidden"
                boxShadow="lg"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.6614832559!2d-99.16869768509397!3d19.427021986887!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff35f5bd1563%3A0x6c366f0e2de02ff7!2sEl%20%C3%81ngel%20de%20la%20Independencia!5e0!3m2!1ses!2smx!4v1639012345678!5m2!1ses!2smx"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </Box>
            </VStack>
          </MotionBox>
        </SimpleGrid>
      </Container>
    </Box>
  );
}