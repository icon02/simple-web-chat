import React, { useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { CircularProgress, Collapse, Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import MessageComponent from "./MessageComponent";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		flexGrow: 1,
		overflowY: "scroll",
		display: "flex",
		flexDirection: "column-reverse",
		alignItems: "flex-start",
		"& > *": {
			margin: theme.spacing(2),
		},
	},
	moreLoadingElem: {
		alignSelf: "center",
	},
	nothingMoreToShowText: {
		alignSelf: "center",
		color: theme.palette.grey[700],
		fontSize: "0.7rem",
	},
}));

export default function ChatMessages({
	messages = [] /* array; example message: {fromUserId: x, toUserId: y, message: "", attachment: {name: "", downloadLink: ""}, timestamp: date, isSending: bool} */,
	isMoreLoading = false,
	isLoading = false,
	moreItemsLoadable = true,
	loadMore = () => {},
	...props
}) {
	const classes = useStyles();
	let myUserId = 1; // get via global state

	const MyLoadingSkeleton = (
		<Skeleton
			style={{ alignSelf: "flex-end", marginBottom: 0 }}
			width="50%"
			height={120}
		/>
	);
	const OtherLoadingSkeleton = (
		<Skeleton
			style={{ alignSelf: "flex-start", marginBottom: 0 }}
			width="40%"
			height={130}
		/>
	);

	return (
		<div className={classes.root}>
			{isLoading ? (
				<>
					{MyLoadingSkeleton}
					{OtherLoadingSkeleton}
					{MyLoadingSkeleton}
					{OtherLoadingSkeleton}
					{MyLoadingSkeleton}
					{OtherLoadingSkeleton}
				</>
			) : (
				<>
					{messages.map((message) => (
						<MessageComponent
							isMyMsg={myUserId === message.fromUserId}
							message={message.message}
							attachmentName={
								message.attachment && message.attachment.name
							}
							attachmentDownloadLink={
								message.attachment && message.attachment.downloadLink
							}
							timestamp={message.timestamp}
							isSending={message.isSending}
						/>
					))}
					<MessageComponent isMyMsg={true} />
					<MessageComponent isMyMsg={false} />

					<Collapse
						in={!moreItemsLoadable}
						className={classes.nothingMoreToShowText}
					>
						<Typography
							variant="body2"
							component="p"
							className={classes.nothingMoreToShowText}
						>
							---------- Nothing more to show ----------
						</Typography>
					</Collapse>
					<Collapse in={isMoreLoading} className={classes.moreLoadingElem}>
						<CircularProgress
							size={isMoreLoading ? 20 : 0}
							thickness={6}
						/>
					</Collapse>
				</>
			)}
		</div>
	);
}
