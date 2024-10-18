export type Task = {
  id: string;
  title?: string;
  userName?: string;
  contactInfo?: {
    email: string;
    phone: string;
  };
  interactionHistory?: string[];
  status?: string;
  notes?: string;
};

export type Column = {
  name: string;
  tasks: Task[];
};