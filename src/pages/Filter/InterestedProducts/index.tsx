import CardsTitleTop from '../../../components/CardsTitleTop';
import ProductCard from '../../../components/ProductCard'
import { ProductType } from '../../../types';
import { Swiper, SwiperSlide } from "swiper/react";

import { FreeMode, Autoplay, Navigation } from "swiper";
import { useT } from '../../../custom/hooks/useT';
import "./_style.scss";

interface IInterestedProduct {
  categoryLikeProducts: ProductType[]
}

function InterestedProduct(props: IInterestedProduct) {
  const { categoryLikeProducts } = props;
  const { t, lang } = useT();

  return (
    <div className="interested_products">
      <CardsTitleTop title={t(`productMayInter.${lang}`)} toUrl="#" isShow={false} />
      <div className="category__interested__swiper">
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
              slidesPerView: 4,
              spaceBetween: 30,
            }
          }}
          spaceBetween={30}
          freeMode={true}
          navigation={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[FreeMode, Autoplay, Navigation]}
          className="mySwiper interested_carusel"
        >
          {
            categoryLikeProducts?.map((product) => (
              <SwiperSlide key={product.id} >
                <ProductCard product={product} />
              </SwiperSlide>
            ))
          }
        </Swiper>
      </div>
    </div>
  )
}

export default InterestedProduct