import React from 'react'
import DeliveryAndPayment from './DeliveryAndPayment';
import HaveQuestions from './HaveQuestions';
import ReturnAndExchange from './ReturnAndExchange';
import "./_style.scss";

function ProductViewRightInfo() {
  return (
    <div className="product_view_right_info">
      <ReturnAndExchange />
      <HaveQuestions />
      <DeliveryAndPayment />
    </div>
  )
}

export default ProductViewRightInfo