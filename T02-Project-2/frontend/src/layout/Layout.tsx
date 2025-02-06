import Button from '@mui/material/Button';
import Navbar from './NavBar';
import React, { ReactNode, useEffect, useState } from 'react';
import { usePageTypeFromUrl } from '../hooks/pageHooks/usePageTypeFromUrl';

interface LayoutProps {
	children: ReactNode;
}

/**
 * Layout component that renders a Navbar, a main section, and a button to scroll to the top of the page
 * @param {ReactNode} children - The children to render inside the main section
 */

const Layout: React.FC<LayoutProps> = ({ children }) => {
	// Get the current location using the useLocation hook
	const [showButton, setShowButton] = useState<boolean>(false);
	const page = usePageTypeFromUrl();

	// Determine the current page based on the pathname
	const isProfilePage = page === 'profilePage';
	const isFavoritesPage = page === 'favoritesPage';
	const isHomePage = page === 'homePage';
	const isSearchPage = page === 'searchPage';
	const isCocktailPage = page === 'cocktailPage';

	// Initialize the backgroundColor variable
	let backgroundColor = '';

	// Set the background color based on the current page
	if (isHomePage) {
		backgroundColor = 'bg-pink';
	} else if (isProfilePage) {
		backgroundColor = 'bg-green';
	} else if (isFavoritesPage) {
		backgroundColor = 'bg-yellow';
	} else if (isSearchPage) {
		backgroundColor = 'bg-purple';
	} else if (isCocktailPage) {
		backgroundColor = 'bg-blue';
	}

	/* 
	Go-to-top button becomes visible when the user scrolls down more than 100 pixels and is controlled 
	by tracking the scroll position in the `showButton` state 
	*/
	useEffect(() => {
		const handleScrollToTopButtonVisiblity = () => {
			if (window.scrollY > 100) {
				setShowButton(true);
			} else {
				setShowButton(false);
			}
		};
		window.addEventListener('scroll', handleScrollToTopButtonVisiblity);
		return () => {
			window.removeEventListener('scroll', handleScrollToTopButtonVisiblity);
		};
	}, []);

	// Smoothly scrolls the window back to the top of the page when called.
	const handleScrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	// Return a Layout component that renders a Navbar, a main section, and a button to scroll to the top of the page
	// Use 'children' prop inside main to render any component you add
	// This way, secure that the pages look identical and have the same layout site-wide
	return (
		<main
			className={`min-h-screen min-w-screen flex flex-col items-center ${backgroundColor}`}
		>
			<Navbar
				showProfileIcon={!isProfilePage}
				aria-label="Navbar navigation"
				showFavoriteIcon={!isFavoritesPage}
				showWheelIcon={!isFavoritesPage && !isProfilePage && !isCocktailPage} // Hide the Spin the Wheel icon on CocktailPage
			/>

			<main className=" min-h-screen min-w-screen flex flex-col flex-grow w-full p-4 mt-16 items-center justify-content-center">
				{children}
			</main>

			{showButton && (
				<Button
					onClick={handleScrollToTop}
					onKeyDown={(e) => e.key === 'Enter' && handleScrollToTop()}
					variant="outlined"
					className={`fixed bottom-4 right-4 font-oswald sm:px-1 md:px-4 md:text-16 focus:outline-none flex items-center justify-center gap-2 hover:scale-105 focus-visible:scale-105
						${isHomePage ? 'border-dark-pink text-dark-pink' : 'border-black text-black'}`}
					aria-label="Scroll to top of page"
				>
					Go to Top
				</Button>
			)}
		</main>
	);
};

export default Layout;
