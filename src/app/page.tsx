import { Search } from '@/components/Search/Search';
import { search } from '@/utils/weather';
import { Container } from '@chakra-ui/react';

interface HomeProps {
	searchParams?: {
		s?: string;
	};
}
export default async function Home({ searchParams }: HomeProps) {
	const defaultWeather = await search(searchParams?.s ?? '');

	return (
		<Container>
			<Search defaultWeatherData={defaultWeather} />
		</Container>
	);
}
