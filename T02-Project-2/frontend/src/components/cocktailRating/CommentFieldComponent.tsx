import React from 'react';
import {
	Box,
	IconButton,
	TextField,
	Button,
	Table,
	InputAdornment,
	TableHead,
	TableCell,
	TableRow,
	TableBody,
	TableContainer,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import useFetchAllReviews from '../../hooks/reviewHooks/useFetchReviewsByCoktail';
import { Cocktail } from '../../types/CocktailInterface';
import { Review } from '../../types/ReviewInterface';
import { useUser } from '../../hooks/contextHooks/useUser';
import useManageReview from '../../hooks/reviewHooks/useManageReview';

export interface CommentFieldComponentProps {
	cocktail: Cocktail;
}

/**
 * Component to display the user's review input field and other users' reviews on the cocktail page.
 * @param {Cocktail} cocktail - The cocktail object.
 * @returns CommentFieldComponent component.
 */

const CommentFieldComponent: React.FC<CommentFieldComponentProps> = ({
	cocktail,
}) => {
	// Get the user profile, fetch all reviews for the cocktail and manage the review when the user submits a review
	const { profile } = useUser();
	const cocktailName = cocktail.name;
	const { reviews } = useFetchAllReviews(cocktailName);
	const {
		review,
		setReview,
		showDeleteButton,
		submitReview,
		deleteReview,
		showMessage,
	} = useManageReview(cocktail);

	// Filter out the user's own review
	const filteredReviews = React.useMemo(
		() => reviews.filter((r: Review) => r.user !== profile?.email),
		[reviews, profile]
	);

	// Return the CommentFieldComponent with the user's review input and other users' reviews on the cocktail page
	return (
		<Box
			sx={{
				padding: 4,
				marginTop: 2,
				maxWidth: 800,
				bgcolor: '#daeafd',
				border: 'none',
				borderRadius: '8px',
				boxShadow: 2,
				width: '100%',
			}}
			aria-label="User review and other user comments section"
		>
			{/* User's Review Input Section */}
			<form
				onSubmit={submitReview}
				className="mb-4 w-full flex flex-col md:flex-row gap-2"
			>
				<Box className="w-full flex-1">
					<TextField
						id="review"
						label="What do you think about this cocktail?"
						value={review}
						onChange={(event) => setReview(event.target.value)}
						variant="standard"
						fullWidth
						autoComplete="off"
						InputProps={{
							endAdornment: showDeleteButton && (
								<InputAdornment position="end">
									<IconButton
										aria-label="Delete your review"
										onClick={deleteReview}
										edge="end"
									>
										<DeleteIcon />
									</IconButton>
								</InputAdornment>
							),
						}}
						sx={{
							'& .MuiInputLabel-root': {
								fontSize: { xs: '0.8rem', md: '1rem' },
								color: 'black',
								fontFamily: 'quicksand, sans-serif',
								'&.Mui-focused': {
									color: 'black',
								},
							},
							'& .MuiInputBase-root': {
								color: 'black',
								fontSize: { xs: '1rem', md: '1rem' },
								fontFamily: 'quicksand, sans-serif',
							},
						}}
						aria-label="Your review input field"
					/>
				</Box>
				<Button
					type="submit"
					variant="contained"
					className="cursor-pointer hover:cursor-pointer mt-0 md:ml-4 md:mb-6 md:mb-0 md:mt-4 focus:outline-none font-quicksand bg-dark-blue text-black"
					sx={{
						whiteSpace: 'nowrap',
						fontSize: { xs: '0.7rem', md: '0.9rem' },
						marginTop: { xs: 2, md: 0 },
						width: { xs: 'fit-content', md: 'fit-content' },
						height: { xs: '26px', md: '32px' },
						minWidth: { xs: '100px', md: '150px' },
					}}
					aria-label="Save your review"
				>
					Save Review
				</Button>
				{/* "Review Saved!" message */}
				{showMessage && (
					<p className="text-blue-text text-sm font-italic mt-2 md:mt-4 pt-2">
						Review Saved!
					</p>
				)}
			</form>

			{/* Comments from Other Users */}
			<TableContainer
				sx={{
					marginTop: 2,
					maxWidth: 900,
					bgcolor: '#daeafd',
					border: 'none',
					width: '100%',
				}}
			>
				<Table
					aria-label="Comments from other users"
					stickyHeader
					sx={{
						bgcolor: '#daeafd',
						'& th': {
							color: 'black',
							borderBottom: '1px solid black',
							fontSize: { lg: '1.4rem', xs: '1rem' },
							fontWeight: 'bold',
							textAlign: 'left',
							fontFamily: 'oswald, sans-serif',
							bgcolor: '#daeafd',
						},
						'& td': {
							borderBottom: '1px solid black',
							color: 'black',
							textAlign: 'left',
							fontSize: { xs: '0.9rem', lg: '1.0rem' },
							fontWeight: '350',
							fontFamily: 'quicksand, sans-serif',
							padding: '8px 0',
						},
						'& tr': {
							borderBottom: '1px solid black',
						},
					}}
				>
					<TableHead>
						<TableRow>
							<TableCell aria-label="Header for other users' comments">
								{' '}
								Comments from other users
							</TableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{filteredReviews.length > 0 ? (
							filteredReviews.map((review: Review) => (
								<TableRow key={review.id} aria-label="Review row">
									<TableCell
										aria-label={`Review: ${review.review || 'No comments available'}`}
									>
										{review.review
											? review.review
											: 'No comments available for this cocktail'}
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow aria-label="No other users have left a review">
								<TableCell colSpan={2} style={{ textAlign: 'center' }}>
									No other users have left a review!
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default CommentFieldComponent;
