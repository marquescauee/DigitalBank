'use client'

import { useAuth } from '@/contexts/AuthContext'
import { formatAmount } from '@/lib/utils'
import React from 'react'

type BankCardContentProps = {
  account: Account
}

const BankCardContent = ({ account }: BankCardContentProps) => {
  const { user } = useAuth()

  if (!user) return <></>

  return (
    <div className="bank-card_content">
      <div>
        <h4 className="text-16 font-semibold text-white">
          {account.name ?? `${user.firstName} ${user.lastName}`}
        </h4>
        <p className="font-ibm-plex-serif font-black text-white">
          {formatAmount(account.currentBalance)}
        </p>
      </div>

      <article className="flex flex-col gap-2">
        <div className="flex justify-between">
          <h5 className="text-12 font-semibold text-white">{`${user.firstName} ${user.lastName}`}</h5>
          <h6 className="text-12 font-semibold text-white">●● / ●●</h6>
        </div>
        <p className="text-14 font-semibold tracking-[1.1px] text-white">
          ●●●● ●●●● ●●●● <span className="text-16">{1234}</span>
        </p>
      </article>
    </div>
  )
}

export default BankCardContent
