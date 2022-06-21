import React, { useState, useEffect, useCallback } from 'react'
import { footerDataUrl, footerSettingsUrl, paymentListUrl, returnExchangeUrl } from '../../../api/apiUrls';
import baseAPI from '../../../api/baseAPI';
import { useT } from '../../../custom/hooks/useT';
import { formatPrice } from '../../../helpers';
import { FooterInfoType, FooterResType, FooterSettingsInfoType, FooterSettingsResType, PaymentListInfoType, PaymentListResTyoe, ReturnExchangeInfoType, ReturnExchangeResType } from '../../../types';
import "./_style.scss";

interface IProductViewRightInfo {
  delivery_price: number
}

function ProductViewRightInfo(props: IProductViewRightInfo) {
  const { delivery_price } = props;
  const { t, lang } = useT();
  const [returnExchange, setReturnExchage] = useState<ReturnExchangeInfoType>({} as ReturnExchangeInfoType);
  const [paymentList, setPaymentList] = useState<PaymentListInfoType>([] as PaymentListInfoType);
  const [footerSettings, setFooterSettings] = useState<FooterSettingsInfoType>({} as FooterSettingsInfoType);
  const [footerDatas, setFooterDatas] = useState<FooterInfoType>({} as FooterInfoType);

  const getReturnExchange = useCallback(() => {
    baseAPI.fetchAll<ReturnExchangeResType>(returnExchangeUrl)
      .then((res) => {
        if (res.data.status === 200) {
          setReturnExchage(res.data.data);
        }
      })
  }, []);

  const getPaymentList = useCallback(() => {
    baseAPI.fetchAll<PaymentListResTyoe>(paymentListUrl)
      .then((res) => {
        if (res.data.status === 200) {
          setPaymentList(res.data.data);
        }
      })
  }, []);


  const getFooterSettings = useCallback(() => {
    baseAPI.fetchAll<FooterSettingsResType>(footerSettingsUrl)
      .then((res) => {
        if (res.data.status === 200) {
          setFooterSettings(res.data.data);
        }
      })
  }, [])


  const getFooterDatas = useCallback(() => {
    baseAPI.fetchAll<FooterResType>(footerDataUrl)
      .then((res) => {
        if (res.data.status === 200) {
          setFooterDatas(res.data.data);
        }
      })
  }, [])

  useEffect(() => {
    getReturnExchange();
    getPaymentList();
    getFooterSettings();
    getFooterDatas();
  }, [getReturnExchange, getPaymentList, getFooterSettings, getFooterDatas])

  const { title, url, description } = returnExchange;
  const { phone, email, } = footerSettings;

  return (
    <div className="product_view_right_info">
      {/* return and exchange */}
      <div className="return_exchange product_view_right_info_card">
        <i className="fa-solid fa-arrows-rotate"></i>
        <div className="product_view_right_info_card_body">
          <h5 className="card_title">
            {title}
          </h5>
          <p className="content">
            {description}
          </p>
          <a href={url} target="_blank" rel="noopener noreferrer"
            className="more_about_program"
          >
            Подробнее о программе.
          </a>
        </div>
      </div>
      {/* have questions */}
      <div className="have_questions product_view_right_info_card">
        <i className="fa-solid fa-headset"></i>
        <div className="product_view_right_info_card_body">
          <h5 className="card_title">
            Есть вопросы?
          </h5>
          <p className="content">
            Телефон: <a href={`tel:${phone}`} className="social_link">
              {phone}
            </a>
          </p>
          <p className="content">
            Телеграм: <a href={footerDatas?.telegram_url} className="social_link">
              @{footerDatas?.telegram_url?.slice(13)}
            </a>
          </p>
          <p className="content">
            Эл. почта: <a href={`mailto:${email}`} className="social_link">
              {email}
            </a>
          </p>
        </div>
      </div>
      {/* delivery and payment */}
      <div className="delivery_payment product_view_right_info_card">

        <div className="delivery">
          <img src="/assets/icons/delivery.svg" alt="delivery" />
          <div className="product_view_right_info_card_body">
            <h5 className="card_title">
              Доставка: <span className="content">
                {formatPrice(delivery_price)}
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