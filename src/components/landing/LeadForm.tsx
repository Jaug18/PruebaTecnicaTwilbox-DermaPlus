'use client';

import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  FormControl, 
  FormLabel, 
  Input, 
  Select, 
  Textarea, 
  VStack,
  Heading,
  Text,
  Icon,
  HStack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  SimpleGrid,
  useColorModeValue,
  FormErrorMessage,
  InputGroup,
  InputLeftElement
} from '@chakra-ui/react';
import { CheckCircle, Send, User, Mail, Phone, Sparkles, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

interface FormData {
  name: string;
  email: string;
  phone: string;
  treatment: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  treatment?: string;
}

const LeadForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    treatment: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const inputBg = useColorModeValue('gray.50', 'gray.900');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    }
    
    if (!formData.treatment) {
      newErrors.treatment = 'Selecciona un tratamiento';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user types
    if (errors[name as keyof FormErrors]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    onOpen(); // Open success modal
    
    setFormData({
      name: '',
      email: '',
      phone: '',
      treatment: '',
      message: ''
    });
  };

  const treatments = [
    { value: 'limpieza-facial', label: '✨ Limpieza facial profunda' },
    { value: 'botox', label: '💉 Botox y rellenos' },
    { value: 'depilacion-laser', label: '⚡ Depilación láser' },
    { value: 'tratamientos-corporales', label: '💆 Tratamientos corporales' },
    { value: 'otro', label: '📋 Otro / Consulta general' },
  ];

  return (
    <>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box 
          as="form" 
          onSubmit={handleSubmit} 
          p={{ base: 6, md: 10 }}
          bg={bgColor}
          borderRadius="3xl"
          boxShadow="2xl"
          border="1px solid"
          borderColor={borderColor}
          position="relative"
          overflow="hidden"
        >
          {/* Decorative gradient */}
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            h="4px"
            bgGradient="linear(to-r, teal.400, cyan.400, teal.400)"
          />

          <VStack spacing={6}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5} w="full">
              {/* Name */}
              <FormControl isRequired isInvalid={!!errors.name}>
                <FormLabel fontWeight="medium" fontSize="sm" color="gray.600">
                  Nombre completo
                </FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Icon as={User} color="gray.400" />
                  </InputLeftElement>
                  <Input 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange}
                    placeholder="María García"
                    size="lg"
                    bg={inputBg}
                    border="2px solid"
                    borderColor="transparent"
                    _hover={{ borderColor: 'teal.200' }}
                    _focus={{ borderColor: 'teal.400', bg: bgColor }}
                    transition="all 0.3s"
                  />
                </InputGroup>
                <FormErrorMessage>{errors.name}</FormErrorMessage>
              </FormControl>
              
              {/* Email */}
              <FormControl isRequired isInvalid={!!errors.email}>
                <FormLabel fontWeight="medium" fontSize="sm" color="gray.600">
                  Correo electrónico
                </FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Icon as={Mail} color="gray.400" />
                  </InputLeftElement>
                  <Input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange}
                    placeholder="maria@email.com"
                    size="lg"
                    bg={inputBg}
                    border="2px solid"
                    borderColor="transparent"
                    _hover={{ borderColor: 'teal.200' }}
                    _focus={{ borderColor: 'teal.400', bg: bgColor }}
                    transition="all 0.3s"
                  />
                </InputGroup>
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>
            </SimpleGrid>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5} w="full">
              {/* Phone */}
              <FormControl isRequired isInvalid={!!errors.phone}>
                <FormLabel fontWeight="medium" fontSize="sm" color="gray.600">
                  Teléfono
                </FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Icon as={Phone} color="gray.400" />
                  </InputLeftElement>
                  <Input 
                    type="tel"
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleChange}
                    placeholder="+52 55 1234 5678"
                    size="lg"
                    bg={inputBg}
                    border="2px solid"
                    borderColor="transparent"
                    _hover={{ borderColor: 'teal.200' }}
                    _focus={{ borderColor: 'teal.400', bg: bgColor }}
                    transition="all 0.3s"
                  />
                </InputGroup>
                <FormErrorMessage>{errors.phone}</FormErrorMessage>
              </FormControl>
              
              {/* Treatment */}
              <FormControl isRequired isInvalid={!!errors.treatment}>
                <FormLabel fontWeight="medium" fontSize="sm" color="gray.600">
                  Tratamiento de interés
                </FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Icon as={Sparkles} color="gray.400" />
                  </InputLeftElement>
                  <Select 
                    name="treatment" 
                    value={formData.treatment} 
                    onChange={handleChange}
                    placeholder="Selecciona un tratamiento"
                    size="lg"
                    bg={inputBg}
                    border="2px solid"
                    borderColor="transparent"
                    _hover={{ borderColor: 'teal.200' }}
                    _focus={{ borderColor: 'teal.400', bg: bgColor }}
                    transition="all 0.3s"
                    pl={10}
                  >
                    {treatments.map((t) => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </Select>
                </InputGroup>
                <FormErrorMessage>{errors.treatment}</FormErrorMessage>
              </FormControl>
            </SimpleGrid>
            
            {/* Message */}
            <FormControl>
              <FormLabel fontWeight="medium" fontSize="sm" color="gray.600">
                Mensaje (opcional)
              </FormLabel>
              <Textarea 
                name="message" 
                value={formData.message} 
                onChange={handleChange}
                placeholder="Cuéntanos más sobre lo que buscas o alguna duda que tengas..."
                size="lg"
                bg={inputBg}
                border="2px solid"
                borderColor="transparent"
                _hover={{ borderColor: 'teal.200' }}
                _focus={{ borderColor: 'teal.400', bg: bgColor }}
                transition="all 0.3s"
                rows={4}
                resize="none"
              />
            </FormControl>
            
            <Button 
              type="submit"
              colorScheme="teal" 
              size="lg"
              width="full"
              py={7}
              fontSize="md"
              fontWeight="bold"
              isLoading={isSubmitting}
              loadingText="Enviando..."
              rightIcon={<Icon as={Send} />}
              bgGradient="linear(to-r, teal.400, teal.500)"
              _hover={{ 
                bgGradient: 'linear(to-r, teal.500, teal.600)',
                transform: 'translateY(-3px)', 
                boxShadow: 'xl' 
              }}
              _active={{
                transform: 'translateY(0)',
              }}
              transition="all 0.3s"
            >
              Solicitar información
            </Button>

            <Text fontSize="xs" color="gray.500" textAlign="center">
              🔒 Tus datos están protegidos. No compartimos información con terceros.
            </Text>
          </VStack>
        </Box>
      </MotionBox>

      {/* Success Modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset="slideInBottom">
        <ModalOverlay backdropFilter="blur(8px)" bg="blackAlpha.600" />
        <ModalContent mx={4} borderRadius="3xl" overflow="hidden">
          <Box 
            h="4px" 
            bgGradient="linear(to-r, green.400, teal.400)"
          />
          <ModalHeader textAlign="center" pt={10} pb={2}>
            <MotionBox
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', duration: 0.5 }}
            >
              <Box
                w={20}
                h={20}
                mx="auto"
                mb={4}
                bg="green.50"
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Icon as={CheckCircle} boxSize={12} color="green.400" />
              </Box>
            </MotionBox>
            <Heading size="lg" color="gray.800">¡Registro exitoso!</Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody textAlign="center" pb={4}>
            <Text color="gray.600" fontSize="md" lineHeight="tall">
              Gracias por tu interés en DermaPlus. Un especialista se pondrá 
              en contacto contigo en las próximas <strong>24 horas</strong>.
            </Text>
          </ModalBody>
          <ModalFooter justifyContent="center" pb={10}>
            <Button 
              colorScheme="teal" 
              size="lg" 
              onClick={onClose} 
              px={12}
              bgGradient="linear(to-r, teal.400, teal.500)"
              _hover={{ bgGradient: 'linear(to-r, teal.500, teal.600)' }}
            >
              ¡Entendido!
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LeadForm;