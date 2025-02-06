import { GraphQLObjectType, GraphQLID, GraphQLBoolean } from 'graphql';
import CocktailType from './Cocktails';
import UserType from './User';
import Cocktail from '../models/Cocktails';
import User from '../models/User';

// Define the FavoritesType for GraphQL
const FavoritesType = new GraphQLObjectType({
	name: 'Favorites',
	fields: () => ({
		id: { type: GraphQLID },
		user: {
			type: UserType,
			resolve(parent) {
				return User.findOne(parent.user);
			},
		},
		cocktail: {
			type: CocktailType,
			resolve(parent) {
				return Cocktail.findOne(parent.cocktail);
			},
		},
		favorite: { type: GraphQLBoolean },
	}),
});

export default FavoritesType;
