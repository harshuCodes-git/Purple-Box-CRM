'use client'

import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import Sidebar from '@/components/Sidebar'
import { Input } from '@/components/ui/input'
import { Bell } from 'lucide-react';
import Dashboard from '@/components/dashboard/Dashboard'

const CRMDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)

  return (
    <div className='h-screen'>
      <Sidebar 
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      <div className='p-4 h-screen font-gotham'>
        <div 
          className={cn(
            'relative transition-all duration-500 w-auto h-full rounded-xl p-[1px] ml-[70px] bg-gradient',
            isSidebarOpen && 'ml-[325px]'
          )}
        >
          <div className='bg-[#0A0A0A] relative w-full h-full inset-0 rounded-xl flex flex-col items-center'> 
            {/* Header */}
            <div className='#CB6CE6 pb-[1px] w-full bg-gradient rounded-t-xl'>
              <div className='w-full px-8 py-2 bg-[#0A0A0A] rounded-t-xl flex items-center justify-between'>
                <p className='text-md font-bold'>
                  <span className='bg-gradient-to-r text-transparent bg-clip-text from-[#571FC4] to-[#CB6CE6] '>
                    Your Customer
                  </span>
                </p>
                {/* <div className='flex gap-x-4 items-center'>
                  <Input 
                    className='rounded-md h-[25px] border-[1px] placeholder:text-xs placeholder:text-white/50 text-white min-w-[300px] focus:border-[#CB6CE6]'
                    placeholder='Search customer...'
                  />
                  <div className="hover:bg-white/10 hover:text-[#CB6CE6] transition-all p-2 rounded-full flex justify-between items-center cursor-pointer">
                    <Bell className='w-4 h-4 text-white hover:text-[#CB6CE6]'/>
                  </div>
                </div> */}
              </div>
            </div>
            {/* Statistics */}
            <div className='#CB6CE6 pb-[1px] w-full bg-gradient rounded-t-xl text-[14px]'>
              <div className='w-full px-8 pb-1 pt-2 bg-[#0A0A0A] rounded-t-xl flex items-center justify-between text-white font-agrandir'>
                <div>
                  Customer Acquisition Rate: <span className='text-status-green'>85%</span>
                </div>
                <div className='h-full py-3 w-[1px] bg-white/25' />
                <div>
                  Customer Retention Rate: <span className='text-status-orange'>70%</span>
                </div>
                <div className='h-full py-3 w-[1px] bg-white/25' />
                <div>
                  Churn Rate: <span className='text-status-red'>15%</span>
                </div>
                <div className='h-full py-3 w-[1px] bg-white/25' />
                <div>
                  Net Promoter Score (NPS): <span className='text-status-green'>8.5</span>
                </div>
                <div className='h-full py-3 w-[1px] bg-white/25' />
                <div>
                  Monthly Active Users: <span className='text-status-blue'>12,500</span>
                </div>
                <div className='h-full py-3 w-[1px] bg-white/25' />
                <div>
                  Average Revenue per User (ARPU): <span className='text-status-green'>$45.00</span>
                </div>
              </div>
            </div>
            {/* Customer Relationship Manager */}
            <div className='p-4 w-full h-full overflow-hidden'>
              <Dashboard />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CRMDashboard