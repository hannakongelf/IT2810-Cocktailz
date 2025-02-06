import React, { createContext, useEffect, useState } from 'react';
import useAuth from '../hooks/userHooks/useAuth';
import { User } from '../types/UserInterface';
import useFetchUserByEmail from '../hooks/userHooks/useFetchUserByEmail';
import useUpdateUser from '../hooks/userHooks/useUpdateUser';
import { useLoader } from './../hooks/contextHooks/useLoader';

// Define interface for the context
interface UserContextProps {
	profile: User | null;
	login: () => void;
	logout: () => void;
	authLoading: boolean;
}

// Create the context
const UserContext = createContext<UserContextProps | undefined>(undefined);

/**
 * Provider component to wrap the application and provide the user context.
 * @param {ReactNode} children - The children components.
 * @returns The UserProvider component.
 */

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	// Use hooks to manage user authentication and fetch user data
	const { profile, login, logout, authLoading } = useAuth();
	const {
		data,
		loading: fetchUserLoading,
		error: fetchUserError,
	} = useFetchUserByEmail(profile?.email || '');
	const { addUser } = useUpdateUser(profile?.email || '');
	const [userExists, setUserExists] = useState<boolean | null>(null);
	const { setIsLoading } = useLoader(); // Use global loading context

	// Update global loading state based on fetchUserLoading
	useEffect(() => {
		setIsLoading(fetchUserLoading);
	}, [fetchUserLoading, setIsLoading]);

	// Check if user exist in the database once profile is set
	useEffect(() => {
		if (profile?.email) {
			// Handle error state when trying to fetch user by email from the database
			if (fetchUserError) {
				console.error('Error fetching user:', fetchUserError);
				return;
			}

			// If data is available, update user existence status
			if (data !== null) {
				setUserExists(true); // User exists- no need to add user
			} else {
				setUserExists(false); // No user found- need to add user
			}
		}
	}, [data, profile, fetchUserError]);

	// Add user if they don't exist in the database
	useEffect(() => {
		if (userExists === false && profile) {
			addUser({
				variables: {
					name: profile.name,
					email: profile.email,
					picture: profile.picture,
				},
			})
				.then((response) => {
					console.log('User added:', response);
					setIsLoading(false); // Stop loading after adding user
				})
				.catch((err) => {
					console.error('Error adding user:', err);
					setIsLoading(false); // Stop loading if there's an error adding the user
				});
		}
	}, [userExists, profile, addUser, setIsLoading]);

	// Return the context provider with the user context values
	return (
		<UserContext.Provider
			value={{
				profile,
				login,
				logout,
				authLoading,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

export { UserContext };
