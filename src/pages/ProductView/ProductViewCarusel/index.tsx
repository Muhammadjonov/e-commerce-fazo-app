import { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Controller, FreeMode, Navigation, Thumbs } from "swiper";
import "./_style.scss";
import LightboxComp from "../../../components/LightboxComp";

interface IProductViewCarusel {
  image: string[];
}

function ProductViewCarusel(props: IProductViewCarusel) {
  const { image } = props;
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  // lightbox 

  const [state, setState] = useState<{
    isOpen: boolean,
    photoIndex: number
  }>({
    isOpen: false,
    photoIndex: 0
  })

  return (
    <div className="product_view_carusel">
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs, Controller]}
        className="mySwiper2"
      >
        {
          image?.map((img, ind) => (
            <SwiperSlide key={ind}>
              <div className="img_body">
                <img
                  onClick={() => setState({ isOpen: true, photoIndex: ind })}
                  src={img} alt={`img${ind}`} />
              </div>
            </SwiperSlide>
          ))
        }
      </Swiper>
      <div className="product_view_bottom">
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          navigation={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs, Controller]}
          className="mySwiper"
          breakpoints={{
            0: {
              slidesPerView: 3,
            },
            576: {
              slidesPerView: 4,
            },
            992: {
              slidesPerView: 3,
            },
            1200: {
              slidesPerView: 4,
            }
          }}
        >
          {
            image?.map((img, ind) => (
              <SwiperSlide key={ind}>
                <div className="img_body">
                  <img src={img} alt={`img${ind}`} />
                </div>
              </SwiperSlide>
            ))
          }
        </Swiper>
      </div>
      <LightboxComp state={state} setState={setState} images={image} />
    </div>
  )
}

export default ProductViewCarusel