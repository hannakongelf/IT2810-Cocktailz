import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Tooltip } from '@mui/material';
import useManageReview from '../../hooks/reviewHooks/useManageReview';
import { Cocktail } from '../../types/CocktailInterface';

export interface CocktailReviewComponentProps {
	cocktail: Cocktail;
}

/**
 * Component to display the review of a cocktail.
 * @param {Cocktail} cocktail - The cocktail object.
 * @returns CocktailReviewComponent component.
 */

const CocktailReviewComponent: React.FC<CocktailReviewComponentProps> = ({
	cocktail,
}) => {
	// get the review, setReview, showDeleteButton, submitReview, deleteReview from useManageReview to manage the review
	const { review, setReview, showDeleteButton, submitReview, deleteReview } =
		useManageReview(cocktail);

	// return the form to submit a review for the cocktail on the favorite page
	return (
		<form
			onSubmit={submitReview}
			className={'flex items-center gap-2 mt-2 flex-col'}
		>
			{/* Review input field*/}
			<Box position="relative" width="100%" maxWidth="400px">
				<Tooltip
					title="Write to give a review"
					disableFocusListener
					disableTouchListener
				>
					<TextField
						id="review"
						label="What do you think about this cocktail?"
						value={review}
						onChange={(event) => setReview(event.target.value)}
						variant="outlined"
						className="w-[278px] md:w-96"
						sx={{
							// Personalize the border styling
							'& .MuiOutlinedInput-root': {
								'& fieldset': {
									borderColor: 'black',
								},
								'&.Mui-focused fieldset': {
									borderColor: '#F6C958',
								},
							},
							// Personalize the label styling
							'& .MuiInputLabel-root': {
								color: 'black',
								'&.Mui-focused': {
									color: 'black',
								},
								'&.MuiFormLabel-filled': {
									color: 'black',
								},
							},
						}}
						slotProps={{
							input: {
								className: 'text-sm md:text-lg font-quicksand',
								'aria-label': 'Input field for your drink review',
							},
							inputLabel: {
								className: `text-sm md:text-lg font-quicksand`,
							},
						}}
					/>
				</Tooltip>

				{/* Delete button */}
				{showDeleteButton && (
					<IconButton
						aria-label="delete"
						onClick={deleteReview}
						className="absolute right-1 top-4 transform -translate-y-1/2 hover:cursor-pointer focus:outline-none"
					>
						<DeleteIcon />
					</IconButton>
				)}
			</Box>

			{/* Submit button */}
			<Button
				type="submit"
				variant="contained"
				aria-label="submit"
				data-testid="SubmitReviewButton"
				className={
					'cursor-pointer hover:cursor-pointer mb-10 md:mb-0 focus:outline-none font-quicksand text-xs md:text-md bg-darkyellow text-black'
				}
			>
				Save Review
			</Button>
		</form>
	);
};

export default CocktailReviewComponent;
