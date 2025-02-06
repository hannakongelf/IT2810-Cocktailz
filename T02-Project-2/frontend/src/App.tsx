import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FavoritesPage from './pages/FavoritesPage';
import ProfilePage from './pages/ProfilePage';
import SearchPage from './pages/SearchPage';
import CocktailPage from './pages/CocktailPage';
import { UserProvider } from './contexts/UserContext';
import { PopUpProvider } from './contexts/PopUpContext';
import { LoaderProvider } from './contexts/LoaderContext';

function App() {
	return (
		<LoaderProvider>
			<UserProvider>
				<PopUpProvider>
					<Router basename="/project2">
						<Routes>
							<Route index element={<HomePage />} />
							<Route path="FavoritesPage" element={<FavoritesPage />} />
							<Route path="ProfilePage" element={<ProfilePage />} />
							<Route path="SearchPage" element={<SearchPage />} />
							<Route path="CocktailPage/:id" element={<CocktailPage />} />
						</Routes>
					</Router>
				</PopUpProvider>
			</UserProvider>
		</LoaderProvider>
	);
}

export default App;
