import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import SearchBar from '../../components/searchBar/SearchBar';
import { vi } from 'vitest';

describe('SearchBar Component', () => {
	const handleInputChange = vi.fn();
	const handleSearch = vi.fn();
	const toggle = vi.fn();

	it('renders search input with correct placeholder', () => {
		render(
			<MemoryRouter>
				<SearchBar
					searchValue=""
					handleInputChange={handleInputChange}
					handleSearch={handleSearch}
					loading={false}
					error={undefined}
					filteredCocktails={[]}
					isToggled={false}
					toggle={toggle}
				/>
			</MemoryRouter>
		);

		// Check that the input exists with the correct placeholder
		expect(
			screen.getByPlaceholderText('Search for a drink...')
		).toBeInTheDocument();
	});

	it('calls handleInputChange when text is entered', () => {
		render(
			<MemoryRouter>
				<SearchBar
					searchValue=""
					handleInputChange={handleInputChange}
					handleSearch={handleSearch}
					loading={false}
					error={undefined}
					filteredCocktails={[]}
					isToggled={false}
					toggle={toggle}
				/>
			</MemoryRouter>
		);

		const input = screen.getByPlaceholderText('Search for a drink...');
		fireEvent.change(input, { target: { value: 'Margarita' } });
		expect(handleInputChange).toHaveBeenCalledTimes(1);
		expect(handleInputChange).toHaveBeenCalledWith(expect.anything());
	});

	it('calls handleSearch when Enter key is pressed', () => {
		render(
			<MemoryRouter>
				<SearchBar
					searchValue="Margarita"
					handleInputChange={handleInputChange}
					handleSearch={handleSearch}
					loading={false}
					error={undefined}
					filteredCocktails={[]}
					isToggled={false}
					toggle={toggle}
				/>
			</MemoryRouter>
		);

		const input = screen.getByPlaceholderText('Search for a drink...');
		fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
		expect(handleSearch).toHaveBeenCalledTimes(1);
		expect(handleSearch).toHaveBeenCalledWith(expect.anything());
	});

	it('applies correct color based on location', () => {
		render(
			<MemoryRouter initialEntries={['/']}>
				<Routes>
					<Route
						path="/"
						element={
							<SearchBar
								searchValue=""
								handleInputChange={handleInputChange}
								handleSearch={handleSearch}
								loading={false}
								error={undefined}
								filteredCocktails={[]}
								isToggled={false}
								toggle={toggle}
							/>
						}
					/>
				</Routes>
			</MemoryRouter>
		);

		// Check for color when on the home route ('/')
		const icon = screen.getByTestId('SearchIcon');
		expect(icon).toHaveClass('text-dark-pink');
	});

	it('renders ingredient search placeholder when toggled', () => {
		render(
			<MemoryRouter>
				<SearchBar
					searchValue=""
					handleInputChange={handleInputChange}
					handleSearch={handleSearch}
					loading={false}
					error={undefined}
					filteredCocktails={[]}
					isToggled={true}
					toggle={toggle}
				/>
			</MemoryRouter>
		);

		// Check the placeholder text when toggled
		expect(
			screen.getByPlaceholderText('Search for an ingredient...')
		).toBeInTheDocument();
	});
});
