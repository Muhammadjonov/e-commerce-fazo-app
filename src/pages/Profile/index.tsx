import { Col, Row } from 'antd';
import React from 'react'
import { Outlet } from 'react-router-dom';
import BreadcrumbComp from '../../components/BreadcrumbComp';
import ProfileSidebar from './ProfileSidebar';
import "./_style.scss";

const breadcrumbs = [
  {
    id: 1,
    toUrl: "/",
    text: "Главная",
  },
  {
    id: 2,
    toUrl: "#",
    text: "Личный кобинет",
  },
];

const profileSidebarData = [
  {
    id: "1",
    text: `Shukurillo Tojonazarov <br/>
    +998 99 0333848`,
    img: '/assets/icons/user.svg'
  },
  {
    id: "2",
    text: "Мои рассрочки",
    img: '/assets/icons/personal_cart.svg'
  }
]


const Profile = () => {
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