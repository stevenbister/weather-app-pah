'use client';

import { Button, Center, Container, Heading, Stack, Text } from '@chakra-ui/react';
import { useEffect } from 'react';

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<Container maxW="container.lg">
			<Center>
				<Stack>
					<Heading as="h2">Something went wrong!</Heading>
					<Text fontSize="lg">{error.message}</Text>
					<Text fontSize="lg">
						<Button onClick={() => reset()} variant="link">
							Click to try again
						</Button>{' '}
						or search for a new city.
					</Text>
				</Stack>
			</Center>
		</Container>
	);
}
