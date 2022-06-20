import { createContext, useCallback, useEffect, useState } from 'react';
import i18next from 'i18next';
import { useLocation, useRoutes } from 'react-router-dom';
import { fallbackLang, languages } from './constants';
import Header from './layout/Header';
import Footer from './layout/Footer';
import routes from './routes';
import { BackTop } from 'antd';
import { useAppSelector } from "./Store/hooks";
import { getAccessToken } from "./helpers";
import { fetchUserById } from "./Store/authSlice";
import { MenuCategoriesInfoType, MenuCategoriesResType } from './types';
import { menuCategoriesUrl } from './api/apiUrls';
import baseAPI from './api/baseAPI';
import AuthModal from './components/AuthModal';

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
