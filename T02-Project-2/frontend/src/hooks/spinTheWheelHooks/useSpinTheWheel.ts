import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePopUp } from '../contextHooks/usePopUp';
import { useLoader } from '../contextHooks/useLoader';
import useFetchAllShots from './useFetchAllShots';
import {
	generateWheelData,
	generateWinningNumber,
	WheelData,
} from '../../utils/spinTheWheelUtils';
import { Cocktail } from '../../types/CocktailInterface';

/**
 * Custom hook to manage the logic for the "Spin the Wheel" component.
 *
 * @param sizeWheel - Number of segments on the wheel.
 * @param segColors - Array of colors for the segments.
 */

export const useSpinTheWheel = (sizeWheel: number, segColors: string[]) => {
	const navigate = useNavigate();
	const { isPopUpVisible, setIsPopUpVisible } = usePopUp();
	const { isLoading, setIsLoading } = useLoader();
	const {
		loading: loadingShots,
		error: errorShots,
		shots,
	} = useFetchAllShots();

	const [winnerIndex, setWinnerIndex] = useState(0);
	const [winner, setWinner] = useState<string | null>(null);
	const [mustSpin, setMustSpin] = useState(false);
	const [data, setData] = useState<WheelData[]>([]);

	// Set global loading state after fetching shots
	useEffect(() => {
		if (!loadingShots && shots.length > 0) {
			setIsLoading(false);
		}
	}, [loadingShots, shots, setIsLoading]);

	// Fill spin the wheel with shots from the database
	const segments = useMemo(() => {
		if (!isLoading && shots.length > 0) {
			return shots.map((shot: Cocktail) => shot.name);
		}
		return [];
	}, [shots, isLoading]);

	// Set data for the wheel in the beginning if they are not set
	useEffect(() => {
		if (!isLoading && segments.length > 0 && data.length === 0) {
			const generatedData = generateWheelData(segments, segColors, sizeWheel);
			setData(generatedData);
		}
	}, [isLoading, segments, segColors, sizeWheel, data.length]);

	// Handle spinning and setting winner
	const handleSpinClick = () => {
		if (!mustSpin) {
			setWinner(null);
			setWinnerIndex(generateWinningNumber(data.length));
			setMustSpin(true);
		}
	};

	// Send user to this shot
	const handleTakeThisShot = () => {
		setIsPopUpVisible(false);
		if (winner) {
			navigate(`/CocktailPage/${winner}`);
		}
	};

	// Set the winner and stop the spinning
	const onFinished = useCallback(
		(index: number) => {
			setWinner(data[index]?.option || null);
			setMustSpin(false);
		},
		[data]
	);

	return {
		isPopUpVisible,
		loadingShots,
		errorShots,
		data,
		mustSpin,
		winnerIndex,
		winner,
		handleSpinClick,
		handleTakeThisShot,
		onFinished,
	};
};
