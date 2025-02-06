import Button from '@mui/material/Button';
import { Wheel } from 'react-custom-roulette';
import { useSpinTheWheel } from '../../hooks/spinTheWheelHooks/useSpinTheWheel';
import { useMemo } from 'react';

/**
 * Component to display the SpinTheWheel component with random shots.
 * @returns SpinTheWheel component.
 */

const SpinTheWheel = () => {
	// Set the colors for the segments on the wheel and number of segments to display
	const segColors = ['#e6d7ff', '#daeafd'];
	const sizeWheel = 14;

	// Custom hook to manage the spin-the-wheel logic
	const {
		isPopUpVisible,
		loadingShots,
		errorShots,
		data,
		mustSpin,
		winnerIndex,
		winner,
		handleSpinClick,
		handleTakeThisShot,
		onFinished,
	} = useSpinTheWheel(sizeWheel, segColors);

	// Dynamically calculate the wheel size based on the screen width
	const wheelScale = useMemo(() => {
		const width = window.innerWidth;
		if (width < 640) return 0.75;
		if (width < 1024) return 0.8;
		return 0.9;
	}, []);

	// Display error or loading message if necessary
	if (loadingShots) return <p>Loading...</p>;
	if (errorShots) return <p>Error loading shots: {errorShots.message}</p>;

	// Do not render the component if the popup is not visible or there is no data to display
	if (!isPopUpVisible || data.length === 0) return null;

	// CSS styling for the buttons
	const buttonStyling =
		'bg-dark-pink font-quicksand font-bold hover:scale-110 focus:outline-none';

	return (
		<section
			className="flex flex-col items-center justify-center my-2 md:my-5"
			aria-label="Spin the wheel section"
		>
			{/* Wheel component */}
			{data.length > 0 && (
				<div
					style={{ transform: `scale(${wheelScale})` }}
					aria-label="Wheel of shots"
				>
					<Wheel
						mustStartSpinning={mustSpin}
						prizeNumber={winnerIndex}
						data={data}
						onStopSpinning={() => onFinished(winnerIndex)}
						backgroundColors={['#ffffff']}
						pointerProps={{
							style: {
								filter:
									'invert(19%) sepia(87%) saturate(200%) hue-rotate(292deg) brightness(92%) contrast(108%)',
							},
						}}
						aria-label="Spinning wheel to select a random shot"
					/>
				</div>
			)}

			{/* Button to navigate to shot*/}
			{winner !== null && (
				<Button
					type="submit"
					variant="contained"
					className={buttonStyling}
					onClick={handleTakeThisShot}
					aria-label={`Take this shot: ${winner}`}
					data-testid="TakeShotButton"
				>
					Take this shot!
				</Button>
			)}

			{/* Button to spin the wheel */}
			{winner === null && (
				<Button
					type="submit"
					variant="contained"
					className={buttonStyling}
					onClick={handleSpinClick}
					aria-label="Spin the wheel to select a random shot"
					data-testid="SpinButton"
				>
					SPIN!
				</Button>
			)}
		</section>
	);
};

export default SpinTheWheel;
