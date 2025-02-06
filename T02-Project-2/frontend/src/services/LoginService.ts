import { gql } from '@apollo/client';

// This query is used to add a new user to the database
export const ADD_USER = gql`
	mutation AddUser($name: String!, $email: String!, $picture: String!) {
		addUser(name: $name, email: $email, picture: $picture) {
			id
			name
			email
			picture
		}
	}
`;
