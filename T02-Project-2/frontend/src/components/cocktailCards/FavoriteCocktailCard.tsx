import CocktailCard from './CocktailCard';
import CocktailRatingComponent from '../cocktailRating/CocktailRatingComponent';
import CocktailReviewComponent from '../cocktailRating/CocktailReviewComponent';
import { Cocktail } from '../../types/CocktailInterface';
import useFavorites from '../../hooks/favoriteHooks/useFavoriteList';
import { useLoader } from '../../hooks/contextHooks/useLoader';
import LoadingCard from '../loading/LoadingCard';

/**
 * Component to display a list of favorite cocktails with rating and review components.
 * @returns FavoriteCocktailCardList component.
 */

const FavoriteCocktailCardList = () => {
	// Use the useFavorites hook to fetch the list of favorite cocktails
	const { favoritesList, error } = useFavorites();

	// Use global loading context
	const { isLoading } = useLoader();

	// Handle loading and error states
	if (isLoading) return <LoadingCard />;
	if (error) return <p>Error loading favorites. Please try again.</p>;

	// Render the favorites list with the CocktailCard, CocktailRatingComponent, and CocktailReviewComponent
	return (
		<section className="grid grid-cols-2 p-8 sm:grid-cols-1 md:grid-cols-1 md:gap-8 md:p-16">
			{favoritesList.length !== 0 ? (
				favoritesList.map((favorite: Cocktail) => (
					<section
						key={favorite.id}
						className="flex flex-col items-center mb-6 md:mb-0 md:flex-row md:items-stretch"
					>
						<CocktailCard drink={favorite} />
						<section className="flex flex-col items-center md:mt-14 md:ml-6">
							<CocktailRatingComponent cocktail={favorite} />
							<CocktailReviewComponent cocktail={favorite} />
						</section>
					</section>
				))
			) : (
				<p className="text-black font-oswald lg:text-[1.3rem] cursor-default">
					You have no favorites yet! Log in or favorite your first cocktail!
				</p>
			)}
		</section>
	);
};

export default FavoriteCocktailCardList;
