import { Col, Row } from 'antd'
import { useCallback, useEffect, useState } from 'react';
import { bestsellerUrl } from '../../../api/apiUrls';
import baseAPI from '../../../api/baseAPI';
import CardsTitleTop from '../../../components/CardsTitleTop';
import ProductCard from '../../../components/ProductCard';
import { useT } from '../../../custom/hooks/useT';
import { ProductType, BestsellerResType } from '../../../types';
import "./_style.scss";

function GoodCheaper() {
  const { t, lang } = useT();
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
      .catch((err) => console.log("err", err))
      .finally(() => {

      })
  }, [])

  useEffect(() => {
    getBestsellers();
  }, [getBestsellers])

  return (
    <div className="good_cheaper">
      <div className="container">
        <CardsTitleTop title={t(`xitProducts.${lang}`)} toUrl="/more-products/bestseller-view" />
        <Row gutter={[{ lg: 30, md: 20, sm: 10, xs: 10 }, { lg: 30, md: 20, sm: 10, xs: 10 }]}>
          {
            bestsellers.map(bestseller => (
              <Col key={bestseller.id} lg={6} md={8} sm={12} xs={24} >
                <ProductCard product={bestseller} />
              </Col>
            ))
          }
        </Row>
      </div>
    </div>
  )
}

export default GoodCheaper