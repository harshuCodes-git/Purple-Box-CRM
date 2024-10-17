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
      'absolute w-[320px] left-0 h-screen bg-primary-dark transition-all duration-500 z-20 flex flex-col items-end p-4 border-r-2 border-white/5',
      isOpen ? 'translate-x-[0] border-none' : 'translate-x-[-250px]'
    )}>
      <div onClick={() => setIsOpen(!isOpen)} className="hover:bg-white/10 transition-all p-2 rounded-full">
        <ChevronsRight className={cn(
          "text-white transition-all duration-500 cursor-pointer ",
          isOpen && 'rotate-180'
        )} />
      </div>
      <div>

      </div>
    </div>
  )
}

export default Sidebar