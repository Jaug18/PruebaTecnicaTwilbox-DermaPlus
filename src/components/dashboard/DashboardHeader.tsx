'use client';

import React from 'react';
import {
  Box,
  Flex,
  HStack,
  Avatar,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Badge,
  useColorModeValue,
  IconButton,
} from '@chakra-ui/react';
import { 
  User, 
  Settings, 
  LogOut, 
  ChevronDown,
  Shield
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import NotificationsPanel from './NotificationsPanel';
import ColorModeToggle from '../ui/ColorModeToggle';

const DashboardHeader: React.FC = () => {
  const { user, logout } = useAuth();
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.400');
  const headingColor = useColorModeValue('gray.800', 'white');

  if (!user) return null;

  const roleLabel = user.role === 'admin' ? 'Administrador' : 'Personal';
  const roleColor = user.role === 'admin' ? 'purple' : 'blue';

  return (
    <Box
      position="sticky"
      top={0}
      zIndex={100}
      bg={bgColor}
      borderBottom="1px solid"
      borderColor={borderColor}
      px={6}
      py={3}
    >
      <Flex justify="flex-end" align="center" gap={4}>
        {/* Toggle de modo oscuro */}
        <ColorModeToggle />

        {/* Notificaciones */}
        <NotificationsPanel />

        {/* User Menu */}
        <Menu>
          <MenuButton
            as={Box}
            cursor="pointer"
            _hover={{ opacity: 0.8 }}
            transition="opacity 0.2s"
          >
            <HStack spacing={3}>
              <Avatar 
                name={user.name} 
                src={user.avatar}
                size="sm"
                bg="teal.500"
              />
              <Box display={{ base: 'none', md: 'block' }}>
                <Text fontWeight="medium" fontSize="sm" color={headingColor}>
                  {user.name}
                </Text>
                <Badge 
                  colorScheme={roleColor} 
                  fontSize="xs" 
                  borderRadius="full"
                  display="flex"
                  alignItems="center"
                  gap={1}
                  w="fit-content"
                >
                  <Shield size={10} />
                  {roleLabel}
                </Badge>
              </Box>
              <ChevronDown size={16} color="gray" />
            </HStack>
          </MenuButton>
          
          <MenuList 
            borderRadius="xl" 
            boxShadow="lg"
            border="1px solid"
            borderColor={borderColor}
          >
            <Box px={4} py={2}>
              <Text fontWeight="medium" color={headingColor}>
                {user.name}
              </Text>
              <Text fontSize="sm" color={textColor}>
                {user.email}
              </Text>
            </Box>
            <MenuDivider />
            <MenuItem icon={<User size={16} />}>
              Mi perfil
            </MenuItem>
            <MenuItem icon={<Settings size={16} />}>
              Configuración
            </MenuItem>
            <MenuDivider />
            <MenuItem 
              icon={<LogOut size={16} />} 
              color="red.500"
              onClick={logout}
            >
              Cerrar sesión
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
};

export default DashboardHeader;
