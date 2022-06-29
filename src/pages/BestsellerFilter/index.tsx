import { useCallback, useContext, useEffect, useState } from "react";
import { Col, Row, Collapse, Slider, Checkbox, Drawer } from "antd";
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import ProductCard from "../../components/ProductCard";
import ShowMoreBtn from "../../components/Buttons/ShowMoreBtn";
import PaginationComp from "../../components/PaginationComp";
import BreadcrumbComp from "../../components/BreadcrumbComp";
import ProductCountComp from "../../components/ProductCountComp";
import ProductCardCol from "../../components/ProductCardCol";
import { MoreProductsInfoType, MoreProductsResType, RecommendedCategoriesInfoType, RecommendedCategoriesResType } from "../../types";
import baseAPI from "../../api/baseAPI";
import { moreProductsUrl, recommendedCategoriesUrl } from "../../api/apiUrls";
import { useLocation, useParams } from "react-router-dom";
import "./_style.scss";
import { useT } from "../../custom/hooks/useT";
import useWindowSize from "../../custom/hooks/useWindowSize";
import DrawerOpenBtn from "../../components/Buttons/DrawerOpenBtn";
import { AlignLeftOutlined } from "@ant-design/icons";
import { LoadingContext } from "react-router-loading";
import PopularModels from "../Filter/PopularModels";
import EmptyFilteredResult from "../Filter/EmplyFilteredResult";

const { Panel } = Collapse;


type GridType = {
  multiple: boolean;
  one: boolean;
};

