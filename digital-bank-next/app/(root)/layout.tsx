'use client'

import MobileNav from '@/components/MobileNav'
import Sidebar from '@/components/Sidebar'
import { logout, refreshToken, validateToken } from '@/routes/auth'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const loggedInUser: User = {
    id: '12345',
    email: 'caue.marques@example.com',
    userId: 'user-001',
    firstName: 'Cauê',
    lastName: 'Marques',
    name: 'Cauê Marques',
    address: 'Rua Exemplo, 123',
    city: 'São Paulo',
    state: 'SP',
    postalCode: '01000-000',
    dateOfBirth: '1990-05-15',
    cpf: '123-45-6789',
  }

  const pathname = usePathname()
  const route = useRouter()
  const [isLogged, setIsLogged] = useState<boolean>(false)

  const authenticateUser = async () => {
    const validToken = await validateToken()

    if (validToken.statusCode === 200) {
      setIsLogged(true)
      return
    }

    const refreshedToken = await refreshToken()

    if (refreshedToken.statusCode === 200) {
      setIsLogged(true)
      return
    }

    if (refreshedToken.error) {
      await logout()

      route.push('/sign-in')
    }
  }

  useEffect(() => {
    authenticateUser()
  }, [pathname])

  if (isLogged) {
    return (
      <main className="flex h-screen w-full font-inter">
        <Sidebar user={loggedInUser} />

        <div className="flex size-full flex-col">
          <div className="root-layout">
            <Image src={'/icons/logo.svg'} width={30} height={30} alt="logo" />
            <div>
              <MobileNav user={loggedInUser} />
            </div>
          </div>
          {children}
        </div>
      </main>
    )
  }

  return <></>
}
