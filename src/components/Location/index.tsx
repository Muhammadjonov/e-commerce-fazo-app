import { Dropdown, Menu } from 'antd'
import React, { useState } from 'react'
import { useT } from '../../custom/hooks/useT'
import "./_style.scss";

interface ILocation {
  color?: string,
  iconName: string
}

function Location(props: ILocation) {
  const { color = "#fff", iconName } = props;
  const { lang } = useT();
  const regions = [
    {
      uz: "Toshkent",
      ru: "Ташкент",
      uzc: ""
    },
    {
      uz: "Farg'ona",
      ru: "Фергана",
      uzc: ""
    }
  ]
  const [regionn, setRegionn] = useState(regions[0][lang]);

  const menu = (
    <Menu>
      {
        regions.filter(region => region[lang] !== regionn).map((reg, idx) => (
          <Menu.Item key={idx} onClick={() => setRegionn(reg[lang])}>
            <span>{reg[lang]}</span>
          </Menu.Item>
        ))
      }
    </Menu>
  );


  return (
    <>
      <Dropdown overlay={menu} placement="bottomLeft" >
        <div className="location_wrapper" style={{ color }} >
          <img src={`/assets/icons/${iconName}.svg`} alt="" />
          <span className="region_text">{regionn}</span></div>
      </Dropdown>
    </>
  )
}

export default Location