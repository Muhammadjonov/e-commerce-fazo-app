import React from 'react'
import { Loading3QuartersOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import "./__style.scss";

const SpinnerLoader = () => {
  const antIcon = <Loading3QuartersOutlined style={{ fontSize: 24 }} spin />;
  return (
    <Spin className='spinner__loader' indicator={antIcon} />
  )
}

export default SpinnerLoader