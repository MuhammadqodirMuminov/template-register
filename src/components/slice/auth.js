import { createSlice } from "@reduxjs/toolkit";
import { setItem } from "../helpers/persistance-storage";

const initialState = {
	isLoading: false,
	LoggedIn: false,
	error: null,
	user: null,
};

export const AuthSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		signUserStart: (state) => {
			state.isLoading = true;
		},
		signUserSuccess: (state, action) => {
			state.LoggedIn = true;
			state.isLoading = false;
			state.user = action.payload;
			setItem("token", action.payload.token);
		},
		signUserFailore: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},
		logoutUser: (state) => {
			state.user = null;
			state.LoggedIn = false;
		},
	},
});

export const { signUserStart, signUserSuccess, signUserFailore, logoutUser } =
	AuthSlice.actions;

export default AuthSlice.reducer;
