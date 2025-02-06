import { useState, useEffect } from 'react';
import { usePopUp } from '../contextHooks/usePopUp';
import { usePageTypeFromUrl } from '../pageHooks/usePageTypeFromUrl';

/**
 * Hook to control the popup window visibility and focus trap.
 * @returns - The popup visibility and functions to control it.
 * @returns - The focus trap state.
 * @returns - The function to close the popup window.
 * @returns - Boolean to determine if the popup should render.
 */

export const usePopUpLogic = () => {
	const { isPopUpVisible, setIsPopUpVisible } = usePopUp();
	const isHomeOrSearchPage = usePageTypeFromUrl();
	const [isFocusTrapActive, setIsFocusTrapActive] = useState(false);

	// Update the focus trap when the popup visibility changes
	useEffect(() => {
		setIsFocusTrapActive(isPopUpVisible);
	}, [isPopUpVisible]);

	// Function to close the popup window
	const handleCloseWindow = () => {
		setIsPopUpVisible(false);
	};

	// Determine if the popup should render when it is visible and on the home or search page
	const shouldRender = isPopUpVisible && isHomeOrSearchPage;

	// Return the relevant state and functions to control the popup
	return { shouldRender, isFocusTrapActive, handleCloseWindow };
};
