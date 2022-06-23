// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import "./_style.scss";

import { FreeMode, Autoplay, Navigation } from "swiper";
import { Link } from "react-router-dom";
import { Card } from "antd";
import { useCallback, useContext, useEffect, useState } from "react";
import { BrandInfoType, BrandsResType } from "../../../types";
import baseAPI from "../../../api/baseAPI";
import { brandsUrl } from "../../../api/apiUrls";
import { LoadingContext } from "react-router-loading";


function BrandsCarusel() {

  const [brands, setBrands] = useState<BrandInfoType>([] as BrandInfoType)
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const loadingContext = useContext(LoadingContext);

  const getBrands = useCallback(() => {
    setIsLoading(true);
    baseAPI.fetchAll<BrandsResType>(brandsUrl)
      .then((res) => {
        if (res.data.status === 200) {
          setBrands(res.data.data);
          setIsLoading(false);
          loadingContext.done();
        }
      })
  }, [])

  useEffect(() => {
    getBrands();
  }, [getBrands])

  return (
    <div className="BrandsCarusel_wrapper">
      <div className="container brands_container">
        <div className="BrandsCarousel_title_navigation">
          <h2 className="title24_bold BrandsCarusel_title">Бренды</h2>
        </div>
        <div className="brand_slider_wrapper">
          <Swiper
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              320: {
                slidesPerView: 1,
                spaceBetween: 15,
              },
              576: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 25,
              },
              992: {
                slidesPerView: 5,
                spaceBetween: 30,
              },
            }}
            slidesPerView={5}
            spaceBetween={30}
            freeMode={true}
            navigation={true}
            grabCursor={true}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[FreeMode, Autoplay, Navigation]}
            className="mySwiper brandsSwiper"
          >
            {
              brands.map((brand) => (
                <SwiperSlide key={brand.id} >
                  <Card bordered={false} hoverable>
                    <Link
                      to={"#"}
                      className="BrandsCarusel_img_wrapper">
                      <img src={brand.imageUrl} alt={brand.name} />
                    </Link>
                  </Card>
                </SwiperSlide>
              ))
            }


          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default BrandsCarusel;
