import React, { useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Paper } from "@material-ui/core";
import RouterSwitch from "react-router-dom/Switch";
import Route from "react-router-dom/Route";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/login/LoginPage";
import ChatPage from "./pages/chat/ChatPage";
import LandingPage from "./pages/LandingPage";

const useStyles = makeStyles((theme) => ({
	root: {
		height: "100vh",
		width: "100vw",
		overflow: "scroll",
		borderRadius: 0,
	},
}));

function App() {
	const classes = useStyles();

	return (
		<Paper className={classes.root}>
			<RouterSwitch>
				<Route path="/login" exact component={LoginPage} />
				<ProtectedRoute path="/chat" exact component={ChatPage} />
				<Route path="/" component={LandingPage} />
			</RouterSwitch>
		</Paper>
	);
}

export default App;
