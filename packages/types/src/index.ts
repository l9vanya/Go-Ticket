export type UserRole = 'passenger' | 'driver' | null;

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profilePicture?: string | null;
  vehicleNumber?: string | null;
  createdAt?: string;
}

export interface Ticket {
  id: string;
  source: string;
  destination: string;
  type: string;
  price: number;
  date: string;
  userId?: string;
  status?: string;
}
