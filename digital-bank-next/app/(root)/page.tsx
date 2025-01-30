import HeaderBox from '@/components/HeaderBox'
import RightSidebar from '@/components/RightSidebar'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import React from 'react'

const Home = () => {
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
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome, "
            user={loggedInUser?.firstName ?? 'Guest'}
            subtext="Access and manage your account and transactions"
          />

          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1250.35}
          />
        </header>
        RECENT TRANSACTIONS
      </div>

      <RightSidebar
        user={loggedInUser}
        transactions={[]}
        banks={[{ currentBalance: 123.5 }, { currentBalance: 500.5 }]}
      />
    </section>
  )
}

export default Home
