'use client'

import { useAuth } from '@/contexts/AuthContext'
import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const HeaderBoxTitle = () => {
  const { user } = useAuth()

  return (
    <div className="header-box-title">
      {user ? (
        <>
          <span>Welcome, </span>
          <span className="text-bankGradient">{user?.firstName}!</span>
        </>
      ) : (
        <Skeleton className="w-[250px] h-[23px] md:w-[400px] mb-3 rounded-full bg-gray-200" />
      )}
    </div>
  )
}

export default HeaderBoxTitle
