import React from 'react'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Purple Box | AI-Powered CRM for E-commerce",
  description: "Purple Box is an AI-powered CRM designed to centralize and streamline e-commerce operations. Our platform addresses the critical needs of modern online businesses, from customer support to client acquisition, offering seamless integration across multiple channels.",
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://purple-box-crm.vercel.app',
    title: 'Purple Box | AI-Powered CRM for E-commerce',
    description: 'Discover Purple Box, an AI-driven CRM crafted for e-commerce, focusing on customer engagement, client acquisition, and multi-channel integration for efficient business management.',
    siteName: 'Purple Box CRM',
  },
};

const DashboardLayout = ({ 
  children 
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>{children}</div>
  )
}

export default DashboardLayout