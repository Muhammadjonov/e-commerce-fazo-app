import React from 'react'
import "./_style.scss";

interface IProductInfoComp {
  id: string;
  title: string;
  description: {
    id: string;
    desc_name: string;
    desc: string
  }[]
}

function ProductInfoComp(props: IProductInfoComp) {

  const { title, description } = props;

  return (
    <div className="product_info_comp">
      <h3 className="title24_bold product_info_title">
        {title}
      </h3>
      {
        description.map(descrip => (
          <div className="product_info_body" key={descrip.id}>
            <p className="desc_name">
              {descrip.desc_name}
            </p>
            <p className="desc">
              {descrip.desc}
            </p>
          </div>
        ))
      }

    </div>
  )
}

export default ProductInfoComp