import Cocktail, { Icocktail } from '../models/Cocktails';
import Favorite, { IFavorite } from '../models/Favorites';
import User, { IUser } from '../models/User';
import Reviews, { IReview } from '../models/Reviews';
import Rating, { IRating } from '../models/Ratings';

export const resolvers = {
	Query: {
		//Returns all cocktails from the database as an array
		cocktails: async (
			_: unknown,
			{ limit = 0, offset = 0 }: { limit?: number; offset?: number }
		): Promise<Icocktail[]> => {
			const query = Cocktail.find();

			if (offset) {
				query.skip(offset);
			}
			if (limit) {
				query.limit(limit);
			}

			return await query;
		},

		// Returns all favorite cocktails for a specific user
		favorites: async (
			_: unknown,
			{ user }: { user: string }
		): Promise<IFavorite[]> => {
			return await Favorite.find({ user: user });
		},

		// Returns a specific favorite cocktail based on the user and cocktail
		favorite: async (
			_: unknown,
			{ user, cocktail }: { user: string; cocktail: string }
		): Promise<IFavorite | null> => {
			return await Favorite.findOne({ user, cocktail });
		},

		// Returns a specific cocktail based on its id
		cocktail: async (
			_: unknown,
			{ name }: { name: string }
		): Promise<Icocktail | null> => {
			return await Cocktail.findOne({ name });
		},

		//Returns a specific user by their id
		user: async (
			_: unknown,
			{ email }: { email: string }
		): Promise<IUser | null> => {
			return await User.findOne({ email });
		},

		// Returns all users from the database as an array
		users: async (): Promise<IUser[]> => {
			return await User.find();
		},

		// Returns all reviews from the database as an array
		ratings: async (
			_: unknown,
			{ cocktail }: { cocktail: string }
		): Promise<IRating[]> => {
			return await Rating.find({ cocktail: cocktail });
		},

		// Returns a specific review based on the user and cocktail
		rating: async (
			_: unknown,
			{ user, cocktail }: { user: string; cocktail: string }
		): Promise<IRating | null> => {
			return await Rating.findOne({ user, cocktail });
		},

		// Returns a specific rating based on the user and cocktail
		review: async (
			_: unknown,
			{ user, cocktail }: { user: string; cocktail: string }
		): Promise<IReview | null> => {
			return await Reviews.findOne({ user, cocktail });
		},

		// Returns all reviews from the database as an array for a specific cocktail
		reviews: async (
			_: unknown,
			{ cocktail }: { cocktail: string }
		): Promise<IReview[]> => {
			return await Reviews.find({ cocktail: cocktail });
		},

		// Returns all shots from the database as an array
		shots: async (): Promise<Icocktail[]> => {
			return await Cocktail.find({ type: 'Shot' });
		},
	},

	Mutation: {
		// Adds a new user to the database
		addUser: async (
			_: unknown,
			{ email, name, picture }: { email: string; name: string; picture: string }
		): Promise<IUser> => {
			// const hashedPassword = await hashPassword(password);
			const user = new User({ email, name, picture });
			return await user.save();
		},

		// Adds or removes a favorite cocktail for a user
		updateFavorite: async (
			_: unknown,
			{ user, cocktail }: { user: string; cocktail: string }
		): Promise<IFavorite | null> => {
			try {
				// Find user by email
				const useremail = await User.findOne({ email: user });
				if (!useremail) {
					throw new Error('User not found');
				}

				// Find cocktail by name
				const cocktailData = await Cocktail.findOne({ name: cocktail });
				if (!cocktailData) {
					throw new Error('Cocktail not found');
				}

				// Check if the favorite already exists
				const existingFavorite = await Favorite.findOne({
					user: user,
					cocktail: cocktail,
				});

				if (existingFavorite) {
					// If the favorite exists, delete it (unlike)
					await Favorite.findByIdAndDelete(existingFavorite._id);
					return existingFavorite; // Return the deleted favorite
				} else {
					// If it doesn't exist, create a new favorite (like)
					const newFavorite = new Favorite({
						user: user,
						cocktail: cocktail,
						favorite: true,
					});
					await newFavorite.save(); // Save and return the new favorite
					await Cocktail.findOneAndUpdate(
						{ name: cocktail },
						{ favorite: true },
						{ new: true }
					); // Update the cocktail's favorite status
					return newFavorite;
				}
			} catch {
				throw new Error('Unable to update favorite');
			}
		},

		// Updates, delete or creates a review for a user and cocktail
		updateReview: async (
			_: unknown,
			{
				user,
				cocktail,
				review,
			}: { user: string; cocktail: string; review: string }
		): Promise<IReview | undefined | null> => {
			try {
				// Find user by email to get their ObjectId
				const useremail = await User.findOne({ email: user });
				if (!useremail) {
					throw new Error('User not found');
				}

				// Find cocktail by name to get its ObjectId
				const cocktailData = await Cocktail.findOne({ name: cocktail });
				if (!cocktailData) {
					throw new Error('Cocktail not found');
				}

				// Find an existing review by user and cocktail
				const existingReview = await Reviews.findOne({
					user: user, // Use ObjectId instead of email for the review lookup
					cocktail: cocktail, // Use ObjectId instead of name for the review lookup
				});

				// Handle empty review - delete if it exists
				if (review === '' || review === null) {
					if (existingReview) {
						await existingReview.deleteOne();
						return existingReview;
					} else {
						return null;
					}
				}

				// Update the review if it exists
				if (existingReview) {
					if (
						existingReview.review !== review &&
						(review !== '' || review !== null)
					) {
						existingReview.review = review;
						return await existingReview.save();
					} else {
						return existingReview; // Return existing review if no changes
					}
				}

				// Create a new review if it doesn't exist
				if (!existingReview && review) {
					const newReview = new Reviews({
						user: user, // Use ObjectId for user
						cocktail: cocktail, // Use ObjectId for cocktail
						review,
					});
					return await newReview.save();
				}

				return null;
			} catch {
				throw new Error('Unable to update or create review' + Error);
			}
		},

		// Updates, delete or creates a rating for a user and cocktail
		updateRating: async (
			_: unknown,
			{
				user,
				cocktail,
				rating,
			}: { user: string; cocktail: string; rating: number }
		): Promise<IRating> => {
			try {
				// Find the user by email
				const userData = await User.findOne({ email: user });
				if (!userData) {
					throw new Error(`User with email "${user}" not found`);
				}

				// Find the cocktail by name
				const cocktailData = await Cocktail.findOne({ name: cocktail });
				if (!cocktailData) {
					throw new Error(`Cocktail with name "${cocktail}" not found`);
				}

				// Find the existing rating for the user and cocktail
				const existingRating = await Rating.findOne({
					user: user,
					cocktail: cocktail,
				});

				// Update the rating if it already exists and if the rating is different
				if (existingRating) {
					// Delete the rating if the user sets it to 0
					if (rating === 0) {
						await existingRating.deleteOne();
						return existingRating;

						// Update the rating if it's different from the existing rating
					} else if (existingRating.rating !== rating) {
						existingRating.rating = rating;
						return await existingRating.save();
					}

					return existingRating;

					// Create a new rating if it doesn't exist for the user and cocktail
				} else {
					const newRating = new Rating({
						user: user,
						cocktail: cocktail,
						rating,
					});

					return await newRating.save();
				}
			} catch (error) {
				throw new Error(`Unable to update or create review ${error}`);
			}
		},
	},
};
