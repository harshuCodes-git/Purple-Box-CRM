'use client'

import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import Sidebar from '@/components/Sidebar'

const CRMDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true)

  return (
    <>
      <Sidebar 
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      <div className='p-4 h-screen'>
        <div className={cn(
          'transition-all w-auto h-full rounded-xl p-4 ml-[70px] bg-[#0F1011]/25',
          isSidebarOpen && 'ml-[325px]'
        )}>

        </div>
      </div>
    </>
  )
}

export default CRMDashboard