import reactDom from "react-dom";
import React from "react";
import Redirect from "react-router-dom/Redirect";

export default function LandingPage(_) {
	console.log("redirecting to chat..");
	return <Redirect to="/chat" />;
}
