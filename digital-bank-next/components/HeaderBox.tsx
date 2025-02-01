import React from 'react'
import HeaderBoxTitle from './HeaderBoxTitle'

const HeaderBox = ({ type, subtext }: HeaderBoxProps) => {
  return (
    <div className="header-box">
      <h1 className="header-box-title">
        {type === 'greeting' && <HeaderBoxTitle />}
        <p className="header-box-subtext">{subtext}</p>
      </h1>
    </div>
  )
}

export default HeaderBox
