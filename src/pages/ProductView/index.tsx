import { Col, Row } from 'antd';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { LoadingContext } from 'react-router-loading';
import { productDetailUrl } from '../../api/apiUrls';
import baseAPI from '../../api/baseAPI';
import BreadcrumbComp from '../../components/BreadcrumbComp';
import { useT } from '../../custom/hooks/useT';
import { ProductDetailInfoType, ProductDetailResType } from '../../types';
import ProductDescription from './ProductDescription';
import ProductViewCarusel from './ProductViewCarusel';
import ProductViewRightInfo from './ProductViewRightInfo';
import RecentlyWatched from './RecentlyWatched';

import "./_style.scss";

function ProductView() {
  const { t, lang } = useT();
  let { product_slug } = useParams();
  const [productDetail, setProductDetail] = useState<ProductDetailInfoType>({} as ProductDetailInfoType);
  const [isLoading, setIsLoading] = useState(true);
  const loadingContext = useContext(LoadingContext);

  const getProductDetail = useCallback(() => {
    setIsLoading(true);
    baseAPI.fetchWithParams<ProductDetailResType>(productDetailUrl, { key: product_slug })
      .then((res) => {
        if (res.data.status === 200) {
          setProductDetail(res.data.data);
          setIsLoading(false);
          loadingContext.done();
        }
      })
      .catch((err) => console.log("err", err))
      .finally(() => {
        loadingContext.done();
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
      text: t(`home.${lang}`),
      className: ""
    },
    {
      id: "2",
      toUrl: "#",
      text: productDetail?.category,
      className: ""
    },
    {
      id: "3",
      toUrl: `/category/${productDetail?.subCategorySlug}`,
      text: productDetail?.subCategory,
      className: "last__one"
    },
    {
      id: "4",
      toUrl: `#`,
      text: productDetail?.name,
      className: ""
    }
  ]


  return (
    <section className="product_view">
      <div className="container">
        <div className="breadcrumb_area">
          <BreadcrumbComp breadcrumbs={breadcrumbs} />
        </div>
        <Row gutter={[{ lg: 30, md: 20, sm: 10, xs: 10 }, { lg: 30, md: 20, sm: 10, xs: 10 }]}>
          <Col xs={24} lg={7}>
            <ProductViewCarusel image={productDetail?.images} />
          </Col>

          <Col xs={24} lg={17}>
            <Row gutter={[20, 20]}>
              <Col xs={24} lg={16}>
                <ProductDescription
                  {...productDetail}
                />
              </Col>
              <Col xs={24} lg={8}>
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