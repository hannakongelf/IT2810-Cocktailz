import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { Cocktail } from '../../types/CocktailInterface';
import { useLocation } from 'react-router-dom';
import { usePageTypeFromUrl } from '../../hooks/pageHooks/usePageTypeFromUrl';
import SearchToggle from './SearchToggle';
import { useState } from 'react';

interface SearchBarProps {
	searchValue: string;
	handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleSearch: (event: React.KeyboardEvent<HTMLInputElement>) => void;
	loading: boolean;
	error: Error | undefined;
	filteredCocktails: Cocktail[];
	isToggled?: boolean;
	toggle?: () => void;
}

/**
 * SearchBar component to display the search bar for drinks and ingredients.
 * @returns SearchBar component.
 */

const SearchBar: React.FC<SearchBarProps> = ({
	searchValue,
	handleInputChange,
	handleSearch,
	isToggled,
	toggle,
}) => {
	const location = useLocation();
	const borderColor = location.pathname === '/' ? 'dark-pink' : 'dark-purple';
	const isSearchPage = usePageTypeFromUrl() === 'searchPage';
	const [isFocused, setIsFocused] = useState(false);

	return (
		<div className="search-container">
			<section
				className={`flex flex-col ${isSearchPage ? 'space-y-4' : 'space-y-0'} items-start`}
				aria-label="Search container"
			>
				<nav
					className={`relative rounded md:m-1 bg-white bg-opacity-75 hover:bg-opacity-95 border-[rgba(0,0,0,0)] hover:border-2 hover:border-${borderColor} z-10 sm:w-64 md:w-[500px] lg:w-[800px] box-border ${
						isFocused
							? `border-2 border-${borderColor}`
							: 'border-2 border-transparent'
					}`}
					role="search"
					aria-label="Search bar navigation"
				>
					<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
						<SearchIcon
							className={
								location.pathname === '/'
									? 'text-dark-pink'
									: 'text-dark-purple'
							}
							aria-hidden="true"
						/>
					</div>
					<InputBase
						placeholder={
							isToggled
								? 'Search for an ingredient...'
								: 'Search for a drink...'
						}
						inputProps={{
							'aria-label': 'Search input for drinks or ingredients',
						}}
						className="text-inherit pl-10 transition-width w-full sm:text-xs md:text-base lg:text-lg focus-visible:border-dark-pink focus:outline-none"
						value={searchValue}
						onChange={handleInputChange}
						onKeyDown={handleSearch}
						onFocus={() => setIsFocused(true)}
						onBlur={() => setIsFocused(false)}
						aria-required="true"
						aria-describedby="search-description"
					/>
				</nav>
				{isSearchPage && (
					<article className="w-dull md:w-auto">
						<SearchToggle isToggled={isToggled!} onToggle={toggle!} />
					</article>
				)}
			</section>
		</div>
	);
};

export default SearchBar;
