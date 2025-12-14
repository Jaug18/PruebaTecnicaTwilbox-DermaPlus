'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { Box, Spinner, VStack, Text, useColorModeValue } from '@chakra-ui/react';
import { Sparkles } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ('admin' | 'staff')[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRoles 
}) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const textColor = useColorModeValue('gray.600', 'gray.400');

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (!isLoading && isAuthenticated && user && allowedRoles) {
      if (!allowedRoles.includes(user.role)) {
        router.push('/dashboard?access=denied');
      }
    }
  }, [isAuthenticated, isLoading, user, allowedRoles, router]);

  if (isLoading) {
    return (
      <Box 
        minH="100vh" 
        bg={bgColor} 
        display="flex" 
        alignItems="center" 
        justifyContent="center"
      >
        <VStack spacing={4}>
          <Box
            animation="pulse 1.5s ease-in-out infinite"
            sx={{
              '@keyframes pulse': {
                '0%, 100%': { opacity: 1, transform: 'scale(1)' },
                '50%': { opacity: 0.7, transform: 'scale(1.1)' },
              },
            }}
          >
            <Sparkles size={48} color="#319795" />
          </Box>
          <Spinner size="lg" color="teal.500" thickness="3px" />
          <Text color={textColor}>Verificando acceso...</Text>
        </VStack>
      </Box>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return (
      <Box 
        minH="100vh" 
        bg={bgColor} 
        display="flex" 
        alignItems="center" 
        justifyContent="center"
      >
        <VStack spacing={4}>
          <Text color="red.500" fontSize="xl" fontWeight="bold">
            Acceso denegado
          </Text>
          <Text color={textColor}>
            No tienes permisos para acceder a esta sección.
          </Text>
        </VStack>
      </Box>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
