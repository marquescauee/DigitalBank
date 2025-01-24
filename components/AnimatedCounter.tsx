'use client'

import React from 'react'
import CountUp from 'react-countup'

const AnimatedCounter = ({ amount }: AnimatedCounterProps) => {
  return (
    <div className="w-full">
      <CountUp
        separator="."
        prefix="R$"
        end={amount}
        decimal=","
        decimals={2}
        duration={2}
      />
    </div>
  )
}

export default AnimatedCounter
