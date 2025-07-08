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
