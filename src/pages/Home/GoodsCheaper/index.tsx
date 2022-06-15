import { Col, Row } from 'antd'
import { useCallback, useEffect, useState } from 'react';
import { bestsellerUrl } from '../../../api/apiUrls';
import baseAPI from '../../../api/baseAPI';
import CardsTitleTop from '../../../components/CardsTitleTop';
import ProductCard from '../../../components/ProductCard';
import { ProductType, BestsellerResType } from '../../../types';
import "./_style.scss";

function GoodCheaper() {

  const [bestsellers, setBestsellers] = useState<ProductType[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getBestsellers = useCallback(() => {
    baseAPI.fetchWithParams<BestsellerResType>(bestsellerUrl, { limit: 8 })
      .then((res) => {
        if (res.data.status === 200) {
          setBestsellers(res.data.data);
          setIsLoading(false);
        }
      })
  }, [])

  useEffect(() => {
    getBestsellers();
  }, [getBestsellers])

  return (
    <div className="good_cheaper">
      <div className="container">
        <CardsTitleTop title="Товары дешевле:" toUrl="#" />
        <Row gutter={[30, 30]}>
          {
            bestsellers.map(bestseller => (
              <Col key={bestseller.id} lg={6} md={8} sm={12} xs={24} >
                <ProductCard {...bestseller} />
              </Col>
            ))
          }
        </Row>
      </div>
    </div>
  )
}

export default GoodCheaper