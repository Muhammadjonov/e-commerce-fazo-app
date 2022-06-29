import { useCallback, useContext, useEffect, useState } from 'react'
import HeaderBottom from './HeaderBottom';
import HeaderCenter from './HeaderCenter';
import HeaderTop from './HeaderTop';
import { Affix } from "antd";
import "./_style.scss";
import { CategoriesInfoType, CategoriesResType, HeaderInfoType, HeaderResType, HeaderTopMenuInfoType, HeaderTopMenuResType, MenuCategoriesInfoType } from "../../types";
import { categoriesUrl, headerSettingsUrl, headerTopMenuUrl } from "../../api/apiUrls";
import baseAPI from "../../api/baseAPI";
import { LoadingContext } from 'react-router-loading';

interface IHeader {
  menuCategories: MenuCategoriesInfoType
}

function Header(props: IHeader) {
  const { menuCategories } = props;

  const [headerTopMenus, setHeaderTopMenus] = useState<HeaderTopMenuInfoType>([]);
  const [headerSettings, setHeaderSettings] = useState<HeaderInfoType>({} as HeaderInfoType);
  const [isHeaderSettingsLoading, setIsHeaderSettingsLoading] = useState(true);
  const [isHeaderTopMenusLoading, setIsHeaderTopmenusLoading] = useState(true);

  // get categories
  const [categories, setCategories] = useState<CategoriesInfoType>([])
  const [isCategoriesLoading, setIsCategoriesLoading] = useState<boolean>(true);
  // const loadingContext = useContext(LoadingContext);
  const getCategories = useCallback(() => {
    setIsCategoriesLoading(true);
    baseAPI.fetchAll<CategoriesResType>(categoriesUrl)
      .then((res) => {
        if (res.data.status === 200) {
          setCategories(res.data.data);
          setIsCategoriesLoading(false);
        }
      })
      .catch((e) => console.log("err", e))
      .finally(() => {
        setIsCategoriesLoading(false);
      })
  }, [])

  const getHeaderSettings = useCallback(() => {
    setIsHeaderSettingsLoading(true);
    baseAPI.fetchAll<HeaderResType>(headerSettingsUrl)
      .then((res) => {
        if (res.data.status === 200) {
          setHeaderSettings(res.data.data);
          setIsHeaderSettingsLoading(false);
        }
      })
      .catch((e) => console.log("err", e))
      .finally(() => {
        setIsHeaderSettingsLoading(false);
      })
  }, [])

  const getHeaderTopMenus = useCallback(() => {
    setIsHeaderTopmenusLoading(true);
    baseAPI.fetchAll<HeaderTopMenuResType>(headerTopMenuUrl)
      .then((res) => {
        if (res.data.status === 200) {
          setHeaderTopMenus(res.data.data);
          setIsHeaderTopmenusLoading(false);
        }
      })
      .catch((e) => console.log("err", e))
      .finally(() => {
        setIsHeaderTopmenusLoading(false);
      })
  }, [])

  useEffect(() => {
    getHeaderSettings();
    getCategories();
    getHeaderTopMenus();
  }, [getHeaderSettings, getCategories, getHeaderTopMenus])


  return (
    <header className="header">
      {
        !isHeaderTopMenusLoading && !isHeaderSettingsLoading && !isCategoriesLoading && (
          <>
            <HeaderTop {...headerSettings} headerTopMenus={headerTopMenus} />
            <HeaderCenter headerTopMenus={headerTopMenus} categories={categories} {...headerSettings} />
            <HeaderBottom categories={categories} menuCategories={menuCategories} />
          </>
        )
      }
    </header >
  )
}

export default Header