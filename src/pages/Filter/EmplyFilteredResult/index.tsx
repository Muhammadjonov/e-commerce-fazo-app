import { Alert } from 'antd'
import React from 'react'

const EmptyFilteredResult = () => {
  return (
    <div className="empty__filtered" style={{ height: "400px" }}>
      <Alert message="Ushbu toifaga oid mahsulatlar hozircha topilmadi" type="info" showIcon />
    </div>
  )
}

export default EmptyFilteredResult