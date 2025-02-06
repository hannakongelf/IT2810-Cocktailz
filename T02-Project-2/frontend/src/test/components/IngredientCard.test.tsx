import { render, screen } from '@testing-library/react';
import IngredientCard from '../../components/ingredients/IngredientCard';
import { vi } from 'vitest';
import useCocktails from '../../hooks/cocktailsHooks/useFetchCocktails';
import useFetchAllRatings from '../../hooks/ratingHooks/useFetchRatingsByCocktail';
import { ApolloError } from '@apollo/client/errors'; // Import ApolloError
import { useLoader } from '../../hooks/contextHooks/useLoader';
import useFetchCocktails from '../../hooks/cocktailsHooks/useFetchCocktails';

// Mock hooks and components
vi.mock('react-router-dom', () => ({
	...vi.importActual('react-router-dom'),
	useParams: () => ({ id: 'Margarita' }),
}));

vi.mock('../../hooks/cocktailsHooks/useFetchCocktails');
vi.mock('../../hooks/ratingHooks/useFetchRatingsByCocktail');
vi.mock('../../hooks/contextHooks/useLoader', () => ({
  useLoader: vi.fn(),
}));
vi.mock('../../components/loading/LoadingCard', () => ({
	__esModule: true,
	default: () => <div>Loading...</div>,
}));

describe('IngredientCard Component', () => {
	const mockCocktails = [
		{
			name: 'Margarita',
			ingredients: [
				{ name: 'Tequila', amount: '50ml' },
				{ name: 'Lime Juice', amount: '25ml' },
			],
		},
	];

	const mockRatings = [{ rating: 4 }, { rating: 5 }];

	beforeEach(() => {
		vi.mocked(useFetchCocktails).mockReturnValue({
			loading: false,
			error: undefined, // Change `null` to `undefined` here
			cocktails: mockCocktails,
		});
		vi.mocked(useFetchAllRatings).mockReturnValue({
			ratings: mockRatings,
			loading: false,
			error: undefined, // This is already correct
		});
		vi.mocked(useLoader).mockReturnValue({
			isLoading: false,
			delayedLoading: false,
			setIsLoading: vi.fn(),
		});
	});

	it('renders loading message when global loader is active', () => {
		vi.mocked(useLoader).mockReturnValue({
			isLoading: true,
			delayedLoading: false,
			setIsLoading: function (): void {
				throw new Error('Function not implemented.');
			},
		});
		render(<IngredientCard />);
		expect(screen.getByText('Loading...')).toBeInTheDocument();
	});

	it('displays error message when there is an error', () => {
		const mockError = new ApolloError({ errorMessage: 'Failed to fetch' });
		vi.mocked(useCocktails).mockReturnValue({
			error: mockError,
			cocktails: [],
			loading: false,
		});
		render(<IngredientCard />);
		expect(
			screen.getByText('Error loading cocktails: Failed to fetch')
		).toBeInTheDocument();
	});

	it('renders ingredients for the drink', () => {
		render(<IngredientCard />);
		expect(screen.getByText('Ingredients for Margarita:')).toBeInTheDocument();
		expect(screen.getByText('50ml of Tequila')).toBeInTheDocument();
		expect(screen.getByText('25ml of Lime Juice')).toBeInTheDocument();
	});

	it('displays average rating if available', () => {
		render(<IngredientCard />);
		expect(screen.getByText('Average Rating: 4.5')).toBeInTheDocument();
	});

	it('renders no ratings message when no ratings are available', () => {
		vi.mocked(useFetchAllRatings).mockReturnValue({
			ratings: [],
			loading: false,
			error: undefined,
		});
		render(<IngredientCard />);
		expect(screen.getByText('No ratings yet')).toBeInTheDocument();
	});
});
