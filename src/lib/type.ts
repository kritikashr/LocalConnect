export interface Notice {
  id: number;
  title: string;
  description: string;
  location: string;
  contact: string;
  date: string;
}

export interface DeleteButtonProps {
  id: number;
  onDeleted: () => void;
}

export interface LoginResponse {
  token: string;
  role: string;
  id: string;
  name: string;
  email: string;
  ok: boolean;
  text: any;
}

export interface ServiceRequest {
  id: number;
  title: string;
  description: string;
  status: string;
  createdAt: string | null;
  completedAt: string | null;
  citizenName: string;
  categoryName: string;
}

export interface Complaint {
  id: number;
  title: string;
  description: string;
  status: string;
  createdAt: string | null;
  completedAt: string | null;
  citizenName: string;
  category: string;
  priority: string;
  location: string;
}

export interface Provider{
  id: number;
  name: string;
  email: string;
  category: string;
  description: string;
  experienceYear: number;
  userId: number;
  rating: number;
  phoneNumber: string;
  photoUrl?: string;
}
