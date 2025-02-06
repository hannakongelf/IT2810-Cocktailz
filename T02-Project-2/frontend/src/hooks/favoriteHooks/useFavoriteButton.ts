import { Cocktail } from '../../types/CocktailInterface';
import useUpdateFavorite from './useUpdateFavorite';
import { useUser } from '../contextHooks/useUser';
import { ApolloError } from '@apollo/client/errors';
import useFetchFavoriteByUserandCocktail from './useFetchFavoriteByUserandCocktail';
import { useEffect, useState } from 'react';
import { useLoader } from '../../hooks/contextHooks/useLoader';

interface usefavoriteButtonReturn {
	favorite: boolean | null;
	loading: boolean;
	error: ApolloError | undefined;
	handleFavoriteChange: () => Promise<void>;
}

/**
 * Hook to handle the favorite button functionality
 * @param cocktail - The cocktail to favorite
 * @returns favorite, loading, error, handleFavoriteChange
 */

export const useFavoriteButton = (
	cocktail: Cocktail
): usefavoriteButtonReturn => {
	// Get the user profile from the UserContext and the cocktail name
	const { profile } = useUser();
	const userEmail = profile ? profile.email : '';
	const cocktailName = cocktail ? cocktail.name : '';

	// get updateFavorite mutation and favorited cocktail query to update and check the favorite status
	const { updateFavorite, loading, error } = useUpdateFavorite();

	// Use global loading context
	const { setIsLoading } = useLoader();

	// Fetch the favorite status of the cocktail by the user and cocktail name
	const { isFavorite } = useFetchFavoriteByUserandCocktail(
		userEmail,
		cocktailName
	);
	const [favorite, setFavorite] = useState<boolean | null>(null);

	// Check if the cocktail is already favorited and set the favorite state
	useEffect(() => {
		if (isFavorite && typeof isFavorite.favorite === 'boolean') {
			setFavorite(isFavorite.favorite);
		}
	}, [isFavorite]);

	// Handle the favorite button click and update the favorite status in the database
	const handleFavoriteChange = async () => {
		if (!profile) {
			console.error('User is required to perform this action.');
			alert('You need to be logged in to favorite cocktails.');
			return;
		}

		setIsLoading(true);
		setFavorite(!favorite);

		// Update the favorite in the database with the user's email and the cocktail name if true or delete it if false
		if (userEmail && cocktailName) {
			try {
				await updateFavorite({
					variables: { user: userEmail, cocktail: cocktailName },
				});
			} catch (error) {
				console.error('Error updating favorite:', error);
			} finally {
				setIsLoading(false); // End global loading state
			}
		}
	};

	return { favorite, loading, error, handleFavoriteChange };
};

export default useFavoriteButton;
