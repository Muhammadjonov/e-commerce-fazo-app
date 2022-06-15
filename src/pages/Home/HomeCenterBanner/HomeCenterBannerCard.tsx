import { Col, Row } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

interface IHomeCenterBannerCard {
  id: number,
  title: string,
  description: string,
  imageUrl: string,
  price: string,
  oldPrice: string,
  url: string
}

function HomeCenterBannerCard(props: IHomeCenterBannerCard) {

  const {
    title,
    description,
    imageUrl,
    price,
    oldPrice,
    url
  } = props;

  return (
    <div className="center_banner_card">
      <Row gutter={[16, 16]}>
        <Col lg={9} md={9} sm={24} xs={24}>
          <div className="left">
            <div className="left_card">
              <h1 className="banner_title">
                {title}
              </h1>
              <p className="banner_desc">
                {description}
              </p>
            </div>
          </div>
        </Col>
        <Col lg={6} md={6} sm={24} xs={24}>
          <div className="center">
            <img src={imageUrl} alt={title} />
          </div>
        </Col>
        <Col lg={9} md={9} sm={24} xs={24}>
          <div className="right">
            <div>
              <h1 className="price title42_extra_bold">
                {price} Сум
              </h1>
              <del className="old_price">
                {oldPrice} Сум
              </del>
            </div>
            <Link className="banner_link" to={url}>
              Показать еще
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default HomeCenterBannerCard