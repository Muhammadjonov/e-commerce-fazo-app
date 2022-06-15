import React, { useState } from 'react';
import { Divider, Drawer } from 'antd';

import "./_style.scss";

interface IMobileHeaderMenus {
  setActiveKey: React.Dispatch<React.SetStateAction<string>>,
  headerMenusTabsData: any,
  activeKey: string
}

const MobileHeaderMenus = (props: IMobileHeaderMenus) => {

  const { setActiveKey, headerMenusTabsData, activeKey } = props;

  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };


  const handleActiveKey = (activeKey: string) => {
    setActiveKey(activeKey);
    onClose();
  }

  return (
    <div className="mobile_header_menus">

      <button className="open_drawer_btn" type='button' onClick={showDrawer}>Информация</button>

      <div className="mobile_header_menus_content">
        {
          headerMenusTabsData.find((tabData: any) => tabData.key === activeKey)["component"]
        }
      </div>

      <Drawer
        title="Информация"
        placement={"left"}
        onClose={onClose}
        visible={visible}
        className="info_drawer"
      >
        {
          headerMenusTabsData.map((tabsData: any) => (
            <>
              <button className="header_drawer_menu" type="button" onClick={() => handleActiveKey(tabsData.key)}>
                {tabsData.tab.title}
              </button>
              <Divider />
            </>
          ))
        }

      </Drawer>
    </div>
  )
}

export default MobileHeaderMenus