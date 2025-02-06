import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';

/**
 * Custom hook for accessing the UserContext.
 * Ensures that the hook is used within a UserProvider.
 * @throws Error if used outside of UserProvider.
 */

export const useUser = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error('useUser must be used within a UserProvider');
	}
	return context;
};
