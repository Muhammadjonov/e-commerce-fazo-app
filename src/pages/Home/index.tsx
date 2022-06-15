import React from 'react'

import BrandsCarusel from './BrandsCarosel';

import GoodCheaper from './GoodsCheaper';
import HomeCenterBanner from './HomeCenterBanner';

import HomeHotDeals from './HomeHotDeals';
import HomeTopBanner from './HomeTopBanner'
import PopularCategoriesSlider from './PopularCategoriesSlider';
import Recommended from './Recommended';
import "./_style.scss";

function Home() {
  return (
    <section className="home">
      <HomeTopBanner />
      <HomeHotDeals />
      <PopularCategoriesSlider />
      <HomeCenterBanner />
      <GoodCheaper />
      <Recommended />
      <BrandsCarusel />
    </section>
  )
}

export default Home