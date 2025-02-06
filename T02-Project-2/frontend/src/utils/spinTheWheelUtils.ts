export interface WheelData {
	option: string;
	style?: StyleType;
	number?: number;
}

export interface StyleType {
	backgroundColor?: string;
	textColor?: string;
	fontSize?: number;
	fontFamily?: string;
}

/**
 * Function to generate wheel data with random segments and styles.
 *
 * @param segments - Array of shots to be displayed on the wheel.
 * @param segColors - Array of colors to be applied to the segments.
 * @param numFields - Total number of segments to display on the wheel.
 *
 * @returns An array of Shots with their respective styles.
 */

export const generateWheelData = (
	segments: string[],
	segColors: string[],
	numFields: number
): WheelData[] => {
	// Randomly select segments from the list to fill the wheel
	const randomSegments: string[] = [];
	while (
		randomSegments.length < numFields &&
		randomSegments.length < segments.length
	) {
		const randomIndex = Math.floor(Math.random() * segments.length);
		const segment = segments[randomIndex];
		if (!randomSegments.includes(segment)) {
			randomSegments.push(segment);
		}
	}

	// Set color and font for each segment
	return randomSegments.map((option, index) => ({
		option,
		style: {
			backgroundColor: segColors[index % segColors.length],
			textColor: '#000000',
			fontSize: 16,
			fontFamily: 'quicksand',
		},
	}));
};

// Generate a random winning index
export const generateWinningNumber = (length: number): number => {
	return Math.floor(Math.random() * length);
};
