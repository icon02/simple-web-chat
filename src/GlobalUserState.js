import React, { createContext, useState, useEffect } from "react";

export const GlobalUserContext = createContext();

export const GlobalUserContextProvider = (props) => {
	const [globalUserState, setGlobalUserState] = useState({
		username: "",
		imageUrl: "",
	});

	useEffect(() => {
		return () => {
			if (globalUserState.imageUrl && globalUserState.imageUrl.length > 0)
				URL.revokeObjectURL(globalUserState.imageUrl);
		};
	}, []);

	return (
		<GlobalUserContext.Provider value={[globalUserState, setGlobalUserState]}>
			{props.children}
		</GlobalUserContext.Provider>
	);
};
