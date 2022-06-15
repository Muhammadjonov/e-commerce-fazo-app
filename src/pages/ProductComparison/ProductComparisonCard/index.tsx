import { Card } from 'antd';
import React from 'react'
import { Link } from 'react-router-dom';
import "./_style.scss";

interface IProductComparisonCard {
  id: number,
  img: string,
  old_price: string,
  price: string,
  name: string,
  toUrl: string
}

const ProductComparisonCard = (props: IProductComparisonCard) => {
  const {
    img,
    old_price,
    price,
    name,
    toUrl
  } = props;

  return (
    <Card className="product_comparison_card" bordered={false} hoverable>
      <button className="delete_comparison" type='button'>
        <i className="fa-solid fa-xmark"></i>
      </button>
      <Link className="product_view_link" to={toUrl}>
        <div className="card_body">
          <figure>
            <img src={img} alt="watch" className="product_card_img" />
          </figure>
          <p className="price title18_bold">
            {price} сум
          </p>
          <del className='old_price p14_regular'>{old_price} сум</del>
          <h5 className="product_name">
            {name}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam officia harum amet?
          </h5>
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
          </ul>
        </div>
      </Link>
    </Card>

  )
}

export default ProductComparisonCard