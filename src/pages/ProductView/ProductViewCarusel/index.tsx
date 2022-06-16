import { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Controller, FreeMode, Navigation, Thumbs } from "swiper";
import "./_style.scss";

const productImgs = [
  {
    id: "1",
    img: "/assets/img/Computer.png"
  },
  {
    id: "2",
    img: "/assets/img/smart_watch.png"
  },
  {
    id: "3",
    img: "/assets/img/Computer.png"
  },
  {
    id: "4",
    img: "/assets/img/smart_watch.png"
  },
  {
    id: "5",
    img: "/assets/img/smart_watch.png"
  },
  {
    id: "6",
    img: "/assets/img/smart_watch.png"
  }
]

function ProductViewCarusel() {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  return (
    <div className="product_view_carusel">
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs, Controller]}
        loop={true}
        className="mySwiper2"
      >
        {
          productImgs.map(img => (
            <SwiperSlide key={img.id}>
              <div className="img_body">
                <img src={img.img} alt="" />
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
          loop={true}
          className="mySwiper"
          breakpoints={{
              0: {
                slidesPerView: 3,
              },
              576: {
                slidesPerView: 4,
              }
            }}
        >
          {
            productImgs.map(img => (
              <SwiperSlide key={img.id}>
                <div className="img_body">
                  <img src={img.img} alt="" />
                </div>
              </SwiperSlide>
            ))
          }
        </Swiper>
      </div>
    </div>
  )
}

export default ProductViewCarusel