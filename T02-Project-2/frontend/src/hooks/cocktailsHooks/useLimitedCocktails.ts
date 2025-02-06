import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { GET_ALL_COCKTAILS } from '../../services/CocktailsService';
import { useLoader } from '../../hooks/contextHooks/useLoader';

const offset = 0;

/**
 * Hook to fetch a limited amount of cocktails from the backend to display on the home page and search page
 * @returns loading, error, cocktails, loadMore, hasMore
 */

const useLimitedCocktails = () => {
	const [limit, setLimit] = useState(16);
	const [hasMore, setHasMore] = useState(true);
	const { loading, error, data, fetchMore } = useQuery(GET_ALL_COCKTAILS, {
		variables: { limit, offset },
	});

	// Get the global loading state from the loader context
	const { setIsLoading } = useLoader();

	// Set the global loading state based on the loading status of the query
	useEffect(() => {
		setIsLoading(loading);
	}, [loading, setIsLoading]);

	useEffect(() => {
		if (data?.cocktails) {
			setHasMore(data.cocktails.length >= limit);
		}
	}, [data, limit]);

	// Function to fetch more cocktails from the backend when the user click the load more button
	const loadMore = () => {
		if (hasMore) {
			fetchMore({
				variables: {
					limit: limit + 16,
					offset: offset,
				},
			}).then((fetchMoreData) => {
				setLimit(limit + 16);
				setHasMore(fetchMoreData.data.cocktails.length >= limit + 16);
			});
		}
	};

	return {
		loading,
		error,
		cocktails: data?.cocktails || [],
		loadMore,
		hasMore,
	};
};
export default useLimitedCocktails;
