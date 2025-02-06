import { useEffect } from 'react';
import { useLoader } from '../../hooks/contextHooks/useLoader';
import useCocktails from '../../hooks/cocktailsHooks/useFetchCocktails';
import CocktailCard from './CocktailCard';
import LoadingCard from '../loading/LoadingCard';
import { dayOfYear } from '../../utils/DateUtils';

/**
 * Component to display the cocktail of the day.
 * @returns TodaysCocktail component.
 */

const TodaysCocktail = () => {
	// Fetch all cocktails using the useCocktails hook
	const { loading, error, cocktails } = useCocktails();
	const { setIsLoading } = useLoader();

	useEffect(() => {
		// Set global loading state
		setIsLoading(loading);

		// Reset loading state when component unmounts or data is loaded
		return () => {
			setIsLoading(false);
		};
	}, [loading, setIsLoading]);

	// If loading, display loading message
	if (loading) {
		return (
			<p aria-live="polite" aria-label="Loading cocktails">
				Loading cocktails...
				<LoadingCard aria-hidden="true" />
			</p>
		);
	}

	// If error, display error message
	if (error) {
		return (
			<p aria-live="assertive" aria-label="Error loading cocktails">
				Error loading cocktails: {error.message}
			</p>
		);
	}

	// Return the CocktailCard for the cocktail of the using the day of the year
	return (
		<>
			{cocktails.length > 0 ? (
				<CocktailCard
					key={cocktails[dayOfYear(new Date())].id}
					drink={cocktails[dayOfYear(new Date())]}
					todaysCocktailSize="md:w-72 md:h-96 sm:w-56 sm:h-80"
					todaysCocktailFont="text-3xl"
					todaysCocktailBorder="border-2 border-dark-pink rounded-lg shadow-2xl mt-8 mb-4 duration-300 hover:scale-105"
					aria-label={`Cocktail of the day: ${cocktails[dayOfYear(new Date())].name}`}
					data-testid="TodaysCocktail"
				/>
			) : (
				<p aria-live="polite" aria-label="Loading cocktail of the day">
					Loading...
				</p>
			)}
			<h2
				className="font-oswald font-bold my-6 text-center text-2xl md:text-4xl text-dark-pink cursor-default"
				aria-label="Today's Cocktail"
			>
				Today's Cocktail
			</h2>
		</>
	);
};

export default TodaysCocktail;
