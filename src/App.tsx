import { createContext, useCallback, useEffect, useState } from 'react';
import i18next from 'i18next';
import { useLocation } from 'react-router-dom';
import { Routes, Route } from "react-router-loading"
import { fallbackLang, languages } from './constants';
import Header from './layout/Header';
import Footer from './layout/Footer';
import { BackTop } from 'antd';
import { useAppDispatch, useAppSelector } from "./Store/hooks";
import { getAccessToken, getBasketFromLocalStorage, getCompareLocalStorage, setUserToLocalStorage } from "./helpers";
import { MenuCategoriesInfoType, MenuCategoriesResType } from './types';
import { menuCategoriesUrl, profileUrl } from './api/apiUrls';
import baseAPI from './api/baseAPI';
import AuthModal from './components/AuthModal';
import CartModal from './components/CartModal';
import { request } from './api/config';
import { setUser, UserResType } from './features/authSlice';
import { getFavourites } from './features/favourites/favouritesSlice';
import { setCompare } from './features/Compares/comparesSlice';
import { setBasket } from './features/basket/basketSlice';
// pages
import Filter from './pages/Filter';
import Home from './pages/Home';
import SearchResult from './pages/SearchResult';
import ProductView from './pages/ProductView';
import HeaderTopMenus from './pages/HeaderTopMenus';
import HeaderMenusContent from './pages/HeaderTopMenus/HeaderMenusContent';
import Favourites from './pages/Favourites';
import ProductComparison from './pages/ProductComparison';
import ProfileInfoBody from './pages/Profile/ProfileInfoBody';
import PersonalData from './pages/Profile/PersonalData';
import Checkout from './pages/Checkout';
import PageNotFound from './pages/PageNotFound';
import BestsellerFilter from './pages/BestsellerFilter';
import AllNewCommersProduct from './pages/AllNewCommersProduct';
import Profile from './pages/Profile';
import Feedback from './pages/HeaderTopMenus/Feedback';
import ProtectedCheckout from './pages/Checkout/ProtectedCheckout';
import ProtectedProfile from './pages/Profile/ProtectedProfile';
import OrderHistory from './pages/Profile/OrderHistory';
import ProtectedFavourites from './pages/Favourites/ProtectedFavourites';
import ProtectedSearch from './pages/SearchResult/ProtectedSearch';
import MoonLoading from './components/Loaders/MoonLoading';
import InstallmentModal from './components/InstallmentModal';

type AuthContextType = {
  isOpenSignInModal: boolean;
  isOpenSignUpModal: boolean;
  onOpenSignUpModal: () => void;
  onCloseSignUpModal: () => void;
  onOpenSignInModal: () => void;
  onCloseSignInModal: () => void;
};

type CartContextType = {
  isOpenCartModal: boolean;
  onOpenCartModal: () => void;
  onCloseCartModal: () => void;
}
type MobileCategoriesContextType = {
  isOpenMobileCategories: boolean;
  onOpenMobileCategories: () => void;
  onCloseMobileCategories: () => void;
}

export type InstallmentDataType = {
  alifMonthId: number,
  alifAmount: number,
  alifMonth: number,
  intendMonth: number,
  installment: string
}

type InstallmentModalContextType = {
  isOpenInstallmentModal: boolean;
  onCloseInstallmentModal: () => void;
  setIsOpenInstallmentModal: React.Dispatch<React.SetStateAction<boolean>>,
  installmentData: InstallmentDataType,
  setInstallmentData: React.Dispatch<React.SetStateAction<InstallmentDataType>>
}

export const AuthContext = createContext({} as AuthContextType);
export const CartContext = createContext({} as CartContextType);
export const MobileCategoriesContext = createContext({} as MobileCategoriesContextType);
export const InstallmentModalContext = createContext({} as InstallmentModalContextType);

