const DeliveryAndPayment = () => {
  return (
    <div className="delivery_payment product_view_right_info_card">

      <div className="delivery">
        <img src="/assets/icons/delivery.svg" alt="delivery" />
        <div className="product_view_right_info_card_body">
          <h5 className="card_title">
            Доставка: <span className="content">
              Бесплатно
            </span>
          </h5>
        </div>
      </div>

      <div className="payment">
        <img src="/assets/icons/payment.svg" alt="payment" />
        < div className="product_view_right_info_card_body">
          <h5 className="card_title">
            Cпособ оплаты:
          </h5>
          <ul>
            <li>
              Наличными (При Доставке)</li>
            <li>
              Payme / Click
            </li>
            <li>
              Перечислением с НДС
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default DeliveryAndPayment;