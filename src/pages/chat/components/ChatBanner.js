import React, { useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {
	Paper,
	Avatar,
	IconButton,
	Fade,
	Typography,
	Hidden,
	Dialog,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { blue } from "@material-ui/core/colors";
import {
	DeleteOutline as DeleteIcon,
	ArrowBackIosOutlined as BackIcon,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		height: 80,
		flexShrink: 0,
		backgroundColor: theme.palette.background.paper,
		[theme.breakpoints.down("sm")]: {
			backgroundColor: theme.palette.primary.main,
		},
		borderBottom: "3px solid",
		borderBottomColor: theme.palette.primary.main,
		borderRadius: 0,
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		"& > *": {
			borderBottom: "none",
			margin: theme.spacing(1),
		},
	},
	backButton: {
		color: theme.palette.background.paper,
	},
	contactContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
		[theme.breakpoints.up("md")]: {
			paddingLeft: theme.spacing(2),
			"& > *:first-child": {
				marginRight: theme.spacing(2),
			},
		},
		[theme.breakpoints.down("md")]: {
			"& > *:first-child": {
				marginRight: theme.spacing(2),
			},
			"& > *:nth-child(2)": {
				marginRight: theme.spacing(2),
			},
		},
	},
	contactTitle: {
		[theme.breakpoints.down("sm")]: {
			color: theme.palette.background.paper,
		},
	},
	deleteButton: {
		right: theme.spacing(1),
	},
	avatar: {
		width: 50,
		height: 50,
		[theme.breakpoints.up("md")]: {
			transition: theme.transitions.create(["scale"]),
			"&:hover": {
				cursor: "pointer",
				scale: 1.1,
			},
		},
	},
	imageDialog: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		[theme.breakpoints.down("sm")]: {
			width: 320,
			height: 240,
		},
		[theme.breakpoints.up("sm")]: {
			width: 540,
			height: 360,
		},
	},
	dialogImage: {
		width: "100%",
		height: "auto",
		maxHeight: "100%",
		objectFit: "scale-down",
	},
}));

export default function ChatBanner({
	showDelete = false,
	onDelete,
	isLoading = false,
	img = null,
	selectedContact = { imageUrl: "", username: "Undefined" },
	onBackPress,
}) {
	const classes = useStyles();
	const [showImageDialog, setShowImageDialog] = useState(false);

	function avatarOnClick() {
		if (
			selectedContact &&
			selectedContact.imageUrl &&
			selectedContact.imageUrl.length > 0
		)
			setShowImageDialog(true);
	}

	return (
		<Paper className={classes.root} elevation={0}>
			<Dialog
				open={showImageDialog}
				onClose={() => setShowImageDialog(false)}
			>
				<div className={classes.userImageDialog}>
					<img
						className={classes.dialogImage}
						src={selectedContact && selectedContact.imageUrl}
					/>
				</div>
			</Dialog>
			<div className={classes.contactContainer}>
				<Hidden mdUp>
					<IconButton onClick={onBackPress} className={classes.backButton}>
						<BackIcon />
					</IconButton>
				</Hidden>
				{isLoading ? (
					<>
						<Skeleton variant="circle" height={50} width={50} />
						<Skeleton variant="rect" height={40} width={200} />
					</>
				) : (
					<>
						<Avatar
							onClick={avatarOnClick}
							className={classes.avatar}
							src={selectedContact && selectedContact.imageUrl}
						>
							{selectedContact &&
								selectedContact.username
									.substr(0, 1)
									.toLocaleUpperCase()}
						</Avatar>
						<Typography
							variant="h4"
							component="h1"
							color="primary"
							className={classes.contactTitle}
						>
							<strong>
								{selectedContact && selectedContact.username}
							</strong>
						</Typography>
					</>
				)}
			</div>
			<Fade in={showDelete}>
				<IconButton className={classes.deleteButton} onClick={onDelete}>
					<DeleteIcon className={classes.deleteIcon} />
				</IconButton>
			</Fade>
		</Paper>
	);
}
