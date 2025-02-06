import { useContext } from 'react';
import { LoaderContext } from '../../contexts/LoaderContext';

/**
 * Custom hook for accessing the LoaderContext.
 * Ensures that the hook is used within a LoaderProvider.
 * @throws Error if used outside of LoaderProvider.
 */

export const useLoader = () => {
	const context = useContext(LoaderContext);
	if (!context) {
		throw new Error('useLoader must be used within a LoaderProvider');
	}
	return context;
};
