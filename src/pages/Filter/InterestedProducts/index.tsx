import { Row, Col } from 'antd'
import CardsTitleTop from '../../../components/CardsTitleTop';
import ProductCard from '../../../components/ProductCard'

import "./_style.scss";


function InterestedProduct() {
  return (
    <div className="interested_products">
      <CardsTitleTop title="Товары которые так же могут быть интересны" toUrl="#" />
      <Row gutter={[30, 30]}>
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

export default InterestedProduct