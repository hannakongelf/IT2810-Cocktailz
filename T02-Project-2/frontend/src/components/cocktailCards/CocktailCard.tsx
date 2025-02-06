import React, { useState } from 'react';
import { Cocktail } from '../../types/CocktailInterface.ts';
import FavoriteButton from '../favoriteButton/FavoriteButton';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/contextHooks/useUser.ts';
import { usePageTypeFromUrl } from '../../hooks/pageHooks/usePageTypeFromUrl.ts';

// Define props for the CocktailCard component
export interface CocktailCardProps {
	drink: Cocktail;
	todaysCocktailSize?: string;
	todaysCocktailFont?: string;
	todaysCocktailBorder?: string;
}

/**
 * CocktailCard component to display a cocktail card with an image, name, and favorite button.
 * @param {Object} props - The props object.
 * @returns CocktailCard component.
 */

const CocktailCard: React.FC<CocktailCardProps> = ({
	drink,
	todaysCocktailSize,
	todaysCocktailFont,
	todaysCocktailBorder,
}) => {
	// Get the user profile from the useUser hook and the current location
	const { profile } = useUser();
	const page = usePageTypeFromUrl();
	const isCocktailPage = page === 'cocktailPage';
	const isSearchPage = page === 'searchPage';
	const isFavoritesPage = page === 'favoritesPage';
	const navigate = useNavigate();

	// Set the focus state, focus management and decide correct color of focus border based on page
	const [isFocused, setIsFocused] = useState(false);

	// Navigates you to the cocktail page and encodes the drink name
	const handleClick = () => {
		const encodedDrinkName = encodeURIComponent(drink.name);
		navigate(`/CocktailPage/${encodedDrinkName}`);
	};

	// Return the CocktailCard component with the cocktail image, name, and favorite button
	return (
		<article
			className={`flex flex-col p-2 overflow-hidden items-center ${todaysCocktailBorder} ${todaysCocktailSize || `md:w-64 md:h-80 sm:w-48 sm:h-64`}`}
			aria-label={`Cocktail card for ${drink.name}`}
		>
			<figure
				onClick={handleClick}
				className={`relative rounded-lg h-46 overflow-hidden w-full aspect-w-16 aspect-h-16  ${isCocktailPage ? '' : `cursor-pointer hover:opacity-60 ${isFocused ? `opacity-80` : ``}`}`}
				aria-label={`View details of ${drink.name}`}
				data-testid={`CocktailCardImage-${drink.name}`}
			>
				<img
					src={`${drink.imageurl}?w=100`}
					srcSet={`${drink.imageurl}?w=100 100w, ${drink.imageurl}?w=200 200w, ${drink.imageurl}?w=300 300w`}
					width="300"
					height="300"
					className="object-cover rounded-lg"	
					alt={`Image of ${drink.name}`}
				/>
			</figure>

			<h2
				onClick={handleClick}
				className={`font-oswald text-center p-1 
					${
						isCocktailPage
							? 'text-black cursor-default'
							: isFavoritesPage
								? 'text-black'
								: isSearchPage
									? 'text-dark-purple'
									: 'text-dark-pink'
					}
					${!isCocktailPage ? 'cursor-pointer hover:text-black focus:outline-none focus-visible:opacity-80 focus-visible:scale-105' : ''} 
					${todaysCocktailFont || 'text-2xl'}`}
				aria-label={`${drink.name} cocktail name`}
				tabIndex={!isCocktailPage ? 0 : undefined}
				onFocus={() => setIsFocused(true)} // Set focus state
				onBlur={() => setIsFocused(false)} // Reset focus state
				role={!isCocktailPage ? 'button' : undefined}
				onKeyUp={(e) => {
					if (!isCocktailPage && (e.key === 'Enter' || e.key === ' '))
						handleClick();
				}}
				data-testid={`CocktailTitle-${drink.name}`}
			>
				{drink.name}
			</h2>

			{profile ? (
				<FavoriteButton
					cocktail={drink}
					data-testid={`FavoriteButton-${drink.name}`}
					aria-label={`Add ${drink.name} to favorites`}
				/>
			) : null}
		</article>
	);
};
export default CocktailCard;
