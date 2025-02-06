import { useQuery } from '@apollo/client';
import { GET_USER_BY_EMAIL } from '../../services/UserService';
import { useLoader } from '../../hooks/contextHooks/useLoader';
import { useEffect } from 'react';

/**
 * Hook to fetch a user by email from the backend.
 * @param email - The email of the user to fetch.
 * @returns loading, error, data
 */

const useFetchUserByEmail = (email: string) => {
	const { data, loading, error } = useQuery(GET_USER_BY_EMAIL, {
		variables: { email },
		skip: !email,
		fetchPolicy: 'cache-first',
	});

	const { setIsLoading } = useLoader();

	// Set global loading state based on query's loading state
	useEffect(() => {
		setIsLoading(loading);
	}, [loading, setIsLoading]);

	return {
		data,
		loading,
		error,
	};
};

export default useFetchUserByEmail;
