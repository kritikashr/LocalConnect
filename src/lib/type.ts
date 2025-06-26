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
