'use client';

import type { Search } from '@/types';
import { FormControl, FormLabel, Input, Skeleton, Stack } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { Alert } from './Alert';

type SearchResult =
	| Search[]
	| {
			error: string;
	  }
	| undefined;

export interface SearchProps {
	defaultWeatherData: SearchResult;
}

export function Search({ defaultWeatherData = undefined }: SearchProps) {
	const [value, setValue] = useState<string>('');
	const [debouncedValue] = useDebounce(value, 500);

	const { data, isLoading, isError } = useQuery({
		queryKey: ['searchWeather', debouncedValue],
		queryFn: async () => await searchWeather(debouncedValue),
		// ⬇️ disabled as long as the value is empty
		enabled: debouncedValue.length > 0,
	});

	return (
		<>
			<SearchForm value={value} onValueChange={setValue} />
			<SearchResults data={data ?? defaultWeatherData} isLoading={isLoading} />
		</>
	);
}

/* -------------------------------------------------------------------------------------------------
 * SearchForm
 * -----------------------------------------------------------------------------------------------*/
interface SearchFormProps {
	value: string;
	onValueChange: (value: string) => void;
}

function SearchForm({ value, onValueChange }: SearchFormProps) {
	return (
		<form>
			<FormControl>
				<FormLabel>Search for a city</FormLabel>
				<Input
					type="search"
					name="s"
					value={value}
					onChange={(e) => onValueChange(e.target.value)}
				/>
			</FormControl>
		</form>
	);
}

/* -------------------------------------------------------------------------------------------------
 * SearchResults
 * -----------------------------------------------------------------------------------------------*/
interface SearchResultsProps {
	data: SearchResult;
	isLoading: boolean;
}

function SearchResults({ data, isLoading }: SearchResultsProps) {
	if (isLoading) {
		return (
			<Stack>
				<Skeleton height="20px" />
				<Skeleton height="20px" />
				<Skeleton height="20px" />
			</Stack>
		);
	}

	if (!data) {
		return <p>No results found</p>;
	}

	if ('error' in data) {
		return <Alert status="error" message={data.error} />;
	}

	return (
		<Stack as="ul">
			{data.map((result) => (
				<li key={result.id}>
					{result.name}, {result.region}, {result.country}
				</li>
			))}
		</Stack>
	);
}

/**
 * Handler for searching client-side using the api route.
 *
 * @param query - The search query.
 * @returns A promise that resolves to an object containing weather information, error message (if any), and status code.
 */
export async function searchWeather(query: string): Promise<SearchResult> {
	const res = await fetch(`/api/search?query=${query}`);
	const data = await res.json();

	return data;
}
