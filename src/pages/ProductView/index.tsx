import { Col, Row } from 'antd';
import BreadcrumbComp from '../../components/BreadcrumbComp';
import ProductDescription from './ProductDescription';
import ProductViewCarusel from './ProductViewCarusel';
import ProductViewRightInfo from './ProductViewRightInfo';
import RecentlyWatched from './RecentlyWatched';

import "./_style.scss";

const breadcrumbs = [
  {
    id: 1,
    toUrl: "/",
    text: "Главная"
  },
  {
    id: 2,
    toUrl: "#",
    text: "Ноутбуки"
  },
  {
    id: 3,
    toUrl: "#",
    text: "Apple"
  }
]


function ProductView() {
  return (
    <section className="product_view">
      <div className="container">
        <div className="breadcrumb_area">
          <BreadcrumbComp breadcrumbs={breadcrumbs} />
        </div>
        <Row gutter={[30, 30]}>
          <Col lg={7}>
            <ProductViewCarusel />
          </Col>

          <Col lg={17}>
            <Row>
              <Col lg={17}>
                <ProductDescription />
              </Col>
              <Col lg={7}>
                <ProductViewRightInfo />
              </Col>
            </Row>

            {/* <RecentlyWatched /> */}
          </Col>
        </Row>
      </div>
    </section>
  )
}

export default ProductView