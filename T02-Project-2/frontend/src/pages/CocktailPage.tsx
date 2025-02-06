import IngredientCard from '../components/ingredients/IngredientCard';
import Layout from '../layout/Layout';
import { useParams } from 'react-router-dom';
import CocktailCard from '../components/cocktailCards/CocktailCard';
import CocktailRatingComponent from '../components/cocktailRating/CocktailRatingComponent';
import { useUser } from '../hooks/contextHooks/useUser';
import useFetchOneCocktail from '../hooks/cocktailsHooks/useFetchOneCocktail';
import CommentFieldComponent from '../components/cocktailRating/CommentFieldComponent';
import LoadingCard from '../components/loading/LoadingCard';

/**
 * Page to display a single cocktail with its ingredients, ratings and comments
 * @returns CocktailPage component
 */

const CocktailPage = () => {
	// get user profile and cocktail from the database
	const { profile } = useUser();
	const { id } = useParams<{ id: string }>();
	const { cocktail: cocktail, loading, error } = useFetchOneCocktail(id || '');

	// Display loading card if data is still loading
	if (loading) return <LoadingCard />;

	if (error) return <p>Error loading cocktail and user: {error.message}</p>;

	// return cocktailpage with cocktailcard, ingredientcard, cocktailratingcomponent and commentfieldcomponent
	return (
		<Layout>
			<>
				<section className="flex flex-col md:flex-row mb-4 md:mb-6">
					<section>
						<section className=" flex flex-col items-center">
							<CocktailCard drink={cocktail} />
						</section>
						{profile && cocktail && (
							<CocktailRatingComponent cocktail={cocktail} />
						)}
					</section>
					<IngredientCard />
				</section>

				{profile && <CommentFieldComponent cocktail={cocktail} />}
			</>
			{!profile && (
				<p className="text-black font-quicksand font-medium lg:text-[1.3rem]">
					{' '}
					Please log in to leave your opinion on this cocktail
				</p>
			)}
		</Layout>
	);
};

export default CocktailPage;
