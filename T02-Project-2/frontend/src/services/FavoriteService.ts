import gql from 'graphql-tag';

// This query is used to get all favorites for a specific user
export const GET_FAVORITES_BY_USER = gql`
	query GetFavoritesByUser($user: String!) {
		favorites(user: $user) {
			id
			cocktail
			favorite
		}
	}
`;

// This query updates a user's favorite status for a specific cocktail
export const UPDATE_FAVORITE = gql`
	mutation UpdateFavorite($user: String!, $cocktail: String!) {
		updateFavorite(user: $user, cocktail: $cocktail) {
			id
			user
			cocktail
			favorite
		}
	}
`;

// This query retrieves a specific favorite cockail from a specific user
export const GET_FAVORITES_BY_USER_AND_COCKTAIL = gql`
	query GetFavoritesByUserAndCocktail($user: String!, $cocktail: String!) {
		favorite(user: $user, cocktail: $cocktail) {
			id
			favorite
		}
	}
`;

// This query retrieves full cocktail details about a specific cocktail
export const GET_COCKTAIL_DETAILS = gql`
	query GetCocktailDetails($name: String!) {
		cocktail(name: $name) {
			id
			name
			imageurl
		}
	}
`;
