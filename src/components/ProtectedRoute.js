import React, { useContext } from "react";
import { GlobalUserContext } from "../GlobalUserState";
import Redirect from "react-router-dom/Redirect";
import Route from "react-router-dom/Route";
import profilePlaceholderURL from "../assets/profile-placeholder.png";

export default function ProtectedRoute({ to, component, ...props }) {
	const [user, _] = useContext(GlobalUserContext);

	if (to === "/login") user = null;

	return user && user.username && user.username.length > 0 ? (
		<Route path={to} component={component} {...props} />
	) : (
		<Redirect to={"/login"} />
	);
}
