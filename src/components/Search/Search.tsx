'use client';

import type { Search } from '@/types';
import { Link } from '@chakra-ui/next-js';
import {
	Box,
	FormControl,
	FormLabel,
	Input,
	List,
	ListItem,
	Skeleton,
	Stack,
	Text,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { Alert } from '../Alert/Alert';

type SearchResult =
	| Search[]
	| {
			error: string;
	  }
	| undefined;

export interface SearchProps {
	defaultWeatherData: SearchResult;
	inputRef?: React.RefObject<HTMLInputElement>;
}

export function Search({ defaultWeatherData = undefined, inputRef }: SearchProps) {
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
			<SearchForm value={value} onValueChange={setValue} inputRef={inputRef} />
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
	inputRef?: React.RefObject<HTMLInputElement>;
}

function SearchForm({ value, onValueChange, inputRef }: SearchFormProps) {
	return (
		<form>
			<FormControl>
				<FormLabel>Search for a city</FormLabel>
				<Input
					type="search"
					name="s"
					value={value}
					onChange={(e) => onValueChange(e.target.value)}
					ref={inputRef}
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
				<Skeleton height="50px" />
				<Skeleton height="50px" />
				<Skeleton height="50px" />
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
		<Stack as={List} marginTop="8px">
			{data.map((result, i) => (
				<Box
					as={ListItem}
					borderBottom="solid 1px"
					borderBottomColor={i === data.length - 1 ? 'transparent' : 'gray.400'}
					w="100%"
					p={4}
					key={result.id}
				>
					<Link href={result.id.toString()} display="block">
						<Text>
							{result.name}, {result.region}
						</Text>
						<Text color="gray.500">{result.country}</Text>
					</Link>
				</Box>
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
