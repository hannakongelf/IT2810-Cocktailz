import FavoriteCocktailCardList from '../components/cocktailCards/FavoriteCocktailCard';
import LoadingCard from '../components/loading/LoadingCard';
import { useLoader } from './../hooks/contextHooks/useLoader';
import Layout from '../layout/Layout';

/**
 * Page to display all favorite cocktails
 * @returns FavoritesPage component
 */

const FavoritesPage = () => {
	const { isLoading } = useLoader(); // Access global loading state

	// If loading, show the LoadingCard
	if (isLoading) {
		return <LoadingCard />;
	}

	// Return favoritecocktailcardlist with all favorite cocktails, and review and rating for the favorite
	return (
		<Layout>
			<h1 className="font-oswald font-bold text-3xl md:text-5xl text-black cursor-default">
				Your Favorites
			</h1>
			<FavoriteCocktailCardList />
		</Layout>
	);
};

export default FavoritesPage;
