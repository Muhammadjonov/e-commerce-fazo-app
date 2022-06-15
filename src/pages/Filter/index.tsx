import { useCallback, useEffect, useState } from "react";
import { Col, Row, Collapse, Slider, Checkbox } from "antd";
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import CheckBoxFilter from "../../components/Form/CheckBoxFilter";
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
import { ByCategoryProductsInfoType, ByCategoryProductsResType } from "../../types";
import baseAPI from "../../api/baseAPI";
import { byCategoriesProductUrl } from "../../api/apiUrls";
import { useLocation, useParams } from "react-router-dom";
import "./_style.scss";
import { formatPrice } from "../../helpers";

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

  const [grid, setGrid] = useState<GridType>({
    multiple: true,
    one: false,
  });
  let { pathname } = useLocation();

  const { brands, category, characters, maxPrice: max_price, minPrice: min_price, products, subCategory } = byCategoryProducts;

  const [minPrice, setMinPrice] = useState<string>(min_price);
  const [maxPrice, setMaxPrice] = useState<string>(max_price);
  const [filter, setFilter] = useState<any>([] as any);
  const [brandId, setBrandId] = useState<CheckboxValueType[]>([])
  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<any>({

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

  // price lar ni o'zgartirish logikasi

  let unformattedMinPrice = minPrice?.replace(/\s/g, '')
  let unformattedMaxPrice = maxPrice?.replace(/\s/g, '')

  // productlarni olish
  let { category_slug } = useParams();
  category_slug = category_slug!.slice(1);
  const getProducts = useCallback(() => {
    setIsLoading(true);
    baseAPI.fetchWithPagination<ByCategoryProductsResType>({ url: byCategoriesProductUrl, page, params: { key: category_slug, maxPrice: unformattedMaxPrice, minPrice: unformattedMinPrice, filter, brandId }, per_page: perPage })
      .then((res) => {
        setByCategoryProducts(res.data.data);
        setIsLoading(false);
      })
  }, [page, category_slug, filter, perPage]);

  useEffect(() => {
    getProducts();
  }, [getProducts])

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }, [page])

  useEffect(() => {
    reset();
    setMaxPrice("");
    setMinPrice("");
  }, [pathname])

  useEffect(() => {
    setMaxPrice(max_price);
    setMinPrice(min_price);
  }, [])

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

  // generate breadcrumbs

  const generateBreadcrumbs = () => {
    return [
      {
        id: 1,
        toUrl: "/",
        text: "Главная",
      },
      {
        id: category?.id,
        toUrl: "#",
        text: category?.title
      },
      {
        id: subCategory?.id,
        toUrl: `/category/:${subCategory?.slug}`,
        text: subCategory?.title
      }
    ]
  }

  return (
    <section className="filter_wrapper">
      <div className="container">
        <div className="filter_breadcrumb_area">
          <BreadcrumbComp breadcrumbs={generateBreadcrumbs()} />
          <ProductCountComp total={products?._meta?.totalCount} perCount={products?._meta?.perPage} />
        </div>

        <div className="filter_body">
          <Row gutter={[30, 30]}>
            <Col lg={5}>
              {/* <h3 className="title20_bold">Смартфоны в Ташкенте</h3> */}
              <form className="filter_form" onSubmit={handleSubmit(onSubmit)}>
                <Collapse
                  defaultActiveKey={["1"]}
                  ghost
                  expandIconPosition="right"
                >
                  <Panel
                    header={<p className="p18_regular">Цена (cум)</p>}
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
                  Показать
                </button>
              </form>
            </Col>

            <Col lg={19}>
              <Row gutter={[30, 30]}>
                <Col sm={24} xs={24}>
                  <div className="right_top">
                    <div className="right_top_filter">
                      <button type="button" className="by_money">
                        <img
                          src="/assets/icons/money_filter.svg"
                          alt="monoy_filter"
                        />{" "}
                        <span className="p16_regular">По цене</span>
                      </button>
                      <button type="button" className="by_popular">
                        <img
                          src="/assets/icons/filter_bars.svg"
                          alt="filter_bars"
                        />
                        <span className="p16_regular">По популярности</span>
                      </button>
                    </div>

                    <div className="right_top_change_grid">
                      <button type='button' onClick={() => handleChangeGrid({ multiple: true, one: false })}>
                        <img src={`/assets/icons/${grid.multiple ? "red_grid_multiple" : "grid_multiple"}.svg`} alt="grid_multiple" />
                      </button>
                      <button type='button' onClick={() => handleChangeGrid({ multiple: false, one: true })}>
                        <img src={`/assets/icons/${grid.multiple ? "grid_one" : "red_grid_one"}.svg`} alt="grid_one" />
                      </button>
                    </div>
                  </div>
                </Col>

                {grid.multiple
                  ? products?.items.map((product) => (
                    <Col lg={6} key={product.id}>
                      <ProductCard {...product} />
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

              <PopularModels />
              {/* <InterestedProduct /> */}

              {/* <WhereBuying /> */}
            </Col>
          </Row>
        </div>
      </div>
    </section>
  );
}

export default Filter;
