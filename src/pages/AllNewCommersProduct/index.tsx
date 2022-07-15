import { useCallback, useContext, useEffect, useState } from "react";
import { Col, Row } from "antd";
import "./_style.scss";
import ProductCard from "../../components/ProductCard";
import PaginationComp from "../../components/PaginationComp";
import BreadcrumbComp from "../../components/BreadcrumbComp";
import ProductCardCol from "../../components/ProductCardCol";
import ShowMoreBtn from "../../components/Buttons/ShowMoreBtn";
import { useSearchParams } from "react-router-dom";
import baseAPI from "../../api/baseAPI";
import { AllNewProductsInfoType, AllNewProductsResType, } from "../../types";
import { newCommersProductsUrl } from "../../api/apiUrls";
import { LoadingContext } from "react-router-loading";
import useWindowSize from "../../custom/hooks/useWindowSize";
import { useT } from "../../custom/hooks/useT";

type GridType = {
  multiple: boolean;
  one: boolean;
};

function AllNewCommersProduct() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { width } = useWindowSize();
  const { t, lang } = useT();
  const [newCommers, setNewCommers] = useState<AllNewProductsInfoType>({} as AllNewProductsInfoType);
  const [page, setPage] = useState<number>(1);
  const loadingContext = useContext(LoadingContext);


  const [grid, setGrid] = useState<GridType>({
    multiple: true,
    one: false,
  });

  // grid ni o'zgartirish logikasi

  const handleChangeGrid = (grid: GridType) => {
    setGrid((prev) => ({
      ...prev,
      ...grid,
    }));
  };

  const getNewCommers = useCallback(() => {
    baseAPI.fetchWithPagination<AllNewProductsResType>({ url: newCommersProductsUrl, page, params: {} })
      .then((res) => {
        if (res.data.status === 200) {
          setNewCommers(res.data.data?.products);
          loadingContext.done();
        }
      })
      .catch((err) => console.log("err", err))
      .finally(() => {
        loadingContext.done();
      })
  }, [page])

  useEffect(() => {
    getNewCommers();
  }, [getNewCommers])

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }, [page])

  useEffect(() => {
    width < 768 && handleChangeGrid({ multiple: true, one: false })
  }, [width])

  let { items, _meta } = newCommers;

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
      text: t(`newCommers.${lang}`),
      className: ""
    },
  ];

  return (
    <section className="new__products">
      <div className="container">
        <div className="search_result_body">
          <Row gutter={[{ lg: 30, md: 20, sm: 10, xs: 10 }, { lg: 30, md: 20, sm: 10, xs: 10 }]}>
            <Col lg={30}>
              <Row gutter={[{ lg: 30, md: 20, sm: 10, xs: 10 }, { lg: 30, md: 20, sm: 10, xs: 10 }]}>
                <Col sm={24} xs={24}>
                  <div className="search_right_top">
                    <div className="breadcrumb_area">
                      <BreadcrumbComp breadcrumbs={breadcrumbs} />
                    </div>
                    {
                      width > 768 && (
                        <div className="right_top_change_grid">
                          <button type='button' onClick={() => handleChangeGrid({ multiple: true, one: false })}>
                            <img src={`/assets/icons/${grid.multiple ? "red_grid_multiple" : "grid_multiple"}.svg`} alt="grid_multiple" />
                          </button>
                          <button type='button' onClick={() => handleChangeGrid({ multiple: false, one: true })}>
                            <img src={`/assets/icons/${grid.multiple ? "grid_one" : "red_grid_one"}.svg`} alt="grid_one" />
                          </button>
                        </div>
                      )
                    }

                  </div>
                </Col>
                {
                  grid.multiple
                    ? items?.map((product) => (
                      <Col lg={6} md={8} sm={12} xs={24} key={product.id}>
                        <ProductCard product={product} />
                      </Col>
                    ))
                    : items?.map((product) => (
                      <Col sm={24} xs={24} key={product.id}>
                        <ProductCardCol product={product} />
                      </Col>
                    ))
                }
              </Row>
              <div className="search_pagination_block">
                {/* <div className="search_showmore_btn">
                    <ShowMoreBtn />
                  </div> */}
                {_meta?.pageCount > 1 && (
                  <PaginationComp {..._meta} page={page} setPage={setPage} />
                )}
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </section>
  );
}

export default AllNewCommersProduct;
