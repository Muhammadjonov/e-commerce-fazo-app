import React, { useCallback, useContext, useEffect, useState } from 'react'
import "./_style.scss";
import { Swiper, SwiperSlide } from 'swiper/react';

import { Navigation, Autoplay, EffectFade } from "swiper";
import HomeCenterBannerCard from './HomeCenterBannerCard';
import { PromotionInfoType, PromotionsResType } from '../../../types';
import baseAPI from '../../../api/baseAPI';
import { promotionsUrl } from '../../../api/apiUrls';
import { LoadingContext } from 'react-router-loading';


function HomeCenterBanner() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [promotions, setPromotions] = useState<PromotionInfoType>([])
  // const loadingContext = useContext(LoadingContext);

  const getPromotions = useCallback(() => {
    baseAPI.fetchAll<PromotionsResType>(promotionsUrl)
      .then(((res) => {
        if (res.data.status === 200) {
          setPromotions(res.data.data);
          setIsLoading(false);

        }
      }))
      .catch((err) => {
        console.log("err", err)
      })
      .finally(() => {

      })
  }, [])

  useEffect(() => {
    getPromotions();
  }, [getPromotions])


  return (
    <div className="home_center_banner">
      <div className="container">
        <div className="center_banner_wrapper">
          <Swiper
            // effect={"fade"}
            // navigation={true}
            grabCursor={true}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            modules={[EffectFade, Navigation, Autoplay]}
          >
            {
              promotions.map((promotion) => (
                <SwiperSlide key={promotion.id}>
                  <HomeCenterBannerCard {...promotion} />
                </SwiperSlide>
              ))
            }
          </Swiper>
        </div>
      </div>
    </div>
  )
}

export default HomeCenterBanner