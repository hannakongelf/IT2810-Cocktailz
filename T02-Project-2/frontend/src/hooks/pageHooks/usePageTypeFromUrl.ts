import { useLocation } from 'react-router-dom';

/**
 * Hook to get the page type from the current URL.
 * @returns {string} - The page type.
 */

export const usePageTypeFromUrl = () => {
	const location = useLocation();
	const path = location.pathname.replace('/project2', '');

	if (path === '/') {
		return 'homePage';
	} else if (path === '/SearchPage') {
		return 'searchPage';
	} else if (path === '/FavoritesPage') {
		return 'favoritesPage';
	} else if (path === '/ProfilePage') {
		return 'profilePage';
	} else if (path.includes('/CocktailPage')) {
		return 'cocktailPage';
	} else {
		return 'otherPage';
	}
};
