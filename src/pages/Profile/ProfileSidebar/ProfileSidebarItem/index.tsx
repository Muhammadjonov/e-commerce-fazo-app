import { Avatar } from 'antd';
import React from 'react'
import { Link } from 'react-router-dom';

export interface IProfileSidebarItem {
  id: string,
  text: string,
  img: string
}

const ProfileSidebarItem = (props: IProfileSidebarItem) => {

  const { text, img, id } = props;

  return (
    <Link
      to="#"
      className="profile_sidebar_item"
    >
      <Avatar className="profile_avatar" size={50} icon={<img src={img} alt="user" />} /> <div className="sidebar_item_body">
        <p dangerouslySetInnerHTML={{ __html: text }}>
        </p>
      </div>
    </Link>
  )
}

export default ProfileSidebarItem