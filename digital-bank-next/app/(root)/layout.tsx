import MobileNav from '@/components/MobileNav'
import Sidebar from '@/components/Sidebar'
import Image from 'next/image'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const loggedInUser: User = {
    $id: '12345',
    email: 'caue.marques@example.com',
    userId: 'user-001',
    dwollaCustomerUrl: 'https://api.dwolla.com/customers/12345',
    dwollaCustomerId: '12345',
    firstName: 'Cauê',
    lastName: 'Marques',
    name: 'Cauê Marques',
    address1: 'Rua Exemplo, 123',
    city: 'São Paulo',
    state: 'SP',
    postalCode: '01000-000',
    dateOfBirth: '1990-05-15',
    ssn: '123-45-6789',
  }

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
