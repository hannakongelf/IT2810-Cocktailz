import { useApolloClient, useMutation } from '@apollo/client';
import { ADD_REVIEW, GET_ONE_REVIEW } from '../../services/ReviewService';
import { useLoader } from '../../hooks/contextHooks/useLoader';
import { useEffect } from 'react';

/**
 * Hook to update a review in the backend.
 * @returns updateReview, loading, error
 */

const useUpdateReviews = () => {
	const client = useApolloClient();
	const { setIsLoading } = useLoader(); // Access global loading function

	const [updateReview, { loading: updateLoading, error: updateError }] =
		useMutation(ADD_REVIEW, {
			update(cache, { data }) {
				// Update the cache with the review
				if (data && data.updateReview !== null) {
					const { updateReview } = data;
					cache.writeQuery({
						query: GET_ONE_REVIEW,
						variables: {
							user: updateReview.user,
							cocktail: updateReview.cocktail,
						},
						data: {
							review: updateReview,
						},
					});
					client.refetchQueries({
						include: ['GetOneReview'],
					});
				}
			},
		});

	// Set global loading based on the mutation loading status
	useEffect(() => {
		setIsLoading(updateLoading);
	}, [updateLoading, setIsLoading]);

	return {
		updateReview,
		loading: updateLoading,
		error: updateError,
	};
};

export default useUpdateReviews;
