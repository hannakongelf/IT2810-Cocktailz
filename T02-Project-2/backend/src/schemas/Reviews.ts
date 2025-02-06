import { GraphQLObjectType, GraphQLID, GraphQLString } from 'graphql';
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
				return User.findOne({ email: parent.user });
			},
		},
		cocktail: {
			type: CocktailType,
			resolve(parent) {
				return Cocktail.findOne({ name: parent.cocktail });
			},
		},
		review: { type: GraphQLString },
	}),
});

export default ReviewsType;
