import { useState } from 'react';
import MoonLoading from '../../components/Loaders/MoonLoading';
import BrandsCarusel from './BrandsCarosel';
import GoodCheaper from './GoodsCheaper';
import HomeCenterBanner from './HomeCenterBanner';
import HomeHotDeals from './HomeHotDeals';
import HomeTopBanner from './HomeTopBanner'
import PopularCategoriesSlider from './PopularCategoriesSlider';
import Recommended from './Recommended';
import "./_style.scss";

function Home() {
  const [isBannerLoading, setIsBannerLoading] = useState<boolean>(true);
  return (
    <section className="home">
      <HomeTopBanner setIsBannerLoading={setIsBannerLoading} isBannerLoading={isBannerLoading} />
      {
        isBannerLoading ? (
          <MoonLoading />
        )
          : (
            <>
              <HomeHotDeals />
              <PopularCategoriesSlider />
              <HomeCenterBanner />
              <GoodCheaper />
              <Recommended />
              <BrandsCarusel />
            </>
          )
      }

    </section>
  )
}

export default Home