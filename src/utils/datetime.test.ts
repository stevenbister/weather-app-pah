import { formatDateTime } from '../utils/datetime';

describe('formatDateTime', () => {
	test('should format the date string correctly', () => {
		const datetimeStr = '2022-01-01T12:00:00Z';
		const formattedDate = formatDateTime(datetimeStr);
		expect(formattedDate).toBe('Saturday 01 January');
	});

	test('should format the date string with custom options', () => {
		const datetimeStr = '2022-01-01T12:00:00Z';
		const options = {
			day: 'numeric',
			month: 'short',
			year: 'numeric',
		} satisfies Intl.DateTimeFormatOptions;

		const formattedDate = formatDateTime(datetimeStr, options);
		expect(formattedDate).toBe('1 Jan 2022');
	});
});
