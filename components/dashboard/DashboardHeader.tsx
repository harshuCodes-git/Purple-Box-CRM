"use client";

// Library Import
import React from "react";
import ColumnSelect from "./ColumnSelect";

const DashboardHeader = ({
  setColumn,
}: {
  setColumn: (column: "Customer Support" | "Customer Acquisition" | "Others") => void;
}) => {
  return (
    <div className="#CB6CE6 pb-[1px] w-full bg-gradient rounded-t-xl">
      <div className="w-full px-4 py-2 bg-[#0A0A0A] rounded-t-xl flex items-center justify-between">
        <p className="text-md font-bold">
          <span className="bg-gradient-to-r text-transparent bg-clip-text from-[#571FC4] to-[#CB6CE6] ">
            Your Customer
          </span>
        </p>
        <div className="lg:hidden">
          <ColumnSelect setColumn={setColumn} />
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
