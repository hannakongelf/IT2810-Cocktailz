import SpinTheWheel from './SpinTheWheel';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import FocusTrap from 'focus-trap-react';
import { usePopUpLogic } from '../../hooks/popUpHooks/usePopUpLogic';

/**
 * Component to display the PopUpWindow with the SpinTheWheel component.
 * @returns PopUpWindow component.
 */

const PopUpWindow: React.FC = () => {
	const { shouldRender, isFocusTrapActive, handleCloseWindow } =
		usePopUpLogic();

	// If not visible or not on the right page, don't render
	if (!shouldRender) return null;

	return (
		<FocusTrap active={isFocusTrapActive}>
			<section
				className="bg-white p-4 md:p-7 rounded-lg shadow-2xl w-full max-w-[90%] md:max-w-lg my-1 
		max-h-[95vh] overflow-y-auto z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
				aria-modal="true"
				role="dialog"
				aria-labelledby="popup-title"
				aria-describedby="popup-description"
			>
				{/* Close button */}
				<IconButton
					className="absolute top-2 right-2 focus:outline-none focus-visible-style"
					onClick={handleCloseWindow}
					onKeyDown={(e) => e.key === 'Enter' && handleCloseWindow()}
					aria-label="Close this window"
					disableRipple
				>
					<CloseIcon
						className="h-6 w-6 md:h-9 md:w-9 text-black hover:scale-110 cursor-pointer"
						sx={{ color: 'black' }}
					/>
				</IconButton>

				{/* Header  */}
				<h2 className="text-xl md:text-2xl text-black font-semibold font-oswald mb-4 pt-6 cursor-default">
					Shot-roulette: Spin the Wheel
				</h2>

				{/* Description */}
				<p className="text-black font-quicksand text-base md:text-lg cursor-default">
					Want a shot, but don't know which? Try our shot-roulette to get a
					random shot!
				</p>

				<SpinTheWheel />
			</section>
		</FocusTrap>
	);
};

export default PopUpWindow;
