'use client';

import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  Button, 
  Stack, 
  Flex,
  Icon,
  VStack,
  HStack,
  useColorModeValue
} from '@chakra-ui/react';
import { Sparkles, Heart, Shield, ArrowRight, Play } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const Hero = () => {
  return (
    <Box 
      position="relative"
      minH="100vh"
      display="flex"
      alignItems="center"
      overflow="hidden"
    >
      {/* Background Image with Overlay */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bgImage="url('https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2068')"
        bgSize="cover"
        bgPosition="center"
        bgRepeat="no-repeat"
        _after={{
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bgGradient: 'linear(to-r, rgba(0, 128, 128, 0.95), rgba(0, 128, 128, 0.7), rgba(0, 128, 128, 0.4))',
        }}
      />

      {/* Decorative Elements */}
      <MotionBox
        position="absolute"
        top="10%"
        right="5%"
        w="400px"
        h="400px"
        bg="whiteAlpha.100"
        borderRadius="full"
        filter="blur(80px)"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
      />
      <MotionBox
        position="absolute"
        bottom="10%"
        left="-5%"
        w="300px"
        h="300px"
        bg="cyan.400"
        borderRadius="full"
        filter="blur(100px)"
        opacity={0.3}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1.1 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
      />

      {/* Floating Shapes */}
      <MotionBox
        position="absolute"
        top="20%"
        left="10%"
        w="20px"
        h="20px"
        bg="cyan.300"
        borderRadius="full"
        opacity={0.6}
        animate={{ y: [-20, 20, -20] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <MotionBox
        position="absolute"
        top="60%"
        right="15%"
        w="15px"
        h="15px"
        bg="teal.200"
        borderRadius="full"
        opacity={0.5}
        animate={{ y: [20, -20, 20] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
      <MotionBox
        position="absolute"
        bottom="30%"
        left="20%"
        w="10px"
        h="10px"
        bg="white"
        borderRadius="full"
        opacity={0.4}
        animate={{ y: [-15, 15, -15] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      <Container maxW="container.xl" position="relative" zIndex={1}>
        <Stack 
          direction={{ base: 'column', lg: 'row' }} 
          spacing={{ base: 10, lg: 16 }}
          align="center"
          justify="space-between"
        >
          {/* Left Content */}
          <MotionBox 
            maxW="650px" 
            color="white"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Badge */}
            <MotionFlex
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              mb={6}
            >
              <HStack 
                bg="whiteAlpha.200" 
                px={4} 
                py={2} 
                borderRadius="full"
                backdropFilter="blur(10px)"
              >
                <Box w={2} h={2} bg="green.400" borderRadius="full" />
                <Text fontSize="sm" fontWeight="medium">
                  +5,000 pacientes satisfechos
                </Text>
              </HStack>
            </MotionFlex>

            <Heading 
              as="h1" 
              fontSize={{ base: '3xl', md: '4xl', lg: '5xl', xl: '6xl' }}
              mb={6}
              lineHeight="1.1"
              fontWeight="bold"
            >
              Descubre tu mejor{' '}
              <Text 
                as="span" 
                bgGradient="linear(to-r, cyan.200, teal.100)"
                bgClip="text"
              >
                versión
              </Text>
              {' '}con nosotros
            </Heading>
            
            <Text 
              fontSize={{ base: 'lg', md: 'xl' }}
              mb={8} 
              opacity={0.95}
              lineHeight="tall"
            >
              En DermaPlus combinamos tecnología de vanguardia con profesionales 
              certificados para ofrecerte los mejores tratamientos faciales, 
              corporales y dermatológicos. Tu belleza, nuestra pasión.
            </Text>
            
            <Stack 
              direction={{ base: 'column', sm: 'row' }} 
              spacing={4}
            >
              <Button 
                as={Link}
                href="#servicios"
                size="lg"
                bg="white"
                color="teal.600"
                px={8}
                py={7}
                fontSize="md"
                fontWeight="bold"
                borderRadius="full"
                rightIcon={<Icon as={ArrowRight} />}
                _hover={{ 
                  bg: 'gray.100', 
                  transform: 'translateY(-3px)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
                }}
                transition="all 0.3s"
              >
                Ver tratamientos
              </Button>
              <Button 
                as={Link}
                href="/contacto"
                size="lg"
                variant="outline"
                borderColor="whiteAlpha.500"
                color="white"
                px={8}
                py={7}
                fontSize="md"
                borderRadius="full"
                leftIcon={<Icon as={Play} boxSize={4} />}
                _hover={{ 
                  bg: 'whiteAlpha.200', 
                  borderColor: 'white',
                  transform: 'translateY(-3px)'
                }}
                transition="all 0.3s"
              >
                Agendar cita
              </Button>
            </Stack>

            {/* Trust Badges */}
            <HStack 
              mt={12} 
              spacing={8}
              flexWrap="wrap"
              opacity={0.9}
            >
              <VStack align="flex-start" spacing={0}>
                <Text fontSize="2xl" fontWeight="bold">10+</Text>
                <Text fontSize="xs" opacity={0.8}>Años de experiencia</Text>
              </VStack>
              <Box w="1px" h="40px" bg="whiteAlpha.300" />
              <VStack align="flex-start" spacing={0}>
                <Text fontSize="2xl" fontWeight="bold">15k+</Text>
                <Text fontSize="xs" opacity={0.8}>Tratamientos realizados</Text>
              </VStack>
              <Box w="1px" h="40px" bg="whiteAlpha.300" display={{ base: 'none', md: 'block' }} />
              <VStack align="flex-start" spacing={0} display={{ base: 'none', md: 'flex' }}>
                <Text fontSize="2xl" fontWeight="bold">98%</Text>
                <Text fontSize="xs" opacity={0.8}>Satisfacción</Text>
              </VStack>
            </HStack>
          </MotionBox>
          
          {/* Right Content - Feature Cards */}
          <MotionBox
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            display={{ base: 'none', lg: 'block' }}
          >
            <VStack spacing={4}>
              {[
                { icon: Sparkles, title: 'Tecnología avanzada', desc: 'Equipos de última generación', delay: 0 },
                { icon: Heart, title: '+5,000 pacientes felices', desc: 'Resultados comprobados', delay: 0.1 },
                { icon: Shield, title: 'Profesionales certificados', desc: 'Especialistas dermatólogos', delay: 0.2 },
              ].map((item, index) => (
                <MotionBox
                  key={item.title}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + item.delay }}
                  whileHover={{ x: -10, transition: { duration: 0.2 } }}
                >
                  <Flex 
                    bg="whiteAlpha.200" 
                    p={5} 
                    borderRadius="2xl" 
                    align="center"
                    backdropFilter="blur(10px)"
                    border="1px solid"
                    borderColor="whiteAlpha.300"
                    minW="300px"
                    cursor="pointer"
                    _hover={{
                      bg: 'whiteAlpha.300',
                      borderColor: 'whiteAlpha.500'
                    }}
                    transition="all 0.3s"
                  >
                    <Box 
                      p={3} 
                      bg="whiteAlpha.300" 
                      borderRadius="xl" 
                      mr={4}
                    >
                      <Icon as={item.icon} boxSize={6} color="white" />
                    </Box>
                    <Box color="white">
                      <Text fontWeight="bold" fontSize="md">{item.title}</Text>
                      <Text fontSize="sm" opacity={0.8}>{item.desc}</Text>
                    </Box>
                  </Flex>
                </MotionBox>
              ))}
            </VStack>
          </MotionBox>
        </Stack>
      </Container>

      {/* Scroll Indicator */}
      <MotionBox
        position="absolute"
        bottom={8}
        left="50%"
        transform="translateX(-50%)"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <MotionBox
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <VStack spacing={2}>
            <Text color="white" fontSize="xs" opacity={0.7}>Scroll</Text>
            <Box 
              w="30px" 
              h="50px" 
              border="2px solid" 
              borderColor="whiteAlpha.500" 
              borderRadius="full"
              position="relative"
            >
              <MotionBox
                position="absolute"
                top="8px"
                left="50%"
                transform="translateX(-50%)"
                w="4px"
                h="12px"
                bg="white"
                borderRadius="full"
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </Box>
          </VStack>
        </MotionBox>
      </MotionBox>
    </Box>
  );
};

export default Hero;