import { useCallback, useContext, useEffect, useState } from "react";
import { Col, Row, Collapse, Slider, Checkbox, Drawer } from "antd";
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import ProductCard from "../../components/ProductCard";
import ShowMoreBtn from "../../components/Buttons/ShowMoreBtn";
import PaginationComp from "../../components/PaginationComp";
import InterestedProduct from "./InterestedProducts";
import PopularModels from "./PopularModels";
import WhereBuying from "./WhereBuying";
import BreadcrumbComp from "../../components/BreadcrumbComp";
import ProductCountComp from "../../components/ProductCountComp";
import ProductCardCol from "../../components/ProductCardCol";
import { ByCategoryProductsInfoType, ByCategoryProductsResType, RecommendedCategoriesInfoType, RecommendedCategoriesResType } from "../../types";
import baseAPI from "../../api/baseAPI";
import { byCategoriesProductUrl, recommendedCategoriesUrl } from "../../api/apiUrls";
import { useLocation, useParams } from "react-router-dom";
import { useT } from "../../custom/hooks/useT";
import EmptyFilteredResult from "./EmplyFilteredResult";
import useWindowSize from "../../custom/hooks/useWindowSize";
import DrawerOpenBtn from "../../components/Buttons/DrawerOpenBtn";
import { AlignLeftOutlined } from "@ant-design/icons";
import { LoadingContext } from "react-router-loading";
import "./_style.scss";

const { Panel } = Collapse;


type GridType = {
  multiple: boolean;
  one: boolean;
};

