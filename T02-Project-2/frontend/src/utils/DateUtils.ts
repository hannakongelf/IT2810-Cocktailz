/**
 * Calculates the day of the year for a given date.
 * @param date - The date to calculate the day of the year for.
 * @returns The day of the year (1-365 or 1-366 for leap years).
 */

export function dayOfYear(date: Date): number {
	const startOfYear = new Date(date.getFullYear(), 0, 1);
	const diffMS = date.getTime() - startOfYear.getTime();
	const days = Math.floor(diffMS / (1000 * 60 * 60 * 24));
	return days + 1;
}
