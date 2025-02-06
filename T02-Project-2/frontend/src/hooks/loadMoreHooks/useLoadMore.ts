import { useQuery } from '@apollo/client';
import { GET_ALL_COCKTAILS } from '../../services/CocktailsService';
import { useCallback, useEffect, useState } from 'react';
import { useLoader } from '../../hooks/contextHooks/useLoader';
import useFilter from '../filterHooks/useFilter';
import { Cocktail } from '../../types/CocktailInterface';

interface FilterOptions {
	type?: string;
	ingredient?: string;
}

/**
 * Hook to fetch cocktails from the backend and display them in a list with a load more button based on the filter options
 * @param filters - The filters to apply to the cocktails
 * @returns loading, error, cocktails, loadMore, hasMore
 */

const useLoadMore = (filters: FilterOptions) => {
	const [limit, setLimit] = useState(8);
	const [hasMore, setHasMore] = useState(false);
	const [allCocktails, setAllCocktails] = useState<Cocktail[]>([]);
	const [displayedCocktails, setDisplayedCocktails] = useState<Cocktail[]>([]);

	const { loading, error, data } = useQuery(GET_ALL_COCKTAILS);

	// Access global loading context
	const { setIsLoading } = useLoader();

	// Set global loading state based on query loading state
	useEffect(() => {
		setIsLoading(loading);
	}, [loading, setIsLoading]);

	useEffect(() => {
		if (data?.cocktails) {
			setAllCocktails(data.cocktails);
		}
	}, [data]);

	// Filter the cocktails based on the filter options
	const { filteredCocktails } = useFilter(allCocktails, filters);

	// Update the displayed cocktails when the filtered cocktails or limit changes
	useEffect(() => {
		const newDisplayed = filteredCocktails.slice(0, limit);
		setDisplayedCocktails(newDisplayed);
		setHasMore(filteredCocktails.length > limit);
	}, [filteredCocktails, limit]);

	const loadMore = useCallback(() => {
		const increment = filters.type || filters.ingredient ? 4 : 16;
		setLimit((prevLimit) => prevLimit + increment);
	}, [filters]);

	return {
		loading,
		error,
		cocktails: displayedCocktails || [],
		loadMore,
		hasMore,
	};
};

export default useLoadMore;
