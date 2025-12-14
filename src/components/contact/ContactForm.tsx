'use client';

import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  FormControl, 
  FormLabel, 
  Input, 
  Textarea, 
  VStack,
  Icon,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Heading,
  Text,
  useColorModeValue,
  FormErrorMessage,
  InputGroup,
  InputLeftElement
} from '@chakra-ui/react';
import { Send, CheckCircle, User, Mail, Phone, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.100', 'gray.700');
  const inputBg = useColorModeValue('gray.50', 'gray.900');
  const labelColor = useColorModeValue('gray.600', 'gray.400');

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
    
    if (!formData.message.trim()) {
      newErrors.message = 'El mensaje es requerido';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name as keyof FormErrors]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    onOpen();
    
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
  };

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
          p={8} 
          bg={bgColor}
          borderRadius="2xl"
          boxShadow="xl"
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
            bgGradient="linear(to-r, teal.400, cyan.400)"
          />

          <VStack spacing={5}>
            <FormControl isRequired isInvalid={!!errors.name}>
              <FormLabel fontWeight="medium" fontSize="sm" color={labelColor}>
                Nombre completo
              </FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon as={User} color="gray.400" />
                </InputLeftElement>
                <Input 
                  name="name"
                  type="text" 
                  value={formData.name} 
                  onChange={handleChange} 
                  placeholder="Tu nombre completo"
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
            
            <FormControl isRequired isInvalid={!!errors.email}>
              <FormLabel fontWeight="medium" fontSize="sm" color={labelColor}>
                Correo electrónico
              </FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon as={Mail} color="gray.400" />
                </InputLeftElement>
                <Input 
                  name="email"
                  type="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  placeholder="tu@email.com"
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
            
            <FormControl isRequired isInvalid={!!errors.phone}>
              <FormLabel fontWeight="medium" fontSize="sm" color={labelColor}>
                Teléfono
              </FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon as={Phone} color="gray.400" />
                </InputLeftElement>
                <Input 
                  name="phone"
                  type="tel" 
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
            
            <FormControl isRequired isInvalid={!!errors.message}>
              <FormLabel fontWeight="medium" fontSize="sm" color={labelColor}>
                Mensaje
              </FormLabel>
              <Textarea 
                name="message"
                value={formData.message} 
                onChange={handleChange} 
                placeholder="¿En qué podemos ayudarte?"
                size="lg"
                bg={inputBg}
                border="2px solid"
                borderColor="transparent"
                _hover={{ borderColor: 'teal.200' }}
                _focus={{ borderColor: 'teal.400', bg: bgColor }}
                transition="all 0.3s"
                rows={5}
                resize="none"
              />
              <FormErrorMessage>{errors.message}</FormErrorMessage>
            </FormControl>
            
            <Button 
              type="submit" 
              colorScheme="teal"
              size="lg"
              width="full"
              py={7}
              isLoading={isSubmitting}
              loadingText="Enviando..."
              rightIcon={<Icon as={Send} />}
              bgGradient="linear(to-r, teal.400, teal.500)"
              _hover={{ 
                bgGradient: 'linear(to-r, teal.500, teal.600)',
                transform: 'translateY(-2px)', 
                boxShadow: 'lg' 
              }}
              transition="all 0.3s"
            >
              Enviar mensaje
            </Button>
          </VStack>
        </Box>
      </MotionBox>

      {/* Success Modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset="slideInBottom">
        <ModalOverlay backdropFilter="blur(8px)" bg="blackAlpha.600" />
        <ModalContent mx={4} borderRadius="2xl" overflow="hidden">
          <Box h="4px" bgGradient="linear(to-r, green.400, teal.400)" />
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
            <Heading size="lg" color="gray.800">¡Mensaje enviado!</Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody textAlign="center" pb={4}>
            <Text color="gray.600" fontSize="md">
              Gracias por contactarnos. Te responderemos a la brevedad posible.
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
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ContactForm;