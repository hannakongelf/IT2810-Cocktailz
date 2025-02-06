import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for the favorite model
export interface IFavorite extends Document {
	user: string;
	cocktail: string;
	favorite: boolean;
}

// Define the schema for the favorite model
const favoritesSchema: Schema<IFavorite> = new Schema({
	user: { type: String, required: true },
	cocktail: { type: String, required: true },
	favorite: { type: Boolean },
});

export default mongoose.model<IFavorite>('Favorite', favoritesSchema);
