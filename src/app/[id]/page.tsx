import { CurrentWeather } from '@/components/CurrentWeather/CurrentWeather';
import { SearchDrawer } from '@/components/Search/SearchDrawer';
import { WeatherForecast } from '@/components/WeatherForecast/WeatherForecast';
import { Stack } from '@chakra-ui/react';
import { Suspense } from 'react';

interface PageProps {
	params: { id: string };
}

export default function Page({ params }: PageProps) {
	if (isNaN(Number(params.id))) {
		throw new Error('Invalid ID');
	}

	return (
		<Stack spacing={12}>
			<SearchDrawer triggerText="New search" placement="top" />

			<Suspense fallback={'loading...'}>
				<CurrentWeather id={Number(params.id)} />
			</Suspense>

			<Suspense fallback={'loading...'}>
				<WeatherForecast id={Number(params.id)} />
			</Suspense>
		</Stack>
	);
}
