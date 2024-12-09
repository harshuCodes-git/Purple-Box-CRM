import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Purple Box | AI-Powered CRM for E-commerce",
  description:
    "Purple Box is an AI-powered CRM designed to centralize and streamline e-commerce operations. Our platform addresses the critical needs of modern online businesses, from customer support to client acquisition, offering seamless integration across multiple channels.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://purple-box-crm.vercel.app",
    title: "Purple Box | AI-Powered CRM for E-commerce",
    description:
      "Discover Purple Box, an AI-driven CRM crafted for e-commerce, focusing on customer engagement, client acquisition, and multi-channel integration for efficient business management.",
    siteName: "Purple Box CRM",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="relative bg-primary-dark font-gotham antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
