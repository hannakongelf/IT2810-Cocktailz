import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../services/LoginService';
import { GET_USER_BY_EMAIL } from '../../services/UserService';

/**
 * Hook to add a user to the backend.
 * @param email - The email of the user to add.
 * @returns addUser
 */

const useUpdateUser = (email: string) => {
	const [addUser] = useMutation(ADD_USER, {
		// Refetch the user by email after adding a user
		refetchQueries: [
			{
				query: GET_USER_BY_EMAIL,
				variables: { email: email },
			},
		],
		awaitRefetchQueries: true,
		onError: (error) => {
			console.log('Error adding user:', error);
		},
	});

	return {
		addUser,
	};
};

export default useUpdateUser;
