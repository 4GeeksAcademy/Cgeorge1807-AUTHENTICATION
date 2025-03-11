import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()
	
	function handelLogout(){
		actions.logout()
		navigate('/')
	}
	
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					{store.auth ? <button className="btn btn-primary" onClick={()=>handelLogout()}>Logout</button>: null}
				</div>
			</div>
		</nav>
	);
};
