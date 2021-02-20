import createTheme from "@material-ui/core/styles/createMuiTheme";

export const LightTheme = createTheme({
	palette: {
		primary: {
			main: "#3fb4ac",
		},
		type: "light",
	},
});

export const DarkTheme = createTheme({
	palette: {
		primary: {
			main: "#359690",
		},
		background: {
			paper: "#141414",
		},
		type: "dark",
	},
});
