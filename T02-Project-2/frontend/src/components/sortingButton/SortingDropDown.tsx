import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { usePageTypeFromUrl } from '../../hooks/pageHooks/usePageTypeFromUrl';

interface SortingDropDownProps {
	activeSorting: string;
	options: string[];
	handleSorting: (option: string) => void;
}

/**
 * Component to display the sorting dropdown.
 * @param {string} activeSorting - The selected sorting option.
 * @param {string[]} options - The list of sorting options.
 * @param {Function} handleSorting - The function to handle sorting.
 * @returns SortingDropDown component.
 */

const SortingDropDown: React.FC<SortingDropDownProps> = ({
	activeSorting,
	options,
	handleSorting,
}) => {
	const page = usePageTypeFromUrl();
	const activeBgColor =
		page === 'searchPage' ? 'bg-dark-purple' : 'bg-dark-pink';
	const hoverBgColor =
		page === 'searchPage' ? 'hover:bg-dark-purple/30' : 'hover:bg-dark-pink/30';
	const hoverButtonColor =
		page === 'searchPage' ? 'hover:bg-dark-purple/30' : 'hover:bg-dark-pink/30';
	const borderColor =
		page === 'searchPage' ? 'border-dark-purple' : 'border-dark-pink';

	return (
		<Menu as="div" className="relative inline-block text-left">
			<MenuButton
				className={`inline-flex w-72 justify-left gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm border ${borderColor}  hover:bg-opacity-25 focus-visible:outline-none focus-visible:bg-opacity-25 ${hoverButtonColor}`}
			>
				{activeSorting}
				<ChevronDownIcon
					aria-hidden="true"
					className="-mr-1 h-5 w-5 text-gray-400 right-0"
				/>
			</MenuButton>
			<MenuItems className="absolute right-0 z-10 mt-2 w-72 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none">
				{options.map((option) => (
					<MenuItem key={option} as="div">
						{({ active }) => (
							<button
								onClick={() => handleSorting(option)}
								className={`${
									activeSorting === option
										? `${activeBgColor} text-white`
										: `${hoverBgColor} text-gray-900`
								} ${active ? 'bg-opacity-30' : ''} block w-full px-4 py-2 text-left text-sm rounded-md transition`}
							>
								{option}
							</button>
						)}
					</MenuItem>
				))}
			</MenuItems>
		</Menu>
	);
};

export default SortingDropDown;
