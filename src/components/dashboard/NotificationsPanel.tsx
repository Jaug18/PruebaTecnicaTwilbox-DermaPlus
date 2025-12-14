'use client';

import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Badge,
  Flex,
  IconButton,
  useColorModeValue,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverHeader,
  PopoverCloseButton,
  Button,
  Divider,
} from '@chakra-ui/react';
import { 
  Bell, 
  UserPlus, 
  Calendar, 
  AlertTriangle, 
  CheckCircle,
  X,
  Check
} from 'lucide-react';
import { dashboardData, Notification } from '../../data/dashboardData';
import { motion, AnimatePresence } from 'framer-motion';

const MotionBox = motion(Box);

const notificationIcons: Record<string, { icon: React.ReactNode; color: string }> = {
  lead: { icon: <UserPlus size={16} />, color: 'blue' },
  appointment: { icon: <Calendar size={16} />, color: 'green' },
  alert: { icon: <AlertTriangle size={16} />, color: 'orange' },
  success: { icon: <CheckCircle size={16} />, color: 'teal' },
};

const NotificationsPanel: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>(dashboardData.notifications);
  const [isOpen, setIsOpen] = useState(false);

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.400');
  const headingColor = useColorModeValue('gray.800', 'white');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');
  const unreadBg = useColorModeValue('blue.50', 'blue.900');

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const removeNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `Hace ${diffMins} min`;
    if (diffHours < 24) return `Hace ${diffHours} h`;
    return `Hace ${diffDays} d`;
  };

  return (
    <Popover 
      isOpen={isOpen} 
      onClose={() => setIsOpen(false)}
      placement="bottom-end"
    >
      <PopoverTrigger>
        <Box position="relative">
          <IconButton
            aria-label="Notificaciones"
            icon={<Bell size={20} />}
            variant="ghost"
            onClick={() => setIsOpen(!isOpen)}
            position="relative"
          />
          {unreadCount > 0 && (
            <Badge
              position="absolute"
              top={-1}
              right={-1}
              colorScheme="red"
              borderRadius="full"
              minW={5}
              h={5}
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontSize="xs"
              fontWeight="bold"
            >
              {unreadCount}
            </Badge>
          )}
        </Box>
      </PopoverTrigger>

      <PopoverContent 
        w={{ base: '320px', md: '380px' }} 
        maxH="500px"
        bg={bgColor}
        borderColor={borderColor}
        borderRadius="xl"
        boxShadow="xl"
        _focus={{ outline: 'none' }}
      >
        <PopoverHeader 
          borderBottomWidth="1px" 
          borderColor={borderColor}
          py={3}
          px={4}
        >
          <Flex justify="space-between" align="center">
            <HStack>
              <Bell size={18} color="#319795" />
              <Text fontWeight="semibold" color={headingColor}>
                Notificaciones
              </Text>
              {unreadCount > 0 && (
                <Badge colorScheme="teal" borderRadius="full">
                  {unreadCount} nuevas
                </Badge>
              )}
            </HStack>
            {unreadCount > 0 && (
              <Button 
                size="xs" 
                variant="ghost" 
                colorScheme="teal"
                onClick={markAllAsRead}
                leftIcon={<Check size={14} />}
              >
                Marcar todas
              </Button>
            )}
          </Flex>
        </PopoverHeader>
        <PopoverCloseButton />
        
        <PopoverBody p={0} maxH="400px" overflowY="auto">
          <AnimatePresence>
            {notifications.length === 0 ? (
              <Box textAlign="center" py={8}>
                <Bell size={32} color="gray" style={{ margin: '0 auto', marginBottom: 8 }} />
                <Text color={textColor}>No hay notificaciones</Text>
              </Box>
            ) : (
              <VStack spacing={0} align="stretch">
                {notifications.map((notification, index) => (
                  <MotionBox
                    key={notification.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Flex
                      p={4}
                      bg={!notification.read ? unreadBg : 'transparent'}
                      _hover={{ bg: hoverBg }}
                      cursor="pointer"
                      onClick={() => markAsRead(notification.id)}
                      transition="background 0.2s"
                      borderBottom="1px solid"
                      borderColor={borderColor}
                    >
                      <Box
                        p={2}
                        borderRadius="lg"
                        bg={`${notificationIcons[notification.type]?.color}.100`}
                        color={`${notificationIcons[notification.type]?.color}.600`}
                        mr={3}
                        h="fit-content"
                      >
                        {notificationIcons[notification.type]?.icon}
                      </Box>
                      
                      <Box flex={1}>
                        <Flex justify="space-between" align="flex-start">
                          <Box>
                            <Text 
                              fontWeight={!notification.read ? 'semibold' : 'medium'} 
                              fontSize="sm"
                              color={headingColor}
                            >
                              {notification.title}
                            </Text>
                            <Text fontSize="xs" color={textColor} mt={0.5}>
                              {notification.message}
                            </Text>
                            <Text fontSize="xs" color={textColor} mt={1}>
                              {formatDate(notification.date)}
                            </Text>
                          </Box>
                          
                          <IconButton
                            aria-label="Eliminar"
                            icon={<X size={14} />}
                            size="xs"
                            variant="ghost"
                            colorScheme="gray"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeNotification(notification.id);
                            }}
                          />
                        </Flex>
                      </Box>

                      {!notification.read && (
                        <Box
                          w={2}
                          h={2}
                          borderRadius="full"
                          bg="blue.500"
                          ml={2}
                          mt={1}
                        />
                      )}
                    </Flex>
                  </MotionBox>
                ))}
              </VStack>
            )}
          </AnimatePresence>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationsPanel;
