import {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLList,
} from 'graphql';

// Define the IngredientType for GraphQL
const IngredientType = new GraphQLObjectType({
	name: 'Ingredient',
	fields: () => ({
		name: { type: GraphQLString },
		amount: { type: GraphQLString },
	}),
});

// Define the CocktailType for GraphQL
const CocktailType = new GraphQLObjectType({
	name: 'Cocktails',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		type: { type: GraphQLString },
		imageurl: { type: GraphQLString },
		ingredients: { type: new GraphQLList(IngredientType) },
	}),
});

export default CocktailType;