function Filter() {
  const [byCategoryProducts, setByCategoryProducts] = useState<ByCategoryProductsInfoType>({} as ByCategoryProductsInfoType);
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


  const { brands, category, characters, maxPrice: max_price, minPrice: min_price, products, subCategory, categoryLikeProducts } = byCategoryProducts;

  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [filter, setFilter] = useState<any>([] as any);
  const [brandId, setBrandId] = useState<CheckboxValueType[]>([]);
  let newObj = {} as any;
  characters?.map(item => item.assigns.map(subItem => subItem.value)).forEach(el => el.forEach(subEl => newObj[subEl] = false))
  console.log("new", newObj)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<any>({
    defaultValues: newObj
  });
  const onSubmit: SubmitHandler<any> = (items) => {
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

  // productlarni olish
  let { category_slug } = useParams();

  const getProducts = useCallback(() => {
    setIsLoading(true);
    baseAPI.fetchWithPagination<ByCategoryProductsResType>({ url: byCategoriesProductUrl, page, params: { key: category_slug, maxPrice, minPrice, filter, brandId, priceSort, nameSort }, per_page: perPage })
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
  }, [page, category_slug, filter, perPage, priceSort, nameSort]);

  const getProductss = useCallback(() => {
    baseAPI.fetchWithPagination<ByCategoryProductsResType>({ url: byCategoriesProductUrl, page, params: { key: category_slug, } })
      .then((res) => {
        if (res.data.status === 200) {
          setMinPrice(res.data?.data?.minPrice);
          setMaxPrice(res.data?.data?.maxPrice);
        }
      })
      .catch((err) => {
        console.log("err", err);
      })
  }, [category_slug]);

  // getPopularCategories

  // get menuCategories
  const [popularCategories, setPopularCategories] = useState<RecommendedCategoriesInfoType>([])

  const getPopularCategories = useCallback(() => {
    // setIsLoading(true);
    baseAPI.fetchAll<RecommendedCategoriesResType>(recommendedCategoriesUrl)
      .then((res) => {
        if (res.data.status === 200) {
          setPopularCategories(res.data?.data);
          loadingContext.done();
          // setIsLoading(false);
        }
      })
  }, [])

  useEffect(() => {
    getPopularCategories();
  }, [getPopularCategories])


  useEffect(() => {
    getProducts();
  }, [getProducts])

  useEffect(() => {
    getProductss()
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

  useEffect(() => {
    setPage(1)
  }, [priceSort, nameSort, maxPrice, minPrice, filter])

  const handleBrandChange = (checkedValues: CheckboxValueType[]) => {
    setBrandId(checkedValues);
  }

  const handleMaxMinChange = (values: [number, number]) => {
    setMinPrice(values[0].toString());
    setMaxPrice(values[1].toString());
  }

  const handleMinPrice = (e: any) => {
    let newValue = e.target.value.replace(/[^0-9]+/g, '')
    setMinPrice(newValue);
  }
  const handleMaxPrice = (e: any) => {
    let newValue = e.target.value.replace(/[^0-9]+/g, '')
    setMaxPrice(newValue);
  }

  const handleChangePerPage = () => {
    setPerPage(prev => prev + 24);
  }
  // filter drawer

  const handleOpen = (value: boolean) => setIsOpenFilterDrawer(value)

  // generate breadcrumbs

  const generateBreadcrumbs = () => {
    return [
      {
        id: "1",
        toUrl: "/",
        text: t(`home.${lang}`),
        className: ""
      },
      {
        id: "2",
        toUrl: "#",
        text: category?.title,
        className: ""
      },
      {
        id: "3",
        toUrl: `/category/${subCategory?.slug}`,
        text: subCategory?.title,
        className: ""
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
          <Row gutter={[{ lg: 30, md: 20, sm: 10, xs: 10 }, { lg: 30, md: 20, sm: 10, xs: 10 }]}>
            <Col lg={5} sm={0} xs={0}>
              {/* <h3 className="title20_bold" onClick={clearassignFilter}>Clear</h3> */}
              <form className="filter_form" onSubmit={handleSubmit(onSubmit)}>
                <Collapse
                  defaultActiveKey={["1"]}
                  ghost
                  expandIconPosition="end"
                >
                  <Panel
                    header={<p className="p18_regular">{t(`price.${lang}`)} ({t(`sum.${lang}`)})</p>}
                    key="1"
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
                          // {...register("maxPrice")}
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
                        header={<p className="p18_regular">{t(`brand.${lang}`)}</p>}
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
                      <Panel
                        header={<p className="p18_regular">{character.name}</p>}
                        key={character.id}
                      >
                        {
                          character?.assigns?.map((assign) => (
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
                  }
                </Collapse>
                <button type='submit' className="filter_submit_btn">
                  {t(`view.${lang}`)}
                </button>
              </form>
            </Col>

            <Col lg={19} sm={24} xs={24}>
              <Row gutter={[{ lg: 30, md: 20, sm: 10, xs: 10 }, { lg: 30, md: 20, sm: 10, xs: 10 }]}>
                <Col sm={24} xs={24}>
                  <div className="right_top">
                    <div className="right_top_filter">
                      {
                        width < 992 && (
                          <DrawerOpenBtn setState={setIsOpenFilterDrawer} icon={<AlignLeftOutlined />} text={t(`filter.${lang}`)} />
                        )
                      }
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
                {
                  products?.items.length !== 0 ? (
                    grid.multiple
                      ? products?.items.map((product) => (
                        <Col lg={6} md={8} sm={12} xs={24} key={product.id}>
                          <ProductCard product={product} />
                        </Col>
                      ))
                      : products?.items.map((product) => (
                        <Col sm={24} xs={24} key={product.id}>
                          <ProductCardCol product={product} />
                        </Col>
                      ))
                  ) : (
                    <EmptyFilteredResult />
                  )
                }
              </Row>

              {
                products?._meta?.pageCount > 1 &&
                (<div className="button_area ">
                  <ShowMoreBtn onChange={handleChangePerPage} />
                </div>)
              }

              <PaginationComp {...products?._meta} page={page} setPage={setPage} />

              <PopularModels popularCategories={popularCategories} />
              <InterestedProduct categoryLikeProducts={categoryLikeProducts} />
              {/* <WhereBuying /> */}
            </Col>
          </Row>
        </div>
      </div>
      {/* filter drawer  */}
      <Drawer
        title={t(`filter.${lang}`)}
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
              header={<p className="p18_regular">{t(`price.${lang}`)} ({t(`sum.${lang}`)})</p>}
              key="1"
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
                <Slider
                  className="max_min_slider"
                  range
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
                  header={<p className="p18_regular">{t(`price.${lang}`)}</p>}
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
                <Panel
                  header={<p className="p18_regular">{character.name}</p>}
                  key={character.id}
                >
                  {character?.assigns?.length !== 0 &&
                    character?.assigns?.map((assign) => (
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
            }
          </Collapse>
          <button type='submit' className="filter_submit_btn">
            {t(`view.${lang}`)}
          </button>
        </form>
      </Drawer>
    </section >
  );
}

export default Filter;
