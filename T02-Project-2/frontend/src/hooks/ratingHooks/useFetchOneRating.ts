import { useQuery } from '@apollo/client';
import { GET_ONE_RATING } from '../../services/RatingService';
import { useLoader } from '../../hooks/contextHooks/useLoader';
import { useEffect } from 'react';

/**
 * Hook to fetch a single rating from the backend.
 * @param user - The user to fetch the rating for.
 * @param cocktail - The cocktail to fetch the rating for.
 * @returns loading, error, oldRating
 */

const useFetchOneRating = (user: string, cocktail: string) => {
	const { loading, error, data } = useQuery(GET_ONE_RATING, {
		variables: { user, cocktail },
		skip: !user || !cocktail,
		notifyOnNetworkStatusChange: true,
		fetchPolicy: 'cache-first',
	});

	const { setIsLoading } = useLoader(); // Access global loading function

	// Set the global loading state based on the loading status of the query
	useEffect(() => {
		setIsLoading(loading);
	}, [loading, setIsLoading]);

	return {
		loading,
		error,
		oldRating: data?.rating ?? null,
	};
};

export default useFetchOneRating;
