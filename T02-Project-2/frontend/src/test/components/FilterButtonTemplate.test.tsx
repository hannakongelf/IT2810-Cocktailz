import { render, screen, fireEvent } from '@testing-library/react';
import FilterButtons from '../../components/filterButtons/FilterButtons';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

describe('FilterButtons Component', () => {
	const toggleFilter = vi.fn();

	const renderWithRouter = (ui: React.ReactElement) => {
		return render(<MemoryRouter>{ui}</MemoryRouter>); // Wrap with MemoryRouter
	  };

	it('renders all filter buttons', () => {
		renderWithRouter(<FilterButtons toggleFilter={toggleFilter} activeFilter={null} />);

		// Check if all filter buttons are rendered
		const filterNames = [
			'Shot',
			'Soft Drink',
			'Cocktail',
			'Punch / Party Drink',
			'Homemade Liqueur',
		];
		filterNames.forEach((filterName) => {
			expect(screen.getByText(filterName)).toBeInTheDocument();
		});
	});

	it('calls toggleFilter with correct filter when a button is clicked', () => {
		renderWithRouter(<FilterButtons toggleFilter={toggleFilter} activeFilter={null} />);

		fireEvent.click(screen.getByText('Cocktail'));
		expect(toggleFilter).toHaveBeenCalledWith({ type: 'Cocktail' });
	});

	it('deactivates filter when active filter is clicked again', () => {
		renderWithRouter(
			<FilterButtons toggleFilter={toggleFilter} activeFilter="Cocktail" />
		  );

		fireEvent.click(screen.getByText('Cocktail'));
		expect(toggleFilter).toHaveBeenCalledWith({});
	});
});
