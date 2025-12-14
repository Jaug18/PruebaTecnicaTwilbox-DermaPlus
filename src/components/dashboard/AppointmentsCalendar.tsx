'use client';

import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Badge,
  Flex,
  Button,
  useColorModeValue,
  IconButton,
  Divider,
  Avatar,
  Tooltip,
} from '@chakra-ui/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  User,
  CheckCircle,
  AlertCircle,
  Calendar as CalendarIcon
} from 'lucide-react';
import { dashboardData, Appointment } from '../../data/dashboardData';
import { motion, AnimatePresence } from 'framer-motion';

const MotionBox = motion(Box);

const statusConfig: Record<string, { color: string; bg: string; icon: React.ReactNode }> = {
  confirmada: { 
    color: 'green.500', 
    bg: 'green.50', 
    icon: <CheckCircle size={14} /> 
  },
  pendiente: { 
    color: 'yellow.500', 
    bg: 'yellow.50', 
    icon: <AlertCircle size={14} /> 
  },
  cancelada: { 
    color: 'red.500', 
    bg: 'red.50', 
    icon: <AlertCircle size={14} /> 
  },
};

const AppointmentsCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date('2025-06-15'));
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.400');
  const headingColor = useColorModeValue('gray.800', 'white');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');
  const selectedBg = useColorModeValue('teal.50', 'teal.900');
  const todayBg = useColorModeValue('teal.500', 'teal.400');

  // Generar días del mes
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    // Días del mes anterior para completar la semana
    const startDayOfWeek = firstDay.getDay();
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      const prevDay = new Date(year, month, -i);
      days.push({ date: prevDay, isCurrentMonth: false });
    }

    // Días del mes actual
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push({ date: new Date(year, month, i), isCurrentMonth: true });
    }

    // Días del mes siguiente para completar la semana
    const remainingDays = 42 - days.length; // 6 semanas * 7 días
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ date: new Date(year, month + 1, i), isCurrentMonth: false });
    }

    return days;
  };

  const days = getDaysInMonth(selectedDate);
  const weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  // Obtener citas del día seleccionado
  const selectedDateStr = selectedDate.toISOString().split('T')[0];
  const appointmentsForDay = dashboardData.appointments.filter(
    apt => apt.date === selectedDateStr
  );

  // Verificar si un día tiene citas
  const hasAppointments = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return dashboardData.appointments.some(apt => apt.date === dateStr);
  };

  const navigateMonth = (direction: number) => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + direction, 1));
  };

  const selectDate = (date: Date) => {
    setSelectedDate(date);
  };

  const monthName = selectedDate.toLocaleDateString('es-MX', { month: 'long', year: 'numeric' });

  return (
    <Box>
      {/* Header del calendario */}
      <Flex justify="space-between" align="center" mb={4}>
        <HStack>
          <CalendarIcon size={20} color="#319795" />
          <Text fontWeight="semibold" color={headingColor} textTransform="capitalize">
            {monthName}
          </Text>
        </HStack>
        <HStack spacing={1}>
          <IconButton
            aria-label="Mes anterior"
            icon={<ChevronLeft size={18} />}
            size="sm"
            variant="ghost"
            onClick={() => navigateMonth(-1)}
          />
          <IconButton
            aria-label="Mes siguiente"
            icon={<ChevronRight size={18} />}
            size="sm"
            variant="ghost"
            onClick={() => navigateMonth(1)}
          />
        </HStack>
      </Flex>

      {/* Días de la semana */}
      <Flex mb={2}>
        {weekDays.map(day => (
          <Box 
            key={day} 
            flex={1} 
            textAlign="center" 
            py={2}
          >
            <Text fontSize="xs" fontWeight="medium" color={textColor}>
              {day}
            </Text>
          </Box>
        ))}
      </Flex>

      {/* Grid de días */}
      <Box 
        display="grid" 
        gridTemplateColumns="repeat(7, 1fr)" 
        gap={1}
        mb={4}
      >
        {days.map((day, index) => {
          const isSelected = day.date.toDateString() === selectedDate.toDateString();
          const isToday = day.date.toDateString() === new Date().toDateString();
          const hasApts = hasAppointments(day.date);

          return (
            <Box
              key={index}
              as="button"
              p={2}
              borderRadius="lg"
              bg={isSelected ? selectedBg : 'transparent'}
              opacity={day.isCurrentMonth ? 1 : 0.4}
              _hover={{ bg: day.isCurrentMonth ? hoverBg : 'transparent' }}
              onClick={() => day.isCurrentMonth && selectDate(day.date)}
              position="relative"
              transition="all 0.2s"
            >
              <Text
                fontSize="sm"
                fontWeight={isToday || isSelected ? 'bold' : 'normal'}
                color={isToday ? todayBg : isSelected ? 'teal.600' : headingColor}
              >
                {day.date.getDate()}
              </Text>
              {hasApts && day.isCurrentMonth && (
                <Box
                  position="absolute"
                  bottom={1}
                  left="50%"
                  transform="translateX(-50%)"
                  w={1.5}
                  h={1.5}
                  borderRadius="full"
                  bg="teal.500"
                />
              )}
            </Box>
          );
        })}
      </Box>

      <Divider mb={4} />

      {/* Lista de citas del día seleccionado */}
      <Box>
        <Text fontSize="sm" fontWeight="medium" color={textColor} mb={3}>
          Citas para {selectedDate.toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long' })}
        </Text>
        
        <AnimatePresence mode="wait">
          <VStack spacing={3} align="stretch">
            {appointmentsForDay.length === 0 ? (
              <MotionBox
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                textAlign="center"
                py={6}
              >
                <CalendarIcon size={32} color="gray" style={{ margin: '0 auto', marginBottom: 8 }} />
                <Text color={textColor} fontSize="sm">No hay citas programadas</Text>
              </MotionBox>
            ) : (
              appointmentsForDay.map((apt, index) => (
                <MotionBox
                  key={apt.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.1 }}
                  p={3}
                  bg={hoverBg}
                  borderRadius="lg"
                  border="1px solid"
                  borderColor={borderColor}
                  _hover={{ boxShadow: 'sm' }}
                >
                  <Flex justify="space-between" align="flex-start">
                    <HStack spacing={3}>
                      <Avatar 
                        name={apt.patientName} 
                        size="sm" 
                        bg="teal.500"
                      />
                      <Box>
                        <Text fontWeight="medium" fontSize="sm">
                          {apt.patientName}
                        </Text>
                        <Text fontSize="xs" color={textColor}>
                          {apt.treatment}
                        </Text>
                      </Box>
                    </HStack>
                    <Badge
                      colorScheme={statusConfig[apt.status]?.color.split('.')[0] || 'gray'}
                      borderRadius="full"
                      px={2}
                      py={0.5}
                      fontSize="xs"
                      display="flex"
                      alignItems="center"
                      gap={1}
                    >
                      {statusConfig[apt.status]?.icon}
                      {apt.status === 'confirmada' ? 'Confirmada' : 'Pendiente'}
                    </Badge>
                  </Flex>
                  <HStack mt={2} spacing={4} fontSize="xs" color={textColor}>
                    <HStack>
                      <Clock size={12} />
                      <Text>{apt.time} ({apt.duration} min)</Text>
                    </HStack>
                    <HStack>
                      <User size={12} />
                      <Text>{apt.doctor}</Text>
                    </HStack>
                  </HStack>
                </MotionBox>
              ))
            )}
          </VStack>
        </AnimatePresence>
      </Box>

      {/* Resumen de citas */}
      <Flex mt={4} pt={4} borderTop="1px solid" borderColor={borderColor} justify="space-between">
        <HStack spacing={4}>
          <HStack>
            <Box w={2} h={2} borderRadius="full" bg="green.500" />
            <Text fontSize="xs" color={textColor}>
              Confirmadas: {dashboardData.appointments.filter(a => a.status === 'confirmada').length}
            </Text>
          </HStack>
          <HStack>
            <Box w={2} h={2} borderRadius="full" bg="yellow.500" />
            <Text fontSize="xs" color={textColor}>
              Pendientes: {dashboardData.appointments.filter(a => a.status === 'pendiente').length}
            </Text>
          </HStack>
        </HStack>
      </Flex>
    </Box>
  );
};

export default AppointmentsCalendar;
