import { useCallback, useEffect, useState } from "react";
import { Col, Row, Collapse } from "antd";

import { useForm, SubmitHandler } from "react-hook-form";
import "./_style.scss";
import ProductCard from "../../components/ProductCard";
import PaginationComp from "../../components/PaginationComp";
import BreadcrumbComp from "../../components/BreadcrumbComp";
import ProductCardCol from "../../components/ProductCardCol";
import ShowMoreBtn from "../../components/Buttons/ShowMoreBtn";
import { useSearchParams } from "react-router-dom";
import baseAPI from "../../api/baseAPI";
import { SearchInfoType, SearchResType } from "../../types";
import { searchUrl } from "../../api/apiUrls";

const { Panel } = Collapse;

type Inputs = {
  example: string;
  exampleRequired: string;
};

type GridType = {
  multiple: boolean;
  one: boolean;
};

const breadcrumbs = [
  {
    id: 1,
    toUrl: "/",
    text: "Главная",
  },
  {
    id: 2,
    toUrl: "#",
    text: "Результаты поиска",
  },
];

function SearchResult() {
  const [searchParams] = useSearchParams();
  let category = searchParams.get("category");
  let key = searchParams.get("key");
  const [searchResultProducts, setSearchResultProducts] = useState<SearchInfoType>({} as SearchInfoType);
  const [page, setPage] = useState<number>(1);


  const [grid, setGrid] = useState<GridType>({
    multiple: true,
    one: false,
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);


  // grid ni o'zgartirish logikasi

  const handleChangeGrid = (grid: GridType) => {
    setGrid((prev) => ({
      ...prev,
      ...grid,
    }));
  };

  const getSearchResultProducts = useCallback(() => {
    baseAPI.fetchWithPagination<SearchResType>({ url: searchUrl, page, params: { category, key } })
      .then((res) => {
        if (res.data.status === 200) {
          setSearchResultProducts(res.data.data);
        }
      })
  }, [category, key])

  useEffect(() => {
    getSearchResultProducts();
  }, [getSearchResultProducts])

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }, [page])

  let { items, _links, _meta } = searchResultProducts;

  return (
    <section className="search_result_wrapper">
      <div className="container">
        <div className="search_result_body">
          <Row gutter={[30, 30]}>
            <Col lg={30}>
              <Row gutter={[30, 30]}>
                <Col sm={24} xs={24}>
                  <div className="search_right_top">
                    <div className="breadcrumb_area">
                      <BreadcrumbComp breadcrumbs={breadcrumbs} />
                    </div>
                    {
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
                </Col>
                {
                  items?.length !== 0 ?
                    (
                      grid.multiple
                        ? items?.map((product) => (
                          <Col lg={6} md={8} sm={12} xs={24} key={product.id}>
                            <ProductCard {...product} />
                          </Col>
                        ))
                        : items?.map((product) => (
                          <Col sm={24} xs={24} key={product.id}>
                            <ProductCardCol {...product} />
                          </Col>
                        ))

                    ) : (
                      <Col xs={24}>
                        Qidiruv bo'yicha hech narsa topilmadi
                      </Col>
                    )
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

export default SearchResult;
