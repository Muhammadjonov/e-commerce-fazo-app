import { Avatar } from 'antd';
import React from 'react'
import { Link } from 'react-router-dom';
import "./_style.scss";

interface IProfileSidebar {
  profileSidebarData: {
    id: string,
    text: string,
    img: string,
    toUrl: string
  }[]
}

const ProfileSidebar = (props: IProfileSidebar) => {

  return (
    <ul className="profile__sidebar">
      {
        props.profileSidebarData.map((sidebar) => (
          <Link
            to={sidebar.toUrl}
            className="profile__sidebar__item"
          >
            <Avatar className="profile_avatar" size={50} icon={<img src={sidebar.img} alt={sidebar.text} />} /> <div className="profile__sidebar__item__body">
              <p dangerouslySetInnerHTML={{ __html: sidebar.text }}>
              </p>
            </div>
          </Link>
        ))
      }
    </ul>
  )
}

export default ProfileSidebar