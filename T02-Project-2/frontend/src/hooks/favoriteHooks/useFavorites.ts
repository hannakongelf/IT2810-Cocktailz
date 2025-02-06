import { useEffect, useState } from 'react';
import { useUser } from '../contextHooks/useUser';
import useFetchUsersFavorites from './useFetchUsersFavorites';
import { Cocktail } from '../../types/CocktailInterface';
import { useLoader } from '../../hooks/contextHooks/useLoader';

/**
 * Hook to fetch the list of favorite cocktails
 * @returns favoritesList, error
 */

const useFavorites = () => {
	// Retrieve the logged-in user's profile
	const { profile } = useUser();
	const userEmail = profile ? profile.email : '';

	// Use custom hook to fetch the list of favorite cocktails
	const { loading, error, favorites } = useFetchUsersFavorites(userEmail);

	// Access the global loader context
	const { setIsLoading } = useLoader();

	// State to store the favorite cocktails
	const [favoritesList, setFavoritesList] = useState<Cocktail[]>([]);

	// Set the global loading state based on the loading state of this hook
	useEffect(() => {
		setIsLoading(loading);
	}, [loading, setIsLoading]);

	// Effect to update the favorite cocktails once fetched
	useEffect(() => {
		if (favorites && favorites.length > 0) {
			setFavoritesList(favorites);
		} else if (favorites.length === 0) {
			setFavoritesList([]);
		}
	}, [favorites]);

	return {
		favoritesList,
		loading,
		error,
	};
};
export default useFavorites;
