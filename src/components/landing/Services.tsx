'use client';

import React, { useRef } from 'react';
import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  SimpleGrid, 
  VStack, 
  Icon,
  Badge,
  useColorModeValue,
  HStack,
  Button,
  Image
} from '@chakra-ui/react';
import { Sparkles, Syringe, Zap, Heart, ArrowRight, Check } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

const MotionBox = motion(Box);

interface Service {
  title: string;
  description: string;
  icon: React.ElementType;
  popular?: boolean;
  image: string;
  benefits: string[];
  price: string;
}

const servicesData: Service[] = [
  {
    title: 'Limpieza Facial Profunda',
    description: 'Elimina impurezas, puntos negros y células muertas para una piel renovada y luminosa.',
    icon: Sparkles,
    popular: true,
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=300&fit=crop',
    benefits: ['Extracción profesional', 'Mascarilla hidratante', 'Suero vitamínico'],
    price: 'Desde $890'
  },
  {
    title: 'Botox y Rellenos',
    description: 'Tratamientos con toxina botulínica y ácido hialurónico para resultados naturales.',
    icon: Syringe,
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=300&fit=crop',
    benefits: ['Resultados naturales', 'Sin tiempo de recuperación', 'Efecto inmediato'],
    price: 'Desde $3,500'
  },
  {
    title: 'Depilación Láser',
    description: 'Tecnología láser de diodo para eliminación definitiva del vello no deseado.',
    icon: Zap,
    image: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=400&h=300&fit=crop',
    benefits: ['Resultados permanentes', 'Sesiones rápidas', 'Todas las áreas'],
    price: 'Desde $450'
  },
  {
    title: 'Tratamientos Corporales',
    description: 'Mesoterapia, radiofrecuencia y tratamientos reductores para moldear tu figura.',
    icon: Heart,
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop',
    benefits: ['Reduce medidas', 'Elimina celulitis', 'Reafirma la piel'],
    price: 'Desde $1,200'
  },
];

