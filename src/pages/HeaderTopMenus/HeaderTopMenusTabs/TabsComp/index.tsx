import React from 'react'
import "./_style.scss";

interface ITabsComp {
  img: string,
  title: string,
  text: string
}

function TabsComp(props: ITabsComp) {
  const { img, title, text } = props;

  return (
    <div className="tabs_comp">
      <img src={img} alt="tab_img" />
      <div className="tabs_comp_body">
        <h4 className="title16_bold tabs_comp_title">
          {title}
        </h4>
        <p className="tabs_comp_text">
          {text}
        </p>
      </div>
    </div>
  )
}

export default TabsComp