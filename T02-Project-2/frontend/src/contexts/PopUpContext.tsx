import React, { createContext, useState, ReactNode } from 'react';

// Define interface for the context
interface PopUpContextType {
	isPopUpVisible: boolean;
	setIsPopUpVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create the context
const PopUpContext = createContext<PopUpContextType | undefined>(undefined);

// Define interface for the provider component
interface PopUpProviderProps {
	children: ReactNode;
}

/**
 * Provider component to wrap the application and provide the pop-up state.
 * @param {ReactNode} children - The children components.
 * @returns The PopUpProvider component.
 */

export const PopUpProvider: React.FC<PopUpProviderProps> = ({ children }) => {
	const [isPopUpVisible, setIsPopUpVisible] = useState(false);

	return (
		<PopUpContext.Provider value={{ isPopUpVisible, setIsPopUpVisible }}>
			{children}
		</PopUpContext.Provider>
	);
};

export { PopUpContext };
