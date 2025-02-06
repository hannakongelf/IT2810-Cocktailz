import { GraphQLObjectType, GraphQLID, GraphQLInt } from 'graphql';
import CocktailType from './Cocktails';
import UserType from './User';
import Cocktail from '../models/Cocktails';
import User from '../models/User';

// Define the ReviewsType for GraphQL
const ReviewsType = new GraphQLObjectType({
	name: 'Reviews',

	fields: () => ({
		id: { type: GraphQLID },
		user: {
			type: UserType,
			resolve(parent) {
				// Find the user by email
				return User.findOne({ email: parent.user });
			},
		},
		cocktail: {
			type: CocktailType,
			resolve(parent) {
				// Find the cocktail by name
				return Cocktail.findOne({ name: parent.cocktail });
			},
		},
		rating: { type: GraphQLInt },
	}),
});

export default ReviewsType;
