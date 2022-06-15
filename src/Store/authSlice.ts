import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { userType } from "../types";
import { request } from "../api/config";

export const fetchUserById = createAsyncThunk(
	'auth/fetchByIdStatus',
	async (userId: number | string, thunkAPI) => {
		const response = await request.get('');
		return response.data
	}
)

export interface authState {
	isLoggedIn: boolean,
	loading: boolean,
	data: userType,
	value: number
}

const initialState: authState = {
	isLoggedIn: false,
	loading: false,
	data: {} as userType,
	value: 0
}

export const counterSlice = createSlice({
	name: 'counter',
	initialState,
	reducers: {
		increment: (state) => {
			// Redux Toolkit allows us to write "mutating" logic in reducers. It
			// doesn't actually mutate the state because it uses the Immer library,
			// which detects changes to a "draft state" and produces a brand new
			// immutable state based off those changes
			state.value += 1
		},
		decrement: (state) => {
			state.value -= 1
		},
		incrementByAmount: (state, action: PayloadAction<number>) => {
			state.value += action.payload
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchUserById.pending, (state, action) => {
			state.loading = true
		});
		builder.addCase(fetchUserById.fulfilled, (state, action) => {
			state.data = action.payload;
			state.loading = false;
		});
		builder.addCase(fetchUserById.rejected, (state, action) => {
			state.loading = false;
		});
	},
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer