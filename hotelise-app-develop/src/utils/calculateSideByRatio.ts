/**
 * Calculates side size using relative ratio
 * @param side given side size
 * @param ratio given ratio
 */
export default function calculateSideByRatio(
	side: number,
	ratio: number
): number {
	return Math.round(side * ratio);
}
