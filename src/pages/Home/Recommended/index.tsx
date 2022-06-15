import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Col, Row } from 'antd';
import ProductCard from '../../../components/ProductCard';
import "./_style.scss";
import CardsTitleTop from '../../../components/CardsTitleTop';
import baseAPI from '../../../api/baseAPI';
import { recommendedProductsUrl, stockUrl } from '../../../api/apiUrls';
import { ProductType, RecommendedProductsResType, StockInfoType, StockResType } from '../../../types';

function Recommended() {

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
  }, [])

  // get stock

  const getStock = useCallback(() => {
    baseAPI.fetchAll<StockResType>(stockUrl)
      .then((res) => {
        if (res.data.status === 200) {
          setStock(res.data.data);
        }
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
        <CardsTitleTop title="Рекомендуем" toUrl="#" />
        <Row gutter={[30, 30]}>
          <Col lg={6} md={0} sm={0} xs={0}>
            <div className="left">

              <a href={url} target="_blank" rel="noopener noreferrer">
                <img className="recommended_img" src={imageUrl} alt="recommended" />
              </a>
            </div>
          </Col>
          <Col lg={18} md={24}>
            <Row gutter={[30, 30]}>
              {
                recommendedProducts.map(recommendedProduct => (
                  <Col lg={6} md={8} sm={12} xs={24} key={recommendedProduct.id}>
                    <ProductCard {...recommendedProduct} />
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