import { Col, Row } from 'antd';
import React, { useCallback, useContext, useEffect, useState } from 'react'
import BreadcrumbComp from '../../components/BreadcrumbComp';
import FavoriteProductCard from './FavoriteProductCard';
import "./_style.scss";
import { FavouritesType, removeAllFavourites } from '../../features/favourites/favouritesSlice';
import baseAPI from '../../api/baseAPI';
import { getFavouritesUrl } from '../../api/apiUrls';
import { LoadingContext } from 'react-router-loading';
import { ProductType } from '../../types';
import { useAppDispatch, useAppSelector } from '../../Store/hooks';
import EmptyFavourites from './EmptyFavourites';
import PaginationComp from '../../components/PaginationComp';
import { useT } from '../../custom/hooks/useT';

const breadcrumbs = [
  {
    id: "1",
    toUrl: "/",
    text: "Главная",
  },
  {
    id: "2",
    toUrl: "#",
    text: "Изброанное",
  }
];
type FavouritesResType = {
  status: number,
  message: string,
  data: ProductType[]
}
const Favorites = () => {
  const { t, lang } = useT();
  const [page, setPage] = useState<number>(1);
  let slicePage = (page - 1) * 20;
  // const [favourites, setFavourites] = useState<FavouritesType>([]);
  const loadingContext = useContext(LoadingContext);
  const { data: favourites, loading } = useAppSelector(
    (store) => store.favourites
  );
  // const getFavourites = useCallback(() => {

  //   baseAPI.fetchAll<FavouritesResType>(getFavouritesUrl)
  //     .then((res) => {
  //       if (res.data.status === 200) {
  //         setFavourites(res.data?.data);
  //         loadingContext.done();
  //       }
  //     })
  // }, [])

  // useEffect(() => {
  //   getFavourites();
  // }, [getFavourites])

  useEffect(() => {
    !loading && loadingContext.done();
  }, [loading])

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }, [page])

  let page_count = Math.ceil(favourites.length / 20);

  if (page_count < page) {
    setPage(prev => prev - 1)
  }


  const dispatch = useAppDispatch();

  const deleteAllFavourites = () => dispatch(removeAllFavourites())

  return (
    <section className="favorites">
      <div className="container">
        <div className="favorite_breadcrumb_area">
          <BreadcrumbComp breadcrumbs={breadcrumbs} />
          {
            favourites.length !== 0 &&
            <button
              type='button'
              className="delete_all_favorites"
              onClick={deleteAllFavourites}
            >
              {t(`deleteAll.${lang}`)}
            </button>
          }
        </div>
        <div className="favorites_body">
          <h4 className="title20_bold favorite_title">
            {t(`favorite.${lang}`)}
          </h4>
          {
            favourites.length !== 0 ? (
              <>
                <Row gutter={[30, 30]}>
                  {
                    favourites.slice(slicePage, slicePage + 20).map((favourite) => (
                      <Col lg={6} md={8} sm={12} xs={24} key={favourite.id}>
                        <FavoriteProductCard {...favourite} />
                      </Col>
                    ))
                  }
                </Row>
                {
                  Math.ceil(favourites.length / 20) > 1 && (
                    <PaginationComp pageCount={page_count} totalCount={favourites.length} page={page} setPage={setPage} />
                  )
                }
              </>
            ) : (
              <EmptyFavourites />
            )
          }

        </div>
      </div>
    </section>
  )
}

export default Favorites