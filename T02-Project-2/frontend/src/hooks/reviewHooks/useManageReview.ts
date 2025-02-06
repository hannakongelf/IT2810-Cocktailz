// hooks/useReviewForm.ts
import { useState, useEffect } from 'react';
import useUpdateReviews from './useUpdateReviews.ts';
import useFetchOneReview from './useFetchOneReview.ts';
import { useUser } from '../contextHooks/useUser.ts';
import { Cocktail } from '../../types/CocktailInterface.ts';

/**
 * Hook to manage and update a review for a cocktail.
 * @param cocktail - The cocktail to review.
 * @returns review, setReview, showDeleteButton, submitReview, deleteReview
 */

const useManageReview = (cocktail: Cocktail) => {
	// Get user and cocktail name
	const { profile } = useUser();
	const userEmail = profile ? profile.email : '';
	const cocktailName = cocktail ? cocktail.name : '';

	// Get and update review from/in the database
	const { updateReview } = useUpdateReviews();
	const { oldReview } = useFetchOneReview(userEmail, cocktailName);
	const [showMessage, setShowMessage] = useState<boolean>(false);

	// Set the initial review to an empty string and showDeleteButton to false
	const [review, setReview] = useState<string>('');
	const [showDeleteButton, setShowDeleteButton] = useState<boolean>(false);

	// Load the review from the database and set showDeleteButton
	useEffect(() => {
		if (oldReview && oldReview.review && typeof oldReview.review === 'string') {
			setReview(oldReview.review);
			setShowDeleteButton(true);
		} else {
			setReview('');
			setShowDeleteButton(false);
		}
	}, [oldReview]);

	// Handle the review submission and update the review in the database
	const submitReview = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (review !== '') {
			await updateReview({
				variables: { user: userEmail, cocktail: cocktailName, review },
			});
			setReview(review);
			setShowDeleteButton(true);

			// Show success message
			setShowMessage(true);
			setTimeout(() => setShowMessage(false), 5000);
		} else {
			setShowDeleteButton(false);
		}
	};

	// Handle the review deletion and delete the review in the database
	const deleteReview = async () => {
		const userConfirmed = window.confirm(
			`Are you sure you want to delete your review for ${cocktailName}?`
		);
		if (userConfirmed) {
			updateReview({
				variables: { user: userEmail, cocktail: cocktailName, review: '' },
			});
			setReview('');
			setShowDeleteButton(false);
		}
	};
	return {
		review,
		setReview,
		showDeleteButton,
		submitReview,
		deleteReview,
		showMessage,
	};
};

export default useManageReview;
