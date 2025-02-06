import { useEffect, useState } from 'react';
import {
	googleLogout,
	TokenResponse,
	useGoogleLogin,
} from '@react-oauth/google';
import axios from 'axios';
import { User } from '../../types/UserInterface';
import { useLoader } from '../../hooks/contextHooks/useLoader';

/**
 * Hook to handle user authentication using Google OAuth.
 * @returns profile, login, logout, authLoading
 */

const useAuth = () => {
	// State to store the user profile and token
	const [profile, setProfile] = useState<User | null>(null);
	const [user, setUser] = useState<TokenResponse | null>(null);

	// Access global loading context
	const { setIsLoading } = useLoader();

	const [authLoading, setAuthLoading] = useState(true); // Track loading state for auth

	// Sync global loading state with auth loading
	useEffect(() => {
		setIsLoading(authLoading);
	}, [authLoading, setIsLoading]);

	// Login with Google using the useGoogleLogin hook from react-oauth
	const login = useGoogleLogin({
		onSuccess: (codeResponse: TokenResponse) => {
			setIsLoading(true); // Set global loading state to true
			setUser(codeResponse);
			sessionStorage.setItem('token', codeResponse.access_token);
		},
		onError: (error) => console.log('Login Failed:', error),
	});

	// Fetch Google profile after login and set it to the profile state if token is present in session storage
	useEffect(() => {
		const token = sessionStorage.getItem('token');
		if (token) {
			setAuthLoading(true); // Set auth loading to true while fetching profile
			axios
				.get(
					`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
							Accept: 'application/json',
						},
					}
				)
				.then((res) => {
					const { email, name, picture } = res.data;
					const profileData = { email, name, picture };
					setProfile(profileData);
				})
				.catch((err) => {
					console.log(err);
					sessionStorage.removeItem('token');
				})
				.finally(() => {
					setAuthLoading(false); // Set global loading state to false
				});
		} else {
			setAuthLoading(false); // Set global loading state to false if no token
		}
	}, [user]);

	// Logout function to clear session storage and set profile to null
	const logout = () => {
		googleLogout();
		sessionStorage.removeItem('token');
		setProfile(null);
		setUser(null);
		window.location.assign(window.location.href);
	};

	return { profile, login, logout, authLoading };
};

export default useAuth;
