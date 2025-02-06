import useUpdateRating from './useUpdateRating.ts';
import { useEffect, useState } from 'react';
import useFetchOneRating from './useFetchOneRating.ts';
import { useUser } from '../../hooks/contextHooks/useUser.ts';
import { Cocktail } from '../../types/CocktailInterface.ts';

const useManageRating = (cocktail: Cocktail) => {
	// Get user and cocktail name
	const { profile } = useUser();
	const userEmail = profile ? profile.email : '';
	const cocktailName = cocktail ? cocktail.name : '';

	// Get and update rating from/in the database
	const { updateRating } = useUpdateRating();
	const { oldRating } = useFetchOneRating(userEmail, cocktailName);

	// Set the initial rating to 0
	const [rating, setRating] = useState<number>(0);

	// Load the rating from the database and set it as the initial rating
	useEffect(() => {
		if (oldRating && typeof oldRating.rating === 'number') {
			setRating(oldRating.rating);
		} else {
			setRating(0);
		}
	}, [oldRating]);

	// Handle rating change when the user selects a new rating value and update the rating in the database
	const handleRatingChange = async (
		_event: React.SyntheticEvent,
		newValue: number | null
	) => {
		// If new value is null, set the rating to 0
		if (newValue === null) {
			newValue = 0;
			setRating(0);

			// If new new value set the rating to the new value
		} else if (newValue !== null) {
			setRating(newValue);
		}
		// Update the rating in the database with the user's email, the cocktail name and the new rating
		if (userEmail && cocktailName) {
			try {
				await updateRating({
					variables: {
						user: userEmail,
						cocktail: cocktailName,
						rating: newValue,
					},
				});
			} catch (error) {
				console.error('Error updating rating:', error);
			}
		}
	};

	return { rating, handleRatingChange, profile, cocktailName };
};
export default useManageRating;
