import { useParams } from 'react-router-dom';
import useCocktails from '../../hooks/cocktailsHooks/useFetchCocktails';
import { Cocktail, Ingredient } from '../../types/CocktailInterface';
import useFetchAllRatings from '../../hooks/ratingHooks/useFetchRatingsByCocktail';
import calculateAverageRating from '../../utils/averageRating';
import { useLoader } from '../../hooks/contextHooks/useLoader';
import LoadingCard from '../loading/LoadingCard';

/**
 * IngredientCard component to display the ingredients for a cocktail.
 * @returns IngredientCard component.
 */

const IngredientCard = () => {
	// Get id (name) from URL
	const { id } = useParams<{ id: string }>();

	// Fetch ratings for the cocktail
	const { ratings } = useFetchAllRatings(id || '');

	// Fetch all cocktails using the useCocktails hook
	const { error, cocktails } = useCocktails();

	// Use global loading context
	const { isLoading } = useLoader();

	// If loading, display loading card
	if (isLoading) return <LoadingCard />;

	// Display error message if there is an error
	if (error) return <p>Error loading cocktails: {error.message}</p>;

	// Find the drink with the id that matches the id from URL
	const drink = cocktails.find((cocktail: Cocktail) => cocktail.name === id);
	const averageRating = calculateAverageRating(ratings);

	// Return the ingredient card with the ingredients for the cocktail
	return (
		<section className="p-10 md:p-10 md:pr-32 bg-dark-blue rounded-lg shadow-2xl">
			{/* If drink is found, display the ingredients */}
			{drink ? (
				<>
					<header>
						<h1 className="font-quicksand lg:text-[1.5rem] sm:text-[1rem] font-bold text-black">
							Ingredients for {drink.name}:
						</h1>
						<p className="flex justify-between text-black py-2 font-quicksand font-bold italic sm:text-[0.8rem] md:text-[1rem]">
							{averageRating
								? `Average Rating: ${averageRating}`
								: 'No ratings yet'}
						</p>
					</header>

					<ul>
						{drink.ingredients.map((ingredient: Ingredient, index: number) => (
							<li
								key={index}
								className="flex justify-between text-black py-2 border-b border-blue-text font-quicksand sm:text-[0.9rem] md:text-[1rem]"
							>
								{ingredient.amount} of {ingredient.name}
							</li>
						))}
					</ul>
				</>
			) : (
				<p>Loading.....</p>
			)}
		</section>
	);
};

export default IngredientCard;
