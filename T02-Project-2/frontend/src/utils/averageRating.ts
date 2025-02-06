import { Rating } from '../types/RatingInterface';

const calculateAverageRating = (ratings: Rating[]): number | null => {
	// If there are no ratings, return null
	if (ratings.length === 0) {
		return null;
	}

	// Calculate the average rating
	const totalRating = ratings.length;
	const averageRating =
		ratings.reduce((sum, rating) => sum + rating.rating, 0) / totalRating;

	return Math.round(averageRating * 10) / 10;
};

export default calculateAverageRating;
