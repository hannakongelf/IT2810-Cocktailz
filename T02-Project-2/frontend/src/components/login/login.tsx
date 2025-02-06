import CircularProgress from '@mui/material/CircularProgress';
import { useUser } from '../../hooks/contextHooks/useUser';
import { useLoader } from '../../hooks/contextHooks/useLoader';
import LoadingCard from '../loading/LoadingCard';

/**
 * Login component to display the user's profile page.
 * @returns Login component.
 */

const Login = () => {
	// Get the user profile, login, logout, and authLoading from useUser
	const { profile, login, logout, authLoading } = useUser();

	// Access global loading state and function to set it
	const { isLoading, setIsLoading } = useLoader();

	// Handle login with global loading state
	const handleLogin = async () => {
		setIsLoading(true);
		await login();
		setIsLoading(false);
	};

	// Display global loading card when loading
	if (isLoading) return <LoadingCard />;

	// Style the login button and logout button
	const styleButton =
		'bg-dark-green text-black font-quicksand font-bold text-sm md:text-lg focus:outline-none hover:scale-105 focus-visible:border-[1px] focus-visible:scale-105';

	// Return the profile page with the user profile, loading state, and login/logout functions
	return (
		<>
			{/* Display the loading message if authLoading is true */}
			{authLoading ? (
				<section
					aria-live="polite"
					aria-label="Loading user profile"
					className="flex flex-col items-center"
				>
					<CircularProgress aria-label="Loading spinner" />
					<p>Loading user...</p>
				</section>
			) : (
				<section
					aria-label={
						profile ? `${profile.name}'s profile page` : 'Log in to Cocktailz'
					}
					className="flex flex-col items-center"
				>
					<h2 className="font-oswald font-bold text-black text-2xl md:text-5xl mb-8 md:mb-16 cursor-default">
						{profile ? `${profile.name}'s profile page` : 'Log in to Cocktailz'}
					</h2>

					{profile ? (
						<section
							className="flex flex-col items-center gap-8 cursor-default"
							aria-label="User profile details"
						>
							<img
								src={profile.picture}
								alt={`${profile.name}'s profile picture`}
								className="rounded-full w-32 h-32 object-cover"
								aria-label={`${profile.name}'s profile picture`}
							/>

							<section
								className="flex flex-col gap-2 font-quicksand text-black font-semibold text-base md:text-lg"
								aria-label="User information"
							>
								<p aria-label={`User's name: ${profile.name}`}>
									Name: {profile.name}
								</p>
								<p aria-label={`User's email address: ${profile.email}`}>
									Email Address: {profile.email}
								</p>
							</section>

							<button
								onClick={logout}
								className={styleButton}
								aria-label="Log out of your account"
							>
								Log out
							</button>
						</section>
					) : (
						<button
							onClick={handleLogin}
							className={styleButton}
							aria-label="Sign in with Google"
						>
							Sign in with Google 🚀
						</button>
					)}
				</section>
			)}
		</>
	);
};

export default Login;
