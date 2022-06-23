import { AlignLeftOutlined, BarsOutlined, MoreOutlined } from '@ant-design/icons';
import { Affix, Breadcrumb, Button, Col, Divider, Drawer, Row } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useParams } from 'react-router-dom';
import { leftMenuUrl } from '../../api/apiUrls';
import baseAPI from '../../api/baseAPI';
import DrawerOpenBtn from '../../components/Buttons/DrawerOpenBtn';
import { useT } from '../../custom/hooks/useT';
import { LeftMenuInfoType, LeftMenuResType } from '../../types';

import "./_style.scss";


const breadcrumbs: any = [
  {
    id: "2",
    toUrl: "#",
    text: {
      install: "Покупка в рассрочку",
      b2bsales: "B2B продажи"
    }
  }
]


function HeaderTopMenus() {
  const { t, lang } = useT();
  const [activeKey, setActiveKey] = useState<string>("install");
  const [leftMenus, setLeftMenus] = useState<LeftMenuInfoType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  let { page_slug } = useParams();
  let headerMenu = page_slug!.slice(1)!;

  const getLeftMenus = useCallback(() => {
    setIsLoading(true);
    baseAPI.fetchAll<LeftMenuResType>(leftMenuUrl)
      .then((res) => {
        if (res.data.status === 200) {
          setLeftMenus(res.data.data);
        }
      })
  }, [])

  useEffect(() => {
    getLeftMenus();
  }, [getLeftMenus])

  const [visible, setVisible] = useState<boolean>(false);

  const onClose = () => {
    setVisible(false);
  };

  return (
    <section className="header_top_menus">
      <div className="container">
        <div className="header_top_menus_breadcrumb_area">
          <Breadcrumb
            className='breadcrumb_comp'
            separator={<i className="fa-solid fa-angle-right"></i>}
          >
            <Breadcrumb.Item key={"1"}>
              <Link className="breadcrm_link" to={"/"}>Главная</Link></Breadcrumb.Item>
            {
              breadcrumbs.map((breadcrumb: any) => (
                <Breadcrumb.Item key={breadcrumb.id}>
                  <Link className="breadcrm_link" to={breadcrumb.toUrl}>{breadcrumb.text[headerMenu === activeKey ? headerMenu : activeKey]} </Link> </Breadcrumb.Item>
              ))
            }
          </Breadcrumb>
        </div>
        <div className="header_top_menus__body">
          <Row gutter={[30, 30]}>
            <Col xs={24} lg={5}>
              <DrawerOpenBtn text="Ma'lumot" setState={setVisible} icon={<AlignLeftOutlined />} />
              <ul className="header_top_menus__body__left">
                {leftMenus.length !== 0 && leftMenus.map((leftMenu) => (
                  <li className="header_top_menus__body__left__item" key={leftMenu.id}>
                    <NavLink className={({ isActive }) => (isActive ? "active" : "") + " header_top_menus__body__left__item__link"} to={`/page/${leftMenu.slug}`}>
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
        </ul>
      </Drawer>
    </section>
  )
}

export default HeaderTopMenus