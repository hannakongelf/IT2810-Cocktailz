import { useApolloClient, useMutation } from '@apollo/client';
import { GET_ONE_RATING, UPDATE_RATING } from '../../services/RatingService';
import { useLoader } from '../../hooks/contextHooks/useLoader';
import { useEffect } from 'react';

// Hook to update a rating in the backend using a mutation
const useUpdateRating = () => {
	const client = useApolloClient();
	const { setIsLoading } = useLoader(); // Access global loading function

	const [updateRating, { loading, error, data }] = useMutation(UPDATE_RATING, {
		update(cache, { data }) {
			// Update the cache with the rating
			if (data && data.updateRating !== null) {
				const { updateRating } = data;

				cache.writeQuery({
					query: GET_ONE_RATING,
					variables: {
						user: updateRating.user,
						cocktail: updateRating.cocktail,
					},
					data: {
						rating: updateRating,
					},
				});
			}
			client.refetchQueries({
				include: ['GetOneRating'],
			});
		},
	});

	// Set global loading based on the mutation loading status
	useEffect(() => {
		setIsLoading(loading);
	}, [loading, setIsLoading]);

	return {
		updateRating,
		loading,
		error,
		data,
	};
};

export default useUpdateRating;
