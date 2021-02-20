import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import ThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import BrowserRouter from "react-router-dom/BrowserRouter";
import createBrowserHistory from "history/createBrowserHistory";
import { GlobalUserContextProvider } from "./GlobalUserState";
import { LightTheme, DarkTheme } from "./Themes";
import reportWebVitals from "./reportWebVitals";

const history = createBrowserHistory();

ReactDOM.render(
	<React.StrictMode>
		<GlobalUserContextProvider>
			<BrowserRouter>
				<ThemeProvider theme={LightTheme}>
					<App />
				</ThemeProvider>
			</BrowserRouter>
		</GlobalUserContextProvider>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
