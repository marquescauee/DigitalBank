import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import BankCardContent from './BankCardContent'

const BankCard = ({ account, showBalance = true }: CreditCardProps) => {
  return (
    <div className="flex flex-col">
      <Link href={'/dashboard'} className="bank-card">
        <BankCardContent account={account} />

        <div className="bank-card_icon">
          <Image src={'/icons/Paypass.svg'} width={20} height={24} alt="pay" />
          <Image
            src={'/icons/mastercard.svg'}
            width={44}
            height={32}
            alt="mastercard"
            className="ml-5"
          />
        </div>

        <Image
          src={'/icons/lines.png'}
          width={316}
          height={90}
          alt="lines"
          className="absolute top-0 left-0"
        ></Image>
      </Link>
    </div>
  )
}

export default BankCard
