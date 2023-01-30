import { useCallback } from "react";
import { useSelector } from "react-redux";

const ValidationError = () => {
	const { error } = useSelector((state) => state.auth);

	const errorMessage = useCallback(() => {
		return Object.keys(error).map((name) => {
			return `${name} ${error[name].join(", ")}`;
		});
	}, [error]);

	// console.log(error !== null && errorMessage());

	return (
		error !== null &&
		errorMessage().map((error, i) => (
			<div className="alert alert-danger m-1 p-1" role="alert" key={i}>
				{error}
			</div>
		))
	);
};

export default ValidationError;
