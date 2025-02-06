import { useQuery } from '@apollo/client';
import { GET_ALL_RATINGS } from '../../services/RatingService';
import { useLoader } from '../../hooks/contextHooks/useLoader';
import { useEffect } from 'react';

/**
 * Hook to fetch all ratings for a cocktail from the backend.
 * @param cocktail - The cocktail to fetch the ratings for.
 * @returns loading, error, ratings
 */

const useFetchAllRatingsByCocktail = (cocktail: string) => {
	const { data, error, loading } = useQuery(GET_ALL_RATINGS, {
		variables: { cocktail },
		skip: !cocktail,
		fetchPolicy: 'network-only',
	});

	const { setIsLoading } = useLoader(); // Access global loading function

	// Set the global loading state based on the loading status of the query
	useEffect(() => {
		setIsLoading(loading);
	}, [loading, setIsLoading]);

	return {
		loading,
		error,
		ratings: data?.ratings || [],
	};
};
export default useFetchAllRatingsByCocktail;
