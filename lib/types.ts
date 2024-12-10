export enum SocialPlatform {
  WhatsApp = "whatsapp",
  Email = "email",
  FacebookMessenger = "messenger",
  Instagram = "instagram",
}

export type Task = {
  id: string;
  title: string;
  social: SocialPlatform;
  userName: string;
  contactInfo: {
    email: string;
    phone: string;
  };
  interactionHistory: string[];
  status: string;
  notes: string;
  urgency: string;
  category: string;
  subcategory: string;
  timestamp: string;
};

export type Column = {
  id: string;
  name: string;
  icon: string;
  tasks: Task[];
};
