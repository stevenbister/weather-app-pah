import type { Forecast } from '@/types';
import { formatDateTime } from '@/utils/datetime';
import { getForecastById } from '@/utils/weather';
import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { Alert } from '../Alert/Alert';

export interface WeatherForecastProps {
	id: number;
	days?: number;
}

export async function WeatherForecast({ id, days = 5 }: WeatherForecastProps) {
	if (!id) return null;

	const weather = await getForecastById(id, days);

	if (!weather) return null;

	if ('error' in weather) {
		return <Alert status="error" message={weather.error} />;
	}

	const futureDays = getDays(weather);

	return (
		<Stack>
			<Heading as="h2">{days}-Day Forecast</Heading>
			<Flex as="section" justify="space-evenly" gap={4} overflow="auto">
				{futureDays.map(({ date, day }, i) => (
					<Box flex="1 0 auto" key={i}>
						<Flex align="center" gap={2}>
							<Image
								src={`https:${day.condition.icon}`}
								alt={day.condition.text}
								width={30}
								height={30}
							/>
							<Text as="strong">{day.avgtemp_c}°C</Text>
						</Flex>

						<Text color="gray.700">{formatDateTime(date)}</Text>
					</Box>
				))}
			</Flex>
		</Stack>
	);
}

function getDays(forecast: Forecast) {
	return forecast.forecast.forecastday;
}
