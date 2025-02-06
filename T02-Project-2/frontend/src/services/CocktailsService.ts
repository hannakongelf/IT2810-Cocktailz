import { gql } from '@apollo/client';

// This query is used to get all cocktails from the backend
export const GET_ALL_COCKTAILS = gql`
	query GetAllCocktails($limit: Int, $offset: Int) {
		cocktails(limit: $limit, offset: $offset) {
			id
			name
			type
			imageurl
			ingredients {
				name
				amount
			}
		}
	}
`;

// This query is used to get a single cocktail from the database
export const GET_COCKTAIL = gql`
	query GetCocktail($name: String!) {
		cocktail(name: $name) {
			id
			name
			type
			imageurl
			ingredients {
				name
				amount
			}
		}
	}
`;

// This query is used to get all shots from the database
export const GET_ALL_SHOTS = gql`
	query GetShots {
		shots {
			id
			name
			type
			imageurl
			ingredients {
				name
				amount
			}
		}
	}
`;
