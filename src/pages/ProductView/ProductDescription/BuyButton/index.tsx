import React from 'react'
import "./_style.scss";

interface IBuyButton {
  text: string;
  className?: string;
  onClick?: () => void
}

function BuyButton(props: IBuyButton) {
  const { text, className = "", onClick } = props;

  return (
    <button onClick={onClick} type='button' className={`buy_button ${className}`}>
      {text}
    </button>
  )
}

export default BuyButton