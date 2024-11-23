"use client"

import React from 'react'

// Components Import
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

const Statistics = () => {
  return (
    <div className='pb-[1px] w-full bg-gradient rounded-t-xl'>
      <div className='hidden w-full px-4 pb-1 pt-2 bg-[#0A0A0A] rounded-t-xl lg:flex items-center justify-between text-white font-agrandir'>
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

      <ScrollArea className='w-100'>
        <div className='lg:hidden w-max space-x-4 px-4 pb-1 pt-2 bg-[#0A0A0A] flex flex-row items-center justify-between text-white font-agrandir'>
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
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}

export default Statistics