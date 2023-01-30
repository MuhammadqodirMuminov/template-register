import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { icon } from "./constants";
import AuthService from "./service/auth";
import { signUserFailore, signUserStart, signUserSuccess } from "./slice/auth";
import { Input } from "./ui/index";
import { ValidationError } from "./index";
import { useNavigate } from "react-router-dom";

const Register = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const { isLoading, LoggedIn } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const registerhandler = async (e) => {
		e.preventDefault();

		dispatch(signUserStart());
		const user = { username: name, email: email, password: password };

		try {
			const res = await AuthService.userRegister(user);
			dispatch(signUserSuccess(res.user));
			navigate("/");
		} catch (error) {
			dispatch(signUserFailore(error.response.data.errors));
		}
	};

	useEffect(() => {
		if (LoggedIn) {
			navigate("/");
		}
	}, [LoggedIn]);

	return (
		<div className="text-center container">
			<main className="form-signin w-25 m-auto">
				<form>
					<img className="mb-4" src={icon} alt="" width="72" height="70" />
					<h1 className="h3 mb-3 fw-normal">Please register</h1>
					<ValidationError />
					<Input
						label={"Username"}
						type={"text"}
						state={name}
						setState={setName}
					/>
					<Input
						label={"Email address"}
						type={"email"}
						state={email}
						setState={setEmail}
					/>
					<Input
						label={"Password"}
						type={"password"}
						state={password}
						setState={setPassword}
					/>

					<button
						className="w-100 btn btn-lg btn-primary mt-2"
						type="submit"
						disabled={isLoading}
						onClick={registerhandler}>
						{isLoading ? "loading..." : "register"}
					</button>
				</form>
			</main>
		</div>
	);
};

export default Register;
