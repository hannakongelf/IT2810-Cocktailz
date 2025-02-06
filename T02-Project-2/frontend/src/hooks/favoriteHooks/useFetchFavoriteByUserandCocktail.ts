import { useQuery } from '@apollo/client';
import { GET_FAVORITES_BY_USER_AND_COCKTAIL } from '../../services/FavoriteService';
import { useLoader } from '../../hooks/contextHooks/useLoader';
import { useEffect } from 'react';

/**
 * Hook to fetch the favorite status of a cocktail by a user from the backend
 * @param user - The user to check the favorite status for
 * @param cocktail - The cocktail to check the favorite status for
 * @returns isFavorite, error
 */

const useFetchFavoriteByUserandCocktail = (user: string, cocktail: string) => {
	const { setIsLoading } = useLoader();
	const { data, loading, error } = useQuery(
		GET_FAVORITES_BY_USER_AND_COCKTAIL,
		{
			variables: { user, cocktail },
			skip: !user || !cocktail,
			notifyOnNetworkStatusChange: true,
			fetchPolicy: 'cache-first',
		}
	);

	useEffect(() => {
		setIsLoading(loading);
		return () => setIsLoading(false);
	}, [loading, setIsLoading]);

	return {
		error,
		isFavorite: data?.favorite ?? null,
	};
};

export default useFetchFavoriteByUserandCocktail;
