import { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useCocktails from '../cocktailsHooks/useFetchCocktails';
import { Cocktail } from '../../types/CocktailInterface';
import { useLoader } from '../../hooks/contextHooks/useLoader';

/**
 * Hook to manage the search bar state and filtering of cocktails based on the search value
 * @param isToggled - Boolean to determine if the search is for ingredients
 * @returns searchValue, handleInputChange, handleSearch, filteredCocktails, error, isToggled
 */

export const useSearchBar = (isToggled?: boolean) => {
	const navigate = useNavigate();
	const location = useLocation();
	const { error, cocktails } = useCocktails();
	const { setIsLoading } = useLoader(); // Use the global loading context

	const queryParams = new URLSearchParams(location.search);
	const initialQuery = queryParams.get('query') || '';

	// State to store the search input value
	const [searchValue, setSearchValue] = useState('');
	const [filteredCocktails, setFilteredCocktails] = useState<Cocktail[]>([]);

	// Effect to filter cocktails based on the search value
	useEffect(() => {
		if (searchValue) {
			setIsLoading(true); // Set loading to true when filtering begins
			const timeout = setTimeout(() => {
				setFilteredCocktails(
					cocktails.filter((cocktail: Cocktail) =>
						isToggled
							? cocktail.ingredients.some((ingredient) =>
									ingredient.name
										.toLowerCase()
										.includes(searchValue.toLowerCase())
								) // Ingredient Search
							: cocktail.name
									.toLowerCase()
									.startsWith(searchValue.toLowerCase())
					)
				);
				setIsLoading(false); // Set loading to false once filtering is complete
			}, 300); // Debounce filtering to avoid too many renders
			return () => clearTimeout(timeout);
		} else {
			setFilteredCocktails(cocktails); // Reset to all cocktails if search is cleared
		}
	}, [cocktails, searchValue, isToggled, setIsLoading]);

	// Set the initial searchValue from the URL only if it's empty
	useEffect(() => {
		if (!searchValue && initialQuery) {
			setSearchValue(initialQuery);
		}
	}, [initialQuery, searchValue]);

	// Handler to update the state when the input changes
	const handleInputChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const value = event.target.value;
			setSearchValue(value);

			// If input is cleared, remove query
			if (value === '') {
				navigate(location.pathname, { replace: true });
				setFilteredCocktails(cocktails);
				return;
			}

			// Filter cocktails in real-time as user types
			const filteredItems = cocktails.filter((cocktail: Cocktail) =>
				cocktail.name.toLowerCase().includes(value.toLowerCase())
			);
			setFilteredCocktails(filteredItems);
		},
		[cocktails, navigate, location.pathname]
	);

	// Navigate to cocktail page or search page on Enter
	const handleSearch = useCallback(
		(event: React.KeyboardEvent<HTMLInputElement>) => {
			if (event.key === 'Enter') {
				setIsLoading(true); // Start loading when Enter is pressed
				if (searchValue.trim() === '') {
					setFilteredCocktails(cocktails);
					navigate('/SearchPage');
					setIsLoading(false); // End loading after navigation
				}
				if (filteredCocktails.length === 1) {
					// If there's only one matching cocktail, navigate directly to its page
					const cocktailName = filteredCocktails[0].name;
					navigate(`/CocktailPage/${encodeURIComponent(cocktailName)}`);
				} else if (filteredCocktails.length > 1) {
					// Navigate to the SearchPage with the search query to show all matches
					navigate(`/SearchPage?query=${encodeURIComponent(searchValue)}`);
				}
				setIsLoading(false); // End loading after processing
			}
		},
		[filteredCocktails, navigate, searchValue, cocktails, setIsLoading]
	);

	return {
		searchValue,
		handleInputChange,
		handleSearch,
		filteredCocktails,
		error,
		isToggled,
	};
};
