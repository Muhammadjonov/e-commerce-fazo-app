import { Button } from 'antd';
import React from 'react'
import "./_style.scss";

interface IOutlineBtn {
  text: string,
  onClick?: () => void
}
const OutlineBtn = (props: IOutlineBtn) => {
  const { text, onClick } = props;
  return (
    <Button onClick={onClick} className="outline__custom__btn" ghost>
      {text}
    </Button>
  )
}

export default OutlineBtn