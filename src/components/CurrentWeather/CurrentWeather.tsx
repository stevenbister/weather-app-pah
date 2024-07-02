import type { CurrentClass } from '@/types';
import { formatDateTime } from '@/utils/datetime';
import { getCurrentById } from '@/utils/weather';
import { Box, Flex, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { Alert } from '../Alert/Alert';

export interface WeatherProps {
	id: number;
}

export async function CurrentWeather({ id }: WeatherProps) {
	const weather = await getCurrentById(id);

	if (!weather) {
		return (
			<Stack as="section">
				{/* eslint-disable-next-line react/no-unescaped-entities */}
				<h1>Looks like you haven't searched for a location yet.</h1>
				<p>Try searching by postcode, or city name in the search bar above.</p>
			</Stack>
		);
	}

	if ('error' in weather) {
		return <Alert status="error" message={weather.error} />;
	}

	return (
		<Flex as="section" w="100%" wrap="wrap" align="end">
			<Stack flex="1 0 auto">
				<header>
					<Stack as="hgroup" spacing={1}>
						<Text color="gray.700">
							{formatDateTime(weather.location.localtime) ?? ''}
						</Text>
						<Heading as="h1">{weather.location.name ?? ''}</Heading>
					</Stack>
				</header>

				{/* TODO: get better icons/images */}
				<Image
					src={`https:${weather.current.condition.icon}`}
					alt={weather.current.condition.text}
					width={200}
					height={200}
				/>
				<CurrentWeatherTemp current={weather.current} />
			</Stack>

			<Box flex="1 0 auto">
				<CurrentWeatherGrid current={weather.current} />
			</Box>
		</Flex>
	);
}

/* -------------------------------------------------------------------------------------------------
 * CurrentWeatherTemp
 * -----------------------------------------------------------------------------------------------*/
interface CurrentWeatherTempProps {
	current: CurrentClass;
}

function CurrentWeatherTemp({ current }: CurrentWeatherTempProps) {
	return (
		<Flex gap={6} alignItems="center">
			<Text fontSize="6xl">
				<Text as="strong">{current.temp_c ?? ''}</Text>°C
			</Text>
			<Text display="flex" flexDirection="column">
				Feels like: <Text as="strong">{current.feelslike_c ?? ''}°C</Text>
			</Text>
		</Flex>
	);
}

/* -------------------------------------------------------------------------------------------------
 * CurrentWeatherGrid
 * -----------------------------------------------------------------------------------------------*/
interface CurrentWeatherGridProps {
	current: CurrentClass;
}

function CurrentWeatherGrid({ current }: CurrentWeatherGridProps) {
	return (
		<SimpleGrid columns={2} w="100%">
			<WeatherInfo label="Humidity" value={current.humidity ?? ''} unit="%" />
			<WeatherInfo label="UV" value={current.uv ?? 0} unit="/10" />
			<WeatherInfo label="Wind" value={current.wind_kph ?? ''} unit="km/h" />
			<WeatherInfo label="Rain" value={current.precip_mm ?? ''} unit="mm" />
		</SimpleGrid>
	);
}

/* -------------------------------------------------------------------------------------------------
 * WeatherInfo
 * -----------------------------------------------------------------------------------------------*/
interface WeatherInfoProps {
	label: string;
	value: string | number;
	unit: string;
}

function WeatherInfo({ label, value, unit }: WeatherInfoProps) {
	return (
		<Flex as="dl" bg="gray.200" p={2} m={0.5} gap={4} justify="space-between" borderRadius={8}>
			<Text as="dt">{label}</Text>
			<Text as="dd">
				<Text as="strong">{value}</Text> {unit}
			</Text>
		</Flex>
	);
}
