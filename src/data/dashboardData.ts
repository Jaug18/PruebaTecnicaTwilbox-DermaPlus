// Datos extendidos para el dashboard avanzado de DermaPlus
// Todos los datos son mock/simulados para demostración

export const dashboardData = {
  // Pacientes registrados por mes (Enero - Diciembre)
  patientsPerMonth: {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    data: [95, 140, 210, 260, 330, 380, 420, 450, 510, 580, 640, 720],
    lastYearData: [75, 110, 160, 200, 250, 290, 320, 350, 400, 450, 500, 560],
  },
  
  // Tratamientos más solicitados (porcentajes)
  treatmentsRequested: [
    { name: 'Limpieza facial', value: 40, percentage: '40%', color: '#319795' },
    { name: 'Botox', value: 25, percentage: '25%', color: '#3182CE' },
    { name: 'Depilación láser', value: 20, percentage: '20%', color: '#805AD5' },
    { name: 'Tratamientos corporales', value: 15, percentage: '15%', color: '#DD6B20' },
  ],
  
  // Canales de captación (porcentajes)
  channelsAcquisition: [
    { name: 'Web', value: 50, percentage: '50%', color: '#319795' },
    { name: 'Instagram Ads', value: 30, percentage: '30%', color: '#E53E8E' },
    { name: 'Referidos', value: 20, percentage: '20%', color: '#38A169' },
  ],
  
  // Estadísticas generales
  stats: {
    totalPatients: 1035,
    treatmentsPerformed: 847,
    conversionRate: 24.3,
    webVisits: 12847,
    monthlyRevenue: 485000,
    averageTicket: 2850,
    satisfactionRate: 98.5,
    pendingAppointments: 23,
  },

  // Ingresos mensuales (MXN)
  revenuePerMonth: {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    data: [280000, 320000, 385000, 420000, 450000, 480000, 465000, 490000, 520000, 485000, 510000, 560000],
    expenses: [180000, 195000, 210000, 225000, 230000, 245000, 240000, 250000, 260000, 255000, 265000, 280000],
  },

  // Leads/Prospectos
  leads: [
    { 
      id: 1, 
      name: 'María González', 
      email: 'maria.gonzalez@email.com', 
      phone: '55 1234 5678',
      treatment: 'Limpieza facial',
      source: 'Web',
      status: 'nuevo',
      date: '2025-06-14',
      notes: 'Interesada en paquete completo'
    },
    { 
      id: 2, 
      name: 'Carlos Ramírez', 
      email: 'carlos.ramirez@email.com', 
      phone: '55 2345 6789',
      treatment: 'Botox',
      source: 'Instagram',
      status: 'contactado',
      date: '2025-06-13',
      notes: 'Agendar cita para valoración'
    },
    { 
      id: 3, 
      name: 'Ana Martínez', 
      email: 'ana.martinez@email.com', 
      phone: '55 3456 7890',
      treatment: 'Depilación láser',
      source: 'Referido',
      status: 'convertido',
      date: '2025-06-12',
      notes: 'Paquete de 6 sesiones'
    },
    { 
      id: 4, 
      name: 'Roberto Sánchez', 
      email: 'roberto.sanchez@email.com', 
      phone: '55 4567 8901',
      treatment: 'Tratamiento corporal',
      source: 'Web',
      status: 'nuevo',
      date: '2025-06-14',
      notes: 'Consulta sobre precios'
    },
    { 
      id: 5, 
      name: 'Laura Díaz', 
      email: 'laura.diaz@email.com', 
      phone: '55 5678 9012',
      treatment: 'Limpieza facial',
      source: 'Instagram',
      status: 'no_interesado',
      date: '2025-06-11',
      notes: 'Muy caro para su presupuesto'
    },
    { 
      id: 6, 
      name: 'Pedro López', 
      email: 'pedro.lopez@email.com', 
      phone: '55 6789 0123',
      treatment: 'Botox',
      source: 'Web',
      status: 'contactado',
      date: '2025-06-13',
      notes: 'Requiere información adicional'
    },
    { 
      id: 7, 
      name: 'Isabel Torres', 
      email: 'isabel.torres@email.com', 
      phone: '55 7890 1234',
      treatment: 'Depilación láser',
      source: 'Referido',
      status: 'nuevo',
      date: '2025-06-14',
      notes: 'Referida por Ana Martínez'
    },
    { 
      id: 8, 
      name: 'Fernando Castro', 
      email: 'fernando.castro@email.com', 
      phone: '55 8901 2345',
      treatment: 'Limpieza facial',
      source: 'Instagram',
      status: 'convertido',
      date: '2025-06-10',
      notes: 'Primera cita completada'
    },
  ],

  // Citas programadas
  appointments: [
    {
      id: 1,
      patientName: 'María González',
      treatment: 'Limpieza facial profunda',
      date: '2025-06-15',
      time: '10:00',
      doctor: 'Dra. María García',
      status: 'confirmada',
      duration: 60,
    },
    {
      id: 2,
      patientName: 'Carlos Ramírez',
      treatment: 'Valoración Botox',
      date: '2025-06-15',
      time: '11:30',
      doctor: 'Dra. María García',
      status: 'pendiente',
      duration: 30,
    },
    {
      id: 3,
      patientName: 'Ana Martínez',
      treatment: 'Depilación láser - Sesión 2',
      date: '2025-06-15',
      time: '13:00',
      doctor: 'Dr. Juan Pérez',
      status: 'confirmada',
      duration: 45,
    },
    {
      id: 4,
      patientName: 'Roberto Sánchez',
      treatment: 'Consulta inicial',
      date: '2025-06-16',
      time: '09:00',
      doctor: 'Dra. María García',
      status: 'pendiente',
      duration: 30,
    },
    {
      id: 5,
      patientName: 'Laura Díaz',
      treatment: 'Peeling químico',
      date: '2025-06-16',
      time: '10:30',
      doctor: 'Dr. Juan Pérez',
      status: 'confirmada',
      duration: 60,
    },
    {
      id: 6,
      patientName: 'Pedro López',
      treatment: 'Aplicación Botox',
      date: '2025-06-17',
      time: '12:00',
      doctor: 'Dra. María García',
      status: 'pendiente',
      duration: 45,
    },
    {
      id: 7,
      patientName: 'Isabel Torres',
      treatment: 'Depilación láser - Sesión 1',
      date: '2025-06-17',
      time: '14:00',
      doctor: 'Dr. Juan Pérez',
      status: 'confirmada',
      duration: 45,
    },
    {
      id: 8,
      patientName: 'Fernando Castro',
      treatment: 'Seguimiento tratamiento',
      date: '2025-06-18',
      time: '11:00',
      doctor: 'Dra. María García',
      status: 'pendiente',
      duration: 30,
    },
  ],

  // Notificaciones
  notifications: [
    {
      id: 1,
      type: 'lead' as const,
      title: 'Nuevo lead registrado',
      message: 'María González solicitó información sobre Limpieza facial',
      date: '2025-06-14T10:30:00',
      read: false,
    },
    {
      id: 2,
      type: 'appointment' as const,
      title: 'Cita confirmada',
      message: 'Ana Martínez confirmó su cita para mañana a las 13:00',
      date: '2025-06-14T09:15:00',
      read: false,
    },
    {
      id: 3,
      type: 'alert' as const,
      title: 'Stock bajo',
      message: 'El producto "Crema hidratante premium" está por agotarse',
      date: '2025-06-14T08:00:00',
      read: true,
    },
    {
      id: 4,
      type: 'success' as const,
      title: 'Meta alcanzada',
      message: '¡Felicidades! Se alcanzó la meta de 500 pacientes del mes',
      date: '2025-06-13T18:00:00',
      read: true,
    },
    {
      id: 5,
      type: 'lead' as const,
      title: 'Lead de alta prioridad',
      message: 'Roberto Sánchez interesado en paquete premium',
      date: '2025-06-13T14:20:00',
      read: false,
    },
  ],

  // KPIs comparativos
  kpis: {
    newLeadsThisWeek: 12,
    newLeadsLastWeek: 8,
    appointmentsThisWeek: 28,
    appointmentsLastWeek: 24,
    revenueThisMonth: 485000,
    revenueLastMonth: 420000,
    conversionThisMonth: 24.3,
    conversionLastMonth: 21.8,
  },
};

// Tipos para TypeScript
export interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  treatment: string;
  source: string;
  status: 'nuevo' | 'contactado' | 'convertido' | 'no_interesado';
  date: string;
  notes: string;
}

export interface Appointment {
  id: number;
  patientName: string;
  treatment: string;
  date: string;
  time: string;
  doctor: string;
  status: 'confirmada' | 'pendiente' | 'cancelada';
  duration: number;
}

export interface Notification {
  id: number;
  type: 'lead' | 'appointment' | 'alert' | 'success';
  title: string;
  message: string;
  date: string;
  read: boolean;
}