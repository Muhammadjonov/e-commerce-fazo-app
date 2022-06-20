import { Modal } from 'antd'
import React from 'react'

interface ICartModal {
  isOpenCart: boolean
}

const CartModal = (props: ICartModal) => {
  const { isOpenCart } = props;
  return (
    <Modal title="Купить в рассрочку" visible={isOpenCart} >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  )
}

export default CartModal