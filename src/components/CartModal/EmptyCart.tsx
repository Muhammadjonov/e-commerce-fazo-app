import { Button } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

interface IEmptyCart {
  onCloseCartModal: () => void
}

const EmptyCart = (props: IEmptyCart) => {
  const { onCloseCartModal } = props;
  return (
    <div className="empty__cart">
      <img src="" alt="" className="empty__cart__img" />
      <p className="empty__cart__text title24_bold">
        Savatchada hozirda hech nima yo'q
      </p>
      <Link
        onClick={onCloseCartModal}
        to={"/"}
        className="empty__cart__btnlink"
      >
        <Button type='link' size='large'>
          Xarid qilish
        </Button>
      </Link>
    </div>
  )
}

export default EmptyCart