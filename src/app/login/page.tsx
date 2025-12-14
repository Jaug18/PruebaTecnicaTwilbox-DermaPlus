'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Input,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  IconButton,
  useColorModeValue,
  Alert,
  AlertIcon,
  AlertDescription,
  Divider,
  HStack,
  Badge,
  Card,
  CardBody,
  Flex,
  Image,
  useToast,
} from '@chakra-ui/react';
import { Mail, Lock, Eye, EyeOff, Sparkles, Shield, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';

const MotionBox = motion(Box);
const MotionCard = motion(Card);

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const toast = useToast();

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.400');
  const headingColor = useColorModeValue('gray.800', 'white');
  const inputBg = useColorModeValue('gray.50', 'gray.700');

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, isLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    if (!email || !password) {
      setError('Por favor, completa todos los campos');
      setIsSubmitting(false);
      return;
    }

    const success = await login(email, password);
    
    if (success) {
      toast({
        title: '¡Bienvenido!',
        description: 'Has iniciado sesión correctamente',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      router.push('/dashboard');
    } else {
      setError('Credenciales incorrectas. Verifica tu email y contraseña.');
    }
    
    setIsSubmitting(false);
  };

  const fillDemoCredentials = (type: 'admin' | 'staff') => {
    if (type === 'admin') {
      setEmail('admin@dermaplus.mx');
      setPassword('admin123');
    } else {
      setEmail('staff@dermaplus.mx');
      setPassword('staff123');
    }
    setError('');
  };

  if (isLoading) {
    return (
      <Box minH="100vh" bg={bgColor} display="flex" alignItems="center" justifyContent="center">
        <VStack spacing={4}>
          <Sparkles size={48} className="animate-spin" />
          <Text>Cargando...</Text>
        </VStack>
      </Box>
    );
  }

  return (
    <Box minH="100vh" bg={bgColor} py={12}>
      <Container maxW="container.sm">
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Logo y Título */}
          <VStack spacing={6} mb={8} textAlign="center">
            <MotionBox
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            >
              <Flex
                w={20}
                h={20}
                bg="linear-gradient(135deg, #319795 0%, #38B2AC 50%, #4FD1C5 100%)"
                borderRadius="2xl"
                align="center"
                justify="center"
                boxShadow="lg"
              >
                <Sparkles size={40} color="white" />
              </Flex>
            </MotionBox>
            
            <Box>
              <Heading 
                as="h1" 
                size="xl" 
                color={headingColor}
                fontFamily="'Poppins', sans-serif"
              >
                DermaPlus
              </Heading>
              <Text color={textColor} mt={2}>
                Panel de Administración
              </Text>
            </Box>
          </VStack>

          {/* Card de Login */}
          <MotionCard
            bg={cardBg}
            borderRadius="2xl"
            boxShadow="xl"
            border="1px solid"
            borderColor={borderColor}
            overflow="hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <CardBody p={8}>
              <VStack spacing={6}>
                <Box textAlign="center" w="full">
                  <Heading as="h2" size="lg" color={headingColor} mb={2}>
                    Iniciar Sesión
                  </Heading>
                  <Text color={textColor} fontSize="sm">
                    Ingresa tus credenciales para acceder al panel
                  </Text>
                </Box>

                {error && (
                  <Alert status="error" borderRadius="lg">
                    <AlertIcon />
                    <AlertDescription fontSize="sm">{error}</AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                  <VStack spacing={5}>
                    <FormControl isInvalid={!!error && !email}>
                      <FormLabel color={headingColor} fontWeight="medium">
                        Correo electrónico
                      </FormLabel>
                      <InputGroup>
                        <InputLeftElement pointerEvents="none" h="full">
                          <Mail size={18} color="gray" />
                        </InputLeftElement>
                        <Input
                          type="email"
                          placeholder="tu@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          bg={inputBg}
                          border="1px solid"
                          borderColor={borderColor}
                          borderRadius="xl"
                          size="lg"
                          _focus={{
                            borderColor: 'teal.400',
                            boxShadow: '0 0 0 1px var(--chakra-colors-teal-400)',
                          }}
                        />
                      </InputGroup>
                    </FormControl>

                    <FormControl isInvalid={!!error && !password}>
                      <FormLabel color={headingColor} fontWeight="medium">
                        Contraseña
                      </FormLabel>
                      <InputGroup>
                        <InputLeftElement pointerEvents="none" h="full">
                          <Lock size={18} color="gray" />
                        </InputLeftElement>
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          bg={inputBg}
                          border="1px solid"
                          borderColor={borderColor}
                          borderRadius="xl"
                          size="lg"
                          _focus={{
                            borderColor: 'teal.400',
                            boxShadow: '0 0 0 1px var(--chakra-colors-teal-400)',
                          }}
                        />
                        <InputRightElement h="full">
                          <IconButton
                            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                            icon={showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowPassword(!showPassword)}
                          />
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>

                    <Button
                      type="submit"
                      colorScheme="teal"
                      size="lg"
                      w="full"
                      borderRadius="xl"
                      isLoading={isSubmitting}
                      loadingText="Iniciando sesión..."
                      _hover={{
                        transform: 'translateY(-2px)',
                        boxShadow: 'lg',
                      }}
                      transition="all 0.2s"
                    >
                      Iniciar Sesión
                    </Button>
                  </VStack>
                </form>

                <Divider />

                {/* Demo Credentials */}
                <Box w="full">
                  <Text 
                    fontSize="sm" 
                    color={textColor} 
                    textAlign="center" 
                    mb={4}
                    fontWeight="medium"
                  >
                    🔐 Credenciales de demostración
                  </Text>
                  <VStack spacing={3}>
                    <Button
                      leftIcon={<Shield size={18} />}
                      variant="outline"
                      colorScheme="teal"
                      size="md"
                      w="full"
                      borderRadius="xl"
                      onClick={() => fillDemoCredentials('admin')}
                      justifyContent="flex-start"
                      px={4}
                    >
                      <HStack justify="space-between" w="full">
                        <Text>Administrador</Text>
                        <Badge colorScheme="teal" fontSize="xs">
                          admin@dermaplus.mx
                        </Badge>
                      </HStack>
                    </Button>
                    <Button
                      leftIcon={<User size={18} />}
                      variant="outline"
                      colorScheme="blue"
                      size="md"
                      w="full"
                      borderRadius="xl"
                      onClick={() => fillDemoCredentials('staff')}
                      justifyContent="flex-start"
                      px={4}
                    >
                      <HStack justify="space-between" w="full">
                        <Text>Personal</Text>
                        <Badge colorScheme="blue" fontSize="xs">
                          staff@dermaplus.mx
                        </Badge>
                      </HStack>
                    </Button>
                  </VStack>
                </Box>
              </VStack>
            </CardBody>
          </MotionCard>

          {/* Footer info */}
          <Text 
            textAlign="center" 
            mt={6} 
            fontSize="sm" 
            color={textColor}
          >
            ¿Problemas para acceder?{' '}
            <Text as="span" color="teal.500" cursor="pointer" fontWeight="medium">
              Contacta soporte
            </Text>
          </Text>
        </MotionBox>
      </Container>
    </Box>
  );
}
