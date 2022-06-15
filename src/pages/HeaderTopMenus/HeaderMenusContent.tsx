import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { oneLeftMenuUrl } from '../../api/apiUrls';
import baseAPI from '../../api/baseAPI';
import { LeftMenuInfoType, OneLeftMenuResType } from '../../types';

const HeaderMenusContent = () => {
  let { page_slug } = useParams();
  page_slug = page_slug?.slice(1);
  const [onePage, setOnePage] = useState<LeftMenuInfoType>({} as LeftMenuInfoType);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getOnePage = useCallback(() => {
    setIsLoading(true);
    baseAPI.fetchWithParams<OneLeftMenuResType>(oneLeftMenuUrl, { key: page_slug })
      .then((res) => {
        if (res.data.status === 200) {
          setOnePage(res.data.data);
          setIsLoading(false);
        }
      })
  }, [page_slug])

  useEffect(() => {
    getOnePage();
  }, [getOnePage])

  return (
    <div className="header_top_menus__body__content" dangerouslySetInnerHTML={{ __html: onePage.content }}></div>
  )
}

export default HeaderMenusContent