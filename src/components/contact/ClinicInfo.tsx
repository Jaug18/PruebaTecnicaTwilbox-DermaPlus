'use client';

import React from 'react';
import { 
  Box, 
  Text, 
  VStack, 
  HStack, 
  Icon, 
  Divider,
  useColorModeValue,
  Badge
} from '@chakra-ui/react';
import { MapPin, Phone, Clock, Mail, Instagram, Facebook, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

interface InfoItemProps {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
  delay?: number;
}

const InfoItem = ({ icon, title, children, delay = 0 }: InfoItemProps) => {
  const iconBg = useColorModeValue('teal.50', 'teal.900');
  const iconColor = useColorModeValue('teal.500', 'teal.300');
  const titleColor = useColorModeValue('gray.700', 'gray.200');
  
  return (
    <MotionBox
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <HStack align="flex-start" spacing={4}>
        <Box 
          p={3} 
          bg={iconBg} 
          borderRadius="xl"
          color={iconColor}
        >
          <Icon as={icon} boxSize={5} />
        </Box>
        <Box flex={1}>
          <Text fontWeight="bold" color={titleColor} mb={1}>{title}</Text>
          <Box color="gray.500" _dark={{ color: 'gray.400' }}>{children}</Box>
        </Box>
      </HStack>
    </MotionBox>
  );
};

const ClinicInfo = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.100', 'gray.700');
  const dividerColor = useColorModeValue('gray.100', 'gray.700');
  const socialBg = useColorModeValue('gray.100', 'gray.700');
  const socialHoverBg = useColorModeValue('teal.50', 'teal.900');
  const socialHoverColor = useColorModeValue('teal.500', 'teal.300');

  const socials = [
    { icon: Instagram, href: '#', label: 'Instagram', color: '#E4405F' },
    { icon: Facebook, href: '#', label: 'Facebook', color: '#1877F2' },
    { icon: MessageCircle, href: '#', label: 'WhatsApp', color: '#25D366' },
  ];

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box 
        p={8} 
        bg={bgColor}
        borderRadius="2xl" 
        boxShadow="xl"
        border="1px solid"
        borderColor={borderColor}
        position="relative"
        overflow="hidden"
      >
        {/* Decorative gradient line */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          h="4px"
          bgGradient="linear(to-r, teal.400, cyan.400)"
        />

        <VStack spacing={6} align="stretch">
          <InfoItem icon={MapPin} title="Dirección" delay={0.1}>
            <Text>Av. Reforma 456, Piso 3</Text>
            <Text>Col. Juárez, CDMX, 06600</Text>
          </InfoItem>
          
          <Divider borderColor={dividerColor} />
          
          <InfoItem icon={Phone} title="Teléfono" delay={0.2}>
            <Text fontWeight="medium">+52 (55) 1234-5678</Text>
            <Badge colorScheme="green" mt={1} borderRadius="full">
              WhatsApp disponible
            </Badge>
          </InfoItem>
          
          <Divider borderColor={dividerColor} />
          
          <InfoItem icon={Mail} title="Correo electrónico" delay={0.3}>
            <Text>contacto@dermaplus.mx</Text>
          </InfoItem>
          
          <Divider borderColor={dividerColor} />
          
          <InfoItem icon={Clock} title="Horarios de atención" delay={0.4}>
            <VStack align="flex-start" spacing={1}>
              <HStack justify="space-between" w="full">
                <Text>Lunes a Viernes</Text>
                <Text fontWeight="medium">9:00 - 19:00</Text>
              </HStack>
              <HStack justify="space-between" w="full">
                <Text>Sábados</Text>
                <Text fontWeight="medium">10:00 - 16:00</Text>
              </HStack>
              <HStack justify="space-between" w="full">
                <Text>Domingos</Text>
                <Badge colorScheme="red" borderRadius="full">Cerrado</Badge>
              </HStack>
            </VStack>
          </InfoItem>
          
          <Divider borderColor={dividerColor} />
          
          {/* Social Links */}
          <MotionBox
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <Box>
              <Text fontWeight="bold" color="gray.700" _dark={{ color: 'gray.200' }} mb={4}>
                Síguenos en redes
              </Text>
              <HStack spacing={3}>
                {socials.map((social) => (
                  <MotionBox
                    key={social.label}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Box 
                      as="a" 
                      href={social.href} 
                      p={3} 
                      bg={socialBg} 
                      borderRadius="xl"
                      color="gray.600"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      _hover={{ 
                        bg: socialHoverBg, 
                        color: social.color,
                        boxShadow: 'md'
                      }}
                      transition="all 0.3s"
                    >
                      <Icon as={social.icon} boxSize={5} />
                    </Box>
                  </MotionBox>
                ))}
              </HStack>
            </Box>
          </MotionBox>
        </VStack>
      </Box>
    </MotionBox>
  );
};

export default ClinicInfo;