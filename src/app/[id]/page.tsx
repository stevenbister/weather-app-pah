import { CurrentWeather } from '@/components/CurrentWeather';
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
			<Suspense fallback={'loading...'}>
				<CurrentWeather id={Number(params.id)} />
			</Suspense>
		</>
	);
}
