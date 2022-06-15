import React from 'react'
import "./_style.scss";

interface IOrderCard {
  id: string,
  img: string,
  name: string,
  count: string,
  price: string
}

const OrderCard = (props: IOrderCard) => {
  const {
    id,
    img,
    name,
    count,
    price
  } = props;
  return (
    <div className="order__card">
      <div className="order__card__left">
        <img src={img} alt="order1" />
        <p className="p18_regular">
          {name}
        </p>
      </div>

      <p className="18_regular order__card__order__count">
        {count}
      </p>

      <h3 className="title18_bold order__card__order__price">
        {price}
      </h3>
    </div>
  )
}

export default OrderCard