import { useContext, useState, useCallback, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay, EffectFade } from "swiper";
import CategoryButton from '../../../components/CategoryButton';
import baseAPI from '../../../api/baseAPI';
import { bannersUrl, categoriesUrl } from '../../../api/apiUrls';
import { BannerInfoType, BannerResType, CategoriesInfoType, CategoriesResType, HeaderInfoType, HeaderResType } from '../../../types';
import { MobileCategoriesContext } from '../../../App';
import "./_style.scss";

interface IHomeTopBanner {
  setIsBannerLoading: React.Dispatch<React.SetStateAction<boolean>>,
  isBannerLoading: boolean
}

function HomeTopBanner(props: IHomeTopBanner) {
  const { setIsBannerLoading, isBannerLoading } = props;
  const [banner, setBanner] = useState<BannerInfoType[]>([]);

  // get categories
  const [categories, setCategories] = useState<CategoriesInfoType>([])
  const [isCategoriesLoading, setIsCategoriesLoading] = useState<boolean>(true);

  const mobileCategoriesContext = useContext(MobileCategoriesContext);


  const getBanners = useCallback(() => {
    setIsBannerLoading(true);
    baseAPI.fetchAll<BannerResType>(bannersUrl)
      .then((res) => {
        if (res.data.status === 200) {
          setBanner(res.data.data);
          setIsBannerLoading(false);
        }
      })
      .catch((err) => console.log("err", err))
      .finally(() => {
        setIsBannerLoading(false);
      })
  }, [])

  const getCategories = useCallback(() => {
    setIsCategoriesLoading(true);
    baseAPI.fetchAll<CategoriesResType>(categoriesUrl)
      .then((res) => {
        if (res.data.status === 200) {
          setCategories(res.data.data);
          setIsCategoriesLoading(false);
        }
      })
  }, [])


  useEffect(() => {
    getBanners();
    getCategories();
  }, [getBanners, getCategories])


  const handleOpen = (value: boolean) => {
    if (value) {
      mobileCategoriesContext.onOpenMobileCategories();
    } else {
      mobileCategoriesContext.onCloseMobileCategories();
    }
  }

  return (
    !isBannerLoading ? (
      <div className="home_top_banner">
        <div className="container">
          <div className="banner_wrapper">
            <Swiper
              slidesPerView={1}
              pagination={{
                clickable: true,
              }}
              effect={"fade"}
              navigation={true}
              loop={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              modules={[EffectFade, Pagination, Navigation, Autoplay]}
            >
              {
                banner.map((item) => (
                  <SwiperSlide key={item.id}>
                    <a className='banner__link' href={item.url} target="_blank" rel="noopener noreferrer">
                      <img
                        className='banner__link__img'
                        src={item.imageUrl}
                        alt="home banner"
                      />
                    </a>
                  </SwiperSlide>
                ))
              }

            </Swiper>
          </div>
          <div className="mobile_open_categories">
            <span onClick={() => handleOpen(true)}>
              <CategoryButton />
            </span>
          </div>
        </div>
      </div>
    ) : null
  )
}

export default HomeTopBanner