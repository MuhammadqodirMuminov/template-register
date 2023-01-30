import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { icon } from "./constants";
import { Input } from "./ui/index";
import { signUserFailore, signUserStart, signUserSuccess } from "./slice/auth";
import AuthService from "./service/auth";
import { ValidationError } from "./index";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { isLoading, LoggedIn } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const loginhandler = async (e) => {
		e.preventDefault();

		const user = { email, password };
		dispatch(signUserStart());
		try {
			const res = await AuthService.userLogin(user);

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
					<h1 className="h3 mb-3 fw-normal">Please login</h1>
					<ValidationError />
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
						onClick={loginhandler}>
						{isLoading ? "loading..." : "login"}
					</button>
				</form>
			</main>
		</div>
	);
};

export default Login;
