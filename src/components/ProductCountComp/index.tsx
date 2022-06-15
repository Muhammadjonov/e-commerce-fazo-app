import React from 'react'
import "./_style.scss";

interface IProductCountComp {
  total: number,
  perCount: number
}

function ProductCountComp(props: IProductCountComp) {
  const { total, perCount } = props;

  return (
    <div className="product_count">
      <p className="p16_regular">
        Товаров {perCount} / {total}
      </p>
    </div>
  )
}

export default ProductCountComp