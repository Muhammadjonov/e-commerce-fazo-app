import React from 'react'
import { useT } from '../../../custom/hooks/useT';
import useWindowSize from '../../../custom/hooks/useWindowSize';
import { formatPrice } from '../../../helpers';
import { ProductType } from '../../../types';
import "./_style.scss";

interface IOrderCard {
  id: number,
  name: string,
  brandName?: string,
  slug?: string,
  price: number,
  old_price?: number,
  imageUrl: string,
  userSaveProduct?: boolean,
  count: number
}

const OrderCard = (props: IOrderCard) => {
  const {
    id,
    imageUrl,
    name,
    count,
    price
  } = props;
  const { width } = useWindowSize();
  const { t, lang } = useT();

  return (
    <div className="order__card">
      <div className="order__card__left">
        <img className="order__card__left__img" src={imageUrl} alt={name} />
      </div>
      <div className="order__card__right">
        <div className="order__card__right__name">
          <p className="p18_regular order__card__right__name__text">
            {name}
          </p>
          {width < 768 &&
            <h3 className="title18_bold order__price">{formatPrice(price)} {t(`sum.${lang}`)}</h3>
          }
        </div>
        <div className="order__card__right__info">
          <p className="18_regular order__card__right__info__order__count">
            {count} {t(`ty.${lang}`)}
          </p>
          <h3 className="title18_bold order__card__right__info__order__price">
            {formatPrice(price)} {t(`sum.${lang}`)}
          </h3>
        </div>

      </div>
    </div>
  )
}

export default OrderCard