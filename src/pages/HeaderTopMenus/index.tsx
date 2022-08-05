import { AlignLeftOutlined, } from '@ant-design/icons';
import { Breadcrumb, Col, Divider, Drawer, Row } from 'antd';
import { useCallback, useEffect, useState, useContext } from 'react';
import { Link, NavLink, Outlet, useLocation, useParams } from 'react-router-dom';
import { LoadingContext } from 'react-router-loading';
import { leftMenuUrl } from '../../api/apiUrls';
import baseAPI from '../../api/baseAPI';
import DrawerOpenBtn from '../../components/Buttons/DrawerOpenBtn';
import { useT } from '../../custom/hooks/useT';
import { LeftMenuInfoType, LeftMenuResType } from '../../types';

import "./_style.scss";

function HeaderTopMenus() {
  const { t, lang } = useT();
  const [leftMenus, setLeftMenus] = useState<LeftMenuInfoType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  let { page_slug } = useParams();
  let { pathname } = useLocation();
  let headerMenu = page_slug!;
  const loadingContext = useContext(LoadingContext);

  const getLeftMenus = useCallback(() => {
    setIsLoading(true);
    baseAPI.fetchAll<LeftMenuResType>(leftMenuUrl)
      .then((res) => {
        if (res.data.status === 200) {
          setLeftMenus(res.data.data);
          setIsLoading(false);
          loadingContext.done()
        }
      })
      .catch((err) => {
        console.log("err", err)
      })
      .finally(() => {
        setIsLoading(false);
        loadingContext.done();
      })
  }, [])

  useEffect(() => {
    getLeftMenus();
  }, [getLeftMenus])

  const [visible, setVisible] = useState<boolean>(false);

  const onClose = () => {
    setVisible(false);
  };
  let breadcr: string | undefined;
  if (pathname === "/page/feedback/contact") {
    breadcr = t(`feedback.${lang}`);
  } else {
    breadcr = leftMenus.find((leftMenu) => leftMenu.slug === headerMenu)?.title
  }

  return (
    <section className="header_top_menus">
      <div className="container">
        <div className="header_top_menus_breadcrumb_area">
          <Breadcrumb
            className='breadcrumb_comp'
            separator={<i className="fa-solid fa-angle-right"></i>}
          >
            <Breadcrumb.Item key={"1"}>
              <Link className="breadcrm_link" to={"/"}>{t(`home.${lang}`)}</Link></Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link className="breadcrm_link" to={`#`}>{breadcr}</Link> </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="header_top_menus__body">
          <Row gutter={[{ lg: 30, md: 20, sm: 10, xs: 10 }, { lg: 30, md: 20, sm: 10, xs: 10 }]}>
            <Col xs={24} lg={5}>
              <DrawerOpenBtn text={t(`information.${lang}`)} setState={setVisible} icon={<AlignLeftOutlined />} />
              <ul className="header_top_menus__body__left">
                {leftMenus.length !== 0 && leftMenus.map((leftMenu) => (
                  <li className="header_top_menus__body__left__item" key={leftMenu.id}>
                    <NavLink
                      className={({ isActive }) => (isActive ? "active" : "") + " header_top_menus__body__left__item__link"}
                      to={`/page/${leftMenu.slug}`}
                    >
                      <img className='header_top_menus__body__left__item__link__img' src={leftMenu.imageUrl} alt={leftMenu.title} />
                      <div className="header_top_menus__body__left__item__link__content">
                        <h4 className="title16_bold header_top_menus__body__left__item__link__content__title">
                          {leftMenu.title}
                        </h4>
                        <p className="header_top_menus__body__left__item__link__content__text">
                          {leftMenu.short_description}
                        </p>
                      </div>
                    </NavLink>
                  </li>
                ))}
                <li className="header_top_menus__body__left__item" >
                  <NavLink className={({ isActive }) => (isActive ? "active" : "") + " header_top_menus__body__left__item__link"} to={`/page/feedback/contact`}>
                    <img className='header_top_menus__body__left__item__link__img' src={"/assets/icons/phone-red.svg"} alt={"feedback"} />
                    <div className="header_top_menus__body__left__item__link__content">
                      <h4 className="title16_bold header_top_menus__body__left__item__link__content__title">
                        {t(`feedback.${lang}`)}
                      </h4>
                      <p className="header_top_menus__body__left__item__link__content__text">
                        {t(`shareYourOpinion.${lang}`)}
                      </p>
                    </div>
                  </NavLink>
                </li>
              </ul>
            </Col>
            <Col xs={24} lg={19}>
              <Outlet />
            </Col>
          </Row>
        </div>
      </div>
      <Drawer
        title={t(`information.${lang}`)}
        placement="left"
        onClose={onClose}
        visible={visible}
        className="header__top__menus__drawer"
      >
        <ul className="header_top_menus__drawer__list">
          {leftMenus.length !== 0 && leftMenus.map((leftMenu) => (
            <li className="header_top_menus__drawer__list__item" key={leftMenu.id}>
              <NavLink className={({ isActive }) => (isActive ? "active" : "") + " header_top_menus__drawer__list__item__link"} to={`/page/${leftMenu.slug}`}>
                {leftMenu.title}
              </NavLink>
              <Divider className="header_top_menus__drawer__list__item__divider" />
            </li>
          ))}
          <li className="header_top_menus__drawer__list__item">
            <NavLink className={({ isActive }) => (isActive ? "active" : "") + " header_top_menus__drawer__list__item__link"} to={`/page/feedback/contact`}>
              {t(`feedback.${lang}`)}
            </NavLink>
            <Divider className="header_top_menus__drawer__list__item__divider" />
          </li>
        </ul>
      </Drawer>
    </section>
  )
}

export default HeaderTopMenus