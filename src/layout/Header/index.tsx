import { useCallback, useEffect, useState } from 'react'
import HeaderBottom from './HeaderBottom';
import HeaderCenter from './HeaderCenter';
import HeaderTop from './HeaderTop';
import { Affix } from "antd";
import "./_style.scss";
import { CategoriesInfoType, CategoriesResType, HeaderInfoType, HeaderResType, HeaderTopMenuInfoType, HeaderTopMenuResType, MenuCategoriesInfoType } from "../../types";
import { categoriesUrl, headerSettingsUrl, headerTopMenuUrl } from "../../api/apiUrls";
import baseAPI from "../../api/baseAPI";

interface IHeader {
  menuCategories: MenuCategoriesInfoType
}

function Header(props: IHeader) {
  const { menuCategories } = props;

  const [headerTopMenus, setHeaderTopMenus] = useState<HeaderTopMenuInfoType>([]);
  const [headerSettings, setHeaderSettings] = useState<HeaderInfoType>({} as HeaderInfoType);
  const [isHeaderSettingsLoading, setIsHeaderSettingsLoading] = useState(true);

  // get categories
  const [categories, setCategories] = useState<CategoriesInfoType>([])
  const [isCategoriesLoading, setIsCategoriesLoading] = useState<boolean>(true);

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

  const getHeaderSettings = useCallback(() => {
    setIsHeaderSettingsLoading(true);
    baseAPI.fetchAll<HeaderResType>(headerSettingsUrl)
      .then((res) => {
        if (res.data.status === 200) {
          setHeaderSettings(res.data.data);
          setIsHeaderSettingsLoading(false);
        }
      })
  }, [])

  const getHeaderTopMenus = useCallback(() => {
    baseAPI.fetchAll<HeaderTopMenuResType>(headerTopMenuUrl)
      .then((res) => {
        if (res.data.status === 200) {
          setHeaderTopMenus(res.data.data);
        }
      })
  }, [])

  useEffect(() => {
    getHeaderSettings();
    getCategories();
    getHeaderTopMenus();
  }, [getHeaderSettings, getCategories, getHeaderTopMenus])


  return (
    <header className="header">
      <HeaderTop {...headerSettings} headerTopMenus={headerTopMenus} />
      {/* <Affix offsetTop={0}> */}
      <HeaderCenter headerTopMenus={headerTopMenus} categories={categories} {...headerSettings} />
      {/* </Affix> */}
      <HeaderBottom categories={categories} menuCategories={menuCategories} />
    </header >
  )
}

export default Header