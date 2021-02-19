import React, { useState, createRef } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { InputBase, IconButton, FormControl, Tooltip } from "@material-ui/core";
import {
	AttachFileOutlined as AttachmentIcon,
	Attachment as AttachedIcon,
	SendOutlined as SendIcon,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		display: "flex",
		flexDirection: "row",

		alignItems: "flex-end",
		height: 48,
	},
	input: {
		display: "none",
	},
	inputBase: {
		flexGrow: 1,
		minHeight: 48,
	},
}));

export default function ChatInput({ onSend, enabled, ...props }) {
	const classes = useStyles();
	const inputRef = createRef(null);
	const [message, setMessage] = useState({ message: "", attachment: null });

	function sendOnClick() {
		console.log({ ...message });
		onSend({ ...message });
		setMessage({ message: "", attachment: null });
	}

	function textInputOnChange(e) {
		setMessage({ ...message, message: e.target.value });
	}

	function attachmentButtonOnClick() {
		if (message.attachment == null) {
			if (inputRef && inputRef.current) inputRef.current.click();
		} else {
			setMessage({ ...message, attachment: null });
		}
	}

	function attachmentOnChange(e) {
		console.log(e.target.files[0]);
		setMessage({
			...message,
			attachment: { name: e.target.files[0].name, file: e.target.files[0] },
		});
	}

	function handleKeyPress(e) {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			sendOnClick(e);
		}
	}

	return (
		<FormControl className={classes.root} elevation={0} {...props}>
			<input
				type="file"
				accept="image/*, .pdf"
				className={classes.input}
				onChange={attachmentOnChange}
				ref={inputRef}
			/>
			<IconButton onClick={attachmentButtonOnClick} disabled={!enabled}>
				{message.attachment == null ? (
					<Tooltip placement="top-start" title="Click to attach">
						<AttachmentIcon />
					</Tooltip>
				) : (
					<Tooltip placement="top-start" title="Click to remove">
						<AttachedIcon color="primary" />
					</Tooltip>
				)}
			</IconButton>
			<InputBase
				disabled={!enabled}
				placeholder="Aa"
				className={classes.inputBase}
				multiline
				rowsMax={10}
				value={message.message}
				onChange={textInputOnChange}
				onKeyPress={handleKeyPress}
			/>
			<IconButton onClick={sendOnClick} disabled={!enabled}>
				<SendIcon color={enabled ? "primary" : ""} />
			</IconButton>
		</FormControl>
	);
}
