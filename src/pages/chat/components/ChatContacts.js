import React, { useEffect, useState, useContext } from "react";
import { GlobalUserContext } from "../../../GlobalUserState";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {
	InputBase,
	IconButton,
	Snackbar,
	Typography,
	InputAdornment,
	Fade,
	useMediaQuery,
	Paper,
	Dialog,
	DialogTitle,
	Button,
	Avatar,
} from "@material-ui/core";
import useTheme from "@material-ui/core/styles/useTheme";
import {
	MusicNoteOutlined as SoundOnIcon,
	MusicOffOutlined as SoundOffIcon,
	HighlightOffOutlined as ClearIcon,
	PowerSettingsNewOutlined as LogoutIcon,
} from "@material-ui/icons";
import ContactComponent from "./ContactComponent";
import profileImageSrc from "../../../assets/profile-placeholder.png";

const default_search_container_height = 60;

const useStyles = makeStyles((theme) => ({
	root: {
		height: "100%",
		width: "100%",
		display: "flex",
		flexDirection: "column",
	},
	titleContainer: {
		width: "100%",
		flexShrink: 0,
		height: 81,
		display: "flex",
		justifyContent: "flex-start",
		alignItems: "center",
		color: theme.palette.background.paper,
		[theme.breakpoints.down("sm")]: {
			backgroundColor: theme.palette.primary.main,
			height: 80,
		},
		paddingLeft: theme.spacing(3),
	},
	searchContainer: {
		width: "100%",
		height: default_search_container_height,
		flexShrink: 0,
		display: "flex",
		justifyContent: "flex-start",
		alignItems: "centert",
		overflow: "hidden",
		transition: theme.transitions.create(["height"]),
		[theme.breakpoints.down("sm")]: {
			backgroundColor: theme.palette.primary.main,
			// backgroundImage: `linear-gradient(180deg, ${theme.palette.primary.main} 90%, rgba(0, 0, 0, 0) 100%)`,
			height: (props) =>
				props.lastScrollActionWasDown ? 0 : default_search_container_height,
		},
	},
	searchInputBase: {
		marginLeft: theme.spacing(3),
		marginRight: theme.spacing(3),
		width: `calc(100% - ${theme.spacing(6)}px)`,
		height: 48,
		borderRadius: theme.shape.borderRadius,
		backgroundColor: "rgba(255, 255, 255, 0.2)",
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2),
		paddingTop: 4,
		paddingBottom: 4,
		transition: theme.transitions.create(["all"]),
		color: theme.palette.background.paper,
		[theme.breakpoints.down("sm")]: {
			opacity: (props) => (props.lastScrollActionWasDown ? 0 : 1),
		},
	},
	contactsContainer: {
		transition: theme.transitions.create(["height"]),
		width: "100%",
		alignItems: "stretch",
		display: "flex",
		flexDirection: "column",
		flexGrow: 1,
		// height: `calc(100vh - ${(props) =>
		// 	props.lastScrollActionWasDown
		// 		? 128
		// 		: 128 + default_search_container_height}px)`,
		overflowX: "hidden",
		overflowY: "scroll",
		"& > *:first-child": {
			borderTop: "none",
		},
	},
	settingsContainer: {
		width: "100%",
		flexShrink: 0,
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		flexDirection: "row",
		height: 48,
		borderTop: "3px solid",
		borderTopColor: theme.palette.background.paper,
		[theme.breakpoints.down("sm")]: {
			borderTopColor: theme.palette.primary.main,
		},
		"& > *:first-child": {
			marginLeft: theme.spacing(1),
		},
		"& > *:last-child": {
			marginRight: theme.spacing(1),
		},
	},
	clearSearchButton: {
		marginRight: `-${theme.spacing(1)}px`,
	},
	clearIcon: {
		color: theme.palette.background.paper,
	},
	snackPaper: {
		padding: theme.spacing(2),
		backgroundColor: theme.palette.primary.main,
		color: theme.palette.background.paper,
		display: "flex",
		alignItems: "center",
	},
	logoutDialogContent: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		paddingBottom: theme.spacing(2),
		"& > *:first-child": {
			marginRight: theme.spacing(2),
		},
	},
	myUserContainer: {
		display: "flex",
		alignItems: "center",
	},
	myUserAvatar: {
		width: 35,
		height: 35,
		scale: 0.6,

		[theme.breakpoints.up("md")]: {
			transition: theme.transitions.create(["scale"]),
			"&:hover": {
				scale: 0.8,
				cursor: "pointer",
			},
		},
	},
	userImageDialog: {
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
	loggedInText: {
		color: theme.palette.background.paper,
		[theme.breakpoints.down("sm")]: {
			color:
				theme.palette.type === "light"
					? theme.palette.common.black
					: theme.palette.common.white,
		},
	},
	icon: {
		color: theme.palette.background.paper,
		[theme.breakpoints.down("sm")]: {
			color:
				theme.palette.type === "light"
					? theme.palette.common.black
					: theme.palette.common.white,
		},
	},
	logoutButtonYes: {
		color: theme.palette.background.paper,
	},
}));

