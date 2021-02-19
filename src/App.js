import React, { useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Typography, Paper } from "@material-ui/core";
import LoginPage from "./pages/login/LoginPage";
import ChatPage from "./pages/chat/ChatPage";
import ContactComponent from "./pages/chat/components/ContactComponent";

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
			{/* 
    <LoginPage />*/}

			<ChatPage />
		</Paper>
	);
}

export default App;
