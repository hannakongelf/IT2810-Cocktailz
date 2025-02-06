import CocktailGrid from './CocktailGrid';
import FilterButtons from '../filterButtons/FilterButtons';
import { Cocktail } from '../../types/CocktailInterface';
import { usePageTypeFromUrl } from '../../hooks/pageHooks/usePageTypeFromUrl';
import { useCallback, useState } from 'react';
import SortingDropDown from '../sortingButton/SortingDropDown';
import useSort from '../../hooks/sortingHooks/useSort';
import useFilteredCocktails from '../../hooks/filterHooks/useFilteredCocktails';

interface FilterOptions {
	type?: string;
	ingredient?: string;
}

interface FilteredCocktailsProps {
	initialCocktails?: Cocktail[];
}

/**
 * Component to display a grid of filtered cocktails.
 * @param {Object} props - The props object.
 * @returns FilteredCocktails component.
 */

const FilteredCocktails: React.FC<FilteredCocktailsProps> = ({
	initialCocktails,
}) => {
	const location = usePageTypeFromUrl();
	const [filters, setFilters] = useState<FilterOptions>({});
	const isSearchPage = location === 'searchPage';

	// Fetch data using the custom hook
	const { cocktails, error, hasMore, loadMore } = useFilteredCocktails({
		initialCocktails,
		isSearchPage,
		filters,
	});

	// Sorting logic
	const { sortedCocktails, activeSorting, handleSorting, options } =
		useSort(cocktails);

	// Function to toggle filters
	const toggleFilter = useCallback((newFilter: FilterOptions) => {
		setFilters(newFilter);
	}, []);

	if (error) return <p>Error loading cocktails: {error.message}</p>;

	// Render the filtered, sorted, and optionally paginated list of cocktails
	return (
		<section className="p-4">
			<article className="flex flex-col md:flex-row md:justify-between md:items-center gap-y-4 md:gap-y-0 md:gap-x-4 mb-4">
				<FilterButtons
					toggleFilter={toggleFilter}
					activeFilter={filters.type || null}
				/>
				<SortingDropDown
					activeSorting={activeSorting}
					options={options}
					handleSorting={handleSorting}
				/>
			</article>
			<CocktailGrid
				cocktails={sortedCocktails}
				loadMore={loadMore}
				hasMore={hasMore}
			/>
		</section>
	);
};

export default FilteredCocktails;