const test_contacts = [
	{
		id: 1,
		username: "Icon02",
		imageUrl: profileImageSrc,
	},
	{
		id: 2,
		username: "Andreas43",
		imageUrl: "",
	},
	{
		id: 3,
		username: "Susi33",
		imageUrl: profileImageSrc,
	},
	{
		id: 4,
		username: "Franz02",
		imageUrl: profileImageSrc,
	},
	{
		id: 5,
		username: "Aks49",
		imageUrl: profileImageSrc,
	},
	{
		id: 6,
		username: "User49",
		imageUrl: profileImageSrc,
	},
	{
		id: 1,
		username: "Icon02",
		imageUrl: profileImageSrc,
	},
	{
		id: 2,
		username: "Andreas43",
		imageUrl: "",
	},
	{
		id: 3,
		username: "Susi33",
		imageUrl: profileImageSrc,
	},
	{
		id: 4,
		username: "Franz02",
		imageUrl: profileImageSrc,
	},
	{
		id: 5,
		username: "Aks49",
		imageUrl: profileImageSrc,
	},
	{
		id: 6,
		username: "User49",
		imageUrl: profileImageSrc,
	},
	{
		id: 1,
		username: "Icon02",
		imageUrl: profileImageSrc,
	},
	{
		id: 2,
		username: "Andreas43",
		imageUrl: "",
	},
	{
		id: 3,
		username: "Susi33",
		imageUrl: profileImageSrc,
	},
	{
		id: 4,
		username: "Franz02",
		imageUrl: profileImageSrc,
	},
	{
		id: 5,
		username: "Aks49",
		imageUrl: profileImageSrc,
	},
	{
		id: 6,
		username: "User49",
		imageUrlimageUrl: profileImageSrc,
	},
];

