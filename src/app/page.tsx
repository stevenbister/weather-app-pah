import { Center, Container, Text } from '@chakra-ui/react';

export default async function Home() {
	return (
		<Container maxW="container.lg">
			<Center>
				<Text fontSize="xl">Search for a city</Text>
			</Center>
		</Container>
	);
}
