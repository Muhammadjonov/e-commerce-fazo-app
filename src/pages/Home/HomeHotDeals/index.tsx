import { Col, Row } from 'antd'
import { useCallback, useEffect, useState } from 'react';
import { newProductsUrl } from '../../../api/apiUrls';
import baseAPI from '../../../api/baseAPI';
import CardsTitleTop from '../../../components/CardsTitleTop';
import { ProductType, NewProductsResType } from '../../../types';
import HotDealsCard from './HotDealsCard';


function HomeHotDeals() {
  const [newProducts, setNewProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getNewProducts = useCallback(() => {
    baseAPI.fetchWithParams<NewProductsResType>(newProductsUrl, { limit: 8 })
      .then((res) => {
        if (res.data.status === 200) {
          setNewProducts(res.data.data);
          setIsLoading(false);
        }
      })
  }, [])

  useEffect(() => {
    getNewProducts();
  }, [getNewProducts])

  return (
    <div className="home_hot_deals">
      <div className="container">
        <CardsTitleTop title="Горящие предложения" toUrl='#' />
        <Row gutter={[30, 30]}>
          {
            newProducts.map((newProduct) => (
              <Col key={newProduct.id} lg={6} md={8} sm={12} xs={24} >
                <HotDealsCard {...newProduct} />
              </Col>
            ))
          }

        </Row>
      </div>
    </div>
  )
}

export default HomeHotDeals