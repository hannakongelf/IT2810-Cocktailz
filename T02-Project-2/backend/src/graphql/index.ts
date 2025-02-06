import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './TypeDefs';
import { resolvers } from './Resolvers';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// MongoDB connection setup
const mongoURI =
	process.env.MONGO_URI ||
	'mongodb://admin:admin@it2810-02.idi.ntnu.no:27017/cocktaildb?directConnection=true&serverSelectionTimeoutMS=2000&authSource=admin&appName=mongosh+2.3.2';
mongoose
	.connect(mongoURI, {})
	.then(() => console.log('Connected to MongoDB'))
	.catch((error: Error) => {
		console.error('Error connecting to MongoDB:', error.message || error);
		process.exit(1);
	});

// Create an Apollo Server instance with the type definitions and resolvers
const server = new ApolloServer({
	typeDefs,
	resolvers,
});

// Start the Apollo Server
startStandaloneServer(server, {
	listen: { port: 3001 },
})
	.then(({ url }) => {
		console.log(`🚀 Server ready at ${url}`);
	})
	.catch((error: Error) => {
		console.error('Error starting server:', error.message || error);
		process.exit(1);
	});
export { typeDefs };
