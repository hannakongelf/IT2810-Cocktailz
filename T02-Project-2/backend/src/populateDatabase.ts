import mongoose from 'mongoose';
import fetch from 'node-fetch';
import Cocktail from './models/Cocktails';
import { apiDrink, Ingredient } from './Interfaces';

// To load data the current only command I've gotten to work is this: npx tsx ./backend/src/populateDatabase.ts

// The URI to the MongoDB database where the data is stored
const mongoURI =
	'mongodb://admin:admin@it2810-02.idi.ntnu.no:27017/cocktaildb?directConnection=true&serverSelectionTimeoutMS=2000&authSource=admin&appName=mongosh+2.3.2';

// Connect to the MongoDB database using the URI and set timeout for the connection
const conntectToMongoDB = async () => {
	try {
		await mongoose.connect(mongoURI, {
			serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
			socketTimeoutMS: 45000,
		});
		console.log('MongoDB connected');
	} catch (err) {
		console.error('MongoDB connection error: ', err);
		process.exit(1);
	}
};

// Fetch data from the API and save it to the MongoDB database
export const fetchCocktailsFromAPI = async () => {
	try {
		// Loop through all the letters in the alphabet to get all the drinks from the API
		for (let i = 0; i < 26; i++) {
			const letter = String.fromCharCode(97 + i); // aince a starts at 97
			const response = await fetch(
				`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`
			);
			const data = (await response.json()) as { drinks: apiDrink[] };
			console.log('Data fetched');

			// Loop through all the drinks in the data and save them to the database
			if (data.drinks) {
				for (const drink of data.drinks) {
					const cocktail = new Cocktail({
						name: drink.strDrink,
						type: drink.strCategory,
						imageurl: drink.strDrinkThumb,
						ingredients: getIngredients(drink),
					});
					console.log('found cocktail and ingredients');
					await cocktail.save();
					console.log('Cocktail saved');
				}
			}
		}
	} catch (error) {
		console.error('Error in getting data from api: ', error);
	}
};

// Get the ingredients from the drink object
const getIngredients = (drink: Cocktail) => {
	console.log('getingredients called');
	const ingredients: Ingredient[] = [];
	for (let i = 1; i <= 15; i++) {
		const ingredient = drink[`strIngredient${i}`];
		const amount = drink[`strMeasure${i}`];

		if (ingredient) {
			ingredients.push({ name: ingredient, amount: amount || 'N/A' });
		}
	}
	console.log('getingredients finished');
	return ingredients;
};

// Connect to the MongoDB database and fetch data from the API
const addData = async () => {
	await conntectToMongoDB();
	await fetchCocktailsFromAPI();
};

addData();

export default fetchCocktailsFromAPI();
