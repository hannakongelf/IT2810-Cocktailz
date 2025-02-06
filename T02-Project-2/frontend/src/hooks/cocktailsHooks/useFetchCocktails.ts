import { useQuery } from '@apollo/client';
import { GET_ALL_COCKTAILS } from '../../services/CocktailsService';
import { useLoader } from '../../hooks/contextHooks/useLoader';
import { useEffect } from 'react';

/**
 * Hook to fetch all cocktails from the backend
 * @returns loading, error, cocktails
 */

const useCocktails = () => {
	const { loading, error, data } = useQuery(GET_ALL_COCKTAILS);

	const { setIsLoading } = useLoader(); // Access global loading function

	// Set the global loading state based on the loading status of the query
	useEffect(() => {
		setIsLoading(loading);
	}, [loading, setIsLoading]);

	return {
		loading,
		error,
		cocktails: data?.cocktails || [],
	};
};

export default useCocktails;
