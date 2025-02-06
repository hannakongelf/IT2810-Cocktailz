import { useEffect } from 'react';
import { useLoader } from '../../hooks/contextHooks/useLoader';
import { GET_ALL_SHOTS } from '../../services/CocktailsService';
import { useQuery } from '@apollo/client';

/**
 * Hook to fetch all shots from the backend
 * @returns loading, error, shots
 */

const useFetchAllShots = () => {
	const { loading, error, data } = useQuery(GET_ALL_SHOTS);
	const { setIsLoading } = useLoader(); // Access global loading function

	// Set the global loading state based on the loading status of the query
	useEffect(() => {
		setIsLoading(loading);
	}, [loading, setIsLoading]);

	return { loading, error, shots: data?.shots || [] };
};

export default useFetchAllShots;
