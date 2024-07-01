import type { Current, Forecast, Search } from '@/types';

/**
 * Fetches weather data from the Weather API.
 *
 * @param endpoint - The API endpoint to fetch data from.
 * @param query - The query string for the API request.
 * @returns A promise that resolves to the fetched weather data.
 * @throws An error if the API request fails or returns an error.
 */
async function getWeatherApiData<T>(endpoint: string, query: string): Promise<T> {
	const res = await fetch(
		`https://api.weatherapi.com/v1/${endpoint}.json?key=${process.env.WEATHER_API_KEY}&q=${query}`
	);

	const data = await res.json();

	if (!res.ok) {
		throw new Error(data.error.message ?? 'An unexpected error occurred');
	}

	return data;
}

/**
 * Retrieves the current weather data by ID.
 *
 * @param id - The ID of the weather data to retrieve.
 * @returns A promise that resolves to the current weather data.
 */
export async function getCurrentById(id: number): Promise<Current | undefined | { error: string }> {
	try {
		if (!id) return;

		return await getWeatherApiData('current', `id:${id.toString()}`);
	} catch (error) {
		if (error instanceof Error) {
			return { error: error.message };
		}

		return { error: 'An unexpected error occurred' };
	}
}

/**
 * Retrieves the forecast data for a specific location by ID.
 *
 * @param id - The ID of the location.
 * @param days - The number of days to retrieve the forecast for, upto 14 days.
 * @returns A Promise that resolves to the forecast data.
 */
export async function getForecastById(
	id: number,
	days: number
): Promise<Forecast | undefined | { error: string }> {
	try {
		if (days < 1 || days > 14) {
			throw new Error('The number of days must be between 1 and 14');
		}

		return await getWeatherApiData('forecast', `id:${id.toString()}&days=${days.toString()}`);
	} catch (error) {
		if (error instanceof Error) {
			return { error: error.message };
		}

		return { error: 'An unexpected error occurred' };
	}
}

/**
 * Searches for weather data based on the provided query.
 *
 * @param query - The search query. Pass US Zipcode, UK Postcode, Canada Postalcode, IP address, Latitude/Longitude (decimal degree) or city name.
 * @returns A promise that resolves to an array of search results.
 */
export async function search(query: string): Promise<Search[] | undefined | { error: string }> {
	try {
		if (!query) return;

		return await getWeatherApiData('search', query);
	} catch (error) {
		if (error instanceof Error) {
			return { error: error.message };
		}

		return { error: 'An unexpected error occurred' };
	}
}
