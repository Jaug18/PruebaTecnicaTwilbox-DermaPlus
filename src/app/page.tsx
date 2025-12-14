'use client';

import React from 'react';
import Hero from '../components/landing/Hero';
import Services from '../components/landing/Services';
import Testimonials from '../components/landing/Testimonials';
import LeadForm from '../components/landing/LeadForm';
import { Box, Container, Heading, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

export default function HomePage() {
  return (
    <Box>
      <Hero />
      <Services />
      <Testimonials />
      
      {/* Lead Form Section */}
      <Box 
        py={24} 
        bg="gray.50"
        position="relative"
        overflow="hidden"
      >
        {/* Background Decorations */}
        <Box
          position="absolute"
          top="0"
          left="50%"
          transform="translateX(-50%)"
          w="800px"
          h="800px"
          bg="teal.50"
          borderRadius="full"
          filter="blur(150px)"
          opacity={0.6}
        />

        <Container maxW="container.lg" position="relative" zIndex={1}>
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <VStack spacing={6} textAlign="center" mb={12}>
              <Heading 
                as="h2" 
                size="xl" 
                color="gray.800"
                maxW="600px"
              >
                ¿Listo para transformar tu{' '}
                <Text as="span" color="teal.500">imagen</Text>?
              </Heading>
              <Text fontSize="lg" color="gray.600" maxW="500px">
                Déjanos tus datos y un especialista se pondrá en contacto contigo 
                en menos de 24 horas para asesorarte sin compromiso.
              </Text>
            </VStack>
          </MotionBox>

          <MotionBox
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <LeadForm />
          </MotionBox>
        </Container>
      </Box>
    </Box>
  );
}