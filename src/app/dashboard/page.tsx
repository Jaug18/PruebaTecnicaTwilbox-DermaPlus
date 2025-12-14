'use client';

import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Heading, 
  SimpleGrid, 
  Text,
  Flex,
  Badge,
  useColorModeValue,
  HStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
  Select,
  useToast,
  Alert,
  AlertIcon,
  AlertDescription,
  CloseButton,
  VStack,
} from '@chakra-ui/react';
import { 
  Users, 
  TrendingUp, 
  Activity, 
  Globe, 
  Calendar,
  DollarSign,
  Download,
  RefreshCw,
  LayoutDashboard,
  UserPlus,
  CalendarDays,
  BarChart3
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';

// Components
import PatientsChart from '../../components/dashboard/PatientsChart';
import TreatmentsChart from '../../components/dashboard/TreatmentsChart';
import ChannelsChart from '../../components/dashboard/ChannelsChart';
import RevenueChart from '../../components/dashboard/RevenueChart';
import LeadsTable from '../../components/dashboard/LeadsTable';
import AppointmentsCalendar from '../../components/dashboard/AppointmentsCalendar';
import KPISection from '../../components/dashboard/KPISection';
import ComparisonChart from '../../components/dashboard/ComparisonChart';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import StatsCard from '../../components/dashboard/StatsCard';
import ProtectedRoute from '../../components/auth/ProtectedRoute';

import { useAuth } from '../../context/AuthContext';
import { dashboardData } from '../../data/dashboardData';

const MotionBox = motion(Box);

function DashboardContent() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showAccessDenied, setShowAccessDenied] = useState(true);
  
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const toast = useToast();

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.100', 'gray.700');
  const headingColor = useColorModeValue('gray.800', 'white');
  const subTextColor = useColorModeValue('gray.600', 'gray.400');

  const accessDenied = searchParams.get('access') === 'denied';

  const stats = [
    { title: 'Total Pacientes', value: '1,035', icon: Users, change: '+12.5%', changeType: 'increase' as const },
    { title: 'Tratamientos', value: '847', icon: Activity, change: '+8.2%', changeType: 'increase' as const },
    { title: 'Conversión', value: '24.3%', icon: TrendingUp, change: '+3.1%', changeType: 'increase' as const },
    { title: 'Visitas Web', value: '12,847', icon: Globe, change: '+18.7%', changeType: 'increase' as const },
  ];

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsRefreshing(false);
    toast({
      title: 'Datos actualizados',
      description: 'El dashboard ha sido actualizado con los últimos datos.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleExportReport = () => {
    toast({
      title: 'Exportando reporte',
      description: 'El reporte se está generando. Se descargará automáticamente.',
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
    
    // Simular descarga
    setTimeout(() => {
      const data = JSON.stringify(dashboardData, null, 2);
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `dermaplus_report_${new Date().toISOString().split('T')[0]}.json`;
      a.click();
    }, 1000);
  };

  return (
    <Box bg={bgColor} minH="100vh">
      {/* Dashboard Header */}
      <DashboardHeader />

      <Container maxW="container.xl" py={6}>
        {/* Access Denied Alert */}
        {accessDenied && showAccessDenied && (
          <Alert status="warning" mb={6} borderRadius="lg">
            <AlertIcon />
            <AlertDescription>
              No tienes permisos para acceder a esa sección. Algunas funciones pueden estar restringidas.
            </AlertDescription>
            <CloseButton 
              position="absolute" 
              right="8px" 
              top="8px"
              onClick={() => setShowAccessDenied(false)}
            />
          </Alert>
        )}

        {/* Header */}
        <MotionBox
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Flex 
            justify="space-between" 
            align={{ base: 'flex-start', md: 'center' }}
            mb={6}
            flexDirection={{ base: 'column', md: 'row' }}
            gap={4}
          >
            <Box>
              <HStack spacing={3} mb={2}>
                <LayoutDashboard size={28} color="#319795" />
                <Heading as="h1" size="xl" color={headingColor}>
                  Dashboard
                </Heading>
                <Badge 
                  colorScheme="teal" 
                  px={3} 
                  py={1} 
                  borderRadius="full"
                  fontSize="xs"
                >
                  DermaPlus
                </Badge>
              </HStack>
              <Text color={subTextColor}>
                ¡Bienvenido, {user?.name?.split(' ')[0]}! Aquí tienes el resumen de hoy.
              </Text>
            </Box>
            
            <HStack spacing={3} flexWrap="wrap">
              <Select 
                value={selectedPeriod} 
                onChange={(e) => setSelectedPeriod(e.target.value)}
                size="sm"
                borderRadius="lg"
                w="auto"
              >
                <option value="week">Esta semana</option>
                <option value="month">Este mes</option>
                <option value="quarter">Trimestre</option>
                <option value="year">Este año</option>
              </Select>
              
              <Button
                leftIcon={<RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />}
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                isLoading={isRefreshing}
                loadingText="Actualizando"
                borderRadius="lg"
              >
                Actualizar
              </Button>
              
              {user?.role === 'admin' && (
                <Button
                  leftIcon={<Download size={16} />}
                  colorScheme="teal"
                  size="sm"
                  onClick={handleExportReport}
                  borderRadius="lg"
                >
                  Exportar
                </Button>
              )}

              <Badge 
                colorScheme="green" 
                px={4} 
                py={2} 
                borderRadius="full" 
                fontSize="sm"
                display="flex"
                alignItems="center"
                gap={2}
              >
                <Box w={2} h={2} bg="green.400" borderRadius="full" />
                En vivo
              </Badge>
            </HStack>
          </Flex>
        </MotionBox>

        {/* KPI Section */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          mb={6}
        >
          <KPISection />
        </MotionBox>

        {/* Stats Cards */}
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={4} mb={6}>
          {stats.map((stat, index) => (
            <MotionBox
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
            >
              <StatsCard {...stat} />
            </MotionBox>
          ))}
        </SimpleGrid>

        {/* Tabs for different views */}
        <Tabs variant="soft-rounded" colorScheme="teal" mb={6}>
          <TabList 
            bg={cardBg} 
            p={2} 
            borderRadius="xl" 
            border="1px solid"
            borderColor={borderColor}
            mb={6}
            overflowX="auto"
            flexWrap={{ base: 'nowrap', md: 'wrap' }}
          >
            <Tab borderRadius="lg" _selected={{ bg: 'teal.500', color: 'white' }}>
              <HStack spacing={2}>
                <BarChart3 size={16} />
                <Text display={{ base: 'none', md: 'block' }}>Métricas</Text>
              </HStack>
            </Tab>
            <Tab borderRadius="lg" _selected={{ bg: 'teal.500', color: 'white' }}>
              <HStack spacing={2}>
                <UserPlus size={16} />
                <Text display={{ base: 'none', md: 'block' }}>Leads</Text>
              </HStack>
            </Tab>
            <Tab borderRadius="lg" _selected={{ bg: 'teal.500', color: 'white' }}>
              <HStack spacing={2}>
                <CalendarDays size={16} />
                <Text display={{ base: 'none', md: 'block' }}>Citas</Text>
              </HStack>
            </Tab>
            <Tab borderRadius="lg" _selected={{ bg: 'teal.500', color: 'white' }}>
              <HStack spacing={2}>
                <DollarSign size={16} />
                <Text display={{ base: 'none', md: 'block' }}>Ingresos</Text>
              </HStack>
            </Tab>
          </TabList>

          <TabPanels>
            {/* Tab: Métricas */}
            <TabPanel p={0}>
              <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6} mb={6}>
                <MotionBox
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Box 
                    bg={cardBg} 
                    p={6} 
                    borderRadius="2xl" 
                    boxShadow="lg"
                    border="1px solid"
                    borderColor={borderColor}
                  >
                    <Flex justify="space-between" align="center" mb={6}>
                      <Box>
                        <Heading as="h3" size="md" color={headingColor}>
                          Pacientes Registrados
                        </Heading>
                        <Text fontSize="sm" color={subTextColor}>
                          Comparativa anual
                        </Text>
                      </Box>
                      <Badge colorScheme="teal" borderRadius="full" px={3}>
                        +28% vs año anterior
                      </Badge>
                    </Flex>
                    <ComparisonChart />
                  </Box>
                </MotionBox>
                
                <MotionBox
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <Box 
                    bg={cardBg} 
                    p={6} 
                    borderRadius="2xl" 
                    boxShadow="lg"
                    border="1px solid"
                    borderColor={borderColor}
                  >
                    <Flex justify="space-between" align="center" mb={6}>
                      <Box>
                        <Heading as="h3" size="md" color={headingColor}>
                          Tratamientos Más Solicitados
                        </Heading>
                        <Text fontSize="sm" color={subTextColor}>
                          Distribución porcentual
                        </Text>
                      </Box>
                    </Flex>
                    <TreatmentsChart />
                  </Box>
                </MotionBox>
              </SimpleGrid>

              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Box 
                  bg={cardBg} 
                  p={6} 
                  borderRadius="2xl" 
                  boxShadow="lg"
                  border="1px solid"
                  borderColor={borderColor}
                >
                  <Flex justify="space-between" align="center" mb={6}>
                    <Box>
                      <Heading as="h3" size="md" color={headingColor}>
                        Canales de Captación
                      </Heading>
                      <Text fontSize="sm" color={subTextColor}>
                        Origen de los nuevos pacientes
                      </Text>
                    </Box>
                    <Badge colorScheme="blue" borderRadius="full" px={3}>
                      Web lidera con 50%
                    </Badge>
                  </Flex>
                  <ChannelsChart />
                </Box>
              </MotionBox>
            </TabPanel>

            {/* Tab: Leads */}
            <TabPanel p={0}>
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Box 
                  bg={cardBg} 
                  p={6} 
                  borderRadius="2xl" 
                  boxShadow="lg"
                  border="1px solid"
                  borderColor={borderColor}
                >
                  <Flex justify="space-between" align="center" mb={6}>
                    <Box>
                      <Heading as="h3" size="md" color={headingColor}>
                        Gestión de Leads
                      </Heading>
                      <Text fontSize="sm" color={subTextColor}>
                        Prospectos y seguimiento de conversión
                      </Text>
                    </Box>
                    <Badge colorScheme="blue" borderRadius="full" px={3}>
                      {dashboardData.leads.length} leads activos
                    </Badge>
                  </Flex>
                  <LeadsTable />
                </Box>
              </MotionBox>
            </TabPanel>

            {/* Tab: Citas */}
            <TabPanel p={0}>
              <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
                <MotionBox
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Box 
                    bg={cardBg} 
                    p={6} 
                    borderRadius="2xl" 
                    boxShadow="lg"
                    border="1px solid"
                    borderColor={borderColor}
                    h="full"
                  >
                    <Heading as="h3" size="md" color={headingColor} mb={4}>
                      Calendario de Citas
                    </Heading>
                    <AppointmentsCalendar />
                  </Box>
                </MotionBox>

                <MotionBox
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <Box 
                    bg={cardBg} 
                    p={6} 
                    borderRadius="2xl" 
                    boxShadow="lg"
                    border="1px solid"
                    borderColor={borderColor}
                    h="full"
                  >
                    <Heading as="h3" size="md" color={headingColor} mb={4}>
                      Próximas Citas
                    </Heading>
                    <VStack spacing={4} align="stretch">
                      {dashboardData.appointments.slice(0, 5).map((apt, index) => (
                        <MotionBox
                          key={apt.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          p={4}
                          bg={useColorModeValue('gray.50', 'gray.700')}
                          borderRadius="lg"
                          border="1px solid"
                          borderColor={borderColor}
                        >
                          <Flex justify="space-between" align="center">
                            <Box>
                              <Text fontWeight="medium">{apt.patientName}</Text>
                              <Text fontSize="sm" color={subTextColor}>{apt.treatment}</Text>
                            </Box>
                            <Box textAlign="right">
                              <Text fontSize="sm" fontWeight="medium">
                                {new Date(apt.date).toLocaleDateString('es-MX', { day: 'numeric', month: 'short' })}
                              </Text>
                              <Text fontSize="sm" color={subTextColor}>{apt.time}</Text>
                            </Box>
                          </Flex>
                          <HStack mt={2} justify="space-between">
                            <Badge 
                              colorScheme={apt.status === 'confirmada' ? 'green' : 'yellow'}
                              borderRadius="full"
                              fontSize="xs"
                            >
                              {apt.status}
                            </Badge>
                            <Text fontSize="xs" color={subTextColor}>{apt.doctor}</Text>
                          </HStack>
                        </MotionBox>
                      ))}
                    </VStack>
                  </Box>
                </MotionBox>
              </SimpleGrid>
            </TabPanel>

            {/* Tab: Ingresos */}
            <TabPanel p={0}>
              {user?.role === 'admin' ? (
                <SimpleGrid columns={{ base: 1 }} spacing={6}>
                  <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Box 
                      bg={cardBg} 
                      p={6} 
                      borderRadius="2xl" 
                      boxShadow="lg"
                      border="1px solid"
                      borderColor={borderColor}
                    >
                      <Flex justify="space-between" align="center" mb={6}>
                        <Box>
                          <Heading as="h3" size="md" color={headingColor}>
                            Ingresos vs Gastos
                          </Heading>
                          <Text fontSize="sm" color={subTextColor}>
                            Análisis financiero mensual
                          </Text>
                        </Box>
                        <HStack spacing={4}>
                          <HStack>
                            <Box w={3} h={3} borderRadius="full" bg="teal.500" />
                            <Text fontSize="sm">Ingresos</Text>
                          </HStack>
                          <HStack>
                            <Box w={3} h={3} borderRadius="full" bg="red.500" />
                            <Text fontSize="sm">Gastos</Text>
                          </HStack>
                        </HStack>
                      </Flex>
                      <RevenueChart showComparison={true} />
                    </Box>
                  </MotionBox>

                  <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
                    <MotionBox
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      <Box 
                        bg={cardBg} 
                        p={6} 
                        borderRadius="2xl" 
                        boxShadow="lg"
                        border="1px solid"
                        borderColor={borderColor}
                        textAlign="center"
                      >
                        <Text color={subTextColor} fontSize="sm" mb={2}>Ingreso Total Anual</Text>
                        <Text fontSize="3xl" fontWeight="bold" color="teal.500">
                          ${(dashboardData.revenuePerMonth.data.reduce((a, b) => a + b, 0) / 1000000).toFixed(2)}M
                        </Text>
                        <Badge colorScheme="green" mt={2}>+15.4% vs año anterior</Badge>
                      </Box>
                    </MotionBox>
                    
                    <MotionBox
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <Box 
                        bg={cardBg} 
                        p={6} 
                        borderRadius="2xl" 
                        boxShadow="lg"
                        border="1px solid"
                        borderColor={borderColor}
                        textAlign="center"
                      >
                        <Text color={subTextColor} fontSize="sm" mb={2}>Ticket Promedio</Text>
                        <Text fontSize="3xl" fontWeight="bold" color="blue.500">
                          ${dashboardData.stats.averageTicket.toLocaleString()}
                        </Text>
                        <Badge colorScheme="blue" mt={2}>Por tratamiento</Badge>
                      </Box>
                    </MotionBox>
                    
                    <MotionBox
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <Box 
                        bg={cardBg} 
                        p={6} 
                        borderRadius="2xl" 
                        boxShadow="lg"
                        border="1px solid"
                        borderColor={borderColor}
                        textAlign="center"
                      >
                        <Text color={subTextColor} fontSize="sm" mb={2}>Margen de Ganancia</Text>
                        <Text fontSize="3xl" fontWeight="bold" color="green.500">
                          48.2%
                        </Text>
                        <Badge colorScheme="green" mt={2}>+2.3% este trimestre</Badge>
                      </Box>
                    </MotionBox>
                  </SimpleGrid>
                </SimpleGrid>
              ) : (
                <Box 
                  bg={cardBg} 
                  p={8} 
                  borderRadius="2xl" 
                  boxShadow="lg"
                  border="1px solid"
                  borderColor={borderColor}
                  textAlign="center"
                >
                  <DollarSign size={48} color="gray" style={{ margin: '0 auto', marginBottom: 16 }} />
                  <Heading as="h3" size="md" color={headingColor} mb={2}>
                    Acceso Restringido
                  </Heading>
                  <Text color={subTextColor}>
                    Solo los administradores pueden ver la información financiera.
                  </Text>
                </Box>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </Box>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}