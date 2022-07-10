import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddedCartNotif, RemovedCartNotif } from "../../components/Notifications";
import { removeBasketFromLocalStorage, setBasketLocalStorage } from "../../helpers";
import { ProductType } from "../../types";

export type ProductTypeBasket = ProductType & { count: number, options?: string };

export type ProductsTypeBasket = Array<ProductTypeBasket>;

export type InitialBasketStateType = {
  products: ProductsTypeBasket;
  totalPrice: number;
  totalElements: number;
  totalProductCount: number;
  isLoading: boolean;
};

const initialState: InitialBasketStateType = {
  products: [],
  totalPrice: 0,
  totalElements: 0,
  totalProductCount: 0,
  isLoading: false,
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    setBasket(state, action: PayloadAction<{ data: any }>) {
      const { products, totalPrice, totalElements, totalProductCount, isLoading } = action.payload.data
      state.products = products
      state.totalPrice = totalPrice
      state.totalElements = totalElements
      state.totalProductCount = totalProductCount
      state.isLoading = isLoading
    },
    addToBasket(state, action: PayloadAction<ProductTypeBasket>) {
      let productInBasket = state.products.find(
        (prod) => prod.id === action.payload.id
      );
      if (productInBasket) {
        state.products = state.products.filter(
          (prod) => prod.id !== action.payload.id
        );
        RemovedCartNotif(action.payload.name);
      } else {
        state.products.push(action.payload);
        AddedCartNotif(action.payload.name);
      }

      setTotals(state);
    },
    increment(state, action: PayloadAction<{ id: number }>) {
      let productInBasket = state.products.find(
        (prod) => prod.id === action.payload.id
      );
      if (productInBasket) {
        productInBasket.count += 1;
        setTotals(state);
      }
    },
    decrement(state, action: PayloadAction<{ id: number }>) {
      let productInBasket = state.products.find(
        (prod) => prod.id === action.payload.id
      );
      if (productInBasket) {
        productInBasket.count -= 1;
        setTotals(state);
      }
    },
    deleteFromBasket(state, action: PayloadAction<ProductTypeBasket>) {
      state.products = state.products.filter(
        (prod) => prod.id !== action.payload.id
      );
      RemovedCartNotif(action.payload.name);
      setTotals(state);
    },
    dropBasket(state) {
      state.products = []
      state.totalPrice = 0
      state.totalElements = 0
      state.totalProductCount = 0
      state.isLoading = false
      removeBasketFromLocalStorage()
    }
  },
});

function setTotals(basket: InitialBasketStateType) {
  basket.totalElements = basket.products.length;
  basket.totalProductCount = basket.products.reduce((acc, product) => {
    return acc + product.count;
  }, 0);
  basket.totalPrice = basket.products.reduce((acc, cv) => {
    // if (cv.discount) return acc + cv.price * (1 - cv.discount / 100) * cv.count;
    return acc + cv.price * cv.count;
  }, 0);

  // let shops: ShopType[] = [];
  // basket.products.forEach(p => {
  //   if (!shops.find(shop => shop.shop_id === p.shop_id)) {
  //     shops.push({ shop_id: p.shop_id, shop_name: p.shop_name })
  //   }
  // })
  // basket.shopsInBasket = [...shops];
  setBasketLocalStorage(basket);
}

export const { addToBasket, increment, decrement, deleteFromBasket, dropBasket, setBasket } =
  basketSlice.actions;
export default basketSlice.reducer;
