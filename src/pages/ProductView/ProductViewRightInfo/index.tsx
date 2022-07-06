import React, { useState, useEffect, useCallback } from 'react'
import { haveQuestionsUrl, paymentListUrl, returnExchangeUrl } from '../../../api/apiUrls';
import baseAPI from '../../../api/baseAPI';
import { useT } from '../../../custom/hooks/useT';
import { formatPrice } from '../../../helpers';
import { HaveQuestionsInfoType, HaveQuestionsResType, PaymentListInfoType, PaymentListResTyoe, ReturnExchangeInfoType, ReturnExchangeResType } from '../../../types';
import "./_style.scss";

interface IProductViewRightInfo {
  delivery_price: number
}

function ProductViewRightInfo(props: IProductViewRightInfo) {
  const { delivery_price } = props;
  const { t, lang } = useT();
  const [returnExchange, setReturnExchage] = useState<ReturnExchangeInfoType>({} as ReturnExchangeInfoType);
  const [paymentList, setPaymentList] = useState<PaymentListInfoType>([] as PaymentListInfoType);
  const [haveQuestions, setHaveQuestions] = useState<HaveQuestionsInfoType>({} as HaveQuestionsInfoType);

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


  const getHaveQuestions = useCallback(() => {
    baseAPI.fetchAll<HaveQuestionsResType>(haveQuestionsUrl)
      .then((res) => {
        if (res.data.status === 200) {
          setHaveQuestions(res.data.data);
        }
      })
      .catch((err) => console.log("err", err))
  }, [])

  useEffect(() => {
    getReturnExchange();
    getPaymentList();
    getHaveQuestions();
  }, [getReturnExchange, getPaymentList, getHaveQuestions])

  const { title, url, description } = returnExchange;

  const { managers, emails, phonesNumbers } = haveQuestions;

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
            <span>Телефон:</span>
            <ul>
              {
                phonesNumbers?.split(",").map((phone, idx) => (
                  <li key={idx}>
                    <a href={`tel:${phone}`} className="social_link">
                      {phone}
                    </a>
                  </li>
                ))
              }

            </ul>
          </p>
          <p className="content">
            <span>Телеграм:</span>  <ul>
              {
                managers?.split(",").map((manager, idx) => (
                  <li key={idx}>
                    <a href={`https://t.me/${manager.slice(1)}`} className="social_link" target="_blank" rel="noopener noreferrer">
                      {manager}
                    </a>
                  </li>
                ))
              }

            </ul>
          </p>
          <p className="content">
            <span>Эл. почта:</span>  <ul>
              {
                emails?.split(",").map((email, idx) => (
                  <li key={idx}>
                    <a href={`mailto:${email}`} className="social_link">
                      {email}
                    </a>
                  </li>
                ))
              }

            </ul>
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