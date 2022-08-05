import { AddedComparesNotif, RemovedComparesNotif } from './../../components/Notifications/index';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { removeBasketFromLocalStorage, setCompareLocalStorage } from "../../helpers";

export type CompareType = {
  category_id: number,
  product_ids: number[]
}

export type ComparesType = Array<CompareType>;

export type InitialCompareStateType = {
  compares: ComparesType;
  totalElements: number
};

const initialState: InitialCompareStateType = {
  compares: [],
  totalElements: 0
};

export const basketSlice = createSlice({
  name: "compare",
  initialState,
  reducers: {
    setCompare(state, action: PayloadAction<{ data: any }>) {
      const { compares, totalElements } = action.payload.data;
      state.compares = compares;
      state.totalElements = totalElements

    },
    addToCompare(state, action: PayloadAction<{ category_id: number, id: number, name: string }>) {
      let { category_id, id, name } = action.payload;

      const isCategory_id = state.compares.map(c => c.category_id).indexOf(category_id);
      if (isCategory_id === -1 && category_id !== null) {
        state.compares.push({ category_id: category_id, product_ids: [id] });
        AddedComparesNotif(name);
      } else {
        let productIdx = state.compares.find(item => item.category_id === category_id)?.product_ids.map(product_id => product_id).indexOf(id)!;
        if (productIdx === -1) {
          state.compares[isCategory_id].product_ids.push(id);
          AddedComparesNotif(name);
        } else {
          if (state.compares[isCategory_id]?.product_ids?.length === 1) {
            state.compares.splice(isCategory_id, 1);
          } else {
            state.compares[isCategory_id]?.product_ids?.splice(productIdx, 1);
          }
          RemovedComparesNotif(name);
        }
      }

      setTotals(state);
    },
    deleteFromCompare(state, action: PayloadAction<{ category_id: number, id: number, name: string }>) {
      let { category_id, id, name } = action.payload;
      const isCategory_id = state.compares.map(c => c.category_id).indexOf(category_id);
      let productIdx = state.compares.find(item => item.category_id === category_id)?.product_ids.map(product_id => product_id).indexOf(id)!;
      if (productIdx === -1) {
        state.compares[isCategory_id].product_ids.push(id);
        AddedComparesNotif(name);
      } else {
        if (state.compares[isCategory_id]?.product_ids?.length === 1) {
          state.compares.splice(isCategory_id, 1);
        } else {
          state.compares[isCategory_id].product_ids.splice(productIdx, 1);
        }
        RemovedComparesNotif(name);
      }
      setTotals(state);
    },
    deleteByCategory(state, action: PayloadAction<{ category_id: number }>) {
      let { category_id } = action.payload;
      state.compares = state.compares.filter((compare => compare.category_id !== category_id));
      setTotals(state);
    },
    dropCompare(state) {
      state.compares = []
      state.totalElements = 0;
      removeBasketFromLocalStorage()
    }
  },
});

function setTotals(compare: InitialCompareStateType) {
  compare.totalElements = compare.compares.reduce((acc: number, item: any) => { return acc + item.product_ids.length }, 0)
  setCompareLocalStorage(compare);
}

export const { addToCompare, dropCompare, setCompare, deleteByCategory, deleteFromCompare } =
  basketSlice.actions;
export default basketSlice.reducer;
