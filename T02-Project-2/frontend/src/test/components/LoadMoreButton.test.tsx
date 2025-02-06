import { render, screen, fireEvent } from '@testing-library/react';
import LoadMoreButton from '../../components/loadMoreButton/LoadMoreButton';
import { vi } from 'vitest';
import { useLoader } from '../../hooks/contextHooks/useLoader';
import { usePageTypeFromUrl } from '../../hooks/pageHooks/usePageTypeFromUrl';

// Mock `useLoader` and `usePageTypeFromUrl`
vi.mock('../../hooks/contextHooks/useLoader', () => ({
	useLoader: vi.fn(),
}));

vi.mock('../../hooks/pageHooks/usePageTypeFromUrl', () => ({
	usePageTypeFromUrl: vi.fn(),
}));

describe('LoadMoreButton Component', () => {
	// Reset mocks before each test
	beforeEach(() => {
		(useLoader as jest.Mock).mockReturnValue({
			isLoading: false,
			delayedLoading: false,
			setIsLoading: vi.fn(),
		});
		(usePageTypeFromUrl as jest.Mock).mockReturnValue('homePage');
	});

	it('renders Load More button', () => {
		const loadMore = vi.fn();
		render(<LoadMoreButton loadMore={loadMore} />);
		expect(screen.getByText('Load More')).toBeInTheDocument();
	});

	it('calls loadMore function on click', () => {
		const loadMore = vi.fn();
		render(<LoadMoreButton loadMore={loadMore} />);

		fireEvent.click(screen.getByText('Load More'));
		expect(loadMore).toHaveBeenCalledTimes(1);
	});

	it('displays loading message when loading is true', () => {
		vi.mocked(useLoader).mockReturnValue({
			isLoading: true,
			delayedLoading: false,
			setIsLoading: vi.fn(),
		}); // Mock loading state as true
		render(<LoadMoreButton loadMore={() => {}} />);
		expect(screen.getByText('Loading...')).toBeInTheDocument();
	});

	it('disables button when loading is true', () => {
		vi.mocked(useLoader).mockReturnValue({
			isLoading: true,
			delayedLoading: false,
			setIsLoading: vi.fn(),
		}); // Mock loading state as true
		render(<LoadMoreButton loadMore={() => {}} />);
		const button = screen.getByRole('button', { name: /loading/i });
		expect(button).toBeDisabled();
	});
});
