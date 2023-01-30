import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ArticleService from "./service/articles";
import {
	getArticleDetailStart,
	getArticleDetailFailore,
	getArticleDetailSuccess,
} from "./slice/article";

const ArticleDetail = () => {
	const { id } = useParams();
	const dispatch = useDispatch();

	const getArticleDetail = async () => {
		const responce = await ArticleService.getArticledetails(id);

		dispatch(getArticleDetailStart());

		try {
			dispatch(getArticleDetailSuccess(responce.article));
		} catch (error) {
			console.log(error);

			dispatch(getArticleDetailFailore());
		}
	};

	useEffect(() => {
		getArticleDetail();
	}, [id]);

	return <div>{id}</div>;
};

export default ArticleDetail;
