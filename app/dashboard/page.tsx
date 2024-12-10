"use client";

// Library Import
import React, { useState } from "react";
import { cn } from "@/lib/utils";

// Components Import
import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/dashboard/Dashboard";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import Statistics from "@/components/dashboard/Statistics";
import MobileDashboard from "@/components/dashboard/MobileDashboard";

const CRMDashboard = () => {
  const [selectedColumn, setSelectedColumn] = useState<
    "Customer Support" | "Customer Acquisition" | "Others" | null
  >("Customer Support");

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
            <DashboardHeader setColumn={setSelectedColumn} />
            <Statistics />
            <div className="p-2 w-full h-full overflow-hidden">
              <Dashboard />
              {/* <MobileDashboard selectedColumn={selectedColumn} /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CRMDashboard;
