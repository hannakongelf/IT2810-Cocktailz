import { useEffect, useState } from 'react';
import { Cocktail } from '../../types/CocktailInterface';

interface FilterOptions {
	type?: string;
	ingredient?: string;
}

/**
 * Hook to filter cocktails based on the given filter options.
 * @param {Cocktail[]} cocktails - List of cocktails to filter.
 * @param {Object} filters - The filter options to apply.
 * @returns {Cocktail[]} - Filtered cocktails.
 */

const useFilter = (cocktails: Cocktail[], filters: FilterOptions = {}) => {
	const [filteredCocktails, setFilteredCocktails] =
		useState<Cocktail[]>(cocktails);

	// Filter the cocktails based on the given filter options
	useEffect(() => {
		let result = cocktails;

		// Filter the cocktails based on the given filter options.
		if (filters.type) {
			result = result.filter((cocktail) => cocktail.type === filters.type);
		}

		// Filter the cocktails based on the given filter options and ingredient.
		if (filters.ingredient) {
			result = result.filter((cocktail) =>
				cocktail.ingredients.some((ingredient) =>
					ingredient.name
						.toLowerCase()
						.includes(filters.ingredient!.toLowerCase())
				)
			);
		}

		setFilteredCocktails(result);
	}, [filters, cocktails]);

	return {
		filteredCocktails,
	};
};

export default useFilter;
