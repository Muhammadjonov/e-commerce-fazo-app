import React from 'react'
import { Card, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import "./_style.scss";
import AddCartBtn from '../Buttons/AddCartBtn';
import { ProductType } from '../../types';



function ProductCardCol(props: ProductType) {

  const {
    imageUrl,
    price,
    old_price,
    name,
    brandName
  } = props;

  return (
    <Card className="product_card_col" bordered={false} hoverable>
      <div className="card_body">
        <Row gutter={[20, 20]}>
          <Col md={6}>
            <Link className="product_view_link" to={"#"}>
              <figure>
                <img src={imageUrl ?? ""} alt="watch" className="product_card_img" />
              </figure>
            </Link>
          </Col>
          <Col md={12}>
            <div className="desc">
              <Link className="product_view_link" to={"#"}>
                <h5 className="product_name title24_bold">
                  {name}
                </h5>
              </Link>
              <div className="desc_body p16_regular">
                <p className="brend p16_regular">
                  Brend: <span className="title18_bold">{brandName}</span>
                </p>
                {/* <p className="manufactor p16_regular">
                Ishlab chiqaruvchi davlat: <span className="title18_bold">{manufactor}</span>
              </p>
              <p className="type p16_regular">
                Turi: <span className="title18_bold">{type}</span>
              </p> */}
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="card_right">
              <h5 className="title18_bold per_month">
                {price} сум
              </h5>
              <p className="price">
                {old_price} сум
              </p>
              <AddCartBtn />
              <div className="card_footer">
                <ul>
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
            </div>
          </Col>
        </Row>
      </div>
    </Card >
  )
}

export default ProductCardCol