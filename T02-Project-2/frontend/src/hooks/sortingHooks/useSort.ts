import { useState, useEffect, useCallback } from 'react';
import { Cocktail } from '../../types/CocktailInterface';

const options = [
	'A to Z',
	'Z to A',
	'Increasing Ingredient Amount',
	'Decreasing Ingredient Amount',
];

interface UseSortReturnType {
	sortedCocktails: Cocktail[];
	activeSorting: string;
	handleSorting: (option: string) => void;
	options: string[];
}

/**
 * Hook to sort cocktails based on the selected option.
 * @param {Cocktail[]} cocktails - List of cocktails to sort.
 * @returns {Object} - Sorted cocktails, active sorting option, and sorting function.
 */

const useSort = (cocktails: Cocktail[]): UseSortReturnType => {
	const [activeSorting, setActiveSorting] = useState<string>(options[0]);
	const [sortedCocktails, setSortedCocktails] = useState<Cocktail[]>([]);

	useEffect(() => {
		const newSortedCocktails = [...cocktails];
		if (activeSorting === options[0]) {
			newSortedCocktails.sort((a, b) => a.name.localeCompare(b.name));
		} else if (activeSorting === options[1]) {
			newSortedCocktails.sort((a, b) => b.name.localeCompare(a.name));
		} else if (activeSorting === options[2]) {
			newSortedCocktails.sort(
				(a, b) => a.ingredients.length - b.ingredients.length
			);
		} else if (activeSorting === options[3]) {
			newSortedCocktails.sort(
				(a, b) => b.ingredients.length - a.ingredients.length
			);
		}

		setSortedCocktails(newSortedCocktails);
	}, [cocktails, activeSorting]);

	const handleSorting = useCallback((option: string) => {
		setActiveSorting(option);
	}, []);

	return {
		sortedCocktails,
		activeSorting,
		handleSorting,
		options,
	};
};

export default useSort;
