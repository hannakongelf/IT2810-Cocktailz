import { useEffect, useState } from 'react';
import { useUser } from '../contextHooks/useUser';
import useFetchUsersFavorites from './useFetchUsersFavorites';
import { Cocktail } from '../../types/CocktailInterface';
import { useLoader } from '../../hooks/contextHooks/useLoader';

/**
 * Hook to fetch the list of favorite cocktails
 * @returns favoritesList, error
 */

const useFavoriteList = () => {
	// Get the user profile from the UserContext
	const { profile } = useUser();
	const userEmail = profile ? profile.email : '';

	// Use hook to fetch the list of favorite cocktails
	const { error, loading, favorites } = useFetchUsersFavorites(userEmail);

	// Use global loading context
	const { setIsLoading } = useLoader();

	// State to store the favorite cocktails
	const [favoritesList, setFavoritesList] = useState<Cocktail[]>([]);

	useEffect(() => {
		// Set the global loading state when the component is loading
		setIsLoading(loading);
	}, [loading, setIsLoading]);

	// Update the favorite cocktails list when the favorites change
	useEffect(() => {
		if (favorites && favorites.length > 0) {
			setFavoritesList(favorites);
		} else if (favorites.length === 0) {
			setFavoritesList([]);
		}
	}, [favorites]);

	return {
		favoritesList,
		error,
	};
};
export default useFavoriteList;
