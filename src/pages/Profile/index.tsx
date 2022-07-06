import { Col, Row } from 'antd';
import React from 'react'
import { Outlet } from 'react-router-dom';
import BreadcrumbComp from '../../components/BreadcrumbComp';
import { useT } from '../../custom/hooks/useT';
import { useAppSelector } from '../../Store/hooks';
import ProfileSidebar from './ProfileSidebar';
import "./_style.scss";



const Profile = () => {
  const { t, lang } = useT();
  const breadcrumbs = [
    {
      id: "1",
      toUrl: "/",
      text: t(`home.${lang}`),
    },
    {
      id: "2",
      toUrl: "#",
      text: t(`personalCabinet.${lang}`),
    }
  ];

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
    {
      id: "2",
      text: t(`myInstallments.${lang}`),
      img: '/assets/icons/personal_cart.svg',
      toUrl: "#"
    },
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

        <Row gutter={[30, 30]}>
          <Col lg={6}>
            <ProfileSidebar profileSidebarData={profileSidebarData} />
          </Col>
          <Col lg={18}>
            <Row gutter={[30, 30]}>
              <Outlet />
            </Row>
          </Col>
        </Row>
      </div>
    </section>
  )
}

export default Profile