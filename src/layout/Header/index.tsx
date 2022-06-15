import { useCallback, useEffect, useState } from 'react'
import HeaderBottom from './HeaderBottom';
import HeaderCenter from './HeaderCenter';
import HeaderTop from './HeaderTop';
import { Affix } from "antd";
import "./_style.scss";
import { useAppSelector } from "../../Store/hooks";
import { CategoriesInfoType, CategoriesResType, HeaderInfoType, HeaderResType, MenuCategoriesInfoType } from "../../types";
import { categoriesUrl, headerSettingsUrl } from "../../api/apiUrls";
import baseAPI from "../../api/baseAPI";

interface IHeader {
  menuCategories: MenuCategoriesInfoType
}

function Header(props: IHeader) {
  const { menuCategories } = props;
  const { data: user } = useAppSelector(state => state.auth);

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

  useEffect(() => {
    getHeaderSettings();
    getCategories();
  }, [getHeaderSettings, getCategories])

  const { logo, phone } = headerSettings;

  return (
    <header className="header">
      {user?.name}
      <HeaderTop {...headerSettings} />
      {/* <Affix offsetTop={0}> */}
      <HeaderCenter categories={categories} {...headerSettings} />
      {/* </Affix> */}
      <HeaderBottom categories={categories} menuCategories={menuCategories} />
    </header>
  )
}

export default Header