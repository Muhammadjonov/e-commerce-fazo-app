import { Button } from 'antd'
import React from 'react'
import "./__style.scss";

interface IDrawerOpenBtn {
  setState: (value: React.SetStateAction<boolean>) => void,
  icon: React.ReactNode,
  text?: string
}

const DrawerOpenBtn = (props: IDrawerOpenBtn) => {
  const { setState, icon, text } = props;
  return (
    <Button type="link" onClick={() => setState(true)} className={"open_drower_btn"}>
      {icon} {text}
    </Button>
  )
}

export default DrawerOpenBtn