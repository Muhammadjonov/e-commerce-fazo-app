import React from 'react';
import { Col, Row, Switch } from 'antd';
import { Link } from 'react-router-dom';
import BreadcrumbComp from '../../components/BreadcrumbComp';
import CompareItem from './CompareItem';
import "./_style.scss";
import productComparisonData from "./productComparisonData.json"
import ProductComparisonCard from './ProductComparisonCard';
import { useT } from '../../custom/hooks/useT';


const compareItemData = [
  {
    id: "1",
    isActiveClass: true,
    text: "Смартфоны 5"
  },
  {
    id: "2",
    isActiveClass: false,
    text: "Смартфоны 5"
  },
  {
    id: "3",
    isActiveClass: false,
    text: "Внешние аккумуляторы 2"
  },

]

const ProductComparison = () => {
  const { t, lang } = useT();

  const onDifferenceChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  }
  // breadcrumb
  const breadcrumbs = [
    {
      id: "1",
      toUrl: "/",
      text: "Главная",
      className: ""
    },
    {
      id: "2",
      toUrl: "#",
      text: t(`compare.${lang}`),
      className: ""
    },
  ];

  return (
    <section className="product_comparison">
      <div className="container">
        <div className="product_comparison_breadcrumb_area">
          <BreadcrumbComp breadcrumbs={breadcrumbs} />
        </div>
        <div className="product_comparison_body">
          <h4 className="title20_bold product_comparison_title">
            Сравнение товаров
          </h4>

          <ul className="compare_nav">
            {
              compareItemData.map(compareItem => (
                <li className="compare_nav_item" key={compareItem.id}>
                  <CompareItem {...compareItem} />
                </li>
              ))
            }
          </ul>
          <div className="compare_change">
            <div className="compare_change_difference">
              <Switch onChange={onDifferenceChange} /><span className='difference_text'>Только отличия</span>
            </div>
            <Link to="#" className="compare_change_add_product">
              Добавить товары
            </Link>
          </div>

          <Row gutter={[{ lg: 30, md: 20, sm: 10, xs: 10 }, { lg: 30, md: 20, sm: 10, xs: 10 }]}>
            {
              productComparisonData.map((product) => (
                <Col flex={1} key={product.id}>
                  <ProductComparisonCard {...product} />
                </Col>
              ))
            }
          </Row>
          <div className="description_product">
            <h4 className="title18_bold description_product_title">
              Характеристики товара
            </h4>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductComparison