import { useState, useEffect, useCallback } from 'react'
import { haveQuestionsUrl, paymentListUrl } from '../../../api/apiUrls';
import baseAPI from '../../../api/baseAPI';
import { useT } from '../../../custom/hooks/useT';
import { HaveQuestionsInfoType, HaveQuestionsResType, PaymentListInfoType, PaymentListResTyoe, ReturnExchangeInfoType, ReturnExchangeResType } from '../../../types';
import "./_style.scss";


function ProductViewRightInfo() {
  const { t, lang } = useT();
  const [paymentList, setPaymentList] = useState<PaymentListInfoType>([] as PaymentListInfoType);
  const [haveQuestions, setHaveQuestions] = useState<HaveQuestionsInfoType>({} as HaveQuestionsInfoType);

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
    getPaymentList();
    getHaveQuestions();
  }, [getPaymentList, getHaveQuestions])

  const { managers, emails, phonesNumbers } = haveQuestions;

  return (
    <div className="product_view_right_info">
      {/* return and exchange */}
      {/* <div className="return_exchange product_view_right_info_card">
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
            {t(`moreAboutProgram.${lang}`)}
          </a>
        </div>
      </div> */}
      {/* have questions */}
      <div className="have_questions product_view_right_info_card">
        <i className="fa-solid fa-headset"></i>
        <div className="product_view_right_info_card_body">
          <h5 className="card_title">
            {t(`haveQuestions.${lang}`)}
          </h5>
          <div className="content">
            <span>{t(`phone.${lang}`)}</span>
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
          </div>
          <div className="content">
            <span>{t(`telegram.${lang}`)}</span>
            <ul>
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
          </div>
          <div className="content">
            <span>{t(`email.${lang}`)}</span>
            <ul>
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
          </div>
        </div>
      </div>
      {/* delivery and payment */}
      <div className="delivery_payment product_view_right_info_card">

        {/* <div className="delivery">
          <img src="/assets/icons/delivery.svg" alt="delivery" />
          <div className="product_view_right_info_card_body">
            <h5 className="card_title">
              {t(`delivery.${lang}`)}: <span className="content">
                {formatPrice(delivery_price)}
              </span>
            </h5>
          </div>
        </div> */}

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