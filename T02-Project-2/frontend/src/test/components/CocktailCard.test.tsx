import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CocktailCard from '../../components/cocktailCards/CocktailCard';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock the `useUser` hook
vi.mock('../../hooks/contextHooks/useUser.ts', () => ({
	useUser: () => ({
		profile: { userId: '123', name: 'Test User' },
	}),
}));

// Mock the FavoriteButton component to simplify the snapshot
vi.mock('../../components/favoriteButton/FavoriteButton', () => ({
	__esModule: true,
	default: () => (
		<button data-testid="FavoriteButtonMock">Mock Favorite Button</button>
	),
}));

// Mock data for Cocktail
const mockDrink = {
	id: '1',
	name: 'Margarita',
	type: 'Cocktail',
	imageurl: 'https://example.com/margarita.jpg',
	ingredients: [
		{ name: 'Tequila', amount: '50ml' },
		{ name: 'Lime juice', amount: '20ml' },
		{ name: 'Triple sec', amount: '10ml' },
	],
};

// Mock the `useUser` hook to provide a fake profile
vi.mock('../../hooks/contextHooks/useUser.ts', () => ({
	useUser: () => ({
		profile: { userId: '123', name: 'Test User' },
	}),
}));

// Create a QueryClient instance for react-query
const queryClient = new QueryClient();

describe('CocktailCard component', () => {
	it('should match the snapshot', () => {
		const { asFragment } = render(
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<CocktailCard drink={mockDrink} />
				</BrowserRouter>
			</QueryClientProvider>
		);

		expect(asFragment()).toMatchSnapshot();
	});
});
