import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isLoading: false,
	articles: [],
	articleDetail: null,
	error: null,
};

const articleSlice = createSlice({
	name: "article",
	initialState,
	reducers: {
		getArticlesStart: (state) => {
			state.isLoading = true;
		},
		getArticlesSuccess: (state, Action) => {
			state.articles = Action.payload;
			state.isLoading = false;
		},
		getArticlesFailore: (state, Action) => {
			state.error = Action.payload;
		},
		getArticleDetailStart: (state) => {
			state.isLoading = true;
		},
		getArticleDetailSuccess: (state, Action) => {
			state.isLoading = false;
			state.articles = Action.payload;
		},
		getArticleDetailFailore: (state) => {
			state.isLoading = false;
		},
	},
});

export const {
	getArticlesStart,
	getArticlesSuccess,
	getArticlesFailore,
	getArticleDetailStart,
	getArticleDetailFailore,
	getArticleDetailSuccess,
} = articleSlice.actions;
export default articleSlice.reducer;
