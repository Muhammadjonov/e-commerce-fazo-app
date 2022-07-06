import { Navigate } from "react-router-dom";
import { getBasketFromLocalStorage } from "../../helpers";

interface IProtectedCheckout {
  children: any
}

const ProtectedCheckout = (props: IProtectedCheckout) => {
  const { children } = props;
  let basket = getBasketFromLocalStorage();
  let isThereInBasket = Boolean(basket) && basket?.totalElements !== 0;
  if (!isThereInBasket) {
    return <Navigate to="/" replace />;
  }
  return children;
};
export default ProtectedCheckout;