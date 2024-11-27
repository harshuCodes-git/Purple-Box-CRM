// Library Import
import React from "react";
import { cn } from "@/lib/utils";

// Components Import
import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/dashboard/Dashboard";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import Statistics from "@/components/dashboard/Statistics";
import MobileDashboard from "@/components/dashboard/MobileDashboard";
import axios from "axios";
import { Column, Task } from "@/lib/types";

const CRMDashboard = async () => {
  // const backendUrl = process.env.BACKEND_URL || "http://localhost:8000";
  const backendUrl = "http://localhost:8000";
  const customerSupport = await axios.get(backendUrl + "/customer-support", {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwZGIzYjJlYy02NWZkLTQ5ZjctOWY4ZS0yOWNhOTk5YTkyNzkiLCJlbWFpbCI6ImNvbXAxQGdtYWlsLmNvbSIsImlhdCI6MTczMjcyNTc3MywiZXhwIjoxNzMyODEyMTczfQ.jZQlkRHhFFOWSVSr2I-jE5nT00aP4sg5nZioQeLvSfg`,
    },
  });
  const customerAcquisition = await axios.get(
    backendUrl + "/customer-acquisition",
    {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwZGIzYjJlYy02NWZkLTQ5ZjctOWY4ZS0yOWNhOTk5YTkyNzkiLCJlbWFpbCI6ImNvbXAxQGdtYWlsLmNvbSIsImlhdCI6MTczMjcyNTc3MywiZXhwIjoxNzMyODEyMTczfQ.jZQlkRHhFFOWSVSr2I-jE5nT00aP4sg5nZioQeLvSfg`,
      },
    }
  );
  const other = await axios.get(backendUrl + "/other", {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwZGIzYjJlYy02NWZkLTQ5ZjctOWY4ZS0yOWNhOTk5YTkyNzkiLCJlbWFpbCI6ImNvbXAxQGdtYWlsLmNvbSIsImlhdCI6MTczMjcyNTc3MywiZXhwIjoxNzMyODEyMTczfQ.jZQlkRHhFFOWSVSr2I-jE5nT00aP4sg5nZioQeLvSfg`,
    },
  });

  // TODO: ADD ERROR HANDLING
  // - not found (data received is null)

  const parsedCustomerSupportData: Task[] = customerSupport.data.map(
    (task: any) => {
      return {
        id: task.id,
        title: task.category,
        social: task.platform ?? "WhatsApp",
        userName: task.customer.name,
        contactInfo: {
          email: task.customer.email,
          phone: task.customer.whatsapp_number,
        },
        interactionHistory: [],
        status: task.status,
        notes: task.note,
        urgency: task.urgency,
        subcategory: task.subcategory,
        timestamp: task.created_at,
      };
    }
  );
  const parsedCustomerAcquisitionData: Task[] = customerAcquisition.data.map(
    (task: any) => {
      return {
        id: task.id,
        title: task.category,
        social: task.platform ?? "WhatsApp",
        userName: task.customer.name,
        contactInfo: {
          email: task.customer.email,
          phone: task.customer.whatsapp_number,
        },
        interactionHistory: [],
        status: task.status,
        notes: task.note,
        urgency: task.urgency,
        subcategory: task.subcategory,
        timestamp: task.created_at,
      };
    }
  );
  const parsedOtherData: Task[] = other.data.map((task: any) => {
    return {
      id: task.id,
      title: task.category,
      social: task.platform ?? "WhatsApp",
      userName: task.customer.name,
      contactInfo: {
        email: task.customer.email,
        phone: task.customer.whatsapp_number,
      },
      interactionHistory: [],
      status: task.status,
      notes: task.note,
      urgency: task.urgency,
      subcategory: task.subcategory,
      timestamp: task.created_at,
    };
  });

  const data: Column[] = [
    {
      name: "Customer Support",
      icon: "Users",
      tasks: parsedCustomerSupportData ?? [],
    },
    {
      name: "Customer Acquisition",
      icon: "Handshake",
      tasks: parsedCustomerAcquisitionData ?? [],
    },
    {
      name: "Others",
      icon: "Box",
      tasks: parsedOtherData ?? [],
    },
  ];

  return (
    <div className="h-screen">
      <Sidebar />
      <div className="p-4 h-screen font-gotham">
        <div
          className={cn(
            "relative transition-all duration-500 w-auto h-full rounded-xl p-[1px] bg-gradient lg:ml-[325px]"
          )}
        >
          <div className="bg-[#0A0A0A] relative w-full h-full inset-0 rounded-xl flex flex-col items-center">
            {/* <DashboardHeader setColumn={setSelectedColumn} /> */}
            <Statistics />
            <div className="p-2 w-full h-full overflow-hidden">
              <Dashboard data={data} />
              {/* <MobileDashboard selectedColumn={selectedColumn} /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CRMDashboard;
