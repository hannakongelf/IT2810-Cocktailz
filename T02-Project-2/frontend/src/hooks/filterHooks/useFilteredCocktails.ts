import { useEffect, useState } from 'react';
import useLoadMore from '../../hooks/loadMoreHooks/useLoadMore';
import useLoadMoreSearchResults from '../../hooks/loadMoreHooks/useLoadMoreSearchResults';
import { Cocktail } from '../../types/CocktailInterface';
import { useLoader } from '../../hooks/contextHooks/useLoader';
import { ApolloError } from '@apollo/client/errors';

interface UseFilteredCocktailsProps {
	initialCocktails?: Cocktail[];
	isSearchPage: boolean;
	filters: { type?: string; ingredient?: string };
}

/**
 * Hook to filter cocktails based on the given filter options.
 * @param isSearchPage - Boolean to check if the page is search page.
 * @param initialCocktails - List of cocktails to filter for search page.
 * @param filters - The filter options to apply.
 * @returns - Filtered cocktails.
 */

const useFilteredCocktails = ({
	initialCocktails,
	isSearchPage,
	filters,
}: UseFilteredCocktailsProps) => {
	const { setIsLoading } = useLoader();
	const [cocktails, setCocktails] = useState<Cocktail[]>([]);
	const [error, setError] = useState<ApolloError | undefined>();
	const [hasMore, setHasMore] = useState(false);
	const [loadMore, setLoadMore] = useState<() => void>(() => {});

	const loadMoreData = useLoadMore(filters);
	const searchResults = useLoadMoreSearchResults(
		initialCocktails || [],
		filters
	);

	// Set the cocktails, error, loadMore and hasMore based on the search results or load more data.
	useEffect(() => {
		setIsLoading(true);

		// Check if the page is search page and set the cocktails, loadMore and hasMore accordingly.
		if (isSearchPage) {
			setCocktails(searchResults.cocktails);
			setLoadMore(() => searchResults.loadMore);
			setHasMore(searchResults.hasMore);

			// Set the cocktails, error, loadMore and hasMore based on the load more data.
		} else {
			setCocktails(loadMoreData.cocktails);
			setError(loadMoreData.error);
			setLoadMore(() => loadMoreData.loadMore);
			setHasMore(loadMoreData.hasMore);
		}

		setIsLoading(false);
	}, [isSearchPage, searchResults, loadMoreData, setIsLoading]);

	return { cocktails, error, hasMore, loadMore };
};

export default useFilteredCocktails;
