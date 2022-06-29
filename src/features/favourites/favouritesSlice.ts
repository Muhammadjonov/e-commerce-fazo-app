import { addFavoritesUrl } from './../../api/apiUrls';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getFavouritesUrl } from "../../api/apiUrls";
import baseAPI from "../../api/baseAPI";
import { ProductType } from "../../types";

export const getFavourites = createAsyncThunk('favourites/get', async () => {
  let res = await baseAPI.fetchAll<FavouritesReducerType>(getFavouritesUrl);
  return res.data;
});

export const addToFavoutires = createAsyncThunk('favourites/add', async (product: ProductType) => {
  let res = await baseAPI.createWithParams<AddFavouriteResType>(addFavoritesUrl, { key: product.slug });
  if (res.data.status === 200) {
    return product;
  } else {
    throw new Error('Favorite create error')
  }
});

export const removeFromFavourites = createAsyncThunk('favourites/remove', async (slug: string) => {
  let res = await baseAPI.createWithParams<AddFavouriteResType>(addFavoritesUrl, { key: slug });
  return { res, slug }
});

export type AddFavouriteResType = {
  status: number,
  message: string,
  data: null
}

export type FavouriteType = ProductType;

export type FavouritesType = Array<FavouriteType>;

export type FavouritesReducerType = {
  status: number;
  data: FavouriteType[];
  message?: string
  loading: boolean;
}

const initialState: FavouritesReducerType = {
  data: [],
  loading: false,
  status: 200
}

export const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFavourites.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.status = action.payload.status
        state.loading = false;
      })
      .addCase(addToFavoutires.fulfilled, (state, action) => {
        state.data.push(action.payload)
        state.loading = false
      })
      .addCase(removeFromFavourites.fulfilled, (state, action: any) => {
        if (action.payload.res?.data?.status === true) {
          state.data = state.data.filter(data => data.id !== action.payload.id)
        }
        state.loading = false
      })
      .addCase(removeFromFavourites.pending, (state) => {
        state.loading = true
      })
      .addCase(addToFavoutires.pending, (state) => {
        state.loading = true
      })
      .addCase(getFavourites.pending, (state) => {
        state.loading = true
      })
      .addCase(removeFromFavourites.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addToFavoutires.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getFavourites.rejected, (state) => {
        state.loading = false;
      })
  }
});

export default favouritesSlice.reducer;