function BestsellerFilter() {
  const [byCategoryProducts, setByCategoryProducts] = useState<MoreProductsInfoType>({} as MoreProductsInfoType);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(24);
  const [priceSort, setPriceSort] = useState<number>(3);
  const [nameSort, setNameSort] = useState<number>(3);
  const loadingContext = useContext(LoadingContext);

  const [grid, setGrid] = useState<GridType>({
    multiple: true,
    one: false,
  });
  const [isOpenFilterDrawer, setIsOpenFilterDrawer] = useState<boolean>(false);

  let { pathname } = useLocation();
  const { t, lang } = useT()
  const { width } = useWindowSize();


  const { brands, characters, maxPrice: max_price, minPrice: min_price, products, categoryLikeProducts } = byCategoryProducts;

  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [filter, setFilter] = useState<any>([] as any);
  const [brandId, setBrandId] = useState<CheckboxValueType[]>([]);
  let newObj = {} as any;
  // characters?.map(item => item.assigns.map(subItem => subItem.value)).forEach(el => el.forEach(subEl => newObj[subEl] = false))
  // console.log("new", newObj)

  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<any>({
    defaultValues: newObj
  });
  const onSubmit: SubmitHandler<any> = (items) => {
    console.log("items", items)
    let filtered = Object.keys(items).filter(item => items[item])
    setFilter(filtered);
  };

  // grid ni o'zgartirish logikasi

  const handleChangeGrid = (grid: GridType) => {
    setGrid((prev) => ({
      ...prev,
      ...grid,
    }));
  };

  // price lar ni o'zgartirish logikasi

  let unformattedMinPrice = minPrice?.replace(/\s/g, '')
  let unformattedMaxPrice = maxPrice?.replace(/\s/g, '')

  // productlarni olish
  let { products_url } = useParams();

  const getProducts = useCallback(() => {
    setIsLoading(true);
    baseAPI.fetchWithPagination<MoreProductsResType>({ url: moreProductsUrl + products_url, page, params: { maxPrice: unformattedMaxPrice, minPrice: unformattedMinPrice, filter, brandId, priceSort, nameSort }, per_page: perPage })
      .then((res) => {
        if (res.data.status === 200) {
          setByCategoryProducts(res.data.data);
          setIsLoading(false);
          loadingContext.done();
        }
      })
      .catch((err) => {
        console.log("err", err);
      })
  }, [page, products_url, filter, perPage, priceSort, nameSort]);

  const getProductss = useCallback(() => {
    setIsLoading(true);
    baseAPI.fetchWithPagination<MoreProductsResType>({ url: moreProductsUrl + products_url, page, params: { maxPrice: unformattedMaxPrice, minPrice: unformattedMinPrice, filter, brandId, priceSort, nameSort }, per_page: perPage })
      .then((res) => {
        if (res.data.status === 200) {
          setByCategoryProducts(res.data?.data);
          setIsLoading(false);
          loadingContext.done();
          setMaxPrice(res.data?.data?.maxPrice);
          setMinPrice(res.data?.data?.minPrice);
        }
      })
      .catch((err) => {
        console.log("err", err);
      })
  }, [products_url]);

  // getPopularCategories

  // get menuCategories
  const [popularCategories, setPopularCategories] = useState<RecommendedCategoriesInfoType>([])

  const getPopularCategories = useCallback(() => {
    // setIsLoading(true);
    baseAPI.fetchAll<RecommendedCategoriesResType>(recommendedCategoriesUrl)
      .then((res) => {
        if (res.data.status === 200) {
          setPopularCategories(res.data.data);
          loadingContext.done();
          // setIsLoading(false);
        }
      })
  }, [])

  useEffect(() => {
    getPopularCategories();
  }, [getPopularCategories])

  useEffect(() => {
    getPopularCategories();
  }, [getPopularCategories])


  useEffect(() => {
    getProducts();
  }, [getProducts])

  useEffect(() => {
    getProductss();
  }, [getProductss])

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }, [page])

  useEffect(() => {
    width < 768 && handleChangeGrid({ multiple: true, one: false })
  }, [width])

  const handleBrandChange = (checkedValues: CheckboxValueType[]) => {
    setBrandId(checkedValues);
  }

  const handleMaxMinChange = (values: [number, number]) => {
    // setMinPrice(formatPrice(values[0]));
    // setMaxPrice(formatPrice(values[1]));
    setMinPrice(values[0].toString());
    setMaxPrice(values[1].toString());
  }

  const handleMinPrice = (e: any) => {
    let newValue = e.target.value.replace(/[^0-9]+/g, '')
    // setMinPrice(formatPrice(newValue));
    setMinPrice(newValue);
  }
  const handleMaxPrice = (e: any) => {
    let newValue = e.target.value.replace(/[^0-9]+/g, '')
    // setMaxPrice(formatPrice(newValue));
    setMaxPrice(newValue);
  }

  const handleChangePerPage = () => {
    setPerPage(prev => prev + 24);
  }
  console.log("perpa", perPage)
  // filter drawer

  const handleOpen = (value: boolean) => setIsOpenFilterDrawer(value)



  // generate breadcrumbs

  const generateBreadcrumbs = () => {
    return [
      {
        id: "1",
        toUrl: "/",
        text: "Главная",
      },
      {
        id: "2",
        toUrl: "#",
        text: products_url === "recommended-view" ? "Рекомендуем" : "Товары дешевле"
      }
    ]
  }

  const clearassignFilter = () => {
    reset();
  }

  return (
    <section className="filter_wrapper">
      <div className="container">
        <div className="filter_breadcrumb_area">
          <BreadcrumbComp breadcrumbs={generateBreadcrumbs()} />
          <ProductCountComp total={products?._meta?.totalCount} perCount={products?._meta?.perPage < products?._meta?.totalCount ? products?._meta?.perPage : products?._meta?.totalCount} />
        </div>

        <div className="filter_body">
          <Row gutter={[30, 30]}>
            <Col lg={5} sm={0} xs={0}>
              {/* <h3 className="title20_bold" onClick={clearassignFilter}>Clear</h3> */}
              <form className="filter_form" onSubmit={handleSubmit(onSubmit)}>
                <Collapse
                  defaultActiveKey={["0"]}
                  ghost
                  expandIconPosition="end"
                >
                  <Panel
                    header={<p className="p18_regular">Цена ({t(`sum.${lang}`)})</p>}
                    key="0"
                  >
                    <div className='slider_filter'>
                      <div className="top">
                        <input
                          className="min_price"
                          value={minPrice}
                          name="minPrice"
                          onChange={handleMinPrice}
                          autoComplete="off"
                        />
                        <input
                          className="max_price"
                          value={maxPrice}
                          name="maxPrice"
                          onChange={handleMaxPrice}
                          autoComplete="off"
                        />
                      </div>
                      {
                        min_price && max_price && (
                          <Slider
                            className="max_min_slider"
                            range
                            min={+min_price ?? 0}
                            max={+max_price ?? 1000000}
                            value={[+minPrice, +maxPrice]}
                            tipFormatter={null}
                            onChange={handleMaxMinChange}
                          />
                        )
                      }

                    </div>
                  </Panel>
                  {
                    brands && brands?.length !== 0 && (
                      <Panel
                        header={<p className="p18_regular">Бренд</p>}
                        key="1"
                      >
                        <Checkbox.Group onChange={handleBrandChange}>
                          {
                            brands?.map((brand) => (
                              <div
                                className="checkbox_filter"
                                key={brand.id}
                              >
                                <Checkbox
                                  className='checkbox_filter'
                                  value={brand.id}
                                >
                                  {brand.name}
                                  <span
                                    className="count"
                                  >
                                    ({brand.productCount})
                                  </span>
                                </Checkbox>
                              </div>
                            ))
                          }
                        </Checkbox.Group>
                      </Panel>
                    )
                  }

                  {
                    characters?.map((character) => (
                      character.length !== 0 &&
                      character?.map((items) => (
                        <Panel
                          header={<p className="p18_regular">{items.name}</p>}
                          key={items.id}
                        >
                          {
                            items?.assigns?.map((assign) => (
                              <div
                                className="checkbox_filter"
                                key={assign.id}
                              >
                                <Controller
                                  name={assign.value}
                                  control={control}
                                  render={({ field }) => (
                                    <Checkbox
                                      {...field}
                                      className='checkbox_filter'
                                    >
                                      {assign.value}
                                    </Checkbox>
                                  )}
                                />
                              </div>
                            ))
                          }
                        </Panel>
                      ))
                    ))
                  }
                </Collapse>
                <button type='submit' className="filter_submit_btn">
                  Показать
                </button>
              </form>
            </Col>

            <Col lg={19} sm={24} xs={24}>
              {
                products?.items.length !== 0 ? (
                  <>
                    <Row gutter={[30, 30]}>
                      <Col sm={24} xs={24}>
                        <div className="right_top">
                          <div className="right_top_filter">
                            {/* filter drawer  */}

                            {
                              width < 992 && (
                                <DrawerOpenBtn setState={setIsOpenFilterDrawer} icon={<AlignLeftOutlined />} />
                              )
                            }

                            <Drawer
                              title={<></>}
                              placement="left"
                              onClose={() => handleOpen(false)}
                              visible={isOpenFilterDrawer}
                              className="mobile__filter__drawer"
                            >
                              <form className="filter_form" onSubmit={handleSubmit(onSubmit)}>
                                <Collapse
                                  defaultActiveKey={["1"]}
                                  ghost
                                  expandIconPosition="end"
                                >
                                  <Panel
                                    header={<p className="p18_regular">Цена ({t(`sum.${lang}`)})</p>}
                                    key="1"
                                  >
                                    <div className='slider_filter'>
                                      <div className="top">
                                        <input
                                          className="min_price"
                                          value={minPrice}
                                          name="minPrice"
                                          onChange={handleMinPrice}
                                          // {...register("minPrice")}
                                          autoComplete="off"
                                        />
                                        <input
                                          className="max_price"
                                          value={maxPrice}
                                          name="maxPrice"
                                          onChange={handleMaxPrice}
                                          // {...register("maxPrice")}
                                          autoComplete="off"
                                        />
                                      </div>
                                      <Slider
                                        className="max_min_slider"
                                        range
                                        defaultValue={[+min_price, +max_price]}
                                        min={+min_price ?? 0}
                                        max={+max_price ?? 1000000}
                                        value={[+minPrice, +maxPrice]}
                                        tipFormatter={null}
                                        onChange={handleMaxMinChange}
                                      />
                                    </div>
                                  </Panel>
                                  {
                                    brands && brands?.length !== 0 && (
                                      <Panel
                                        header={<p className="p18_regular">Бренд</p>}
                                        key="2"
                                      >
                                        <Checkbox.Group onChange={handleBrandChange}>
                                          {
                                            brands?.map((brand) => (
                                              <div
                                                className="checkbox_filter"
                                                key={brand.id}
                                              >
                                                <Checkbox
                                                  className='checkbox_filter'
                                                  value={brand.id}
                                                >
                                                  {brand.name}
                                                  <span
                                                    className="count"
                                                  >
                                                    ({brand.productCount})
                                                  </span>
                                                </Checkbox>
                                              </div>
                                            ))
                                          }
                                        </Checkbox.Group>
                                      </Panel>
                                    )
                                  }
                                  {
                                    characters?.map((character) => (
                                      character?.map((items) => (
                                        <Panel
                                          header={<p className="p18_regular">{items.name}</p>}
                                          key={items.id}
                                        >
                                          {
                                            items?.assigns?.map((assign) => (
                                              <div
                                                className="checkbox_filter"
                                                key={assign.id}
                                              >
                                                <Controller
                                                  name={assign.value}
                                                  control={control}
                                                  render={({ field }) => (
                                                    <Checkbox
                                                      {...field}
                                                      className='checkbox_filter'
                                                    >
                                                      {assign.value}
                                                    </Checkbox>
                                                  )}
                                                />
                                              </div>
                                            ))
                                          }
                                        </Panel>
                                      ))
                                    ))
                                  }
                                </Collapse>
                                <button type='submit' className="filter_submit_btn">
                                  Показать
                                </button>
                              </form>
                            </Drawer>



                            <button
                              onClick={() => setPriceSort(prev => prev === 3 ? 4 : 3)}
                              type="button"
                              className="by_money"
                            >
                              <img
                                src="/assets/icons/money_filter.svg"
                                alt="monoy_filter"
                              />{" "}
                              <span className="p16_regular">По цене</span>
                            </button>
                            <button
                              onClick={() => setNameSort(prev => prev === 3 ? 4 : 3)}
                              type="button"
                              className="by_popular"
                            >
                              <i className={`fa-solid fa-arrow-${nameSort === 3 ? "down" : "up"}-a-z`}></i>
                              <span className="p16_regular">По алфавиту</span>
                            </button>
                          </div>

                          {width > 768 && (
                            <div className="right_top_change_grid">
                              <button type='button' onClick={() => handleChangeGrid({ multiple: true, one: false })}>
                                <img src={`/assets/icons/${grid.multiple ? "red_grid_multiple" : "grid_multiple"}.svg`} alt="grid_multiple" />
                              </button>

                              <button type='button' onClick={() => handleChangeGrid({ multiple: false, one: true })}>
                                <img src={`/assets/icons/${grid.multiple ? "grid_one" : "red_grid_one"}.svg`} alt="grid_one" />
                              </button>
                            </div>
                          )}
                        </div>
                      </Col>

                      {grid.multiple
                        ? products?.items.map((product) => (
                          <Col lg={6} md={8} sm={12} xs={24} key={product.id}>
                            <ProductCard product={product} />
                          </Col>
                        ))
                        : products?.items.map((product) => (
                          <Col sm={24} xs={24} key={product.id}>
                            <ProductCardCol {...product} />
                          </Col>
                        ))}
                    </Row>

                    {
                      products?._meta?.pageCount > 1 &&
                      (<div className="button_area ">
                        <ShowMoreBtn onChange={handleChangePerPage} />
                      </div>)
                    }

                    <PaginationComp {...products?._meta} page={page} setPage={setPage} />

                    <PopularModels popularCategories={popularCategories} />
                    {/* <InterestedProduct categoryLikeProducts={categoryLikeProducts} /> */}
                  </>
                ) : (
                  <EmptyFilteredResult />
                )
              }

              {/* <WhereBuying /> */}
            </Col>
          </Row>
        </div>
      </div>
    </section>
  );
}

export default BestsellerFilter;
