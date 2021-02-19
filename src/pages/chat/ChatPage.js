import React, { useEffect, useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Paper, Grid, useMediaQuery } from "@material-ui/core";
import useTheme from "@material-ui/core/styles/useTheme";
import {} from "@material-ui/icons";
import ChatInput from "./components/ChatInput";
import ChatBanner from "./components/ChatBanner";
import ChatContacts from "./components/ChatContacts";
import ChatMessages from "./components/ChatMessages";
import { useSwipeable } from "react-swipeable";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		height: "100%",
	},
	container: {
		width: "100%",
		height: "100%",
	},
	contactContainer: {
		width: "100%",
		height: "100%",
		flexBasis: "100%",
		backgroundColor: theme.palette.primary.main,
		transition: theme.transitions.create(["width", "flex-basis"]),
		[theme.breakpoints.down("sm")]: {
			backgroundColor: theme.palette.background.paper,
			overflow: "hidden",
			width: (props) => (props.selectedContact ? "0%" : "100%"),
			flexBasis: (props) => (props.selectedContact ? "0%" : "100%"),
		},
	},
	chatContainer: {
		width: "100%",
		height: "100%",
		flexBasis: "100%",

		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "space-between",
		transition: theme.transitions.create(["width", "flex-basis"]),
		[theme.breakpoints.down("sm")]: {
			backgroundColor: "",
			width: (props) => (props.selectedContact ? "100%" : "0%"),
			flexBasis: (props) => (props.selectedContact ? "100%" : "0%"),
			overflow: "hidden",
		},
	},
	messageContainer: {
		flexGrow: 1,
	},
}));

export default function ChatPage(props) {
	const [selectedContact, setSelectedContact] = useState(null);
	const [messages, setMessages] = useState([]);
	const [isMessagesLoading, setMessagesLoading] = useState(true);
	const [isInputEnabled, setInputEnabled] = useState(false);
	const classes = useStyles({ selectedContact: selectedContact });

	let isMobile = useMediaQuery(useTheme().breakpoints.down("sm"));

	function onMobileBackPress() {
		if (isMobile) setSelectedContact(null);
	}

	function onSend(message) {
		message.fromUserId = 1;
		message.isSending = true;
		setMessages([message, ...messages]);
		console.log([message, ...messages]);
		setInputEnabled(false);
		setTimeout(
			(message, messages) => {
				console.log(message);
				console.log("setTimout: ");
				let messagesCopy = [...messages];
				let messageIndex = messagesCopy.indexOf(message);
				message.isSending = false;
				messagesCopy[messageIndex] = message;
				setMessages(messagesCopy);
				setInputEnabled(true);
			},
			1000,
			message,
			[message, ...messages]
		);
	}

	useEffect(() => {
		setMessagesLoading(true);
		setInputEnabled(false);
		// TODO
		setTimeout(() => {
			setMessagesLoading(false);
			setInputEnabled(true);
		}, 1000);
	}, [selectedContact]);

	const swipeHandlers = useSwipeable({
		onSwipedRight: () => onMobileBackPress(),
	});

	const Contacts = (
		<ChatContacts
			selectedContact={selectedContact}
			setSelectedContact={setSelectedContact}
		/>
	);
	const Chat = (
		<>
			<ChatBanner
				selectedContact={selectedContact}
				onBackPress={onMobileBackPress}
				// isLoading={isMessagesLoading}
			/>
			<ChatMessages
				selectedContact={selectedContact}
				messages={messages}
				isLoading={isMessagesLoading}
			/>
			<ChatInput onSend={onSend} enabled={isInputEnabled} />
		</>
	);

	return (
		<Paper className={classes.root} elevation={0}>
			<Grid container className={classes.container}>
				<Grid
					item
					xs={12}
					md={4}
					lg={3}
					className={classes.contactContainer}
				>
					{Contacts}
				</Grid>
				<Grid
					item
					xs={12}
					md={8}
					lg={9}
					className={classes.chatContainer}
					{...swipeHandlers}
				>
					{Chat}
				</Grid>

				{/*<Hidden mdUp>
					{selectedContact ? (
						<Grid item xs={12} className={classes.chatContainer}>
							{Chat}
						</Grid>
					) : (
						<Grid item xs={12} className={classes.contactContainer}>
							{Contacts}
						</Grid>
					)}
				</Hidden>*/}
			</Grid>
		</Paper>
	);
}
