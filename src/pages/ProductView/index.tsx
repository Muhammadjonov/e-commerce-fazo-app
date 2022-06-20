import { Col, Row } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { productDetailUrl } from '../../api/apiUrls';
import baseAPI from '../../api/baseAPI';
import BreadcrumbComp from '../../components/BreadcrumbComp';
import { ProductDetailInfoType, ProductDetailResType } from '../../types';
import ProductDescription from './ProductDescription';
import ProductViewCarusel from './ProductViewCarusel';
import ProductViewRightInfo from './ProductViewRightInfo';
import RecentlyWatched from './RecentlyWatched';

import "./_style.scss";


function ProductView() {
  let { product_slug } = useParams();
  const [productDetail, setProductDetail] = useState<ProductDetailInfoType>({} as ProductDetailInfoType);
  const [isLoading, setIsLoading] = useState(true);
  const getProductDetail = useCallback(() => {
    setIsLoading(true);
    baseAPI.fetchWithParams<ProductDetailResType>(productDetailUrl, { key: product_slug })
      .then((res) => {
        if (res.data.status === 200) {
          setProductDetail(res.data.data);
          setIsLoading(false);
        }
      })
  }, [])

  useEffect(() => {
    getProductDetail();
  }, [getProductDetail])

  // breadcrumb
  const breadcrumbs = [
    {
      id: "1",
      toUrl: "/",
      text: "Главная"
    },
    {
      id: productDetail?.categorySlug,
      toUrl: "#",
      text: productDetail?.category
    },
    {
      id: productDetail?.subCategorySlug,
      toUrl: `/category/${productDetail?.subCategorySlug}`,
      text: productDetail?.subCategory
    },
    {
      id: productDetail?.name,
      toUrl: `#`,
      text: productDetail?.name
    }
  ]

  const { characterAssigns, meta_description, delivery_price } = productDetail;

  return (
    <section className="product_view">
      <div className="container">
        <div className="breadcrumb_area">
          <BreadcrumbComp breadcrumbs={breadcrumbs} />
        </div>
        <Row gutter={[30, 30]}>
          <Col xs={24} lg={7}>
            <ProductViewCarusel image={productDetail?.images} />
          </Col>

          <Col xs={24} lg={17}>
            <Row>
              <Col xs={24} lg={17}>
                <ProductDescription
                  {...productDetail}
                />
              </Col>
              <Col xs={24} lg={7}>
                <ProductViewRightInfo delivery_price={delivery_price} />
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