export default function ChatContacts({
	selectedContact,
	setSelectedContact = () => {},
	history,
	...props
}) {
	const [lastScrollActionWasDown, setLastScrollActionWasDown] = useState(
		false
	);
	let prevContactDivScrollTop = 0;
	const classes = useStyles({
		lastScrollActionWasDown: lastScrollActionWasDown,
	});
	const [isSoundOn, setSoundOn] = useState(true);
	const [contacts, setContacts] = useState(test_contacts);
	const [searchText, setSearchText] = useState("");
	const [showSnackbarNotificationOn, setShowSnackbarNotificaitonOn] = useState(
		false
	);
	const [
		showSnackbarNotificationOff,
		setShowSnackbarNotificaitonOff,
	] = useState(false);
	const [showLogoutDialog, setShowLogoutDialog] = useState(false);
	const [showUserImageDialog, setShowUserImageDialog] = useState(false);

	const [user, setUser] = useContext(GlobalUserContext);

	const isMdAndUp = useMediaQuery(useTheme().breakpoints.up("md"));

	useEffect(() => {
		if (isMdAndUp && !selectedContact) setSelectedContact(contacts[0]);
	});

	function contactsContainerOnScroll(e) {
		const wasScrollDown = e.target.scrollTop > prevContactDivScrollTop;
		if (wasScrollDown != lastScrollActionWasDown) {
			setLastScrollActionWasDown(wasScrollDown);
			prevContactDivScrollTop = e.target.scrollTop;
			console.log("lastScrollActionWasDown toggled");
		}
	}

	function toggleSoundOnOff() {
		if (!isSoundOn) setShowSnackbarNotificaitonOn(true);
		else setShowSnackbarNotificaitonOff(true);
		setSoundOn(!isSoundOn);
	}

	function clearSearchOnClick() {
		setSearchText("");
	}

	function logoutOnClick() {
		setShowLogoutDialog(true);
	}

	function logout() {
		setUser(null);
	}

	function profileImageOnClick() {
		if (user.imageUrl && user.imageUrl.length > 0)
			setShowUserImageDialog(true);
	}

	return (
		<div className={classes.root}>
			<Dialog
				open={showLogoutDialog}
				onClose={() => setShowLogoutDialog(false)}
			>
				<DialogTitle>Do you really want to log out?</DialogTitle>
				<div className={classes.logoutDialogContent}>
					<Button variant="contained" color="primary" onClick={logout}>
						<Typography
							variant="subtitle1"
							component="p"
							className={classes.logoutButtonYes}
						>
							Yes
						</Typography>
					</Button>
					<Button
						variant="outlined"
						color="primary"
						onClick={() => setShowLogoutDialog(false)}
					>
						<Typography variant="subtitle1" component="p">
							No
						</Typography>
					</Button>
				</div>
			</Dialog>
			<Dialog
				open={showUserImageDialog}
				onClose={() => setShowUserImageDialog(false)}
			>
				<div className={classes.userImageDialog}>
					<img className={classes.dialogImage} src={user.imageUrl} />
				</div>
			</Dialog>
			<Snackbar
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
				open={showSnackbarNotificationOn}
				autoHideDuration={800}
				onClose={() => setShowSnackbarNotificaitonOn(false)}
			>
				<Paper className={classes.snackPaper} elevation={0}>
					<Typography variant="body2" component="p">
						Notification sounds turned on
					</Typography>

					<SoundOnIcon />
				</Paper>
			</Snackbar>
			<Snackbar
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
				open={showSnackbarNotificationOff}
				autoHideDuration={800}
				onClose={() => setShowSnackbarNotificaitonOff(false)}
			>
				<Paper className={classes.snackPaper}>
					<Typography variant="body2" component="p">
						Notification sounds turned off
					</Typography>
					<SoundOffIcon />
				</Paper>
			</Snackbar>
			<div className={classes.titleContainer}>
				<Typography variant="h4" component="h2">
					<strong>Contacts</strong>
				</Typography>
			</div>
			<div className={classes.searchContainer}>
				<InputBase
					placeholder="Search"
					className={classes.searchInputBase}
					value={searchText}
					onChange={(e) => setSearchText(e.target.value)}
					endAdornment={
						<InputAdornment>
							<Fade in={searchText.length >= 1}>
								<IconButton
									size="small"
									onClick={clearSearchOnClick}
									onTouchEnd={clearSearchOnClick}
									className={classes.clearSearchButton}
								>
									<ClearIcon className={classes.clearIcon} />
								</IconButton>
							</Fade>
						</InputAdornment>
					}
				/>
			</div>
			<div
				className={classes.contactsContainer}
				onScroll={contactsContainerOnScroll}
			>
				{contacts
					.filter((elem) =>
						elem.username
							.toLocaleLowerCase()
							.includes(searchText.toLocaleLowerCase())
					)
					.map((contact) => (
						<ContactComponent
							selected={selectedContact === contact}
							contact={contact}
							onClick={() => setSelectedContact(contact)}
						/>
					))}
			</div>
			<div className={classes.settingsContainer}>
				<IconButton size="small" onClick={logoutOnClick}>
					<LogoutIcon className={classes.icon} />
				</IconButton>

				<div className={classes.myUserContainer}>
					<Typography
						className={classes.loggedInText}
						variant="body2"
						component="p"
						style={{ fontSize: "0.8rem" }}
					>
						Logged in as <strong>{user.username}</strong>
					</Typography>
					<Avatar
						className={classes.myUserAvatar}
						onClick={profileImageOnClick}
						src={user.imageUrl}
					>
						{user.username.charAt(0)}
					</Avatar>
				</div>

				<IconButton size="small" onClick={toggleSoundOnOff}>
					{isSoundOn ? (
						<SoundOnIcon className={classes.icon} />
					) : (
						<SoundOffIcon className={classes.icon} />
					)}
				</IconButton>

				{/*
				<IconButton size="small" onClick={moreOnClick}>
					<MoreIcon />
				</IconButton>
				<Menu
					anchorEl={moreMenuAnchor}
					keepMounted
					open={Boolean(moreMenuAnchor)}
					onClose={moreMenuOnClose}
				>
					<MenuItem>
						<Checkbox />
						<Typography variant="subtitle2" component="p">
							Auto translate messages
						</Typography>
					</MenuItem>
					<MenuItem>
						<Checkbox />
						<Typography variant="subtitle2" component="p">
							Dark Mode
						</Typography>
					</MenuItem>
				</Menu>*/}
			</div>
		</div>
	);
}
