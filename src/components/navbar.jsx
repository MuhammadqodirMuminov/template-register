import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logo } from "./constants";
import { removeItem } from "./helpers/persistance-storage";
import { logoutUser } from "./slice/auth";

const Navbar = () => {
	const { LoggedIn, user } = useSelector((state) => state.auth);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const logOuthandler = () => {
		removeItem("token");
		dispatch(logoutUser());
		navigate("/login");
	};

	return (
		<div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom container mt-3">
			<Link className="" to={"/"}>
				<img src={logo} alt="" width={200} />
			</Link>

			<nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
				{LoggedIn ? (
					<>
						<p className="m-2 fs-4 fw-bold">{user.username}</p>
						<button
							className="btn btn-outline-danger px-4"
							onClick={logOuthandler}>
							LogOut
						</button>
					</>
				) : (
					<>
						<Link
							className="me-3 py-2 text-dark text-decoration-none"
							to={"/login"}>
							Login
						</Link>
						<Link
							className="me-3 py-2 text-dark text-decoration-none"
							to={"/register"}>
							Register
						</Link>
					</>
				)}
			</nav>
		</div>
	);
};

export default Navbar;
