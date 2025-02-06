import gql from 'graphql-tag';

// This query retrieves all ratings for a specific cocktail
export const GET_ALL_RATINGS = gql`
	query GetAllRatings($cocktail: String!) {
		ratings(cocktail: $cocktail) {
			id
			user
			cocktail
			rating
		}
	}
`;

// This mutation updates the rating for a specific cocktail by a specific user
export const UPDATE_RATING = gql`
	mutation updateRating($user: String!, $cocktail: String!, $rating: Int!) {
		updateRating(user: $user, cocktail: $cocktail, rating: $rating) {
			id
			user
			cocktail
			rating
		}
	}
`;

// This query retrieves a single rating for a specific cocktail by a specific user
export const GET_ONE_RATING = gql`
	query GetOneRating($user: String!, $cocktail: String!) {
		rating(user: $user, cocktail: $cocktail) {
			id
			user
			cocktail
			rating
		}
	}
`;
