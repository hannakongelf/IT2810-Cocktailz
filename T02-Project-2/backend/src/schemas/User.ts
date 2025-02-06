import { GraphQLObjectType, GraphQLID, GraphQLString } from 'graphql';

// Define the UserType for GraphQL
const UserType = new GraphQLObjectType({
	name: 'Users',
	fields: () => ({
		id: { type: GraphQLID },
		email: { type: GraphQLString },
		name: { type: GraphQLString },
		picture: { type: GraphQLString },
	}),
});

export default UserType;
