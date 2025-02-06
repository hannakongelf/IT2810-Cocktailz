// Interfaces for Ingredient and Cocktail
export interface Ingredient {
	name: string;
	amount: string;
}

export interface Cocktail {
	id: string;
	name: string;
	type: string;
	imageurl: string;
	ingredients: Ingredient[];
}
