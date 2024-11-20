// Library Import
import React from 'react'
import { cn } from '@/lib/utils'

// Components Import
import Sidebar from '@/components/Sidebar'
import Dashboard from '@/components/dashboard/Dashboard'

// Icons Import
import { Bell } from 'lucide-react';

const CRMDashboard = () => {
  return (
    <div className='h-screen'>
      {/* Sidebar */}
      <Sidebar  />
      <div className='p-4 h-screen font-gotham'>
        <div 
          className={cn(
            'relative transition-all duration-500 w-auto h-full rounded-xl p-[1px] bg-gradient ml-[325px]'
          )}
        >
          <div className='bg-[#0A0A0A] relative w-full h-full inset-0 rounded-xl flex flex-col items-center'> 
            {/* Header */}
            <div className='#CB6CE6 pb-[1px] w-full bg-gradient rounded-t-xl'>
              <div className='w-full px-4 py-2 bg-[#0A0A0A] rounded-t-xl flex items-center justify-between'>
                <p className='text-md font-bold'>
                  <span className='bg-gradient-to-r text-transparent bg-clip-text from-[#571FC4] to-[#CB6CE6] '>
                    Your Customer
                  </span>
                </p>
              </div>
            </div>
            
            {/* Statistics */}
            <div className='pb-[1px] w-full bg-gradient rounded-t-xl'>
              <div className='w-full px-4 pb-1 pt-2 bg-[#0A0A0A] rounded-t-xl flex items-center justify-between text-white font-agrandir'>
                <p className='text-xs'>
                  Customer Acquisition Rate: <span className='text-status-green'>85%</span>
                </p>
                <div className='h-full py-3 w-[1px] bg-white/25' />
                <p className='text-xs'>
                  Customer Retention Rate: <span className='text-status-orange'>70%</span>
                </p>
                <div className='h-full py-3 w-[1px] bg-white/25' />
                <p className='text-xs'>
                  Churn Rate: <span className='text-status-red'>15%</span>
                </p>
                <div className='h-full py-3 w-[1px] bg-white/25' />
                <p className='text-xs'>
                  Net Promoter Score (NPS): <span className='text-status-green'>8.5</span>
                </p>
                <div className='h-full py-3 w-[1px] bg-white/25' />
                <p className='text-xs'>
                  Monthly Active Users: <span className='text-status-blue'>12,500</span>
                </p>
                <div className='h-full py-3 w-[1px] bg-white/25' />
                <p className='text-xs'>
                  Average Revenue per User (ARPU): <span className='text-status-green'>$45.00</span>
                </p>
              </div>
            </div>

            {/* CRM Dashboard */}
            <div className='p-2 w-full h-full overflow-hidden'>
              <Dashboard />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CRMDashboard