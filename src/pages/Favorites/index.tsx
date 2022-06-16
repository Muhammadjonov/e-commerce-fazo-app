import { Col, Row } from 'antd';
import React from 'react'
import BreadcrumbComp from '../../components/BreadcrumbComp';
import FavoriteProductCard from './FavoriteProductCard';
import "./_style.scss";
import favoriteCardData from "./favoriteCardData.json";

const breadcrumbs = [
  {
    id: "1",
    toUrl: "/",
    text: "Главная",
  },
  {
    id: "2",
    toUrl: "#",
    text: "Изброанное",
  }
];

const Favorites = () => {
  return (
    <section className="favorites">
      <div className="container">
        <div className="favorite_breadcrumb_area">
          <BreadcrumbComp breadcrumbs={breadcrumbs} />
          <button type='button' className="delete_all_favorites">Удалит все</button>
        </div>
        <div className="favorites_body">
          <h4 className="title20_bold favorite_title">
            Избранное
          </h4>

          <Row gutter={[30, 30]}>
            {
              favoriteCardData.map((product) => (
                <Col flex={1} key={product.id}>
                  <FavoriteProductCard {...product} />
                </Col>
              ))
            }
          </Row>
        </div>
      </div>
    </section>
  )
}

export default Favorites