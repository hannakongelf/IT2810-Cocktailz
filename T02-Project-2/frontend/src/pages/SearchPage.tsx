import React, { useEffect, useState } from 'react';
import SearchBar from '../components/searchBar/SearchBar';
import Layout from '../layout/Layout';
import { useSearchBar } from '../hooks/searchHooks/useSearchBar';
import PopUpWindow from '../components/spinTheWheel/PopUpWindow';
import FilteredCocktails from '../components/cocktailCards/FilteredCocktails';
import { useLoader } from './../hooks/contextHooks/useLoader';
import { useLocation } from 'react-router-dom';

/**
 * Page to display the search bar, filter options, search results, and toggle between ingredient and drink search
 * @returns SearchPage component
 */

const SearchPage = () => {
	// State to manage the toggle for ingredient or drink search mode
	const [isToggled, setIsToggled] = useState(false);

	// Function to toggle between ingredient search and drink search
	const toggle = () => setIsToggled((prev) => !prev);

	// Custom hook for handling search logic
	const {
		searchValue,
		handleInputChange,
		handleSearch,
		filteredCocktails,
		error,
	} = useSearchBar(isToggled);

	// Access the global loading state from the LoaderContext
	const { isLoading } = useLoader();

	const location = useLocation();

	// Sync the search bar's input value with the URL query parameter on page load
	useEffect(() => {
		const queryParams = new URLSearchParams(location.search);
		const query = queryParams.get('query');

		// If a query exists, update the search bar with it, otherwise reset it
		if (query) {
			handleInputChange({
				target: { value: query },
			} as React.ChangeEvent<HTMLInputElement>);
		} else {
			handleInputChange({
				target: { value: '' },
			} as React.ChangeEvent<HTMLInputElement>);
		}
	}, [location.search, handleInputChange]);

	return (
		<Layout>
			{/* Search bar component for input and toggling between ingredient and drink search */}
			<SearchBar
				searchValue={searchValue} // The current value in the search bar
				handleInputChange={handleInputChange} // Function to update the search bar input
				handleSearch={handleSearch} // Function to handle the search action on Enter key
				loading={isLoading} // Use global loading state
				error={error} // Pass actual error state
				filteredCocktails={filteredCocktails} // Pass filteredCocktails for displaying search results
				isToggled={isToggled} // Toggle state to determine search type (ingredient or drink)
				toggle={toggle} // Function to toggle between ingredient and drink search
			/>

			{/* PopUpWindow component */}
			<PopUpWindow />

			{/* Pass filteredCocktails to CocktailGrid */}
			<FilteredCocktails initialCocktails={filteredCocktails} />
		</Layout>
	);
};

export default SearchPage;
