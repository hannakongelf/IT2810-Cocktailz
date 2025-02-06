import { useQuery } from '@apollo/client';
import { GET_ALL_REVIEWS } from '../../services/ReviewService';
import { useLoader } from '../../hooks/contextHooks/useLoader';
import { useEffect } from 'react';

/**
 * Hook to fetch all reviews for a cocktail from the backend.
 * @param cocktail - The cocktail to fetch the reviews for.
 * @returns loading, error, reviews
 */

const useFetchReviewsByCocktail = (cocktail: string) => {
	const { setIsLoading } = useLoader(); // Access global loading function
	const { data, error, loading } = useQuery(GET_ALL_REVIEWS, {
		variables: { cocktail },
		skip: !cocktail,
	});

	// Set global loading based on the query loading status
	useEffect(() => {
		setIsLoading(loading);
	}, [loading, setIsLoading]);

	return {
		loading,
		error,
		reviews: data?.reviews || [],
	};
};
export default useFetchReviewsByCocktail;
