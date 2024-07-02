import { CurrentWeather } from '@/components/CurrentWeather/CurrentWeather';
import { SearchDrawer } from '@/components/Search/SearchDrawer';
import { Box, Stack } from '@chakra-ui/react';
import { Suspense } from 'react';

interface PageProps {
	params: { id: string };
}

export default function Page({ params }: PageProps) {
	if (isNaN(Number(params.id))) {
		throw new Error('Invalid ID');
	}

	return (
		<Stack>
			<Box mb={12}>
				<SearchDrawer />
			</Box>
			<Suspense fallback={'loading...'}>
				<CurrentWeather id={Number(params.id)} />
			</Suspense>
		</Stack>
	);
}
