import React from 'react'
import { ScaleLoader } from 'react-spinners';

import "./__style.scss";

const LoaderComp = () => {

  return (
    <div className='loading__wrapper'>
      <ScaleLoader />
    </div>
  )
}

export default LoaderComp