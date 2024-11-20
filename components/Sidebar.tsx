'use client'

import { cn } from "@/lib/utils";
// import { ChevronsRight } from 'lucide-react';
import PurpleLogo from '@/assets/Purple-Box Rebrand.png'
import Image from "next/image";


const Sidebar = () => {
  return (
    <div className={cn(
      'absolute w-[320px] left-0 h-screen bg-primary-dark transition-all duration-500 z-20 flex flex-col p-4 translate-x-[0] border-r-2 border-primary-purple/100' 
    )}>

      {/* Header */}
      <div className="flex items-center w-full justify-between">
        <div className="pl-2 justify-between flex items-center gap-x-4">
          <Image 
            src={PurpleLogo}
            alt="Purple Box Logo"
            className="w-8 h-8"
          />
          <p className="font-gotham text-white text-[18px]">
            Purple Box
          </p>
        </div>
        {/* <div className="hover:bg-white/10 transition-all p-2 rounded-full flex justify-between items-center">
          <ChevronsRight className='text-white transition-all duration-500 cursor-pointer' />
        </div> */}
      </div>

      {/* Sidebar Content */}
      <div>

      </div>
    </div>
  )
}

export default Sidebar