import CocktailCard from './CocktailCard';
import { Cocktail } from '../../types/CocktailInterface.ts';
import useLimitedCocktails from '../../hooks/cocktailsHooks/useLimitedCocktails.ts';
import LoadMoreButton from '../loadMoreButton/LoadMoreButton.tsx';
import { useLoader } from '../../hooks/contextHooks/useLoader';
import LoadingCard from '../loading/LoadingCard.tsx';
import { usePageTypeFromUrl } from '../../hooks/pageHooks/usePageTypeFromUrl.ts';

interface CocktailGridProps {
	cocktails?: Cocktail[];
	error?: Error;
	loadMore?: () => void;
	refetch?: () => void;
	hasMore?: boolean;
}
/**
 * Component to display a grid of cocktail cards.
 * @param {Object} props - The props object.
 * @returns CocktailGrid component.
 */

const CocktailGrid: React.FC<CocktailGridProps> = (props) => {
	const limitedCocktails = useLimitedCocktails();
	const { error, cocktails, loadMore, hasMore } = props.cocktails
		? {
				error: props.error,
				cocktails: props.cocktails,
				loadMore: props.loadMore,
				hasMore: props.hasMore,
			}
		: limitedCocktails;

	// Use global loading context
	const { isLoading } = useLoader();
	const page = usePageTypeFromUrl();

	// Set the color of the no cocktails message based on the page
	const noCocktailsColor =
		page === 'searchPage' ? 'text-dark-purple' : 'text-dark-pink';

	// If globally loading, return the LoadingCard
	if (isLoading) {
		return <LoadingCard />;
	}

	// Handle error state
	if (error) {
		return <p>Error loading cocktails: {error.message}</p>;
	}

	// Return the CocktailGrid component with the cocktail cards and load more button
	return (
		<section className="flex flex-col items-center justify-center w-full max-w-7xl p-6">
			{/* Message when no cocktails are found */}
			{!isLoading && cocktails.length === 0 && (
				<section>
					<p className={`text-lg ${noCocktailsColor} font-semibold`}>
						We couldn't find that cocktail...
					</p>
				</section>
			)}

			{/* Cocktails Grid */}
			<section
				className="grid grid-cols-4 gap-2 p-2 sm:grid-cols-1 md:grid-cols-3 md:gap-6 md:p-2 lg:grid-cols-4 smh:grid-cols-3 w-full max-w-7xl"
				aria-busy={isLoading} // Add for accessibility
			>
				{cocktails.map((cocktail: Cocktail) => (
					<article
						key={cocktail.id}
						className="flex items-center justify-center"
					>
						<CocktailCard drink={cocktail} />
					</article>
				))}
			</section>

			{/* Load More Button */}
			{hasMore && loadMore && (
				<LoadMoreButton
					loadMore={loadMore}
					// loading={isLoading}
				/>
			)}
		</section>
	);
};

export default CocktailGrid;
