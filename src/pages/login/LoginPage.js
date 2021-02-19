import React, { useState, createRef, useEffect, useContext } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {
	Paper,
	Typography,
	TextField,
	Button,
	Divider,
	CircularProgress,
	Avatar,
} from "@material-ui/core";
import { GlobalUserContext } from "../../GlobalUserState";

const useStyles = makeStyles((theme) => ({
	root: {
		height: "100vh",
		width: "100vw",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		textAlign: "center",
	},
	loginContainer: {
		width: 300,
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		padding: theme.spacing(4),
		"& > *": {
			margin: theme.spacing(1),
		},
	},
	input: {
		display: "none",
	},
	avatar: {
		width: 80,
		height: 80,
		fontSize: "0.8rem",
		backgroundColor: theme.palette.primary.main,
		transition: theme.transitions.create(["box-shadow"]),
		"&:hover": {
			boxShadow: `0px 0px 6px 2px ${theme.palette.primary.main}`,
			cursor: "pointer",
		},
	},
	loginLoading: {
		marginRight: theme.spacing(1),
	},
}));

export default function LoginPage(props) {
	const inputRef = createRef(null);
	const [username, setUsername] = useState("");
	const [image, setImage] = useState(null);
	const [imageUrl, setImageUrl] = useState(null);
	const [isUsernameError, setUsernameError] = useState(false);
	const [isLoginLoading, setLoginLoading] = useState(false);
	const classes = useStyles({ isUsernameError: isUsernameError });

	const [user, setUser] = useContext(GlobalUserContext);
	console.log(user);

	function triggerInput() {
		if (!imageUrl && inputRef.current) inputRef.current.click();
		else {
			setImage(null);
			setImageUrl(null);
		}
	}

	function inputOnChange(e) {
		console.log(e);
		setImage(e.target.files[0]);
		setImageUrl(URL.createObjectURL(e.target.files[0]));
	}

	useEffect(() => {
		// avoid memory leaks
		return () => {
			if (imageUrl) URL.revokeObjectURL(imageUrl);
		};
	}, []);

	function loginOnClick() {
		if (isLoginLoading) return;
		if (!username || username.length < 4 || username.length > 8) {
			setUsernameError(true);
			return;
		}
		setLoginLoading(true);
		setTimeout(() => {
			setUser({ username: username, imageUrl: imageUrl });
			setLoginLoading(false);
		}, 800);
	}

	return (
		<Paper className={classes.root} elevation={1}>
			<Paper className={classes.loginContainer}>
				<Typography variant="h3" component="h1" color="primary">
					Login
				</Typography>
				<Divider style={{ width: "100%" }} />

				<TextField
					onFocus={() => setUsernameError(false)}
					label="Username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					inputProps={{
						min: 0,
						style: { textAlign: "center" },
					}}
					InputProps={{ textAlign: "center" }}
					helperText="* between 4 and 8 characters"
					color="primary"
					error={isUsernameError}
				/>

				<input
					className={classes.input}
					type="file"
					accept=".jpg, .jpeg, .png"
					ref={inputRef}
					onChange={inputOnChange}
				/>
				<Avatar
					className={classes.avatar}
					onClick={triggerInput}
					src={imageUrl}
				>
					Click to set your profile image
				</Avatar>

				<Button variant="outlined" color="primary" onClick={loginOnClick}>
					{isLoginLoading && (
						<CircularProgress
							className={classes.loginLoading}
							size={20}
							thickness={7}
						/>
					)}
					<Typography variant="subtitle1">Join the chat</Typography>
				</Button>
			</Paper>
		</Paper>
	);
}
