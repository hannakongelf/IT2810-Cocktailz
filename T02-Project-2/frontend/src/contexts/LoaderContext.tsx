import { createContext, useState, ReactNode, useEffect } from 'react';

// Define the shape of the context
interface LoaderContextProps {
	isLoading: boolean;
	delayedLoading: boolean;
	setIsLoading: (loading: boolean) => void;
}

// Create the context
const LoaderContext = createContext<LoaderContextProps | undefined>(undefined);

/**
 * Provider component to wrap the application and provide the loading state.
 * @param {ReactNode} children - The children components.
 * @returns The LoaderProvider component.
 */

export const LoaderProvider = ({ children }: { children: ReactNode }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [delayedLoading, setDelayedLoading] = useState(false);

	useEffect(() => {
		let timeout: NodeJS.Timeout | undefined;
		if (isLoading) {
			// Show the loading popup after 1 second
			timeout = setTimeout(() => setDelayedLoading(true), 1000);
		} else {
			// Immediately hide the loading popup when loading stops
			setDelayedLoading(false);
			clearTimeout(timeout);
		}

		// Cleanup timeout if `isLoading` changes
		return () => clearTimeout(timeout);
	}, [isLoading]);

	return (
		<LoaderContext.Provider value={{ isLoading, delayedLoading, setIsLoading }}>
			{children}
		</LoaderContext.Provider>
	);
};

export { LoaderContext };
