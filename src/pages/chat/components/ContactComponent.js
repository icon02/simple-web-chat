import React, { useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Typography, Avatar, InputAdornment } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: (props) =>
			props.selected ? theme.palette.primary.light : "",

		width: "100%",
		borderTop: "1px solid",
		borderColor: theme.palette.background.paper,
		[theme.breakpoints.down("sm")]: {
			borderTop: "1px solid",
			borderTopColor: theme.palette.primary.light,
			backgroundColor: (props) => props.selected && "rgba(0, 0, 0, 0.0)",
		},
		// paddingLeft: theme.spacing(3),
		// paddingRight: theme.spacing(3),
		// paddingTop: theme.spacing(1),
		// paddingBottom: theme.spacing(1),
		display: "flex",
		flexDirection: "row",
		transition: theme.transitions.create(["background-color"]),
		alignItems: "center",
		"& > *:first-child": {
			marginRight: theme.spacing(2),
			marginLeft: theme.spacing(3),
		},
		"&:hover": {
			cursor: "pointer",
			[theme.breakpoints.up("md")]: {
				backgroundColor: (props) =>
					props.selected
						? theme.palette.primary.light
						: "rgba(255, 255, 255, 0.1)",
			},
		},
		"& > *": {
			pointerEvents: "none",
			marginTop: theme.spacing(1),
			marginBottom: theme.spacing(1),
		},
	},
	typography: {
		color: theme.palette.background.paper,
		[theme.breakpoints.down("sm")]: {
			fontWeight: "bold",
			color: theme.palette.primary.main,
		},
	},
}));

export default function ContactComponent({
	selected = false,
	contact = { username: "Undefined", imageSrc: "" },
	...props
}) {
	const classes = useStyles({ selected: selected });

	return (
		<div className={classes.root} {...props}>
			<Avatar src={contact ? contact.imageSrc : ""}>
				{contact ? contact.username.substr(0, 1).toLocaleUpperCase() : "?"}
			</Avatar>
			<Typography variant="h6" component="p" className={classes.typography}>
				{contact.username}
			</Typography>
		</div>
	);
}
