import gql from 'graphql-tag';

// This query is used to get a user by their email
export const GET_USER_BY_EMAIL = gql`
	query GetUserByEmail($email: String!) {
		user(email: $email) {
			id
			email
			name
			picture
		}
	}
`;
