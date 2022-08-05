import { Col, Collapse, Divider } from 'antd'
import { count } from 'console';
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { LoadingContext } from 'react-router-loading';
import { myOrderUrl } from '../../../api/apiUrls';
import baseAPI from '../../../api/baseAPI';
import { useT } from '../../../custom/hooks/useT'
import { formatPrice } from '../../../helpers';
import { MyOrderInfoType, MyOrderResType } from '../../../types';
import OrderCard from '../../Checkout/OrderCard';
import "./__style.scss";
const { Panel } = Collapse;

const OrderHistory = () => {
  const { t, lang } = useT();
  const loadingContext = useContext(LoadingContext);

  const [myOrders, setMyOrders] = useState<MyOrderInfoType>([])

  const getMyOrders = useCallback(() => {
    baseAPI.fetchAll<MyOrderResType>(myOrderUrl)
      .then((res) => {
        if (res.data.status === 200) {
          setMyOrders(res.data.data);
          loadingContext.done();
        }
      })
      .catch((e) => {
        console.log("err", e)
      })
      .finally(() => {
        loadingContext.done();
      })
  }, [])

  useEffect(() => {
    getMyOrders();
  }, [getMyOrders])

  return (
    <Col sm={24} xs={24}>
      <div className="order__history">
        <h3 className="order__history__title title24_bold">
          {t(`onlineOrders.${lang}`)}
        </h3>

        <div className="order__history__body">
          {myOrders?.length !== 0 ?
            myOrders?.map((order) => (
              <React.Fragment key={order.id}>
                <Collapse accordion expandIconPosition='end' className={"order__history__body__collapse"}>
                  <Panel header={<>
                    <div onClick={event => event.stopPropagation()} className="order__history__body__collapse__header">
                      <div className="order__history__body__collapse__header__status">
                        <span className="order__history__body__collapse__header__status__title">Holati</span>
                        <span className="order__history__body__collapse__header__status__text">{order?.statusLabel}</span>
                      </div>
                      <div className="order__history__body__collapse__header__right">
                        <div className="order__history__body__collapse__header__right__left">
                          <span className="order__history__body__collapse__header__right__left__title">
                            ID
                          </span>
                          <span className="order__history__body__collapse__header__right__left__text">
                            {order?.id}
                          </span>
                        </div>
                        <div className="order__history__body__collapse__header__right__price">
                          <span className="order__history__body__collapse__header__right__price__title">
                            {t(`orderPrice.${lang}`)}
                          </span>
                          <span className="order__history__body__collapse__header__right__price__text">
                            {formatPrice(order.totalPrice)} {t(`sum.${lang}`)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button type='button' className="order__history__body__collapse__expandebtn">
                      <img src="/assets/icons/down-arrow.svg" alt="arrow" />
                    </button>
                  </>

                  }
                    key="1"
                    showArrow={false}
                  >
                    <div className="order__body">
                      <div className="order__body__product">
                        <h3 className="order__body__title order__detail title20_bold" >
                          {t(`orderContent.${lang}`)}
                        </h3>
                        {
                          order?.orderItems?.map((orderItem) => (
                            <OrderCard
                              key={orderItem.id}
                              id={orderItem.id}
                              name={orderItem?.product?.name}
                              price={orderItem.price}
                              count={orderItem.amount}
                              imageUrl={orderItem?.product?.imageUrl}
                            />

                          ))
                        }

                      </div>
                      <Divider />
                      <div className="order__body__user__info">
                        <h3 className="order__body__title title20_bold" >
                          {t(`contactInfo.${lang}`)}
                        </h3>
                        <p className="order__body__user__info__username">
                          {order?.user?.first_name} {order?.user?.last_name}
                        </p>
                        <p className="order__body__user__info__userphone">
                          {order?.user?.username}
                        </p>
                        <div className="order__body__user__info__payment__method">
                          <h3 className="order__body__title title20_bold" >
                            {t(`payment.${lang}`)}
                          </h3>
                          <p className="order__body__user__info__payment__method__content">
                            {t(`paymentMethod.${lang}`)}<b>{order?.paymentMethod}</b>
                          </p>
                        </div>
                      </div>

                    </div>
                  </Panel>

                </Collapse>
                <Divider />
              </React.Fragment>
            )) : (
              <p className="order__history__empty__text">
                {t(`emptyOrderText.${lang}`)}
              </p>
            )
          }

        </div>

      </div>
    </Col>
  )
}

export default OrderHistory