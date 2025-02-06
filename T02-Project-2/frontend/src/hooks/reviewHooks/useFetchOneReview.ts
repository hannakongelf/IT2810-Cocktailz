import { useQuery } from '@apollo/client';
import { GET_ONE_REVIEW } from '../../services/ReviewService';
import { useLoader } from '../../hooks/contextHooks/useLoader';
import { useEffect } from 'react';

/**
 * Hook to fetch a single review from the backend.
 * @param user - The user to fetch the review for.
 * @param cocktail - The cocktail to fetch the review for.
 * @returns loading, error, oldReview
 */

const useFetchOneReview = (user: string, cocktail: string) => {
	const { setIsLoading } = useLoader(); // Access global loading function
	const { loading, error, data } = useQuery(GET_ONE_REVIEW, {
		variables: { user, cocktail },
		skip: !user || !cocktail,
		notifyOnNetworkStatusChange: true,
		fetchPolicy: 'cache-first',
	});

	// Set global loading based on the query loading status
	useEffect(() => {
		setIsLoading(loading);
	}, [loading, setIsLoading]);

	return {
		loading,
		error,
		oldReview: data?.review ?? null,
	};
};

export default useFetchOneReview;
