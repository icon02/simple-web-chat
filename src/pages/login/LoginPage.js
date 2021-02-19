import React, { useState, createRef, useEffect } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {
	Paper,
	Typography,
	TextField,
	Button,
	Divider,
	Fade,
} from "@material-ui/core";
import { Person as LoginIcon } from "@material-ui/icons";

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
	imageSelector: {
		borderRadius: "50%",
		border: "1px solid",
		bordercolor: theme.palette.primary.dark,
		backgroundColor: theme.palette.primary.light,
		width: 80,
		height: 80,
		objectFit: "scale-down",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		"& :hover": {
			cursor: "pointer",
		},
	},
	img: {
		width: 80,
		height: 80,
		borderRadius: "50%",
		objectFit: "scale-down",
	},
}));

export default function LoginPage(props) {
	const classes = useStyles();
	const inputRef = createRef(null);
	const [image, setImage] = useState(null);
	const [imageUrl, setImageUrl] = useState(null);

	function triggerInput() {
		if (inputRef.current) inputRef.current.click();
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

	return (
		<Paper className={classes.root} elevation={1}>
			<Paper className={classes.loginContainer}>
				<Typography variant="h3" component="h1" color="primary">
					Login
				</Typography>
				<Divider style={{ width: "100%" }} />

				<TextField
					placeholder="username"
					inputProps={{ min: 0, style: { textAlign: "center" } }}
					InputProps={{ textAlign: "center" }}
				/>
				<input
					className={classes.input}
					type="file"
					ref={inputRef}
					onChange={inputOnChange}
				/>
				<div className={classes.imageSelector} onClick={triggerInput}>
					{imageUrl ? (
						<Fade in>
							<img className={classes.img} src={imageUrl} />
						</Fade>
					) : (
						<Typography variant="body1" component="p">
							Click to upload
						</Typography>
					)}
				</div>

				<Button variant="outlined" color="primary">
					<Typography variant="subtitle1">Join the chat</Typography>
				</Button>
			</Paper>
		</Paper>
	);
}
