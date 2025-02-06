import CocktailGrid from '../components/cocktailCards/CocktailGrid';
import SearchBar from '../components/searchBar/SearchBar';
import TodaysCocktail from '../components/cocktailCards/TodaysCocktail';
import Layout from '../layout/Layout';
import { useSearchBar } from '../hooks/searchHooks/useSearchBar';
import FilteredCocktails from '../components/cocktailCards/FilteredCocktails';
import PopUpWindow from '../components/spinTheWheel/PopUpWindow';
import { useUser } from '../hooks/contextHooks/useUser';
import ScrollBar from '../components/scrollBar/ScrollBar';

/**
 * Home page with searchbar, todayscocktail, filteredcocktailgrid and filteredcocktails
 * @returns HomePage component
 */

const HomePage = () => {
	const {
		searchValue,
		handleInputChange,
		handleSearch,
		filteredCocktails,
		error,
	} = useSearchBar();
	const { profile } = useUser();

	// If error, display error message
	if (error) return <p>Error loading cocktails: {error.message}</p>;

	// Return the layout with the searchbar, todayscocktail, filteredcocktailgrid and filteredcocktails
	return (
		<Layout>
			<ScrollBar />

			{/* SearchBar component */}
			<SearchBar
				searchValue={searchValue}
				handleInputChange={handleInputChange}
				handleSearch={handleSearch}
				error={error}
				filteredCocktails={[]}
				loading={false}
			/>

			{/* Title */}
			<h1 className="font-fredoka font-bold text-5xl text-dark-pink m-8 mb-10 md:m-8 md:text-7xl cursor-default">
				Cocktailz
			</h1>

			{/* PopUpWindow component */}
			<PopUpWindow />

			{/* Display message to log in to favorite cocktails if not logged in */}
			{!profile ? (
				<p className="text-black font-quicksand font-bold lg:text-[1.3rem] mb-2 cursor-default">
					Log in to favorite cocktails!
				</p>
			) : null}

			{/* Conditionally render TodaysCocktail if there's no active search */}
			{!searchValue && <TodaysCocktail />}
			{!searchValue && <FilteredCocktails />}

			{/* Display filtered cocktails outside of the search bar */}
			{searchValue && (
				<CocktailGrid cocktails={filteredCocktails} error={error} />
			)}
		</Layout>
	);
};

export default HomePage;
