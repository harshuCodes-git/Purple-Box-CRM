import { FaWhatsapp, FaEnvelope, FaFacebookMessenger, FaInstagram } from 'react-icons/fa';
import { Users, Handshake, Box } from 'lucide-react';
import { Column } from '@/lib/types';

export const columnsData: Record<string, Column> = {
  column1: {
    name: "Customer Support",
    icon: Users,
    tasks: [
      { id: '11', title: "Placeholder (Do not move)", subcategory: "Info", timestamp: "2024-10-31T08:30:00Z" },
      {
        id: '1',
        userName: "John Doe",
        social: FaWhatsapp, // WhatsApp icon
        contactInfo: { email: "john.doe@example.com", phone: "123-456-7890" },
        interactionHistory: [
          "Initial contact", 
          "Follow-up call", 
          "Issue escalation", 
          "Provided troubleshooting steps", 
          "Resolved and closed case", 
          "Follow-up survey sent", 
          "Customer provided feedback"
        ],
        status: "Closed",
        notes: "Not happy with product X",
        urgency: "High",
        subcategory: "Complaint",
        timestamp: "2024-10-29T10:15:00Z"
      },
      {
        id: '12',
        userName: "Alice Brown",
        social: FaEnvelope, // Email icon
        contactInfo: { email: "alice.brown@example.com", phone: "234-567-8901" },
        interactionHistory: ["Complaint received"],
        status: "Open",
        notes: "Issue with product delivery",
        urgency: "High",
        subcategory: "Delivery Issue",
        timestamp: "2024-10-30T09:00:00Z"
      },
      {
        id: '13',
        userName: "Charlie Green",
        social: FaFacebookMessenger, // Facebook Messenger icon
        contactInfo: { email: "charlie.green@example.com", phone: "345-678-9012" },
        interactionHistory: ["Billing question"],
        status: "Closed",
        notes: "Resolved billing issue",
        urgency: "Low",
        subcategory: "Billing",
        timestamp: "2024-10-25T14:30:00Z"
      },
    ],
  },
  column2: {
    name: "Customer Acquisition",
    icon: Handshake,
    tasks: [
      { id: '20', title: "Placeholder (Do not move)", subcategory: "Info", timestamp: "2024-10-31T11:00:00Z" },
      {
        id: '2',
        userName: "Jane Smith",
        social: FaEnvelope, // Email icon
        contactInfo: { email: "jane.smith@example.com", phone: "987-654-3210" },
        interactionHistory: [
          "Initial meeting",
          "Presentation on product benefits",
          "Discussed competitor comparisons",
          "Provided detailed pricing information",
          "Follow-up email",
          "Scheduled second meeting",
          "Explained contract terms"
        ],
        status: "Closed",
        notes: "Prefers competitor's product",
        urgency: "Low",
        subcategory: "Competitor",
        timestamp: "2024-10-27T16:00:00Z"
      },
      {
        id: '21',
        userName: "Liam Davis",
        social: FaWhatsapp, // WhatsApp icon
        contactInfo: { email: "liam.davis@example.com", phone: "456-789-0123" },
        interactionHistory: ["Introductory call", "Follow-up email"],
        status: "Active",
        notes: "Interested in demo",
        urgency: "Medium",
        subcategory: "Prospect",
        timestamp: "2024-10-29T12:45:00Z"
      },
      {
        id: '22',
        userName: "Emily White",
        social: FaInstagram, // Instagram icon
        contactInfo: { email: "emily.white@example.com", phone: "567-890-1234" },
        interactionHistory: ["Initial interest form"],
        status: "Open",
        notes: "Awaiting product details",
        urgency: "High",
        subcategory: "Potential Lead",
        timestamp: "2024-10-28T13:30:00Z"
      },
    ],
  },
  column3: {
    name: "Other",
    icon: Box,
    tasks: [
      { id: '30', title: "Placeholder (Do not move)", subcategory: "Info", timestamp: "2024-10-31T14:45:00Z" },
      {
        id: '3',
        userName: "Michael Johnson",
        social: FaFacebookMessenger, // Facebook Messenger icon
        contactInfo: { email: "michael.johnson@example.com", phone: "555-123-4567" },
        interactionHistory: [
          "Demo session",
          "Received product samples",
          "Gave positive feedback",
          "Discussed further customizations",
          "Scheduled next meeting",
          "Tested new features",
          "Confirmed interest in partnership"
        ],
        status: "Active",
        notes: "Scheduled follow-up",
        urgency: "Mid",
        subcategory: "Demo",
        timestamp: "2024-10-30T10:00:00Z"
      },
      {
        id: '31',
        userName: "Sarah Lee",
        social: FaWhatsapp, // WhatsApp icon
        contactInfo: { email: "sarah.lee@example.com", phone: "678-901-2345" },
        interactionHistory: ["Inquiry about warranty"],
        status: "Closed",
        notes: "Warranty information provided",
        urgency: "Low",
        subcategory: "Support Inquiry",
        timestamp: "2024-10-26T09:15:00Z"
      },
      {
        id: '32',
        userName: "David Miller",
        social: FaInstagram, // Instagram icon
        contactInfo: { email: "david.miller@example.com", phone: "789-012-3456" },
        interactionHistory: ["General feedback"],
        status: "Open",
        notes: "Likes product, suggested improvements",
        urgency: "Low",
        subcategory: "Feedback",
        timestamp: "2024-10-25T08:45:00Z"
      },
    ],
  },
};