function App() {
  const [isProfileLoading, setIsProfileLoading] = useState<boolean>();
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
    let basket = getBasketFromLocalStorage();
    let compare = getCompareLocalStorage();
    if (compare) {
      dispatch(setCompare({ data: { ...compare } }))
    }
    // window.addEventListener("load", function (e) {
    if (basket) {
      dispatch(setBasket({ data: { ...basket } }));
    }
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

  // cart

  const [isOpenCartModal, setIsOpenCartModal] = useState<boolean>(false);
  const [isOpenMobileCategories, setIsOpenMobileCategories] = useState<boolean>(false);

  const onOpenCartModal = () => {
    setIsOpenCartModal(true);
  }
  const onCloseCartModal = () => {
    setIsOpenCartModal(false);
  }

  const cartContextValue = {
    isOpenCartModal,
    onOpenCartModal,
    onCloseCartModal
  }
  // mobilecategory

  const onOpenMobileCategories = () => {
    setIsOpenMobileCategories(true);
  }
  const onCloseMobileCategories = () => {
    setIsOpenMobileCategories(false);
  }

  const mobileCategoriesContextValue = {
    isOpenMobileCategories,
    onOpenMobileCategories,
    onCloseMobileCategories
  }

  // installmentModal context
  const [installmentData, setInstallmentData] = useState<InstallmentDataType>({} as InstallmentDataType);
  const [isOpenInstallmentModal, setIsOpenInstallmentModal] = useState<boolean>(false);
  const onCloseInstallmentModal = () => setIsOpenInstallmentModal(false);

  const installmentModalContextValue = {
    isOpenInstallmentModal,
    onCloseInstallmentModal,
    setIsOpenInstallmentModal,
    installmentData,
    setInstallmentData
  }

  return (
    <AuthContext.Provider value={contextValue}>
      <CartContext.Provider value={cartContextValue}>
        <MobileCategoriesContext.Provider value={mobileCategoriesContextValue}>
          <InstallmentModalContext.Provider value={installmentModalContextValue}>
            <div className="mixel_wrapper">
              <Header menuCategories={menuCategories} />
              {
                !isProfileLoading ? (
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="category/:category_slug" element={<Filter />} loading />
                    <Route path="more-products/:products_url" element={<BestsellerFilter />} loading />
                    <Route path="more-products/newcommers" element={<AllNewCommersProduct />} loading />
                    <Route path="search" element={
                      <ProtectedSearch>
                        <SearchResult />
                      </ProtectedSearch>
                    } loading />
                    <Route path="product/detail/:product_slug" element={<ProductView />} loading />
                    <Route path="page" element={<HeaderTopMenus />} loading>
                      <Route path=":page_slug" element={<HeaderMenusContent />} loading />
                      <Route path="feedback/contact" element={<Feedback />} />
                    </Route>
                    <Route
                      path="favourites"
                      element={
                        <ProtectedFavourites>
                          <Favourites />
                        </ProtectedFavourites>
                      }
                      loading
                    />
                    <Route path="balance" element={<ProductComparison />} loading />
                    <Route path="profile" element={
                      <ProtectedProfile>
                        <Profile />
                      </ProtectedProfile>

                    } >
                      <Route index element={<ProfileInfoBody />} />
                      <Route path="personal-data" element={<PersonalData />} />
                      <Route path="order-history" element={<OrderHistory />} loading />
                    </Route>
                    <Route path="checkout" element={
                      <ProtectedCheckout>
                        <Checkout />
                      </ProtectedCheckout>

                    } />
                    <Route path="*" element={<PageNotFound />} />
                  </Routes>
                ) : (
                  <MoonLoading />
                )
              }

              <Footer menuCategories={menuCategories} />
              <BackTop className="fazo__back__top" />
              <AuthModal
                isOpenSignUp={isOpenSignUpModal}
                isOpenSignIn={isOpenSignInModal}
                onCloseSignUpModal={onCloseSignUpModal}
                onCloseSignInModal={onCloseSignInModal}
              />
              <CartModal
                isOpenCart={isOpenCartModal}
                onCloseCartModal={onCloseCartModal}
                onOpenCartModal={onOpenCartModal}
              />
              <InstallmentModal
                isOpenInstallmentModal={isOpenInstallmentModal}
                onCloseInstallmentModal={onCloseInstallmentModal}
                installmentData={installmentData}
                setInstallmentData={setInstallmentData}
              />
            </div>
          </InstallmentModalContext.Provider>
        </MobileCategoriesContext.Provider>
      </CartContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
