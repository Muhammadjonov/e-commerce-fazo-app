import { Button } from 'antd'
import React from 'react'
import styles from "./DrawerBtn.module.css";

interface IDrawerOpenBtn {
  setState: (value: React.SetStateAction<boolean>) => void,
  icon: React.ReactNode
}

const DrawerOpenBtn = (props: IDrawerOpenBtn) => {
  const { setState, icon } = props;
  return (
    <Button type="primary" onClick={() => setState(true)} className={styles.open_drower_btn}>
      {icon}
    </Button>
  )
}

export default DrawerOpenBtn