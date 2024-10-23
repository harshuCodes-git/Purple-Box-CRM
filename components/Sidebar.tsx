'use client'

import { cn } from "@/lib/utils";
import { ChevronsRight } from 'lucide-react';

type sidebarProps = {
  isOpen: boolean;
  setIsOpen: (param: boolean) => void;
}

const Sidebar = ({ isOpen, setIsOpen } : sidebarProps ) => {
  return (
    <div className={cn(
      'absolute w-[320px] left-0 h-screen bg-primary-dark transition-all duration-500 z-20 flex flex-col p-4 border-r-2 border-primary-purple/50',
      isOpen ? 'translate-x-[0] border-r-2 border-primary-purple/100' : 'translate-x-[-250px]'
    )}>

      {/* Header */}
      <div className="flex items-center w-full justify-between">
        <div className="pl-2 justify-between flex items-center gap-x-4">
          <div className="bg-gradient-to-br from-primary-purple to-primary-pink text-white py-1 px-3 rounded-lg font-bold">
              P
          </div>
          <p className="font-gotham text-white text-[18px]">
            Purple Box
          </p>
        </div>
        <div onClick={() => setIsOpen(!isOpen)} className="hover:bg-white/10 transition-all p-2 rounded-full flex justify-between items-center">
          <ChevronsRight className={cn(
            "text-white transition-all duration-500 cursor-pointer",
            isOpen && 'rotate-180'
          )} />
        </div>
      </div>

      {/* Sidebar Content */}
      <div>

      </div>
    </div>
  )
}

export default Sidebar