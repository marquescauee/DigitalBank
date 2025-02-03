import { logout } from '@/routes/auth'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'

type FooterProps = {
  user: User
  type: 'mobile' | 'desktop'
}

const Footer = ({ user, type = 'desktop' }: FooterProps) => {
  const handleLogOut = async () => {
    await logout()

    redirect('/sign-in')
  }

  console.log('oi')

  return (
    <div className="footer">
      <div className={type === 'mobile' ? 'footer_name-mobile' : 'footer_name'}>
        <p className="text-xl font-bold text-gray-700">{user.firstName[0]}</p>
      </div>

      <div
        className={type === 'mobile' ? 'footer_email-mobile' : 'footer_email'}
      >
        <p className="text-14 truncate text-gray-700 font-semibold">
          {user.firstName} {user.lastName}
        </p>
        <p className="text-14 truncate font-normal text-gray-600">
          {user.email}
        </p>
      </div>
      <div className="footer_image" onClick={handleLogOut}>
        <Image src="icons/logout.svg" fill alt="logout" />
      </div>
    </div>
  )
}

export default Footer
