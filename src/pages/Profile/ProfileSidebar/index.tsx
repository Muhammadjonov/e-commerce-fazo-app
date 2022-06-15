import React from 'react'
import ProfileSidebarItem, { IProfileSidebarItem } from './ProfileSidebarItem';
import "./_style.scss";

interface IProfileSidebar {
  profileSidebarData: IProfileSidebarItem[]
}

const ProfileSidebar = (props: IProfileSidebar) => {

  return (
    <ul className="profile_sidebar">
      {
        props.profileSidebarData.map(sidebar => (
          <ProfileSidebarItem {...sidebar} key={sidebar.id} />
        ))
      }
    </ul>
  )
}

export default ProfileSidebar