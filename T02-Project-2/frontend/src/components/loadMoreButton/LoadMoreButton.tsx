import { useLoader } from '../../hooks/contextHooks/useLoader';
import { usePageTypeFromUrl } from '../../hooks/pageHooks/usePageTypeFromUrl';

interface LoadMoreButtonProps {
	loadMore: () => void;
}

/**
 * Component to display the load more button.
 * @param {Function} loadMore - The function to load more data.
 * @returns LoadMoreButton component.
 */

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({ loadMore }) => {
	const where = usePageTypeFromUrl();

	const isHomePage = where === 'homePage';

	const { isLoading } = useLoader(); // Access global loading state

	// Return the load more button with the loadMore function and loading state
	return (
		<>
			<section className="flex justify-center mt-8">
				<button
					onClick={loadMore}
					onKeyDown={(e) => e.key === 'Enter' && loadMore()}
					className={`border-2 font-bold px-4 py-2 rounded hover:scale-110 focus:outline-none focus:ring-0 transition-all focus-visible:scale-110 focus-visible:bg-opacity-25 ${
						isHomePage
							? 'bg-pink border-dark-pink text-dark-pink active:bg-dark-pink focus-visible:bg-dark-pink'
							: 'bg-purple border-dark-purple text-dark-purple active:bg-dark-purple focus-visible:bg-dark-purple'
					}`}
					disabled={isLoading}
					data-testid="LoadMoreButton"
				>
					{isLoading ? 'Loading...' : 'Load More'}
				</button>
			</section>
		</>
	);
};

export default LoadMoreButton;
