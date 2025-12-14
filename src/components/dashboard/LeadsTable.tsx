'use client';

import React, { useState } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  HStack,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Button,
  IconButton,
  useColorModeValue,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tooltip,
  useToast,
  Avatar,
} from '@chakra-ui/react';
import { 
  Search, 
  Filter, 
  Download, 
  MoreVertical, 
  Phone, 
  Mail, 
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  UserPlus
} from 'lucide-react';
import { dashboardData, Lead } from '../../data/dashboardData';

const statusConfig: Record<string, { color: string; label: string; icon: React.ReactNode }> = {
  nuevo: { color: 'blue', label: 'Nuevo', icon: <UserPlus size={14} /> },
  contactado: { color: 'yellow', label: 'Contactado', icon: <Clock size={14} /> },
  convertido: { color: 'green', label: 'Convertido', icon: <CheckCircle size={14} /> },
  no_interesado: { color: 'red', label: 'No interesado', icon: <XCircle size={14} /> },
};

const sourceColors: Record<string, string> = {
  Web: 'teal',
  Instagram: 'pink',
  Referido: 'purple',
};

const LeadsTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  
  const toast = useToast();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.400');

  // Filtrar leads
  const filteredLeads = dashboardData.leads.filter((lead) => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.treatment.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    const matchesSource = sourceFilter === 'all' || lead.source === sourceFilter;
    
    return matchesSearch && matchesStatus && matchesSource;
  });

  const exportToCSV = () => {
    const headers = ['Nombre', 'Email', 'Teléfono', 'Tratamiento', 'Origen', 'Estado', 'Fecha', 'Notas'];
    const csvContent = [
      headers.join(','),
      ...filteredLeads.map(lead => 
        [lead.name, lead.email, lead.phone, lead.treatment, lead.source, lead.status, lead.date, `"${lead.notes}"`].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `leads_dermaplus_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();

    toast({
      title: 'Exportación exitosa',
      description: `Se exportaron ${filteredLeads.length} leads`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleStatusChange = (leadId: number, newStatus: string) => {
    toast({
      title: 'Estado actualizado',
      description: `El lead ha sido marcado como "${statusConfig[newStatus]?.label}"`,
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Box>
      {/* Filtros y búsqueda */}
      <Flex 
        direction={{ base: 'column', md: 'row' }} 
        gap={4} 
        mb={6}
        align={{ base: 'stretch', md: 'center' }}
        justify="space-between"
      >
        <HStack spacing={4} flex={1}>
          <InputGroup maxW={{ base: 'full', md: '300px' }}>
            <InputLeftElement pointerEvents="none">
              <Search size={18} color="gray" />
            </InputLeftElement>
            <Input
              placeholder="Buscar por nombre, email o tratamiento..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              borderRadius="lg"
            />
          </InputGroup>
          
          <Select
            maxW="150px"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            borderRadius="lg"
            display={{ base: 'none', md: 'block' }}
          >
            <option value="all">Todos</option>
            <option value="nuevo">Nuevos</option>
            <option value="contactado">Contactados</option>
            <option value="convertido">Convertidos</option>
            <option value="no_interesado">No interesados</option>
          </Select>

          <Select
            maxW="150px"
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            borderRadius="lg"
            display={{ base: 'none', md: 'block' }}
          >
            <option value="all">Todos</option>
            <option value="Web">Web</option>
            <option value="Instagram">Instagram</option>
            <option value="Referido">Referido</option>
          </Select>
        </HStack>

        <Button
          leftIcon={<Download size={18} />}
          colorScheme="teal"
          variant="outline"
          onClick={exportToCSV}
          borderRadius="lg"
        >
          Exportar CSV
        </Button>
      </Flex>

      {/* Tabla de leads */}
      <Box 
        overflowX="auto" 
        border="1px solid" 
        borderColor={borderColor} 
        borderRadius="xl"
      >
        <Table variant="simple">
          <Thead bg={useColorModeValue('gray.50', 'gray.900')}>
            <Tr>
              <Th>Lead</Th>
              <Th>Tratamiento</Th>
              <Th>Origen</Th>
              <Th>Estado</Th>
              <Th>Fecha</Th>
              <Th>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredLeads.map((lead) => (
              <Tr 
                key={lead.id} 
                _hover={{ bg: hoverBg }}
                transition="background 0.2s"
              >
                <Td>
                  <HStack spacing={3}>
                    <Avatar 
                      name={lead.name} 
                      size="sm" 
                      bg="teal.500"
                      color="white"
                    />
                    <Box>
                      <Text fontWeight="medium">{lead.name}</Text>
                      <Text fontSize="sm" color={textColor}>{lead.email}</Text>
                    </Box>
                  </HStack>
                </Td>
                <Td>
                  <Text>{lead.treatment}</Text>
                  <Text fontSize="xs" color={textColor}>{lead.notes}</Text>
                </Td>
                <Td>
                  <Badge 
                    colorScheme={sourceColors[lead.source] || 'gray'} 
                    borderRadius="full"
                    px={3}
                    py={1}
                  >
                    {lead.source}
                  </Badge>
                </Td>
                <Td>
                  <Badge
                    colorScheme={statusConfig[lead.status]?.color || 'gray'}
                    borderRadius="full"
                    px={3}
                    py={1}
                    display="flex"
                    alignItems="center"
                    gap={1}
                    w="fit-content"
                  >
                    {statusConfig[lead.status]?.icon}
                    {statusConfig[lead.status]?.label}
                  </Badge>
                </Td>
                <Td>
                  <Text fontSize="sm">{new Date(lead.date).toLocaleDateString('es-MX')}</Text>
                </Td>
                <Td>
                  <HStack spacing={1}>
                    <Tooltip label="Llamar">
                      <IconButton
                        aria-label="Llamar"
                        icon={<Phone size={16} />}
                        size="sm"
                        variant="ghost"
                        colorScheme="green"
                        onClick={() => window.open(`tel:${lead.phone.replace(/\s/g, '')}`)}
                      />
                    </Tooltip>
                    <Tooltip label="Enviar email">
                      <IconButton
                        aria-label="Email"
                        icon={<Mail size={16} />}
                        size="sm"
                        variant="ghost"
                        colorScheme="blue"
                        onClick={() => window.open(`mailto:${lead.email}`)}
                      />
                    </Tooltip>
                    <Menu>
                      <MenuButton
                        as={IconButton}
                        aria-label="Más opciones"
                        icon={<MoreVertical size={16} />}
                        size="sm"
                        variant="ghost"
                      />
                      <MenuList>
                        <MenuItem icon={<Eye size={16} />}>Ver detalles</MenuItem>
                        <MenuItem 
                          icon={<CheckCircle size={16} />}
                          onClick={() => handleStatusChange(lead.id, 'convertido')}
                        >
                          Marcar como convertido
                        </MenuItem>
                        <MenuItem 
                          icon={<Clock size={16} />}
                          onClick={() => handleStatusChange(lead.id, 'contactado')}
                        >
                          Marcar como contactado
                        </MenuItem>
                        <MenuItem 
                          icon={<XCircle size={16} />}
                          color="red.500"
                          onClick={() => handleStatusChange(lead.id, 'no_interesado')}
                        >
                          Marcar como no interesado
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* Resumen */}
      <Flex justify="space-between" align="center" mt={4} px={2}>
        <Text fontSize="sm" color={textColor}>
          Mostrando {filteredLeads.length} de {dashboardData.leads.length} leads
        </Text>
        <HStack spacing={4}>
          <HStack>
            <Box w={2} h={2} borderRadius="full" bg="blue.500" />
            <Text fontSize="sm" color={textColor}>
              Nuevos: {dashboardData.leads.filter(l => l.status === 'nuevo').length}
            </Text>
          </HStack>
          <HStack>
            <Box w={2} h={2} borderRadius="full" bg="green.500" />
            <Text fontSize="sm" color={textColor}>
              Convertidos: {dashboardData.leads.filter(l => l.status === 'convertido').length}
            </Text>
          </HStack>
        </HStack>
      </Flex>
    </Box>
  );
};

export default LeadsTable;
