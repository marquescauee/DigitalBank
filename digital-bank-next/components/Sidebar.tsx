'use client'

import { sidebarLinks } from '@/constants'
import { useAuth } from '@/contexts/AuthContext'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import Footer from './Footer'

const Sidebar = () => {
  const { user } = useAuth()

  const pathname = usePathname()

  if (!user) return <></>

  return (
    <section className="sidebar">
      <nav className="flex flex-col gap-4">
        <Link
          href={'/dashboard'}
          className="flex mb-12 cursor-pointer items-center gap-2"
        >
          <Image
            src={'/icons/logo.svg'}
            alt="Bank Logo"
            width={34}
            height={34}
            className="size-[24px] max-xl:size-14"
          />
          <h1 className="sidebar-logo">Digital Bank</h1>
        </Link>
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.route

          return (
            <Link
              href={link.route}
              key={link.label}
              className={cn('sidebar-link', {
                'bg-bankGradient': isActive,
              })}
            >
              <div className="relative size-6">
                <Image
                  src={link.imgURL}
                  alt={link.label}
                  fill
                  className={cn({ 'brightness-[3] invert-0': isActive })}
                />
              </div>
              <p
                className={cn('sidebar-label', {
                  '!text-white': isActive,
                })}
              >
                {link.label}
              </p>
            </Link>
          )
        })}
        USER
      </nav>
      <Footer user={user} type="desktop" />
    </section>
  )
}

export default Sidebar
