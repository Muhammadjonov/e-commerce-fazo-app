import React, { useCallback, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "./_style.scss";

// import required modules
import { Autoplay, Navigation } from "swiper";
import PopularSliderCard from './PopularSliderCard';
import { RecommendedCategoriesInfoType, RecommendedCategoriesResType } from '../../../types';
import baseAPI from '../../../api/baseAPI';
import { recommendedCategoriesUrl } from '../../../api/apiUrls';


function PopularCategoriesSlider() {
  const [popularCategories, setPopularCategories] = useState<RecommendedCategoriesInfoType>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getPopularCategories = useCallback(() => {
    setIsLoading(true);
    baseAPI.fetchAll<RecommendedCategoriesResType>(recommendedCategoriesUrl)
      .then((res) => {
        setPopularCategories(res.data.data);
        setIsLoading(false);
      })
  }, [])

  useEffect(() => {
    getPopularCategories();
  }, [getPopularCategories])

  return (
    <div className="popular_categories_slider">
      <div className="container">
        <h4 className="title24_bold popular_slider_title">
          Популярные категории
        </h4>
        <div className="slider_wrapper">
          <Swiper
            slidesPerView={4}
            spaceBetween={30}
            navigation={true}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
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
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }}
            modules={[Autoplay, Navigation]}
            className="mySwiper"
          >
            {
              popularCategories.map(popularCategory => (
                <SwiperSlide key={popularCategory.id}>
                  <PopularSliderCard {...popularCategory} />
                </SwiperSlide>
              ))
            }
          </Swiper>
        </div>
      </div>
    </div>
  )
}

export default PopularCategoriesSlider