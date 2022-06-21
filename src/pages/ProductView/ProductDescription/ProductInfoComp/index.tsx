import React from 'react'
import { CharacterAssignsType } from '../../../../types';
import "./_style.scss";

interface IProductInfoComp {
  description: CharacterAssignsType[]
}

function ProductInfoComp(props: IProductInfoComp) {

  const { description } = props;

  return (
    <div className="product_info_comp">
      <h3 className="title24_bold product_info_title">
        Технические параметры
      </h3>
      {
        description?.map(descrip => (
          <div className="product_info_body" key={descrip.id}>
            <p className="desc_name">
              {descrip.characterName}
            </p>
            <p className="desc">
              {descrip.value}
            </p>
          </div>
        ))
      }

    </div>
  )
}

export default ProductInfoComp