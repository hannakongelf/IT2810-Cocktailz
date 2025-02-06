import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for the cocktail model
export interface Icocktail extends Document {
	name: string;
	type: string;
	imageurl: string;
	ingredients: [{ name: string; amount: string }];
}

// Define the schema for the cocktail model
const cocktailSchema: Schema<Icocktail> = new Schema({
	name: { type: String, required: true, unique: true },
	type: { type: String },
	imageurl: { type: String },
	ingredients: [{ name: String, amount: String }],
});

export default mongoose.model<Icocktail>('Cocktail', cocktailSchema);
