import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for the review model
export interface IReview extends Document {
	user: string;
	cocktail: string;
	review: string;
}

// Define the schema for the review model
const reviewsSchema: Schema<IReview> = new Schema({
	user: { type: String, required: true },
	cocktail: { type: String, required: true },
	review: { type: String },
});

export default mongoose.model<IReview>('Review', reviewsSchema);
