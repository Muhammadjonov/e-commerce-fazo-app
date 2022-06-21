import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type LoadingType = {
  loading: string[]
}

const initialState: LoadingType = {
  loading: []
}

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<{text: string, switcher: boolean}>) => {
      const { switcher, text } = action.payload
      switcher ? state.loading.push(text) : state.loading = state.loading.filter(l => l !== text)
    }
  },
});
export const { setLoading } = loadingSlice.actions
export default loadingSlice.reducer;