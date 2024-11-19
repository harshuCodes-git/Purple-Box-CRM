export enum SocialPlatform {
  WhatsApp = "WhatsApp",
  Email = "Email",
  FacebookMessenger = "Facebook Messenger",
  Instagram = "Instagram",
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
  subcategory: string;
  timestamp: string;
};

export type Column = {
  name: string;
  icon: string;
  tasks: Task[];
};
