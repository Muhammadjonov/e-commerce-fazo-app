import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import BreadcrumbComp from '../../components/BreadcrumbComp';
import ProductComparisonCard from './ProductComparisonCard';
import { useT } from '../../custom/hooks/useT';

import { useAppDispatch, useAppSelector } from '../../Store/hooks';
import { deleteByCategory } from '../../features/Compares/comparesSlice';
import { ComparesInfoType, ComparesResType } from '../../types';
import baseAPI from '../../api/baseAPI';
import { comparesUrl } from '../../api/apiUrls';
import { getCompareLocalStorage } from '../../helpers';
import { LoadingContext } from 'react-router-loading';
import "./_style.scss";
import EmptyFavourites from '../Favourites/EmptyFavourites';

const ProductComparison = () => {
  const { t, lang } = useT();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isErrLoading, setIsErrLoading] = useState<boolean>(true);
  const loadingContext = useContext(LoadingContext);
  const [compares, setCompares] = useState<ComparesInfoType>({} as ComparesInfoType);
  const { compares: products } = getCompareLocalStorage();
  const { compares: inCompares } = useAppSelector((state) => state.compares);
  let ids: number[] = [];
  let initialCategoryId = products[0]?.category_id;
  const [categoryId, setCategoryId] = useState<number>(initialCategoryId);
  products.forEach((product: any) => ids.push(...product.product_ids));

  const getCompares = useCallback(() => {
    setIsLoading(true);
    baseAPI.create<ComparesResType>(comparesUrl, { categoryId, ids })
      .then((res) => {
        if (res.data.status === 200) {
          setCompares(res.data.data);
          loadingContext.done();
          setIsLoading(false);
        }
        else if (res.data.status === 403) {
          setIsErrLoading(false);
        }
      })
      .catch((e) => console.log("err", e))
      .finally(() => {
        loadingContext.done();
        setIsLoading(false);
      })
  }, [categoryId, inCompares])

  useEffect(() => {
    getCompares();
  }, [getCompares])

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
      text: t(`balance.${lang}`),
      className: ""
    },
  ];

  const handleChangeCategoryId = (categoryId: number) => {
    setCategoryId(categoryId);
  }

  const handleDeleteByCategory = (category_id: number) => {
    dispatch(deleteByCategory({ category_id }));
    setCategoryId(initialCategoryId);
  }

  return (
    <section className="product_comparison">
      <div className="container">
        <div className="product_comparison_breadcrumb_area">
          <BreadcrumbComp breadcrumbs={breadcrumbs} />
        </div>
        <h4 className="title20_bold product_comparison_title">
          {t(`productComparison.${lang}`)}
        </h4>
        {
          !isLoading ?
            <>
              {
                compares?.products?.length !== 0 && isErrLoading ? (
                  <div className="product_comparison_body">
                    <ul className="compare_nav">
                      {
                        compares?.categories?.map((compare) => (
                          <li
                            className={`compare_nav_item ${compare.categoryId === categoryId ? "active" : ""}`}
                            key={compare.categoryId}
                          >
                            <span
                              className={`compare_item ${compare.categoryId === categoryId ? "active" : ""}`}
                              onClick={() => handleChangeCategoryId(compare.categoryId)}
                            >
                              {compare.categoryName}{`  `}{compare.productCount}
                            </span>
                            <button
                              type='button'
                              className="detete_compare_item"
                              onClick={() => handleDeleteByCategory(compare.categoryId)}
                            >
                              <i
                                className="fa-solid fa-xmark"
                              >
                              </i>
                            </button>
                          </li>
                        ))
                      }
                    </ul>
                    {/* <div className="compare_change"> */}
                    {/* <div className="compare_change_difference"> */}
                    {/* <Switch onChange={onDifferenceChange} /><span className='difference_text'>Только отличия</span> */}
                    {/* </div> */}
                    <div className="compare__product__add">
                      <Link to="/" className="compare__product__add__link">
                        {t(`addProducts.${lang}`)}
                      </Link>
                    </div>
                    {/* </div> */}
                    <div className="product_comparison_products">
                      <Row gutter={[{ lg: 30, md: 20, sm: 10, xs: 10 }, { lg: 30, md: 20, sm: 10, xs: 10 }]}>
                        {
                          compares?.products?.map((product) => (
                            <Col xs={24} sm={12} md={6} key={product.id}>
                              <ProductComparisonCard product={product} />
                            </Col>
                          ))
                        }
                      </Row>

                    </div>
                    <h4 className="title18_bold description__product__title">
                      {t(`productCharacteristics.${lang}`)}
                    </h4>
                    {
                      compares?.characters?.map((character) => (
                        <React.Fragment key={character.id}>
                          <h4 className='description__product__row__title'>
                            {character.name}
                          </h4>
                          <Row
                            className="description__product__row"
                            gutter={[{ lg: 30, md: 20, sm: 10, xs: 10 }, { lg: 30, md: 20, sm: 10, xs: 10 }]}
                          >
                            {
                              character?.productAssigns?.map((assign) => (
                                <Col xs={24} sm={12} md={6} key={assign.id}>
                                  <p className="content">
                                    {assign.value}
                                  </p>
                                </Col>
                              ))
                            }

                          </Row>
                        </React.Fragment>
                      ))
                    }
                  </div>
                ) : (
                  <EmptyFavourites />
                )
              }
            </> : <div style={{ height: "45vh" }}></div>
        }
      </div>
    </section>
  )
}

export default ProductComparison