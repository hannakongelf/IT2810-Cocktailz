import gql from 'graphql-tag';

// This query retrieves all reviews for a specific cocktail
export const GET_ALL_REVIEWS = gql`
	query GetAllReviews($cocktail: String!) {
		reviews(cocktail: $cocktail) {
			id
			user
			cocktail
			review
		}
	}
`;

// This mutation adds or updates a review for a specific cocktail by a specific user
export const ADD_REVIEW = gql`
	mutation updateReview($user: String!, $cocktail: String!, $review: String!) {
		updateReview(user: $user, cocktail: $cocktail, review: $review) {
			id
			user
			cocktail
			review
		}
	}
`;

// This query retrieves the review for a specific cocktail by a specific user
export const GET_ONE_REVIEW = gql`
	query GetOneReview($user: String!, $cocktail: String!) {
		review(user: $user, cocktail: $cocktail) {
			id
			user
			cocktail
			review
		}
	}
`;
