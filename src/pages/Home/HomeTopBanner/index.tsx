import { useContext, useState, useCallback, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay, EffectFade } from "swiper";
import CategoryButton from '../../../components/CategoryButton';
import { Collapse, Drawer } from 'antd';
import { Link } from 'react-router-dom';
import baseAPI from '../../../api/baseAPI';
import { bannersUrl, categoriesUrl } from '../../../api/apiUrls';
import { BannerInfoType, BannerResType, CategoriesInfoType, CategoriesResType } from '../../../types';
import "./_style.scss";
import useWindowSize from '../../../custom/hooks/useWindowSize';
import { LoadingContext } from "react-router-loading";


const { Panel } = Collapse;

function HomeTopBanner() {
  const [banner, setBanner] = useState<BannerInfoType[]>([]);
  const [isOpenCategoriesDrower, setIsOpenCategoriesDrower] = useState<boolean>(false);
  const { width } = useWindowSize();
  // get categories
  const [categories, setCategories] = useState<CategoriesInfoType>([])
  const [isCategoriesLoading, setIsCategoriesLoading] = useState<boolean>(true);

  // const loadingContext = useContext(LoadingContext);


  const getBanners = useCallback(() => {
    baseAPI.fetchAll<BannerResType>(bannersUrl)
      .then((res) => {
        if (res.data.status === 200) {
          setBanner(res.data.data);

        }
      })
      .catch((err) => console.log("err", err))
      .finally(() => {

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

  const handleOpen = (value: boolean) => setIsOpenCategoriesDrower(value)

  const drowerTitle = (
    <Link
      onClick={() => handleOpen(false)}
      className="logo"
      to={"/"}>
      <img className="logo_img" src="/assets/icons/Logo.svg" alt="logo" />
    </Link>
  )

  return (
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
            // grabCursor={true}
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



          {/* mobile category drower */}
          <Drawer
            title={drowerTitle}
            placement="left"
            onClose={() => handleOpen(false)}
            visible={isOpenCategoriesDrower}
            className="mobile_categories_drower"
          >
            <Collapse
              // defaultActiveKey={['1']}
              accordion
              ghost
              expandIconPosition="end"
            >
              {
                categories.map(category => (
                  <Panel header={<Link to={category.slug}><img src={`/assets/icons/${category.imageUrl}.svg `} alt="icon" /> {category.title}</Link>} key={category.id}>
                    {
                      category.subCategories.map(subcategory => (

                        <Link key={subcategory.id} to={subcategory.slug} onClick={() => handleOpen(false)}>{subcategory.title}</Link>

                      ))
                    }
                  </Panel>
                ))
              }
            </Collapse>
          </Drawer>
        </div>
      </div>
    </div>
  )
}

export default HomeTopBanner