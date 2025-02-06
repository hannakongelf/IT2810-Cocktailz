import { useContext } from 'react';
import { PopUpContext } from '../../contexts/PopUpContext';

/**
 * Custom hook for accessing the PopUpContext.
 * Ensures that the hook is used within a PopUpProvider.
 * @throws Error if used outside of PopUpProvider.
 */

export const usePopUp = () => {
	const context = useContext(PopUpContext);
	if (!context) {
		throw new Error('usePopUp must be used within a PopUpProvider');
	}
	return context;
};
