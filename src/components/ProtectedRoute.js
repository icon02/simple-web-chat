import React from "react";
import Redirect from "react-router/Redirect";
import Route from "react-router/Route";
import profilePlaceholderURL from "../assets/profile-placeholder.png";

export default function ProtectedRoute({ to, component, ...props }) {
	const user = { username: "icon02", src: profilePlaceholderURL };
	// const user = null;

	if (to === "/login") user = null;

	return user && user.username && user.username.length > 0 ? (
		<Route path={to} component={component} {...props} />
	) : (
		<Redirect to={"/login"} />
	);
}
