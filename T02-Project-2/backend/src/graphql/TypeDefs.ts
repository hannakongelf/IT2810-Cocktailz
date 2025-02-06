import gql from 'graphql-tag';

// GraphQL type definitions
export const typeDefs = gql`
	type Ingredient {
		name: String!
		amount: String!
	}

	type Cocktail {
		id: ID!
		name: String!
		type: String!
		imageurl: String!
		ingredients: [Ingredient!]!
	}

	type Favorites {
		id: ID!
		user: String!
		cocktail: String!
		favorite: Boolean!
	}

	type User {
		id: ID!
		email: String!
		name: String!
		picture: String!
	}

	type Review {
		id: ID!
		user: String!
		cocktail: String!
		review: String!
	}

	type Rating {
		id: ID!
		user: String!
		cocktail: String!
		rating: Int!
	}

	type Query {
		cocktails(limit: Int, offset: Int): [Cocktail]
		favorites(user: String!): [Favorites]
		favorite(user: String!, cocktail: String!): Favorites
		cocktail(name: String!): Cocktail
		user(email: String!): User
		users: [User]
		review(user: String!, cocktail: String!): Review
		reviews(cocktail: String!): [Review]
		rating(user: String!, cocktail: String!): Rating
		ratings(cocktail: String!): [Rating]
		shots: [Cocktail]
	}

	type Mutation {
		addUser(email: String!, name: String!, picture: String!): User
		deleteUser(id: ID!): User
		updateFavorite(user: String!, cocktail: String!): Favorites
		updateReview(user: String!, cocktail: String!, review: String!): Review
		updateRating(user: String!, cocktail: String!, rating: Int!): Rating
	}
`;
