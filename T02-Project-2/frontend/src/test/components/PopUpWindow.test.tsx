import { render, screen } from '@testing-library/react';
import PopUpWindow from '../../components/spinTheWheel/PopUpWindow';
import { vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';

// Create a mock for setIsPopUpVisible
const setIsPopUpVisible = vi.fn();
let isPopUpVisible = true;

// Mock the usePopUp hook to control visibility in the test
vi.mock('../../hooks/contextHooks/usePopUp', () => ({
	usePopUp: () => ({
		isPopUpVisible,
		setIsPopUpVisible,
	}),
}));

describe('PopUpWindow Component', () => {
	beforeEach(() => {
		// Reset mocks before each test
		setIsPopUpVisible.mockClear();
	});

	it('does not render pop-up window when isPopUpVisible is false', () => {
		isPopUpVisible = false;
		render(
			<BrowserRouter>
				<PopUpWindow />
			</BrowserRouter>
		);
		expect(
			screen.queryByText('Shot-roulette: Spin the Wheel')
		).not.toBeInTheDocument();
	});
});
