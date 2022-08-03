import { useState, useEffect, useCallback } from 'react'
import { paymentListUrl } from '../../../api/apiUrls';
import baseAPI from '../../../api/baseAPI';
import { useT } from '../../../custom/hooks/useT';
import { PaymentListInfoType, PaymentListResTyoe } from '../../../types';
import "./_style.scss";


function ProductViewRightInfo() {
  const { t, lang } = useT();
  const [paymentList, setPaymentList] = useState<PaymentListInfoType>([] as PaymentListInfoType);

  const getPaymentList = useCallback(() => {
    baseAPI.fetchAll<PaymentListResTyoe>(paymentListUrl)
      .then((res) => {
        if (res.data.status === 200) {
          setPaymentList(res.data.data);
        }
      })
  }, []);


  useEffect(() => {
    getPaymentList();
  }, [getPaymentList])

  return (
    <div className="product_view_right_info">
      {/* payment */}
      <div className="payment product_view_right_info_card">

        <div className="payment">
          <img src="/assets/icons/payment.svg" alt="payment" />
          < div className="product_view_right_info_card_body">
            <h5 className="card_title">
              {t(`paymentMethod.${lang}`)}
            </h5>
            <ul>
              {
                paymentList?.map((item) => (
                  <li key={item.id}>
                    {item.title}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div >
  )
}

export default ProductViewRightInfo