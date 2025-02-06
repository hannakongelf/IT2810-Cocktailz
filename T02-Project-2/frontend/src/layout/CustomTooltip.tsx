import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

/**
 * Custom tooltip component with custom styles.
 * @param props - TooltipProps
 * @returns CustomTooltip
 */

export const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
	<Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
	[`& .${tooltipClasses.tooltip}`]: {
		backgroundColor: 'rgba(255, 255, 255, 0.8)',
		color: 'rgba(0, 0, 0, 0.87)',
		boxShadow: theme.shadows[1],
		fontSize: 12,
		fontFamily: 'quicksand',
	},
}));
