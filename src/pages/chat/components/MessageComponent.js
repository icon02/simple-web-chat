import React, { useEffect, useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Divider, Typography, Link, Fade } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	root: {
		alignSelf: (props) => props.isMyMsg && "flex-end",
	},
	messageContainer: {
		display: "flex",
		flexDirection: "column",
		backgroundColor: (props) =>
			props.isMyMsg
				? theme.palette.primary.main
				: theme.palette.background.paper,
		padding: theme.spacing(1),
		borderRadius: theme.shape.borderRadius,
		border: (props) => (!props.isMyMsg ? "1px solid" : "none"),
		borderColor: (props) =>
			!props.isMyMsg ? theme.palette.primary.main : "",
		width: "auto",

		// animation currently not working because of bug https://github.com/mui-org/material-ui/issues/21011
		animation: (props) =>
			props.isMyMsg &&
			props.isSending &&
			`$loadingEffect ${theme.transitions.duration.standard} ${theme.transitions.easing.easeIn}`,
		animationIterationCount: (props) =>
			props.isMyMsg && props.isSending && "infinite",
	},
	isSendingText: {
		color: theme.palette.grey[700],
		fontSize: "0.7rem",
		alignSelf: "flex-end",
		paddingLeft: theme.spacing(1),
	},
	message: {
		pointerEvents: "none",
		color: (props) => (props.isMyMsg ? theme.palette.background.paper : ""),
	},
	divider: {
		marginTop: theme.spacing(1),
	},
	link: {
		cursor: "pointer",
		color: (props) => (props.isMyMsg ? theme.palette.background.paper : ""),
	},
}));

export default function MessageComponent({
	message = "Default message",
	attachmentName = "Result.pdf",
	attachmentDownloadLink,
	isMyMsg = true,
	onDoubleClick = () => {},
	isSending = false,
	...props
}) {
	const classes = useStyles({ isMyMsg, isSending });

	return (
		<div className={classes.root}>
			<Fade in={isSending && isMyMsg}>
				<Typography
					className={classes.isSendingText}
					variant="body2"
					component="p"
				>
					Sending...
				</Typography>
			</Fade>
			<div className={classes.messageContainer} {...props}>
				{message.split("\n").map((s) => (
					<Typography
						variant="body1"
						component="p"
						className={classes.message}
					>
						{s}
					</Typography>
				))}

				{attachmentName && (
					<>
						<Divider className={classes.divider} />
						<Link href={attachmentDownloadLink} className={classes.link}>
							{attachmentName}
						</Link>
					</>
				)}
			</div>
		</div>
	);
}
