import IconButton from '@mui/material/IconButton';
import { CustomTooltip } from './CustomTooltip';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AttractionsIcon from '@mui/icons-material/Attractions';
import { usePopUp } from '../hooks/contextHooks/usePopUp';

interface NavbarProps {
	showProfileIcon: boolean;
	showFavoriteIcon: boolean;
	showWheelIcon: boolean;
}

/**
 * Navbar component that renders the navigation bar with icons for the profile page, favorites page, home page and shot roulette.
 * @param {boolean} showProfileIcon - Boolean to determine if the profile icon should be shown.
 * @param {boolean} showFavoriteIcon - Boolean to determine if the favorites icon should be shown.
 * @param {boolean} showWheelIcon - Boolean to determine if the shot roulette icon should be shown.
 * @returns {ReactNode} - The Navbar component, with icons for the profile page, favorites page, and shot roulette.
 */

const NavBar: React.FC<NavbarProps> = ({
	showProfileIcon,
	showFavoriteIcon,
	showWheelIcon,
}) => {
	const navigate = useNavigate();

	// Use the usePopUp hook to toggle the visibility of the pop-up window
	const { isPopUpVisible, setIsPopUpVisible } = usePopUp();

	// File paths to the different pages
	const handleNavigateHome = () => {
		if (!isPopUpVisible) {
			navigate('../');
		}
	};
	const handleNavigateProfile = () => {
		navigate('../ProfilePage');
	};
	const handleNavigateFavoritesPage = () => {
		navigate('../FavoritesPage');
	};

	const handlePopUpToggle = () => {
		setIsPopUpVisible((prev) => !prev);
	};

	return (
		<nav
			className="absolute top-0 left-0 right-0 w-full flex items-center justify-between pt-2 pb-0"
			role="navigation"
			aria-label="Main Navigation"
		>
			<section className="pl-3">
				<CustomTooltip title="Go home" placement="bottom-end">
					<img
						src="/project2/assets/Cocktail.png"
						alt="Cocktail Icon"
						className="lg:h-12 lg:w-12 lg:p-1 md:h-9 md:w-9 sm:h-9 sm:w-9 hover:scale-110 cursor-pointer focus-visible-style"
						onClick={handleNavigateHome}
						tabIndex={0} // Make focusable with tab
						onKeyDown={(e) => e.key === 'Enter' && handleNavigateHome()}
						aria-label="go to HomePage"
						data-testid="HomeButton"
					/>
				</CustomTooltip>
			</section>

			<section className="flex items-center pr-2">
				{showWheelIcon && (
					<CustomTooltip title="Shot Roulette" placement="bottom">
						<IconButton
							className="focus:outline-none focus-visible-style"
							onClick={handlePopUpToggle}
							onKeyDown={(e) => e.key === 'Enter' && { handlePopUpToggle }}
							aria-label="Open shot-roulette!"
							disableRipple
						>
							<AttractionsIcon
								className="lg:h-9 lg:w-9 md:h-8 md:w-8 sm:h-8 sm:w-8 text-black hover:scale-110 cursor-pointer"
								sx={{ color: 'black' }}
								data-testid="WheelButton"
							/>
						</IconButton>
					</CustomTooltip>
				)}

				{showFavoriteIcon && (
					<CustomTooltip title="Your favorites" placement="bottom">
						<IconButton
							className="focus:outline-none focus-visible-style"
							onClick={handleNavigateFavoritesPage}
							onKeyDown={(e) =>
								e.key === 'Enter' && handleNavigateFavoritesPage()
							}
							aria-label="go to FavoritesPage"
							disableRipple
						>
							<FavoriteBorderIcon
								className="focus:outline-none lg:h-9 lg:w-9 md:h-8 md:w-8 sm:h-8 sm:w-8 text-black hover:scale-110 cursor-pointer"
								sx={{ color: 'black' }}
								data-testid="FavoritePageButton"
							/>
						</IconButton>
					</CustomTooltip>
				)}

				{showProfileIcon && (
					<CustomTooltip title="Profile page" placement="bottom">
						<IconButton
							className="focus:outline-none focus-visible-style"
							onClick={handleNavigateProfile}
							onKeyDown={(e) => e.key === 'Enter' && handleNavigateProfile()}
							aria-label="go to ProfilePage "
							disableRipple
						>
							<AccountCircleOutlinedIcon
								className="lg:h-9 lg:w-9 md:h-8 md:w-8 sm:h-8 sm:w-8 hover:scale-110 cursor-pointer"
								sx={{ color: 'black' }}
								data-testid="ProfilePageButton"
							/>
						</IconButton>
					</CustomTooltip>
				)}
			</section>
		</nav>
	);
};

export default NavBar;
