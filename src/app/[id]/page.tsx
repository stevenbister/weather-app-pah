import { CurrentWeather } from '@/components/CurrentWeather/CurrentWeather';
import { SearchDrawer } from '@/components/Search/SearchDrawer';
import { Suspense } from 'react';

interface PageProps {
	params: { id: string };
}

export default function Page({ params }: PageProps) {
	if (isNaN(Number(params.id))) {
		throw new Error('Invalid ID');
	}

	return (
		<>
			<SearchDrawer />
			<Suspense fallback={'loading...'}>
				<CurrentWeather id={Number(params.id)} />
			</Suspense>
		</>
	);
}
