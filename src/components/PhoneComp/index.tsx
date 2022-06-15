import React from 'react'
import "./_style.scss";

interface IPhoneComp {
  iconName: string,
  isShowNumber: boolean,
  phone: string
}

function PhoneComp(props: IPhoneComp) {
  const { iconName, isShowNumber, phone } = props;
  return (
    <a
      href={`tel:${phone}`}
      className='phone_link'
    >
      <img src={`/assets/icons/${iconName}.svg`} alt="tel" />
      {
        isShowNumber && (
          <strong className='title18_bold'>{phone}</strong>
        )
      }
    </a>
  )
}

export default PhoneComp