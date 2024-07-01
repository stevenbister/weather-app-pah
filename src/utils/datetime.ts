/**
 * Formats a given date string into a formatted date string.
 *
 * @param datetimeStr - The date string to be formatted.
 * @returns The formatted date string.
 */
export function formatDateTime(
	datetimeStr: string,
	options: Intl.DateTimeFormatOptions = {
		day: '2-digit',
		month: 'long',
		weekday: 'long',
	}
): string {
	// Parse the date string
	const date = new Date(datetimeStr);

	const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(date);

	return formattedDate;
}
