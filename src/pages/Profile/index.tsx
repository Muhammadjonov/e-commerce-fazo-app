import { AlignLeftOutlined } from '@ant-design/icons';
import { Col, Divider, Drawer, Row } from 'antd';
import React, { useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import BreadcrumbComp from '../../components/BreadcrumbComp';
import DrawerOpenBtn from '../../components/Buttons/DrawerOpenBtn';
import { useT } from '../../custom/hooks/useT';
import { useAppSelector } from '../../Store/hooks';
import ProfileSidebar from './ProfileSidebar';
import "./_style.scss";



const Profile = () => {
  const { t, lang } = useT();
  let { pathname } = useLocation();
  let bread2: any = {
    "/profile/order-history": t(`onlineOrders.${lang}`),
    "/profile": t(`personalCabinet.${lang}`)
  }
  const breadcrumbs = [
    {
      id: "1",
      toUrl: "/",
      text: t(`home.${lang}`),
      className: ""
    },
    {
      id: "2",
      toUrl: "#",
      text: bread2[pathname],
      className: ""
    }
  ];

  const [visible, setVisible] = useState<boolean>(false);

  const onClose = () => {
    setVisible(false);
  };

  const { user } = useAppSelector(state => state.auth)

  const { first_name, last_name, username, } = user;

  const profileSidebarData = [
    {
      id: "1",
      text: `${first_name} ${last_name} <br/>
      +${username}`,
      img: '/assets/icons/user.svg',
      toUrl: "/profile"
    },
    // {
    //   id: "2",
    //   text: t(`myInstallments.${lang}`),
    //   img: '/assets/icons/personal_cart.svg',
    //   toUrl: "#"
    // },
    {
      id: "3",
      text: t(`onlineOrders.${lang}`),
      img: '/assets/icons/clock.svg',
      toUrl: "/profile/order-history"
    }
  ]
  return (
    <section className='profile'>
      <div className="container">
        <div className="profile_breadcrumb_area">
          <BreadcrumbComp breadcrumbs={breadcrumbs} />
        </div>

        <Row gutter={[{ lg: 30, md: 20, sm: 10, xs: 10 }, { lg: 30, md: 20, sm: 10, xs: 10 }]}>
          <Col lg={6} xs={24}>
            <ProfileSidebar profileSidebarData={profileSidebarData} />
            <DrawerOpenBtn text={t(`information.${lang}`)} setState={setVisible} icon={<AlignLeftOutlined />} />
          </Col>
          <Col lg={18} md={24} sm={24} xs={24}>
            <Row gutter={[{ lg: 30, md: 20, sm: 10, xs: 10 }, { lg: 30, md: 20, sm: 10, xs: 10 }]}>
              <Outlet />
            </Row>
          </Col>
        </Row>
      </div>
      <Drawer
        title={t(`information.${lang}`)}
        placement="left"
        onClose={onClose}
        visible={visible}
        className="profile__drawer"
      >
        <ul className="profile__drawer__list">
          {
            profileSidebarData.map((data) => (
              <li
                className="profile__drawer__list__item"
                key={data.id}
              >
                <NavLink className={({ isActive }) => (isActive ? "active" : "") + " profile__drawer__list__item__link"} to={data.toUrl}>
                  <span dangerouslySetInnerHTML={{ __html: data.text }} />
                </NavLink>
                <Divider className="header_top_menus__drawer__list__item__divider" />
              </li>
            ))
          }
        </ul>
      </Drawer>
    </section>
  )
}

export default Profile