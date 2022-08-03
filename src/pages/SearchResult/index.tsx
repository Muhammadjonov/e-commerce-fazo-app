import { useCallback, useContext, useEffect, useState } from "react";
import { Col, Row, Collapse } from "antd";
import ProductCard from "../../components/ProductCard";
import PaginationComp from "../../components/PaginationComp";
import BreadcrumbComp from "../../components/BreadcrumbComp";
import ProductCardCol from "../../components/ProductCardCol";
import ShowMoreBtn from "../../components/Buttons/ShowMoreBtn";
import { useSearchParams } from "react-router-dom";
import baseAPI from "../../api/baseAPI";
import { SearchInfoType, SearchResType } from "../../types";
import { searchUrl } from "../../api/apiUrls";
import { LoadingContext } from "react-router-loading";
import { useT } from "../../custom/hooks/useT";
import useWindowSize from "../../custom/hooks/useWindowSize";
import "./_style.scss";

const { Panel } = Collapse;

type Inputs = {
  example: string;
  exampleRequired: string;
};

type GridType = {
  multiple: boolean;
  one: boolean;
};


function SearchResult() {
  const { t, lang } = useT();
  const [searchParams] = useSearchParams();
  let category = searchParams.get("category");
  let key = searchParams.get("key");
  const [searchResultProducts, setSearchResultProducts] = useState<SearchInfoType>({} as SearchInfoType);
  const [page, setPage] = useState<number>(1);
  const [priceSort, setPriceSort] = useState<number>(3);
  const [nameSort, setNameSort] = useState<number>(3);
  const { width } = useWindowSize();
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

  const getSearchResultProducts = useCallback(() => {
    baseAPI.fetchWithPagination<SearchResType>({ url: searchUrl, page, params: { category, key, priceSort, nameSort } })
      .then((res) => {
        if (res.data.status === 200) {
          setSearchResultProducts(res.data.data);
          loadingContext.done();
        }
      })
      .catch((err) => console.log("err", err))
      .finally(() => {
        loadingContext.done();
      })
  }, [category, key, priceSort, nameSort])

  useEffect(() => {
    getSearchResultProducts();
  }, [getSearchResultProducts])

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }, [page])

  useEffect(() => {
    width < 768 && handleChangeGrid({ multiple: true, one: false })
  }, [width])

  //breadcrumb

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
      text: t(`searchResults.${lang}`),
      className: ""
    },
  ];

  let { items, _meta } = searchResultProducts;

  return (
    <section className="search_result_wrapper">
      <div className="container">
        <div className="search_result_body">
          <Row gutter={[{ lg: 30, md: 20, sm: 10, xs: 10 }, { lg: 30, md: 20, sm: 10, xs: 10 }]}>
            <Col lg={24} xs={24}>
              <div className="search_right_top">
                <div className="breadcrumb_area">
                  <BreadcrumbComp breadcrumbs={breadcrumbs} />
                </div>
                <div className="right_top">
                  <div className="right_top_filter">
                    <button
                      onClick={() => setPriceSort(prev => prev === 3 ? 4 : 3)}
                      type="button"
                      className="by_money"
                    >
                      <img
                        src="/assets/icons/money_filter.svg"
                        alt="monoy_filter"
                      />{" "}
                      <span className="p16_regular">{t(`byPrice.${lang}`)}</span>
                    </button>
                    <button
                      onClick={() => setNameSort(prev => prev === 3 ? 4 : 3)}
                      type="button"
                      className="by_popular"
                    >
                      <i className={`fa-solid fa-arrow-${nameSort === 3 ? "down" : "up"}-a-z`}></i>
                      <span className="p16_regular">{t(`alphabetically.${lang}`)}</span>
                    </button>
                  </div>
                  {items?.length !== 0 && width > 768 &&
                    items?.length !== 0 && (
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
              </div>
            </Col>
            {
              items?.length !== 0 ?
                (
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

                ) : (
                  <Col xs={24}>
                    {t(`noSearchingResult.${lang}`)}
                  </Col>
                )
            }
          </Row>
          {
            items?.length !== 0 && (
              <div className="search_pagination_block">
                {/* <div className="search_showmore_btn">
                    <ShowMoreBtn />
                  </div> */}
                {_meta?.pageCount > 1 && (
                  <PaginationComp {..._meta} page={page} setPage={setPage} />
                )}
              </div>
            )
          }
        </div>
      </div>
    </section>
  );
}

export default SearchResult;
