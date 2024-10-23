import { Icon, LucideProps } from 'lucide-react'; 

export type Task = {
  id: string;
  title?: string;
  social?: React.FC<LucideProps>;
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
  icon?: React.FC<LucideProps>;
  tasks: Task[];
};