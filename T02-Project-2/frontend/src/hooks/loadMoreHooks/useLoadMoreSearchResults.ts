import { useState, useEffect, useCallback, useMemo } from 'react';
import { Cocktail } from '../../types/CocktailInterface';
import { useLoader } from '../../hooks/contextHooks/useLoader';

interface FilterOptions {
	type?: string;
	ingredient?: string;
}

/**
 * Hook to manage and load more cocktails with filtering.
 * @param {Cocktail[]} searchResults - Full list of cocktails to filter.
 * @param {Object} filters - name of cocktail and ingredient filters.
 * @returns {Object} - Displayed cocktails, load more function, and has more state.
 */

const useLoadMoreSearchResults = (
	searchResults: Cocktail[],
	filters: FilterOptions = {}
) => {
	const { setIsLoading } = useLoader();
	const [limit, setLimit] = useState(8);

	// Filter cocktails based on the given type and ingredient filters
	const filteredCocktails = useMemo(() => {
		return searchResults.filter(
			(cocktail) =>
				(!filters.type || cocktail.type === filters.type) &&
				(!filters.ingredient ||
					cocktail.ingredients.includes(filters.ingredient as Ingredient))
		);
	}, [searchResults, filters]);

	// Select cocktails to display based on the current limit
	const displayedCocktails = useMemo(
		() => filteredCocktails.slice(0, limit),
		[filteredCocktails, limit]
	);

	// Check if there are more cocktails to load
	const hasMore = useMemo(
		() => filteredCocktails.length > limit,
		[filteredCocktails, limit]
	);

	// Reset the display limit when filters change (e.g., new search)
	useEffect(() => {
		setIsLoading(true);
		const newLimit = filters.type || filters.ingredient ? 8 : 16;
		setLimit(newLimit);
		setIsLoading(false);
	}, [filters, setIsLoading]);

	// Function to load more cocktails (increases the limit)
	const loadMore = useCallback(() => {
		setIsLoading(true);
		setLimit((prevLimit) => prevLimit + 8);
		setTimeout(() => setIsLoading(false), 100);
	}, [setIsLoading]);

	return {
		cocktails: displayedCocktails,
		loadMore,
		hasMore,
	};
};

export default useLoadMoreSearchResults;
