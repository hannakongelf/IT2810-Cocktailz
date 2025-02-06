import Rating from '@mui/material/Rating';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import useManageRating from '../../hooks/ratingHooks/useManageRating.ts';
import { Cocktail } from '../../types/CocktailInterface.ts';

export interface CocktailRatingComponentProps {
	cocktail: Cocktail;
}

/**
 * Component to display the rating of a cocktail.
 * @param {Cocktail} cocktail - The cocktail object.
 * @returns CocktailRatingComponent component.
 */

const CocktailRatingComponent: React.FC<CocktailRatingComponentProps> = ({
	cocktail,
}) => {
	// Get the rating and handleRatingChange function from the useManageRating hook
	const { rating, handleRatingChange, profile, cocktailName } =
		useManageRating(cocktail);

	// Return the rating component with the rating value and onChange function from useManageRating
	return (
		<>
			{profile && profile.email ? (
				<Rating
					value={rating}
					onChange={handleRatingChange}
					icon={
						<LocalBarIcon className="lg:w-8 lg:h-8 md:w-7 md:h-7 sm:w-5 sm:h-5" />
					}
					emptyIcon={
						<LocalBarIcon className="lg:w-8 lg:h-8 md:w-7 md:h-7 sm:w-5 sm:h-5" />
					}
					aria-label={`Rate the cocktail ${cocktailName}. Current rating is ${rating} stars.`}
					className="cursor-pointer"
					data-testid="RatingComponent"
				/>
			) : null}
		</>
	);
};

export default CocktailRatingComponent;
