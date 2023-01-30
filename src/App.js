import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { getItem } from "./components/helpers/persistance-storage";
import {
	Main,
	Login,
	Register,
	Navbar,
	ArticleDetail,
} from "./components/index";
import ArticleService from "./components/service/articles";
import AuthService from "./components/service/auth";
import {
	getArticlesStart,
	getArticlesSuccess,
} from "./components/slice/article";
import { signUserSuccess } from "./components/slice/auth";

const App = () => {
	const dispatch = useDispatch();

	const getUser = async () => {
		try {
			const responce = await AuthService.userget();
			dispatch(signUserSuccess(responce.user));
		} catch (error) {
			console.log(error);
		}
	};

	const getArticle = async () => {
		dispatch(getArticlesStart());
		try {
			const responce = await ArticleService.getArticles();
			dispatch(getArticlesSuccess(responce.articles));
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const token = getItem("token");
		if (token) {
			getUser();
			console.log("salom");
		}
		getArticle();
	}, []);

	return (
		<div>
			<Navbar />
			<div className="container">
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/article/:id" element={<ArticleDetail />} />
				</Routes>
			</div>
		</div>
	);
};

export default App;
