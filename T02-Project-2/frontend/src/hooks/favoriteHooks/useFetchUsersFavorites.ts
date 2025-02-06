import { useQuery } from '@apollo/client';
import {
	GET_FAVORITES_BY_USER,
	GET_COCKTAIL_DETAILS,
} from '../../services/FavoriteService';
import { useEffect, useState } from 'react';
import { Cocktail } from '../../types/CocktailInterface';
import { useApolloClient } from '@apollo/client';
import { Favorite } from '../../types/FavoriteInterface';
import { useLoader } from '../../hooks/contextHooks/useLoader';

/**
 * Hook to fetch a user's favorite cocktails from the backend and fetch the full details of the cocktails
 * @param user - The user to fetch the favorites for
 * @returns loading, error, favorites
 */

const useFetchUsersFavorites = (user: string) => {
	const client = useApolloClient();
	const { setIsLoading } = useLoader();
	const { error, loading, data } = useQuery(GET_FAVORITES_BY_USER, {
		variables: { user: user },
		skip: !user,
		notifyOnNetworkStatusChange: true,
		fetchPolicy: 'cache-first',
	});

	// State to store a list of cocktails with full details
	const [fullCocktails, setFullCocktails] = useState<Cocktail[]>([]);

	useEffect(() => {
		setIsLoading(loading);
		return () => setIsLoading(false);
	}, [loading, setIsLoading]);

	// After fetching favorite cocktail names, fetch full cocktail details to use in CocktailCard
	useEffect(() => {
		const fetchCocktailDetails = async () => {
			if (data && data.favorites) {
				setIsLoading(true);
				const cocktailDetails = await Promise.all(
					data.favorites.map(async (fav: Favorite) => {
						const { data } = await client.query({
							query: GET_COCKTAIL_DETAILS,
							variables: { name: fav.cocktail },
						});
						return data.cocktail;
					})
				);
				setFullCocktails(cocktailDetails);
				setIsLoading(false);
			}
		};

		fetchCocktailDetails();
	}, [data, client, setIsLoading]);

	return {
		error,
		favorites: fullCocktails,
		loading,
	};
};

export default useFetchUsersFavorites;
