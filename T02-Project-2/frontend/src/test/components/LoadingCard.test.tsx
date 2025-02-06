import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import LoadingCard from '../../components/loading/LoadingCard';
import { useLoader } from '../../hooks/contextHooks/useLoader';

// Mock the `useLoader` hook
vi.mock('../../hooks/contextHooks/useLoader', () => ({
	useLoader: vi.fn(),
}));

describe('LoadingCard Component', () => {
	it('does not render when `delayedLoading` is false', () => {
		vi.mocked(useLoader).mockReturnValue({
			delayedLoading: false,
			isLoading: false,
			setIsLoading: function (): void {
				throw new Error('Function not implemented.');
			},
		});

		const { container } = render(<LoadingCard />);

		// Check that the component renders nothing
		expect(container.firstChild).toBeNull();
	});

	it('renders loading message and spinner when `delayedLoading` is true', () => {
		vi.mocked(useLoader).mockReturnValue({
			delayedLoading: true,
			isLoading: false,
			setIsLoading: function (): void {
				throw new Error('Function not implemented.');
			},
		});

		render(<LoadingCard />);

		// Check that the CircularProgress and message are in the document
		expect(screen.getByText('Loading cocktails...')).toBeInTheDocument();
		expect(screen.getByRole('progressbar')).toBeInTheDocument();
	});
});
