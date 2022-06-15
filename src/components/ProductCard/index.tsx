import React from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';
import { useT } from '../../custom/hooks/useT';
import { ProductType } from '../../types';
import "./_style.scss";



function ProductCard(props: ProductType) {
  const {
    name,
    brandName,
    slug,
    price,
    old_price,
    imageUrl,
  } = props;

  const { t, lang } = useT();

  return (
    <Card className="product_card" bordered={false} hoverable>
      <div className="card_body">
        <Link className="product_view_link" to={"#"}>
          <figure>
            <img src={imageUrl ?? ""} alt={name} className="product_card_img" />
          </figure>
        </Link>
        <p className="price title18_bold">
          {price} {t(`sum.${lang}`)}
        </p>
        <del className='old_price p14_regular'>{old_price} {t(`sum.${lang}`)}</del>
        <Link className="product_view_link" to={"#"}>
          <h5 className="product_name">
            {name}
          </h5>
        </Link>
      </div>
      <div className="card_footer">
        <ul>
          <li>
            <button type='button'>
              <img src={"/assets/icons/filled_cart.svg"} alt="cart" />
            </button>
          </li>
          <li>
            <button type='button'>
              <img src={"/assets/icons/filled_heart.svg"} alt="heart" />
            </button>
          </li>
          <li>
            <button type='button'>
              <i className="fa-solid fa-scale-balanced"></i>
            </button>
          </li>
        </ul>
      </div>
    </Card >
  )
}

export default ProductCard