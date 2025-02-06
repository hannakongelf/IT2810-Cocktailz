import FavoriteIcon from '@mui/icons-material/Favorite';
import { Cocktail } from '../../types/CocktailInterface';
import { useFavoriteButton } from '../../hooks/favoriteHooks/useFavoriteButton.ts';
import { getButtonColors } from '../../utils/ButtonColorUtils';
import { usePageTypeFromUrl } from '../../hooks/pageHooks/usePageTypeFromUrl.ts';
import { useLoader } from '../../hooks/contextHooks/useLoader';
import { useEffect } from 'react';

interface FavoriteButtonProps {
	cocktail: Cocktail;
}

/**
 * Component to display the favorite button.
 * @param {Cocktail} cocktail - The cocktail object.
 * @returns FavoriteButton component.
 */

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ cocktail }) => {
	// Get the favorite, loading, error, and handleFavoriteChange from useFavorite
	const { favorite, loading, error, handleFavoriteChange } =
		useFavoriteButton(cocktail);

	// Use global loading context
	const { setIsLoading } = useLoader();

	// Set global loading state whenever local loading state changes
	useEffect(() => {
		setIsLoading(loading);
	}, [loading, setIsLoading]);

	// Get current page and get button colors for this page
	const page = usePageTypeFromUrl();
	const { buttonColorLiked, buttonColorUnLiked } = getButtonColors(page);

	// If error, display error message
	if (error) return <p>Error loading cocktails: {error?.message}</p>;

	// Return the FavoriteIcon with the handleFavoriteChange function
	return (
		<FavoriteIcon
			onClick={handleFavoriteChange}
			onKeyDown={(e) => e.key === 'Enter' && handleFavoriteChange()}
			aria-label="favorite"
			tabIndex={0}
			className={`lg:w-8 lg:h-8 md:w-7 md:h-7 sm:w-6 sm:h-6 cursor-pointer hover:scale-110 focus:outline-none focus-visible:stroke-2 focus-visible:border-b-2 focus-visible:border-black focus-visible:border-opacity-25 
				${favorite ? buttonColorLiked : buttonColorUnLiked}`}
		/>
	);
};

export default FavoriteButton;
