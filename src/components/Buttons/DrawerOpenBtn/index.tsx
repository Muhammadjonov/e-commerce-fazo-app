import { Button } from 'antd'
import React from 'react'
import styles from "./DrawerBtn.module.css";

interface IDrawerOpenBtn {
  setState: (value: React.SetStateAction<boolean>) => void,
  icon: React.ReactNode,
  text?:string
}

const DrawerOpenBtn = (props: IDrawerOpenBtn) => {
  const { setState, icon, text } = props;
  return (
    <Button type="primary" onClick={() => setState(true)} className={styles.open_drower_btn}>
      {icon} {text}
    </Button>
  )
}

export default DrawerOpenBtn