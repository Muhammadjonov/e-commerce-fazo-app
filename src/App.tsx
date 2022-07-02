import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import i18next from 'i18next';
import { useLocation } from 'react-router-dom';
import { Routes, Route, LoadingContext } from "react-router-loading"
import { fallbackLang, languages } from './constants';
import Header from './layout/Header';
import Footer from './layout/Footer';
import { BackTop } from 'antd';
import { useAppDispatch, useAppSelector } from "./Store/hooks";
import { getAccessToken, setUserToLocalStorage } from "./helpers";
import { MenuCategoriesInfoType, MenuCategoriesResType } from './types';
import { menuCategoriesUrl, profileUrl } from './api/apiUrls';
import baseAPI from './api/baseAPI';
import AuthModal from './components/AuthModal';
import { request } from './api/config';
import { setUser, UserResType } from './features/authSlice';
// pages
import Filter from './pages/Filter';
import Home from './pages/Home';
import SearchResult from './pages/SearchResult';
import ProductView from './pages/ProductView';
import HeaderTopMenus from './pages/HeaderTopMenus';
import HeaderMenusContent from './pages/HeaderTopMenus/HeaderMenusContent';
import Favorites from './pages/Favorites';
import ProductComparison from './pages/ProductComparison';
import ProfileInfoBody from './pages/Profile/ProfileInfoBody';
import PersonalData from './pages/Profile/PersonalData';
import Checkout from './pages/Checkout';
import PageNotFound from './pages/PageNotFound';
import BestsellerFilter from './pages/BestsellerFilter';
import AllNewCommersProduct from './pages/AllNewCommersProduct';
import Profile from './pages/Profile';
import { setLoading } from './features/loading/loadingSlice';
import { getFavourites } from './features/favourites/favouritesSlice';

type AuthContextType = {
  isOpenSignInModal: boolean;
  isOpenSignUpModal: boolean;
  onOpenSignUpModal: () => void;
  onCloseSignUpModal: () => void;
  onOpenSignInModal: () => void;
  onCloseSignInModal: () => void;
};

export const AuthContext = createContext({} as AuthContextType);

function App() {
  const [isOnline, setIsOnline] = useState<boolean>(false);
  const [isProfileLoading, setIsProfileLoading] = useState<boolean>();
  // let element = useRoutes(routes)
  const loadingContext = useContext(LoadingContext);
  let { pathname } = useLocation();

  const auth = useAppSelector(state => state.auth);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const access_token = getAccessToken();
    if (access_token) {
      setIsProfileLoading(true);
      request
        .get<UserResType>(profileUrl, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
        .then((res) => {
          dispatch(setUser(res.data));
          setUserToLocalStorage(res.data.data);
        }).catch(e => {
          console.info(e);
          setIsProfileLoading(false);
        })
        .finally(() => {
          setIsProfileLoading(false);
        })
        ;
    } else {
      setIsProfileLoading(false);
    }
    // window.addEventListener("load", function (e) {
    //   let basket = getBasketFromLocalStorage();
    //   if (basket) {
    //     dispatch(setBasket({ data: { ...basket } }));
    //   }
    // });
  }, [dispatch]);

  useEffect(() => {
    if (auth.authorized) {
      dispatch(getFavourites());
    }
  }, [auth]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  useEffect(() => {
    let currentLang = localStorage.getItem("language");

    if (!currentLang) {
      localStorage.setItem("language", fallbackLang);
    } else if (languages.includes(currentLang)) {
      i18next.changeLanguage(currentLang);
    }

  }, []);

  // get menuCategories
  const [menuCategories, setMenuCategories] = useState<MenuCategoriesInfoType>([])

  const getMenuCategories = useCallback(() => {
    baseAPI.fetchAll<MenuCategoriesResType>(menuCategoriesUrl)
      .then((res) => {
        if (res.data.status === 200) {
          setMenuCategories(res.data.data);
        }
      })
  }, [])

  useEffect(() => {
    getMenuCategories();
  }, [getMenuCategories])

  // auth context
  const [isOpenSignInModal, setIsOpenSignInModal] = useState<boolean>(false);
  const [isOpenSignUpModal, setIsOpenSignUpModal] = useState<boolean>(false);

  const onOpenSignInModal = () => {
    setIsOpenSignInModal(true);
  };
  const onCloseSignInModal = () => {
    setIsOpenSignInModal(false);
  };
  const onOpenSignUpModal = () => {
    setIsOpenSignUpModal(true);
  };
  const onCloseSignUpModal = () => {
    setIsOpenSignUpModal(false);
  };

  const contextValue = {
    isOpenSignUpModal,
    onOpenSignUpModal,
    onCloseSignUpModal,
    isOpenSignInModal,
    onOpenSignInModal,
    onCloseSignInModal,
  };


  return (
    <AuthContext.Provider value={contextValue}>
      <div className="mixel_wrapper">
        <Header menuCategories={menuCategories} />
        {/* {element} */}
        <Routes>
          <Route path="/" element={<Home />} loading />
          <Route path="category/:category_slug" element={<Filter />} loading />
          <Route path="more-products/:products_url" element={<BestsellerFilter />} loading />
          <Route path="more-products/newcommers" element={<AllNewCommersProduct />} loading />
          <Route path="search" element={<SearchResult />} loading />
          <Route path="product/detail/:product_slug" element={<ProductView />} loading />
          <Route path="page" element={<HeaderTopMenus />} >
            <Route path=":page_slug" element={<HeaderMenusContent />} loading />
          </Route>
          <Route path="favorites" element={<Favorites />} />
          <Route path="balance" element={<ProductComparison />} />
          <Route path="profile" element={<Profile />} >
            <Route index element={<ProfileInfoBody />} />
            <Route path="personal-data" element={<PersonalData />} />
          </Route>
          <Route path="checkout" element={<Checkout />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        {/* ) : (<div style={{ height: "400px" }}> */}

        <Footer menuCategories={menuCategories} />
        <BackTop className="fazo__back__top" />
        <AuthModal
          isOpenSignUp={isOpenSignUpModal}
          isOpenSignIn={isOpenSignInModal}
          onCloseSignUpModal={onCloseSignUpModal}
          onCloseSignInModal={onCloseSignInModal}
        />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
