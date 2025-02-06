import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import { useLoader } from '../../hooks/contextHooks/useLoader';

/**
 * Component to display a loading card.
 * @returns LoadingCard component.
 */

const LoadingCard: React.FC = () => {
	const { delayedLoading } = useLoader();

	// Don't render the component if `delayedLoading` is false
	if (!delayedLoading) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
			<div className="p-6 bg-white shadow-lg rounded-lg flex flex-col items-center">
				<CircularProgress color="secondary" />
				<p className="mt-4 text-lg font-semibold">
					Loading cocktails... <LocalBarIcon />
				</p>
			</div>
		</div>
	);
};
export default LoadingCard;
