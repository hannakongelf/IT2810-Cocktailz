import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for the user model
export interface IUser extends Document {
	email: string;
	name: string;
	picture: string;
}

// Define the schema for the user model
const userSchema: Schema<IUser> = new Schema({
	email: { type: String, required: true, unique: true },
	name: { type: String, required: true },
	picture: { type: String, required: true },
});

export default mongoose.model<IUser>('User', userSchema);
