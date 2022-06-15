

import "./_style.scss";

const AddCartBtn = () => {
  return (
    <button type='button' className="add_cart_btn">
      <img src="/assets/icons/white_cart.svg" alt="cart" /> <span>В корзину</span>
    </button>
  )
}

export default AddCartBtn;