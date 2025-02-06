import { useApolloClient, useMutation } from '@apollo/client';
import {
	GET_FAVORITES_BY_USER,
	UPDATE_FAVORITE,
} from '../../services/FavoriteService';
import { useLoader } from '../../hooks/contextHooks/useLoader';
import { useEffect } from 'react';

/**
 * Hook to update a user's favorite cocktail in the backend
 * @returns updateFavorite, loading, error
 */

const useUpdateUserFavorite = () => {
	const client = useApolloClient();
	const { setIsLoading } = useLoader();

	const [updateFavorite, { loading, error }] = useMutation(UPDATE_FAVORITE, {
		update(cache, { data: { updateFavorite } }) {
			// Update the cache with the updated favorite cocktail by user
			if (updateFavorite) {
				cache.writeQuery({
					query: GET_FAVORITES_BY_USER,
					data: {
						favorites: [updateFavorite],
					},
					variables: { user: updateFavorite.user },
				});
			}
			client.resetStore();
		},
	});

	useEffect(() => {
		setIsLoading(loading);
		return () => setIsLoading(false);
	}, [loading, setIsLoading]);

	return {
		updateFavorite,
		loading,
		error,
	};
};

export default useUpdateUserFavorite;
