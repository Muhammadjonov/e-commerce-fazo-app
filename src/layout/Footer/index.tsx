import React, { useCallback, useEffect, useState } from 'react';
import LeftBox from './LeftBox';
import { Row, Col } from 'antd';
import './_style.scss';
import { Link } from 'react-router-dom';
import { FooterResType, FooterInfoType, MenuCategoriesInfoType, FooterMenuResType, FooterMenuInfoType } from '../../types';
import baseAPI from "../../api/baseAPI";
import { footerDataUrl, footerMenuUrl } from "../../api/apiUrls";
import { useT } from '../../custom/hooks/useT';

interface IFooter {
  menuCategories: MenuCategoriesInfoType
}

function Footer(props: IFooter) {
  const { t, lang } = useT();
  const { menuCategories } = props;
  const [footerDatas, setFooterDatas] = useState<FooterInfoType>({} as FooterInfoType);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [footerMenus, setFooterMenus] = useState<FooterMenuInfoType>({} as FooterMenuInfoType);

  const getFooterDatas = useCallback(() => {
    setIsLoading(true);
    baseAPI.fetchAll<FooterResType>(footerDataUrl)
      .then((res) => {
        if (res.data.status === 200) {
          setFooterDatas(res.data.data);
          setIsLoading(false);
        }
      })
  }, [])

  const getFooterMenus = useCallback(() => {
    baseAPI.fetchAll<FooterMenuResType>(footerMenuUrl)
      .then((res) => {
        if (res.data.status === 200) {
          setFooterMenus(res.data.data);
        }
      })
  }, [])

  useEffect(() => {
    getFooterDatas();
    getFooterMenus();
  }, [getFooterDatas, getFooterMenus])


  const { menu1, menu2 } = footerMenus;

  const { telegram_url, instagram_url, youtube_url, twitter_url, facebook_url, tik_tok_url, map } = footerDatas;

  return (
    <div className='footer'>
      <div className='container'>
        <Row gutter={[{ lg: 30, md: 20, sm: 10, xs: 10 }, { lg: 30, md: 20, sm: 10, xs: 10 }]}>
          <Col lg={9} md={12} sm={24} xs={24}>
            <LeftBox />
          </Col>
          <Col lg={5} md={12} sm={24} xs={24}>
            <div className="footer_right_wrapper_item">
              <h2 className="title20_bold">{t(`category.${lang}`)}</h2>
              <ul>
                {
                  menuCategories?.map((menuCategory) => (
                    <li key={menuCategory.id}>
                      <Link to={`/category/${menuCategory.slug}`}>{menuCategory.title}</Link>
                    </li>
                  ))
                }
              </ul>
            </div>
          </Col>

          <Col lg={5} md={12} sm={24} xs={24}>
            <div className="footer_right_wrapper_item">
              <h2 className="title20_bold">{t(`general.${lang}`)}</h2>
              <ul>
                {
                  menu1?.map((menu) => (
                    <li key={menu.urlValue}>
                      <Link to={`/page/${menu.urlValue}`}>{menu.name}</Link>
                    </li>
                  ))
                }
                <li>
                  <Link to={`/page/feedback/contact`}>{t(`feedback.${lang}`)}</Link>
                </li>
              </ul>
            </div>
          </Col>
          <Col lg={5} md={12} sm={24} xs={24}>
            <div className="footer_right_wrapper_item">
              <h2 className="title20_bold">{t(`buyers.${lang}`)}</h2>
              <ul>
                {
                  menu2?.map((menu) => (
                    <li key={menu.urlValue}>
                      <Link to={`/page/${menu.urlValue}`}>{menu.name}</Link>
                    </li>
                  ))
                }
              </ul>
            </div>
          </Col>
        </Row>
        <Row gutter={[{ lg: 30, md: 20, sm: 10, xs: 10 }, { lg: 30, md: 20, sm: 10, xs: 10 }]}>
          <Col sm={24} xs={24}>
            <div className='social_links_box'>

              {
                telegram_url === "" ?
                  null : (
                    <a className="social_btn" href={telegram_url} target="_blank" rel="noopener noreferrer"><img className='footer_social_link_icon' src='/assets/icons/telegram.svg' alt='telegram' /></a>
                  )
              }
              {
                instagram_url === "" ?
                  null : (
                    <a className="social_btn" href={instagram_url} target="_blank" rel="noopener noreferrer"><img className='footer_social_link_icon' src='/assets/icons/insta.svg' alt='telegram' /></a>
                  )
              }
              {
                facebook_url === "" ?
                  null : (
                    <a className="social_btn" href={facebook_url} target="_blank" rel="noopener noreferrer"><img className='footer_social_link_icon' src='/assets/icons/fb.svg' alt='facebook' /></a>


                  )
              }
              {
                youtube_url === "" ?
                  null : (
                    <a className="social_btn" href={youtube_url} target="_blank" rel="noopener noreferrer"><img className='footer_social_link_icon' src='/assets/icons/youtube.svg' alt='telegram' /></a>
                  )
              }
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}
export default Footer;