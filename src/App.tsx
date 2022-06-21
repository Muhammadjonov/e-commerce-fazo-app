import { createContext, useCallback, useEffect, useState } from 'react';
import i18next from 'i18next';
import { useLocation, useRoutes } from 'react-router-dom';
import { fallbackLang, languages } from './constants';
import Header from './layout/Header';
import Footer from './layout/Footer';
import routes from './routes';
import { BackTop } from 'antd';
import { useAppSelector } from "./Store/hooks";
import { getAccessToken, setUserToLocalStorage } from "./helpers";
import { fetchUserById } from "./Store/authSlice";
import { MenuCategoriesInfoType, MenuCategoriesResType } from './types';
import { menuCategoriesUrl, profileUrl } from './api/apiUrls';
import baseAPI from './api/baseAPI';
import AuthModal from './components/AuthModal';
import { useDispatch } from 'react-redux';
import { request } from './api/config';
import { setUser, UserResType } from './features/authSlice';

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
  let element = useRoutes(routes)

  let { pathname } = useLocation();

  const auth = useAppSelector(state => state.auth)

  const dispatch = useDispatch();

  useEffect(() => {
    const access_token = getAccessToken();
    if (access_token) {
      request
        .get<UserResType>(profileUrl, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
        .then((res) => {
          dispatch(setUser(res.data));
          setUserToLocalStorage(res.data.data);
        }).catch(e => console.info(e));
    }

    // window.addEventListener("load", function (e) {
    //   let basket = getBasketFromLocalStorage();
    //   if (basket) {
    //     dispatch(setBasket({ data: { ...basket } }));
    //   }
    // });
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  useEffect(() => {
    let token = getAccessToken();
    if (token) {
      fetchUserById(localStorage.getItem('userId') || '0')
    }
  }, [])

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

  // check internet connection

  // const checkInternet = () => {
  //   if (navigator.onLine) {
  //     console.log('online');
  //     setIsOnline(true);
  //   } else {
  //     console.log('offline');
  //     setIsOnline(false);
  //   }
  // }
  // useEffect(() => {
  //   setTimeout(() => {
  //     checkInternet()
  //   }, 5000);
  //   // return () => window.removeEventListener("offline", isOnline);
  // }, [checkInternet])

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
        {element}
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
