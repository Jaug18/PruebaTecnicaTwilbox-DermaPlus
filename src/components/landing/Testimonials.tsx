'use client';

import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Avatar,
  SimpleGrid,
  Badge,
  Icon,
  useColorModeValue
} from '@chakra-ui/react';
import { Star, Quote } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const MotionBox = motion(Box);

interface Testimonial {
  id: number;
  name: string;
  treatment: string;
  comment: string;
  rating: number;
  avatar: string;
  date: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'María García',
    treatment: 'Limpieza Facial',
    comment: 'Increíble experiencia. Mi piel nunca había lucido tan radiante. El personal es muy profesional y atento. Definitivamente regresaré.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    date: 'Hace 2 semanas'
  },
  {
    id: 2,
    name: 'Carlos Rodríguez',
    treatment: 'Depilación Láser',
    comment: 'Después de solo 3 sesiones ya veo resultados impresionantes. El proceso es rápido y prácticamente indoloro. Muy recomendado.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    date: 'Hace 1 mes'
  },
  {
    id: 3,
    name: 'Ana Martínez',
    treatment: 'Botox',
    comment: 'Los resultados son naturales, justo lo que buscaba. La Dra. fue muy clara explicando todo el procedimiento. Me siento 10 años más joven.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    date: 'Hace 3 semanas'
  },
  {
    id: 4,
    name: 'Roberto Sánchez',
    treatment: 'Tratamiento Corporal',
    comment: 'Excelente atención desde la primera consulta. Los tratamientos corporales han mejorado mucho la firmeza de mi piel.',
    rating: 4,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    date: 'Hace 1 mes'
  }
];

const StarRating = ({ rating }: { rating: number }) => (
  <HStack spacing={1}>
    {[...Array(5)].map((_, i) => (
      <Icon 
        key={i} 
        as={Star} 
        boxSize={4} 
        fill={i < rating ? 'yellow.400' : 'gray.200'}
        color={i < rating ? 'yellow.400' : 'gray.200'}
      />
    ))}
  </HStack>
);

const TestimonialCard = ({ testimonial, index }: { testimonial: Testimonial; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const cardBg = useColorModeValue('white', 'gray.800');

  return (
    <MotionBox
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Box
        bg={cardBg}
        p={8}
        borderRadius="2xl"
        boxShadow="lg"
        position="relative"
        height="100%"
        border="1px solid"
        borderColor="gray.100"
        _hover={{ 
          transform: 'translateY(-5px)', 
          boxShadow: '2xl',
          borderColor: 'teal.200'
        }}
        transition="all 0.3s ease"
      >
        {/* Quote Icon */}
        <Box
          position="absolute"
          top={4}
          right={4}
          color="teal.100"
        >
          <Icon as={Quote} boxSize={10} />
        </Box>

        <VStack align="flex-start" spacing={4}>
          {/* Rating */}
          <StarRating rating={testimonial.rating} />
          
          {/* Comment */}
          <Text color="gray.600" lineHeight="tall" fontSize="md">
            "{testimonial.comment}"
          </Text>
          
          {/* Author */}
          <HStack spacing={4} pt={4} borderTop="1px solid" borderColor="gray.100" w="full">
            <Avatar 
              src={testimonial.avatar} 
              name={testimonial.name}
              size="md"
              border="3px solid"
              borderColor="teal.400"
            />
            <Box flex={1}>
              <Text fontWeight="bold" color="gray.800">
                {testimonial.name}
              </Text>
              <HStack spacing={2} flexWrap="wrap">
                <Badge colorScheme="teal" borderRadius="full" px={2}>
                  {testimonial.treatment}
                </Badge>
                <Text fontSize="xs" color="gray.400">
                  {testimonial.date}
                </Text>
              </HStack>
            </Box>
          </HStack>
        </VStack>
      </Box>
    </MotionBox>
  );
};

const Testimonials: React.FC = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  return (
    <Box py={20} bg="white">
      <Container maxW="container.xl">
        {/* Header */}
        <MotionBox
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <VStack spacing={4} textAlign="center" mb={16}>
            <Badge colorScheme="teal" px={3} py={1} borderRadius="full" fontSize="sm">
              Testimonios
            </Badge>
            <Heading as="h2" size="xl" color="gray.800">
              Lo que dicen nuestros pacientes
            </Heading>
            <Text fontSize="lg" color="gray.600" maxW="600px">
              Miles de pacientes satisfechos avalan nuestra calidad. 
              Conoce sus experiencias reales.
            </Text>
          </VStack>
        </MotionBox>

        {/* Testimonials Grid */}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={testimonial.id} 
              testimonial={testimonial} 
              index={index}
            />
          ))}
        </SimpleGrid>

        {/* Stats Bar */}
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <SimpleGrid 
            columns={{ base: 2, md: 4 }} 
            spacing={8} 
            mt={16}
            p={8}
            bg="teal.50"
            borderRadius="2xl"
          >
            <VStack>
              <Text fontSize="4xl" fontWeight="bold" color="teal.600">5,000+</Text>
              <Text color="gray.600" textAlign="center">Pacientes atendidos</Text>
            </VStack>
            <VStack>
              <Text fontSize="4xl" fontWeight="bold" color="teal.600">4.9</Text>
              <Text color="gray.600" textAlign="center">Calificación promedio</Text>
            </VStack>
            <VStack>
              <Text fontSize="4xl" fontWeight="bold" color="teal.600">98%</Text>
              <Text color="gray.600" textAlign="center">Clientes satisfechos</Text>
            </VStack>
            <VStack>
              <Text fontSize="4xl" fontWeight="bold" color="teal.600">10+</Text>
              <Text color="gray.600" textAlign="center">Años de experiencia</Text>
            </VStack>
          </SimpleGrid>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default Testimonials;
