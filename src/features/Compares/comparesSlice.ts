import { addFavoritesUrl, deleteAllFavoritesUrl } from '../../api/apiUrls';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getFavouritesUrl } from "../../api/apiUrls";
import baseAPI from "../../api/baseAPI";
import { ProductType, _links, _meta } from "../../types";

export const getFavourites = createAsyncThunk('favourites/get', async () => {
  let res = await baseAPI.fetchAll<FavouritesReducerType>(getFavouritesUrl);
  return res.data;
});

export const addToFavoutires = createAsyncThunk('favourites/add', async (product: ProductType) => {
  let res = await baseAPI.createWithParams<AddFavouriteResType>(addFavoritesUrl, null, { key: product.slug });
  if (res.data.status === 200) {
    return product;
  } else {
    throw new Error('Favorite create error')
  }
});

export const removeFromFavourites = createAsyncThunk('favourites/remove', async (slug: string) => {
  let res = await baseAPI.createWithParams<AddFavouriteResType>(addFavoritesUrl, null, { key: slug });
  if (res.data.status === 200) {
    return { slug }
  }
});

export const removeAllFavourites = createAsyncThunk('favourites/removeAll', async () => {
  let res = await baseAPI.create<AddFavouriteResType>(deleteAllFavoritesUrl, {});
  return res.data
})

export type AddFavouriteResType = {
  status: number,
  message: string,
  data: null
}

export type FavouritesType = ProductType[]


export type FavouritesReducerType = {
  status: number,
  data: FavouritesType,
  message?: string,
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
  reducers: {
    deleteAllFavourites: (state) => {
      state.data = []
    }
  },
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

        state.data = state.data.filter(data => data.slug !== action.payload.slug)

        state.loading = false
      })
      .addCase(removeAllFavourites.fulfilled, (state, action: any) => {
        if (action.payload.status === 200) {
          state.data = []
          state.loading = false
        }
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
      .addCase(removeAllFavourites.pending, (state) => {
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
      .addCase(removeAllFavourites.rejected, (state) => {
        state.loading = false
      })
  }
});
export const { deleteAllFavourites } = favouritesSlice.actions;
export default favouritesSlice.reducer;