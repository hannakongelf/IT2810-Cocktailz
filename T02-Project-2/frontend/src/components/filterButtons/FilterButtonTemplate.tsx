import { usePageTypeFromUrl } from '../../hooks/pageHooks/usePageTypeFromUrl';

// Define the props for the FilterButton component
interface FilterButtonProps {
	toggled: boolean;
	filterName: string;
	toggleLike: () => void;
}

/**
 * A button component that represents a filter.
 *
 * @param toggled - Indicates whether the filter is active.
 * @param filterName - The name of the filter.
 * @param toggleLike - Function to toggle the filter.
 */

const FilterButton: React.FC<FilterButtonProps> = ({
	toggled,
	filterName,
	toggleLike,
}) => {
	const page = usePageTypeFromUrl();

	// Set the color based on the current page is searchPage or homePage
	const activeBgColor =
		page === 'searchPage' ? 'bg-dark-purple' : 'bg-dark-pink';
	const activeBorderColor =
		page === 'searchPage' ? 'border-dark-purple' : 'border-dark-pink';
	const hoverBorderColor =
		page === 'searchPage'
			? 'hover:border-dark-purple'
			: 'hover:border-dark-pink';

	// Return a styled button for the filter
	return (
		<button
			onClick={toggleLike}
			onKeyDown={(e) => e.key === 'Enter' && toggleLike}
			className={`font-quicksand p-1 rounded-lg cursor-pointer text-xs md:text-base lg:text-lg focus:outline-none border-2 transition
				${toggled ? `${activeBgColor} text-white ${activeBorderColor}` : 'bg-white text-black border-white'}
				${hoverBorderColor} hover:shadow-lg focus-visible:ring-2 focus-visible:ring-offset-2 ${
					page === 'searchPage'
						? 'focus-visible:ring-dark-purple'
						: 'focus-visible:ring-dark-pink'
				}`}
			aria-pressed={toggled} // Indicates toggle state for accessibility
			aria-label={`Filter by ${filterName}`}
		>
			{filterName}
		</button>
	);
};

export default FilterButton;