const ServiceCard = ({ service, index }: { service: Service; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const cardBg = useColorModeValue('white', 'gray.800');

  return (
    <MotionBox
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      <Box 
        bg={cardBg}
        borderRadius="3xl"
        overflow="hidden"
        boxShadow="xl"
        border="1px solid"
        borderColor="gray.100"
        transition="all 0.4s ease"
        position="relative"
        _hover={{ 
          transform: 'translateY(-10px)', 
          boxShadow: '2xl',
        }}
        height="100%"
        display="flex"
        flexDirection="column"
      >
        {/* Image Section */}
        <Box position="relative" overflow="hidden">
          <Image 
            src={service.image}
            alt={service.title}
            w="100%"
            h="200px"
            objectFit="cover"
            transition="transform 0.5s ease"
            _groupHover={{ transform: 'scale(1.1)' }}
          />
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bgGradient="linear(to-t, blackAlpha.600, transparent)"
          />
          {service.popular && (
            <Badge 
              position="absolute" 
              top={4} 
              right={4} 
              colorScheme="orange"
              borderRadius="full"
              px={3}
              py={1}
              fontSize="xs"
              fontWeight="bold"
            >
              ⭐ Más Popular
            </Badge>
          )}
          <Box 
            position="absolute" 
            bottom={4} 
            left={4}
            p={3} 
            bg="white" 
            borderRadius="xl"
            boxShadow="lg"
          >
            <Icon as={service.icon} boxSize={6} color="teal.500" />
          </Box>
        </Box>

        {/* Content Section */}
        <VStack align="stretch" p={6} spacing={4} flex={1}>
          <Box>
            <Heading as="h3" size="md" color="gray.800" mb={2}>
              {service.title}
            </Heading>
            <Text color="gray.600" fontSize="sm" lineHeight="tall">
              {service.description}
            </Text>
          </Box>

          {/* Benefits */}
          <VStack align="stretch" spacing={2}>
            {service.benefits.map((benefit, i) => (
              <HStack key={i} spacing={2}>
                <Icon as={Check} boxSize={4} color="green.400" />
                <Text fontSize="sm" color="gray.600">{benefit}</Text>
              </HStack>
            ))}
          </VStack>

          {/* Price & CTA */}
          <Box pt={4} mt="auto" borderTop="1px solid" borderColor="gray.100">
            <HStack justify="space-between" align="center">
              <Box>
                <Text fontSize="xs" color="gray.500">Precio</Text>
                <Text fontSize="lg" fontWeight="bold" color="teal.600">
                  {service.price}
                </Text>
              </Box>
              <Button
                as={Link}
                href="/contacto"
                size="sm"
                colorScheme="teal"
                borderRadius="full"
                rightIcon={<Icon as={ArrowRight} boxSize={4} />}
              >
                Reservar
              </Button>
            </HStack>
          </Box>
        </VStack>
      </Box>
    </MotionBox>
  );
};

const Services: React.FC = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  return (
    <Box id="servicios" py={24} bg="gray.50" position="relative" overflow="hidden">
      {/* Background Decorations */}
      <Box
        position="absolute"
        top="-200px"
        right="-200px"
        w="500px"
        h="500px"
        bg="teal.100"
        borderRadius="full"
        filter="blur(150px)"
        opacity={0.5}
      />
      <Box
        position="absolute"
        bottom="-100px"
        left="-100px"
        w="400px"
        h="400px"
        bg="cyan.100"
        borderRadius="full"
        filter="blur(120px)"
        opacity={0.4}
      />

      <Container maxW="container.xl" position="relative" zIndex={1}>
        {/* Header */}
        <MotionBox
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <VStack spacing={4} textAlign="center" mb={16}>
            <Badge 
              colorScheme="teal" 
              px={4} 
              py={2} 
              borderRadius="full" 
              fontSize="sm"
              fontWeight="medium"
            >
              ✨ Nuestros Servicios
            </Badge>
            <Heading 
              as="h2" 
              size="2xl" 
              color="gray.800"
              maxW="600px"
            >
              Tratamientos especializados para{' '}
              <Text as="span" color="teal.500">tu bienestar</Text>
            </Heading>
            <Text fontSize="lg" color="gray.600" maxW="700px" lineHeight="tall">
              Descubre nuestra amplia gama de tratamientos estéticos y dermatológicos, 
              diseñados para realzar tu belleza natural con resultados visibles.
            </Text>
          </VStack>
        </MotionBox>
        
        {/* Services Grid */}
        <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} spacing={8}>
          {servicesData.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </SimpleGrid>

        {/* CTA Section */}
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Box 
            mt={16} 
            p={10} 
            bg="teal.600" 
            borderRadius="3xl"
            textAlign="center"
            position="relative"
            overflow="hidden"
          >
            <Box
              position="absolute"
              top={0}
              right={0}
              w="200px"
              h="200px"
              bg="teal.500"
              borderRadius="full"
              transform="translate(50%, -50%)"
            />
            <Box
              position="absolute"
              bottom={0}
              left={0}
              w="150px"
              h="150px"
              bg="teal.700"
              borderRadius="full"
              transform="translate(-50%, 50%)"
            />
            <VStack spacing={4} position="relative" zIndex={1}>
              <Heading size="lg" color="white">
                ¿No sabes qué tratamiento es ideal para ti?
              </Heading>
              <Text color="whiteAlpha.900" maxW="500px">
                Agenda una consulta gratuita con nuestros especialistas y recibe 
                una evaluación personalizada.
              </Text>
              <Button
                as={Link}
                href="/contacto"
                size="lg"
                bg="white"
                color="teal.600"
                px={8}
                borderRadius="full"
                _hover={{ bg: 'gray.100', transform: 'translateY(-2px)' }}
                transition="all 0.3s"
              >
                Consulta gratis
              </Button>
            </VStack>
          </Box>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default Services;