export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  treatmentInterest: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface DashboardData {
  registeredPatients: {
    month: string;
    count: number;
  }[];
  treatmentRequests: {
    treatment: string;
    percentage: number;
  }[];
  acquisitionChannels: {
    channel: string;
    percentage: number;
  }[];
}