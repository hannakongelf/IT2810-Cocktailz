import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for the rating model
export interface IRating extends Document {
	user: string;
	cocktail: string;
	rating: number;
}

// Define the schema for the rating model
const RatingsSchema: Schema<IRating> = new Schema({
	user: { type: String, required: true },
	cocktail: { type: String, required: true },
	rating: { type: Number, required: true },
});

export default mongoose.model<IRating>('Rating', RatingsSchema);
