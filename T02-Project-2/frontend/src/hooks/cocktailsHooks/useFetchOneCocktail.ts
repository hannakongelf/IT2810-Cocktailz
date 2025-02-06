// useOneCocktail.ts
import { useQuery } from '@apollo/client';
import { GET_COCKTAIL } from '../../services/CocktailsService';
import { useLoader } from '../../hooks/contextHooks/useLoader';
import { useEffect } from 'react';

/**
 * Hook to fetch a single cocktail from the backend
 * @param cocktailName - The name of the cocktail to fetch
 * @returns loading, error, cocktail
 */

export const useFetchOneCocktail = (cocktailName: string) => {
	const { loading, error, data } = useQuery(GET_COCKTAIL, {
		variables: { name: cocktailName },
	});

	// Access global loading function
	const { setIsLoading } = useLoader();

	// Set the global loading state based on the loading status of the query
	useEffect(() => {
		setIsLoading(loading);
	}, [loading, setIsLoading]);

	return {
		loading,
		error,
		cocktail: data ? data.cocktail : null,
	};
};
export default useFetchOneCocktail;
