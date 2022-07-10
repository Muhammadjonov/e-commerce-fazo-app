import { Col, Row } from 'antd'
import React from 'react'
import CardsTitleTop from '../../../components/CardsTitleTop'
import ProductCard from '../../../components/ProductCard'

function RecentlyWatched() {
  return (
    <div className="recently_watched">
      <CardsTitleTop title="Недавно просмотренные" toUrl='#' />
      <Row gutter={[{ lg: 30, md: 20, sm: 10, xs: 10 }, { lg: 30, md: 20, sm: 10, xs: 10 }]}>
        {/* {
          filterProductData.slice(0, 4).map(product => (
            <Col lg={6} key={product.id}>
              <ProductCard {...product} />
            </Col>
          ))
        } */}
      </Row>
    </div>
  )
}

export default RecentlyWatched