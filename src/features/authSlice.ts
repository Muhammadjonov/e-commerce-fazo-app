import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserResType = {
  status: number,
  message: string,
  data: UserType
};

export type UserType = {
  id: string
  image: string | null
  username: string | null
  firstname: string | null
  lastname: string | null
  status: number,
  auth_key: string
};

const initialState = {
  user: {} as UserType,
  isLoading: false,
  authorized: false
};

export const authSlice = createSlice({
  name: 'markets',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserResType>) => {
      state.user = action.payload.data;
      state.authorized = true
    },
    logout: (state) => {
      state.authorized = false
    }
  }
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;