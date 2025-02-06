import FilterButton from './FilterButtonTemplate';

// Define the props for the FilterButtons component
interface FilterButtonProps {
	toggleFilter: (filter: { type?: string }) => void;
	activeFilter: string | null;
}

// Predefined list of filter types
const filters = [
	'Shot',
	'Soft Drink',
	'Cocktail',
	'Punch / Party Drink',
	'Homemade Liqueur',
];

/**
 * Component to display the filter buttons for the cocktail filter.
 * @returns FilterButtons component.
 */

const FilterButtons: React.FC<FilterButtonProps> = ({
	toggleFilter,
	activeFilter,
}) => {
	// Function to handle filter toggling
	const handleToggle = (filter: string) => {
		const newFilter = activeFilter === filter ? null : filter;
		toggleFilter(newFilter ? { type: newFilter } : {});
	};

	// Return the filter button section
	return (
		<section
			className="flex flex-row space-x-2 m-2 w-full md:w-auto"
			aria-label="Filter options"
		>
			{filters.map((filter) => (
				<FilterButton
					key={filter}
					filterName={filter}
					toggled={activeFilter === filter}
					toggleLike={() => handleToggle(filter)}
					data-testid={`FilterButton-${filter}`}
				/>
			))}
		</section>
	);
};

export default FilterButtons;
