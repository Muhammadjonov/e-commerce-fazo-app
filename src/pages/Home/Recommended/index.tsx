import { useCallback, useEffect, useState } from 'react'
import { Col, Row } from 'antd';
import ProductCard from '../../../components/ProductCard';
import CardsTitleTop from '../../../components/CardsTitleTop';
import baseAPI from '../../../api/baseAPI';
import { recommendedProductsUrl, stockUrl } from '../../../api/apiUrls';
import { ProductType, RecommendedProductsResType, StockInfoType, StockResType } from '../../../types';
import { useT } from '../../../custom/hooks/useT';
import "./_style.scss";

function Recommended() {
  const { t, lang } = useT();
  const [recommendedProducts, setRecommendedProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [stock, setStock] = useState<StockInfoType>({} as StockInfoType);

  // get Recommended products
  const getNewProducts = useCallback(() => {
    baseAPI.fetchWithParams<RecommendedProductsResType>(recommendedProductsUrl, { limit: 8 })
      .then((res) => {
        if (res.data.status === 200) {
          setRecommendedProducts(res.data.data);
          setIsLoading(false);

        }
      })
      .catch((err) => console.log("err", err))
      .finally(() => {

      })
  }, [])

  // get stock

  const getStock = useCallback(() => {
    baseAPI.fetchAll<StockResType>(stockUrl)
      .then((res) => {
        if (res.data.status === 200) {
          setStock(res.data.data);
        }
      })
      .catch((err) => console.log("err", err))
      .finally(() => {
      })
  }, [])

  useEffect(() => {
    getNewProducts();
    getStock();
  }, [getNewProducts, getStock])

  const { url, imageUrl } = stock;

  return (
    <div className="recommended">
      <div className="container">
        <CardsTitleTop title={t(`recommended.${lang}`)} toUrl="/more-products/recommended-view" />
        <Row gutter={[{ lg: 30, md: 20, sm: 10, xs: 10 }, { lg: 30, md: 20, sm: 10, xs: 10 }]}>
          <Col lg={6} md={0} sm={0} xs={0}>
            <div className="left">

              <a href={url} target="_blank" rel="noopener noreferrer">
                <img className="recommended_img" src={imageUrl} alt="recommended" />
              </a>
            </div>
          </Col>
          <Col lg={18} md={24}>
            <Row gutter={[{ lg: 30, md: 20, sm: 10, xs: 10 }, { lg: 30, md: 20, sm: 10, xs: 10 }]}>
              {
                recommendedProducts.map(recommendedProduct => (
                  <Col lg={6} md={8} sm={12} xs={24} key={recommendedProduct.id}>
                    <ProductCard product={recommendedProduct} />
                  </Col>
                ))
              }
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Recommended